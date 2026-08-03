import type { Locale } from "@/types/locale";

export interface CookieContent {
  acceptAllLabel: string;
  bannerDescription: string;
  bannerTitle: string;
  cancelLabel: string;
  closeLabel: string;
  categories: {
    analytics: { description: string; title: string };
    marketing: { description: string; title: string };
    necessary: { description: string; title: string };
    preferences: { description: string; title: string };
    statistics: { description: string; title: string };
  };
  customizeLabel: string;
  modalTitle: string;
  rejectAllLabel: string;
  saveLabel: string;
}

export const COOKIE_CONTENT: Record<Locale, CookieContent> = {
  it: {
    bannerTitle: "Questo sito utilizza cookie",
    bannerDescription:
      "Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo consenso, cookie analytics e di marketing per migliorare la tua esperienza. Puoi gestire le tue preferenze in qualsiasi momento.",
    acceptAllLabel: "Accetta tutti",
    rejectAllLabel: "Rifiuta non necessari",
    customizeLabel: "Personalizza",
    modalTitle: "Preferenze cookie",
    saveLabel: "Salva preferenze",
    cancelLabel: "Annulla",
    closeLabel: "Chiudi preferenze cookie",
    categories: {
      necessary: {
        title: "Cookie tecnici (necessari)",
        description:
          "Essenziali per il corretto funzionamento del sito. Non possono essere disattivati.",
      },
      analytics: {
        title: "Cookie analytics",
        description:
          "Ci aiutano a capire come gli utenti interagiscono con il sito, raccogliendo dati anonimi.",
      },
      marketing: {
        title: "Cookie di marketing",
        description:
          "Utilizzati per mostrare annunci pertinenti e misurare l'efficacia delle campagne.",
      },
      preferences: {
        title: "Cookie di preferenza",
        description: "Memorizzano le tue scelte (lingua, regione) per personalizzare l'esperienza.",
      },
      statistics: {
        title: "Cookie statistici",
        description:
          "Raccolgono informazioni su come i visitatori utilizzano il sito in forma aggregata.",
      },
    },
  },
  en: {
    bannerTitle: "This website uses cookies",
    bannerDescription:
      "We use technical cookies necessary for the site to function and, with your consent, analytics and marketing cookies to improve your experience. You can manage your preferences at any time.",
    acceptAllLabel: "Accept All",
    rejectAllLabel: "Reject Non-Essential",
    customizeLabel: "Customize",
    modalTitle: "Cookie Preferences",
    saveLabel: "Save Preferences",
    cancelLabel: "Cancel",
    closeLabel: "Close cookie preferences",
    categories: {
      necessary: {
        title: "Technical Cookies (Necessary)",
        description: "Essential for the proper functioning of the site. Cannot be disabled.",
      },
      analytics: {
        title: "Analytics Cookies",
        description:
          "Help us understand how users interact with the site by collecting anonymous data.",
      },
      marketing: {
        title: "Marketing Cookies",
        description: "Used to show relevant advertisements and measure campaign effectiveness.",
      },
      preferences: {
        title: "Preference Cookies",
        description: "Remember your choices (language, region) to personalize your experience.",
      },
      statistics: {
        title: "Statistics Cookies",
        description: "Collect information about how visitors use the site in aggregate form.",
      },
    },
  },
  de: {
    bannerTitle: "Diese Website verwendet Cookies",
    bannerDescription:
      "Wir verwenden technische Cookies, die für den Betrieb der Website erforderlich sind, und mit Ihrer Zustimmung Analyse- und Marketing-Cookies, um Ihr Erlebnis zu verbessern. Sie können Ihre Einstellungen jederzeit verwalten.",
    acceptAllLabel: "Alle akzeptieren",
    rejectAllLabel: "Nicht notwendige ablehnen",
    customizeLabel: "Anpassen",
    modalTitle: "Cookie-Einstellungen",
    saveLabel: "Einstellungen speichern",
    cancelLabel: "Abbrechen",
    closeLabel: "Cookie-Einstellungen schließen",
    categories: {
      necessary: {
        title: "Technische Cookies (Notwendig)",
        description:
          "Für das ordnungsgemäße Funktionieren der Website erforderlich. Können nicht deaktiviert werden.",
      },
      analytics: {
        title: "Analyse-Cookies",
        description:
          "Helfen uns zu verstehen, wie Benutzer mit der Website interagieren, indem sie anonyme Daten sammeln.",
      },
      marketing: {
        title: "Marketing-Cookies",
        description:
          "Werden verwendet, um relevante Werbung anzuzeigen und die Wirksamkeit von Kampagnen zu messen.",
      },
      preferences: {
        title: "Präferenz-Cookies",
        description:
          "Merken sich Ihre Einstellungen (Sprache, Region), um Ihr Erlebnis zu personalisieren.",
      },
      statistics: {
        title: "Statistik-Cookies",
        description: "Sammeln aggregierte Informationen darüber, wie Besucher die Website nutzen.",
      },
    },
  },
};
