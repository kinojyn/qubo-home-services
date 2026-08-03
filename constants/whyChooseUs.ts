export type FeatureIcon = "contact" | "visit" | "communication" | "care";

export const WHY_CHOOSE_US_CONTENT = {
  eyebrow: "Perché scegliere noi",
  title: "Un servizio pensato per semplificarti la giornata.",
  description:
    "Gestiamo i piccoli lavori di casa con un approccio chiaro, organizzato e facile da seguire.",
  listLabel: "I vantaggi di QUBO",
} as const;

export const WHY_CHOOSE_US_FEATURES = [
  {
    icon: "contact",
    title: "Un unico referente",
    description: "Un solo contatto per coordinare i diversi piccoli interventi di cui hai bisogno.",
  },
  {
    icon: "visit",
    title: "Più lavori, una visita",
    description:
      "Riuniamo più attività nello stesso appuntamento, così perdi meno tempo nell'organizzazione.",
  },
  {
    icon: "communication",
    title: "Comunicazione chiara",
    description:
      "Confermiamo priorità e dettagli prima della visita, senza passaggi inutilmente complicati.",
  },
  {
    icon: "care",
    title: "Cura e ordine",
    description:
      "Lavoriamo con attenzione negli spazi di casa e li lasciamo puliti al termine dell'intervento.",
  },
] as const satisfies ReadonlyArray<{
  icon: FeatureIcon;
  title: string;
  description: string;
}>;
