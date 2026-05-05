# Kritisk gjennomgang — alt før 07.05

Single source of truth før demo-videoen sendes ut. Lest tirsdag morgen 06.05.

---

## Status: hva er ferdig, hva mangler

### Ferdig (i repoet, klar til bruk)

| Fil | Formål | Status |
|---|---|---|
| `demo-video-plan.md` | Master-plan + sjekklister | ✓ Synket med manus |
| `demo-video-manus.md` | Ord-for-ord manus (6:30) | ✓ Timinger fikset, prising korrigert |
| `demo-video-diagram.md` | Mermaid-diagram, 2 stk | ✓ Profesjonelle, ingen emoji |
| `demo-video-slides.html` | 4 slides for video-bruk | ✓ Strippet for cute-elementer |
| `kundens-innsats.md` | Kunde-flow + e-postmaler | ✓ 3 steg, 30 min totalt |
| `instantly-svar-maler.md` | Reply-maler R1–R6 + FAQ | ✓ Klar |
| `pakkeforslag-mal.html` | 2-sides PDF-mal | ✓ Klar (print til PDF) |
| `backup-video-manus.md` | 3-min backup hvis hovedvideo feiler | ✓ Spilles inn tirs kveld |
| `calendly-oppsett.md` | Calendly-konfigurasjon | ✓ Sjekkliste klar |
| `automasjoner.md` | Roadmap post-07.05 | ✓ Til etter videoen |
| `opplaering/01-05` | Kundeopplæringsvideoer | ✓ Manus klar — spilles inn etter første kunde |

### Må gjøres før opptak (du)

**Tirsdag 06.05 morgen:**
- [ ] Sjekk Cloudflare Pages-oppsett for dmarketing-repoet
- [ ] Verifiser at `preview`-branch deployer til en synlig URL
- [ ] Test Claude Code + GitHub MCP mot dmarketing-repoet — gjør 5 endringer ende-til-ende
- [ ] Hvis MCP ikke funker: følg [docs.anthropic.com/en/docs/claude-code/mcp](https://docs.anthropic.com/en/docs/claude-code/mcp) — det er typisk 30 min å fikse

**Tirsdag 06.05 før-middag:**
- [ ] Eksporter diagrammene til SVG via mermaid.live (bredde 2400, bakgrunn `#FAFAFA`)
- [ ] Ta full-page screenshots av `maler/rorlegger.html`, `maler/frisor.html`, `maler/tannlege.html` for cutaway
- [ ] Print eller åpne `demo-video-manus.md` på sekundær skjerm/iPad/telefon
- [ ] Les hele manuset høyt én gang, marker setninger som ikke føles som deg, omformuler

**Tirsdag 06.05 ettermiddag:**
- [ ] OBS-scenes konfigurert (skjerm-kun, skjerm+webcam, webcam-kun)
- [ ] Test-opptak 30 sek → spill av → sjekk lyd og bilde
- [ ] Filming i scene-rekkefølge: 2, 7, 8 (snakkende hode), så 1, 3, 4, 5, 6 (skjermopptak)
- [ ] Backup-video spilles inn rett etter (~30 min)

**Tirsdag 06.05 kveld:**
- [ ] Adobe Podcast Enhance på alle lydspor
- [ ] CapCut: import → klipp → render i 1080p
- [ ] Last opp til Loom (Business-konto, prøveperiode aktivert)
- [ ] Backup-video lastes opp som UNLISTED på Loom

**Onsdag 07.05 morgen:**
- [ ] Calendly-oppsett ferdig (`calendly-oppsett.md`)
- [ ] Calendly-lenken limt inn i alle reply-maler
- [ ] Pakkeforslag-mal print-testet til PDF
- [ ] Instantly-oppfølgingssekvens lagret som draft
- [ ] Reply-maler R1–R6 lagret som Instantly-snippets
- [ ] Gmail-filter for "Ring meg" / "Send pakkeforslag" / "Nei takk" satt opp

**Onsdag 07.05 ettermiddag (sending):**
- [ ] Final tekst til oppfølgings-mail klar
- [ ] Send til ~50 leads først, sjekk at Loom-link funker
- [ ] Vent 30 min — sjekk om noen åpner / klikker / svarer
- [ ] Hvis alt OK, send til resten i batches på 200

---

## Det jeg fant ved å gjennomgå alt — feil som er fikset

### Kritiske inkonsistenser (nå løst)

1. **Plan og manus var ute av sync** — Scene 5 i plan var gammel "5 spørsmål → vente → 15 min", manus hadde ny "23 leveranser, 6 faser". Synket nå.

2. **Manus Scene timinger overlappet** — Scene 5 endte 4:30, Scene 6 startet 4:15. Justert til 4:15-end / 5:15-start.

3. **Kundens tidsbruk var 3 forskjellige tall** — plan sa "under én time", manus "ti minutter", kundens-innsats "30 min". Standardisert på **30 minutter, fordelt over 7 dager**.

4. **Manus Scene 5 underrapporterte kundens innsats** — sa kun "5 spørsmål", men kundens-innsats viser 3 steg (brief + DNS + handover). Manus oppdatert til å nevne alle 3.

5. **Scene 4 timing var fantasi** — 2:00 budget for 3 preview-publiser-sykluser er fysisk umulig. Realistisk er 2:30–2:45. Justert.

6. **Endring 3 i Scene 4 endret pris** — `Digital Grunnmur 7 900 → 6 900` ville gjort dmarketing.no synlig feil for besøkende rett etter video. Endret til kosmetisk endring (undertekst på Autopilot Pro).

7. **Faktura-mismatch** — slide viste 10 550 kr, voice-over sa 7 500 kr. Voice-over endret til "ti tusen kroner" som matcher slide.

8. **Total video-lengde** — plan sa "5:30", manus tabell sa "6:00", men addert opp ble det 6:00. Med Scene 4 fikset til 2:45 blir det realistisk **6:30**. Standardisert.

### Manglende assets (nå laget)

1. **Reply-maler for Instantly** — `instantly-svar-maler.md` med R1 (Ring meg), R2 (Pakkeforslag), R3 (Nei takk), R4 (Spørsmål med 8 ferdig-svar på vanlige), R5–R6 (oppfølgere).

2. **Pakkeforslag-PDF** — `pakkeforslag-mal.html` to sider, profesjonell, klar til å åpnes i Chrome → Print → Lagre som PDF. Søk-erstatt `[BEDRIFTSNAVN]`, `[KUNDENS-URL]`, `[DATO]` per kunde.

3. **Backup-video** — `backup-video-manus.md` 3-min versjon. Spilles inn tirsdag kveld som forsikring.

4. **Calendly-oppsett-sjekkliste** — `calendly-oppsett.md` med exact event-konfigurasjon, intake-spørsmål, e-post-tekster.

5. **Automasjons-roadmap** — `automasjoner.md` for hva du bygger etter første kunder lander.

---

## Områder hvor kundens innsats kan reduseres ytterligere

Disse er IKKE bygget ennå, men er logiske neste steg:

| Forenkling | Setup-tid | Sparer for kunde |
|---|---|---|
| Tally-skjema for de 5 spørsmålene | 30 min | Slipper "hvilket felt manglet jeg svar på" |
| whois-script så vi vet registrar før kunden spør | 1 t | Slipper "vet ikke hvem registrerte domenet" |
| Cloudflare-scaffolder | 4 t | Reduserer dag 5 fra 30 min til 30 sek |
| Pre-utfylte DNS-maler basert på registrar | 1 t | Kunden får riktig mal første gang |
| Status-portal for kunder | 1 dag | Slipper "hvor langt er dere?"-spørsmål |

Alle dokumentert i `automasjoner.md`. Bygg etter videoen, ikke før.

---

## Hva du må verifisere er ekte før Scene 1 voice-over står ærlig

Manus sier:
> "Det jeg gjorde nå tok 80 sekunder. Først så jeg endringen i privat preview, så publiserte jeg."

Dette må stemme. Verifisering tirsdag morgen:

1. Åpne Claude Code mot dmarketing-repoet på preview-branch
2. Skriv: `Sett prisen på Autopilot Pro fra 12 900 til 11 900.`
3. Trykk enter, start stoppeklokke
4. Når Claude er ferdig: stopp klokke, noter sek
5. Klikk preview-link, verifiser endring synlig
6. Skriv `Publiser.`, start ny stoppeklokke
7. Refresh dmarketing.no til endring synlig: stopp klokke, noter sek

Total tid = preview-tid + verifiserings-tid + publiser-tid.

**Hvis total > 120 sekunder:** ikke si "80 sekunder" i voice-over. Si den faktiske tiden, eller si "under to minutter".

**Etter test:** rull tilbake endringen via preview-branch (`git reset` eller bare ny preview med `Tilbakestill prisen til 12 900` og publiser).

---

## Realistiske forventninger til 07.05

Basert på industri-benchmarks for B2B kald e-post + video-CTA:

| Metrikk | Forventning |
|---|---|
| 800 e-post sendt | 100 % |
| Åpningsrate (Instantly) | 35–45 % → **280–360 åpnet** |
| Klikk på Loom-link | 8–15 % av åpnere → **22–54 klikk** |
| Ser >50 % av video | 50–70 % av klikkere → **11–38 sett** |
| Svarer "Ring meg" eller "Send pakkeforslag" | 10–20 % av seere → **1–8 svar** |
| Konverterer til kunde | 30–50 % av samtaler → **1–4 kunder** |

**Realistisk utfall:** 2–4 nye kunder. Det er 25 800–51 600 kr i omsetning fra 800 leads. Helt normalt for B2B.

**Hvis 0 kunder:** sannsynligvis ikke videoen — det er produkt-marked-fit eller kvaliteten på leads-listen. Tenk seriøst om revisjon før du sender flere kampanjer.

**Hvis >10 kunder:** flaks. Eller du har truffet en uventet vinner. Rygg-pump.

---

## En viktig mental modell

Du sendte 800 e-post. **Det er 800 individer som har bestemt seg for IKKE å svare deg ennå.** Videoen skal flytte 1–2 % over til "responder"-segmentet. Det er ikke en magisk konvertering. Det er en lite forbedring i sannsynlighet per lead — men med 800 leads blir det reelle samtaler.

Ikke vent på "viral"-respons. Forvent stillhet med få guld-leads i mellom.

---

## Verste utfall + responsplan

| Hva | Hvorfor det skjer | Plan |
|---|---|---|
| 0 svar første 24 t | Normalt — folk er travle | Vent. Oppfølgingsmail går ut etter 4 dager. |
| Loom-linken er nede | Sjelden, men mulig | Backup-link på YouTube unlisted klar |
| Cloudflare deploy henger | Statistisk usannsynlig — har 99.99% uptime | Ikke send før det fungerer; ring Cloudflare support hvis kritisk |
| Du blir syk | Skjer | Send forhåndsskrevet "videoen er forsinket"-mail; lever fredag/mandag |
| Demo-en ser feil ut for besøkende på dmarketing.no | Du glemte å rulle tilbake etter test | Sjekk dmarketing.no live etter hver test-runde — se at standardprisene står |
| Gmail markerer din epost som spam | Mulig | Send 50 først; hvis bounce-rate >5 %, vent en time og prøv ny IP via Instantly |

---

## Hva som er VIKTIGST å gjøre rett

I prioritert rekkefølge — hvis du må kutte tid, kutt nedenfra:

1. **Fungerende live-demo i Scene 4.** Hvis denne ikke er ekte, faller alt.
2. **Manuset i Scene 5 om de 23 leveransene.** Salgsargumentet.
3. **Ærlig formulering i Scene 1 om timing.** Ikke lov "80 sek" hvis det er 110 sek.
4. **Calendly-lenken funker.** Ingenting verre enn lead som klikker død link.
5. **Reply-mal R1 og R2 ferdige.** Innen 24 t-løftet er offentlig.
6. **dmarketing.no live etter rollback.** Besøkere skal se ekte priser.
7. **Backup-video tilgjengelig.** Forsikring.

Alt under dette er nice-to-have.

---

## Etter videoen er sendt

Tirsdag uken etter:
- [ ] Sjekk Loom-analytics: hvem så ferdig?
- [ ] Send personlig follow-up til top 10 mest-engasjerte (de som så hele)
- [ ] Sett opp Notion CRM (`automasjoner.md` A5)
- [ ] Begynn å spille inn opplæringsvideoer 01–05 mens de er ferskt i hodet

Innen 30 dager:
- [ ] Tally-skjema for onboarding (`automasjoner.md` A1)
- [ ] Brevo for transaksjons-e-post (`automasjoner.md` A4)
- [ ] whois-script (`automasjoner.md` A3)
