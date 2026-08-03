export const STATISTICS_CONTENT = {
  eyebrow: "Il servizio in numeri",
  title: "Pochi passaggi. Molte cose risolte.",
  description:
    "Un modello semplice, costruito per riunire i piccoli lavori di casa in un percorso facile da gestire.",
  listLabel: "I numeri del servizio QUBO",
} as const;

export const STATISTICS = [
  {
    value: 10,
    suffix: "",
    label: "Categorie di servizio",
    description: "Dieci tipi di piccoli interventi domestici coordinati dallo stesso team.",
    accessibleValue: "10 categorie di servizio",
  },
  {
    value: 4,
    suffix: "",
    label: "Passaggi chiari",
    description: "Dalla prima richiesta al lavoro completato, senza un percorso complicato.",
    accessibleValue: "4 passaggi chiari",
  },
  {
    value: 1,
    suffix: "",
    label: "Unico referente",
    description: "Un solo punto di contatto per organizzare tutti i piccoli lavori concordati.",
    accessibleValue: "1 unico referente",
  },
  {
    value: 1,
    suffix: "",
    label: "Visita coordinata",
    description: "Più attività riunite nello stesso appuntamento, quando il lavoro lo consente.",
    accessibleValue: "1 visita coordinata",
  },
] as const;
