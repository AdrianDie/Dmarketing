---
tags: [hub, clients]
type: readme
---

# Klient-noter

Én note per kunde av Dietrichs Marketing. Brukes som:
- Hurtig lookup ved telefonsamtale eller møte
- Historie over hva vi har levert og diskutert
- Grunnlag for tilbud og oppfølging

## Konvensjoner

**Filnavn:** `<bedriftsnavn-eller-personnavn>.md` med små bokstaver og bindestreker. Eksempler:
- `mobler-stavanger.md`
- `john-andersen.md`
- `auto-fix-bergen.md`

**Front matter:** Alltid inkluder `tags: [client, <bransje>]` og `status: <prospect|aktiv|levert|paused>`.

## Slik lager du en ny klient-note

Be Claude:

> *"Lag en ny klient-note i `docs/clients/<navn>.md` basert på `docs/clients/_template.md`. Klienten heter X, bransje Y, vi har snakket om Z."*

Eller kopier `_template.md` manuelt og fyll inn.

## Tagger som er nyttige

- `tags: [client, elektriker]` — bransje
- `status: aktiv` — pågående arbeid
- `status: prospect` — leadet, ikke signert
- `status: levert` — ferdig prosjekt
- `pakke: autopilot-pro` — hvilken pakke
- `region: stavanger` — geografi

## Lenker som gir verdi

- Klient → mal de bruker (`[[topics/elektriker-mal]]`)
- Klient → relaterte beslutninger (`[[decisions/2026-05-08-pricing-juster]]`)
- Klient → lead-noten den kom fra (`[[leads/john-andersen]]`)

Tilbake til [[Home]].
