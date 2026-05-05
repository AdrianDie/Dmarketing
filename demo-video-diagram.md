# Prosess-diagram — AI-Webmaster

Mermaid-diagram for bruk i demo-videoen (Scene 5) og opplæringsvideo 01.

---

## Hovedversjon — preview-loop

```mermaid
flowchart LR
    Start([💡 Idé]) --> Chat

    subgraph PRIVAT [" PRIVAT — bare du ser "]
        direction TB
        Chat["💬 <b>1. Du skriver</b><br/><i>«Sett prisen til 11 900»</i><br/><br/>~5 sek"]
        AI["🤖 <b>2. AI lager endringen</b><br/>Bygger og deployer<br/>til preview-URL<br/><br/>~30 sek"]
        Preview["👁️ <b>3. Du sjekker preview</b><br/><code>preview.dmarketing.no</code><br/><br/>~15 sek"]
        Chat --> AI --> Preview
    end

    Preview --> Check{Ser det<br/>bra ut?}
    Check -->|❌ Nei — prøv igjen| AI
    Check -->|✅ Ja — publiser| Publish

    subgraph LIVE [" LIVE — alle ser "]
        Publish["🌐 <b>4. Endringen går live</b><br/><code>dmarketing.no</code><br/><br/>~30 sek"]
    end

    Publish --> End([✓ Ferdig på under 90 sek])

    classDef startEnd fill:#09090B,stroke:#09090B,color:#FFFFFF,font-weight:bold
    classDef user fill:#DBEAFE,stroke:#2563EB,color:#09090B,stroke-width:2px
    classDef ai fill:#FEF3C7,stroke:#F59E0B,color:#92400E,stroke-width:2px
    classDef preview fill:#FFFBEB,stroke:#F59E0B,color:#92400E,stroke-width:2px
    classDef live fill:#DCFCE7,stroke:#16A34A,color:#166534,stroke-width:2px
    classDef decision fill:#FFFFFF,stroke:#09090B,color:#09090B,stroke-width:2px

    class Start,End startEnd
    class Chat user
    class AI ai
    class Preview preview
    class Publish live
    class Check decision

    style PRIVAT fill:#FAFAFA,stroke:#E4E4E7,stroke-dasharray: 5 5,color:#71717A
    style LIVE fill:#F0FDF4,stroke:#BBF7D0,color:#166534
```

---

## Forenklet versjon — for slide i video

```mermaid
flowchart LR
    A["💬<br/><b>Du chatter</b><br/>5 sek"] --> B["🤖<br/><b>AI lager</b><br/>30 sek"]
    B --> C["👁️<br/><b>Du sjekker</b><br/>preview"]
    C --> D{OK?}
    D -.->|Nei| B
    D -->|Ja| E["🌐<br/><b>Live</b><br/>30 sek"]

    classDef step fill:#FFFFFF,stroke:#2563EB,color:#09090B,stroke-width:2px
    classDef live fill:#DCFCE7,stroke:#16A34A,color:#166534,stroke-width:2px
    classDef decision fill:#FEF3C7,stroke:#F59E0B,color:#92400E,stroke-width:2px

    class A,B,C step
    class E live
    class D decision
```

---

## Sammenligning — gammel modell vs. AI-Webmaster

```mermaid
flowchart TB
    subgraph Gammel [" 🐌 GAMMEL MODELL — webbyrå "]
        direction LR
        G1["📧 Du sender e-post"] --> G2["⏳ Venter 2–4 dager"]
        G2 --> G3["💸 Faktura<br/>1 500–7 500 kr"]
        G3 --> G4["✅ Endring live"]
    end

    subgraph Ny [" ⚡ AI-WEBMASTER "]
        direction LR
        N1["💬 Du chatter"] --> N2["👁️ Preview på 30 sek"]
        N2 --> N3["✅ Du publiserer"]
        N3 --> N4["🌐 Live på 90 sek totalt"]
    end

    classDef gammel fill:#FEE2E2,stroke:#DC2626,color:#991B1B,stroke-width:2px
    classDef ny fill:#DCFCE7,stroke:#16A34A,color:#166534,stroke-width:2px
    classDef gammelGroup fill:#FEF2F2,stroke:#FCA5A5
    classDef nyGroup fill:#F0FDF4,stroke:#86EFAC

    class G1,G2,G3,G4 gammel
    class N1,N2,N3,N4 ny

    style Gammel fill:#FEF2F2,stroke:#FCA5A5,color:#991B1B
    style Ny fill:#F0FDF4,stroke:#86EFAC,color:#166534
```

---

# Slik eksporterer du diagrammet til bildet du bruker i videoen

## Alternativ 1 — mermaid.live (raskest, gratis, ingen installasjon)

1. Gå til [mermaid.live](https://mermaid.live)
2. Lim inn diagram-koden (uten ` ```mermaid`-fence)
3. Klikk **Actions → PNG** (eller SVG for skarpeste kvalitet)
4. Sett `Width: 1920` og `Background: #FAFAFA` for video-bruk
5. Last ned

**Tips:** SVG lar deg skalere uten kvalitetstap. Bruk SVG hvis du legger det inn i CapCut.

## Alternativ 2 — VSCode Markdown Preview (hvis du redigerer mye)

1. Installer extension: **Markdown Preview Mermaid Support** (av Matt Bierner)
2. Åpne denne filen, trykk `Ctrl+Shift+V` → diagrammene rendres direkte
3. Høyreklikk → "Save image as" eller bruk Snipping Tool

## Alternativ 3 — GitHub render (allerede gjort)

GitHub renderer mermaid automatisk. Når du har pushet denne filen til GitHub:
- Åpne `demo-video-diagram.md` på github.com
- Du ser diagrammene rendret direkte
- Skjermdump dem hvis du vil

---

# Hvilken versjon bruker du hvor?

| Versjon | Brukes i |
|---|---|
| **Hovedversjon** | Scene 5 i demo-video (sentral illustrasjon) + opplæringsvideo 01 |
| **Forenklet** | Scene 1 (i bakgrunnen som visuelt anker) eller intro-thumbnail |
| **Sammenligning** | Scene 3 (alternativ til faktura-bildet) — men velg én, ikke begge |

---

# Hvis du vil tilpasse

Endre tekst direkte i mermaid-koden over, eller åpne i [mermaid.live](https://mermaid.live) og rediger der med live-preview. Når du er fornøyd, kopier tilbake hit og commit.

Tre vanlige justeringer du kanskje vil gjøre:
- **Bytt fargene** til noe mer brand-spesifikt — endre `fill:` og `stroke:` i `classDef`-linjene
- **Forkort tekst** hvis det ser overfylt ut på liten skjerm
- **Bytt rekkefølge** — `flowchart LR` (venstre→høyre) vs `flowchart TB` (topp→bunn)
