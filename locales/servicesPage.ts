import type { Locale } from "@/types/locale";

export interface ServicesPageContent {
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
  trustLabel: string;
}

export const SERVICES_PAGE_CONTENT: Record<Locale, ServicesPageContent> = {
  it: {
    breadcrumbLabel: "Percorso pagina",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Servizi",
    eyebrow: "Servizi per la casa",
    title: "Un solo team per i piccoli lavori di casa.",
    description:
      "Riparazioni quotidiane, installazioni e liste di lavori diversi. Ti aiutiamo a organizzare tutto con un unico contatto e senza complicazioni.",
    primaryCtaLabel: "Scopri i servizi",
    primaryCtaHref: "#servizi",
    secondaryCtaLabel: "Richiedi un preventivo",
    secondaryCtaHref: "/#preventivo",
    trustLabel: "Il nostro modo di lavorare",
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Services",
    eyebrow: "Home services",
    title: "One team for your small home jobs.",
    description:
      "Daily repairs, installations, and lists of different jobs. We help you organise everything with a single contact and no complications.",
    primaryCtaLabel: "Discover services",
    primaryCtaHref: "#servizi",
    secondaryCtaLabel: "Request an estimate",
    secondaryCtaHref: "/#preventivo",
    trustLabel: "How we work",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbCurrentLabel: "Dienstleistungen",
    eyebrow: "Hausdienstleistungen",
    title: "Ein Team für Ihre kleinen Hausarbeiten.",
    description:
      "Tägliche Reparaturen, Installationen und verschiedene Arbeitslisten. Wir helfen Ihnen, alles mit einem einzigen Ansprechpartner und ohne Komplikationen zu organisieren.",
    primaryCtaLabel: "Dienstleistungen entdecken",
    primaryCtaHref: "#servizi",
    secondaryCtaLabel: "Kostenvoranschlag anfordern",
    secondaryCtaHref: "/#preventivo",
    trustLabel: "Wie wir arbeiten",
  },
};

export const SERVICES_PAGE_METADATA: Record<
  Locale,
  { title: string; description: string; path: string }
> = {
  it: {
    title: "Servizi per la casa in Friuli",
    description:
      "Scopri i servizi QUBO per piccole riparazioni, installazioni e lavori domestici in Friuli Venezia Giulia, gestiti da un unico team.",
    path: "/services",
  },
  en: {
    title: "Home services in Friuli",
    description:
      "Discover QUBO for small repairs, installations, and household jobs in Friuli Venezia Giulia, managed by one team.",
    path: "/services",
  },
  de: {
    title: "Hausdienstleistungen in Friaul",
    description:
      "Entdecken Sie QUBO für kleine Reparaturen, Installationen und Hausarbeiten in Friaul Julisch Venetien, verwaltet von einem Team.",
    path: "/services",
  },
};
