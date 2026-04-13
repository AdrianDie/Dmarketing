# Dietrichs Marketing — Systemoversikt
Oppdatert: April 2026

---

## Hva er dette systemet?

En halvautomatisert salgsmaskin som selger ferdige nettsidemaler (7 500 kr/stk)
til norske småbedrifter via kald e-post. Systemet finner potensielle kunder,
kvalifiserer dem, finner kontaktinfo og sender personaliserte e-poster automatisk.

Du gjør: svare på leads som er interessert.
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
│  leads.js ──── scorer bedrifter (0–100p) ────► CSV         │
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
│  15 min prat → salg på 7 500 kr                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Filstruktur

```
Dmarketing/
│
├── admin/                          ← Du er her
│   ├── SYSTEM_OVERVIEW.md          ← Denne filen
│   ├── HANDOVER.md                 ← Prosjekthistorikk og tech stack
│   ├── OUTREACH_PLAN.md            ← Detaljert steg-for-steg plan
│   └── epost-maler/                ← Kalde e-postmaler per bransje
│       ├── BREVO_GUIDE.md
│       ├── elektriker.md
│       ├── rorlegger.md
│       ├── tannlege.md
│       ├── frisor.md
│       ├── regnskap.md
│       └── barber.md
│
├── leads/                          ← Genererte CSV-filer
│   ├── elektriker-oslo.csv
│   ├── _blacklist.json             ← Bedrifter som allerede er kontaktet
│   ├── _pipeline_state.json        ← Hvilken kombinasjon som kjøres neste
│   └── _pipeline_log.txt           ← Logg over alle pipeline-kjøringer
│
├── maler/                          ← HTML-nettsidemaler
│   ├── index.html                  ← Gallerside (dmarketing.no/maler/)
│   ├── elektriker.html
│   ├── rorlegger.html
│   ├── tannlege.html
│   ├── frisor.html
│   ├── regnskap.html
│   └── barber.html
│
├── pipeline.js                     ← Automatisert lead-maskin (kjøres nattlig)
├── config.js                       ← Konfigurasjon — bransjer, byer, filtre
├── leads.js                        ← Manuell lead-henting fra Google Places
├── find-emails.js                  ← Manuell e-post-scraping
├── setup-scheduler.bat             ← Setter opp Windows Oppgaveplanlegger
└── .env                            ← API-nøkler (aldri del denne)
```

---

## Scriptoversikt

### `pipeline.js` — Hoved-automatisering
```bash
node pipeline.js                    # Kjør neste kombinasjon i rotasjonen
node pipeline.js elektriker Oslo    # Tving spesifikk bransje og by
```
Kjøres automatisk kl. 03:00 hver natt via Windows Oppgaveplanlegger.
Roterer gjennom alle bransje/by-kombinasjoner i `config.js`.

### `leads.js` — Manuell lead-henting
```bash
node leads.js elektriker Oslo 60
node leads.js rorlegger Bergen 40
```
Henter bedrifter fra Google Places og lagrer til CSV med score.

### `find-emails.js` — Manuell e-post-scraping
```bash
node find-emails.js leads/elektriker-oslo.csv
```
Scraper e-postadresser fra bedriftenes nettsider og oppdaterer CSV-en.

---

## Konfigurasjon (`config.js`)

Alt du trenger å endre ligger i `config.js`:

**Legg til ny by:**
```js
{ bransje: 'elektriker', by: 'Drammen' },
```

**Endre filtreringskriterier:**
```js
filter: {
  minScore: 40,          // Minimum score (0–100)
  maxAnmeldelser: 150,   // For store bedrifter ekskluderes
  minAnmeldelser: 3,     // For nye/inaktive ekskluderes
  minRating: 3.5,        // For dårlig rykte ekskluderes
}
```

**Legg til bedrift i blacklist (aldri kontakt igjen):**
Legg til i `blacklistNavn`-arrayen i `config.js`.

---

## Lead Scoring — Slik fungerer det

Hver bedrift får en score fra 0–100 basert på Google-data:

| Kriterium | Poeng |
|---|---|
| Ingen nettside | +50 |
| Rating ≥ 4.5 | +25 |
| Rating ≥ 4.0 | +10 |
| 50+ anmeldelser | +15 |
| 20–49 anmeldelser | +10 |
| 5–19 anmeldelser | +5 |

**VIP (80–100p):** Ingen nettside + høy rating + mange anmeldelser
→ Etablert bedrift som trenger oss, har råd og er synlig på Google

**God (50–79p):** Én eller to mangler
→ God kandidat, inkluderes i kampanje

**Vanlig (under 50p):** Filtreres ut eller lavest prioritet

---

## Instantly — Kampanjeoppsett

En kampanje per bransje anbefales:
- `Elektriker — NO`
- `Rørlegger — NO`
- `Tannlege — NO`
- osv.

Variabler som sendes fra pipeline til Instantly:

| Variabel i Instantly | Innhold |
|---|---|
| `{{company_name}}` | Bedriftsnavn |
| `{{mal_url}}` | Lenke til ferdig bransjemal |
| `{{rating}}` | Google-rating |
| `{{score_label}}` | VIP / God / Vanlig |
| `{{by}}` | Byen bedriften er i |

---

## Domene- og e-postoppsett

```
dmarketing.no              → Aldri bruk til outreach
                             Nettside, kundemail, fakturaer

dietrichsmarketing.no      → Kun outreach
  adrian@dietrichsmarketing.no   ← Instantly-konto 1
  hei@dietrichsmarketing.no      ← Instantly-konto 2

Reply-to: post@dmarketing.no     ← Svar havner her
```

**Warmup:** 14 dager minimum før første kampanje sendes.
**Kapasitet:** 2 kontoer × 10 e-poster/dag = 20/dag under warmup.
Økes gradvis til 30–40/dag etter 4–6 uker.

---

## API-nøkler (lagres i `.env`)

| Nøkkel | Hvor du finner den |
|---|---|
| `GOOGLE_MAPS_API_KEY` | console.cloud.google.com |
| `INSTANTLY_API_KEY` | app.instantly.ai → Settings → API |
| `INSTANTLY_KAMPANJE_[BRANSJE]` | URL når du er inne på kampanjen |

---

## Nøkkeltall å følge med på

Sjekk disse i Instantly én gang per uke:

| Metrikk | Mål | Tiltak hvis lavere |
|---|---|---|
| Open rate | > 40% | Bytt emnelinje |
| Reply rate | > 2% | Bytt første avsnitt |
| Bounce rate | < 3% | Rens listen bedre |
| Unsubscribe rate | < 0,5% | Gjør e-posten mer relevant |

---

## Neste steg

- [ ] Domenet `dietrichsmarketing.no` aktiv hos Webhuset
- [ ] Google Workspace opprettet og DNS satt opp (SPF/DKIM/DMARC)
- [ ] Instantly-konto opprettet, begge e-poster koblet til
- [ ] Warmup aktivert — vent 14 dager
- [ ] Kampanjer opprettet i Instantly (én per bransje)
- [ ] API-nøkler og kampanje-IDer lagt inn i `.env`
- [ ] `setup-scheduler.bat` kjørt som administrator
- [ ] Calendly-konto opprettet og lenke oppdatert i malene
