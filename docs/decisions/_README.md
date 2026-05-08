---
tags: [hub, decisions]
type: readme
---

# Beslutnings-logg

Hver gang du tar en arkitektur- eller forretnings-beslutning du vil huske, lag en note her. Format: ADR (Architecture Decision Record) light.

## Hvorfor

- Ett halvt år senere har du glemt *hvorfor* du valgte X over Y
- Claude trenger kontekst når den foreslår endringer — beslutnings-loggen forklarer hvorfor det ikke er fri lek
- Hjelper deg unngå å re-debattere samme valg

## Konvensjoner

**Filnavn:** `YYYY-MM-DD-kort-tema.md`. Eksempler:
- `2026-05-08-clean-urls.md`
- `2026-05-15-pricing-jeg-pakke-ned.md`
- `2026-06-01-bytt-til-cloudflare-pages.md`

Datoen øverst gjør at filer sorteres kronologisk i sidebar.

## Når lage en

Lag en beslutnings-note når:
- Du gjør en arkitektur-endring som påvirker flere filer
- Du tar et prising-valg
- Du velger mellom verktøy (hosting, CMS, betalings-leverandør)
- Du sier nei til noe (hvorfor du IKKE valgte Z er like viktig)

## Slik lager du en

Be Claude:

> *"Oppsummer beslutningen vi tok i denne sesjonen som en note i `docs/decisions/<dato>-<tema>.md` basert på `docs/decisions/_template.md`."*

## Tagger som er nyttige

- `tags: [decision, architecture]`
- `tags: [decision, pricing]`
- `tags: [decision, vendor]`
- `superseded-by: [[decisions/...]]` (når en senere beslutning erstatter denne)

Tilbake til [[Home]].
