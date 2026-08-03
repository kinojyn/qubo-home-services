import type { Locale } from "@/types/locale";

export interface ServicesContent {
  eyebrow: string;
  title: string;
  description: string;
  listLabel: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  discoverServiceLabel: string;
}

export const SERVICES_CONTENT: Record<Locale, ServicesContent> = {
  it: {
    eyebrow: "I nostri servizi",
    title: "Piccoli interventi. Un unico team.",
    description:
      "Dalle riparazioni quotidiane alle installazioni per la casa: raccontaci cosa serve e penseremo noi al resto.",
    listLabel: "Servizi disponibili",
    ctaText:
      "Non trovi esattamente quello che cerchi? Descrivici il problema e ti diremo come possiamo aiutarti.",
    ctaLabel: "Parliamo del tuo intervento",
    ctaHref: "/#preventivo",
    discoverServiceLabel: "Scopri il servizio",
  },
  en: {
    eyebrow: "Our services",
    title: "Small jobs. One team.",
    description:
      "From daily repairs to home installations: tell us what you need and we'll take care of the rest.",
    listLabel: "Available services",
    ctaText:
      "Can't find exactly what you're looking for? Describe the problem and we'll tell you how we can help.",
    ctaLabel: "Let's talk about your job",
    ctaHref: "/#preventivo",
    discoverServiceLabel: "Discover the service",
  },
  de: {
    eyebrow: "Unsere Dienstleistungen",
    title: "Kleine Arbeiten. Ein Team.",
    description:
      "Von täglichen Reparaturen bis zu Installationen: erzählen Sie uns, was gebraucht wird, und wir kümmern uns um den Rest.",
    listLabel: "Verfügbare Dienstleistungen",
    ctaText:
      "Sie finden nicht genau, was Sie suchen? Beschreiben Sie das Problem und wir sagen Ihnen, wie wir helfen können.",
    ctaLabel: "Über Ihren Einsatz sprechen",
    ctaHref: "/#preventivo",
    discoverServiceLabel: "Dienstleistung entdecken",
  },
};
