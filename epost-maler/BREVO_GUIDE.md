# E-post maler for Brevo — Dietrichs Marketing

## Oppsett i Brevo

1. Opprett kampanje → "Marketing campaign" → "Classic"
2. Importer CSV fra `leads/[bransje]-[by].csv`
3. Brevo-variabler som matcher CSV-kolonner:
   - `{{contact.NAVN}}` → kolonnen `navn`
   - `{{contact.MAL_URL}}` → kolonnen `mal_url`
   - `{{contact.SCORE_LABEL}}` → kolonnen `score_label`
4. Sett avsender til: adrian@[ditt-utsendingsdomene].no
5. Aktiver unsubscribe-link (Brevo gjør dette automatisk i bunnen)

## Sekvens

| Dag | E-post         | Mål                              |
|-----|----------------|----------------------------------|
| 1   | Hoved-e-post   | Vekk interesse med ferdig design |
| 3   | Oppfølging 1   | Myk påminnelse                   |
| 7   | Breakup        | Siste sjanse, lav terskel        |

## VIP-leads (score ≥ 80)

For bedrifter uten nettside og høy Google-rating:
- Bruk **elektriker-vip.md** i stedet for standard-malen
- Send gjerne SMS manuelt dag 4 hvis de ikke svarer

---

## Brevo-tips

- Send mellom 09:00–11:00 eller 14:00–15:30 (høyere åpningsrate)
- Maks 300 e-poster/dag på gratis plan
- Sett opp SPF/DKIM for utsendingsdomenet ditt i Brevo-innstillinger
- Test e-posten til deg selv FØR du sender kampanje
