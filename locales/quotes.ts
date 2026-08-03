import type { Locale } from "@/types/locale";
import type { QuotesData } from "@/types/quotes";

type ServiceTranslation = {
  name: string;
  description: string;
  questions?: Record<string, string>;
  pricingLabels?: Record<string, string>;
};

type QuoteTranslations = {
  categories: Record<string, string>;
  services: Record<string, ServiceTranslation>;
};

const QUOTE_TRANSLATIONS: Record<Locale, QuoteTranslations> = {
  it: { categories: {}, services: {} },
  en: {
    categories: {
      idraulica: "Plumbing repairs",
      "montaggio-mobili": "Furniture assembly",
      "installazioni-domestiche": "Home installations",
      "porte-serrature": "Doors and locks",
      elettricita: "Electrical work",
      tuttofare: "Small handyman jobs",
    },
    services: {
      "riparazione-rubinetto": {
        name: "Tap repair or replacement",
        description: "Kitchen sink, basin, shower, bath or outdoor tap",
      },
      "riparazione-scarico": {
        name: "Drain repair and unblocking",
        description: "Kitchen sink, basin, shower, bath or toilet",
      },
      "riparazione-perdita": {
        name: "Water leak repair",
        description: "Pipes, fittings and small household leaks",
      },
      "montaggio-mobile-semplice": {
        name: "Small furniture assembly",
        description: "Tables, chairs, bedside tables, desks and small furnishings",
      },
      "montaggio-armadio": {
        name: "Wardrobe or chest-of-drawers assembly",
        description: "Assembly and adjustment of wardrobes, drawers and large furniture",
      },
      "installazione-tv": {
        name: "Wall-mounted TV installation",
        description: "Bracket fitting and TV installation (bracket supplied by the customer)",
      },
      "installazione-tende": {
        name: "Curtain and pole installation",
        description: "Curtain poles, rails and accessories",
      },
      "fissaggio-mensole": {
        name: "Shelves and accessories fixing",
        description: "Shelves, mirrors and small household items",
      },
      "regolazione-porta": {
        name: "Door and hinge adjustment",
        description: "Adjustment, alignment and small repairs",
      },
      "sostituzione-maniglia": {
        name: "Handle replacement",
        description: "Handles and accessories for internal doors",
      },
      "sostituzione-serratura": {
        name: "Lock replacement",
        description: "Standard household locks",
      },
      "riparazione-interruttore": {
        name: "Switch or socket repair",
        description: "Replacement of switches, sockets, faceplates and USB sockets",
      },
      "installazione-luce": {
        name: "Lamp, ceiling light or wall light installation",
        description: "Installation of household light points up to 3 m",
      },
      "pittura-pareti": {
        name: "Wall painting",
        description: "Reference price: €20 for each m² of wall",
        questions: { superficieMq: "Area to paint (m²)" },
        pricingLabels: {
          "Tinteggiatura per m² aggiuntivo": "Painting per additional m²",
          "Sconto 6% per superfici oltre 100 m²": "6% discount for areas over 100 m²",
        },
      },
      "ritocchi-pittura": {
        name: "Paint touch-ups",
        description: "Small touch-ups and local repairs",
      },
      "piccoli-lavori": {
        name: "Small handyman jobs",
        description: "A list of small jobs during the same visit",
      },
    },
  },
  de: {
    categories: {
      idraulica: "Sanitärreparaturen",
      "montaggio-mobili": "Möbelmontage",
      "installazioni-domestiche": "Hausinstallationen",
      "porte-serrature": "Türen und Schlösser",
      elettricita: "Elektroarbeiten",
      tuttofare: "Kleine Handwerksarbeiten",
    },
    services: {
      "riparazione-rubinetto": {
        name: "Wasserhahn reparieren oder ersetzen",
        description: "Küchenspüle, Waschbecken, Dusche, Badewanne oder Außenhahn",
      },
      "riparazione-scarico": {
        name: "Abfluss reparieren und reinigen",
        description: "Küchenspüle, Waschbecken, Dusche, Badewanne oder WC",
      },
      "riparazione-perdita": {
        name: "Wasserleck reparieren",
        description: "Rohre, Anschlüsse und kleine Lecks im Haushalt",
      },
      "montaggio-mobile-semplice": {
        name: "Kleine Möbelmontage",
        description: "Tische, Stühle, Nachttische, Schreibtische und kleine Möbel",
      },
      "montaggio-armadio": {
        name: "Montage von Schrank oder Kommode",
        description: "Montage und Justierung von Schränken, Kommoden und großen Möbeln",
      },
      "installazione-tv": {
        name: "TV-Wandmontage",
        description: "Montage der Halterung und des Fernsehers (Halterung vom Kunden)",
      },
      "installazione-tende": {
        name: "Montage von Vorhängen und Stangen",
        description: "Vorhangstangen, Schienen und Zubehör",
      },
      "fissaggio-mensole": {
        name: "Befestigung von Regalen und Zubehör",
        description: "Regale, Spiegel und kleine Haushaltselemente",
      },
      "regolazione-porta": {
        name: "Tür- und Scharnierjustierung",
        description: "Justierung, Ausrichtung und kleine Reparaturen",
      },
      "sostituzione-maniglia": {
        name: "Austausch von Türgriffen",
        description: "Griffe und Zubehör für Innentüren",
      },
      "sostituzione-serratura": {
        name: "Schlossaustausch",
        description: "Einfache Haushaltsschlösser",
      },
      "riparazione-interruttore": {
        name: "Reparatur von Schalter oder Steckdose",
        description: "Austausch von Schaltern, Steckdosen, Abdeckungen und USB-Steckdosen",
      },
      "installazione-luce": {
        name: "Montage von Lampe, Decken- oder Wandleuchte",
        description: "Installation von Lichtpunkten im Haushalt bis 3 m",
      },
      "pittura-pareti": {
        name: "Wandanstrich",
        description: "Richtpreis: 20 € pro m² Wandfläche",
        questions: { superficieMq: "Zu streichende Fläche (m²)" },
        pricingLabels: {
          "Tinteggiatura per m² aggiuntivo": "Anstrich pro zusätzlichem m²",
          "Sconto 6% per superfici oltre 100 m²": "6 % Rabatt für Flächen über 100 m²",
        },
      },
      "ritocchi-pittura": {
        name: "Farbausbesserungen",
        description: "Kleine Ausbesserungen und lokale Reparaturen",
      },
      "piccoli-lavori": {
        name: "Kleine Handwerksarbeiten",
        description: "Mehrere kleine Arbeiten während desselben Besuchs",
      },
    },
  },
};

export function localizeQuotesData(data: QuotesData, locale: Locale): QuotesData {
  const translations = QUOTE_TRANSLATIONS[locale];

  return {
    categories: data.categories.map((category) => ({
      ...category,
      name: translations.categories[category.id] ?? category.name,
    })),
    services: data.services.map((service) => {
      const translation = translations.services[service.id];
      if (!translation) return service;

      return {
        ...service,
        name: translation.name,
        description: translation.description,
        questions: service.questions.map((question) => ({
          ...question,
          label: translation.questions?.[question.key] ?? question.label,
        })),
        pricingRules: service.pricingRules.map((rule) => ({
          ...rule,
          adjustments: rule.adjustments.map((adjustment) => ({
            ...adjustment,
            label: translation.pricingLabels?.[adjustment.label] ?? adjustment.label,
          })),
        })),
      };
    }),
  };
}
