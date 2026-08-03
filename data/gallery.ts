export const GALLERY_PROJECTS = [
  {
    id: "electrical",
    title: "Sostituzione presa elettrica",
    before: {
      src: "/images/gallery/electrical-before.png",
      alt: "Presa elettrica danneggiata prima dell'intervento",
    },
    after: {
      src: "/images/gallery/electrical-after.png",
      alt: "Presa elettrica installata dopo l'intervento",
    },
  },
  {
    id: "plumbing",
    title: "Sostituzione rubinetto",
    before: {
      src: "/images/gallery/plumbing-before.png",
      alt: "Rubinetto danneggiato prima dell'intervento",
    },
    after: {
      src: "/images/gallery/plumbing-after.png",
      alt: "Rubinetto riparato dopo l'intervento",
    },
  },
  {
    id: "door",
    title: "Regolazione porta interna",
    before: {
      src: "/images/gallery/door-before.png",
      alt: "Porta interna fuori asse prima della regolazione",
    },
    after: {
      src: "/images/gallery/door-after.png",
      alt: "Porta interna regolata dopo l'intervento",
    },
  },
] as const;
