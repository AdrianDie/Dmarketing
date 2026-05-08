---
tags: [hub, leads]
type: readme
---

# Lead-tracker

Spor potensielle kunder fra første kontakt til de blir klienter (eller dropper). En note per lead.

## Hvordan det forholder seg til `leads.js`

Repo-roten har `leads.js` som genererer lead-data programmatisk. Denne mappen er manuell oppfølgning på de mest relevante leadene — ikke et speil av hele leads.js-output.

> **Tommelfingerregel:** Lag note her bare for leads du har faktisk kontakt med, ikke prospects fra liste-utskrift.

## Konvensjoner

**Filnavn:** `<navn-eller-bedrift>.md`. Eksempler:
- `bygg-as-trondheim.md`
- `lisa-pedersen.md`

Når et lead konverterer til klient, **flytt** noten til `docs/clients/` eller lag ny klient-note og linkje til lead-noten.

## Slik lager du en

Be Claude:

> *"Lag lead-note for [navn] i `docs/leads/`. Kilde: LinkedIn DM. De spurte om Y."*

## Tagger som er nyttige

- `tags: [lead, kald]` — ikke kontaktet ennå
- `tags: [lead, varm]` — i dialog
- `tags: [lead, hot]` — vurderer tilbud nå
- `kilde: linkedin` / `kilde: nettside` / `kilde: anbefaling`
- `next-action: 2026-05-15` — neste oppfølgning

## Lenker

- Hvis lead konverterer: linkje til ny `[[clients/<navn>]]`-note
- Hvis kommer fra strategi-tråd: `[[topics/<emne>]]`

Tilbake til [[Home]].
