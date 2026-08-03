import type { Locale } from "@/types/locale";

export interface ProcessContent {
  eyebrow: string;
  title: string;
  description: string;
  listLabel: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_CONTENT: Record<Locale, ProcessContent> = {
  it: {
    eyebrow: "Come funziona",
    title: "Dalla richiesta alla soluzione, con semplicità.",
    description: "Un percorso chiaro, un unico punto di contatto e nessun passaggio complicato.",
    listLabel: "Le quattro fasi del servizio",
  },
  en: {
    eyebrow: "How it works",
    title: "From request to solution, simply.",
    description: "A clear path, one point of contact, and no complicated steps.",
    listLabel: "The four service phases",
  },
  de: {
    eyebrow: "So funktioniert's",
    title: "Von der Anfrage zur Lösung, einfach.",
    description: "Ein klarer Weg, ein Ansprechpartner und keine komplizierten Schritte.",
    listLabel: "Die vier Servicephasen",
  },
};

export const PROCESS_STEPS: Record<Locale, readonly ProcessStep[]> = {
  it: [
    {
      number: "01",
      title: "Raccontaci cosa serve",
      description: "Descrivi il problema e gli interventi che vorresti completare nella tua casa.",
    },
    {
      number: "02",
      title: "Confermiamo i dettagli",
      description:
        "Chiariremo insieme il lavoro, le priorità e il momento più adatto per la visita.",
    },
    {
      number: "03",
      title: "Arriviamo preparati",
      description:
        "Il nostro team arriva con le informazioni necessarie per gestire gli interventi concordati.",
    },
    {
      number: "04",
      title: "Sistemiamo tutto",
      description: "Completiamo i piccoli lavori con cura, lasciando gli spazi puliti e in ordine.",
    },
  ],
  en: [
    {
      number: "01",
      title: "Tell us what you need",
      description: "Describe the problem and the jobs you'd like completed in your home.",
    },
    {
      number: "02",
      title: "We confirm the details",
      description: "We'll clarify the work, priorities, and the best time for a visit together.",
    },
    {
      number: "03",
      title: "We arrive prepared",
      description: "Our team arrives with the information needed to handle the agreed jobs.",
    },
    {
      number: "04",
      title: "We get it done",
      description: "We complete the small jobs with care, leaving spaces clean and tidy.",
    },
  ],
  de: [
    {
      number: "01",
      title: "Erzählen Sie uns, was gebraucht wird",
      description:
        "Beschreiben Sie das Problem und die Arbeiten, die Sie in Ihrem Zuhause erledigen möchten.",
    },
    {
      number: "02",
      title: "Wir bestätigen die Details",
      description:
        "Wir klären gemeinsam die Arbeit, die Prioritäten und den besten Zeitpunkt für den Besuch.",
    },
    {
      number: "03",
      title: "Wir kommen vorbereitet",
      description:
        "Unser Team kommt mit den nötigen Informationen, um die vereinbarten Arbeiten zu erledigen.",
    },
    {
      number: "04",
      title: "Wir erledigen alles",
      description:
        "Wir führen die kleinen Arbeiten sorgfältig aus und hinterlassen saubere und ordentliche Räume.",
    },
  ],
};
