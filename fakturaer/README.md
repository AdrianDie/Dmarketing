# fakturaer/

Master-mal for fakturaer fra Dietrichs Marketing.

## Filer

- `_mal.html` — tom mal som åpnes i nettleser, redigeres inline (gule felt), og lagres som PDF (Ctrl+P).

## Slik lager du en ny faktura

1. Kopier `_mal.html` til kundens mappe: `kunder/<navn>/faktura-<år>-<nr>.html`
2. Endre `<img src="../images/...">` til `<img src="../../images/...">` (én ekstra `../` siden filen ligger to nivåer dypere)
3. Fyll inn fakturanr, dato, kundeinfo, beløp
4. Åpne i nettleser → Ctrl+P → "Lagre som PDF" → send på e-post
5. Behold HTML- og PDF-versjon i kundens mappe (bokføringsplikt 5 år)

## Fakturanummerering

Fortløpende uten hull, format `ÅÅÅÅ-NNN`:
- 2026-001
- 2026-002
- 2026-003

Rekkefølgen er kritisk — dokumenter alle fakturaer her selv om noen blir kreditert/kansellert.

## Sendte fakturaer (logg)

| Nr | Dato | Kunde | Beløp | Status |
|---|---|---|---|---|
| 2026-001 | 09.05.2026 | Elmer Laahne | 175 kr | Sendt |
