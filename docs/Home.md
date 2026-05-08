---
tags: [hub, dmarketing]
type: index
scope: dmarketing-repo
---

# Home — Dmarketing Vault

Dette er en Obsidian-vault for **Dmarketing-prosjektet** (dmarketing.no + klient-arbeid + maler). Filene er ren markdown og finnes i `docs/`-mappen i repoet — Obsidian gir dem bare grafvisning og lenker.

> **Scope:** Alt i denne vaulten skal være knyttet til Dmarketing-business. Personlige notater eller andre prosjekter hører hjemme i en separat vault.

## Struktur

```
docs/
├── Home.md                  ← du er her
├── CLAUDE_NOTES.md          ← Claude-samarbeids-doc (arkitektur, feller, workflow)
├── clients/                 ← per-klient-noter
├── decisions/               ← arkitektur/forretnings-beslutninger med dato
├── leads/                   ← lead-spor med kilde og status
└── topics/                  ← konsepter, ideer, strategier
```

Hver mappe har en `_README.md` som forklarer hvordan den brukes, og en `_template.md` Claude kan kopiere når den lager nye notater.

## Hovednoter

- [[CLAUDE_NOTES]] — levende hjelpedokument for Claude-sesjoner (arkitektur, feller, workflow)
- [[clients/_README]] — slik fungerer klient-notater
- [[decisions/_README]] — slik fungerer beslutnings-loggen
- [[leads/_README]] — slik fungerer lead-tracker
- [[topics/_README]] — slik fungerer emne-notater

## Hvordan Claude bruker vaulten

Claude Code har full filtilgang i repoet. Når du ber Claude gjøre noe, kan du peke direkte på vaulten:

**Lese:**
- *"Les `docs/CLAUDE_NOTES.md` før du gjør CSS-endringer på ai-webmaster"*
- *"Slå opp i `docs/clients/<navn>.md` for å se hva vi har levert tidligere"*

**Skrive:**
- *"Lag en ny klient-note for [navn] med template fra `docs/clients/_template.md`"*
- *"Legg til en beslutnings-note i `docs/decisions/` for valget vi nettopp tok"*
- *"Oppdater `docs/CLAUDE_NOTES.md` med den nye CSS-fellen vi oppdaget"*

**CLAUDE.md** (i repo-roten) sier til Claude at vaulten finnes og at den skal leses ved relevante oppgaver. Du trenger ikke minne om det hver gang.

## Slik bruker du vaulten selv

### Lese i Obsidian
- Klikk på en wikilink (`[[...]]`) for å åpne den noten
- Åpne grafvisning (`Ctrl+G`) for å se hvordan noter er koblet
- Søk med `Ctrl+O`

### Skrive
- Nye notater = nye `.md`-filer i riktig undermappe
- Lag en lenke til en annen note: `[[Note-navn]]`
- Front matter (YAML på topp) gir både Obsidian (tags, grafvisning) og Claude (filtrering) struktur

## Tips for grafvisning

- Slå på "tags" i graph-innstillingene for å fargelegge etter tags
- Filtrer grafen med søk (`tag:#client` viser bare klient-noter)
- Hover over en node for å se hvilke andre den linker til
- Bruk "local graph" på en enkelt note for å se nær-konteksten

## Relatert

- `CLAUDE.md` (repo-rot) — design-filosofi, kode-standarder, peker til denne vaulten
- `SETUP.md` — bootstrap-sjekkliste
- `~/.claude/projects/<repo>/memory/` — Claude-spesifikke memory-filer (auto-lastet i hver sesjon)
