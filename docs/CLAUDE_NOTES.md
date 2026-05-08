---
tags: [claude, reference, hub]
type: doc
---

# Claude Notes — Dmarketing

> Levende hjelpedokument for Claude Code (og fremtidige instanser).
> **Hver gang en sesjon avslører ny innsikt eller feller, oppdater dette dokumentet** — ikke la samme feil gjenta seg.

Dette er ment å åpnes både fra repoet og fra Obsidian. Strukturen er flat med korte seksjoner og konkrete eksempler.

Tilbake til [[Home]].

---

## Innhold

1. [Arkitektur — to CSS-systemer](#arkitektur--to-css-systemer)
2. [Workflow — PR-flyt, worktree, lokal server](#workflow--pr-flyt-worktree-lokal-server)
3. [Vanlige feller (med konkrete eksempler)](#vanlige-feller-med-konkrete-eksempler)
4. [Verktøy i repoet](#verktøy-i-repoet)
5. [Komponenter](#komponenter)
6. [Slik utvider du dette dokumentet](#slik-utvider-du-dette-dokumentet)

---

## Arkitektur — to CSS-systemer

Prosjektet har **to inkompatible CSS-arkitekturer**. Sjekk hvilken siden bruker FØR du gjør CSS-endringer.

| System | Filer | Identifiseres ved |
|---|---|---|
| **Webflow** | `index.html`, `tjenester.html`, `kontakt.html`, `maler/*` | `<link href="css/webflow.css">` + `data-w-id`-attributter |
| **Tailwind CDN** | `ai-webmaster.html`, `demo.html` | `<script src="https://cdn.tailwindcss.com">` |

### Hvorfor det er kritisk å holde dem adskilt

Webflow.css (`css/webflow.css`, `css/dietrichsmarketing.webflow.css`) inneholder **globale resets på h1–h6, body, button osv.** Hvis du importerer den på en Tailwind-side, overstyrer den Tailwind preflight og bryter hele layouten.

To tidligere Claude-instanser brakk `ai-webmaster.html` ved å importere webflow.css. Begge ble revertert.

> **Regel:** På en Tailwind-side, kopier kun spesifikke klasse-regler inline i `<style>`-blokken. **Aldri `<link href="css/webflow.css">`.**

### Klient-templates (maler/*)

`maler/*` er kunde-produkter som selges separat. Hver mal har egen struktur og egne lenker. Ved bulk-operasjoner (regex over alle html-filer): vurder å ekskludere `maler/*` med mindre brukeren eksplisitt inkluderer dem.

---

## Workflow — PR-flyt, worktree, lokal server

### Push direkte til main er BLOKKERT
Repo-policy krever PR-review. Bruk dette mønsteret:

```bash
git checkout -b claude/<beskrivende-navn>
git add <filer>
git commit -m "..."
git push -u origin claude/<beskrivende-navn>
gh pr create --base main --head claude/<beskrivende-navn> --title "..." --body "..."
gh pr merge --merge
git push origin --delete claude/<beskrivende-navn>
git -C "<absolute-parent-repo-path>" pull origin main
```

**Ikke kjør `git add && commit && push` i én linje når push kan feile** — hvis push blokkeres er det uklart om commit gikk gjennom. Separer.

### Worktree-bevissthet

Du jobber typisk i `.claude/worktrees/<branch>/`. Brukeren åpner ofte filer fra parent-repoet (`<repo>/<file>`). Etter PR-merge må parent-repo pulles eksplisitt:

```bash
git -C "<absolute-parent-repo-path>" pull origin main
```

Hvis ikke: brukeren laster gammel fil og tror endringen ikke er live.

### Lokal HTTP-server — viktig

Etter clean-URL-overgang (PR #9) fungerer **ikke** `file://` for testing — clean URLs (`/tjenester` uten `.html`) krever HTTP-server.

```bash
# Fra worktree-mappen — eller med eksplisitt --directory:
python -m http.server 8765 --directory "<absolute-worktree-path>"
```

**Felle:** Hvis du starter server fra parent-repo og senere edits skjer i worktree, server serverer **gamle** filer fra parent. Da vil Puppeteer/Chrome vise gammel CSS — og du tror endringene dine ikke trådte i kraft.

> **Regel:** Når Puppeteer/Chrome viser ikke-oppdatert rendering, **først** `curl URL | grep "<expected>"`. Hvis served HTML ikke matcher disk → server er feil sted.

---

## Vanlige feller (med konkrete eksempler)

### 1. CSS-inheritance ved kopiering Webflow → Tailwind

I PR #5 måtte jeg fikse font-weight på "DIETRICHS"-logoen.

**Hva skjedde:** Webflow har `h1 { font-weight: 600 }` som base. `<h1 class="heading-6 logo-1">` arvet 600 fordi `.heading-6` ikke selv definerte font-weight. Da jeg kopierte til Tailwind-siden, satte jeg `.heading-6 { font-weight: 400 }` (kopiert fra Webflows `h6`-regel — feil tag).

**Resultatet:** Logoen så tynn ut. Brukeren måtte påpeke det.

**Lærepunkt:** Når du kopierer en klasse fra system A til B, list **alle** inherited properties fra base-tags i begge systemer. Tailwind preflight setter `h1 { font-weight: inherit }`, så ingen base-h1 styling. Du må sette font-weight eksplisitt på klassen.

### 2. CSS specificity-kollisjoner

I PR #7 måtte jeg fikse at "marketing"-stroke forsvant når menyen åpnet.

**Hva skjedde:**
```css
.heading-6.logo-2 { color: transparent; ... }              /* (0,2,0) */
body.menu-open .heading-6 { color: whitesmoke; }           /* (0,2,0) - vinner pga senere i source */
```

Override-regelen overstyrte ALLE `.heading-6`, inkludert `.logo-2` som skulle beholde transparent fill.

**Lærepunkt:** Når du skriver en `body.<state> .X` override, sjekk hva `.X` (eller varianter `.X.Y`) **allerede** har definert. Bruk mer spesifikke selectors (`body.menu-open .heading-6.logo-1`) når du KUN vil overstyre én variant.

### 3. Margin-collapse gjennom seksjoner

I PR #3 måtte jeg fikse en lys stripe over menyen.

**Hva skjedde:** `.navbar-2 { margin-top: 50px }` kollapset gjennom den hvite `.menu-wrap`-seksjonen, så body-bg syntes over.

**Fix:** Bytt fra `margin-top` på inner-element til `padding-top` på wrapperen.

**Lærepunkt:** På et farget wrapper-element: bruk **padding** for innvendig spacing, ikke margin på innholdet.

### 4. Pseudo-element vertikal sentrering

`.close-btn::before { top: 50%; ... }` sentrerer ikke uten `transform: translateY(-50%)`. Glemmes ofte. Samme for `left: 50%; translateX(-50%)`.

### 5. Block-parent ≠ auto-centering

`.nav-container-2` har `display: block`. Inni: `.nav-items { width: 80% }`. Uten `margin: 0 auto` er nav-items **left-aligned** (block default), ikke sentrert. `align-items: center` på block-parent gjør INGENTING.

I PR #4 hadde jeg lagt til `margin: 40px auto 0` som sentrerte items — men index.html har ingen auto-margin. Måtte fjerne.

### 6. Floating CTAs på mobil

Floating CTA wrapet til 3 linjer på 390px viewport. Skjul på mobil:

```css
@media (max-width: 767px) {
  #floating-cta { display: none !important; }
}
```

Mobil har CTAs i hver seksjon — floating er ofte redundant og forstyrrer.

### 7. Verifiser visuelt FØR push

Den dyreste lærdommen i tidligere sesjoner: jeg behandlet `git push` som ferdig-marker. Det er det ikke. Brukeren måtte reload + screenshot + peke ut feil etter hver av 7 menyfix-PRer.

> **Regel:** Etter en CSS-endring som påvirker layout, ta screenshot via `scripts/mobile-screenshot.js` eller Puppeteer **før** du committer. For komponenter med flere tilstander (lukket/åpen, hover, scroll-trigger), test alle.

### 8. "Stopp og spør etter 2 mislykkede forsøk"

Hvis du har gjort 2 forsøk på samme tilnærming og det fortsatt ikke fungerer: **ikke gjør et tredje**. Stopp, forklar problemet, og spør brukeren.

Eksempel: webflow.css-import. Brakk to ganger før. I sesjonen sa jeg eksplisitt "jeg gjør IKKE et tredje forsøk" og brukte inline CSS i stedet. Det fungerte.

### 9. Bulk-operasjoner — sjekk scope

Når brukeren sier "alle X": list scope-et **først**. F.eks. "Dette vil endre 58 filer inkludert maler/*-templates — ok?" Brukeren mener ofte "alle aktuelle for vårt formål", ikke "alle filer i repo".

### 10. Ikke lag nye scripts uten å sjekke eksisterende

Før du oppretter et script, sjekk `scripts/` og roten for eksisterende. F.eks. brukte vi `screenshot.js` (Puppeteer) som mal for `scripts/mobile-screenshot.js` — ny script burde være konfigurerbar (flagg) heller enn fem throwaway-scripts.

---

## Verktøy i repoet

| Verktøy | Bruk |
|---|---|
| `screenshot.js` | Desktop screenshots av maler/* (1440x900) |
| `scripts/mobile-screenshot.js` | Mobile screenshots (390x844) av angitt URL |
| `scripts/clean-urls.py` | Bulk-replacer .html-suffix i interne lenker |
| `components/dietrichs-menu.js` | Self-contained meny til Tailwind-sider |

### Lokal server (med riktig --directory):
```bash
python -m http.server 8765 --directory "<absolute-worktree-path>"
```

### Mobil-screenshot:
```bash
node scripts/mobile-screenshot.js http://127.0.0.1:8765/<page>.html
# Output: mobile_screenshots/mobile-full.png + mobile-scroll-NN.png
```

---

## Komponenter

### `components/dietrichs-menu.js`

Self-contained meny-komponent for Tailwind-sider. Inkluderer CSS (inline), HTML-injeksjon og toggle-logikk. Ingen webflow.css-avhengighet.

**Bruk:**
```html
<!-- Side i rotmappen -->
<script src="components/dietrichs-menu.js" defer></script>

<!-- Side i undermappe -->
<script>
  window.DIETRICHS_MENU_CONFIG = { basePath: '../', active: 'maler' };
</script>
<script src="../components/dietrichs-menu.js" defer></script>
```

**Tilstander komponenten støtter:**
- Lukket meny (lyst tema, hvit bg, svart logo + MENY-knapp)
- Åpen meny (mørkt tema, svart bg, hvit logo + LUKK-knapp)
- Hover-animasjon (stroke → fill slide-up) på desktop
- Esc-tast lukker meny

**Hvis du oppdaterer komponenten**, oppdater også `ai-webmaster.html` sin inline-versjon (de er tvillinger pga ikke migrert til komponent ennå).

---

## Slik utvider du dette dokumentet

Når du i en sesjon oppdager:
- En ny CSS-felle
- Et nytt arkitektur-faktum
- En workflow-snublestein

→ Legg det til i riktig seksjon med **konkret eksempel** (commit-hash, scenario, hva som skjedde, hva fix-en var). Korte avsnitt, ikke prosa-essays.

Mal:
```markdown
### N. <kort tittel>

**Hva skjedde:** <konkret scenario>
**Fix:** <hva som løste det>
**Lærepunkt:** <generelt prinsipp utledet>
```

### Hva IKKE legge til
- Generelle prinsipper uten konkret eksempel ("vær nøye")
- Ting som er allerede dokumentert i CLAUDE.md (design-filosofi, font-valg, fargeregler)
- Engangs-bugs som ikke kan gjenta seg

---

## Relatert

- `CLAUDE.md` — design-filosofi, kode-standarder, tilpasningspunkter per kunde
- `SETUP.md` — bootstrap-sjekkliste (Node, Puppeteer)
- `~/.claude/projects/<repo>/memory/` — Claude-spesifikke memory-filer (auto-lastet i hver sesjon)
