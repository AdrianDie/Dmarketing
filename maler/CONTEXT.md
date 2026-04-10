# Nettsidemaler — Dietrichs Marketing
## Kontekstdokument for malutvikling

---

## Formål
Bygge 3 bransjespesifikke nettsidemaler i ren HTML/CSS/JS som:
- Gjenspeiler designspråket til dmarketing.no
- Kan tilpasses av Claude Code på 1–2 timer per kunde
- Hostes gratis på Vercel/Netlify
- Selges for 5 000 kr inkl. mva per stk
- Brukes som inngangsdør til Google Ads-forvaltning (3 000–5 000 kr/mnd)

---

## Designsystem (fra dmarketing.no)

### Farger
```css
--black: #050505
--white: #F5F5F5 (whitesmoke)
--primary: #0339f8   /* elektrisk blå */
--secondary: #1c1c1c
--dark-gray: #404040
--drop-shadow: #0339f833
```

### Typografi
- Font: **Archivo** (Google Fonts), weights 300/400/500/600/700
- Heading-stil: kombinasjon av fylt tekst + outline-tekst (`-webkit-text-stroke`)
- Logoformat: to h1-elementer ved siden av hverandre

### Animasjoner (gjenimplementert i vanilla JS/CSS — ingen Webflow-avhengighet)
1. **Preloader**: split-screen (venstre/høyre panel glir fra sidene), forsvinner etter 1.2s
2. **fadeSlideUp**: `opacity: 0 → 1` + `translateY(40px → 0)`, trigger: Intersection Observer
3. **Scrolling ticker**: horisontal loop med bransjerelevant tekst
4. **Knapp hover**: to kopier av tekst, den øverste glir ned og erstattes
5. **Hamburger-meny**: fullskjerm overlay, nummererte lenker, outline-tekststil
6. **Kortvendig hover**: mørkt kort som avslører innhold ved hover

### Layoutmønstre
- Max-width container: 1200px, padding 0 24px
- Seksjoner: `padding: 112px 0`
- Hero: stor tekst venstre + bilde/visuelt element høyre
- CTA-blokk: stor outline + fylt tekst kombinert, knapp under
- Innholdsgitter: 2-kolonne eller 3-kolonne flex/grid

---

## Maler som skal lages

### Mal 1: Rørlegger / Håndverker (`rorlegger.html`)
**Målgruppe**: Rørleggerfirmaer, VVS-bedrifter, 5–20 ansatte, lokale
**Primær CTA**: Ring nå (tlf-lenke) + Book befaring
**Sekundær CTA**: Google Ads (akutt, lokale søk)
**Seksjoner**:
1. Preloader
2. Navigasjon (hamburger)
3. Hero: "Rask og pålitelig rørlegger i [By]" + akutt-CTA
4. Trust-bar: Sertifisert, X år erfaring, X oppdrag utført, Garanti
5. Tjenester: Akutt utrykning, Baderoms-renovering, Varmtvann/bereder, Kjøkken
6. Slik fungerer det: 3 steg (Ring → Befaring → Ferdig)
7. Om oss: Lokalt firma, sertifisert, forsikret
8. Anmeldelser: 3 testimonials med stjerner
9. Kontakt/CTA: "Ring oss nå" + skjema
10. Footer

### Mal 2: Tannlege / Helseklinikk (`tannlege.html`)
**Målgruppe**: Tannlegeklinikker, kiropraktorer, 2–10 ansatte
**Primær CTA**: Book time (online booking)
**Sekundær CTA**: Google Ads (tannlege i by, akutt tannlege)
**Seksjoner**:
1. Preloader
2. Navigasjon
3. Hero: "Din tannlege i [By]" + book time CTA
4. Trust-bar: Erfarne tannleger, Moderne utstyr, Rolig atmosfære, Alle aldersgrupper
5. Tjenester: Undersøkelse, Tannbleking, Implantat, Barn & Unge, Akutt
6. Team: Foto + navn + tittel (3 tannleger)
7. Teknologi: Digitalt røntgen, Invisalign, etc.
8. Anmeldelser: slider
9. FAQ: 5 vanlige spørsmål
10. Book time CTA
11. Footer

### Mal 3: Regnskapsbyrå / Fagbyrå (`regnskap.html`)
**Målgruppe**: Regnskapsbyråer, revisjonsbyråer, 2–15 ansatte
**Primær CTA**: Gratis konsultasjon
**Sekundær CTA**: Google Ads (regnskapsfører, regnskapsbyrå i by)
**Seksjoner**:
1. Preloader
2. Navigasjon
3. Hero: "Vi tar regnskapet — du tar veksten"
4. Trust-bar: Autorisert, X klienter, Digitalt, Rask respons
5. Tjenester: Regnskap, Lønn, MVA/skatt, Årsoppgjør, Rådgivning
6. Slik jobber vi: 3 steg (Onboarding → Løpende → Rapportering)
7. Om oss + team
8. Anmeldelser
9. Prismodeller (3 pakker): Liten, Medium, Vekst
10. Kontakt/CTA
11. Footer

---

## Teknisk stack per mal
- HTML5 semantisk markup
- CSS: custom properties, flexbox/grid, animasjoner
- JS: vanilla (Intersection Observer, hamburger, slider, smooth scroll)
- Fonts: Google Fonts (Archivo)
- Ikoner: SVG inline eller Unicode
- Bilder: Unsplash placeholder-URLer (enkelt å bytte)
- Ingen eksterne avhengigheter (ingen Bootstrap, jQuery, Webflow)

---

## Tilpasningspunkter per kunde (hva Claude Code bytter ut)
1. Bedriftsnavn og logo-tekst
2. By/område (søk/erstatt)
3. Telefonnummer og e-post
4. Bilder (Unsplash-URLer → kundens bilder)
5. Fargeaksent (--primary: #0339f8 → kundens farge)
6. Tjenester og priser
7. Om oss-tekst og team
8. Anmeldelser

---

### Mal 4: Frisørsalong / Skjønnhet (`frisor.html`)
**Målgruppe**: Frisørsalonger, hudpleiere, skjønnhetssalonger
**Primær CTA**: Book time (bookingskjema)
**Sekundær CTA**: Google Ads (frisør i by, billig frisør)
**Seksjoner**:
1. Preloader
2. Navigasjon (hamburger + overlay)
3. Hero: Split-screen — venstre tekst, høyre bilde med rating-overlay
4. Ticker: tjenester
5. Trust-bar: Erfarne stylister, Miljøvennlige produkter, Online booking, Garanti
6. Tjenester: Klipp, Farge, Keratin, Brudestyling, Forlengelse, Herre
7. Team: 3 stylister (bilde + navn + rolle + spesialitet)
8. Galleri: horisontal scroll med 5 bilder
9. Anmeldelser: 3 testimonials
10. Booking: kontaktinfo + skjema med tjenestevalg
11. Final CTA
12. Footer med kolonner

### Mal 5: Elektriker / El-firma (`elektriker.html`)
**Målgruppe**: Elektrikerfirmaer, el-installatører, 3–15 ansatte
**Primær CTA**: Ring nå (akutt 24/7) + Book befaring
**Sekundær CTA**: Google Ads (elektriker i by, akutt elektriker)
**Seksjoner**:
1. Preloader
2. Navigasjon (hamburger + overlay)
3. Hero: Fullbredde bakgrunnsbilde + pulserende akutt-badge (rød)
4. Ticker: ⚡ tjenester
5. Trust-bar: DSB-registrert, Forsikret, Dokumentasjon, Rask respons
6. Tjenester: Akutt, Sikringsskap, EL-bil lader, Solceller, Smarthjem, Nybygg
7. Slik jobber vi: 3 steg (fullbredde mørk bakgrunn)
8. Om oss: bilde + tekst + sertifiseringsbadger (DSB, Enova, NELFO)
9. Anmeldelser: 3 testimonials
10. Kontakt/CTA: kontaktinfo + skjema med adressefelt
11. Footer

---

## Prioritert rekkefølge
1. `rorlegger.html` — høyest volum, enklest salg, tydelig CTA
2. `tannlege.html` — høy verdi per kunde, trust-fokusert
3. `regnskap.html` — B2B, lengre salgssyklus, høy LTV
4. `frisor.html` — høyt søkevolum, visuell, book time
5. `elektriker.html` — akutt-søk, elbil-lader trending

---

## Galleri-side
`index.html` (lokalt) / `dmarketing.no/maler` — viser alle 5 maler med:
- Inline CSS-forhåndsvisning (mini template-visual)
- Bransjenavn + pris
- "Se demo" + "Bestill tilpasning" knapper
- Inkludert-liste, slik-fungerer-det og final CTA
