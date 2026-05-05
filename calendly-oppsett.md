# Calendly-oppsett — for innkommende leads

Konfigurasjon av Calendly så det er klart før videoen sendes ut 07.05.

---

## Konto

- **Pris:** Calendly har gratis tier. Det holder for nå (én event-type, ubegrenset booking).
- **Alternativ:** [Cal.com](https://cal.com) er gratis, åpen kildekode, og mer fleksibel. Anbefales hvis du vil unngå abonnementer langsiktig. Funksjonelt likt.
- **Beslutning:** Bruk Calendly nå (raskest å sette opp), bytt til Cal.com når du har tid (~2 timer å migrere).

---

## Event-type 1 — "AI-Webmaster — uforpliktende samtale"

**Dette er den ENESTE event-typen du trenger først.**

| Felt | Verdi |
|---|---|
| Navn | AI-Webmaster — uforpliktende samtale |
| URL-slug | ai-webmaster-samtale |
| Lengde | 20 min |
| Lokasjon | Telefon (du ringer dem) |
| Beskrivelse | Vi snakker 20 minutter. Du forteller om bedriften, jeg forteller hvordan løsningen passer (eller ikke), og du tar avgjørelsen i ro og mak etterpå. Null forpliktelse. |
| Tidssoner | Bruk inviteens tidssone (default) |
| Tilgjengelighet | Tirs–Fre, kl 09–16. Ikke mandag (du gjør prosjekt-arbeid mandager). |
| Buffer før | 5 min |
| Buffer etter | 10 min |
| Maks bookinger per dag | 4 |
| Minimum varsel | 4 timer |
| Maks fremtidig booking | 14 dager |

### Spørsmål til intake-skjema

Når noen booker, spør om disse 3 ting:

1. **Bedriftsnavn** *(påkrevd)*
2. **Telefonnummer** *(påkrevd)* — det jeg skal ringe på
3. **Eksisterende nettside (hvis du har)** *(valgfritt)* — så jeg kan se den før vi snakkes

Ikke flere felter. Friksjon = drop-off.

### Bekreftelses-e-post (Calendly sender automatisk)

Innstillinger → Notifications → Confirmation Email → Edit:

> **Emne:** Bekreftet — vi snakkes [DATO] kl [TID]
>
> Hei [Invitee Name],
>
> Bekreftet — jeg ringer deg [DATO] kl [TID] på [Phone Number].
>
> Før samtalen, hvis du har 30 sek: kikk på dmarketing.no og se hvordan en ferdig AI-Webmaster-side ser ut. Ikke nødvendig, bare nyttig.
>
> Hvis noe kommer i veien: bare svar på denne e-posten, så finner vi en ny tid.
>
> Sees!
>
> Mvh
> Adrian

### Påminnelse 1 time før samtalen

Innstillinger → Notifications → Reminder Email → 1 hour before:

> **Emne:** I dag kl [TID] — vi snakkes
>
> Hei [Invitee Name],
>
> Bare en rask påminnelse — vi snakkes om en time, jeg ringer på [Phone Number].
>
> Sees!
>
> Adrian

---

## Lenke som brukes i alt

```
https://calendly.com/[DIN-BRUKER]/ai-webmaster-samtale
```

Sett denne lenken inn i:
- [ ] `instantly-svar-maler.md` — Mal R1, R4, R5, R6
- [ ] `kundens-innsats.md` — velkomst-e-post
- [ ] Demo-videoens beskrivelse på Loom
- [ ] dmarketing.no/ai-webmaster — som backup-CTA

---

## Hva du IKKE skal sette opp ennå

- **Onboarding-event** (15-min handover på dag 7) — ikke nødvendig før første kunde signerer. Sett opp da.
- **Workflow-automation i Calendly** (ekstra integrations) — gratis tier dekker grunnbehov. Ikke betal for det enda.
- **Round-robin / team-bookings** — du er én person. Ikke relevant.

---

## Manuell sikkerhet

Selv om Calendly tar imot bookinger automatisk: legg inn kalender-blokk på alle tirs/ons/tors/fre kl 09–16 i din egen Google Calendar med tittelen "AI-Webmaster oppfølging — sjekk innboks". Det tvinger deg til å være tilstede. Calendly synker med Google Calendar, så blokkerte tidsrom forsvinner fra det offentlige bookings-vinduet.

---

## Tester før utsending

- [ ] Book deg selv inn en gang via inkognito-vindu — sjekk at bekreftelses-e-post kommer i innboksen
- [ ] Cancel den samme bookingen — sjekk at avbestillings-e-post kommer
- [ ] Sjekk at Google Calendar viser bookingen
- [ ] Sjekk at Calendly-lenken funker fra mobiltelefon (mottakerne dine vil klikke på telefon)

Hvis alt funker: Calendly er klar.
