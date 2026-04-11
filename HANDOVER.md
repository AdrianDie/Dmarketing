# Handover — Dietrichs Marketing

## Prosjektoversikt
Selger ferdige nettsidemaler til norske småbedrifter for 7 500 kr per stk.
Repo: https://github.com/AdrianDie/Dmarketing

---

## Hva som er bygget

### Nettsidemaler (`maler/`)
6 ferdige HTML-maler med Tailwind CSS + Motion.js animasjoner:
- `elektriker.html` — Navy-blå, dot-grid hero
- `rorlegger.html` — Dyp blå, asymmetrisk hero
- `tannlege.html` — Marine, luksus-stil
- `frisor.html` — Mørkt, editorial (dame-frisør)
- `regnskap.html` — Business-blå, dashboard-stil
- `barber.html` — Mørkt tema, gull-accent (#C9A84C), Manrope font

### Gallerside (`maler/index.html`)
- Viser alle 6 maler i grid
- Webflow-nav fra hovedsiden (svart på lys bakgrunn)
- Prosess-seksjon (4 steg: Velg mal → Tilpasning → Korrektur → Live)
- Kontakt-epost: post@dmarketing.no

### Lead-generering scripts
- `leads.js` — Henter bedrifter fra Google Places API (New), eksporterer CSV
- `find-emails.js` — Besøker hver nettside i CSV og scraper e-postadresser

---

## Slik kjøres scriptene

```bash
# Finn bedrifter
node leads.js elektriker Oslo 60
node leads.js rorlegger Bergen 40

# Finn e-poster
node find-emails.js leads/elektriker-oslo.csv
```

Output: `leads/[bransje]-[by].csv` med kolonnene:
`navn, telefon, nettside, har_nettside, adresse, rating, antall_anm, status, epost`

### API-nøkkel
Ligger i `.env` (ikke i git):
```
GOOGLE_MAPS_API_KEY=...
```
Google Places API (New) må være aktivert i Google Cloud Console.
Koster ~$0.10 per 60 bedrifter (godt innenfor $200 gratis/mnd).

---

## Hva som gjenstår

### 1. E-post-maler (ikke laget ennå)
Trenger én kort kald e-post per bransje. Mal-struktur:
- Emne: personlig, nevner bedriftsnavn
- Kropp: 3-4 setninger, direkte lenke til riktig mal på gallerisiden
- CTA: book 15 min møte via Calendly
- Tone: norsk, uformell, direkte

Eksempel-lead fra CSV:
```
Fjell Elektrikeren AS — sindre@fjellelektrikeren.no — ingen god nettside
```

### 2. Calendly-link på gallerisiden
Legg til en tydelig "Book gratis 15 min" CTA-knapp på `maler/index.html`.

### 3. Rens CSV-en
Fjern placeholder-adresser som dukket opp i e-post-kolonnen:
- `bruker@domene.no`
- `navn@domene.no`
- `info@company.com`
- `noreply@...`

### 4. Outreach-volum
Mål: 30-50 e-poster per dag manuelt, eller via Instantly.ai (~$30/mnd).
Realistisk: 2% konvertering = 1 kunde/uke = 7 500 kr/uke.

---

## Design-filosofi (viktig å bevare)
Se `CLAUDE.md` for full dokumentasjon. Kortversjon:
- Tailwind CDN + Motion.js, ingen React/jQuery
- Bakgrunn `#FAFAFA`, tekst `#09090B`
- Seksjoner: minimum `py-24`
- Footer alltid `#0F172A` (navy)
- Bilder fra `maler/bilder/[bransje]/`
- Screenshots via `node screenshot.js [fil.html]`

---

## Teknisk stack
- Statisk HTML/CSS/JS — ingen build-steg
- Webflow CSS + JS lastes inn i malene (nav-komponent)
- Puppeteer for screenshots
- Node.js (ES modules, `"type": "module"` i package.json)
