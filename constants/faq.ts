export const FAQ_PAGE_METADATA = {
  title: "FAQ sui piccoli lavori di casa in Friuli",
  description:
    "Trova risposte chiare sui servizi, le richieste di intervento, i preventivi e le zone servite da QUBO in Friuli Venezia Giulia.",
  path: "/faq",
} as const;

export const FAQ_PAGE_CONTENT = {
  breadcrumbLabel: "Percorso pagina",
  breadcrumbHomeLabel: "Home",
  breadcrumbCurrentLabel: "FAQ",
  eyebrow: "Domande frequenti",
  title: "Le risposte che cerchi, prima di iniziare.",
  description:
    "Abbiamo raccolto le domande più comuni sui piccoli lavori di casa, sulle richieste e sul nostro modo di lavorare.",
  primaryCtaLabel: "Leggi le risposte",
  primaryCtaHref: "#faq",
  secondaryCtaLabel: "Fai una domanda",
  secondaryCtaHref: "/contact",
  guideEyebrow: "In questa pagina",
  guideTitle: "Tutto più chiaro, fin dall'inizio.",
  guideLabel: "Argomenti delle domande frequenti",
} as const;

export const FAQ_PAGE_TOPICS = [
  "Servizi e piccoli lavori",
  "Richieste e preventivi",
  "Zone servite e materiali",
] as const;

export const FAQ_CONTENT = {
  eyebrow: "Domande frequenti",
  title: "Tutto quello che serve sapere, prima di iniziare.",
  description: "Risposte semplici alle domande più comuni sui nostri interventi per la casa.",
} as const;

export const FAQ_ITEMS = [
  {
    id: "services",
    question: "Quali piccoli lavori potete gestire?",
    answer:
      "Ci occupiamo di piccole riparazioni e manutenzioni domestiche, dagli interventi elettrici e idraulici al montaggio di mobili, alle porte e ad altri lavori pratici in casa.",
  },
  {
    id: "request",
    question: "Come posso richiedere un intervento?",
    answer:
      "Descrivi ciò che deve essere sistemato e, se possibile, aggiungi alcune foto. Queste informazioni ci aiutano a capire il lavoro e a organizzare il passo successivo.",
  },
  {
    id: "multiple-jobs",
    question: "Posso richiedere più lavori nello stesso intervento?",
    answer:
      "Sì. Puoi indicare tutti i piccoli lavori di cui hai bisogno nella stessa richiesta. Valuteremo insieme come gestirli nel modo più semplice.",
  },
  {
    id: "service-area",
    question: "In quali zone operate?",
    answer:
      "Il nostro principale punto di riferimento è Cervignano del Friuli. Operiamo anche in altre località del Friuli Venezia Giulia quando zona, disponibilità e tipo di intervento lo consentono.",
  },
  {
    id: "estimate",
    question: "Come viene definito il preventivo?",
    answer:
      "Il preventivo dipende dal lavoro, dai materiali necessari e dalle condizioni dell'intervento. Prima di procedere, raccogliamo le informazioni utili per offrirti una valutazione chiara.",
  },
  {
    id: "materials",
    question: "Devo acquistare i materiali in anticipo?",
    answer:
      "Non necessariamente. Indica nella richiesta ciò che hai già a disposizione. Per il resto, valuteremo insieme quali materiali servono prima dell'intervento.",
  },
] as const;
