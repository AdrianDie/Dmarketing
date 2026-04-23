# AI-telefonsvarer — Teknisk oppsett
Oppdatert: April 2026

## Anbefalt stack

| Komponent | Valg | Kostnad |
|---|---|---|
| AI-telefonplattform | **Vapi** (vapi.ai) | ~$0.05–0.10/min samtale |
| Norsk stemme | **ElevenLabs** | ~$0.01–0.02/min (inkludert i Vapi) |
| Booking | **Cal.com** | Gratis (self-hosted) eller $12/mnd |
| SMS-varsling | **Twilio** | ~$0.08/SMS til norske nummer |

**Estimert kostnad per kunde per måned:**
- 50 samtaler × 3 min snitt × $0.08/min = $12 (~130 kr)
- 50 SMS-varsler × $0.08 = $4 (~43 kr)
- Cal.com: 0 kr (gratis plan)
- **Total: ~170 kr/mnd**
- **Din margin på 1 990 kr/mnd: ~1 820 kr (91 %)**

---

## Del 1 — Vapi-oppsett

### Steg 1: Opprett konto
1. Gå til https://vapi.ai → Sign Up
2. Velg "Developer" plan (gratis for testing, $29/mnd for produksjon)
3. Hent API-nøkkel fra Dashboard → Settings → API Keys

### Steg 2: Opprett en "Phone Number"
1. Vapi Dashboard → Phone Numbers → Buy a Number
2. Velg land: Norway (+47)
3. Pris: ~$2/mnd per nummer
4. **Alternativ (anbefalt):** Bruk kundens eksisterende nummer med viderekobling
   - Kunden setter opp "videresend ved ikke svar etter 3 ring" til Vapi-nummeret
   - Ingen endring for kunden — de beholder sitt nummer

### Steg 3: Opprett en "Assistant"
1. Vapi Dashboard → Assistants → Create New
2. Fyll inn:
   - **Name:** `Elektriker Hansen — Assistent`
   - **System Prompt:** Kopier fra `agent-config/elektriker.json` → `system_prompt`
   - **First Message:** Kopier fra `greeting`
3. Under "Voice":
   - Provider: ElevenLabs
   - Voice ID: Se Del 2 for norsk stemmevalg
4. Under "Functions": Legg til Cal.com-booking (se Del 3)
5. Under "End Call Message": Kopier `closing_statement`

### Steg 4: Koble telefonnummer til assistent
Vapi Dashboard → Phone Numbers → velg nummeret → Assign to Assistant → velg assistenten

---

## Del 2 — ElevenLabs norsk stemme

### Anbefalte norske stemmer i ElevenLabs
ElevenLabs har begrenset utvalg på norsk bokmål. Test disse:

| Stemme-ID | Navn | Tone |
|---|---|---|
| `pNInz6obpgDQGcFmaJgB` | Adam | Rolig, profesjonell mann |
| `yoZ06aMxZJJ28mfd3POQ` | Sam | Ung, vennlig mann |

**Slik kobler du til i Vapi:**
1. ElevenLabs → API Keys → kopier nøkkel
2. Vapi → Settings → Voice Providers → ElevenLabs → lim inn nøkkel
3. Velg "ElevenLabs" som Voice Provider i assistenten
4. Skriv inn Voice ID

**Tips:** Bruk "Voice Lab" i ElevenLabs og test setninger som agenten vil si. Juster "stability" til 0.7 og "clarity" til 0.8 for naturlig norsk tale.

---

## Del 3 — Cal.com booking-integrasjon

### Steg 1: Opprett Cal.com-konto
1. Gå til https://cal.com → Sign Up (gratis)
2. Opprett en "Event Type": `Elektriker-oppdrag`
   - Duration: 30 min (buffertid mellom bookinger)
   - Location: Customer address (kunden oppgir adresse)
   - Minimum notice: 2 timer (slik at du rekker å forberede)
3. Kopier booking-URL: `cal.com/[brukernavn]/elektriker-oppdrag`

### Steg 2: Legg til Cal.com som Vapi-funksjon
I Vapi Dashboard → Assistant → Functions → Add Function:

```json
{
  "name": "book_appointment",
  "description": "Book a customer appointment in the calendar",
  "parameters": {
    "type": "object",
    "properties": {
      "customer_name": { "type": "string", "description": "Customer full name" },
      "customer_phone": { "type": "string", "description": "Customer phone number" },
      "job_description": { "type": "string", "description": "Type of job requested" },
      "address": { "type": "string", "description": "Job address" },
      "is_urgent": { "type": "boolean", "description": "Whether this is an emergency" },
      "preferred_time": { "type": "string", "description": "Customer preferred time" }
    },
    "required": ["customer_name", "customer_phone", "job_description", "address"]
  },
  "url": "https://[din-webhook-url]/book",
  "method": "POST"
}
```

**Webhook-tjeneste:** Bruk Make.com (gratis plan) eller n8n for å ta imot Vapi-webhook og opprette Cal.com-booking via API.

---

## Del 4 — SMS-varsling via Twilio

### Steg 1: Opprett Twilio-konto
1. Gå til https://twilio.com → Sign Up
2. Verifiser norsk telefonnummer
3. Kjøp et norsk nummer (ca. $2/mnd) — eller bruk Twilio Sender ID for SMS

### Steg 2: Koble til via Make.com

Lag en Make.com (gratis, 1 000 operasjoner/mnd) automatisering:

```
Trigger: Webhook fra Vapi (POST ved avsluttet samtale)
  ↓
Action 1: Parse samtaledata (JSON)
  ↓
Action 2: Twilio — Send SMS til eier
  Til: +47XXXXXXXX (ditt nummer)
  Fra: Twilio-nummer
  Melding: "Ny booking: [navn], [jobb], [adresse], [tid]. Akutt: [ja/nei]"
  ↓
Action 3 (valgfritt): Send SMS-bekreftelse til kunden
```

### Twilio SMS-pris til Norge
- Utgående SMS til norsk nummer: ~$0.08 per melding
- 50 samtaler/mnd = $4 (~43 kr) i SMS-kostnader

---

## Del 5 — Viderekobling fra kundens telefon

### Alternativ A: Betinget viderekobling (anbefalt)
Kunden setter opp på sin telefon eller hos sin teleoperatør:
- "Videresend ved ikke svar etter 3 ring" → Vapi-nummeret

**Hos de vanligste operatørene:**
- Telenor: Ring `*61*[Vapi-nummer]#` fra kundens telefon
- Telia: Ring `*61*[Vapi-nummer]*30#`
- Ice: Via MyIce-appen under Samtaleinnstillinger

### Alternativ B: Alltid viderekoble etter arbeidstid
Sett opp med operatør at samtaler utenom 07:00–17:00 videresendes automatisk.

---

## Del 6 — Onboarding av ny kunde (sjekkliste)

```
[ ] 1. Kjøp Vapi-nummer ELLER sett opp viderekobling fra kundens nummer
[ ] 2. Opprett assistent i Vapi (bruk mal fra agent-config/)
[ ] 3. Bytt ut [BEDRIFTSNAVN] og [BY] i system_prompt og greeting
[ ] 4. Test agenten: ring nummeret og gå gjennom et scenario
[ ] 5. Opprett Cal.com Event Type for kunden
[ ] 6. Koble Make.com webhook for SMS-varsling
[ ] 7. Send test-booking — kontroller at eier mottar SMS
[ ] 8. Sett opp viderekobling på kundens telefon
[ ] 9. Ring nummeret én gang til fra en annen telefon — fullfør flyten
[ ] 10. Lever til kunden med 1-sides instruksjon for hvordan de justerer
```

---

## Kostnadsoppsummering

### Per kunde per måned (estimat)

| Post | Kostnad |
|---|---|
| Vapi Developer plan (delt på alle kunder) | $1–2 per kunde |
| Samtaleminutter (50 samtaler × 3 min × $0.07) | $10.50 (~115 kr) |
| ElevenLabs (inkludert i Vapi) | $0 |
| Cal.com gratis plan | $0 |
| Twilio SMS (50 SMS × $0.08) | $4 (~43 kr) |
| Make.com gratis plan | $0 |
| **Total per kunde** | **~$17/mnd (~185 kr)** |

### Margin
- Inntekt: 1 990 kr/mnd
- Kostnad: ~185 kr/mnd
- **Bruttomargin: ~91 %**

---

## Feilsøking

**Agenten svarer på engelsk:**
→ Sjekk system_prompt — legg til "Du MÅ alltid svare på norsk bokmål uansett hva kunden sier."

**Agenten avbryter kunden midt i setning:**
→ Øk "endpointing sensitivity" i Vapi til 0.8–0.9

**SMS-varsling kommer ikke:**
→ Sjekk Make.com → Scenarios — se om webhook mottar data fra Vapi

**Kunden opplever forsinkelse (>2 sek) før svar:**
→ Vapi-latency er normalt 600–900 ms. Øk over 1 sek: kontakt Vapi support eller bytt til Retell.
