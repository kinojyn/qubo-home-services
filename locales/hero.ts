import type { Locale } from "@/types/locale";

export interface HeroContent {
  description: string;
  emergencyCtaHref: string;
  emergencyCtaLabel: string;
  headlineFirstLine: string;
  headlineSecondLine: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  trustLabel: string;
}

export interface HeroTrustIndicator {
  icon: "response" | "local" | "team";
  label: string;
}

export const HERO_CONTENT: Record<Locale, HeroContent> = {
  it: {
    description:
      "Piccoli lavori domestici, montaggi e installazioni a Cervignano del Friuli e nelle località vicine. Semplice da richiedere. Facile da gestire.",
    emergencyCtaHref: "#contatti",
    emergencyCtaLabel: "Aiuto urgente",
    headlineFirstLine: "Una chiamata.",
    headlineSecondLine: "Ogni piccola riparazione.",
    primaryCtaHref: "#preventivo",
    primaryCtaLabel: "Richiedi un preventivo",
    trustLabel: "Perché scegliere QUBO",
  },
  en: {
    description:
      "Small household repairs, handled by one team without complications. Simple to request. Easy to manage.",
    emergencyCtaHref: "#contatti",
    emergencyCtaLabel: "Urgent help",
    headlineFirstLine: "One call.",
    headlineSecondLine: "Every small repair.",
    primaryCtaHref: "#preventivo",
    primaryCtaLabel: "Request an estimate",
    trustLabel: "Why choose QUBO",
  },
  de: {
    description:
      "Kleine Haushaltsreparaturen, von einem Team ohne Komplikationen erledigt. Einfach anzufragen. Leicht zu organisieren.",
    emergencyCtaHref: "#contatti",
    emergencyCtaLabel: "Notfallhilfe",
    headlineFirstLine: "Ein Anruf.",
    headlineSecondLine: "Jede kleine Reparatur.",
    primaryCtaHref: "#preventivo",
    primaryCtaLabel: "Kostenvoranschlag anfordern",
    trustLabel: "Warum QUBO wählen",
  },
};

export const HERO_TRUST_INDICATORS: Record<Locale, readonly HeroTrustIndicator[]> = {
  it: [
    { icon: "response", label: "Risposta rapida" },
    { icon: "local", label: "Servizio locale" },
    { icon: "team", label: "Un solo team" },
  ],
  en: [
    { icon: "response", label: "Quick response" },
    { icon: "local", label: "Local service" },
    { icon: "team", label: "One team" },
  ],
  de: [
    { icon: "response", label: "Schnelle Antwort" },
    { icon: "local", label: "Lokaler Service" },
    { icon: "team", label: "Ein Team" },
  ],
};
