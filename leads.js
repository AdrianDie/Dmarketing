/**
 * leads.js — Finn potensielle kunder via Google Places API (New)
 *
 * Bruk:
 *   node leads.js elektriker Oslo 60
 *   node leads.js rørlegger Bergen 40
 *   node leads.js tannlege Trondheim
 *
 * Output: leads/[bransje]-[by].csv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Les .env fil automatisk
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...rest] = line.trim().split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  });
}

const API_KEY  = process.env.GOOGLE_MAPS_API_KEY;
const bransje  = process.argv[2] || 'elektriker';
const by       = process.argv[3] || 'Oslo';
const maxCount = Math.min(parseInt(process.argv[4]) || 60, 60);

if (!API_KEY) {
  console.error('❌  Mangler API-nøkkel. Legg GOOGLE_MAPS_API_KEY i .env filen.');
  process.exit(1);
}

const outDir = path.join(__dirname, 'leads');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function escapeCsv(val) {
  if (val == null) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

async function searchPlaces(pageToken = null) {
  const body = {
    textQuery: `${bransje} ${by}`,
    languageCode: 'no',
    regionCode: 'NO',
    maxResultCount: 20,
  };
  if (pageToken) body.pageToken = pageToken;

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.formattedAddress',
        'places.nationalPhoneNumber',
        'places.websiteUri',
        'places.rating',
        'places.userRatingCount',
        'places.businessStatus',
        'nextPageToken',
      ].join(','),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Places API feil ${res.status}: ${err}`);
  }
  return res.json();
}

(async () => {
  console.log(`\n🔍  Søker etter "${bransje}" i ${by} (maks ${maxCount} resultater)...\n`);

  const places = [];
  let pageToken = null;

  for (let page = 0; page < 3 && places.length < maxCount; page++) {
    if (page > 0) await sleep(2500);
    const data = await searchPlaces(pageToken);
    if (!data.places || data.places.length === 0) break;
    places.push(...data.places);
    pageToken = data.nextPageToken || null;
    if (!pageToken) break;
  }

  const slice = places.slice(0, maxCount);
  console.log(`📋  Fant ${slice.length} bedrifter.\n`);

  const leads = [];

  for (let i = 0; i < slice.length; i++) {
    const p = slice[i];
    const navn = p.displayName?.text || '(ukjent)';
    const harNettside = !!p.websiteUri;
    process.stdout.write(`   [${i + 1}/${slice.length}] ${navn}${harNettside ? '' : ' ⭐'}\n`);

    leads.push({
      navn,
      telefon:      p.nationalPhoneNumber || '',
      nettside:     p.websiteUri || '(ingen)',
      har_nettside: harNettside ? 'ja' : 'nei',
      adresse:      p.formattedAddress || '',
      rating:       p.rating || '',
      antall_anm:   p.userRatingCount || '',
      status:       p.businessStatus || '',
    });
  }

  // Sorter: uten nettside øverst (beste leads)
  leads.sort((a, b) => {
    if (a.har_nettside === 'nei' && b.har_nettside === 'ja') return -1;
    if (a.har_nettside === 'ja' && b.har_nettside === 'nei') return 1;
    return (Number(b.antall_anm) || 0) - (Number(a.antall_anm) || 0);
  });

  const headers = ['navn', 'telefon', 'nettside', 'har_nettside', 'adresse', 'rating', 'antall_anm', 'status'];
  const csvLines = [
    headers.join(','),
    ...leads.map(l => headers.map(h => escapeCsv(l[h])).join(','))
  ];
  const outFile = path.join(outDir, `${bransje}-${by.toLowerCase()}.csv`);
  fs.writeFileSync(outFile, csvLines.join('\n'), 'utf8');

  const utenNettside = leads.filter(l => l.har_nettside === 'nei').length;
  console.log(`\n✅  Ferdig!`);
  console.log(`   📁  ${outFile}`);
  console.log(`   📊  Totalt: ${leads.length} bedrifter`);
  console.log(`   ⭐  Uten nettside (beste leads): ${utenNettside}`);
  console.log(`   🌐  Med nettside: ${leads.length - utenNettside}`);
  console.log();
})();
