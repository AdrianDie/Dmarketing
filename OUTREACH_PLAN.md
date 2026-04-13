# Cold Outreach Plan — Dietrichs Marketing
Oppdatert: April 2026

## Mål
Sende 30–40 personaliserte kalde e-poster per dag til norske småbedrifter.
Selge nettsidemaler for 7 500 kr/stk via automatisert outreach-maskin.

---

## Oversikt: Stack

| Verktøy | Formål | Kostnad |
|---|---|---|
| dietrichsmarketing.no | Utsendingsdomene (aldri dmarketing.no) | ~99 kr/år |
| Google Workspace | E-postkontoer med høy deliverability | ~70 kr/mnd |
| Instantly.ai | Sender e-poster + warmup + sekvenser | ~370 kr/mnd |
| OpenAI API | AI-genererte personlige åpningssetninger | ~20 kr/mnd |
| Google Places API | Hente leads (bedrifter) | Gratis opp til kvoten |

**Total kostnad: ~460 kr/mnd**
**Én kunde dekker 12+ måneder.**

---

## FASE 1 — Oppsett (Dag 1–3)

### Steg 1: Google Workspace

1. Gå til workspace.google.com
2. Velg **Business Starter** (~70 kr/mnd)
3. Koble domenet `dietrichsmarketing.no` (DNS-verifisering hos Webhuset)
4. Opprett to e-postkontoer:
   - `adrian@dietrichsmarketing.no`
   - `hei@dietrichsmarketing.no`

> Ikke aktiver e-post hos Webhuset — bruk kun Google Workspace.

### Steg 2: DNS-records (gjøres i Webhuset sitt kontrollpanel)

Google Workspace veileder deg gjennom dette, men du trenger tre records:

**SPF** (TXT-record på @):
```
v=spf1 include:_spf.google.com ~all
```

**DKIM** (TXT-record — Google genererer nøkkelen for deg):
```
Hentes fra Google Workspace Admin → Apps → Gmail → Authenticate email
```

**DMARC** (TXT-record på _dmarc):
```
v=DMARC1; p=none; rua=mailto:adrian@dietrichsmarketing.no
```

Vent 24–48 timer på DNS-propagering før du går videre.

### Steg 3: Instantly.ai

1. Gå til instantly.ai → registrer konto (start gratis trial)
2. "Add email account" → velg Google → logg inn med begge kontoene:
   - `adrian@dietrichsmarketing.no`
   - `hei@dietrichsmarketing.no`
3. Skru på **Email Warmup** på begge kontoene umiddelbart

**Warmup-innstillinger:**
```
Daily warmup emails:     20 (Instantly øker automatisk over tid)
Warmup reply rate:       35%
Warmup ramp-up:          Enabled
```

> Ikke send en eneste kampanje-e-post før warmup har kjørt i 14 dager.

---

## FASE 2 — Bygge leads (Dag 1–14, parallelt med warmup)

### Steg 4: Generer leads med leads.js

Kjør scriptet for hver bransje og by du vil treffe:

```bash
node leads.js elektriker Oslo 60
node leads.js rorlegger Oslo 60
node leads.js tannlege Oslo 60
node leads.js frisor Oslo 60
node leads.js elektriker Bergen 60
node leads.js rorlegger Bergen 60
```

Scriptet henter bedrifter fra Google Places og gir hver bedrift en score:
- **VIP (80–100p):** Ingen nettside + høy Google-rating → disse er gull
- **God (50–79p):** Noen mangler, men etablert bedrift
- **Vanlig (under 50p):** Start med VIP og God

Output lagres i `leads/[bransje]-[by].csv`

### Steg 5: Finn e-postadresser med find-emails.js

```bash
node find-emails.js leads/elektriker-oslo.csv
node find-emails.js leads/rorlegger-oslo.csv
# osv. for hver fil
```

Scriptet scraper e-postadresser fra bedriftenes nettsider og rangerer dem
(person-epost > leder-epost > generisk post@/info@).

### Steg 6: Legg til OpenAI API-nøkkel (valgfritt men anbefalt)

Opprett konto på platform.openai.com, hent API-nøkkel og legg den i `.env`:

```
GOOGLE_MAPS_API_KEY=din-nøkkel
OPENAI_API_KEY=din-nøkkel
```

Dette aktiverer AI-genererte personlige åpningssetninger i e-postene.
Koster ~20 kr/mnd for 500–1000 leads.

### Steg 7: Rens og sorter CSV-en

Fjern rader som mangler e-postadresse:
- Åpne CSV i Excel/Google Sheets
- Filtrer ut tomme `epost`-kolonner
- Sorter på `score_label` (VIP øverst)
- Behold kun bedrifter med status `OPERATIONAL`

**Mål: 200–300 rensede leads klar til utsending**

---

## FASE 3 — Første kampanje (Dag 14+)

### Steg 8: Last opp leads i Instantly

1. Instantly → "Leads" → "Import CSV"
2. Koble CSV-kolonner til Instantly-variabler:

| CSV-kolonne | Instantly-variabel |
|---|---|
| navn | `{{company_name}}` |
| epost | (brukes som mottaker) |
| mal_url | `{{mal_url}}` |
| rating | `{{rating}}` |
| score_label | `{{score_label}}` |

3. Opprett en **liste per bransje** (elektriker, rørlegger osv.)
   — da kan du bruke bransje-spesifikke e-postmaler.

### Steg 9: Sett opp e-postsekvens i Instantly

Bruk malene fra `epost-maler/[bransje].md` som utgangspunkt.

**Sekvens per lead:**
```
Dag 1:  Hoved-e-post (se mal)
Dag 3:  Oppfølging 1 (hvis ikke åpnet/svart)
Dag 7:  Breakup-e-post (siste melding)
```

**Innstillinger for kampanjen:**
```
Sending schedule:    Man–fre, 08:00–16:00
Emails per day:      30 (øk gradvis fra 20)
Stop on reply:       Enabled (viktig!)
Track opens:         Enabled
Track clicks:        Enabled
```

### Steg 10: Avsender-innstillinger

```
Fra-navn:   Adrian Dietrich
Fra-e-post: adrian@dietrichsmarketing.no (alternér med hei@)
Svar-til:   post@dmarketing.no (svar havner på hoveddomenet)
```

Bruk "Reply-to" på `post@dmarketing.no` — da svarer leads til din
ekte e-post, og det "brente" utsendingsdomenet eksponeres ikke videre.

---

## FASE 4 — Håndtere svar (løpende)

### Steg 11: Speed to lead — svar innen 10 min

Sett opp varsling på telefon for `post@dmarketing.no`.

Når noen svarer positivt ("dette ser interessant ut", "hva koster det?"):

```
Svar UMIDDELBART med:

Hei [Navn]!

Så kult at du er interessert. Malen jeg viste er allerede
tilpasset [bransje]-bedrifter — den er klar til å settes opp
med ditt navn, logo og kontaktinfo.

Du kan booke en gratis 15 min prat her så går vi gjennom det:
[Calendly-lenke]

Prisen er 7 500 kr ferdig levert på 3–5 dager.

Mvh Adrian
```

### Steg 12: Håndter innvendinger

**"Vi har allerede nettside"**
→ "Forstår det! Ser dere etter å forbedre den, eller er dere
   fornøyde med den dere har?"

**"For dyrt"**
→ "Hva tenker du er riktig pris? Vi kan se på hva som passer."

**"Ikke interessert"**
→ Svar bare: "Forstår det, takk for svaret! Ha en fin dag."
   (Ikke prøv å selge videre — det brenner omdømmet.)

---

## FASE 5 — Optimalisering (Uke 3+)

### Hva du skal følge med på i Instantly

```
Open rate:      Mål > 40%   (lavere → bytt emnelinjen)
Reply rate:     Mål > 2%    (lavere → bytt første avsnitt)
Bounce rate:    Hold < 3%   (høyere → rens listen bedre)
```

### A/B-test emnelinjer

Kjør to varianter parallelt i Instantly:
- A: "Ferdig nettside til [Bedriftsnavn]"
- B: "[Bedriftsnavn] mangler nettside — jeg har et forslag"

La Instantly velge vinneren automatisk etter 50 sendte.

### Utvid til nye byer og bransjer

Når elektriker Oslo funker → legg til Bergen, Stavanger, Trondheim.
Når elektriker funker → legg til rørlegger, frisør osv.

---

## Matematikk

| | Konservativt | Realistisk |
|---|---|---|
| E-poster/dag | 30 | 40 |
| Arbeidsdager/mnd | 22 | 22 |
| E-poster/mnd | 660 | 880 |
| Open rate | 40% | 50% |
| Reply rate | 1% | 2% |
| Konvertering av svar | 20% | 25% |
| **Salg/mnd** | **~1–2** | **~4–5** |
| **Inntekt/mnd** | **~11 000 kr** | **~34 000 kr** |

> Tallene forbedres betraktelig når du har 2–3 uker med data og
> har optimalisert emnelinjer og første avsnitt.

---

## GDPR — Kort versjon

- B2B kald e-post er lovlig i Norge under "berettiget interesse"
- Send KUN til bedriftens e-post (post@, kontakt@, fornavn@bedrift.no)
- ALDRI til private Gmail/Hotmail-adresser
- Instantly legger automatisk til avmeldingslink i bunnen — ikke fjern den
- Svar alltid på avmeldingsforespørsler umiddelbart

---

## Sjekkliste — Klar til å sende?

- [ ] Google Workspace opprettet
- [ ] SPF, DKIM, DMARC satt opp og verifisert
- [ ] Instantly-konto opprettet
- [ ] Begge e-postkontoer koblet til Instantly
- [ ] Warmup aktivert på begge kontoer
- [ ] 14 dager med warmup gjennomført
- [ ] Minimum 200 rensede leads med e-postadresser
- [ ] E-postsekvens satt opp i Instantly
- [ ] Calendly-lenke klar
- [ ] Varsling på telefon for innkommende svar
