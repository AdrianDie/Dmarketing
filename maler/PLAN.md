# Malplan — Dietrichs Marketing
## Linear-style redesign av bransjemaler

---

## Status per 2025

| Mal | Fil | Status |
|-----|-----|--------|
| Rørlegger | `rorlegger.html` | ✅ Lys tema ferdig → 🔄 Redesign Linear |
| Tannlege | `tannlege.html` | ✅ Lys tema ferdig → 🔄 Redesign Linear |
| Regnskap | `regnskap.html` | ✅ Lys tema ferdig → 🔄 Redesign Linear |
| Frisør | `frisor.html` | ✅ Lys tema ferdig → 🔄 Redesign Linear |
| Elektriker | `elektriker.html` | ✅ Lys tema ferdig → 🔄 Redesign Linear |
| Galleri | `index.html` | ✅ Klar → 🔄 Oppdatere med nye thumbnails |

---

## Designregler (Linear-stil) → se CLAUDE.md

---

## Redesign-prioritet

### 1. Elektriker (Proof of Concept) ← START HER
- Hero: Sentrert, dot-grid bakgrunn, stor Syne-font
- Services: **Bento Grid** 3-kolonne, varierende størrelser
- Prosess: Numrert, horisontal, lys bakgrunn
- Farger: Navy-blå + hvit + rød emergency

### 2. Rørlegger
- Hero: Asymmetrisk — stor tekst venstre, bilde overlapper neste seksjon
- Services: Bento grid
- Akutt-CTA: Fremtredende ring-knapp øverst

### 3. Tannlege
- Hero: Sentrert, luksus-feel, Playfair Display
- Services: Ren 3-kolonne med ikoner
- Varme beige/hvite toner

### 4. Frisør
- Hero: Fullbredde bilde med tekst-overlay (glassmorphism-kort)
- Galleri: Masonry-layout
- Font: Cormorant Garamond for headings

### 5. Regnskap
- Hero: Dashboard-mockup animert, DM Sans
- Prismodeller: Fremtredende cards med hover-glow
- B2B-feel: Streng, presis, ryddig

### 6. Galleri (index.html)
- Oppdatere preview-cards til nye design
- Vise at maler er premium / 20 000 kr-segment

---

## Tech stack for redesign

| Tool | Bruk | CDN |
|------|------|-----|
| **Tailwind CSS** | All layout og styling | `cdn.tailwindcss.com` |
| **Motion.js** | Scroll-animasjoner, micro-interactions | `cdn.jsdelivr.net/npm/motion` |
| **Syne** | Display-font elektriker/regnskap | Google Fonts |
| **Playfair Display** | Display-font tannlege | Google Fonts |
| **Cormorant Garamond** | Display-font frisør | Google Fonts |
| **Outfit** | Display-font rørlegger | Google Fonts |
| **Inter** | Brødtekst alle maler | Google Fonts |

---

## Bilde-referanser (lokale filer)
Malene bruker `bilder/[bransje]/` med onerror-fallback til Unsplash.
Bildefiler fra Unsplash ligger allerede i mappene (se BILDER.md i hver mappe).

---

## Design-avgjørelser per bransje

| Bransje | Font | Primærfarge | Feel |
|---------|------|-------------|------|
| Elektriker | Syne | `#2563EB` (klar blå) | Teknisk, presist, trygt |
| Rørlegger | Outfit | `#0F4C81` (dyp blå) | Solid, håndverksmessig |
| Tannlege | Playfair Display | `#1E3A5F` (marine) | Luksus, rent, trygt |
| Frisør | Cormorant Garamond | `#2D2D2D` (nesten svart) | Luksus, editorialt |
| Regnskap | DM Sans | `#1D4ED8` (business-blå) | Presist, profesjonelt |

---

## Neste steg etter maler
1. Oppdatere gallerisiden med nye maler
2. Lage 2-3 nye bransjemaler: Eiendomsmegler, Restaurant, Advokat
3. Deploy til Vercel med eget subdomain (maler.dmarketing.no)
4. Lage salgs-flow: Kontaktskjema → automatisk e-post med pris
