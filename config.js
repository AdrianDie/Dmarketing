/**
 * config.js — Styr hele outreach-maskinen herfra
 */

export const CONFIG = {

  // ─── Hvilke bransjer og byer som kjøres ───────────────────────────────────
  // Legg til eller fjern kombinasjoner her.
  // Scriptet kjører én kombinasjon per natt (roterer automatisk).
  targets: [
    { bransje: 'elektriker',  by: 'Oslo'        },
    { bransje: 'elektriker',  by: 'Bergen'       },
    { bransje: 'elektriker',  by: 'Stavanger'    },
    { bransje: 'elektriker',  by: 'Trondheim'    },
    { bransje: 'rorlegger',   by: 'Oslo'         },
    { bransje: 'rorlegger',   by: 'Bergen'       },
    { bransje: 'rorlegger',   by: 'Stavanger'    },
    { bransje: 'tannlege',    by: 'Oslo'         },
    { bransje: 'tannlege',    by: 'Bergen'       },
    { bransje: 'frisor',      by: 'Oslo'         },
    { bransje: 'frisor',      by: 'Bergen'       },
    { bransje: 'regnskap',    by: 'Oslo'         },
    { bransje: 'barber',      by: 'Oslo'         },
  ],

  // ─── Hvor mange leads som hentes per kjøring ──────────────────────────────
  leadsPerRun: 60,

  // ─── Filtrering — hvem er ideelle kunder? ─────────────────────────────────
  filter: {

    // Minimum score for å bli inkludert (0–100)
    // VIP = 80+, God = 50+, sett til 40 for å inkludere litt bredere
    minScore: 40,

    // Maks antall Google-anmeldelser
    // Over denne grensen = for stor / for etablert
    // Bedrifter med 150+ anmeldelser har som regel egne markedsfolk
    maxAnmeldelser: 150,

    // Minimum antall anmeldelser
    // Under denne grensen = for ny / inaktiv / falsk bedrift
    minAnmeldelser: 3,

    // Krev minimum denne ratingen (sett til 0 for å ignorere)
    minRating: 3.5,

    // Bare inkluder bedrifter med status OPERATIONAL
    kunOperasjonelle: true,

    // Bare inkluder leads med e-postadresse funnet
    krevEpost: true,

    // Ekskluder bedrifter med nettside hvis de har høy score
    // (de klarer seg sannsynligvis fint uten oss)
    // Sett til false for å inkludere alle med nettside
    ekskluderGodNettside: false,
  },

  // ─── Ord i bedriftsnavn som indikerer kjede / for stor ────────────────────
  // Leads med disse ordene i navnet hoppes automatisk over
  blacklistNavn: [
    'AS ',        // Eks: "Hafslund AS" — store selskap
    ' ASA',
    'Group',
    'Gruppen',
    'Holding',
    'Konsern',
    'Rørleggernes',   // Fagforeninger
    'Forbundet',
    'NVE',
    'Hafslund',
    'Telenor',
    'Eltel',
    'Bravida',        // Nasjonale kjeder
    'Caverion',
    'Assemblin',
  ],

  // ─── Instantly API ────────────────────────────────────────────────────────
  instantly: {
    // Hent fra: app.instantly.ai → Settings → API
    apiKey: process.env.INSTANTLY_API_KEY,

    // Finn kampanje-ID i URL når du er inne på kampanjen i Instantly
    // Eksempel: app.instantly.ai/campaigns/abc123 → kampanjeId = 'abc123'
    // Én kampanje per bransje anbefales:
    kampanjer: {
      elektriker: process.env.INSTANTLY_KAMPANJE_ELEKTRIKER,
      rorlegger:  process.env.INSTANTLY_KAMPANJE_RORLEGGER,
      tannlege:   process.env.INSTANTLY_KAMPANJE_TANNLEGE,
      frisor:     process.env.INSTANTLY_KAMPANJE_FRISOR,
      regnskap:   process.env.INSTANTLY_KAMPANJE_REGNSKAP,
      barber:     process.env.INSTANTLY_KAMPANJE_BARBER,
    },
  },

};
