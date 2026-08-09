import type { Locale } from "@/types/locale";

export interface GalleryPageContent {
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
  guideEyebrow: string;
  guideTitle: string;
  guideLabel: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  description: string;
  notice: string;
  listLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  previewLabel: string;
  openComparisonLabel: (title: string) => string;
  pageLinkLabel: string;
}

export const GALLERY_PAGE_METADATA: Record<
  Locale,
  { title: string; description: string; path: string }
> = {
  it: {
    title: "Galleria lavori di casa in Friuli",
    description:
      "Esplora la galleria prima e dopo di QUBO e scopri come vengono presentati piccoli interventi domestici in modo chiaro e immediato.",
    path: "/gallery",
  },
  en: {
    title: "Home jobs gallery in Friuli",
    description:
      "Explore the QUBO before-and-after gallery and discover how small household jobs are presented clearly and instantly.",
    path: "/gallery",
  },
  de: {
    title: "Galerie der Hausarbeiten in Friaul",
    description:
      "Entdecken Sie die Vorher-Nachher-Galerie von QUBO und sehen Sie, wie kleine Hausarbeiten klar und übersichtlich dargestellt werden.",
    path: "/gallery",
  },
};

export const GALLERY_PAGE_CONTENT: Record<Locale, GalleryPageContent> = {
  it: {
    breadcrumbLabel: "Percorso pagina",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Galleria",
    eyebrow: "Galleria",
    title: "Prima e dopo, a colpo d'occhio.",
    description:
      "Confronta ogni intervento in una vista semplice. Apri un progetto per osservare entrambe le immagini più da vicino.",
    primaryCtaLabel: "Esplora la galleria",
    primaryCtaHref: "#galleria",
    secondaryCtaLabel: "Richiedi un preventivo",
    secondaryCtaHref: "/#preventivo",
    guideEyebrow: "Come funziona",
    guideTitle: "Un confronto semplice da esplorare.",
    guideLabel: "Come consultare la galleria",
  },
  en: {
    breadcrumbLabel: "Page path",
    breadcrumbHomeLabel: "Home",
    breadcrumbCurrentLabel: "Gallery",
    eyebrow: "Gallery",
    title: "Before and after, at a glance.",
    description: "Compare each job in a simple view. Open a project to see both images up close.",
    primaryCtaLabel: "Explore the gallery",
    primaryCtaHref: "#galleria",
    secondaryCtaLabel: "Request an estimate",
    secondaryCtaHref: "/#preventivo",
    guideEyebrow: "How it works",
    guideTitle: "A simple comparison to explore.",
    guideLabel: "How to browse the gallery",
  },
  de: {
    breadcrumbLabel: "Seitenpfad",
    breadcrumbHomeLabel: "Startseite",
    breadcrumbCurrentLabel: "Galerie",
    eyebrow: "Galerie",
    title: "Vorher und nachher, auf einen Blick.",
    description:
      "Vergleichen Sie jede Arbeit in einer einfachen Ansicht. Öffnen Sie ein Projekt, um beide Bilder genauer zu betrachten.",
    primaryCtaLabel: "Galerie erkunden",
    primaryCtaHref: "#galleria",
    secondaryCtaLabel: "Kostenvoranschlag anfordern",
    secondaryCtaHref: "/#preventivo",
    guideEyebrow: "So funktioniert's",
    guideTitle: "Ein einfacher Vergleich zum Erkunden.",
    guideLabel: "So durchsuchen Sie die Galerie",
  },
};

export const GALLERY_PAGE_GUIDE_ITEMS: Record<Locale, readonly string[]> = {
  it: [
    "Confronta le immagini prima e dopo",
    "Apri ogni progetto nella vista ampliata",
    "Passa al confronto precedente o successivo",
  ],
  en: [
    "Compare before and after images",
    "Open each project in the expanded view",
    "Switch to the previous or next comparison",
  ],
  de: [
    "Vorher-Nachher-Bilder vergleichen",
    "Jedes Projekt in der erweiterten Ansicht öffnen",
    "Zum vorherigen oder nächsten Vergleich wechseln",
  ],
};

export const GALLERY_CONTENT: Record<Locale, GalleryContent> = {
  it: {
    eyebrow: "Prima e dopo",
    title: "Il lavoro si vede nei dettagli.",
    description:
      "Tre esempi illustrativi: confronta lo stato iniziale con il risultato finale in una vista semplice.",
    notice: "3 esempi illustrativi · Prima e dopo ogni sistemazione.",
    listLabel: "Anteprima dei lavori prima e dopo",
    closeLabel: "Chiudi la galleria",
    previousLabel: "Mostra il lavoro precedente",
    nextLabel: "Mostra il lavoro successivo",
    previewLabel: "Confronto illustrativo",
    openComparisonLabel: (title) => `Apri il confronto: ${title}`,
    pageLinkLabel: "Apri la galleria completa",
  },
  en: {
    eyebrow: "Before and after",
    title: "The work shows in the details.",
    description:
      "Three illustrative examples: compare the initial state with the final result in a simple view.",
    notice: "3 illustrative examples · Before and after every repair.",
    listLabel: "Before and after preview",
    closeLabel: "Close gallery",
    previousLabel: "Show previous job",
    nextLabel: "Show next job",
    previewLabel: "Illustrative comparison",
    openComparisonLabel: (title) => `Open comparison: ${title}`,
    pageLinkLabel: "Open the full gallery",
  },
  de: {
    eyebrow: "Vorher und nachher",
    title: "Die Arbeit zeigt sich in den Details.",
    description:
      "Drei illustrative Beispiele: Vergleichen Sie den Ausgangszustand mit dem Ergebnis in einer einfachen Ansicht.",
    notice: "3 illustrative Beispiele · Vorher und nachher jeder Reparatur.",
    listLabel: "Vorher-Nachher-Vorschau",
    closeLabel: "Galerie schließen",
    previousLabel: "Vorherige Arbeit anzeigen",
    nextLabel: "Nächste Arbeit anzeigen",
    previewLabel: "Illustrativer Vergleich",
    openComparisonLabel: (title) => `Vergleich öffnen: ${title}`,
    pageLinkLabel: "Vollständige Galerie öffnen",
  },
};
