/**
 * rescore-leads.js — Legg til ai_score/ai_label for AI-telefonsvarer-kampanjen
 *
 * Ny scoring: fokus på travle bedrifter som mister samtaler
 * (erstatter gammel scoring som belønnet "ingen nettside")
 *
 * Bruk:
 *   node rescore-leads.js           # Oppdater alle CSV-filer
 *   node rescore-leads.js --summary # Vis fordeling uten å skrive
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEADS_DIR = path.join(__dirname, 'leads');
const SUMMARY   = process.argv.includes('--summary');

// Bransjer der én mistet samtale = stort tap (høy jobbverdi)
const HIGH_VALUE = ['elektriker', 'rorlegger', 'snekker', 'bilverksted', 'malerfirma', 'taktekker', 'vvs'];

function aiScore(row, filename) {
  let score = 0;
  const rating = parseFloat(row.rating) || 0;
  const reviews = parseInt(row.antall_anm) || 0;

  // Rating = bevis på at de er gode, bare travle
  if (rating >= 4.5) score += 35;
  else if (rating >= 4.0) score += 20;
  else if (rating >= 3.5) score += 10;

  // Mange anmeldelser = de er aktive og tar mye jobber = misser samtaler
  if (reviews >= 50) score += 35;
  else if (reviews >= 20) score += 20;
  else if (reviews >= 5) score += 10;

  // Har telefon = kan faktisk sette opp systemet
  if (row.telefon && row.telefon.trim()) score += 15;

  // Bransje med høy jobbverdi (elektriker/rørlegger misser 5–15k per jobb)
  const bransje = path.basename(filename).split('-')[0].toLowerCase();
  if (HIGH_VALUE.includes(bransje)) score += 15;

  return Math.min(score, 100);
}

function aiLabel(score) {
  if (score >= 80) return 'VIP';
  if (score >= 50) return 'God';
  return 'Vanlig';
}

function parseCsv(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  const rows = lines.slice(1).filter(l => l.trim()).map(line => {
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

const files = fs.readdirSync(LEADS_DIR)
  .filter(f => f.endsWith('.csv'))
  .map(f => ({ name: f, full: path.join(LEADS_DIR, f) }));

let totalVIP = 0, totalGod = 0, totalVanlig = 0;

for (const { name, full } of files) {
  const content = fs.readFileSync(full, 'utf8');
  const { headers, rows } = parseCsv(content);

  if (!headers.includes('ai_score')) headers.push('ai_score');
  if (!headers.includes('ai_label')) headers.push('ai_label');

  rows.forEach(row => {
    const score = aiScore(row, name);
    const label = aiLabel(score);
    row.ai_score = score;
    row.ai_label = label;
    if (label === 'VIP') totalVIP++;
    else if (label === 'God') totalGod++;
    else totalVanlig++;
  });

  if (!SUMMARY) {
    fs.writeFileSync(full, toCsv(headers, rows), 'utf8');
  }
}

console.log(`\n🏷️  AI-scoring ferdig (${files.length} filer)`);
console.log(`   🔴  VIP   (≥80p): ${totalVIP.toLocaleString()}`);
console.log(`   🟡  God   (≥50p): ${totalGod.toLocaleString()}`);
console.log(`   ⚪  Vanlig:        ${totalVanlig.toLocaleString()}`);
console.log(`   📊  Total:         ${(totalVIP + totalGod + totalVanlig).toLocaleString()}`);
if (SUMMARY) console.log('\n   (Dry run — ingen filer skrevet)');
console.log();
