# Prosess- og leveransediagram — AI-Webmaster

To diagram for bruk i demo-video og opplæring:
1. **Migrasjons- og leveranseprosess** — viser hvordan vi tar deg fra dagens nettside til selvgående.
2. **Endringssyklusen** — hvordan en oppdatering flyter fra chat til live etter levering.

Stil: ren, monokrom, teknisk. Ingen emoji i hovedflyten. Bygget for å se ut som et arkitekturdiagram fra et seriøst dokument — ikke en markedsføringsslide.

---

## 1. Migrasjons- og leveranseprosess

Hovedillustrasjonen i Scene 5 og i pakkeforslag-PDFer.

```mermaid
flowchart TB
    Start["<b>Eksisterende nettside</b><br/><span style='font-family:monospace;font-size:11px;color:#71717A'>Wordpress · Webflow · Wix · custom HTML</span>"]:::input

    subgraph FASE1[" FASE 01 — Analyse "]
        direction TB
        P1A["Crawl av sitemap<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>alle URL-er, struktur, dybde</span>"]
        P1B["Innholdsekstraksjon<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>tekst, bilder, kontaktinfo, metadata</span>"]
        P1C["Merkevare-audit<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>logo, fargepalett, typografi, tone</span>"]
        P1D["DNS- og domeneanalyse<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>nåværende registrar, hosting, MX</span>"]
    end

    subgraph FASE2[" FASE 02 — Bygg "]
        direction TB
        P2A["Astro-prosjekt initialisert<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>statisk site-generator, sub-second TTFB</span>"]
        P2B["Bransje-tilpasset komponentbibliotek<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>hero, tjenester, kontakt, pris-tabell</span>"]
        P2C["Innholdsmigrasjon med URL-mapping<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>SEO-bevarende redirects fra gammel struktur</span>"]
        P2D["Bilde-pipeline<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>WebP, responsive sizes, lazy-loading</span>"]
    end

    subgraph FASE3[" FASE 03 — SEO og ytelse "]
        direction TB
        P3A["Strukturert metadata<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>OpenGraph, Twitter, schema.org/LocalBusiness</span>"]
        P3B["Indekseringsklargjøring<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>sitemap.xml, robots.txt, canonical URLs</span>"]
        P3C["Ytelses-validering<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>Lighthouse 95+ på alle 4 akser</span>"]
    end

    subgraph FASE4[" FASE 04 — AI-motor "]
        direction TB
        P4A["Dedikert Claude-prosjekt<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>kundens private workspace</span>"]
        P4B["Kontekst-innlasting<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>bedriftsprofil, tjenester, priser, FAQ</span>"]
        P4C["Tone-of-voice-konfigurasjon<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>analyseert fra eksisterende innhold</span>"]
        P4D["GitHub MCP-integrasjon<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>chat → diff → push → deploy</span>"]
    end

    subgraph FASE5[" FASE 05 — Infrastruktur "]
        direction TB
        P5A["GitHub-repo i kundens navn<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>private, full eierskap til kildekoden</span>"]
        P5B["Cloudflare Pages-tilkobling<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>auto-deploy, edge CDN i 300+ byer</span>"]
        P5C["DNS-konfigurasjon og SSL<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>A-records, AAAA, automatisk Let's Encrypt</span>"]
        P5D["Preview-pipeline aktivert<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>preview-branch → privat URL før produksjon</span>"]
    end

    subgraph FASE6[" FASE 06 — Overlevering "]
        direction TB
        P6A["Personlige opplæringsvideoer<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>5 moduler, ~28 min totalt</span>"]
        P6B["Live-gjennomgang via skjermdeling<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>15 min, 1:1 med Adrian</span>"]
        P6C["Tilgangsoverføring<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>GitHub, Cloudflare, Claude-prosjekt</span>"]
        P6D["30 dagers inkludert support<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>e-post-respons innen 24 timer</span>"]
    end

    End["<b>Kunden er selvgående</b><br/><span style='font-family:monospace;font-size:11px;color:#FFFFFF;opacity:0.7'>full eier · 0 kr/mnd · selvbetjent oppdatering</span>"]:::output

    Start --> FASE1 --> FASE2 --> FASE3 --> FASE4 --> FASE5 --> FASE6 --> End

    classDef input fill:#FFFFFF,stroke:#71717A,color:#09090B,stroke-width:1.5px
    classDef output fill:#0B1F4A,stroke:#0B1F4A,color:#FFFFFF,stroke-width:1.5px
    classDef step fill:#FFFFFF,stroke:#D4D4D8,color:#09090B,stroke-width:1px

    class P1A,P1B,P1C,P1D,P2A,P2B,P2C,P2D,P3A,P3B,P3C,P4A,P4B,P4C,P4D,P5A,P5B,P5C,P5D,P6A,P6B,P6C,P6D step

    style FASE1 fill:#FAFAFA,stroke:#E4E4E7,color:#52525B
    style FASE2 fill:#FAFAFA,stroke:#E4E4E7,color:#52525B
    style FASE3 fill:#FAFAFA,stroke:#E4E4E7,color:#52525B
    style FASE4 fill:#FAFAFA,stroke:#E4E4E7,color:#52525B
    style FASE5 fill:#FAFAFA,stroke:#E4E4E7,color:#52525B
    style FASE6 fill:#FAFAFA,stroke:#E4E4E7,color:#52525B
```

**23 konkrete tekniske leveranser** fordelt over 6 faser. Total kalendertid: 5–7 dager. Total arbeidsinnsats fra kunde: under 1 time.

---

## 2. Endringssyklusen — etter levering

For Scene 1 og opplæringsvideo 02. Viser hva som skjer hver gang kunden gjør en endring.

```mermaid
flowchart LR
    Start["<b>Idé</b>"]:::neutral

    subgraph PRIVATE[" Privat — bare kunden ser "]
        direction TB
        S1["<b>01</b> · Kommando i chat<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>«Sett pris til 11 900»</span><br/><span style='font-family:monospace;font-size:10px;color:#A1A1AA'>~5 sek</span>"]
        S2["<b>02</b> · Build og deploy til preview<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>git push → Cloudflare build</span><br/><span style='font-family:monospace;font-size:10px;color:#A1A1AA'>~30 sek</span>"]
        S3["<b>03</b> · Verifisering på preview-URL<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>preview.dmarketing.no</span><br/><span style='font-family:monospace;font-size:10px;color:#A1A1AA'>~15 sek</span>"]
    end

    Decision{"Godkjent?"}:::decision

    subgraph PUBLIC[" Live — alle ser "]
        S4["<b>04</b> · Merge til main<br/><span style='font-family:monospace;font-size:11px;color:#71717A'>preview → production deploy</span><br/><span style='font-family:monospace;font-size:10px;color:#A1A1AA'>~30 sek</span>"]
    end

    End["<b>Live på domenet</b><br/><span style='font-family:monospace;font-size:11px;color:#FFFFFF;opacity:0.7'>total tid: under 90 sekunder</span>"]:::output

    Start --> S1 --> S2 --> S3 --> Decision
    Decision -.->|"Avvik — prøv igjen"| S2
    Decision -->|"Godkjent"| S4 --> End

    classDef neutral fill:#FFFFFF,stroke:#71717A,color:#09090B,stroke-width:1.5px
    classDef step fill:#FFFFFF,stroke:#2563EB,color:#09090B,stroke-width:1px
    classDef decision fill:#FFFFFF,stroke:#09090B,color:#09090B,stroke-width:1.5px
    classDef output fill:#0B1F4A,stroke:#0B1F4A,color:#FFFFFF,stroke-width:1.5px

    class S1,S2,S3,S4 step

    style PRIVATE fill:#FAFAFA,stroke:#E4E4E7,color:#52525B,stroke-dasharray:5 5
    style PUBLIC fill:#F0FDF4,stroke:#BBF7D0,color:#166534
```

---

## Slik eksporterer du diagrammene til bilde

### Anbefalt: mermaid.live → SVG

1. Gå til [mermaid.live](https://mermaid.live)
2. Lim inn diagram-koden (kun innholdet mellom ` ```mermaid `-fence-ene)
3. Klikk **Actions → SVG**
4. Sett:
   - **Width:** `2400` (så det er skarpt på 4K-video)
   - **Background:** `#FAFAFA`
5. Last ned SVG-filen
6. Importer i CapCut som bildelag — den skalerer uten kvalitetstap

### Alternativ: GitHub render + screenshot

1. Pushet du allerede denne filen til GitHub? Da renderer GitHub mermaid automatisk.
2. Åpne `demo-video-diagram.md` på github.com
3. Skjermdump diagrammet i full bredde (Snipping Tool på Windows: `Win + Shift + S`)

---

## Hvis du vil tilpasse

### Endre fase-navn eller leveranse-tekster
Rediger denne filen direkte. Endringer vises i ren mermaid-syntaks.

### Bytte fra norsk til engelsk
Søk og erstatt fasenavn (FASE → PHASE). Resten følger.

### Justere fargene
Endre `classDef`- og `style`-linjene nederst i hvert diagram. Aksent-fargen `#0B1F4A` (navy) er konsistent på start/end-noder. `#2563EB` (brand-blå) er border på aktive steg.

### Vise færre faser i en kort versjon
Slett `subgraph FASE3` og `subgraph FASE4` for en 4-fase-versjon. Husk å fjerne dem fra `Start --> FASE1 --> ...`-linjen.

---

## Hvor brukes hvilket diagram?

| Diagram | Brukes i |
|---|---|
| **1. Migrasjons- og leveranseprosess** | Scene 5 i demo-video · pakkeforslag-PDF · salgs-side |
| **2. Endringssyklusen** | Scene 1 (visuelt anker) · opplæringsvideo 01 og 02 |
