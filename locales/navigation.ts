import type { Locale } from "@/types/locale";

export interface NavigationLink {
  href: string;
  label: string;
}

export interface NavigationContent {
  ctaHref: string;
  ctaLabel: string;
  menuCloseLabel: string;
  menuLabel: string;
  menuOpenLabel: string;
  mobileNavigationLabel: string;
  primaryNavigationLabel: string;
  skipLinkLabel: string;
}

export const NAVIGATION_LINKS: Record<Locale, readonly NavigationLink[]> = {
  it: [
    { href: "/richiedi-preventivo", label: "Preventivo" },
    { href: "/services", label: "Servizi" },
    { href: "/#come-funziona", label: "Come funziona" },
    { href: "/#recensioni", label: "Recensioni" },
    { href: "/zone-servite", label: "Zone servite" },
  ],
  en: [
    { href: "/richiedi-preventivo", label: "Get Quote" },
    { href: "/services", label: "Services" },
    { href: "/#come-funziona", label: "How it works" },
    { href: "/#recensioni", label: "Reviews" },
    { href: "/zone-servite", label: "Service areas" },
  ],
  de: [
    { href: "/richiedi-preventivo", label: "Angebot" },
    { href: "/services", label: "Dienstleistungen" },
    { href: "/#come-funziona", label: "So funktioniert's" },
    { href: "/#recensioni", label: "Bewertungen" },
    { href: "/zone-servite", label: "Servicegebiete" },
  ],
};

export const NAVIGATION_CONTENT: Record<Locale, NavigationContent> = {
  it: {
    ctaHref: "/richiedi-preventivo",
    ctaLabel: "Richiedi un preventivo",
    menuCloseLabel: "Chiudi il menu",
    menuLabel: "Menu",
    menuOpenLabel: "Apri il menu",
    mobileNavigationLabel: "Navigazione mobile",
    primaryNavigationLabel: "Navigazione principale",
    skipLinkLabel: "Vai al contenuto",
  },
  en: {
    ctaHref: "/richiedi-preventivo",
    ctaLabel: "Request an estimate",
    menuCloseLabel: "Close menu",
    menuLabel: "Menu",
    menuOpenLabel: "Open menu",
    mobileNavigationLabel: "Mobile navigation",
    primaryNavigationLabel: "Main navigation",
    skipLinkLabel: "Skip to content",
  },
  de: {
    ctaHref: "/richiedi-preventivo",
    ctaLabel: "Kostenvoranschlag anfordern",
    menuCloseLabel: "Menü schließen",
    menuLabel: "Menü",
    menuOpenLabel: "Menü öffnen",
    mobileNavigationLabel: "Mobile Navigation",
    primaryNavigationLabel: "Hauptnavigation",
    skipLinkLabel: "Zum Inhalt springen",
  },
};
