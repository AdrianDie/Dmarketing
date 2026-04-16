/**
 * config.js — Styr hele outreach-maskinen herfra
 */

export const CONFIG = {

  // ─── Hvilke bransjer og byer som kjøres ───────────────────────────────────
  // Legg til eller fjern kombinasjoner her.
  // Scriptet kjører én kombinasjon per natt (roterer automatisk).
  targets: [
    // ── Elektriker ────────────────────────────────────────────────────────────
    { bransje: 'elektriker',  by: 'Oslo'        },
    { bransje: 'elektriker',  by: 'Bergen'       },
    { bransje: 'elektriker',  by: 'Stavanger'    },
    { bransje: 'elektriker',  by: 'Trondheim'    },
    { bransje: 'elektriker',  by: 'Drammen'      },
    { bransje: 'elektriker',  by: 'Fredrikstad'  },
    { bransje: 'elektriker',  by: 'Lillestrøm'   },
    { bransje: 'elektriker',  by: 'Asker'        },
    { bransje: 'elektriker',  by: 'Sandvika'     },
    { bransje: 'elektriker',  by: 'Moss'         },
    { bransje: 'elektriker',  by: 'Tønsberg'     },
    { bransje: 'elektriker',  by: 'Kristiansand' },
    { bransje: 'elektriker',  by: 'Tromsø'       },
    { bransje: 'elektriker',  by: 'Haugesund'    },
    { bransje: 'elektriker',  by: 'Ålesund'      },

    // ── Rørlegger ─────────────────────────────────────────────────────────────
    { bransje: 'rorlegger',   by: 'Oslo'         },
    { bransje: 'rorlegger',   by: 'Bergen'       },
    { bransje: 'rorlegger',   by: 'Stavanger'    },
    { bransje: 'rorlegger',   by: 'Trondheim'    },
    { bransje: 'rorlegger',   by: 'Drammen'      },
    { bransje: 'rorlegger',   by: 'Fredrikstad'  },
    { bransje: 'rorlegger',   by: 'Lillestrøm'   },
    { bransje: 'rorlegger',   by: 'Asker'        },
    { bransje: 'rorlegger',   by: 'Sandnes'      },
    { bransje: 'rorlegger',   by: 'Moss'         },
    { bransje: 'rorlegger',   by: 'Tønsberg'     },
    { bransje: 'rorlegger',   by: 'Kristiansand' },

    // ── Tannlege ──────────────────────────────────────────────────────────────
    { bransje: 'tannlege',    by: 'Oslo'         },
    { bransje: 'tannlege',    by: 'Bergen'       },
    { bransje: 'tannlege',    by: 'Stavanger'    },
    { bransje: 'tannlege',    by: 'Trondheim'    },
    { bransje: 'tannlege',    by: 'Drammen'      },
    { bransje: 'tannlege',    by: 'Fredrikstad'  },
    { bransje: 'tannlege',    by: 'Kristiansand' },
    { bransje: 'tannlege',    by: 'Tromsø'       },
    { bransje: 'tannlege',    by: 'Tønsberg'     },

    // ── Frisør ────────────────────────────────────────────────────────────────
    { bransje: 'frisor',      by: 'Oslo'         },
    { bransje: 'frisor',      by: 'Bergen'       },
    { bransje: 'frisor',      by: 'Stavanger'    },
    { bransje: 'frisor',      by: 'Trondheim'    },
    { bransje: 'frisor',      by: 'Drammen'      },
    { bransje: 'frisor',      by: 'Lillestrøm'   },
    { bransje: 'frisor',      by: 'Asker'        },
    { bransje: 'frisor',      by: 'Sandvika'     },
    { bransje: 'frisor',      by: 'Sandnes'      },
    { bransje: 'frisor',      by: 'Kristiansand' },
    { bransje: 'frisor',      by: 'Tromsø'       },
    { bransje: 'frisor',      by: 'Ålesund'      },

    // ── Regnskap ──────────────────────────────────────────────────────────────
    { bransje: 'regnskap',    by: 'Oslo'         },
    { bransje: 'regnskap',    by: 'Bergen'       },
    { bransje: 'regnskap',    by: 'Stavanger'    },
    { bransje: 'regnskap',    by: 'Trondheim'    },
    { bransje: 'regnskap',    by: 'Drammen'      },
    { bransje: 'regnskap',    by: 'Fredrikstad'  },
    { bransje: 'regnskap',    by: 'Kristiansand' },
    { bransje: 'regnskap',    by: 'Tromsø'       },
    { bransje: 'regnskap',    by: 'Tønsberg'     },

    // ── Barber ────────────────────────────────────────────────────────────────
    { bransje: 'barber',      by: 'Oslo'         },
    { bransje: 'barber',      by: 'Bergen'       },
    { bransje: 'barber',      by: 'Stavanger'    },
    { bransje: 'barber',      by: 'Trondheim'    },
    { bransje: 'barber',      by: 'Drammen'      },
    { bransje: 'barber',      by: 'Kristiansand' },
    { bransje: 'barber',      by: 'Tromsø'       },

    // ── Bilverksted ───────────────────────────────────────────────────────────
    { bransje: 'bilverksted', by: 'Oslo'         },
    { bransje: 'bilverksted', by: 'Bergen'       },
    { bransje: 'bilverksted', by: 'Stavanger'    },
    { bransje: 'bilverksted', by: 'Trondheim'    },
    { bransje: 'bilverksted', by: 'Drammen'      },
    { bransje: 'bilverksted', by: 'Fredrikstad'  },
    { bransje: 'bilverksted', by: 'Lillestrøm'   },
    { bransje: 'bilverksted', by: 'Asker'        },
    { bransje: 'bilverksted', by: 'Sandnes'      },
    { bransje: 'bilverksted', by: 'Moss'         },
    { bransje: 'bilverksted', by: 'Tønsberg'     },
    { bransje: 'bilverksted', by: 'Kristiansand' },
  ],

  // ─── Hvor mange leads som hentes per kjøring ──────────────────────────────
  leadsPerRun: 80,

  // ─── Filtrering — hvem er ideelle kunder? ─────────────────────────────────
  filter: {

    // Minimum score for å bli inkludert (0–100)
    // Scoren brukes til prioritering, ikke hard-filtrering.
    // Sett til 10 for å ekskludere kun de aller svakeste (ingen rating, ingen anmeldelser)
    minScore: 10,

    // Maks antall Google-anmeldelser
    // Over denne grensen = for stor / for etablert
    // Bedrifter med 80+ anmeldelser i Oslo har som regel god nettside eller egne markedsfolk
    maxAnmeldelser: 80,

    // Minimum antall anmeldelser (0 = ingen grense)
    minAnmeldelser: 0,

    // Krev minimum denne ratingen (sett til 0 for å ignorere)
    minRating: 3.0,

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
    // Tannlegekjeder
    'Blid',
    'Smil',
    'Oris',
    'Colosseum',
    'Tannlegeteam',
    'Dental',
    // Frisør/barber-kjeder
    'Hendrix',
    'Nikita',
    'Cutters',
    'PelsPels',
    // Regnskapskjeder
    'Fiken',
    'Synega',
    'Aspia',
    'Aider',
    'ECIT',
    'Azets',
    'BDO',
    'Deloitte',
    'PwC',
    'KPMG',
    'EY ',
    // Bilverksted-kjeder
    'Mekonomen',
    'Mester Verksted',
    'Castrol',
    'Dekk1',
    'Euromaster',
    'Bridgestone',
    'NAF',
    'Fjordkraft',
    'Mocon',
  ],

  // ─── Instantly API ────────────────────────────────────────────────────────
  instantly: {
    // Hent fra: app.instantly.ai → Settings → API
    apiKey: process.env.INSTANTLY_API_KEY,

    // Finn kampanje-ID i URL når du er inne på kampanjen i Instantly
    // Eksempel: app.instantly.ai/campaigns/abc123 → kampanjeId = 'abc123'
    // Én kampanje per bransje anbefales:
    kampanjer: {
      elektriker:   process.env.INSTANTLY_KAMPANJE_ELEKTRIKER,
      rorlegger:    process.env.INSTANTLY_KAMPANJE_RORLEGGER,
      tannlege:     process.env.INSTANTLY_KAMPANJE_TANNLEGE,
      frisor:       process.env.INSTANTLY_KAMPANJE_FRISOR,
      regnskap:     process.env.INSTANTLY_KAMPANJE_REGNSKAP,
      barber:       process.env.INSTANTLY_KAMPANJE_BARBER,
      bilverksted:  process.env.INSTANTLY_KAMPANJE_BILVERKSTED,
    },
  },

};
