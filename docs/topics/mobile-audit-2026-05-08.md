---
tags: [audit, mobile, dmarketing]
type: audit
date: 2026-05-08
viewport: 390x844
status: rapportert
---

# Mobile audit — alle hovedsider

> Audit gjennomført ved iPhone 12 Pro viewport (390x844), automatisert via `scripts/audit-pages.js` (Puppeteer). Skript og rå-screenshots i `mobile_screenshots/audit/` (gitignoret — ikke i repo).

## TL;DR

**Alle hovedsider rendrer akseptabelt på mobil.** Webflow-sidene (index, tjenester, kontakt, maler/index) håndterer responsive layout bra ut av boksen. Tailwind-sidene (ai-webmaster, demo) har allerede fått mobile fikser i [[CLAUDE_NOTES]] PR #10 og PR #11.

## Sider auditet

| Side | Viewport-bredde* | Horisontal-scroll | Overflow-elementer | Status |
|---|---|---|---|---|
| `index.html` | 548 (Webflow re-skalerer) | ja (false-positive: preloader) | 1 (preloader, hidden via parent) | OK |
| `tjenester.html` | 390 | nei | 0 | OK |
| `kontakt.html` | 390 | nei | 0 | OK |
| `maler/index.html` | 390 | nei | 0 | OK |
| `maler/elektriker/index.html` | 390 | nei | 1 (decorative blob, off-canvas) | OK |
| `maler/bilverksted/index.html` | 390 | nei | 0 | OK |

\* Webflow-sider med `data-wf-*` setter sin egen layout viewport. Faktisk `window.innerWidth` rapporteres større enn 390 på `index.html`. Innholdet renders likevel fint i 390px-rammen.

## Spesifikke observasjoner

### Webflow-sider (index, tjenester, kontakt)

- Mobil-meny fungerer (samme overlay som vi kopierte til ai-webmaster)
- Logo-størrelse skalerer korrekt på små skjermer
- Footer kollapser pent til kolonne med stort "D"-logo og lenker

### `maler/index.html`

- Hero "Maler som selger" — 3 store ord stables vertikalt på mobil (intendert)
- "Book gratis 15 min"-CTA + "Se malene"-knapp synlige uten scroll
- Lang side (~10 000px) — vurder å legge til "skip to top"-knapp eller scroll-spy hvis brukerne forsvinner

### Maler-templates (sample: elektriker, bilverksted)

- `[By]`-placeholders synlige (forventet — disse fylles inn per klient)
- Layout fungerer på mobil. Hero, CTA, kontakt-info alt synlig.
- `mal-elektriker`: en dekorativ `div.absolute -top-16 -right-16` blob går ~40px utenfor viewport. Ikke synlig for bruker (off-canvas + overflow-hidden lengre opp). Lav-prioritet.

### `index.html` preloader

Diagnostikken fanger en `div.preloader-left` som "overflowing". Dette er Webflows preloader-animasjon som har `display:block` på selve elementet, men `display:none` på parent `.preloader-wrapper`. Falsk positiv — ikke synlig for bruker.

## Cross-cutting findings (ikke mobil-spesifikke)

### Org.nr-inkonsistens (FIKSET i påfølgende PR)

**Korrekt org.nr per autoritativ memory-fil:** `932 612 583`

- **19 Webflow-filer** bruker feil nummer `928 758 737`
- **4 Tailwind-filer** bruker korrekt `932 612 583` (ai-webmaster, demo, pakkeforslag-mal, takk)

Find-and-replace gjort i separat PR — se Git-historikk for "fix: korriger org.nr".

### Lang scroll på `maler/index.html`
Sidekanter er ~10 000px på mobil. Det er mye. Vurder:
- Hover-CTA som vises etter 600px scroll (men ikke overlapper inline CTAs — se [[CLAUDE_NOTES#6 Floating CTAs på mobil]])
- Tabs eller accordion for malkategorier i stedet for at alle er stablet

## Anbefalte aksjoner (prioritert)

### Høy prioritet
- [ ] **Verifiser Org.nr og samkjør** mellom alle footere. Søk: `grep -rn "928 758\|932 612" *.html maler/`

### Medium
- [ ] Legg til "scroll til topp"-knapp på `maler/index.html` (10 000px er mye)
- [ ] Vurder om floating CTA-mønsteret fra ai-webmaster (skjult på mobil) bør gjelde alle Tailwind-sider

### Lav
- [ ] Fiks `mal-elektriker` decorative blob overflow (kosmetisk, ikke synlig)

## Verktøy brukt

```bash
# Lokal server (i worktree):
python -m http.server 8765 --directory <worktree>

# Audit-script:
node scripts/audit-pages.js
# Output: mobile_screenshots/audit/*.png + diagnostics.json
```

## Relaterte noter

- [[CLAUDE_NOTES]] — generelle mobile-feller å unngå
- [[Home]]
