/**
 * find-emails.js — Henter e-postadresser fra nettsider i en leads CSV
 *
 * Bruk:
 *   node find-emails.js leads/elektriker-oslo.csv
 *
 * Output: samme fil, oppdatert med en "epost" kolonne
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const csvFile = process.argv[2];
if (!csvFile) {
  console.error('❌  Angi CSV-fil: node find-emails.js leads/elektriker-oslo.csv');
  process.exit(1);
}

const filePath = path.resolve(__dirname, csvFile);
if (!fs.existsSync(filePath)) {
  console.error(`❌  Finner ikke filen: ${filePath}`);
  process.exit(1);
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const IGNORE = ['@example', '@sentry', '@gmail', 'wix.', 'wordpress.', 'google.', 'schema.org', 'w3.org', 'sentry.io'];

function extractEmails(html) {
  const matches = html.match(EMAIL_REGEX) || [];
  return [...new Set(matches)].filter(e =>
    !IGNORE.some(ig => e.includes(ig))
  );
}

async function fetchText(url, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; emailfinder/1.0)' },
    });
    const text = await res.text();
    return text;
  } finally {
    clearTimeout(timer);
  }
}

async function findEmail(website) {
  if (!website || website === '(ingen)') return '';

  // Normaliser URL
  let base = website.trim();
  if (!base.startsWith('http')) base = 'https://' + base;
  base = base.replace(/\/$/, '');

  // Prøv hjemmeside og /kontakt
  const urls = [base, `${base}/kontakt`, `${base}/contact`, `${base}/om-oss`];
  const found = [];

  for (const url of urls) {
    try {
      const html = await fetchText(url);
      const emails = extractEmails(html);
      found.push(...emails);
      if (found.length > 0) break;
    } catch {
      // timeout eller nettverksfeil — fortsett
    }
  }

  return [...new Set(found)].slice(0, 2).join(' | ');
}

function parseCsv(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
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
      ? '"' + s.replace(/"/g, '""') + '"'
      : s;
  }
  return [
    headers.join(','),
    ...rows.map(r => headers.map(h => esc(r[h])).join(','))
  ].join('\n');
}

(async () => {
  const content = fs.readFileSync(filePath, 'utf8');
  const { headers, rows } = parseCsv(content);

  if (!headers.includes('epost')) headers.push('epost');

  console.log(`\n📧  Leter etter e-poster for ${rows.length} bedrifter...\n`);

  let found = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    process.stdout.write(`   [${i + 1}/${rows.length}] ${row.navn}...`);

    if (row.nettside === '(ingen)') {
      row.epost = '';
      process.stdout.write(' (ingen nettside)\n');
      continue;
    }

    const email = await findEmail(row.nettside);
    row.epost = email;
    if (email) {
      found++;
      process.stdout.write(` ✉  ${email}\n`);
    } else {
      process.stdout.write(' –\n');
    }
  }

  fs.writeFileSync(filePath, toCsv(headers, rows), 'utf8');

  console.log(`\n✅  Ferdig!`);
  console.log(`   📁  Oppdatert: ${filePath}`);
  console.log(`   ✉   E-poster funnet: ${found} av ${rows.length}`);
  console.log();
})();
