# OPPGAVER.md — Autonom kjøreplan

> **Til Claude:** Dette dokumentet skal kjøres i auto-modus uten å spørre brukeren om tillatelse for hvert steg.
> Følg rekkefølgen 1 → 2 → 3 → 4. Alle steg er reversible (filendringer i et git-repo).
> Etter hver oppgave: ta screenshot med `node screenshot.js <relevant-mal>` og verifiser visuelt før du går videre.
>
> **Bootstrap først:** les `SETUP.md`, kjør `npm install`, verifiser at `node screenshot.js gallery` virker, og bekreft at `frontend-design`-skillen vises i `/skills` (ligger lokalt på `.claude/skills/frontend-design/SKILL.md`).

---

## Oppgave 1 — Fjern priser fra gallerisiden + hero på malene

### 1A. Gallerisiden: `maler/index.html`

Fjern alle pris-badges fra mal-kortene. Konkrete linjer (verifiser med Grep — linjenumre kan flytte seg):

- L180: `Fra 1 000 kr oppsett` — fjern hele linjen/elementet.
- L188: `<div class="font-display ...">1 000 kr</div>` — fjern hele div-elementet.
- L220: `<span class="text-xs ...">1 000 kr oppsett · 750 kr/mnd</span>` — fjern.
- L238, 259, 280, 301, 322, 343, 367, 390, 413, 436: alle `<span>...1 000 kr</span>`-badges i hjørnet av kortene — fjern hele span-elementet.

**Strategi:** Bruk Grep til å finne alle forekomster av `1 000 kr`, `kr/mnd`, `kr oppsett` i `maler/index.html`. Fjern HELE elementet (span/div/p) som inneholder pris-teksten, ikke bare teksten — ellers står det igjen et tomt badge.

Sjekk at kort-layouten ikke kollapser (badgen kan være en del av en flex-container — i så fall behold containeren men fjern barn-elementet).

### 1B. Selve malene — fjern priser som er synlige i hero (øvre 900px)

Pris i hero forstyrrer screenshot-previews. Sjekk hver mal:

```
maler/bilverksted.html
maler/snekker.html
maler/malerfirma.html
maler/psykolog.html
maler/elektriker.html
maler/rorlegger.html
maler/tannlege.html
maler/frisor.html
maler/regnskap.html
maler/barber.html
maler/bilverksted/index.html
maler/snekker/index.html
maler/malerfirma/index.html
maler/psykolog/index.html
maler/elektriker/index.html
maler/rorlegger/index.html
```

For hver fil:
1. Grep etter `\d[\s.,]?\d{3}\s?kr` og `kr/mnd` og `fra kr`.
2. Hvis treffet er innenfor de første ~250 linjene (stort sett tilsvarer hero + start på neste seksjon): vurder å fjerne det. Behold prisene som ligger lenger ned i en pris-tabell-seksjon.
3. Pris-pill i hero (f.eks. "fra 1 490 kr" på `bilverksted.html` L262) → fjern HELE `<p>`-elementet.
4. **Behold pristabeller** på dedikerte `tjenester.html`-undersider (f.eks. `maler/bilverksted/tjenester.html` L182-184) — de skal ikke vises i screenshot uansett.

### 1C. Verifiser

```bash
node screenshot.js all
```

Åpne PNG-ene i `maler/temporary_screenshots/` og bekreft at ingen pris vises i hero. Hvis noe gjenstår: gjenta 1B for de aktuelle filene.

---

## Oppgave 2 — Legg til "Se malene"-seksjon på forsiden

På `index.html` (ikke maler/index.html) — legg til en seksjon før footer som fører til `maler/index.html`.

**Plassering:** Før `<footer>` eller før den siste store seksjonen. Bruk søk for å finne et naturlig innstikkpunkt.

**Innhold:**
- Overskrift: f.eks. "Se ferdige nettsidemaler"
- Underskrift: kort tekst, ca. "12+ ferdige design tilpasset norske bransjer. Klare på under 7 dager."
- CTA-knapp: "Se alle malene →" som lenker til `maler/index.html`
- Optional: 3 mini-thumbnails som tease (kan bruke screenshots fra `maler/temporary_screenshots/`).

**Stil:** Følg eksisterende stil i `index.html` (Webflow-klasser, `section`, `container`, `btn-primary` eller hva som finnes der). Ikke bland inn Tailwind med mindre det allerede brukes der.

**Verifiser:** Åpne `index.html` lokalt eller ta screenshot:
```bash
node -e "const p=require('puppeteer');(async()=>{const b=await p.launch();const pg=await b.newPage();await pg.setViewport({width:1440,height:900});await pg.goto('file://'+require('path').resolve('index.html').replace(/\\\\/g,'/'),{waitUntil:'networkidle0'});await pg.screenshot({path:'maler/temporary_screenshots/forside.png',fullPage:true});await b.close();})();"
```

---

## Oppgave 3 — Standardiser meny på alle sider

Forsiden `index.html` har en meny med:
- Hamburger-knapp øverst (`navigation__menu-btn` — "Meny" / "Lukk")
- Overlay-meny med nav-items (`nav-items`) som har nummerert design ("01 Forside", "02 Tjenester" osv.)
- Hover-effekt: tekst med stroke (transparent fyll, grå outline) som "fylles inn" — styres av `.nav-item-text` (transparent stroke) og `.nav-item-text-full` (full farge på hover)

**Mal-blokken** ligger i `index.html` linje ~108-200 (fra `<section>` med `navbar-2` til `</section>` etter `nav-container-2`). Inkluder også Webflow-script og CSS som driver animasjonen — sjekk hva som brukes:

1. Identifiser hvilke `.css`-filer + JS-filer som driver menyen:
   - `css/normalize.css`
   - `css/webflow.css`
   - `css/dietrichsmarketing.webflow.css`
   - JS: typisk Webflow's IX2 (interactions) — sjekk `<script>`-tagger nederst i `</body>` på `index.html`.
2. Filer som skal få samme meny:
   - `tjenester.html`
   - `kontakt.html`
   - `ai-webmaster.html`
   - `webdesign.html`
   - `google-ads.html`
   - `artikler.html`
   - `works.html`
   - `about.html`
   - `demo.html`  ← spesielt nevnt av brukeren
   - `under-utvikling.html`
   - `pakkeforslag-mal.html`
   - Og: `maler/index.html` (gallerisiden)

**Strategi:**
1. Kopier hele meny-blokken (section navbar-2 + nav-container-2) fra `index.html`.
2. Sjekk at hver målside har de samme CSS/JS-imports øverst (`webflow.css`, `dietrichsmarketing.webflow.css`, og evt. webflow.js nederst). Hvis ikke: legg dem til.
3. Sett inn meny-blokken rett etter `<body>` (eller etter preloader hvis det finnes).
4. Pass på `aria-current="page"` — flytt fra "Forside" til riktig nav-item på hver side (Tjenester på tjenester.html, osv.). Eller bare fjern `aria-current` overalt om enklere.
5. Pass på relative paths: `maler/index.html` skal være `../index.html` fra mal-undersider.

**Spesielt for `demo.html`:** Sjekk først om den har en eksisterende meny — bytt den ut, ikke duplisér. `demo.html` ligger i rot, så samme paths som forsiden.

**Verifiser hover-animasjon:** Last siden i en lokal browser eller via Puppeteer:
```bash
node -e "const p=require('puppeteer');(async()=>{const b=await p.launch({headless:false});const pg=await b.newPage();await pg.goto('file://'+require('path').resolve('demo.html').replace(/\\\\/g,'/'));await new Promise(r=>setTimeout(r,5000));await b.close();})();"
```
Når du hover over en nav-item skal stroke-teksten "fylles inn" med farge.

---

## Oppgave 4 — Forbedre malene Bilverksted, Snekker, Malerfirma, Psykolog

**Problem (fra brukeren):**
- Malene er for like — hero sier alle "X du kan stole på".
- Trenger mer ulikt innhold og flere bilder.

### 4A. Hero-variasjon — fjern "kan stole på"-clichéen

Filer som må endres:
- `maler/bilverksted.html` (sjekk hero) + `maler/bilverksted/index.html` L50: `Verksted du kan stole på`
- `maler/snekker.html` L110 + `maler/snekker/index.html` L47: `Snekker du kan stole på`
- `maler/malerfirma.html` L110: `kan stole på`
- `maler/psykolog/index.html` (sjekk) + `maler/psykolog/om-oss.html` L47

Gi hver mal et **unikt heading-konsept**. Forslag (bruk frontend-design skill for finjustering, eller bytt ut med noe i samme ånd):

| Mal | Nytt hero-konsept | Eksempel-heading |
|---|---|---|
| Bilverksted | Fokus på effektivitet og fast pris | "Bilen klar når vi sier den er klar" |
| Snekker | Fokus på håndverk + lokalt | "Solid håndverk, levert i [By]" |
| Malerfirma | Fokus på resultatet | "Ferdig malt — i tide, til avtalt pris" |
| Psykolog | Fokus på trygghet uten klisjé | "Et rom å tenke høyt i" |

**Brukeren får velge** når den ser screenshot — men bruk forslagene over som default. Pass på at varianten beholder samme HTML-struktur (linjebryt, span-farge på siste ord) så designet ikke knekker.

### 4B. Variér hero-layout per mal

Per CLAUDE.md skal hero variere mellom:
- **Sentrert** (tekst midt, dot-grid bg)
- **Asymmetrisk** (tekst venstre, bilde overlapper)
- **Fullbredde bilde** (med glassmorphism-overlay)

Tildel én layout-type til hver mal. Foreslått:
- Bilverksted → Asymmetrisk (verksted-bilde til høyre)
- Snekker → Fullbredde bilde (treverk + verktøy som bakgrunn)
- Malerfirma → Sentrert (malerstrøk-detalj som dot-grid)
- Psykolog → Asymmetrisk (lyst rom til høyre, mykt)

Implementer ved å bytte hero-section per mal. Behold de andre seksjonene som de er foreløpig.

### 4C. Flere bilder

Sjekk `maler/bilder/` — kun 5 bransjer har bilder (`elektriker`, `frisor`, `regnskap`, `rorlegger`, `tannlege`). Bilverksted/snekker/malerfirma/psykolog mangler.

For hver mal:
1. Opprett mappe `maler/bilder/<bransje>/` (skip hvis finnes).
2. Identifiser hvor bilder brukes i malen (Grep `<img`).
3. Bruk Unsplash-fallback URL-er (allerede i `onerror`-pattern fra CLAUDE.md). Ikke last ned filer — la `onerror` peke på Unsplash-URL.

Eksempel-Unsplash-tema per bransje (bruk søk-URL-format):
- Bilverksted: `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80` (verksted)
- Snekker: `https://images.unsplash.com/photo-1572297743593-1a06d3a0a6c3?auto=format&fit=crop&w=1200&q=80` (treverk)
- Malerfirma: `https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80` (maling)
- Psykolog: `https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80` (lyst rom)

(Verifiser at URL-er svarer 200 — bruk evt. WebFetch eller bare la `onerror`-fallback gjelde også Unsplash-treff.)

Legg til **minst 2-3 nye bilder** per mal:
- 1 i hero (hvis layout krever)
- 1-2 i en ny "Galleri av prosjekter"-seksjon eller "Slik jobber vi"-seksjon
- Tjeneste-kort med ikon-only kan oppgraderes til ikon + småbilde

### 4D. Variér innhold-seksjoner per mal

Hver mal bør ha minst **én unik seksjon** ingen av de andre har:

- **Bilverksted**: "EU-kontroll-sjekkliste" eller "Vanlige problemer + cirka kostnad" (uten faktisk pris-tall — abstrakt som «medium / høy»).
- **Snekker**: "Prosjekt-tidslinje" — fra befaring til ferdig levering, 4 steg med ikoner.
- **Malerfirma**: "Fargevelger" eller "Før/etter-galleri" (placeholder-bilder).
- **Psykolog**: "Hva skjer på første time" + "Når kontakte oss"-sjekkliste (myk/empatisk tone, ikke kommersiell).

### 4E. Verifiser hver mal med screenshot-loop

For hver av de 4 malene:

```bash
node screenshot.js bilverksted
node screenshot.js snekker
node screenshot.js malerfirma
node screenshot.js psykolog
```

Les PNG (Read-verktøy). Sjekk:
1. Heroen er unik (ikke "kan stole på").
2. Layout følger sin tildelte type (sentrert/asymmetrisk/fullbredde).
3. Ingen synlige priser i øvre 900px (oppgave 1B).
4. Ingen brutt layout (overlap, text cutoff, manglende bilde-fallback).

Itererer til screenshot ser bra ut. Maks 3 iterasjoner per mal — hvis fortsatt feil: dokumentér i `OPPGAVER-FEIL.md` og gå videre.

---

## Oppgave 5 — Forbedre flersides-malene (4-siders)

**Mål:** Hev kvaliteten på alle flersides-maler. Bruk `frontend-design`-skillen aktivt og **varier den estetiske retningen per mal** — ingen to maler skal føles like.

**Maler i scope** (hver har 4 sider: `index.html`, `tjenester.html`, `om-oss.html`, `kontakt.html`):

```
maler/bilverksted/
maler/snekker/
maler/malerfirma/
maler/psykolog/
maler/elektriker/
maler/rorlegger/
```

### 5A. Tildel en distinkt estetisk retning per mal

Frontend-design-skillen ber deg velge en BOLD aesthetic direction per prosjekt. Tildel én tydelig retning per mal — disse er forslag, juster om noe annet passer bedre etter du har sett dagens innhold:

| Mal | Estetisk retning | Stikkord |
|---|---|---|
| Bilverksted | Industriell / utilitarian | Mørke metallaksenter, monospace-detaljer, presisjon |
| Snekker | Organisk / natural | Varm beige/treverk-palett, serif display, taktil følelse |
| Malerfirma | Editorial / magazine | Stor typografi, asymmetrisk layout, fargefelt som "swatcher" |
| Psykolog | Soft / refined | Lyse pasteller, generøs whitespace, rolig serif |
| Elektriker | Technical / precise | Skarpe linjer, lys aksent på mørk, grid-tunge layouts |
| Rørlegger | Akutt / pålitelig | Rød/blå akutt-aksent, sterk hierarki, "alltid tilgjengelig"-tone |

Hver retning skal være **gjennomgående på alle 4 sider** i den malen — typografi, farger, motion, mønstre.

### 5B. Sjekkliste per mal

For hver av de 6 malene, gå gjennom **alle 4 sidene** og se etter forbedringer i:

1. **Typografi** — bruker alle 4 sidene samme display-font? Er den distinkt (ikke Inter/Roboto)? Har body-font god kontrast i vekt mot display?
2. **Farge & tema** — bruker malen CSS-variabler konsekvent? Er det én tydelig dominant farge + skarp aksent, ikke en jevn fordeling?
3. **Hero per side** — varier mellom sidene innenfor samme mal også. `index.html` kan f.eks. være sentrert, `tjenester.html` asymmetrisk, `om-oss.html` editorial, `kontakt.html` minimal.
4. **Bakgrunner & detaljer** — har siden bare flate fargefelt? Legg til atmosfære: gradient mesh, noise texture, geometrisk mønster, dramatisk skygge, dekorativ border.
5. **Spatial composition** — er layouten predikbar (hero → 3-grid → CTA)? Bryt rutenett, overlap, diagonal flyt, generøs negativplass eller kontrollert tetthet.
6. **Motion** — én godt orkestrert page-load (staggered reveals med animation-delay) er bedre enn spredte mikro-interaksjoner. Bruk Motion.js eller CSS-only.
7. **Konsistens på tvers av sider** — meny, footer, knappe-stil, kort-radius, padding-skala må være identiske mellom de 4 sidene i samme mal.
8. **Innhold** — er teksten generisk? Erstatt med noe konkret og bransje-spesifikt. Ingen klisjeer ("vi er lidenskapelige om...", "din partner for..."). Konkrete tall, prosesser, scenarier.
9. **Bilder** — minst 2-3 bilder per side med `onerror`-fallback til Unsplash. Aspect-ratio satt for å unngå layout shift.
10. **Konvergens** — sjekk at du IKKE har valgt samme font/farge/layout som forrige mal du jobbet med. Frontend-design-skillen sier eksplisitt: "NEVER converge on common choices across generations."

### 5C. Arbeidsflyt per mal

Anbefalt rekkefølge for å hindre at du henger fast i én mal:

1. Velg én mal → velg estetisk retning fra 5A.
2. Jobb deg gjennom `index.html` først (hero + 2-3 hovedseksjoner). Implementér retningen fullt ut.
3. Ta screenshot: `node screenshot.js <mal>-flerside` (sjekk navn-mapping i `screenshot.js`).
4. Kjør Puppeteer på de andre 3 sidene (de mangler i screenshot.js — bruk inline-kommando):

```bash
node -e "const p=require('puppeteer'),fs=require('fs'),path=require('path');(async()=>{const b=await p.launch();const pg=await b.newPage();await pg.setViewport({width:1440,height:900,deviceScaleFactor:1.5});const mal='bilverksted';for(const s of ['tjenester','om-oss','kontakt']){const f=`maler/${mal}/${s}.html`;if(!fs.existsSync(f))continue;await pg.goto('file://'+path.resolve(f).replace(/\\\\/g,'/'),{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,1200));await pg.screenshot({path:`maler/temporary_screenshots/${mal}-${s}.png`,fullPage:false});console.log(s);}await b.close();})();"
```

(Bytt `mal=` til hver av de 6 mal-navnene.)

5. Les alle 4 PNG-er. Sjekk konsistens og kvalitet mot 5B-listen.
6. Itererer maks 3 ganger per mal. Hvis 3. iterasjon fortsatt har problemer: notér i `OPPGAVER-FEIL.md` og gå videre til neste mal.
7. Når alle 6 maler er ferdige: kjør screenshot for alle og sammenlign side-ved-side at retningene er **synlig forskjellige**.

### 5D. Utvid screenshot.js med flersides-undersider

For å gjøre framtidige iterasjoner enklere: legg til de manglende undersidene (`tjenester.html`, `om-oss.html`, `kontakt.html` for hver flerside-mal) i `all`-arrayen i `screenshot.js`. Da kan `node screenshot.js all` fange alt på én kommando.

Eksempel-tillegg:

```js
{ file: 'bilverksted/tjenester.html', out: 'bilverksted-tjenester' },
{ file: 'bilverksted/om-oss.html',    out: 'bilverksted-om-oss' },
{ file: 'bilverksted/kontakt.html',   out: 'bilverksted-kontakt' },
// gjenta for snekker, malerfirma, psykolog, elektriker, rorlegger
```

### 5E. Hva "logiske endringer" betyr

Eksempler på endringer du skal kunne ta selv uten å spørre:
- Bytte font (importer ny Google Font, oppdatere CSS).
- Justere fargevariabler i `:root`.
- Legge til/fjerne en seksjon hvis den ikke gir verdi eller mangler.
- Endre hero-layout-type per mal.
- Erstatte stock-tekst med mer konkret bransje-tekst.
- Legge til subtle bakgrunnsdetalj (noise, mesh, mønster).
- Justere padding/spacing for å følge "py-24"-regelen i CLAUDE.md.
- Legge til Motion.js scroll-reveal hvis det mangler.

Eksempler på endringer du IKKE tar uten brukerinput:
- Skifte teknologi-stack (f.eks. React, Vue) — hold deg til vanilla HTML+Tailwind+Motion.js.
- Slette en hel side i en flerside-mal.
- Endre URL-struktur eller filnavn.
- Legge til eksterne tracking-scripts.

---

## Sluttsteg — Oppsummering

Når oppgave 1-4 er fullført:

1. Kjør `node screenshot.js all` siste gang.
2. Skriv en kort oppsummering i sluttmelding til brukeren:
   - Hvilke filer ble endret
   - Hvor mange priser som ble fjernet
   - Hvilke maler som fikk ny hero
   - Hvilke screenshot-filer brukeren bør se på først
3. Ikke commit endringer (brukeren gjør det selv hvis ønskelig).
4. Hvis noen oppgave ikke kunne fullføres autonomt: list i bunnen av oppsummeringen som "Trenger brukerinput".

---

## Tillatelses-notat for auto-modus

Disse handlingene utføres uten å spørre:
- Lese filer
- Edit/Write i prosjektmappen (`C:\Users\adria\OneDrive\Dietrichs Marketing\Github\Dmarketing` og undermapper)
- Kjøre `npm install` og `node screenshot.js`
- Lese screenshots fra `maler/temporary_screenshots/`

Disse skal IKKE gjøres uten å spørre:
- `git commit` / `git push`
- Slette filer (kun overskrive er greit)
- Endre `package.json`-versjoner
- Installere nye npm-pakker som ikke allerede er i `package.json`
- Kalle eksterne API-er som koster penger
