# kunder/

Én mappe per kunde med dokumenter (fakturaer, kontrakter, leveranser).

> **Forskjell fra `docs/clients/`:**
> `docs/clients/<navn>.md` = Obsidian-noter (relasjon, status, logg).
> `kunder/<navn>/` = filer/dokumenter (HTML-fakturaer, PDF, vedlegg).

## Konvensjoner

**Mappenavn:** `<fornavn-etternavn>` eller `<bedriftsnavn>`, små bokstaver med bindestrek.

**Filer i kundemappen:**
- `faktura-<år>-<nr>.html` — kopi av sendt faktura (kilde-dokument)
- `faktura-<år>-<nr>.pdf` — PDF-eksport sendt til kunden
- `kontrakt.pdf` — signert avtale (hvis aktuelt)
- `leveranse/` — leverte filer (designforslag, screenshots, e.l.)

## Slik lager du en faktura til en kunde

Be Claude:

> *"Lag en faktura til [kunde] på [beløp] kr."*

Eller manuelt:
1. Kopier `fakturaer/_mal.html` til `kunder/<navn>/faktura-2026-NNN.html`
2. Endre `<img src="../images/...">` til `<img src="../../images/...">`
3. Fyll inn felter, åpne i nettleser, eksporter PDF

## Aktive kunder

- `elmer-laahne/` — testimonial-kunde, daglig leder
