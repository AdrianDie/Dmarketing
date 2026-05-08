# SETUP.md — Bootstrap for Claude

> **Les denne FØRST, før du gjør noen som helst endringer i prosjektet.**
> Hvis et steg ikke er oppfylt, fiks det før du går videre. Ikke hopp over.

---

## Steg 1 — Les regelboken

Les `CLAUDE.md` i prosjektroten. Den er den overordnede system-prompten for alle nettsidemalene (design-filosofi, typografi, farger, komponenter, animasjoner). Alt du bygger skal følge reglene der.

Les også `maler/CONTEXT.md` og `maler/PLAN.md` hvis de finnes — de inneholder bransje-spesifikk kontekst per mal.

---

## Steg 2 — Verifiser Node + npm + avhengigheter

Kjør i prosjektroten (`C:\Users\adria\OneDrive\Dietrichs Marketing\Github\Dmarketing`):

```bash
node --version          # forventes v18+
npm --version
```

Installér avhengigheter hvis `node_modules/` mangler eller `puppeteer` ikke er der:

```bash
npm install
```

`package.json` har `puppeteer` som dependency — den brukes til screenshot-loopen i steg 4.

---

## Steg 3 — Installer/aktiver skills

Claude Code skal bruke følgende skills når det er relevant for oppgaven:

**A. Frontend-design skill** — installert lokalt i prosjektet på `.claude/skills/frontend-design/SKILL.md`.

1. Verifiser at skillen lastes: kjør `/skills` i Claude Code-terminalen — `frontend-design` skal dukke opp i listen.
2. Hvis den ikke vises: start Claude Code på nytt (skills loades ved oppstart).
3. Hvis den fortsatt ikke vises: sjekk at filen ligger på `.claude/skills/frontend-design/SKILL.md` med YAML-frontmatter (`name:`, `description:`) intakt.
4. Når aktiv: bruk skillen når du bygger/forbedrer maler. Den kombineres med reglene i `CLAUDE.md` — skillen styrer aesthetic-retningen, CLAUDE.md gir prosjekt-spesifikke konvensjoner (Tailwind CDN, Motion.js, bilde-fallback osv.).

**B. skill-creator** (`anthropic-skills:skill-creator`) — bruk denne hvis du må lage en ny skill, eller for å forbedre/teste eksisterende skills.

**Brand-input ferdigheten kan bruke:**
- Logo: `images/logo.svg` (eller spør brukeren hvor logoen ligger)
- Brand-farger: se "Farge-regler" i `CLAUDE.md`
- Aksent per bransje: se `maler/PLAN.md`

---

## Steg 4 — Sett opp screenshot-sløyfen (Puppeteer)

Skriptet `screenshot.js` finnes allerede og bruker Puppeteer til å ta skjermbilder av maler. Bekreft at det fungerer:

```bash
node screenshot.js gallery        # tar screenshot av maler/index.html
```

Resultat lagres i `maler/temporary_screenshots/`. Åpne PNG-en og verifiser at heroen renderes korrekt.

**Slik skal screenshot-loopen brukes når du bygger/endrer en mal:**

1. Gjør endring i HTML/CSS.
2. Kjør `node screenshot.js <malnavn>` (f.eks. `node screenshot.js malerfirma`).
3. Les screenshot-filen med Read-verktøyet (PNG støttes).
4. Sammenlign med ønsket resultat. Hvis noe er feil (overlap, dårlig spacing, brutt layout, feil farge) — fiks og gjenta.
5. Gjenta til malen ser bra ut. Ikke rapporter "ferdig" før screenshot bekrefter det.

For å screenshote alle maler samtidig: `node screenshot.js all`.

---

## Steg 5 — Sjekkliste før du begynner endringer

- [ ] CLAUDE.md lest
- [ ] `npm install` kjørt, `node_modules/puppeteer` finnes
- [ ] `node screenshot.js gallery` produserer en gyldig PNG
- [ ] Frontend-design skill aktiv ELLER du bruker CLAUDE.md-reglene som fallback
- [ ] Du vet hvilken mal/fil brukeren vil endre

Når alle bokser er huket av: spør brukeren hva som skal gjøres, eller fortsett med oppgaven hvis den allerede er gitt.

---

## Standard arbeidsflyt for endring av en mal

1. Les eksisterende mal-fil (f.eks. `maler/malerfirma.html`).
2. Ta baseline-screenshot: `node screenshot.js malerfirma`.
3. Gjør endringer.
4. Ta ny screenshot, sammenlign visuelt.
5. Itererer til resultatet matcher CLAUDE.md-reglene + brukerens ønske.
6. Oppsummer endringene kort til brukeren.
