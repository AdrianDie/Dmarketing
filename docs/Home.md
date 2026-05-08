---
tags: [hub, dmarketing]
type: index
---

# Home — Dmarketing Vault

Dette er en Obsidian-vault for Dmarketing-prosjektet og Claude-samarbeid. Filene her er ren markdown og finnes i `docs/`-mappen i repoet — Obsidian gir dem bare grafvisning og lenker.

## Hovednoter

- [[CLAUDE_NOTES]] — levende hjelpedokument for Claude-sesjoner (arkitektur, feller, workflow)

## Slik bruker du vaulten

### Lese
- Klikk på en wikilink (`[[...]]`) for å åpne den noten
- Åpne grafvisning (cmd/ctrl + G) for å se hvordan noter er koblet
- Søk med cmd/ctrl + O

### Skrive
- Nye notater = nye `.md`-filer i denne mappen
- Lag en lenke til en annen note: `[[Note-navn]]`
- Lag en lenke til en seksjon: `[[CLAUDE_NOTES#Arkitektur — to CSS-systemer]]`
- Front matter (YAML på topp) gir Claude metadata å filtrere på

### Med Claude Code
Pek Claude Code på vault-mappen (eller hele repoet) og be om hva du vil:

- *"Lag en note 'Klient-X' under `docs/clients/` som beskriver pakken og linker til relevante mal-eksempler i `maler/`"*
- *"Les gjennom `CLAUDE_NOTES.md` og lag separate noter for hver felle med wikilinks tilbake til oversikten"*
- *"Lag en daglig logg-note for i dag og oppsummer hva vi gjorde i denne sesjonen"*
- *"Bygg en `docs/leads/`-mappe og importer leads fra `leads.js`-output"*

Claude leser markdown supert og kan både lese og skrive vaultens filer.

## Forslag til struktur (når vaulten vokser)

```
docs/
├── Home.md                  ← du er her
├── CLAUDE_NOTES.md          ← Claude-samarbeids-doc
├── clients/                 ← per-klient-noter
│   ├── elektriker-stavanger.md
│   └── ...
├── topics/                  ← konsepter, ideer
│   ├── pricing-strategi.md
│   └── ...
├── decisions/               ← arkitektur-beslutninger med dato
│   ├── 2026-05-08-clean-urls.md
│   └── ...
├── leads/                   ← lead-noter (importert fra leads.js)
└── daily/                   ← daglig logg (valgfritt)
    └── 2026-05-08.md
```

Ikke lag denne strukturen på dag 1 — la den vokse organisk basert på hva du faktisk trenger.

## Tips for grafvisning

- Slå på "tags" i graph-innstillingene for å fargelegge etter `tags:` i front matter
- Filtrer grafen med søk (`tag:#client` viser bare klient-noter)
- Hover over en node for å se hvilke andre den linker til
- Bruk "local graph" på en enkelt note for å se nær-konteksten

## Når legge til nye notater

Hver gang du:
- Tar en arkitektur-beslutning du vil huske → lag en `decisions/<dato>-<tema>.md`
- Lærer noe om en klient → lag/oppdater `clients/<navn>.md`
- Oppdager en ny CSS-felle eller workflow-feil → oppdater [[CLAUDE_NOTES]]
- Skal forberede et tilbud → lag `topics/<emne>.md` med Claude

## Relatert

- `CLAUDE.md` (i repo-roten) — design-filosofi, kode-standarder
- `SETUP.md` — bootstrap-sjekkliste
- `~/.claude/projects/<repo>/memory/` — Claude-spesifikke memory-filer
