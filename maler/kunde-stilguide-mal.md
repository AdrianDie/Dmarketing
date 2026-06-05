<!--
═══════════════════════════════════════════════════════════════════════════
  AGENCY-INTERNAL — LES DETTE FØRST (skal IKKE leveres til kunden som det er)
═══════════════════════════════════════════════════════════════════════════

  Dette er MALEN for stilguiden som følger med hver nettside-leveranse.
  Den er selve "skillen" vår, pakket om til kundens egen nettside, så kundens
  Claude lager nye sider i NØYAKTIG samme stil som vi bygde — automatisk.

  SLIK BRUKER DU MALEN (gjøres i bygg-fasen, dag 2–4, samtidig som de andre
  tilpasningspunktene i CONTEXT.md):

  1. Kopier alt UNDER linjen "✂ KLIPP HER" ned i kundens repo.
  2. Lagre den som  CLAUDE.md  i ROTEN av kundens repo.
     → Claude Code leser CLAUDE.md automatisk ved hver økt. Da trenger ikke
       kunden å huske noe — hver "lag en ny side"-prompt arver stilen.
     → Bruker kunden gratis-Claude (web-Project) i stedet: lim det samme
       innholdet inn som Project-instruks / kunnskap (samme sted vi legger
       "din bedrift som kontekst" i modul 04).
  3. Søk/erstatt ALLE [KLAMMER]-felt med kundens faktiske verdier:
       [BEDRIFTSNAVN] [BY] [BRAND_HEX] [BRAND_NAVN] [DISPLAY_FONT]
       [TELEFON] [E-POST] [BRANSJE]
     Disse matcher brief-spørsmålene i kundens-innsats.md.
  4. Sett [DISPLAY_FONT] = den faktiske display-fonten vi valgte for malen
     (Archivo er standard; noen bransjemaler bruker Fraunces / Bricolage
     Grotesque / Newsreader / IBM Plex — sjekk <head> i den leverte siden).
  5. I kurset omtaler vi denne fila som «stilguiden din» — ikke som CLAUDE.md
     eller "en skill". Hold språket ufarlig for kunden.

  Kilde / sannhet for stilen: prosjektets CLAUDE.md ("Linear-stil"),
  maler/CONTEXT.md, demo-video-flow.html. Endrer vi hus-stilen, oppdater
  denne malen også.

✂ ─────────────────────  KLIPP HER — alt under blir kundens CLAUDE.md  ─────────────────────
-->

# Stilguide — [BEDRIFTSNAVN]

> **Til deg som leser dette (det er som regel Claude):**
> Dette er stilguiden for nettsiden til [BEDRIFTSNAVN]. Når du lager en ny
> side eller endrer en eksisterende, skal resultatet se ut som om det alltid
> har vært en del av dette nettstedet. **Stil-konsistens er viktigere enn å
> være kreativ.** Er du i tvil: åpne en eksisterende side og kopier mønsteret
> derfra.

---

## Gylden regel

**Match alltid resten av nettstedet.** Før du bygger noe nytt: se på en
eksisterende, ferdig side (f.eks. forsiden eller en tjeneste-side), og gjenbruk
samme farger, fonter, knappestil, kort-stil, avstander og seksjonsrytme. Ikke
finn opp et nytt design. En ny side som "stikker seg ut" er en feil, ikke et
pluss.

> For større jobber (en helt ny side eller seksjon) finnes en mer detaljert
> design-skill i `.claude/skills/nettside-stil/` — den beskriver hva som skiller
> en «ferdig» side fra en «uferdig», med en sjekkliste. Bruk den ved behov.

---

## Farger

Bruk kun disse. Ikke introduser nye farger uten at det blir bedt om eksplisitt.

| Rolle | Verdi | Brukes til |
|---|---|---|
| Merkefarge ([BRAND_NAVN]) | `[BRAND_HEX]` | Knapper, lenker, aksenter, aktive ikoner |
| Bakgrunn (lys) | `#FAFAFA` / `#FFFFFF` | Sidebakgrunn, kort |
| Tekst (nesten svart) | `#09090B` | Overskrifter og brødtekst |
| Dempet tekst | `#71717A` | Undertekst, bildetekst, metainfo |
| Kantlinjer | `#E4E4E7` | Rammer rundt kort, skillelinjer |
| Mørk (footer/CTA) | `#0B1F4A` (navy) | Footer og mørke CTA-seksjoner |

Regler:
- Ingen tunge svarte flater. Footer er det eneste mørke faste elementet.
- Aldri to mørke seksjoner rett etter hverandre.
- Merkefargen er en aksent — den skal ikke dekke store flater.

## Typografi

- **Overskrifter:** `[DISPLAY_FONT]` (display-fonten vår), tung vekt (700–900),
  stram bokstavavstand på store titler (`letter-spacing: -0.03em` til `-0.05em`).
- **Brødtekst:** Inter, vanlig vekt (400), linjehøyde ~1.7.
- Maks 3 font-vekter på en side. Aldri en helt ny font uten at det er bedt om.
- Hierarki: én stor H1 øverst per side, deretter H2/H3 nedover.

## Avstand og layout

- **Luft er gratis — bruk mye.** Seksjoner: ca. `96px` topp/bunn (Tailwind `py-24`).
- Innholdsbredde sentrert i en container (typisk maks ~1100–1200px).
- Konsistente mellomrom mellom elementer (`gap-6` til `gap-12`).
- Alterner seksjonsbakgrunn mellom hvit og veldig lys grå (`zinc-50`).
- Aldri fyll hele skjermen helt ut — la ting puste.

## Komponenter (gjenbruk, ikke gjenoppfinn)

**Knapper**
- Primær: fylt med merkefargen `[BRAND_HEX]`, hvit tekst, avrundede hjørner,
  litt løft/glød på hover.
- Sekundær ("ghost"): hvit med tynn kantlinje, kantlinjen mørkner på hover.
- Akutt (kun hvis bransjen er akutt-preget): rød.

**Kort**
- Hvit bakgrunn, tynn kantlinje (`#E4E4E7`), godt avrundet (`rounded-2xl`),
  romslig innvendig padding (`p-6`/`p-8`).
- Hover: et lite løft + mykere skygge. Ingen harde/sorte skygger.

**Seksjoner**
- Overskrift sentrert eller venstrejustert — følg det resten av siden gjør.
- Footer: alltid mørk navy, med kontaktinfo og «© [BEDRIFTSNAVN]».

**Animasjon**
- Diskré: tekst/kort glir svakt opp og fader inn når man scroller (`opacity 0→1`,
  `translateY ~24px→0`). Forskyv (stagger) barn i lister/grids litt.
- Ingen sprett (bounce), ingen bokstav-for-bokstav-animasjon.

## Bilder

- Alltid `object-fit: cover` og et definert størrelsesforhold (unngå at
  layouten hopper).
- Behold stilen på eksisterende bilder (lyssetting, beskjæring, stemning).
- Legg alltid på beskrivende alt-tekst (bra for blinde og for Google).

## Språk og tone

- **Norsk.** Direkte og varm. Bruk «du» og «vi», ikke «kunden»/«selskapet».
- Ingen byråkrati, ingen engelsk-sjargong, ikke for mye emoji.
- Bransje: [BRANSJE]. Sted: [BY].
- Kontakt som skal stemme overalt: tlf [TELEFON], e-post [E-POST].

---

## Når du (Claude) lager en ny side

1. Finn en eksisterende side av samme type som referanse (en tjeneste-side
   som mal for en ny tjeneste-side, osv.).
2. Gjenbruk dens header/meny, footer, seksjons-struktur og komponent-stil.
3. Bytt kun innholdet — ikke design-rammeverket.
4. Hold deg til fargene og fontene over.
5. Legg den nye siden inn i menyen og oppdater sitemap.
6. Vis en kort oppsummering før publisering.

Hvis brukeren ber om noe som bryter med denne guiden (en helt ny farge, en
ny font, et helt annet uttrykk): gjør det de ber om, men si kort fra at det
vil avvike fra resten av nettstedet, så de gjør et bevisst valg.
