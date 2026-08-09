import { deploymentEnvironment } from "@/config/env";

export const siteConfig = {
  name: "QUBO",
  shortName: "QUBO",
  brandMeaning: "Qualità · Urgenza · Benfatto · Organizzato",
  homeTitle: "Piccoli lavori a Cervignano del Friuli",
  description:
    "QUBO organizza piccoli lavori domestici, montaggi e installazioni a Cervignano del Friuli e nelle località vicine, con disponibilità verificata per ogni richiesta.",
  language: "it",
  languageTag: "it-IT",
  locale: "it_IT",
  region: "Friuli Venezia Giulia",
  url: deploymentEnvironment.siteUrl,
  socialImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  isIndexable: deploymentEnvironment.isIndexable,
  contact: {
    email: "qubo.servizi@proton.me",
    phone: "+393201391900",
    phoneDisplay: "+39 320 139 1900",
  },
} as const;
