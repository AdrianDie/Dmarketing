# Reply-maler — håndtering av innkommende svar

Etter videoen sendes ut 07.05 vil mottakerne svare med varianter av "Ring meg", "Send pakkeforslag", "Nei takk", eller stille spørsmål.

Dette er ferdige svar du kan sende uten å skrive om hver gang.

---

## Mal R1 — "Ring meg"-svar

> **Emne:** Re: AI-Webmaster — finn en tid som passer
>
> Hei [Navn],
>
> Bra! Jeg har satt av tider for korte 20-min samtaler:
>
> 👉 [Calendly-link]
>
> Velg en som passer deg — jeg ringer på det nummeret du legger inn der.
>
> Vi tar 20 minutter, ingen presentasjon. Du forteller om bedriften, jeg forteller hvordan løsningen passer (eller ikke), og du tar avgjørelsen i ro og mak etterpå.
>
> Sees!
>
> Mvh
> Adrian Dietrichs
> dmarketing.no

**Bruk når:** Mottaker har skrevet "Ring meg", "Snakk med meg", "Vil høre mer", eller lignende.
**Lagres som:** Instantly snippet `R1-Ring`

---

## Mal R2 — "Send pakkeforslag"-svar

> **Emne:** Re: AI-Webmaster — pakkeforslag tilpasset [Bedriftsnavn]
>
> Hei [Navn],
>
> Som lovet, her er et tilpasset pakkeforslag.
>
> Basert på det jeg ser av nettsiden deres ([URL]) anbefaler jeg **Autopilot Pro**:
>
> — Engangskostnad: 12 900 kr
> — Drift fremover: 0 kr/mnd
> — Levering: 5–7 dager fra du sier ja
> — Du eier 100 % av kode, innhold og hosting
> — 1 mnd inkludert support
> — Rentefri delbetaling over 2–3 mnd hvis ønskelig
>
> Vedlagt: detaljert pakkeforslag (PDF) med alt som inngår.
>
> Hvis dette ser ut som noe — bare svar "Ja, sett i gang" så starter jeg byggingen i dag. Du får velkomst-e-posten med de første spørsmålene innen en time.
>
> Hvis du har spørsmål først: bare svar her. Ingen forpliktelse.
>
> Mvh
> Adrian Dietrichs
> dmarketing.no

**Bruk når:** Mottaker har skrevet "Send pakkeforslag", "Send mer info", "Vil ha pdf".
**Lagres som:** Instantly snippet `R2-Pakkeforslag`
**Vedlegg:** Bruk `pakkeforslag-mal.html` → Print til PDF → tilpass overskrift med bedriftsnavn.

---

## Mal R3 — "Nei takk"-svar

> **Emne:** Re: AI-Webmaster
>
> Hei [Navn],
>
> Helt greit, takk for at du tok deg tid til å svare.
>
> Jeg fjerner deg fra listen nå. Hvis du noen gang skifter mening, vet du hvor du finner meg.
>
> Lykke til videre.
>
> Mvh
> Adrian

**Bruk når:** Mottaker har skrevet "Nei takk", "Ikke aktuelt", "Vi har allerede løsning".
**Lagres som:** Instantly snippet `R3-Nei`
**Etterpå:** Marker leaden som "Unsubscribed" i Instantly + i CSV-filen.

---

## Mal R4 — Spørsmål om priser/spesifikasjon

> **Emne:** Re: AI-Webmaster — kort svar på spørsmålet ditt
>
> Hei [Navn],
>
> Godt spørsmål.
>
> [SVAR PÅ SPØRSMÅL — 2-3 setninger]
>
> Hvis du vil snakkes: [Calendly-link] — eller bare svar her hvis du har flere spørsmål.
>
> Mvh
> Adrian

**Bruk når:** Mottaker stiller et konkret spørsmål før de signerer.
**Lagres som:** Instantly snippet `R4-Sporsmal`

### Vanlige spørsmål + ferdig svar:

**"Hva koster det per måned?"**
> Null kroner i måneden til meg. Engangskostnad 1 900–24 900 kr avhengig av pakke. Du betaler kun for ditt eget domene (~150 kr/år til registraren) og det er det.

**"Eier jeg virkelig koden?"**
> Ja, hundre prosent. GitHub-repoet er i ditt navn. Hvis du noen gang vil flytte til en annen leverandør, tar du med deg alt — koden, innholdet, domenet. Ingen lås, ingen utgangsavgift.

**"Hva hvis du forsvinner / blir syk / går konkurs?"**
> Da går nettsiden din videre uten meg. Hostingen er på Cloudflare i ditt navn. AI-en (Claude) er en tjeneste fra Anthropic du betaler ~20 dollar/mnd for hvis du vil bruke den. Du har full dokumentasjon og opplæringsvideoer som dekker hele systemet.

**"Hvor lang er bindingstiden?"**
> Null binding. Du betaler én gang. Etter levering har du ingen forpliktelser overfor meg.

**"Kan jeg se eksempler?"**
> dmarketing.no er bygget på samme system. I tillegg har jeg maler for typiske bransjer på dmarketing.no/maler — rørlegger, frisør, klinikk, etc. Si fra hvilken bransje du er i, så sender jeg det relevante eksemplet.

**"Hvor mange undersider får jeg?"**
> Avhenger av pakke. Digital Grunnmur: inntil 3. Autopilot Pro: inntil 7. Premium: inntil 15. Du kan alltid legge til flere senere via AI-chatten — det koster ingenting.

**"Funker det med min eksisterende e-post (kari@bedrift.no)?"**
> Ja. Vi setter opp DNS-en så e-posten din fortsetter å fungere uavbrutt. Ingenting endres for deg som bruker.

**"Hva med SEO? Mister jeg Google-rangering?"**
> Nei, tvert imot. Vi mapper alle de eksisterende URL-ene dine til ny struktur (301 redirects) og setter opp moderne SEO-grunnmur som typisk forbedrer Google-rangeringen. De fleste kunder ser bedre Lighthouse-score enn det gamle nettstedet.

---

## Mal R5 — Inaktiv etter å ha sett videoen (oppfølger 4 dager etter)

Sendes automatisk via Instantly til de som åpnet videolinken men ikke svarte.

> **Emne:** Rask sjekk — så du videoen?
>
> Hei [Navn],
>
> Bare en rask sjekk — så du demo-videoen?
>
> Hvis du har spørsmål eller bare vil snakkes 10 minutter uforpliktende:
> 👉 [Calendly-link]
>
> Hvis ikke aktuelt for deg — bare svar **"Nei takk"**, så fjerner jeg deg fra listen og slutter å plage deg.
>
> Mvh
> Adrian

**Lagres som:** Instantly oppfølgings-sekvens steg 2.

---

## Mal R6 — Inaktiv etter både video + oppfølger (siste forsøk, 14 dager etter)

Siste forsøk før vi gir opp.

> **Emne:** Siste forsøk — er det noe jeg kan gjøre?
>
> Hei [Navn],
>
> Jeg vet du er travel. Bare én siste melding fra meg.
>
> Hvis det er noe spesifikt som holder deg tilbake — pris, timing, frykt for å bytte — bare si fra. Jeg svarer ærlig om det passer eller ikke.
>
> Hvis det bare ikke er aktuelt — svar **"Nei takk"**, så slutter jeg å sende e-poster.
>
> Tusen takk for tiden din uansett.
>
> Mvh
> Adrian

**Lagres som:** Instantly oppfølgings-sekvens steg 3 (final).

---

## Triage-flow når svar kommer inn

```
Innkommet svar
    ↓
Inneholder "Ring", "Snakk", "Tel"          → R1 + Calendly
Inneholder "Pakke", "PDF", "Forslag"       → R2 + PDF-vedlegg
Inneholder "Nei", "Ikke aktuelt", "Slutt"  → R3
Inneholder spørsmål                         → R4 (custom)
Annet                                       → Les manuelt, svar fritt
```

## Gmail-filter for triage

Sett opp i Gmail (Filters → Create new filter):

| Krav | Etikett | Handling |
|---|---|---|
| Subject contains "Re:" + Body contains "Ring meg" | `Lead-Ring` | Star, prioritize |
| Subject contains "Re:" + Body contains "Send pakkeforslag" | `Lead-Pakke` | Star, prioritize |
| Subject contains "Re:" + Body contains "Nei takk" | `Lead-Nei` | Archive after R3 sent |

Resultat: innboksen din triagerer seg selv. Du svarer i prioritert rekkefølge.

---

## Responstid-mål

| Type | Mål |
|---|---|
| "Ring meg" | Innen 24 timer (lovet i video) |
| "Send pakkeforslag" | Innen 24 timer (lovet i video) |
| "Nei takk" | Innen 1 uke (ikke kritisk) |
| Spørsmål | Innen 24 timer |

Sett kalender-blokk hver dag kl 09 og 16 for å sjekke + svare. Ikke spred det utover dagen — det dreper fokus.
