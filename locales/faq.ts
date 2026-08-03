import type { Locale } from "@/types/locale";

export interface FaqPageContent {
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
  guideEyebrow: string;
  guideTitle: string;
  guideLabel: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_PAGE_METADATA: Record<
  Locale,
  { title: string; description: string; path: string }
> = {
  it: {
    title: "FAQ sui piccoli lavori di casa in Friuli",
    description:
      "Trova risposte chiare sui servizi, le richieste di intervento, i preventivi e le zone servite da QUBO in Friuli Venezia Giulia.",
    path: "/faq",
  },
  en: {
    title: "FAQ about small home jobs in Friuli",
    description:
      "Find clear answers about services, job requests, estimates, and service areas covered by QUBO in Friuli Venezia Giulia.",
    path: "/faq",
  },
  de: {
    title: "Häufige Fragen zu kleinen Hausarbeiten in Friaul",
    description:
      "Finden Sie klare Antworten zu Dienstleistungen, Arbeitsanfragen, Kostenvoranschlägen und Servicegebieten von QUBO in Friaul Julisch Venetien.",
    path: "/faq",
  },
};

export const FAQ_PAGE_CONTENT: Record<Locale, FaqPageContent> = {
  it: {
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
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "FAQ",
    eyebrow: "Frequently asked questions",
    title: "The answers you need, before you start.",
    description:
      "We've gathered the most common questions about small home jobs, requests, and how we work.",
    primaryCtaLabel: "Read the answers",
    primaryCtaHref: "#faq",
    secondaryCtaLabel: "Ask a question",
    secondaryCtaHref: "/contact",
    guideEyebrow: "On this page",
    guideTitle: "Everything clearer, from the start.",
    guideLabel: "FAQ topics",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbCurrentLabel: "FAQ",
    eyebrow: "Häufig gestellte Fragen",
    title: "Die Antworten, die Sie brauchen, bevor Sie beginnen.",
    description:
      "Wir haben die häufigsten Fragen zu kleinen Hausarbeiten, Anfragen und unserer Arbeitsweise zusammengestellt.",
    primaryCtaLabel: "Antworten lesen",
    primaryCtaHref: "#faq",
    secondaryCtaLabel: "Eine Frage stellen",
    secondaryCtaHref: "/contact",
    guideEyebrow: "Auf dieser Seite",
    guideTitle: "Alles klarer, von Anfang an.",
    guideLabel: "FAQ-Themen",
  },
};

export const FAQ_PAGE_TOPICS: Record<Locale, readonly string[]> = {
  it: ["Servizi e piccoli lavori", "Richieste e preventivi", "Zone servite e materiali"],
  en: ["Services and small jobs", "Requests and estimates", "Service areas and materials"],
  de: [
    "Dienstleistungen und kleine Arbeiten",
    "Anfragen und Kostenvoranschläge",
    "Servicegebiete und Materialien",
  ],
};

export const FAQ_CONTENT: Record<Locale, FaqContent> = {
  it: {
    eyebrow: "Domande frequenti",
    title: "Tutto quello che serve sapere, prima di iniziare.",
    description: "Risposte semplici alle domande più comuni sui nostri interventi per la casa.",
  },
  en: {
    eyebrow: "Frequently asked questions",
    title: "Everything you need to know, before you start.",
    description: "Simple answers to the most common questions about our home services.",
  },
  de: {
    eyebrow: "Häufig gestellte Fragen",
    title: "Alles, was Sie wissen müssen, bevor Sie beginnen.",
    description: "Einfache Antworten auf die häufigsten Fragen zu unseren Hausdienstleistungen.",
  },
};

export const FAQ_ITEMS: Record<Locale, readonly FaqItem[]> = {
  it: [
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
        "Operiamo in Friuli Venezia Giulia. La disponibilità viene verificata in base alla località e al tipo di intervento richiesto.",
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
  ],
  en: [
    {
      id: "services",
      question: "What small jobs can you handle?",
      answer:
        "We handle small household repairs and maintenance, from electrical and plumbing work to furniture assembly, doors, and other practical home jobs.",
    },
    {
      id: "request",
      question: "How do I request a job?",
      answer:
        "Describe what needs fixing and, if possible, add some photos. This information helps us understand the work and organise the next step.",
    },
    {
      id: "multiple-jobs",
      question: "Can I request multiple jobs in the same visit?",
      answer:
        "Yes. You can list all the small jobs you need in the same request. We'll evaluate together how to handle them in the simplest way.",
    },
    {
      id: "service-area",
      question: "Which areas do you serve?",
      answer:
        "We operate in Friuli Venezia Giulia. Availability is checked based on the location and the type of job requested.",
    },
    {
      id: "estimate",
      question: "How is the estimate defined?",
      answer:
        "The estimate depends on the work, required materials, and job conditions. Before proceeding, we gather useful information to offer you a clear evaluation.",
    },
    {
      id: "materials",
      question: "Do I need to purchase materials in advance?",
      answer:
        "Not necessarily. Indicate in your request what you already have available. For the rest, we'll evaluate together what materials are needed before the job.",
    },
  ],
  de: [
    {
      id: "services",
      question: "Welche kleinen Arbeiten können Sie erledigen?",
      answer:
        "Wir kümmern uns um kleine Haushaltsreparaturen und Wartungsarbeiten, von Elektro- und Sanitärarbeiten über Möbelmontage bis hin zu Türen und anderen praktischen Hausarbeiten.",
    },
    {
      id: "request",
      question: "Wie kann ich einen Einsatz anfordern?",
      answer:
        "Beschreiben Sie, was erledigt werden muss, und fügen Sie wenn möglich einige Fotos hinzu. Diese Informationen helfen uns, die Arbeit zu verstehen und den nächsten Schritt zu organisieren.",
    },
    {
      id: "multiple-jobs",
      question: "Kann ich mehrere Arbeiten im selben Einsatz anfordern?",
      answer:
        "Ja. Sie können alle kleinen Arbeiten, die Sie benötigen, in derselben Anfrage auflisten. Wir bewerten gemeinsam, wie wir sie am einfachsten erledigen können.",
    },
    {
      id: "service-area",
      question: "In welchen Gebieten sind Sie tätig?",
      answer:
        "Wir sind in Friaul Julisch Venetien tätig. Die Verfügbarkeit wird je nach Standort und Art der angeforderten Arbeit geprüft.",
    },
    {
      id: "estimate",
      question: "Wie wird der Kostenvoranschlag erstellt?",
      answer:
        "Der Kostenvoranschlag hängt von der Arbeit, den benötigten Materialien und den Bedingungen des Einsatzes ab. Vor der Durchführung sammeln wir nützliche Informationen, um Ihnen eine klare Bewertung zu bieten.",
    },
    {
      id: "materials",
      question: "Muss ich Materialien im Voraus kaufen?",
      answer:
        "Nicht unbedingt. Geben Sie in Ihrer Anfrage an, was Sie bereits zur Verfügung haben. Für den Rest besprechen wir gemeinsam, welche Materialien vor der Arbeit benötigt werden.",
    },
  ],
};
