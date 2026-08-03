import type { Locale } from "@/types/locale";

export interface FinalCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}

export const FINAL_CTA_CONTENT: Record<Locale, FinalCtaContent> = {
  it: {
    eyebrow: "La tua casa, più semplice da gestire",
    title: "Hai una lista di piccoli lavori? Pensiamo a tutto noi.",
    description:
      "Raccontaci cosa deve essere sistemato. Ti aiuteremo a organizzare gli interventi in modo chiaro e senza complicazioni.",
    primaryHref: "/#preventivo",
    primaryLabel: "Richiedi un preventivo",
    secondaryHref: "/services#servizi",
    secondaryLabel: "Rivedi i servizi",
  },
  en: {
    eyebrow: "Your home, simpler to manage",
    title: "Got a list of small jobs? We'll take care of everything.",
    description:
      "Tell us what needs fixing. We'll help you organise the jobs clearly and without complications.",
    primaryHref: "/#preventivo",
    primaryLabel: "Request an estimate",
    secondaryHref: "/services#servizi",
    secondaryLabel: "Review services",
  },
  de: {
    eyebrow: "Ihr Zuhause, einfacher verwaltet",
    title: "Haben Sie eine Liste kleiner Arbeiten? Wir kümmern uns um alles.",
    description:
      "Erzählen Sie uns, was erledigt werden muss. Wir helfen Ihnen, die Arbeiten klar und ohne Komplikationen zu organisieren.",
    primaryHref: "/#preventivo",
    primaryLabel: "Kostenvoranschlag anfordern",
    secondaryHref: "/services#servizi",
    secondaryLabel: "Dienstleistungen ansehen",
  },
};
