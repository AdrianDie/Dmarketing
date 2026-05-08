# CLAUDE.md — Dietrichs Marketing

> **FØR du gjør noe i dette prosjektet:** les `SETUP.md` og kjør gjennom bootstrap-sjekklisten der (Node-avhengigheter, frontend-design skill, Puppeteer screenshot-loop). Ikke hopp over.

> **Les også [docs/CLAUDE_NOTES.md](docs/CLAUDE_NOTES.md)** ved første relevante CSS/UI/arkitektur-oppgave i sesjonen — levende hjelpedokument med arkitektur, vanlige feller (Webflow vs Tailwind, margin-collapse, specificity-kollisjoner), workflow-mønstre (PR-flyt, worktree, lokal server), og verktøy. **Oppdater dokumentet når du oppdager noe nytt.**

## Obsidian-vault i `docs/`

`docs/`-mappen er en Obsidian-vault for prosjekt-kunnskap. Strukturen:

- `docs/Home.md` — landingsside
- `docs/CLAUDE_NOTES.md` — Claude-samarbeids-doc (les ved CSS/UI-oppgaver)
- `docs/clients/` — klient-noter (én note per kunde)
- `docs/decisions/` — arkitektur/forretnings-beslutninger med dato
- `docs/leads/` — lead-tracker
- `docs/topics/` — emner og strategier

**Når du skal:**
- Foreslå CSS/UI-endring → sjekk `docs/CLAUDE_NOTES.md` for relevante feller først
- Jobbe med en spesifikk klient → les `docs/clients/<navn>.md` hvis den finnes
- Ta en arkitektur-beslutning → opprett `docs/decisions/<dato>-<tema>.md`
- Oppdage en ny felle eller workflow-issue → oppdater `docs/CLAUDE_NOTES.md`

Vaulten skrives i ren markdown med YAML front matter (`tags:`, `type:`, osv.) — Obsidian gir grafvisning, men filene er normale `.md` du kan redigere fritt.

## Prosjektkontekst
Nettsidemaler for norske småbedrifter. Selges for 5 000–20 000 kr per stk.
Inngangsdør til Google Ads-forvaltning (3 000–5 000 kr/mnd recurring).

---

## Design-filosofi: "Linear-stil"

Inspirasjoner: Linear.app, Vercel, Stripe, Luma
Stikkord: Presist, luftig, profesjonelt, dyrt-utseende

### 1. White space er gratis — bruk mye av det
- Seksjoner: minimum `padding: 96px 0` (Tailwind: `py-24`)
- Mellom elementer: konsistente gap (`gap-6` til `gap-12`)
- Aldri fyll skjermen med innhold

### 2. Typografi-hierarki
- **Display font** (bransjespecifik) for headings
- **Inter** for all brødtekst (30/400 for ingress, 400 for vanlig tekst)
- Heading sizes: `text-5xl` → `text-7xl` for hero, `text-3xl`–`text-4xl` for seksjoner
- Letter-spacing: `-0.03em` til `-0.05em` for store headings
- Aldri mer enn 3 font-weights per side

### 3. Farge-regler
- Bakgrunn: `#FAFAFA` (nesten hvit) eller `#FFFFFF`
- Tekst: `#09090B` (nesten svart, ikke helt svart)
- Muted tekst: `#71717A`
- Aksent: Bransje-spesifikk (se PLAN.md)
- **Ingen tunge svarte blokker** — footer er unntaket
- Mørke seksjoner: bruk `#0F172A` (navy) eller glassmorphism
- Borders: `#E4E4E7` (Tailwind: `border-zinc-200`)

### 4. Komponenter

#### Nav
```
- Fixed, z-50
- Transparent → backdrop-blur + bg-white/80 på scroll
- Høyde: 56–60px
- Logo: display-font, liten størrelse
- Ingen bakgrunnsfarge på standard (transparent over hero)
```

#### Hero
Varier mellom disse typene — aldri den samme på alle maler:
- **Sentrert**: Tekst midt, bred, dot-grid bakgrunn
- **Asymmetrisk**: Tekst venstre, bilde overlapper
- **Fullbredde bilde**: Med glassmorphism-overlay for tekst

#### Bento Grid
```css
/* Bruk for services/stats */
display: grid;
grid-template-columns: repeat(12, 1fr);
/* Store kort: col-span-8, medium: col-span-4, small: col-span-4 */
```

#### Kort
```
- bg-white border border-zinc-100 rounded-2xl
- Padding: p-6 eller p-8
- Hover: shadow-lg + translateY(-2px)
- Ingen outline/stroke-stil — fylt hvit
```

#### Knapper
```
Primary: bg-brand text-white px-6 py-3 rounded-lg font-medium
         hover: scale(1.02) + subtle glow (box-shadow)
Ghost: border border-zinc-200 hover: border-zinc-400
Emergency: bg-red-600 text-white (bare for akutt-bransjer)
```

#### Seksjoner
```
- Bakgrunn: alternér white og zinc-50
- Aldri to mørke seksjoner på rad
- Footer: alltid mørk (navy #0F172A)
```

### 5. Animasjoner (Motion.js)

```javascript
// Standard scroll-reveal
const { inView, animate } = Motion;
inView('[data-animate]', ({ target }) => {
  animate(target, 
    { opacity: [0, 1], y: [24, 0] }, 
    { duration: 0.5, easing: [0.25, 0.46, 0.45, 0.94] }
  );
});

// Staggered children
inView('[data-stagger]', ({ target }) => {
  animate(target.querySelectorAll(':scope > *'),
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.4, delay: animate.stagger(0.08) }
  );
});
```

Regler:
- Fade + translateY(24px→0) for alle scroll-reveals
- Stagger 80ms mellom children i grid/list
- Knapper: scale(1.02) på hover, 150ms
- Ingen bounce-animasjoner (for amatørmessig)
- Aldri animere tekst letter-by-letter (forstyrrende)

### 6. Bilder
- Lokale bilder: `bilder/[bransje]/filnavn.jpg`
- Alltid `onerror="this.src='[unsplash-url]'"` som fallback
- `object-fit: cover` alltid
- Bilder skal ha aspect-ratio definert (unngå layout shift)

### 7. Responsivitet
- Mobile-first med Tailwind breakpoints
- `sm:` (640px) for enkle justeringer
- `md:` (768px) for layout-endringer
- `lg:` (1024px) for full desktop layout
- Bento grid: kollapser til enkeltkolonne på mobil

### 8. Kode-standarder
- Alltid Tailwind CDN for prototyper
- Motion.js for alle animasjoner
- Ingen jQuery, Bootstrap, React
- Inline SVG for ikoner (ingen icon-font)
- `onerror` fallback på alle `<img>`-tagger

---

## Screenshot-workflow
```bash
node screenshot.js [filnavn.html]   # Ta screenshot av én fil
node screenshot.js all              # Ta screenshot av alle maler
```
Resultat lagres i `maler/temporary_screenshots/`

---

## Tilpasningspunkter per kunde
1. `[By]` → kundens by
2. Bedriftsnavn i nav og footer
3. Telefon og e-post
4. Bilder i `bilder/[bransje]/`
5. `--brand: #2563EB` → kundens farge (søk/erstatt)
6. Tjenester og priser
7. Team-info og anmeldelser
