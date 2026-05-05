# Automasjoner — roadmap post-Thursday

Etter videoen er sendt ut 07.05 og du har dine første kunder, vil disse automasjonene spare deg flere timer per uke.

**Prioritet:** sortert etter ROI (tidsbesparelse vs. oppsetts-kost).

---

## Tier 1 — Bygg innen første 30 dager

### A1. Tally-skjema for de 5 onboarding-spørsmålene
**Sparer:** 3–5 e-post-utvekslinger per kunde
**Setup-tid:** 30 min
**Kost:** Gratis (tally.so)

I dag: e-post-flyt der kunden svarer 5 spørsmål. Folk glemmer felt, sender bilder feil, og du må purre.

Med Tally:
- Brandet skjema med dmarketing.no-logo
- Validering (telefon må være telefon, e-post må være e-post)
- Logo lastes opp som vedlegg
- Svarene lagres strukturert i Tally + speiler til Notion/Airtable
- Bekreftelses-e-post sendes automatisk

**URL-mønster:** `tally.so/r/dmarketing-onboarding`

Når kunden svarer "Ja, sett i gang" får de én lenke i stedet for 5 spørsmål i e-post.

### A2. Cal.com migrering fra Calendly
**Sparer:** ~$15/mnd hvis du oppgraderer Calendly senere
**Setup-tid:** 2 timer
**Kost:** Gratis (cal.com selvhostet eller cal.com cloud free)

Når du har 5+ kunder bookende parallelt blir Calendly free tier kanskje begrensende. Cal.com har:
- Ubegrensede event-types
- Egen tilpasset URL (`booking.dmarketing.no`)
- Bedre integrering med Notion/Airtable
- Helt åpen kildekode hvis du vil selvhoste

**Migrasjons-strategi:** Behold Calendly-lenken aktiv en uke etter Cal.com går live (302-redirect).

### A3. whois-oppslag-script
**Sparer:** 2 min per ny kunde + risiko for å sende feil DNS-mal
**Setup-tid:** 1 time
**Kost:** Gratis

Liten Node-script som tar `dinbedrift.no` og returnerer:
- Registrar
- Nåværende nameservers
- Anbefalt mal (A, B, C, eller D)
- Pre-utfylt e-posttekst klar for klipp-og-lim

**Implementasjon:** Liten side på `dmarketing.no/admin/whois` (passordbeskyttet) som tar et domene og spytter ut riktig mal.

```javascript
// pseudo-kode
const whois = require('whois-json');
const result = await whois('dinbedrift.no');
const registrar = identifyRegistrar(result.registrar);
const template = getTemplate(registrar);
return prefillTemplate(template, { domain, customer });
```

### A4. Brevo for transaksjons-e-post
**Sparer:** Manuelle e-poster på Dag 0, 2, 4, 7
**Setup-tid:** 2 timer
**Kost:** Gratis (300 e-post/dag)

Velkomst-e-post + status-updates + handover-bekreftelse skal sendes konsistent og automatisk.

| Trigger | E-post |
|---|---|
| Tally-skjema submitted | Velkomst (med Calendly + DNS-forhåndsvarsel) |
| Adrian markerer "DNS-mal sendt" i Notion | "DNS-mal er på vei" |
| Adrian markerer "Site live på preview" | "Din preview-link er klar" |
| Calendly handover-booking opprettet | "Bekreftelse på handover" |
| Adrian markerer "Levert" | "Velkommen som AI-Webmaster-eier — start her" |

Brevo + Make.com (gratis) håndterer trigger-flyten. Notion er kommandosenteret.

### A5. Notion-kunde-CRM
**Sparer:** Total oversikt — du glemmer ingen
**Setup-tid:** 1 time
**Kost:** Gratis

Én database med alle kunder + status. Hver kunde har:
- Status (Lead → Brief sendt → I bygging → Levert)
- Pakke
- Domene + registrar
- Calendly-bookings
- E-post-tråd-link
- Påminnelser
- Notater

Brukes som single source of truth. Driver automasjonene over.

---

## Tier 2 — Bygg innen første 90 dager

### A6. Cloudflare-API kunde-scaffolder
**Sparer:** 30 min manuell oppsett per kunde
**Setup-tid:** 4 timer
**Kost:** Gratis

CLI-script `scaffold-customer.js`:
```bash
node scaffold-customer.js \
  --kunde="Rørleggermester Stavanger AS" \
  --domene=rorleggermester.no \
  --bransje=rorlegger
```

Skript gjør:
1. Klone Astro-bransje-mal til ny GitHub-repo
2. Opprett Cloudflare Pages-prosjekt
3. Koble repo til Pages
4. Sett opp DNS-records hvis du allerede har auth
5. Opprett preview-branch
6. Generer Claude-prosjekt-template
7. Opprett Notion-kunde-side med alle lenker

Reduserer Fase 05 (Infrastruktur) fra 30 min klikking til 30 sek skript-kjøring.

### A7. Pakkeforslag-PDF-generator
**Sparer:** 10 min per pakkeforslag
**Setup-tid:** 2 timer
**Kost:** Gratis

URL `dmarketing.no/pakkeforslag?kunde=X&pakke=Y&dato=Z` rendrer ferdig pakkeforslag-side fra `pakkeforslag-mal.html` med utfylte felter, og print-til-PDF gjør resten.

I dag: åpne mal, søk-erstatt felter, lagre som PDF, vedlegg.
Med automasjon: send lenke. Klipp-og-lim PDF når kunden svarer "ja".

### A8. Loom-analytics → Instantly-tag
**Sparer:** 10 min daglig sjekking + bedre oppfølgings-timing
**Setup-tid:** 2 timer
**Kost:** Gratis

Loom Business har webhook når noen ser videoen. Make.com tar imot, sjekker hvor langt de så (>50 % = engasjert), og setter Instantly-tag på leaden.

Dette lar deg sende oppfølger 4 dager etter til **kun de som faktisk så videoen**, ikke alle 800 leads. Kraftig.

### A9. Gmail-filter for innkommende svar
**Sparer:** 5 min daglig
**Setup-tid:** 15 min
**Kost:** Gratis

Detaljert i `instantly-svar-maler.md`. Gmail filtrerer "Ring meg", "Send pakkeforslag", "Nei takk" inn i forskjellige etiketter med ulik prioritet.

---

## Tier 3 — Bygg når du har tid (senere enn 90 dager)

### A10. Status-portal for kunder
**Sparer:** "Hvor langt er dere?"-e-poster
**Setup-tid:** 1 dag
**Kost:** Gratis

Side på dmarketing.no/status/[kundeid] som viser real-time progresjon i 6-fase-modellen. Genereres fra Notion CRM. Kunder elsker dette.

### A11. AI-prosjekt-bootstrap
**Sparer:** 30 min Fase 04-arbeid per kunde
**Setup-tid:** 1 dag
**Kost:** Gratis (bruker Anthropic API du allerede har)

Script tar bedriftsdata + crawl-resultat + tone-of-voice-eksempler og genererer ferdig-konfigurerbart Claude-prosjekt med all kontekst pre-loaded.

### A12. Faktura-automasjon med Stripe / Visma eAccounting
**Sparer:** 5 min per faktura
**Setup-tid:** 2 timer
**Kost:** ~2 % per transaksjon (Stripe)

Når kunden signerer i Notion (status = "Levert"), trigges faktura. Når faktura betales, trigges ferdigstillelse-e-post.

### A13. Kunde-handover-bot
**Sparer:** Du slipper å være tilstede for spørsmål kl 22:00
**Setup-tid:** 1 dag
**Kost:** ~$5/mnd Anthropic API

Kundens Claude-prosjekt kan svare på "hvordan gjør jeg X?" basert på opplæringsvideoer + dokumentasjon. Reduserer support-press.

---

## Tooling-oversikt

| Verktøy | Tier | Kost | Erstatter |
|---|---|---|---|
| Tally | 1 | Gratis | E-post back-and-forth |
| Cal.com | 1 | Gratis | Calendly når begrenset |
| Brevo | 1 | Gratis | Manuell e-post |
| Notion | 1 | Gratis | Excel/spreadsheet |
| Make.com | 1 | Gratis | Manuell trigger |
| Cloudflare API | 2 | Gratis | Manuell dashboard-klikking |
| Loom Business | 2 | $15/mnd | YouTube unlisted |
| Stripe | 3 | 2 % | Manuell faktura |

**Total kostnad ved full utbygging:** ~$15/mnd (Loom) + ~2 % per transaksjon (Stripe). Resten gratis.

---

## Hva du IKKE skal automatisere

1. **Den 15-min handover-samtalen** — kunden vil snakke med en menneske ved levering. Aldri fjern dette.
2. **Tone-of-voice-konfigurasjon** — krever lese gjennom kundens eksisterende innhold med menneske-øyne.
3. **Kvalitetskontroll på det AI-en bygger** — du må se på det selv før det går til kunden.
4. **Salgsamtaler** — folk kjøper fra mennesker.

---

## Anbefalt rekkefølge etter 07.05

| Uke | Bygg dette |
|---|---|
| Uke 1 (etter 07.05) | A5 Notion CRM (du trenger oversikt) |
| Uke 2 | A4 Brevo + velkomst-e-post-flyt |
| Uke 3 | A1 Tally-skjema |
| Uke 4 | A3 whois-script |
| Måned 2 | A6 Cloudflare-scaffolder + A8 Loom-analytics |
| Måned 3 | A2 Cal.com migrering + A7 Pakkeforslag-PDF-gen |

Bygg ikke alt på en gang. Bygg når smerten oppstår.
