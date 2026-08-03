import type { Locale } from "@/types/locale";

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  description: string;
  notice: string;
  listLabel: string;
  previousLabel: string;
  nextLabel: string;
  allServicesLabel: string;
  serviceFilterLabel: string;
  allRatingsLabel: string;
  ratingFilterLabel: string;
  ratingOption: (count: number) => string;
  sortLabel: string;
  sortNewest: string;
  sortOldest: string;
  sortHighest: string;
  noReviewsLabel: string;
  reviewCount: (count: number) => string;
  pageInfo: (current: number, total: number) => string;
}

export const TESTIMONIALS_CONTENT: Record<Locale, TestimonialsContent> = {
  it: {
    eyebrow: "Recensioni",
    title: "Le esperienze dei clienti, presto qui.",
    description:
      "Il carosello è pronto per ospitare soltanto recensioni autentiche, pubblicate con il consenso dei clienti.",
    notice:
      "Contenuti dimostrativi: sostituire con recensioni verificate prima della pubblicazione.",
    listLabel: "Anteprima del carosello delle recensioni",
    previousLabel: "Mostra le recensioni precedenti",
    nextLabel: "Mostra le recensioni successive",
    allServicesLabel: "Tutti i servizi",
    serviceFilterLabel: "Filtra per servizio",
    allRatingsLabel: "Tutte le stelle",
    ratingFilterLabel: "Filtra per valutazione",
    ratingOption: (count) => `${count}+ stelle`,
    sortLabel: "Ordina recensioni",
    sortNewest: "Più recenti",
    sortOldest: "Più vecchie",
    sortHighest: "Migliori",
    noReviewsLabel: "Nessuna recensione disponibile.",
    reviewCount: (count) => `${count} ${count === 1 ? "recensione" : "recensioni"}`,
    pageInfo: (current, total) => `Pagina ${current} di ${total}`,
  },
  en: {
    eyebrow: "Reviews",
    title: "Customer experiences, coming soon.",
    description:
      "The carousel is ready to host only authentic reviews, published with customer consent.",
    notice: "Demo content: replace with verified reviews before publication.",
    listLabel: "Review carousel preview",
    previousLabel: "Show previous reviews",
    nextLabel: "Show next reviews",
    allServicesLabel: "All services",
    serviceFilterLabel: "Filter by service",
    allRatingsLabel: "All ratings",
    ratingFilterLabel: "Filter by rating",
    ratingOption: (count) => `${count}+ stars`,
    sortLabel: "Sort reviews",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortHighest: "Highest rated",
    noReviewsLabel: "No reviews available.",
    reviewCount: (count) => `${count} ${count === 1 ? "review" : "reviews"}`,
    pageInfo: (current, total) => `Page ${current} of ${total}`,
  },
  de: {
    eyebrow: "Bewertungen",
    title: "Kundenerfahrungen, bald hier.",
    description:
      "Das Karussell ist bereit, nur authentische Bewertungen zu hosten, die mit Zustimmung der Kunden veröffentlicht werden.",
    notice: "Demoinhalte: vor Veröffentlichung durch verifizierte Bewertungen ersetzen.",
    listLabel: "Vorschau des Bewertungskarussells",
    previousLabel: "Vorherige Bewertungen anzeigen",
    nextLabel: "Nächste Bewertungen anzeigen",
    allServicesLabel: "Alle Dienstleistungen",
    serviceFilterLabel: "Nach Dienstleistung filtern",
    allRatingsLabel: "Alle Bewertungen",
    ratingFilterLabel: "Nach Bewertung filtern",
    ratingOption: (count) => `${count}+ Sterne`,
    sortLabel: "Bewertungen sortieren",
    sortNewest: "Neueste",
    sortOldest: "Älteste",
    sortHighest: "Höchstbewertet",
    noReviewsLabel: "Keine Bewertungen verfügbar.",
    reviewCount: (count) => `${count} ${count === 1 ? "Bewertung" : "Bewertungen"}`,
    pageInfo: (current, total) => `Seite ${current} von ${total}`,
  },
};
