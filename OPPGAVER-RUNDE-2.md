# OPPGAVER-RUNDE-2.md — Variér malene, fjern uferdig-følelsen

> **Til Claude:** Kjør denne i auto-modus. Ingen tillatelses-prompts trengs. Bruk skillene `frontend-design` og `mal-design-patterns` (sistnevnte er den primære oppskriften — les den før du begynner). Følg agendaen i rekkefølge. Etter hver mal: ta screenshot, les den, sammenlign mot acceptance criteria, itererer maks 3 ganger.

## Bootstrap

1. Les `.claude/skills/mal-design-patterns/SKILL.md` — det er kjernemønsteret.
2. Les `CLAUDE.md` for de generelle reglene.
3. Verifiser: `npm install` gjort, `node screenshot.js gallery` virker.

## Globalt mål

**Ingen mal skal lenger se ut som om det "bare er en overskrift i hero".** Hver mal skal ha unik hero-type og distinkt visuell identitet. Hvis to maler ser like ut etter Round 2 — er de ikke ferdige.

## Acceptance criteria per mal (gjelder alle oppgaver under)

En mal er "ferdig" kun når **alle** disse er oppfylt:

- [ ] Heroen følger én av type A–F fra `mal-design-patterns/SKILL.md` — IKKE den sentrerte tekst-only template
- [ ] Hero har minst ett av: stort bilde, mockup, masonry-stripe, eller split-panel
- [ ] Anti-konvergens-sjekklisten er bestått (sjekk mot allerede ferdige maler)
- [ ] Screenshot viser tydelig forskjell fra forrige mal du jobbet på
- [ ] Display-font er distinkt fra naboene
- [ ] Bilder har `onerror`-fallback med Unsplash-URL fra bilde-tabellen i skillen
- [ ] Ingen klisjé-tekst ("kan stole på", "din partner for", "vi er lidenskapelige")

---

## Del 1 — One-page maler som mangler hero-tyngde

### Oppgave 1.1 — Snekker (`maler/snekker.html`)

**Tildelt hero-type:** A (asymmetrisk + bilde + floating cards)

**Endringer:**
1. Bytt ut den sentrerte hero-blokken (linje ~95–145) med Hero-type A fra skillen.
2. Bilde: snekker på jobb (treverk + verktøy). Bruk Unsplash-fallback `photo-1504307651254-35680f356dfd`.
3. Floating cards over bildet:
   - Stat: `8 års garanti` (eller bytt til mesterbrev-år)
   - Anmeldelse: `★★★★★ "Punktlig og ryddig" — Anders B.`
4. Background blob: `rgba(180,83,9,0.06)` (amber, matcher brand)
5. Behold den nye heroen-tekst ("Solid håndverk, levert i [By]").
6. Beholdes: stats-rad under hero kan stå, men flytt den til etter en NY seksjon (ikke direkte etter hero).
7. **Legg til ny seksjon mellom hero og stats:** "Slik jobber vi" — 4 numererte steg (Befaring → Tilbud → Utførelse → Garanti) med ikon per steg.

**Verifiser:** `node screenshot.js snekker` (mapper til `snekker-onepage.png`). Sammenlign mot rorlegger.png — skal være tydelig FORSKJELLIG i layout.

---

### Oppgave 1.2 — Malerfirma (`maler/malerfirma.html`)

**Tildelt hero-type:** F (split-screen med fargepalett-side)

**Endringer:**
1. Bytt ut sentrert hero med 50/50 split.
2. Venstre side: stort fargefelt — gradient fra `#15803D` (brand-grønn) til `#0D5C2C`. Inne i fargefelt: stor `Ferdig malt — i tide, til avtalt pris` i hvit display-font, en kort underline, og 3 fargesvatcher (sirkler) som flyter overlay (visualiserer "vi maler").
3. Høyre side: hvit, padding 80px, inneholder badge, p, 2 CTA, og en mini-galleri med 3 thumbnails av før/etter-veggermalt.
4. Beholdes: stats-rad og videre seksjoner under.
5. **Legg til ny seksjon "NCS-fargekart":** 8 fargesirkler i grid med navn under (`NCS S 0500-N` osv.) — gjør malen unikt visuell.

**Bilder (Unsplash):**
- Vegg malt: `photo-1562259949-e8e7689d7828`
- Maler-detalj: `photo-1503602642458-232111445657`

**Verifiser:** Skal se HELT annerledes ut enn snekker.

---

### Oppgave 1.3 — Psykolog (`maler/psykolog.html`)

**Tildelt hero-type:** F (split, men mykere — lys gradient)

**Endringer:**
1. Bytt ut sentrert hero med split.
2. Venstre side: bløt gradient `#CFFAFE` → `#FFFFFF`, stort lyst rom-bilde med soft fade i bunnen. En enkelt pull-quote i overlay: `"Jeg kom hit redd. Jeg går herfra hørt." — pasient`
3. Høyre side: hvit, h1 stort serif (`Newsreader`), p, 2 CTA. **Ingen badge-rad** — for klinisk for psykolog.
4. **Erstatt stats-rad med "Hva skjer på første time"-seksjon:** 3 myke kort med tekst som "Vi snakker om hva som bringer deg hit", "Ingen krav om tema eller mål", "Vi finner ut sammen om vi passer".

**Bilde:** `photo-1573497491208-6b1acb260507` (rolig rom).

**Verifiser:** Skal føles ROLIG og menneskelig — ikke kommersielt.

---

### Oppgave 1.4 — Bilverksted (`maler/bilverksted.html`)

**Status nå:** Allerede har en ganske god hero med "Ditt lokale bilverksted i [By]" og rød pulse-CTA + stats-rad.

**Endringer (mindre — den fungerer ish):**
1. Legg til et stort bilde av et verksted i bakgrunnen av heroen, med 30% opacity overlay i ink-svart. Tekst over.
2. Eller — hvis layout er for trang for det: legg til en bento-grid (Hero-type E) under heroen i stedet for kun stats-rad. 4 kort: "Akutt · 24/7", "EU-kontroll · 1 490 kr", "Service · alle merker", "Garanti · 24 mnd".
3. Bilde-fallback: `photo-1486262715619-67b85e0b08d3`.

**Verifiser:** Bilverksted skal tydelig være ulik fra rorlegger (også teknisk bransje).

---

### Oppgave 1.5 — Sjekk de andre one-page (`elektriker.html`, `rorlegger.html`, `tannlege.html`, `frisor.html`, `regnskap.html`, `barber.html`)

**Forventet:** Disse er allerede mest-ferdige (rik design). Sjekk likevel hver:

```
For hver mal:
1. Ta screenshot
2. Sjekk anti-konvergens-listen
3. Hvis OK: hopp til neste
4. Hvis ikke OK: list i OPPGAVER-FEIL.md og fortsett (ikke iterer her)
```

---

## Del 2 — Flerside-malene (4 sider hver)

For hver flerside-mal nedenfor: oppdater HERO på `index.html`, og oppdater hero-styling på `tjenester.html`, `om-oss.html`, `kontakt.html` slik at hver underside har sin egen variant av samme estetiske retning (men ikke nøyaktig samme hero — variere innenfor familien).

### Oppgave 2.1 — Snekker (`maler/snekker/`)

**Hero-type:** A på `index.html`. Variants på undersider:
- `tjenester.html`: stor h1 + en HORISONTAL gallery-stripe av 5 prosjekt-bilder (terrasse, kjøkken, bad, tilbygg, garderobe) — ikke en grid, men en horisontal scroll-strip
- `om-oss.html`: split-screen med team-bilde og stor "siden 2007" tidslinje
- `kontakt.html`: enkel hero, men bytt skjema til en interaktiv "Hva slags jobb? → Hvor stort? → Når?"-flyt (3 steg)

**Bilder:** Bruk treverk-tema. Mal-bilder: `photo-1504307651254-35680f356dfd`, `photo-1556909114-f6e7ad7d3136`, `photo-1572297743593-1a06d3a0a6c3`.

---

### Oppgave 2.2 — Malerfirma (`maler/malerfirma/`)

**Hero-type:** B (full-bleed bilde + glass-kort) på `index.html`. Skift fra dagens sentrert design.

**Variants:**
- `tjenester.html`: 12-kolonne bento-grid med tjenester, ikke flat 3x3
- `om-oss.html`: editorial magazine-stil — stor pull-quote, asymmetrisk, høy typografi-kontrast
- `kontakt.html`: split med fargesvatch-velger som lekent element

**Bilder:** `photo-1562259949-e8e7689d7828`, `photo-1503602642458-232111445657`.

---

### Oppgave 2.3 — Psykolog (`maler/psykolog/`)

**Hero-type:** A med myk variant — terapeut-bilde i 3:4, glass-kort med sertifisering + lite anmeldelse.

**Variants:**
- `tjenester.html`: ikke pristabell først — start med "Hva slags hjelp trenger du?" interaktiv flyt
- `om-oss.html`: allerede har split — behold men legg til verdier-kort
- `kontakt.html`: skjemaet er bra, men legg til en "ventetid akkurat nå" live-pill (statisk: "Neste ledige time: torsdag 09:30")

**Bilde:** `photo-1573497491208-6b1acb260507`, `photo-1559757148-5c350d0d3c56`.

---

### Oppgave 2.4 — Bilverksted (`maler/bilverksted/`)

**Hero-type:** D (mørk editorial + galleri-stripe) på `index.html`. Bytt fra dagens lyse design — gjør malen mørk industriell.

**Variants:**
- `tjenester.html`: pristabell med fast pris per service, men i mørkt design
- `om-oss.html`: tidslinje med foto av verksted-historikk
- `kontakt.html`: stor "Når trenger bilen din service?" interaktivt verktøy (registreringsnr → forslag)

**Bilder:** `photo-1486262715619-67b85e0b08d3`, `photo-1503376780353-7e6692767b70`, `photo-1492144534655-ae79c964c9d7`.

---

### Oppgave 2.5 — Elektriker (`maler/elektriker/`)

**Hero-type:** E (bento-grid) på `index.html`. Bygg ut bento-grid med:
- 1 stort kort: hero-tekst + akutt-CTA
- 3 medium kort: "EV-lader · NEK 400", "Smarthus · Loxone-sertifisert", "Boligalarm · Verisure"
- 1 lite kort: "Akutt: < 2 timer"

**Variants:**
- `tjenester.html`: pristabell allerede der — sjekk
- `om-oss.html`: legg til sertifikat-galleri (DSB, NEK, Easee, Zaptec) som logo-rad
- `kontakt.html`: behold

**Bilder:** `photo-1581094271901-8022df4466f9`, `photo-1558618666-fcd25c85cd64`.

---

### Oppgave 2.6 — Rørlegger (`maler/rorlegger/`)

**Status:** Allerede har Hero-type A på `index.html`. Sjekk om undersider matcher.

**Variants:**
- `tjenester.html`: priser per akutt vs. ikke-akutt — to-kolonne sammenligning
- `om-oss.html`: varierer
- `kontakt.html`: behold akutt-CTA-fokus

---

## Del 3 — Globale ting

### Oppgave 3.1 — Bilder-mappe per bransje

Opprett `maler/bilder/snekker/`, `maler/bilder/bilverksted/`, `maler/bilder/malerfirma/`, `maler/bilder/psykolog/` (hvis de mangler). Du trenger ikke laste ned faktiske filer — `onerror`-fallback til Unsplash dekker. Men `<img src=...>` skal peke på lokal sti for fremtidig bruk.

### Oppgave 3.2 — Konsistente CTA-tekster (variér per mal)

Ikke alle skal si "Få gratis befaring". Forslag per bransje:
- Snekker: "Få gratis befaring"
- Bilverksted: "Book time nå"
- Malerfirma: "Få fastpris-tilbud"
- Psykolog: "Book uforpliktende samtale"
- Elektriker: "Få gratis tilbud"
- Rørlegger: "Akutt? Ring nå" (rød pulse) + "Få tilbud"
- Tannlege: "Book time gratis"
- Frisør: "Book time"
- Regnskap: "Gratis konsultasjon"
- Barber: "Book time"

Sjekk og rediger der det er feil.

### Oppgave 3.3 — Oppdater screenshot.js med flerside-undersider

Legg til alle undersider i `all`-arrayen så `node screenshot.js all` dekker alt:

```js
{ file: 'bilverksted/tjenester.html', out: 'bilverksted-tjenester' },
{ file: 'bilverksted/om-oss.html',    out: 'bilverksted-om-oss' },
{ file: 'bilverksted/kontakt.html',   out: 'bilverksted-kontakt' },
// gjenta for alle 6 flerside-maler
```

### Oppgave 3.4 — Oppdater gallerisiden (`maler/index.html`)

Gallerikortene viser screenshots av malene. Hvis screenshots er gamle: kjør `node screenshot.js all` på slutten og verifiser at gallery viser nye versjoner.

---

## Sluttsteg

1. Kjør `node screenshot.js all` siste gang.
2. Sjekk at gallery.png viser tydelig forskjellige maler.
3. Skriv en kort oppsummering med:
   - Hvilke maler som ble endret
   - Hvilken hero-type hver fikk
   - Hvilke screenshots brukeren bør se på
4. Hvis noen oppgave ikke kunne fullføres: list i bunnen som "Trenger brukerinput".
5. **Ikke commit eller push** — brukeren gjør det selv.

---

## Tillatelser i auto-modus

OK uten å spørre:
- Edit/Write i `maler/` og rotmappen
- `node screenshot.js`, `node screenshot-page.js`
- Lese screenshots
- Lage nye HTML-seksjoner inline
- Endre fonter via Google Fonts (legg til `<link>`)

IKKE OK uten å spørre:
- `git commit`, `git push`
- Slette filer (overskrive er greit)
- Endre `package.json`
- Modifisere `demo.html` (brukeren har eksplisitt sagt den skal stå urørt)
- Røre filer utenfor `maler/`, `index.html`, `.claude/`, `screenshot*.js`, `OPPGAVER*.md`
