export const ABOUT_PAGE_METADATA = {
  title: "Chi siamo: assistenza casa in Friuli",
  description:
    "Scopri l'approccio di QUBO: un unico punto di contatto per gestire piccoli lavori e riparazioni domestiche in Friuli Venezia Giulia.",
  path: "/about",
} as const;

export const ABOUT_PAGE_CONTENT = {
  breadcrumbLabel: "Percorso pagina",
  breadcrumbHomeLabel: "Home",
  breadcrumbCurrentLabel: "Chi siamo",
  eyebrow: "Chi siamo",
  title: "La cura della casa, resa più semplice.",
  description:
    "QUBO nasce per coordinare i piccoli lavori domestici con chiarezza, attenzione e un unico punto di contatto.",
  primaryCtaLabel: "Richiedi un preventivo",
  primaryCtaHref: "/#preventivo",
  secondaryCtaLabel: "Scopri i servizi",
  secondaryCtaHref: "/services",
  promiseLabel: "Il nostro impegno",
  promiseTitle: "Meno complicazioni. Più cose sistemate.",
} as const;

export const ABOUT_PROMISE_ITEMS = [
  "Ascolto prima dell'intervento",
  "Comunicazione semplice",
  "Attenzione per la tua casa",
] as const;

export const ABOUT_STORY_CONTENT = {
  eyebrow: "Il nostro perché",
  title: "Chiedere aiuto per casa non dovrebbe diventare un altro problema.",
  paragraphs: [
    "Una porta da regolare, una lampada da installare, una parete da rinfrescare: i piccoli lavori si accumulano facilmente e trovare il professionista giusto per ciascuno richiede tempo.",
    "Per questo lavoriamo come un unico riferimento. Partiamo da ciò che serve davvero, organizziamo le priorità e manteniamo ogni passaggio facile da capire.",
  ],
  asideEyebrow: "Il nostro ruolo",
  asideTitle: "Un solo contatto per i lavori di ogni giorno.",
  asideDescription:
    "Tu ci racconti cosa c'è da sistemare. Noi ti aiutiamo a definire il prossimo passo, senza tecnicismi inutili.",
} as const;

export type AboutValueIcon = "clarity" | "coordination" | "care" | "home";

export const ABOUT_VALUES_CONTENT = {
  eyebrow: "Come lavoriamo",
  title: "Principi semplici, applicati con costanza.",
  description:
    "Ogni richiesta è diversa. Il nostro metodo rimane chiaro, ordinato e rispettoso degli spazi.",
  listLabel: "I nostri principi",
} as const;

export const ABOUT_VALUES: ReadonlyArray<{
  description: string;
  icon: AboutValueIcon;
  title: string;
}> = [
  {
    icon: "clarity",
    title: "Chiarezza",
    description: "Spieghiamo cosa possiamo fare e quali sono i passaggi successivi.",
  },
  {
    icon: "coordination",
    title: "Coordinamento",
    description: "Riuniamo esigenze diverse in una richiesta più semplice da gestire.",
  },
  {
    icon: "care",
    title: "Attenzione",
    description: "Trattiamo ogni ambiente con ordine, rispetto e cura dei dettagli.",
  },
  {
    icon: "home",
    title: "Utilità concreta",
    description: "Ci concentriamo sui lavori che rendono la casa più comoda ogni giorno.",
  },
] as const;

export const ABOUT_LOCAL_CONTENT = {
  eyebrow: "Vicini a casa",
  title: "Operiamo in Friuli Venezia Giulia.",
  description:
    "Verifichiamo sempre zona, dettagli e disponibilità prima di confermare il prossimo passo.",
  note: "Una presenza locale, organizzata con un metodo semplice.",
} as const;
