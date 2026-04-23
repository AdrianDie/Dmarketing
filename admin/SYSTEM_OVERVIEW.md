# Dietrichs Marketing — Systemoversikt
Oppdatert: April 2026

---

## Hva er dette systemet?

En halvautomatisert salgsmaskin som selger AI-tjenester til norske småbedrifter (elektriker, rørlegger,
snekker osv.) via kald e-post. Systemet finner potensielle kunder, kvalifiserer dem, finner kontaktinfo
og sender personaliserte e-poster automatisk.

**Primærprodukt (April 2026):** AI-telefonsvarer (1 990 kr/mnd) — norsktalende AI tar samtaler,
kvalifiserer kunder og booker direkte i kalenderen. Nettsider selges som inngang til abonnement, ikke som primærprodukt.

Du gjør: svare på leads som er interessert, booke demo, onboarde kunder.
Maskinen gjør: alt annet.

---

## Arkitektur — Stor oversikt

```
┌─────────────────────────────────────────────────────────────┐
│                     LEAD-GENERERING                         │
│                                                             │
│  Google Places API                                          │
│       │                                                     │
│       ▼                                                     │
│  run-all.js ──── 10 bransjer × 31 byer ────► 310 CSV-filer │
│  leads.js   ──── scorer bedrifter (0–100p)                  │
│       │                                                     │
│       ▼                                                     │
│  find-emails.js ── scraper e-poster fra nettsider ──► CSV  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     PIPELINE (AUTOMATISK)                   │
│                                                             │
│  pipeline.js (kjøres kl. 03:00 hver natt)                  │
│       │                                                     │
│       ├── 1. Henter leads fra Google Places                 │
│       ├── 2. Filtrerer (score, størrelse, blacklist)        │
│       ├── 3. Scraper e-poster                               │
│       ├── 4. Laster opp til Instantly via API               │
│       └── 5. Oppdaterer blacklist                           │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     E-POST UTSENDING (INSTANTLY)            │
│                                                             │
│  Dag 1: Hoved-e-post med lenke til bransjemal               │
│  Dag 3: Oppfølging (hvis ikke svart)                        │
│  Dag 7: Breakup-e-post                                      │
│                                                             │
│  → Instantly stopper automatisk når noen svarer             │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     KONVERTERING (MANUELT)                  │
│                                                             │
│  Du svarer innen 10 min → sender Calendly-lenke             │
│  15 min prat → salg                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Nåværende status (April 2026)

| Komponent | Status |
|---|---|
| Lead-database | ✅ 7 632 leads, 310 CSV-filer |
| E-poster på leads | ⚠️ 915/7 632 har e-post — kjør find-emails-batch.js |
| AI-scoring på leads | ⏳ Kjør rescore-leads.js for ny ai_score/ai_label |
| E-post warmup | 🔄 14-dagers warmup pågår (sjekk Instantly) |
| Instantly-kampanjer | ⏳ Settes opp etter warmup |
| Nettsidemaler | ✅ 10 one-page + 6 flerside |
| **AI-telefonsvarer landingsside** | ✅ maler/ai-telefon/index.html |
| **Prisside** | ✅ maler/priser.html |
| **E-postmaler v2 (AI-vinkel)** | ✅ admin/epost-maler-v2/ |
| **Agent-konfigurasjon** | ✅ agent-config/elektriker.json + rorlegger.json |
| **Teknisk oppsett-guide** | ✅ ai-telefon/SETUP.md |
| **Salgsmanual** | ✅ admin/SALGSMANUAL.md |
| **First-sale sjekkliste** | ✅ admin/FIRST_SALE_CHECKLIST.md |
| Vapi-konto | ⏳ Ikke opprettet — se FIRST_SALE_CHECKLIST.md |
| ElevenLabs-konto | ⏳ Ikke opprettet |
| Cal.com-konto | ⏳ Ikke opprettet |
| Twilio-konto | ⏳ Ikke opprettet |

---

## Prisstruktur (gjeldende)

| Produkt | Engangspris | Månedspris |
|---|---|---|
| One-page nettside | 2 990 kr | — |
| Flerside nettside (4 sider) | 4 990 kr | — |
| AI-telefonsvarer (standalone) | 2 490 kr oppsett | **1 990 kr/mnd** |
| SYNLIG (nettside + GBP + rapport) | 2 990 kr | 1 490 kr/mnd |
| VOKSENDE (nettside + AI-telefon + SEO) | 2 990 + 2 490 kr | **3 990 kr/mnd** |
| VEKSTPAKKE (alt + Google Ads + AI-chat) | 4 990 + 2 490 kr | 7 990 kr/mnd |

**Potensielt mnd-inntekt med 20 kunder (realistisk mix):**
```
12 × SYNLIG (1 490 kr)           = 17 880 kr/mnd
 6 × VOKSENDE (3 990 kr)         = 23 940 kr/mnd
 2 × VEKSTPAKKE (7 990 kr)       = 15 980 kr/mnd
─────────────────────────────────────────────────
Total recurring                  = 57 800 kr/mnd
```

---

## Produktutvidelser som vil øke inntekten

### 1. Google Ads Landing Page (nytt produkt)
Mange bedrifter kjører allerede Google Ads men til en dårlig nettside.
Selg dem en dedikert landingsside optimalisert for konvertering.

- Pris: 3 990 kr engangspris
- Tillegg til eksisterende nettside-tilbud
- Kan selges uten at de bytter hele nettsiden

### 2. "Vedlikehold + Rapportering" pakke
Bytt ut 490 kr/mnd med en faktisk service:
- Månedlig rapport: trafikk, leads, søkeord
- Teknisk vedlikehold (oppdateringer, backup)
- En oppdatering av innhold per mnd

Pris: **790 kr/mnd** (kunden oppfatter høyere verdi, du leverer samme arbeid)

### 3. Legg til flere bransjer
Bransjer som har høy nettside-etterspørsel og dårlig eksisterende kvalitet:

| Bransje | Notat |
|---|---|
| Eiendomsmegler | Høy betalingsvillighet |
| Advokat / jurist | Premium kunder |
| Lege / legesenter | Høy etterspørsel |
| Hudpleie / spa | Mange driver uten nettside |
| Treningssenter / PT | Mange solo-operatører |
| Restaurant / kafe | Høy volum, lavere pris |
| Vvs-installatør | Ligner rørlegger-malen |
| Taktekker | Høy sesonginntekt |
| Hundepasser / dyreklinikk | Vokser fort |

### 4. Referral-program
Gi kunden 500 kr rabatt på neste måneds vedlikehold for hver ny kunde de henviser.
Koster lite, kan doble innkommende leads uten markedsføringskostnader.

### 5. Pakk inn Google Ads-kostnadene
I stedet for å ta betalt separat for Google Ads-budsjettet, tilby en alt-i-ett pakke:
- "Vekstpakke": 4 500 kr/mnd (inkl. 2 000 kr annonsekreditt + forvaltning)
- Kunden betaler én faktura, du styrer alt
- Høyere opplevd verdi, lettere å selge

---

## Hva du bør gjøre nå (prioritert rekkefølge)

Se `admin/FIRST_SALE_CHECKLIST.md` for detaljert sjekkliste.

### Steg 1 — Leads (gjør dette i dag)
- [ ] Kjør `node rescore-leads.js` for å oppdatere AI-score på alle leads
- [ ] Start `node find-emails-batch.js` (kjøres over natten — tar tid)

### Steg 2 — Verktøy (2–4 timer)
- [ ] Opprett Vapi-konto + norsk nummer
- [ ] Koble ElevenLabs norsk stemme
- [ ] Opprett Cal.com booking-side
- [ ] Sett opp Twilio SMS + Make.com webhook

### Steg 3 — Demo-agent (1 time)
- [ ] Bygg Vapi-assistent fra `agent-config/elektriker.json`
- [ ] Test: ring inn og fullfør booking

### Steg 4 — Outreach (1 time etter warmup)
- [ ] Sett opp Instantly-kampanje med `admin/epost-maler-v2/elektriker.md`
- [ ] Last opp leads med ai_label VIP/God + e-post
- [ ] Last opp `maler/ai-telefon/index.html` til dmarketing.no

---

## Filstruktur

```
Dmarketing/
│
├── admin/
│   ├── SYSTEM_OVERVIEW.md          ← Denne filen
│   ├── HANDOVER.md
│   ├── OUTREACH_PLAN.md
│   └── epost-maler/                ← Kalde e-postmaler per bransje
│
├── leads/                          ← 7 632 leads, 310 CSV-filer
│   ├── elektriker-oslo.csv
│   ├── _backlog.json
│   ├── _blacklist.json
│   └── _pipeline_log.txt
│
├── maler/                          ← HTML-nettsidemaler
│   ├── index.html                  ← Gallerside
│   │
│   ├── [one-page — 10 bransjer]
│   │   ├── elektriker.html         · Navy blå
│   │   ├── rorlegger.html          · Dyp blå
│   │   ├── tannlege.html           · Marine
│   │   ├── frisor.html             · Mørk editorial
│   │   ├── regnskap.html           · Business blå
│   │   ├── barber.html             · Mørk / gull
│   │   ├── bilverksted.html        · Rød
│   │   ├── snekker.html            · Amber
│   │   ├── malerfirma.html         · Grønn
│   │   └── psykolog.html           · Teal
│   │
│   └── [flerside — 6 bransjer, 4 sider hver]
│       ├── elektriker/
│       ├── rorlegger/
│       ├── snekker/
│       ├── bilverksted/
│       ├── malerfirma/
│       └── psykolog/
│
├── run-all.js                      ← Kjører alle 310 bransje/by kombinasjoner
├── pipeline.js                     ← Nattlig automatisering
├── leads.js                        ← Manuell lead-henting
├── find-emails.js                  ← E-post-scraping
├── backlog.js                      ← Dashboard for oppgavekøen
├── filter-leads.js                 ← Rens CSV-filer
├── screenshot.js                   ← Ta hero-screenshots av alle maler
└── .env                            ← API-nøkler
```

---

## Scriptoversikt

```bash
# Lead-generering
node run-all.js                          # Kjør alle 310 kombinasjoner
node leads.js elektriker Oslo 60         # Manuell: én bransje/by
node find-emails.js leads/elektriker-oslo.csv  # Scrape e-poster (én fil)

# E-post-batch (NYTT)
node find-emails-batch.js                # Scrape e-poster på ALLE CSV-filer (over natten)
node find-emails-batch.js --dry-run      # Se hva som mangler uten å kjøre

# AI-scoring (NYTT — for AI-telefonsvarer-kampanjen)
node rescore-leads.js                    # Legg til ai_score + ai_label på alle leads
node rescore-leads.js --summary          # Vis fordeling uten å skrive til fil

# Pipeline
node pipeline.js                         # Kjør neste pending oppgave
node pipeline.js --all                   # Kjør alle pending

# Administrasjon
node backlog.js                          # Vis status på køen
node backlog.js reset                    # Start ny runde
node filter-leads.js                     # Rens CSV etter nye filtre

# Screenshots
node screenshot.js all                   # Ta hero-screenshot av alle maler
node screenshot.js elektriker.html       # Ta screenshot av én mal
```

---

## Lead Scoring

| Kriterium | Poeng |
|---|---|
| Ingen nettside | +50 |
| Rating ≥ 4.5 | +25 |
| Rating ≥ 4.0 | +10 |
| 50+ anmeldelser | +15 |
| 20–49 anmeldelser | +10 |
| 5–19 anmeldelser | +5 |

**VIP (80–100p):** Ingen nettside + høy rating + mange anmeldelser → prioriter disse høyest
**God (50–79p):** God kandidat, inkluderes i kampanje
**Under 50p:** Lavest prioritet

---

## Instantly — Kampanjeoppsett

Én kampanje per bransje:
- `Elektriker — NO` → lenke til `dmarketing.no/maler/elektriker/`
- `Rørlegger — NO` → lenke til `dmarketing.no/maler/rorlegger/`
- osv.

Variabler sendt fra pipeline:

| Variabel | Innhold |
|---|---|
| `{{company_name}}` | Bedriftsnavn |
| `{{mal_url}}` | Lenke til ferdig bransjemal |
| `{{rating}}` | Google-rating |
| `{{by}}` | Byen bedriften er i |

---

## E-post og domene

```
dmarketing.no              → Aldri til outreach. Nettside og fakturaer.

dietrichsmarketing.no      → Kun outreach
  adrian@dietrichsmarketing.no
  hei@dietrichsmarketing.no

Reply-to: post@dmarketing.no
```

**Warmup:** 14 dager minimum. Etter warmup: øk gradvis fra 20 til 40/dag.

---

## Nøkkeltall å følge

| Metrikk | Mål | Tiltak hvis under |
|---|---|---|
| Open rate | > 40% | Bytt emnelinje |
| Reply rate | > 2% | Bytt første avsnitt |
| Bounce rate | < 3% | Rens listen |
| Booking rate (av replies) | > 30% | Forbedre svar-skript |
| Closing rate (av bookings) | > 50% | Øv på salgsprat |

---

## Neste steg

- [ ] Kjør `node find-emails.js` på nye leads
- [ ] Sett opp Instantly-kampanjer
- [ ] Oppdater Calendly-lenke i malene
- [ ] Legg inn kampanje-IDer i `.env`
- [ ] Vent til warmup er ferdig (14 dager)
- [ ] Start første kampanje — elektriker og rørlegger
- [ ] Juster prisene til 2 990 / 4 990 kr
- [ ] Sett opp Google Ads-pakke som upsell-produkt
