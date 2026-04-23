/**
 * find-emails-batch.js — Kjør find-emails.js på alle CSV-filer i leads/
 *
 * Bruk:
 *   node find-emails-batch.js           # Alle filer
 *   node find-emails-batch.js --dry-run # Se hva som ville blitt prosessert
 *
 * Resumable: hopper over rader som allerede har e-post.
 * Lagrer progress etter hver fil.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEADS_DIR = path.join(__dirname, 'leads');
const DRY_RUN   = process.argv.includes('--dry-run');
const CONCURRENCY = 3;  // parallelle fetch-kall per fil
const TIMEOUT_MS  = 8000;

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

const IGNORE_DOMAIN = [
  '@example', '@sentry', '@gmail.com', '@yahoo.', '@hotmail.',
  'wix.', 'wordpress.', 'google.', 'schema.org', 'w3.org',
  'sentry.io', 'jquery', 'bootstrap', 'cloudflare',
  'fontawesome', 'webflow.', 'squarespace.',
];

const IGNORE_PREFIX = [
  'noreply', 'no-reply', 'donotreply', 'do-not-reply',
  'mailer-daemon', 'bounce', 'unsubscribe', 'bruker',
  'user', 'epost', 'email', 'mail', 'test', 'hjelp',
];

function extractEmails(html) {
  const matches = html.match(EMAIL_REGEX) || [];
  return [...new Set(matches)].filter(e => {
    const lower = e.toLowerCase();
    if (IGNORE_DOMAIN.some(ig => lower.includes(ig))) return false;
    const prefix = lower.split('@')[0];
    if (IGNORE_PREFIX.some(p => prefix === p || prefix.startsWith(p))) return false;
    return true;
  });
}

function rankEmail(email) {
  const prefix = email.toLowerCase().split('@')[0];
  if (/^[a-z]+\.[a-z]+/.test(prefix)) return 0;
  if (['daglig.leder', 'leder', 'sjef', 'owner'].includes(prefix)) return 1;
  if (['post', 'kontakt', 'contact', 'info', 'firmapost'].includes(prefix)) return 2;
  return 3;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; emailfinder/1.0)' },
    });
    return await res.text();
  } catch {
    return '';
  } finally {
    clearTimeout(timer);
  }
}

async function findEmail(website) {
  if (!website || website === '(ingen)') return '';
  let base = website.trim();
  if (!base.startsWith('http')) base = 'https://' + base;
  base = base.replace(/\/$/, '');

  const urls = [base, `${base}/kontakt`, `${base}/contact`, `${base}/om-oss`];
  const found = [];
  for (const url of urls) {
    const html = await fetchText(url);
    if (html) {
      const emails = extractEmails(html);
      found.push(...emails);
      if (found.length > 0) break;
    }
  }
  const unique = [...new Set(found)];
  unique.sort((a, b) => rankEmail(a) - rankEmail(b));
  return unique.slice(0, 2).join(' | ');
}

function parseCsv(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    const values = [];
    let current = '', inQuotes = false;
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { values.push(current); current = ''; }
      else { current += char; }
    }
    values.push(current);
    const row = {};
    headers.forEach((h, i) => row[h] = values[i] || '');
    return row;
  });
  return { headers, rows };
}

function toCsv(headers, rows) {
  function esc(val) {
    if (!val) return '';
    const s = String(val);
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  return [headers.join(','), ...rows.map(r => headers.map(h => esc(r[h])).join(','))].join('\n');
}

async function processChunk(rows) {
  return Promise.all(rows.map(async row => {
    if (row.epost && row.epost.trim()) return { ...row, _found: false };
    if (!row.nettside || row.nettside === '(ingen)') return { ...row, _found: false };
    const email = await findEmail(row.nettside);
    return { ...row, epost: email, _found: !!email };
  }));
}

async function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { headers, rows } = parseCsv(content);
  if (!headers.includes('epost')) headers.push('epost');

  const needsEmail = rows.filter(r => !r.epost || !r.epost.trim()).length;
  if (needsEmail === 0) return { skipped: true, total: rows.length, found: 0 };

  if (DRY_RUN) return { skipped: false, total: rows.length, needsEmail, found: 0 };

  let found = 0;
  for (let i = 0; i < rows.length; i += CONCURRENCY) {
    const chunk = rows.slice(i, i + CONCURRENCY);
    const results = await processChunk(chunk);
    results.forEach((r, j) => {
      if (r._found) found++;
      delete r._found;
      rows[i + j] = r;
    });
  }

  fs.writeFileSync(filePath, toCsv(headers, rows), 'utf8');
  return { skipped: false, total: rows.length, needsEmail, found };
}

(async () => {
  const files = fs.readdirSync(LEADS_DIR)
    .filter(f => f.endsWith('.csv'))
    .map(f => path.join(LEADS_DIR, f));

  console.log(`\n📧  find-emails-batch${DRY_RUN ? ' [DRY RUN]' : ''}`);
  console.log(`   ${files.length} CSV-filer funnet\n`);

  let totalLeads = 0, totalFound = 0, filesProcessed = 0, filesSkipped = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const name = path.basename(file);
    process.stdout.write(`   [${i + 1}/${files.length}] ${name}... `);

    const result = await processFile(file);
    if (result.skipped) {
      process.stdout.write('✅ allerede ferdig\n');
      filesSkipped++;
    } else if (DRY_RUN) {
      process.stdout.write(`→ ${result.needsEmail} mangler e-post\n`);
    } else {
      process.stdout.write(`✉  ${result.found}/${result.needsEmail} funnet\n`);
      filesProcessed++;
      totalLeads += result.needsEmail;
      totalFound += result.found;
    }
  }

  console.log(`\n✅  Ferdig!`);
  if (!DRY_RUN) {
    console.log(`   📁  Filer prosessert: ${filesProcessed} (${filesSkipped} allerede ferdig)`);
    console.log(`   ✉   E-poster funnet: ${totalFound} av ${totalLeads} mulige`);
    console.log(`   Hit rate: ${totalLeads > 0 ? Math.round(totalFound / totalLeads * 100) : 0}%`);
  }
  console.log();
})();
