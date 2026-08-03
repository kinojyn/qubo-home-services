import type { Locale } from "@/types/locale";

export interface AboutPageContent {
  breadcrumbLabel: string;
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  promiseLabel: string;
  promiseTitle: string;
}

export interface AboutStoryContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  asideEyebrow: string;
  asideTitle: string;
  asideDescription: string;
}

export interface AboutValuesContent {
  eyebrow: string;
  title: string;
  description: string;
  listLabel: string;
}

export interface AboutValue {
  description: string;
  icon: "clarity" | "coordination" | "care" | "home";
  title: string;
}

export interface AboutLocalContent {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
}

export const ABOUT_PAGE_METADATA: Record<
  Locale,
  { title: string; description: string; path: string }
> = {
  it: {
    title: "Chi siamo: assistenza casa in Friuli",
    description:
      "Scopri l'approccio di QUBO: un unico punto di contatto per gestire piccoli lavori e riparazioni domestiche in Friuli Venezia Giulia.",
    path: "/about",
  },
  en: {
    title: "About us: home assistance in Friuli",
    description:
      "Discover QUBO' approach: a single point of contact to manage small jobs and household repairs in Friuli Venezia Giulia.",
    path: "/about",
  },
  de: {
    title: "Über uns: Haushaltshilfe in Friaul",
    description:
      "Entdecken Sie den Ansatz von QUBO: ein einziger Ansprechpartner für kleine Arbeiten und Reparaturen in Friaul Julisch Venetien.",
    path: "/about",
  },
};

export const ABOUT_PAGE_CONTENT: Record<Locale, AboutPageContent> = {
  it: {
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
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "About us",
    eyebrow: "About us",
    title: "Home care, made simpler.",
    description:
      "QUBO was created to coordinate small household jobs with clarity, attention, and a single point of contact.",
    primaryCtaLabel: "Request an estimate",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Discover services",
    secondaryCtaHref: "/services",
    promiseLabel: "Our commitment",
    promiseTitle: "Less hassle. More things done.",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbCurrentLabel: "Über uns",
    eyebrow: "Über uns",
    title: "Hauspflege, einfacher gemacht.",
    description:
      "QUBO wurde gegründet, um kleine Hausarbeiten mit Klarheit, Sorgfalt und einem einzigen Ansprechpartner zu koordinieren.",
    primaryCtaLabel: "Kostenvoranschlag anfordern",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Dienstleistungen entdecken",
    secondaryCtaHref: "/services",
    promiseLabel: "Unser Engagement",
    promiseTitle: "Weniger Komplikationen. Mehr erledigt.",
  },
};

export const ABOUT_PROMISE_ITEMS: Record<Locale, readonly string[]> = {
  it: ["Ascolto prima dell'intervento", "Comunicazione semplice", "Attenzione per la tua casa"],
  en: ["Listening before the job", "Simple communication", "Care for your home"],
  de: ["Zuhören vor dem Einsatz", "Einfache Kommunikation", "Sorgfalt für Ihr Zuhause"],
};

export const ABOUT_STORY_CONTENT: Record<Locale, AboutStoryContent> = {
  it: {
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
  },
  en: {
    eyebrow: "Our why",
    title: "Asking for help at home shouldn't become another problem.",
    paragraphs: [
      "A door to adjust, a lamp to install, a wall to refresh: small jobs pile up easily and finding the right professional for each one takes time.",
      "That's why we work as a single reference. We start from what really needs to be done, organise priorities, and keep every step easy to understand.",
    ],
    asideEyebrow: "Our role",
    asideTitle: "One contact for everyday jobs.",
    asideDescription:
      "You tell us what needs fixing. We help you define the next step, without unnecessary technicalities.",
  },
  de: {
    eyebrow: "Unser Warum",
    title: "Hilfe im Haushalt zu suchen, sollte nicht selbst zum Problem werden.",
    paragraphs: [
      "Eine Tür einstellen, eine Lampe installieren, eine Wand auffrischen: kleine Arbeiten häufen sich schnell an, und für jede den richtigen Fachmann zu finden, kostet Zeit.",
      "Deshalb arbeiten wir als einzige Anlaufstelle. Wir gehen von dem aus, was wirklich gebraucht wird, ordnen Prioritäten und halten jeden Schritt leicht verständlich.",
    ],
    asideEyebrow: "Unsere Rolle",
    asideTitle: "Ein Ansprechpartner für die täglichen Arbeiten.",
    asideDescription:
      "Sie erzählen uns, was erledigt werden muss. Wir helfen Ihnen, den nächsten Schritt zu definieren, ohne unnötige Fachbegriffe.",
  },
};

export const ABOUT_VALUES_CONTENT: Record<Locale, AboutValuesContent> = {
  it: {
    eyebrow: "Come lavoriamo",
    title: "Principi semplici, applicati con costanza.",
    description:
      "Ogni richiesta è diversa. Il nostro metodo rimane chiaro, ordinato e rispettoso degli spazi.",
    listLabel: "I nostri principi",
  },
  en: {
    eyebrow: "How we work",
    title: "Simple principles, consistently applied.",
    description:
      "Every request is different. Our method stays clear, organised, and respectful of spaces.",
    listLabel: "Our principles",
  },
  de: {
    eyebrow: "Wie wir arbeiten",
    title: "Einfache Prinzipien, konsequent angewendet.",
    description:
      "Jede Anfrage ist anders. Unsere Methode bleibt klar, geordnet und respektvoll gegenüber Räumen.",
    listLabel: "Unsere Prinzipien",
  },
};

export const ABOUT_VALUES: Record<Locale, readonly AboutValue[]> = {
  it: [
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
  ],
  en: [
    {
      icon: "clarity",
      title: "Clarity",
      description: "We explain what we can do and what the next steps are.",
    },
    {
      icon: "coordination",
      title: "Coordination",
      description: "We bring different needs together into one simpler request.",
    },
    {
      icon: "care",
      title: "Attention",
      description: "We treat every space with order, respect, and attention to detail.",
    },
    {
      icon: "home",
      title: "Practical utility",
      description: "We focus on jobs that make your home more comfortable every day.",
    },
  ],
  de: [
    {
      icon: "clarity",
      title: "Klarheit",
      description: "Wir erklären, was wir tun können und wie die nächsten Schritte aussehen.",
    },
    {
      icon: "coordination",
      title: "Koordination",
      description: "Wir bündeln verschiedene Bedürfnisse in einer einfacheren Anfrage.",
    },
    {
      icon: "care",
      title: "Sorgfalt",
      description: "Wir behandeln jeden Raum mit Ordnung, Respekt und Liebe zum Detail.",
    },
    {
      icon: "home",
      title: "Praktischer Nutzen",
      description:
        "Wir konzentrieren uns auf Arbeiten, die Ihr Zuhause jeden Tag angenehmer machen.",
    },
  ],
};

export const ABOUT_LOCAL_CONTENT: Record<Locale, AboutLocalContent> = {
  it: {
    eyebrow: "Vicini a casa",
    title: "Operiamo in Friuli Venezia Giulia.",
    description:
      "Verifichiamo sempre zona, dettagli e disponibilità prima di confermare il prossimo passo.",
    note: "Una presenza locale, organizzata con un metodo semplice.",
  },
  en: {
    eyebrow: "Close to home",
    title: "We operate in Friuli Venezia Giulia.",
    description:
      "We always verify area, details, and availability before confirming the next step.",
    note: "A local presence, organised with a simple method.",
  },
  de: {
    eyebrow: "In Ihrer Nähe",
    title: "Wir sind in Friaul Julisch Venetien tätig.",
    description:
      "Wir überprüfen immer Gebiet, Details und Verfügbarkeit, bevor wir den nächsten Schritt bestätigen.",
    note: "Eine lokale Präsenz, organisiert mit einer einfachen Methode.",
  },
};
