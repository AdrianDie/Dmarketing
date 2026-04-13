/**
 * pipeline.js — Automatisert lead-maskin
 *
 * Kjøres automatisk hver natt via Windows Oppgaveplanlegger.
 * Henter leads → finner e-poster → filtrerer → laster opp til Instantly.
 *
 * Manuell kjøring:
 *   node pipeline.js                  (neste kombinasjon i rotasjonen)
 *   node pipeline.js elektriker Oslo  (tving spesifikk bransje/by)
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Les .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...rest] = line.trim().split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  });
}

const GOOGLE_API_KEY   = process.env.GOOGLE_MAPS_API_KEY;
const INSTANTLY_API_KEY = process.env.INSTANTLY_API_KEY;

// Filer for state og blacklist
const STATE_FILE     = path.join(__dirname, 'leads', '_pipeline_state.json');
const BLACKLIST_FILE = path.join(__dirname, 'leads', '_blacklist.json');
const LOG_FILE       = path.join(__dirname, 'leads', '_pipeline_log.txt');

const BRANSJE_MALER = {
  elektriker: 'https://dmarketing.no/maler/elektriker.html',
  rorlegger:  'https://dmarketing.no/maler/rorlegger.html',
  tannlege:   'https://dmarketing.no/maler/tannlege.html',
  frisor:     'https://dmarketing.no/maler/frisor.html',
  regnskap:   'https://dmarketing.no/maler/regnskap.html',
  barber:     'https://dmarketing.no/maler/barber.html',
};

// ─── Hjelpefunksjoner ────────────────────────────────────────────────────────

function log(msg) {
  const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n', 'utf8');
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function loadJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}

function saveJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ─── Velg neste kombinasjon (roterer gjennom targets i config) ───────────────

function velgTarget(forceBransje, forceBy) {
  if (forceBransje && forceBy) {
    return { bransje: forceBransje, by: forceBy };
  }
  const state  = loadJson(STATE_FILE, { index: 0 });
  const target = CONFIG.targets[state.index % CONFIG.targets.length];
  saveJson(STATE_FILE, { index: state.index + 1 });
  return target;
}

// ─── Google Places API ───────────────────────────────────────────────────────

function scoreLead(place) {
  let score = 0;
  if (!place.websiteUri)                     score += 50;
  if ((place.rating || 0) >= 4.5)            score += 25;
  else if ((place.rating || 0) >= 4.0)       score += 10;
  const anm = place.userRatingCount || 0;
  if (anm >= 50)      score += 15;
  else if (anm >= 20) score += 10;
  else if (anm >= 5)  score +=  5;
  return score;
}

function scoreLabel(score) {
  if (score >= 80) return 'VIP';
  if (score >= 50) return 'God';
  return 'Vanlig';
}

async function hentPlaces(bransje, by, pageToken = null) {
  const body = {
    textQuery:      `${bransje} ${by}`,
    languageCode:   'no',
    regionCode:     'NO',
    maxResultCount: 20,
  };
  if (pageToken) body.pageToken = pageToken;

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type':    'application/json',
      'X-Goog-Api-Key':  GOOGLE_API_KEY,
      'X-Goog-FieldMask': [
        'places.id', 'places.displayName', 'places.formattedAddress',
        'places.nationalPhoneNumber', 'places.websiteUri',
        'places.rating', 'places.userRatingCount',
        'places.businessStatus', 'nextPageToken',
      ].join(','),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─── E-post scraping ─────────────────────────────────────────────────────────

const EMAIL_REGEX    = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
const IGNORE_DOMAIN  = ['@example','@sentry','@gmail.com','@yahoo.','@hotmail.',
  'wix.','wordpress.','google.','schema.org','w3.org','sentry.io',
  'cloudflare','fontawesome','webflow.','squarespace.'];
const IGNORE_PREFIX  = ['noreply','no-reply','donotreply','do-not-reply',
  'mailer-daemon','bounce','unsubscribe','bruker','user','epost',
  'email','mail','test'];

function extractEmails(html) {
  return [...new Set(html.match(EMAIL_REGEX) || [])].filter(e => {
    const lower = e.toLowerCase();
    if (IGNORE_DOMAIN.some(ig => lower.includes(ig))) return false;
    const prefix = lower.split('@')[0];
    if (IGNORE_PREFIX.some(p => prefix === p || prefix.startsWith(p))) return false;
    return true;
  });
}

function rankEmail(email) {
  const prefix = email.toLowerCase().split('@')[0];
  if (/^[a-z]+\.[a-z]+/.test(prefix))                             return 0;
  if (['daglig.leder','leder','sjef','owner'].includes(prefix))    return 1;
  if (['post','kontakt','contact','info','firmapost'].includes(prefix)) return 2;
  return 3;
}

async function finnEpost(website) {
  if (!website || website === '(ingen)') return '';
  let base = website.trim().replace(/\/$/, '');
  if (!base.startsWith('http')) base = 'https://' + base;

  const urls   = [base, `${base}/kontakt`, `${base}/contact`, `${base}/om-oss`];
  const found  = [];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const res   = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; emailfinder/1.0)' },
      });
      clearTimeout(timer);
      found.push(...extractEmails(await res.text()));
      if (found.length > 0) break;
    } catch { /* timeout eller nettverksfeil */ }
  }

  const unique = [...new Set(found)].sort((a, b) => rankEmail(a) - rankEmail(b));
  return unique.slice(0, 1).join(''); // Kun beste e-post til Instantly
}

// ─── Filtrering ───────────────────────────────────────────────────────────────

function skalEkskluderes(lead, blacklist) {
  const { filter, blacklistNavn } = CONFIG;
  const navn = lead.navn.toLowerCase();

  // Sjekk blacklist (tidligere kontaktet)
  if (blacklist.has(lead.navn.toLowerCase())) return 'allerede kontaktet';

  // Sjekk kjede/for-stor-navn
  if (blacklistNavn.some(b => lead.navn.includes(b))) return 'kjede/for stor';

  // For mange anmeldelser
  const anm = Number(lead.antall_anm) || 0;
  if (anm > filter.maxAnmeldelser) return `for mange anmeldelser (${anm})`;

  // For få anmeldelser
  if (anm < filter.minAnmeldelser && anm > 0) return `for få anmeldelser (${anm})`;

  // For lav rating
  const rating = Number(lead.rating) || 0;
  if (rating > 0 && rating < filter.minRating) return `for lav rating (${rating})`;

  // For lav score
  if (lead.score < filter.minScore) return `for lav score (${lead.score})`;

  // Ikke operasjonell
  if (filter.kunOperasjonelle && lead.status !== 'OPERATIONAL') return 'ikke operasjonell';

  // Mangler e-post
  if (filter.krevEpost && !lead.epost) return 'ingen e-post';

  return null; // OK — inkluder leadet
}

// ─── Instantly API ────────────────────────────────────────────────────────────

async function lastOppTilInstantly(leads, bransje) {
  const kampanjeId = CONFIG.instantly.kampanjer[bransje];

  if (!INSTANTLY_API_KEY || !kampanjeId) {
    log(`⚠️  Instantly ikke konfigurert for ${bransje} — hopper over opplasting`);
    log(`   Sett INSTANTLY_API_KEY og INSTANTLY_KAMPANJE_${bransje.toUpperCase()} i .env`);
    return 0;
  }

  let lastetOpp = 0;

  for (const lead of leads) {
    try {
      const res = await fetch('https://api.instantly.ai/api/v1/lead/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${INSTANTLY_API_KEY}`,
        },
        body: JSON.stringify({
          api_key:     INSTANTLY_API_KEY,
          campaign_id: kampanjeId,
          email:       lead.epost,
          first_name:  lead.navn,
          company_name: lead.navn,
          personalization: lead.navn, // brukes som {{company_name}} i Instantly
          variables: {
            mal_url:     lead.mal_url,
            rating:      String(lead.rating),
            score_label: lead.score_label,
            by:          lead.by,
          },
        }),
      });

      if (res.ok) {
        lastetOpp++;
      } else {
        const err = await res.text();
        // Duplicate = allerede i kampanjen, ikke en feil
        if (!err.includes('duplicate') && !err.includes('already')) {
          log(`   ⚠️  Instantly feil for ${lead.navn}: ${err}`);
        }
      }

      await sleep(200); // Ikke spam API-et
    } catch (e) {
      log(`   ⚠️  Nettverksfeil ved opplasting av ${lead.navn}: ${e.message}`);
    }
  }

  return lastetOpp;
}

// ─── Hoved-pipeline ──────────────────────────────────────────────────────────

(async () => {
  if (!fs.existsSync(path.join(__dirname, 'leads'))) {
    fs.mkdirSync(path.join(__dirname, 'leads'));
  }

  const forceBransje = process.argv[2];
  const forceBy      = process.argv[3];
  const { bransje, by } = velgTarget(forceBransje, forceBy);

  log(`\n${'─'.repeat(60)}`);
  log(`🚀 Pipeline starter: ${bransje} i ${by}`);
  log(`${'─'.repeat(60)}`);

  if (!GOOGLE_API_KEY) {
    log('❌ Mangler GOOGLE_MAPS_API_KEY i .env — avbryter');
    process.exit(1);
  }

  // Last inn blacklist
  const blacklistData = loadJson(BLACKLIST_FILE, []);
  const blacklist     = new Set(blacklistData.map(n => n.toLowerCase()));
  log(`📋 Blacklist: ${blacklist.size} bedrifter som allerede er kontaktet`);

  // ── Steg 1: Hent places ────────────────────────────────────────────────────
  log(`\n🔍 Henter bedrifter fra Google Places...`);
  const rawPlaces = [];
  let pageToken   = null;

  for (let page = 0; page < 3 && rawPlaces.length < CONFIG.leadsPerRun; page++) {
    if (page > 0) await sleep(2500);
    const data = await hentPlaces(bransje, by, pageToken);
    if (!data.places?.length) break;
    rawPlaces.push(...data.places);
    pageToken = data.nextPageToken || null;
    if (!pageToken) break;
  }

  log(`   Fant ${rawPlaces.length} bedrifter råt`);

  // ── Steg 2: Score og bygg leads ────────────────────────────────────────────
  const malUrl = BRANSJE_MALER[bransje] || `https://dmarketing.no/maler/${bransje}.html`;
  const leads  = rawPlaces.slice(0, CONFIG.leadsPerRun).map(p => ({
    navn:        p.displayName?.text || '(ukjent)',
    telefon:     p.nationalPhoneNumber || '',
    nettside:    p.websiteUri || '(ingen)',
    har_nettside: p.websiteUri ? 'ja' : 'nei',
    adresse:     p.formattedAddress || '',
    rating:      p.rating || 0,
    antall_anm:  p.userRatingCount || 0,
    status:      p.businessStatus || '',
    score:       scoreLead(p),
    score_label: scoreLabel(scoreLead(p)),
    mal_url:     malUrl,
    by,
    epost:       '',
  }));

  // ── Steg 3: Filtrer (før e-post scraping — spar tid) ──────────────────────
  log(`\n🔍 Filtrerer leads...`);
  const kandidater = [];
  const ekskludert = [];

  for (const lead of leads) {
    const grunn = skalEkskluderes(lead, blacklist);
    if (grunn) {
      ekskludert.push({ navn: lead.navn, grunn });
    } else {
      kandidater.push(lead);
    }
  }

  log(`   ✅ Kandidater: ${kandidater.length}`);
  log(`   ❌ Ekskludert: ${ekskludert.length}`);
  if (ekskludert.length > 0) {
    const grupper = ekskludert.reduce((acc, e) => {
      acc[e.grunn] = (acc[e.grunn] || 0) + 1;
      return acc;
    }, {});
    Object.entries(grupper).forEach(([g, n]) => log(`      ${g}: ${n}`));
  }

  if (kandidater.length === 0) {
    log('\n⚠️  Ingen kvalifiserte leads — avslutter');
    process.exit(0);
  }

  // ── Steg 4: Finn e-poster ─────────────────────────────────────────────────
  log(`\n📧 Finner e-poster for ${kandidater.length} kandidater...`);
  let epostFunnet = 0;

  for (let i = 0; i < kandidater.length; i++) {
    const lead = kandidater[i];
    process.stdout.write(`   [${i + 1}/${kandidater.length}] ${lead.navn}...`);

    if (lead.har_nettside === 'nei') {
      process.stdout.write(' (ingen nettside)\n');
      continue;
    }

    lead.epost = await finnEpost(lead.nettside);
    if (lead.epost) {
      epostFunnet++;
      process.stdout.write(` ✉  ${lead.epost}\n`);
    } else {
      process.stdout.write(' –\n');
    }
  }

  log(`   E-poster funnet: ${epostFunnet} av ${kandidater.length}`);

  // ── Steg 5: Filtrer ut de uten e-post (hvis påkrevd) ─────────────────────
  const klare = CONFIG.filter.krevEpost
    ? kandidater.filter(l => l.epost)
    : kandidater;

  const vip    = klare.filter(l => l.score_label === 'VIP').length;
  const gode   = klare.filter(l => l.score_label === 'God').length;
  const vanlig = klare.filter(l => l.score_label === 'Vanlig').length;

  log(`\n📊 Klare leads: ${klare.length}`);
  log(`   🔴 VIP:    ${vip}`);
  log(`   🟡 God:    ${gode}`);
  log(`   ⚪ Vanlig: ${vanlig}`);

  // ── Steg 6: Lagre CSV (backup) ────────────────────────────────────────────
  const csvFile = path.join(__dirname, 'leads', `${bransje}-${by.toLowerCase()}-pipeline.csv`);
  const headers = ['navn','epost','telefon','nettside','har_nettside','adresse',
                   'rating','antall_anm','score','score_label','mal_url','by'];

  function esc(v) {
    const s = String(v ?? '');
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  const csvContent = [
    headers.join(','),
    ...klare.map(l => headers.map(h => esc(l[h])).join(',')),
  ].join('\n');
  fs.writeFileSync(csvFile, csvContent, 'utf8');
  log(`\n💾 CSV lagret: ${csvFile}`);

  // ── Steg 7: Last opp til Instantly ────────────────────────────────────────
  log(`\n📤 Laster opp ${klare.length} leads til Instantly (kampanje: ${bransje})...`);
  const lastetOpp = await lastOppTilInstantly(klare, bransje);
  log(`   ✅ Lastet opp: ${lastetOpp} leads`);

  // ── Steg 8: Oppdater blacklist ────────────────────────────────────────────
  const nyeNavn   = klare.map(l => l.navn);
  const oppdatert = [...new Set([...blacklistData, ...nyeNavn])];
  saveJson(BLACKLIST_FILE, oppdatert);
  log(`📋 Blacklist oppdatert: ${oppdatert.length} totalt`);

  // ── Sammendrag ─────────────────────────────────────────────────────────────
  log(`\n${'─'.repeat(60)}`);
  log(`✅ Pipeline ferdig: ${bransje} i ${by}`);
  log(`   Funnet:      ${rawPlaces.length} bedrifter`);
  log(`   Filtrert:    ${ekskludert.length} ekskludert`);
  log(`   Klar:        ${klare.length} leads`);
  log(`   Lastet opp:  ${lastetOpp} til Instantly`);
  log(`${'─'.repeat(60)}\n`);

})();
