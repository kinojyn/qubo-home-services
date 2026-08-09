import type { Locale } from "@/types/locale";

export interface FooterContent {
  brandDescription: string;
  contactActionLabel: string;
  contactHeading: string;
  contactRegion: string;
  copyrightSuffix: string;
  legalHeading: string;
  navigationHeading: string;
  socialHeading: string;
  socialPlaceholderLabel: string;
}

export interface FooterLegalLink {
  href: string;
  label: string;
}

export interface FooterResourceLink {
  href: string;
  label: string;
}

export const FOOTER_CONTENT: Record<Locale, FooterContent> = {
  it: {
    brandDescription:
      "Piccole riparazioni domestiche, gestite con semplicità in Friuli Venezia Giulia.",
    contactActionLabel: "Richiedi assistenza",
    contactHeading: "Contatti",
    contactRegion: "Friuli Venezia Giulia, Italia",
    copyrightSuffix: "Tutti i diritti riservati.",
    legalHeading: "Legal",
    navigationHeading: "Navigazione",
    socialHeading: "Social",
    socialPlaceholderLabel: "In arrivo",
  },
  en: {
    brandDescription: "Small household repairs, simply managed in Friuli Venezia Giulia.",
    contactActionLabel: "Request assistance",
    contactHeading: "Contacts",
    contactRegion: "Friuli Venezia Giulia, Italy",
    copyrightSuffix: "All rights reserved.",
    legalHeading: "Legal",
    navigationHeading: "Navigation",
    socialHeading: "Social",
    socialPlaceholderLabel: "Coming soon",
  },
  de: {
    brandDescription: "Kleine Haushaltsreparaturen, einfach verwaltet in Friaul Julisch Venetien.",
    contactActionLabel: "Hilfe anfordern",
    contactHeading: "Kontakt",
    contactRegion: "Friaul Julisch Venetien, Italien",
    copyrightSuffix: "Alle Rechte vorbehalten.",
    legalHeading: "Rechtliches",
    navigationHeading: "Navigation",
    socialHeading: "Soziales",
    socialPlaceholderLabel: "Demnächst",
  },
};

export const FOOTER_LEGAL_LINKS: Record<Locale, readonly FooterLegalLink[]> = {
  it: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/termini", label: "Termini e condizioni" },
    { href: "/legal-notice", label: "Legal Notice" },
    { href: "/cookie-preferences", label: "Preferenze cookie" },
  ],
  en: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/termini", label: "Terms & Conditions" },
    { href: "/legal-notice", label: "Legal Notice" },
    { href: "/cookie-preferences", label: "Cookie Preferences" },
  ],
  de: [
    { href: "/privacy", label: "Datenschutz" },
    { href: "/cookie-policy", label: "Cookie-Richtlinie" },
    { href: "/termini", label: "AGB" },
    { href: "/legal-notice", label: "Impressum" },
    { href: "/cookie-preferences", label: "Cookie-Einstellungen" },
  ],
};

export const FOOTER_RESOURCE_LINKS: Record<Locale, readonly FooterResourceLink[]> = {
  it: [
    { href: "/about", label: "Chi siamo" },
    { href: "/gallery", label: "Galleria" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contatti" },
  ],
  en: [
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  de: [
    { href: "/about", label: "Über uns" },
    { href: "/gallery", label: "Galerie" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Kontakt" },
  ],
};

export const FOOTER_SOCIAL_PLACEHOLDERS = ["Instagram", "Facebook"] as const;
