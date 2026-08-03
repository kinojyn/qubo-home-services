import type { Locale } from "@/types/locale";

export interface StatisticsContent {
  eyebrow: string;
  title: string;
  description: string;
  listLabel: string;
}

export interface Statistic {
  value: number;
  suffix: string;
  label: string;
  description: string;
  accessibleValue: string;
}

export const STATISTICS_CONTENT: Record<Locale, StatisticsContent> = {
  it: {
    eyebrow: "Il servizio in numeri",
    title: "Pochi passaggi. Molte cose risolte.",
    description:
      "Un modello semplice, costruito per riunire i piccoli lavori di casa in un percorso facile da gestire.",
    listLabel: "I numeri del servizio QUBO",
  },
  en: {
    eyebrow: "The service in numbers",
    title: "Few steps. Many things solved.",
    description:
      "A simple model, built to bring small home jobs together in an easy-to-manage path.",
    listLabel: "QUBO by the numbers",
  },
  de: {
    eyebrow: "Der Service in Zahlen",
    title: "Wenige Schritte. Vieles erledigt.",
    description:
      "Ein einfaches Modell, das kleine Hausarbeiten in einem leicht zu bewältigenden Weg bündelt.",
    listLabel: "QUBO in Zahlen",
  },
};

export const STATISTICS: Record<Locale, readonly Statistic[]> = {
  it: [
    {
      value: 10,
      suffix: "",
      label: "Categorie di servizio",
      description: "Dieci tipi di piccoli interventi domestici coordinati dallo stesso team.",
      accessibleValue: "10 categorie di servizio",
    },
    {
      value: 4,
      suffix: "",
      label: "Passaggi chiari",
      description: "Dalla prima richiesta al lavoro completato, senza un percorso complicato.",
      accessibleValue: "4 passaggi chiari",
    },
    {
      value: 1,
      suffix: "",
      label: "Unico referente",
      description: "Un solo punto di contatto per organizzare tutti i piccoli lavori concordati.",
      accessibleValue: "1 unico referente",
    },
    {
      value: 1,
      suffix: "",
      label: "Visita coordinata",
      description: "Più attività riunite nello stesso appuntamento, quando il lavoro lo consente.",
      accessibleValue: "1 visita coordinata",
    },
  ],
  en: [
    {
      value: 10,
      suffix: "",
      label: "Service categories",
      description: "Ten types of small household jobs coordinated by the same team.",
      accessibleValue: "10 service categories",
    },
    {
      value: 4,
      suffix: "",
      label: "Clear steps",
      description: "From first request to completed job, without a complicated process.",
      accessibleValue: "4 clear steps",
    },
    {
      value: 1,
      suffix: "",
      label: "Single contact",
      description: "One point of contact to organise all the agreed small jobs.",
      accessibleValue: "1 single contact",
    },
    {
      value: 1,
      suffix: "",
      label: "Coordinated visit",
      description: "Multiple tasks combined in one appointment, when the work allows.",
      accessibleValue: "1 coordinated visit",
    },
  ],
  de: [
    {
      value: 10,
      suffix: "",
      label: "Servicekategorien",
      description: "Zehn Arten von kleinen Hausarbeiten, koordiniert vom selben Team.",
      accessibleValue: "10 Servicekategorien",
    },
    {
      value: 4,
      suffix: "",
      label: "Klare Schritte",
      description: "Von der ersten Anfrage bis zur erledigten Arbeit, ohne komplizierten Prozess.",
      accessibleValue: "4 klare Schritte",
    },
    {
      value: 1,
      suffix: "",
      label: "Ein Ansprechpartner",
      description: "Ein Ansprechpartner für die Organisation aller vereinbarten kleinen Arbeiten.",
      accessibleValue: "1 Ansprechpartner",
    },
    {
      value: 1,
      suffix: "",
      label: "Koordinierter Besuch",
      description: "Mehrere Aufgaben in einem Termin gebündelt, wenn die Arbeit es erlaubt.",
      accessibleValue: "1 koordinierter Besuch",
    },
  ],
};
