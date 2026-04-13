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

// Bransje → URL til den ferdigbygde malen på dmarketing.no
const BRANSJE_MALER = {
  elektriker: 'https://dmarketing.no/maler/elektriker.html',
  rorlegger:  'https://dmarketing.no/maler/rorlegger.html',
  tannlege:   'https://dmarketing.no/maler/tannlege.html',
  frisor:     'https://dmarketing.no/maler/frisor.html',
  regnskap:   'https://dmarketing.no/maler/regnskap.html',
  barber:     'https://dmarketing.no/maler/barber.html',
};

function scoreLead(place) {
  let score = 0;

  // Ingen nettside = gullgruve (de trenger oss mest)
  if (!place.websiteUri) score += 50;

  // Høy rating = etablert bedrift med godt rykte
  if ((place.rating || 0) >= 4.5) score += 25;
  else if ((place.rating || 0) >= 4.0) score += 10;

  // Mange anmeldelser = aktiv bedrift med råd til å investere
  const anm = place.userRatingCount || 0;
  if (anm >= 50) score += 15;
  else if (anm >= 20) score += 10;
  else if (anm >= 5) score += 5;

  return score; // 0–100
}

function scoreLabel(score) {
  if (score >= 80) return 'VIP';
  if (score >= 50) return 'God';
  return 'Vanlig';
}

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
  const malUrl = BRANSJE_MALER[bransje.toLowerCase()] || `https://dmarketing.no/maler/${bransje.toLowerCase()}.html`;

  for (let i = 0; i < slice.length; i++) {
    const p = slice[i];
    const navn = p.displayName?.text || '(ukjent)';
    const harNettside = !!p.websiteUri;
    const score = scoreLead(p);
    const label = scoreLabel(score);
    process.stdout.write(`   [${i + 1}/${slice.length}] ${navn} [${label} ${score}p]${harNettside ? '' : ' ⭐'}\n`);

    leads.push({
      navn,
      telefon:      p.nationalPhoneNumber || '',
      nettside:     p.websiteUri || '(ingen)',
      har_nettside: harNettside ? 'ja' : 'nei',
      adresse:      p.formattedAddress || '',
      rating:       p.rating || '',
      antall_anm:   p.userRatingCount || '',
      status:       p.businessStatus || '',
      score,
      score_label:  label,
      mal_url:      malUrl,
    });
  }

  // Sorter: høyest score øverst (VIP først)
  leads.sort((a, b) => b.score - a.score);

  const headers = ['navn', 'telefon', 'nettside', 'har_nettside', 'adresse', 'rating', 'antall_anm', 'status', 'score', 'score_label', 'mal_url'];
  const csvLines = [
    headers.join(','),
    ...leads.map(l => headers.map(h => escapeCsv(l[h])).join(','))
  ];
  const outFile = path.join(outDir, `${bransje}-${by.toLowerCase()}.csv`);
  fs.writeFileSync(outFile, csvLines.join('\n'), 'utf8');

  const utenNettside = leads.filter(l => l.har_nettside === 'nei').length;
  const vip  = leads.filter(l => l.score_label === 'VIP').length;
  const gode = leads.filter(l => l.score_label === 'God').length;
  console.log(`\n✅  Ferdig!`);
  console.log(`   📁  ${outFile}`);
  console.log(`   📊  Totalt: ${leads.length} bedrifter`);
  console.log(`   🔴  VIP  (score ≥ 80): ${vip}`);
  console.log(`   🟡  God  (score ≥ 50): ${gode}`);
  console.log(`   ⚪  Vanlig:             ${leads.length - vip - gode}`);
  console.log(`   ⭐  Uten nettside:      ${utenNettside}`);
  console.log();
})();
