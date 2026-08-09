export const GALLERY_PAGE_METADATA = {
  title: "Galleria lavori di casa in Friuli",
  description:
    "Esplora la galleria prima e dopo di QUBO e scopri come vengono presentati piccoli interventi domestici in modo chiaro e immediato.",
  path: "/gallery",
} as const;

export const GALLERY_PAGE_CONTENT = {
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
} as const;

export const GALLERY_PAGE_GUIDE_ITEMS = [
  "Confronta le immagini prima e dopo",
  "Apri ogni progetto nella vista ampliata",
  "Passa al confronto precedente o successivo",
] as const;

export const GALLERY_CONTENT = {
  eyebrow: "Prima e dopo",
  title: "Il lavoro si vede nei dettagli.",
  description: "Tre esempi illustrativi: confronta lo stato iniziale con il risultato finale.",
  notice: "3 esempi illustrativi · Prima e dopo ogni sistemazione.",
  listLabel: "Anteprima dei lavori prima e dopo",
  closeLabel: "Chiudi la galleria",
  previousLabel: "Mostra il lavoro precedente",
  nextLabel: "Mostra il lavoro successivo",
} as const;

export const GALLERY_IMAGE_SIZES = "(min-width: 64rem) 20vw, (min-width: 48rem) 40vw, 50vw";
export const LIGHTBOX_IMAGE_SIZES = "(min-width: 48rem) 22rem, 90vw";
