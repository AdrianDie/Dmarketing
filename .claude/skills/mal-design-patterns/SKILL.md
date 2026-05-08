---
name: mal-design-patterns
description: Design-mønstre for Dietrichs nettsidemaler. Bruk denne når du skal forbedre eller bygge maler i maler/-mappen. Inneholder konkrete hero-typer, code-snippets og acceptance criteria — så ingen mal ser "uferdig" eller lik en annen.
---

# Mal-designmønstre — observasjoner og oppskrifter

Dette dokumentet er en operasjonell skill. Bruk den når du jobber i `maler/`. Hver mal skal **velge én distinkt hero-type fra A–E** og holde den gjennomgående. Aldri to maler med samme type i samme bransje-kategori.

---

## Diagnose: hva er en "uferdig" mal?

En mal ser uferdig ut når heroen er **bare sentrert tekst** uten visuell tyngde. Symptomer:

- Sentrert h1 + p + 2 knapper + badge-rad
- Ingen bilde, mockup eller asymmetri
- `bg-grid` eller `dot-grid` som eneste bakgrunn
- Stats-rad rett under hero som eneste "innhold"
- Kopipasta-struktur fra en annen mal (samme klasser, samme pad)

Eksempel-template som er overbrukt (IKKE bruk denne):

```html
<section class="bg-grid relative overflow-hidden">
  <div class="relative max-w-6xl mx-auto px-6 pt-40 pb-28 text-center">
    <div class="badge">…</div>
    <h1 class="text-6xl md:text-7xl lg:text-8xl">…</h1>
    <p>…</p>
    <div class="flex gap-3 justify-center"><a>CTA</a><a>tlf</a></div>
    <div class="flex gap-7 mt-16">…badges…</div>
  </div>
</section>
```

Snekker, malerfirma og psykolog (one-page) bruker akkurat denne. Det er problemet.

---

## Hero-type A — Asymmetrisk med bilde + floating cards

**Når brukes den:** Bransjer som drar nytte av "mennesker på jobb"-bilde — håndverk, kropp/helse, service.
**Eksempel:** `rorlegger.html`

**Anatomi:**
- 2-kolonne grid (`md:grid-cols-2`)
- Tekst venstre, **portrait-bilde** (3:4 aspect) til høyre
- Bildet **overlapper** containeren (negativ margin eller absolute floating cards)
- 2 floating glass-kort over bildet:
  - Stat-kort (f.eks. "~90 min responstid")
  - Anmeldelse-kort med stjerner + navn
- Background blob bak bildet (radial gradient i brand-farge, 6% alpha)

**Mal-snippet:**
```html
<section class="relative min-h-screen flex items-center pt-14 overflow-hidden bg-white">
  <div class="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/4"
       style="background: radial-gradient(circle, rgba(BRAND_R,BRAND_G,BRAND_B,0.06) 0%, transparent 70%);"></div>
  <div class="max-w-6xl mx-auto px-6 w-full">
    <div class="grid md:grid-cols-2 gap-12 items-center py-24">
      <div><!-- text + cta --></div>
      <div class="relative">
        <div class="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
          <img src="bilder/[bransje]/...jpg" onerror="this.src='https://images.unsplash.com/...'" />
          <div class="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-lg"><!-- stat --></div>
          <div class="absolute top-4 -right-4 glass rounded-xl px-3 py-2 shadow-lg"><!-- review --></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Glass-klasse:**
```css
.glass { background: rgba(255,255,255,0.75); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.9); }
```

---

## Hero-type B — Full-bleed bilde med glassmorphism content card

**Når brukes den:** Klinikker, salonger, premium service — der atmosfære er sentralt.
**Eksempel:** `tannlege.html`, `frisor.html`

**Anatomi:**
- Hero høyde = `h-screen` (eller min 90vh)
- Stort bilde dekker hele heroen, `object-cover`
- Linear gradient overlay (transparent topp → mørkt bunn) for tekst-kontrast
- Glass-kort (300–500px bred) med innhold sitter **i en hjørne** (typisk venstre nede)
- Glass-kortet inneholder: badge, h1, p, CTA-rad, og evt. trust-badges som bunn-divider

**Overlay-gradient:**
```css
.hero-overlay {
  background: linear-gradient(to bottom,
    rgba(250,250,250,0.15) 0%,
    rgba(0,0,0,0.25) 60%,
    rgba(0,0,0,0.55) 100%);
}
```

**Nav-trick:** Nav er transparent over hero, blir hvit/blurred på scroll (legg til `.scrolled` JS-klasse).

---

## Hero-type C — Dashboard / produkt-mockup som social proof

**Når brukes den:** Tjenester med digitalt produkt eller måling — regnskap, AI, analyse.
**Eksempel:** `regnskap.html`

**Anatomi:**
- 2-kolonne grid, tekst venstre, **mockup** høyre
- Mockup-frame: macOS-traffic lights øverst (rød/gul/grønn dots), header-bar, faktisk innhold
- Stats-grid (3 kolonner) med tall som "Omsetning YTD: 2,4M", "MVA skyldig: 84 200 kr"
- Et bar-chart eller annen visualisering nederst i mockup
- Hover-detaljer kan komme på mockup, men ikke nødvendig

**Verdi:** Mockup gjør tjenesten konkret og selger funksjonalitet, ikke bare ord.

---

## Hero-type D — Editorial dark + galleri-stripe

**Når brukes den:** Visuelle bransjer der estetikk selger — frisør, barber, fotograf, restaurant.
**Eksempel:** `barber.html`, `frisor.html` (variant)

**Anatomi:**
- Mørk bakgrunn (#0D0D0D eller #111111)
- Hero med fullbleed-bilde + mørk overlay
- En aksent-farge i brand (gull, kobber, dyp grønn — IKKE blå)
- Bottom-stats-bar over bildet (`absolute bottom-0`) med backdrop-blur
- En **masonry/galleri-stripe** rett etter hero med 4–6 portrettbilder
- Typografi: serif eller display med høy kontrast i vekt

**Hero-stat-bar:**
```html
<div class="absolute bottom-0 left-0 right-0"
     style="background: rgba(13,13,13,0.8); backdrop-filter: blur(10px);">
  <div class="grid grid-cols-3 py-6 text-center">
    <div><div class="stat-num">8+</div><div>År erfaring</div></div>
    <!-- ... -->
  </div>
</div>
```

---

## Hero-type E — Bento-grid hero

**Når brukes den:** Tekniske/profesjonelle bransjer der man vil vise mange features samtidig — elektriker, IT, finansiell rådgiver.
**Eksempel:** `elektriker.html` (variant)

**Anatomi:**
- Sentrert eller venstrejustert h1 (mindre enn type A — `text-5xl` ikke `text-7xl`)
- Direkte under: bento-grid med 5–7 kort av variert størrelse
  - 1 stort kort (col-span-8): hovedtjeneste med CTA
  - 2–3 medium kort (col-span-4): statistikk eller features
  - 1–2 små kort: testimonial, sertifikat, kontakt
- Forskjell fra "kopipasta-stats": kortene har distinkt innhold, IKKE bare tall

**Bento-CSS:**
```css
.bento { background:#fff; border:1px solid #E2E8F0; border-radius:20px;
         transition:box-shadow .2s,transform .2s; }
.bento:hover { box-shadow:0 12px 40px rgba(BRAND,.10); transform:translateY(-3px); }
```

---

## Hero-type F — Split-screen med kontrast-paneler

**Når brukes den:** Når malen ikke passer A–E. Bra for psykolog, terapeut, advokat.

**Anatomi:**
- 50/50 split-screen i full skjermhøyde
- Venstre: stort bilde eller stort fargefelt med kort overskrift
- Høyre: hvitt panel med detaljert innhold (h1, p, CTA)
- Ingen gjentakelse av samme tekst
- Subtile detaljer: lite linje-mønster, en pull-quote, eller liten illustrasjon på fargesida

---

## Anti-konvergens-sjekkliste

Før du publiserer en mal, sjekk at den IKKE deler noen av følgende med en annen mal:

- [ ] Samme display-font (sjekk `tailwind.config` og `<link href="...fonts.googleapis...">`)
- [ ] Samme hero-type (A/B/C/D/E/F) med samme bransje-kategori
- [ ] Samme `bg-grid` / `dot-grid` som primær hero-bakgrunn
- [ ] Samme badge-rad-struktur (4 sjekkmarker, samme rekkefølge)
- [ ] Samme stat-rad rett etter hero (alle har 4 kolonner — varier!)
- [ ] Samme CTA-tekst ("Få gratis befaring", "Få tilbud" — varier per mal)
- [ ] Samme hero-tekst-mønster ("X du kan stole på" er bannlyst)

Hvis 3+ av disse deler med en annen mal: malen er ikke ferdig, gjør om hero.

---

## Andre forbedringer som signaliserer "ferdig"

- **Bilder med subtile overlays/borders** — aldri en helt rå `<img>` uten styling
- **Floating elementer** — én stat-pill, en review-pill, et "siste 24t"-tall
- **Mikro-interaksjoner** — `hover:scale-[1.02]`, `hover:shadow-[0_0_20px_BRAND]`
- **Stagger-animasjoner** på children — `animate.stagger(0.08)`
- **Realistisk innhold** — ikke "Lorem ipsum"-aktig fluff, gi konkrete tall, navn, scenarier
- **Bransje-spesifikke ikoner/SVG** — ikke generelle Heroicons overalt
- **Subtil bakgrunn-tekstur** — noise, grain, lite mønster (ikke bare ren hvit)

---

## Bilde-fallback-konvensjon

Alle `<img>` skal ha `onerror` med relevant Unsplash-URL:

```html
<img src="bilder/[bransje]/lokal-fil.jpg"
     onerror="this.src='https://images.unsplash.com/photo-XXX?w=900&q=80'"
     alt="..." />
```

Foreslåtte Unsplash-URL-er per bransje:

| Bransje | URL |
|---|---|
| Snekker | `photo-1504307651254-35680f356dfd` (treverk) |
| Bilverksted | `photo-1486262715619-67b85e0b08d3` (verksted) |
| Malerfirma | `photo-1562259949-e8e7689d7828` (maling) |
| Psykolog | `photo-1573497491208-6b1acb260507` (rolig rom) |
| Tannlege | `photo-1606811971618-4486d14f3f99` |
| Frisør | `photo-1560066984-138dadb4c035` |
| Rørlegger | `photo-1504328345606-18bbc8c9d7d1` |
| Elektriker | `photo-1581094271901-8022df4466f9` |
| Regnskap | `photo-1554224155-6726b3ff858f` |

---

## Variasjons-allokering

Når du jobber gjennom flere maler, allokér hero-type slik at det ikke blir samling:

| Mal | Anbefalt hero-type | Begrunnelse |
|---|---|---|
| Snekker (one-page) | **A** asymm + bilde | Håndverker, "hender på jobb" selger |
| Snekker (flerside) | **A** med variant — annet bilde-vinkel | Konsistens med one-page |
| Malerfirma (one-page) | **F** split-screen, fargepalett-sida | Maling = farge, vis det visuelt |
| Malerfirma (flerside) | **B** full-bleed, ferdig vegg-bilde | Resultat-fokus |
| Psykolog (one-page) | **F** split, lyst rom + tekst | Ro, ikke salg |
| Psykolog (flerside) | **A** med terapeut-bilde + glass-kort | Mennesker, tillit |
| Bilverksted (one-page) | **E** bento (allerede har du `EU-kontroll, 4.8★, 24/7` som rad) | Tekniske features |
| Bilverksted (flerside) | **D** mørk + galleri av biler | Mannlig estetikk |
| Elektriker (flerside) | **E** bento, allerede ish | Tekniske features |
| Rørlegger (flerside) | **A** allerede gjort på one-page | Konsistens |

Ikke følg denne tabellen blindt — sjekk hva malen allerede er, og endre kun det som er "uferdig".
