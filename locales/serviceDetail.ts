import type { Locale } from "@/types/locale";

export interface ServiceDetailContent {
  breadcrumbLabel: string;
  breadcrumbHomeLabel: string;
  breadcrumbServicesLabel: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsDescription: string;
  problemsEyebrow: string;
  problemsTitle: string;
  problemsListLabel: string;
  areaEyebrow: string;
  areaTitle: string;
  areaName: string;
  areaNote: string;
  faqEyebrow: string;
  faqTitle: string;
  faqDescription: string;
  relatedEyebrow: string;
  relatedTitle: string;
  relatedListLabel: string;
  relatedLinkLabel: string;
}

export const SERVICE_DETAIL_CONTENT: Record<Locale, ServiceDetailContent> = {
  it: {
    breadcrumbLabel: "Percorso pagina",
    breadcrumbHomeLabel: "Home",
    breadcrumbServicesLabel: "Servizi",
    primaryCtaLabel: "Richiedi un preventivo",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Vedi tutti i servizi",
    secondaryCtaHref: "/services",
    benefitsEyebrow: "Perché è più semplice",
    benefitsTitle: "Un piccolo lavoro, gestito con attenzione.",
    benefitsDescription:
      "Dalla prima richiesta alla conclusione dell'intervento, manteniamo ogni passaggio chiaro e facile da seguire.",
    problemsEyebrow: "Possiamo aiutarti",
    problemsTitle: "Situazioni comuni che gestiamo.",
    problemsListLabel: "Esempi di interventi",
    areaEyebrow: "Zona di servizio",
    areaTitle: "Dove interveniamo",
    areaName: "Friuli Venezia Giulia, Italia",
    areaNote:
      "La disponibilità viene sempre confermata dopo aver verificato zona e dettagli della richiesta.",
    faqEyebrow: "Domande frequenti",
    faqTitle: "Prima di richiedere il servizio.",
    faqDescription: "Risposte semplici alle domande più comuni su questo tipo di intervento.",
    relatedEyebrow: "Potrebbe servirti anche",
    relatedTitle: "Altri piccoli lavori per la casa.",
    relatedListLabel: "Servizi correlati",
    relatedLinkLabel: "Scopri il servizio",
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbServicesLabel: "Services",
    primaryCtaLabel: "Request an estimate",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "View all services",
    secondaryCtaHref: "/services",
    benefitsEyebrow: "Why it's simpler",
    benefitsTitle: "A small job, handled with care.",
    benefitsDescription:
      "From the first request to the completion of the job, we keep every step clear and easy to follow.",
    problemsEyebrow: "We can help",
    problemsTitle: "Common situations we handle.",
    problemsListLabel: "Examples of jobs",
    areaEyebrow: "Service area",
    areaTitle: "Where we operate",
    areaName: "Friuli Venezia Giulia, Italy",
    areaNote: "Availability is always confirmed after verifying the area and request details.",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Before requesting the service.",
    faqDescription: "Simple answers to common questions about this type of job.",
    relatedEyebrow: "You might also need",
    relatedTitle: "Other small jobs for your home.",
    relatedListLabel: "Related services",
    relatedLinkLabel: "Discover the service",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbServicesLabel: "Dienstleistungen",
    primaryCtaLabel: "Kostenvoranschlag anfordern",
    primaryCtaHref: "/#preventivo",
    secondaryCtaLabel: "Alle Dienstleistungen",
    secondaryCtaHref: "/services",
    benefitsEyebrow: "Warum es einfacher ist",
    benefitsTitle: "Eine kleine Arbeit, sorgfältig erledigt.",
    benefitsDescription:
      "Von der ersten Anfrage bis zum Abschluss der Arbeit halten wir jeden Schritt klar und nachvollziehbar.",
    problemsEyebrow: "Wir können helfen",
    problemsTitle: "Häufige Situationen, die wir bewältigen.",
    problemsListLabel: "Beispiele für Arbeiten",
    areaEyebrow: "Servicegebiet",
    areaTitle: "Wo wir tätig sind",
    areaName: "Friaul Julisch Venetien, Italien",
    areaNote:
      "Die Verfügbarkeit wird immer nach Überprüfung des Gebiets und der Anfragedetails bestätigt.",
    faqEyebrow: "Häufige Fragen",
    faqTitle: "Vor der Beauftragung des Dienstes.",
    faqDescription: "Einfache Antworten auf häufige Fragen zu dieser Art von Arbeit.",
    relatedEyebrow: "Das könnte auch nützlich sein",
    relatedTitle: "Weitere kleine Arbeiten für Ihr Zuhause.",
    relatedListLabel: "Verwandte Dienstleistungen",
    relatedLinkLabel: "Dienstleistung entdecken",
  },
};
