import { deploymentEnvironment } from "@/config/env";

export const siteConfig = {
  name: "QUBO",
  shortName: "QUBO",
  brandMeaning: "Qualità · Urgenza · Benfatto · Organizzato",
  homeTitle: "Riparazioni e servizi domestici in Friuli",
  description:
    "Piccole riparazioni, installazioni e lavori domestici in Friuli Venezia Giulia, gestiti con semplicità da un unico team locale e affidabile.",
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
