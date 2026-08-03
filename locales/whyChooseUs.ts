import type { Locale } from "@/types/locale";

export interface WhyChooseUsContent {
  eyebrow: string;
  title: string;
  description: string;
  listLabel: string;
}

export interface WhyChooseUsFeature {
  icon: "contact" | "visit" | "communication" | "care";
  title: string;
  description: string;
}

export const WHY_CHOOSE_US_CONTENT: Record<Locale, WhyChooseUsContent> = {
  it: {
    eyebrow: "Perché scegliere noi",
    title: "Un servizio pensato per semplificarti la giornata.",
    description:
      "Gestiamo i piccoli lavori di casa con un approccio chiaro, organizzato e facile da seguire.",
    listLabel: "I vantaggi di QUBO",
  },
  en: {
    eyebrow: "Why choose us",
    title: "A service designed to simplify your day.",
    description: "We handle small home jobs with a clear, organised, and easy-to-follow approach.",
    listLabel: "QUBO benefits",
  },
  de: {
    eyebrow: "Warum uns wählen",
    title: "Ein Service, der Ihren Tag vereinfacht.",
    description:
      "Wir erledigen kleine Hausarbeiten mit einem klaren, organisierten und leicht verständlichen Ansatz.",
    listLabel: "Vorteile von QUBO",
  },
};

export const WHY_CHOOSE_US_FEATURES: Record<Locale, readonly WhyChooseUsFeature[]> = {
  it: [
    {
      icon: "contact",
      title: "Un unico referente",
      description:
        "Un solo contatto per coordinare i diversi piccoli interventi di cui hai bisogno.",
    },
    {
      icon: "visit",
      title: "Più lavori, una visita",
      description:
        "Riuniamo più attività nello stesso appuntamento, così perdi meno tempo nell'organizzazione.",
    },
    {
      icon: "communication",
      title: "Comunicazione chiara",
      description:
        "Confermiamo priorità e dettagli prima della visita, senza passaggi inutilmente complicati.",
    },
    {
      icon: "care",
      title: "Cura e ordine",
      description:
        "Lavoriamo con attenzione negli spazi di casa e li lasciamo puliti al termine dell'intervento.",
    },
  ],
  en: [
    {
      icon: "contact",
      title: "Single point of contact",
      description: "One contact to coordinate the different small jobs you need.",
    },
    {
      icon: "visit",
      title: "Multiple jobs, one visit",
      description:
        "We combine multiple tasks in the same appointment, saving you time in organising.",
    },
    {
      icon: "communication",
      title: "Clear communication",
      description:
        "We confirm priorities and details before the visit, without unnecessarily complicated steps.",
    },
    {
      icon: "care",
      title: "Care and tidiness",
      description: "We work carefully in your home spaces and leave them clean when we're done.",
    },
  ],
  de: [
    {
      icon: "contact",
      title: "Ein Ansprechpartner",
      description:
        "Ein Kontakt zur Koordinierung der verschiedenen kleinen Arbeiten, die Sie benötigen.",
    },
    {
      icon: "visit",
      title: "Mehrere Arbeiten, ein Besuch",
      description:
        "Wir bündeln mehrere Aufgaben in einem Termin, damit Sie weniger Zeit mit der Organisation verlieren.",
    },
    {
      icon: "communication",
      title: "Klare Kommunikation",
      description:
        "Wir bestätigen Prioritäten und Details vor dem Besuch, ohne unnötig komplizierte Schritte.",
    },
    {
      icon: "care",
      title: "Sorgfalt und Ordnung",
      description: "Wir arbeiten sorgfältig in Ihren Wohnräumen und hinterlassen sie sauber.",
    },
  ],
};
