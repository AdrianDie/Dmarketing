# Første salg — sjekkliste
Oppdatert: April 2026

Alt som MÅ være på plass før du trykker send på første kampanje.
Estimert totaltid: 4–6 timer

---

## BLOKKER 1 — Verktøy og kontoer

### Vapi (AI-telefonplatform)
- [ ] Opprett konto på https://vapi.ai
- [ ] Velg "Developer"-plan (gratis til testing)
- [ ] Gå til Settings → API Keys → kopier nøkkel
- [ ] Gå til Phone Numbers → Buy Number → velg norsk (+47)
- **Estimert tid:** 20 min
- **Kostnad:** $2/mnd for nummer + $0.05–0.10/min samtale

### ElevenLabs (norsk stemme)
- [ ] Opprett konto på https://elevenlabs.io
- [ ] Velg Starter-plan ($5/mnd — gir 30 000 tegn/mnd)
- [ ] Gå til API Keys → kopier nøkkel
- [ ] Koble til Vapi: Vapi → Settings → Voice Providers → ElevenLabs
- [ ] Test norsk stemme: gå til Speech Synthesis, skriv "Hei, du har ringt til Rørlegger Hansen" og test ulike stemmer
- **Anbefalt stemme:** Adam (pNInz6obpgDQGcFmaJgB) eller Sam
- **Estimert tid:** 30 min
- **Kostnad:** $5/mnd

### Cal.com (booking)
- [ ] Opprett konto på https://cal.com (gratis)
- [ ] Opprett Event Type: "Befaring / oppdrag" — 30 min
- [ ] Koble Google Calendar (for å unngå dobbelbookinger)
- [ ] Kopier booking-URL: `https://cal.com/[brukernavn]/oppdrag`
- **Estimert tid:** 20 min
- **Kostnad:** Gratis

### Twilio (SMS-varsling)
- [ ] Opprett konto på https://twilio.com
- [ ] Verifiser med norsk mobilnummer
- [ ] Kjøp norsk Twilio-nummer (ca. $2/mnd) ELLER bruk Alphanumeric Sender ID
- [ ] Notér: Account SID + Auth Token + telefonnummer
- **Estimert tid:** 30 min
- **Kostnad:** $1–2/mnd + $0.08/SMS

### Make.com (webhook-automatisering)
- [ ] Opprett konto på https://make.com (gratis — 1 000 ops/mnd)
- [ ] Lag nytt Scenario: Webhook → Twilio Send SMS
  - Trigger: Custom Webhook (kopier URL — du trenger denne til Vapi)
  - Action: Twilio → Send SMS til deg selv
- [ ] Test scenariot med dummy-data
- **Estimert tid:** 45 min
- **Kostnad:** Gratis

---

## BLOKKER 2 — Bygg demo-agent

- [ ] Åpne `agent-config/elektriker.json` — kopier `system_prompt` og `greeting`
- [ ] Gå til Vapi → Assistants → Create New
- [ ] Lim inn system_prompt. Bytt `[BEDRIFTSNAVN]` → "ElektroDemo AS" og `[BY]` → "Oslo"
- [ ] Sett First Message til greeting-teksten
- [ ] Voice: ElevenLabs → Adam
- [ ] Assign til Vapi-nummeret ditt
- [ ] Ring nummeret selv og test hele flyten:
  - Beskriv en jobb
  - Svar at det haster
  - Gi adresse og navn
  - Kontroller at du mottar SMS-varsel
- **Estimert tid:** 45 min

---

## BLOKKER 3 — Outreach-infrastruktur

### E-post-oppsett
- [ ] Bekreft at Instantly warmup er ferdig (sjekk dashboard)
- [ ] Sett opp ny kampanje i Instantly: "AI-telefonsvarer — Elektriker"
- [ ] Last opp leads: åpne `leads/elektriker-*.csv`, filtrer på `ai_label = VIP` eller `God`
  - Tips: Kjør `node rescore-leads.js` først, deretter filtrer på ny kolonne
- [ ] Koble CSV-kolonner til Instantly-variabler (company_name, by, rating)
- [ ] Legg inn e-postsekvens fra `admin/epost-maler-v2/elektriker.md`
  - Dag 1, Dag 3, Dag 7
  - Bytt ut `https://dmarketing.no/maler/ai-telefon/` med faktisk URL (når siden er live)
- **Estimert tid:** 1 time

### Leads med e-post
- [ ] Kjør `node rescore-leads.js` for å oppdatere AI-score på alle leads
- [ ] Kjør `node find-emails-batch.js` for å hente manglende e-poster
  - OBS: Dette tar tid (8 sek per lead × antall uten e-post). Start kvelden før.
  - Kan kjøres over natten: `node find-emails-batch.js > emails-log.txt 2>&1 &`
- [ ] Filtrer leads: åpne CSV, behold kun rader med e-post + ai_label VIP/God
- **Estimert tid:** Script kjøres automatisk — manuell filtrering 30 min

---

## BLOKKER 4 — Landingsside live

- [ ] Last opp `maler/ai-telefon/index.html` til dmarketing.no/maler/ai-telefon/
- [ ] Bytt ut Calendly-URL i HTML: søk etter `calendly.com/dietrichsmarketing` og oppdater
- [ ] Test at siden laster og CTA-lenken fungerer
- [ ] Last opp `maler/priser.html` til dmarketing.no/maler/priser.html
- **Estimert tid:** 20 min

---

## BLOKKER 5 — Calendly / Booking-side

- [ ] Opprett Calendly-konto (eller bruk Cal.com) med 15 min "Gratis demo AI-telefon"-slot
- [ ] Koble til Google Calendar
- [ ] Sett opp varsling på e-post + SMS ved ny booking
- [ ] Kopier booking-URL
- [ ] Oppdater lenker i:
  - `maler/ai-telefon/index.html` (søk: `calendly.com/dietrichsmarketing/ai-demo`)
  - `maler/priser.html` (søk: `calendly.com/dietrichsmarketing/15min`)
  - `admin/epost-maler-v2/elektriker.md` (legg til link i e-post om aktuelt)
- **Estimert tid:** 20 min

---

## BLOKKER 6 — Fakturering

- [ ] Opprett Stripe-konto (https://stripe.com) — gratis å opprette
- [ ] Legg inn bedriftsinfo og bankkonto
- [ ] Opprett produkt: "AI-telefonsvarer" — 1 990 kr/mnd (recurring)
- [ ] Opprett produkt: "Oppsett AI-telefonsvarer" — 2 490 kr (engangs)
- [ ] Test betalingslenke (send til deg selv)
- **Estimert tid:** 30 min
- **Kostnad:** 1.5 % + 1.80 kr per transaksjon (Stripe)

---

## Endelig sjekkliste — klar til å sende?

```
Verktøy:
  [ ] Vapi-konto opprettet + norsk nummer kjøpt
  [ ] ElevenLabs koblet til Vapi
  [ ] Cal.com booking-side klar
  [ ] Twilio SMS fungerer
  [ ] Make.com webhook sender SMS etter samtale

Demo:
  [ ] Demo-agent opprettet i Vapi
  [ ] Du har ringt inn og testet hele flyten selv
  [ ] SMS-varsel fungerer

Outreach:
  [ ] Instantly warmup ferdig (sjekk dato)
  [ ] Leads filtrert (VIP + God med e-post)
  [ ] Kampanje satt opp i Instantly
  [ ] E-postsekvens lagt inn (dag 1, 3, 7)

Innhold:
  [ ] Landingsside live på dmarketing.no/maler/ai-telefon/
  [ ] Prisside live på dmarketing.no/maler/priser.html
  [ ] Calendly-lenker oppdatert i HTML

Salg:
  [ ] Fakturering klar (Stripe)
  [ ] Calendly-varsling aktivert på telefon
  [ ] Salgsmanual lest (admin/SALGSMANUAL.md)
```

Når alle bokser er sjekket: trykk "Aktiver" på Instantly-kampanjen og send første batch på 20–30 e-poster.

---

## Første uke etter lansering

- Dag 1–3: Overvåk open rate i Instantly (mål >40 %)
- Dag 3: Svar umiddelbart på alle replies (mål: under 10 min)
- Dag 7: Se på bounce rate — over 5 % betyr listen trenger mer rensing
- Uke 2: Juster emnelinjer basert på data (A/B-test 2 varianter)
