export const NAVIGATION_LINKS = [
  { href: "/services", label: "Servizi" },
  { href: "/#come-funziona", label: "Come funziona" },
  { href: "/#recensioni", label: "Recensioni" },
  { href: "/zone-servite", label: "Zone servite" },
] as const;

export const NAVIGATION_CONTENT = {
  ctaHref: "/#preventivo",
  ctaLabel: "Richiedi un preventivo",
  menuCloseLabel: "Chiudi il menu",
  menuLabel: "Menu",
  menuOpenLabel: "Apri il menu",
  mobileNavigationLabel: "Navigazione mobile",
  primaryNavigationLabel: "Navigazione principale",
  skipLinkLabel: "Vai al contenuto",
} as const;

export const LAPTOP_MEDIA_QUERY = "(min-width: 64rem)";
