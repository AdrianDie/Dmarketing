# Demo-video — Manus (ord-for-ord)

**Total lengde mål: 6:30**
**Lese-tempo: rolig, men ingen pauser. ~150 ord/min.**
**Markering:** [SKJERM] = hva seer ser. [DU] = du i kamera. *(regi)* = handling.

---

## SCENE 1 — KROKEN (0:00 – 0:25)

[SKJERM] Du sitter i Claude Code. Cursor blinker.

[DU SKRIVER]: `Sett prisen på Autopilot Pro fra 12 900 til 11 900.`

*(Trykk enter. Klokke starter på 00:00 i hjørnet.)*

**Voice-over (mens Claude jobber):**
> "Pass på klokken oppe i hjørnet."

*(Preview-link dukker opp i chatten. Du klikker. Ny pris synlig på preview-URL. Klokke står på 00:38.)*

**Voice-over:**
> "Der ser jeg endringen. Den er ikke live enda — bare jeg ser den."

[DU SKRIVER]: `Publiser.`

*(Cut til dmarketing.no — ny pris synlig. Klokke 01:18.)*

**Voice-over:**
> "Nå er den live. Åtti sekunder fra idé til ferdig — med en sikkerhetsknapp på veien. Det hadde kostet deg 1 500 kr og to dagers venting hos et webbyrå. Jeg skal vise deg hvordan du gjør akkurat dette på din egen side."

---

## SCENE 2 — DEN ÆRLIGE RAMMEN (0:25 – 0:55)

[DU i kamera]

> "Jeg heter Adrian. Jeg er dataingeniør, og jeg sendte deg en e-post tidligere denne uken.
>
> Grunnen er enkel: jeg tror du betaler for mye for nettsiden din, eller du har en utdatert side du ikke tør røre fordi det blir dyrt og tregt hver gang.
>
> Jeg skal vise deg tre ting i denne videoen. Hvordan systemet fungerer. Hva *du* faktisk må gjøre — det er nesten ingenting. Og hva det koster, og hvorfor du aldri trenger å betale meg igjen etter det.
>
> Fem og et halvt minutt. La oss kjøre."

---

## SCENE 3 — DEN GAMLE MODELLEN ER ØDELAGT (0:55 – 1:30)

[SKJERM] Vis Slide 1 (Faktura — total 10 550 kr).

**Voice-over:**
> "Dette er en typisk faktura. Ti tusen kroner for å endre noen priser, justere litt tekst, og koordinere prosjektet. Fire dagers behandlingstid. For en endring du i dag kunne gjort på nitti sekunder."

[SKJERM] Klipp til Slide 2 (E-post-tråd — Mandag → Fredag).

**Voice-over:**
> "Slik ser det ut i innboksen. Du sender en e-post mandag. Du får svar fredag. Og du betaler for ventetiden.
>
> Det er ikke fordi byråene er onde. Det er fordi modellen er fra 2010. AI har gjort hvert eneste ledd i den kjeden gratis."

---

## SCENE 4 — LIVE DEMO (1:30 – 4:15) ⭐ HOVEDSCENEN
**Realistisk timing:** 3 endringer × ~50 sek (chat + AI + preview + verifiser + publiser + live) ≈ 2:30, pluss intro 5s og outro 10s = 2:45. Hvis Cloudflare bygger raskere enn ventet, sparer du 15–30 sek.

[SKJERM] To nettleserfaner side ved side. Én viser preview, én viser dmarketing.no live. Claude Code i bunnen.

**Voice-over (intro 5 sek):**
> "Dette er min egen nettside. Til venstre: live, det 800 bedrifter ser akkurat nå. Til høyre: preview, bare jeg ser. La meg gjøre tre endringer."

### Endring 1 — Tekst (~30 sek)

[DU SKRIVER]: `Endre hovedoverskriften på forsiden til "Vi bygger AI-nettsider for norske bedrifter".`

*(Vent. Preview oppdateres.)*

**Voice-over:**
> "Der. Ny overskrift på preview. Live-siden er fortsatt urørt."

[DU SKRIVER]: `Publiser.`

*(Live-siden oppdateres.)*

> "Nå er det likt på begge."

### Endring 2 — Ny seksjon (~40 sek)

[DU SKRIVER]: `Legg til en kundeanmeldelse fra "Kari Hansen, Frisør Stavanger" nederst på ai-webmaster-siden.`

*(Vent. Preview viser ny seksjon.)*

**Voice-over:**
> "Den lager en hel ny seksjon, med riktig design, på under et minutt. Hadde dette vært et byrå: minimum 3 000 kr."

[DU SKRIVER]: `Publiser.`

### Endring 3 — Pris (~50 sek)

[DU SKRIVER]: `Endre underteksten på Autopilot Pro-pakken fra "Komplett kontroll" til "Komplett kontroll · 1 mnd inkludert support".`

**Voice-over:**
> "Pris og pakke-detaljer er typisk det dyreste byråene tar betalt for å endre. AI gjør det på under et minutt."

*(Preview oppdateres. Du publiserer.)*

> "Live."

(Merknad: vi unngår å endre selve prisbeløpene under opptak fordi den faktiske prislisten på dmarketing.no skal være korrekt etter videoen er publisert. Endringer rundt teksten er trygt — du tilbakestiller alt etter opptak uansett.)

### Avslutning på Scene 4 (~15 sek)

**Voice-over:**
> "Tre endringer, fra idé til live, med preview underveis. Jeg åpnet ingen kode. Jeg trengte ikke vite hva 'CMS' er. Og jeg kunne ikke ødelegge noe, fordi alt går gjennom preview først.
>
> Det er som å skrive en SMS."

**Cutaway 5 sek** (3 statiske bilder fra `maler/`):

> "Samme system funker likt for en rørlegger, en tannlege eller en frisør. Bare annet design."

---

## SCENE 5 — PROSESSEN VI KJØRER (4:15 – 5:15)

[SKJERM] Vis **migrasjons- og leveransediagrammet** (eksportert SVG fra `demo-video-diagram.md`, diagram 1). Vertikal flyt: Eksisterende nettside → Fase 01–06 → Selvgående.

**Voice-over (kameraet panorerer langsomt nedover diagrammet, en fase om gangen):**
> "Når du sier ja, kjører vi denne prosessen. Den tar fem til sju dager. Din innsats er én ting du gjør — én gang.
>
> **Fase 01.** Vi crawler din eksisterende nettside, henter ut alt innhold, alle bilder, kontaktinfo. Vi identifiserer logo, farger, og tonen i tekstene dine. Vi analyserer DNS-en og finner ut hvem som hoster siden i dag.
>
> **Fase 02.** Vi initialiserer et nytt prosjekt i Astro — en moderne, lynrask kodebase. Vi bygger et bransje-tilpasset komponentbibliotek. Vi mapper alle de gamle URL-ene dine til den nye strukturen, så Google ikke mister deg. Bilder konverteres til moderne formater og lastes lazy.
>
> **Fase 03.** Vi setter opp hele SEO-grunnmuren. Strukturert metadata, schema-markup som forteller Google at du er en lokal bedrift, sitemap, robots.txt. Vi tester at siden scorer 95 av 100 på Google sin egen Lighthouse-test — på alle fire akser.
>
> **Fase 04.** Vi setter opp et privat AI-prosjekt for deg. Vi laster inn all kontekst om bedriften — tjenester, priser, FAQ. Vi konfigurerer tonen så AI-en skriver som deg, ikke som en robot. Og vi kobler det opp mot GitHub via det vi kaller MCP — slik at chat-meldinger blir til ekte kode-pushes automatisk.
>
> **Fase 05.** Vi setter opp infrastrukturen i ditt navn. GitHub-repo som du eier. Cloudflare Pages som hoster siden globalt på et CDN i over tre hundre byer. SSL-sertifikat. DNS. Og preview-pipelinen du så tidligere — slik at ingenting går live uten at du sier ja.
>
> **Fase 06.** Til slutt overleveringen. Personlige opplæringsvideoer. Femten minutters skjermdeling med meg. Tilganger overført. Tretti dagers inkludert support.
>
> Tjuetre tekniske leveranser. På sju dager.
>
> Din innsats i hele prosessen er tre korte handlinger. Du svarer på fem spørsmål — ti minutter. Du videresender én forhåndsutfylt e-post til domeneleverandøren din — fem minutter. Og du har en kvarters skjermdeling med meg på dag sju.
>
> Tretti minutter, fordelt over en uke. Det er hele jobben din."

---

## SCENE 6 — PRIS (5:15 – 6:00)

[SKJERM] Pakke-tabellen fra ai-webmaster.html. Highlight Autopilot Pro.

**Voice-over:**
> "Tolv tusen ni hundre kroner. Engangs. Det er anbefalt-pakken — Autopilot Pro.
>
> Du kan dele det opp over to eller tre måneder, rentefritt. Du kan utsette første faktura i tretti dager — som betyr at jeg leverer nettsiden din **før** du betaler første krone. Og etter det: null kroner i måneden til meg, for alltid. Du eier alt.

[SKJERM] Sammenligningsslide:
> Webbyrå: 25 000 oppsett + 1 500 × 36 mnd = **79 000 kr på 3 år**
> Autopilot Pro: 12 900 engangs + 0 × 36 mnd = **12 900 kr på 3 år**

**Voice-over:**
> "Et webbyrå koster typisk åtti tusen kroner over tre år. Min løsning koster tretten tusen — én gang. Differansen er 66 000 kroner du beholder selv."

---

## SCENE 7 — HVA SOM SKJER NÅ (6:00 – 6:30)

[DU i kamera]

> "Jeg tar åtte nye kunder denne måneden. Ikke flere — jeg setter opp AI-motoren personlig på hver av dem, og det krever tid.
>
> Hvis du vil høre mer: bare svar på e-posten du fikk fra meg, med én av to ting.
>
> Skriv 'Ring meg' — så ringer jeg deg innen 24 timer.
>
> Eller skriv 'Send pakkeforslag' — så får du en skreddersydd pdf på mail innen 24 timer, ingen samtale nødvendig.
>
> Begge er null forpliktelse. Ingen presentasjon. Ingen pitch."

---

## SCENE 8 — P.S. (6:30 – 6:45)

[DU i kamera, mer avslappet, halvsmilende]

> "P.S. Hvis du allerede har en nettside du er fornøyd med utseendet på — slapp av. Vi flytter den inn i AI-systemet uten at den endrer seg visuelt. Du beholder alt. Du vinner kontrollen.
>
> Takk for tiden din."

*(Smil. Cut til logo-skjerm: Dietrichs Marketing — dmarketing.no)*

---

# Tidssjekk
| Scene | Lengde | Akkumulert |
|---|---|---|
| 1 Kroken | 0:25 | 0:25 |
| 2 Ramme | 0:30 | 0:55 |
| 3 Smerte | 0:35 | 1:30 |
| 4 Demo | 2:45 | 4:15 |
| 5 Prosess | 1:00 | 5:15 |
| 6 Pris | 0:45 | 6:00 |
| 7 CTA | 0:30 | 6:30 |
| 8 P.S. | 0:15 | 6:45 |

**Mål: 6:30–6:45.** Live-demoens reelle byggetid avgjør den eksakte lengden.

**Hvis 6:30 føles for langt:**
- Drop Endring 3 i Scene 4 → sparer 50 sek → 5:55
- Kutt Scene 3 til 0:25 → sparer 10 sek → 6:20
- Kutt Scene 2 til 0:25 → sparer 5 sek

**Ikke kutt Scene 5.** Den er det viktigste salgsargumentet — den rettferdiggjør prisen.
