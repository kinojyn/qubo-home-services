import type { Metadata } from "next";

import { AdvertisingLanding } from "@/components/advertising/AdvertisingLanding";
import { createPageMetadata } from "@/lib/seo";

const title = "QUBO | Piccoli Lavori e Preventivi";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Piccoli Lavori e Preventivi",
    description:
      "Hai bisogno di aiuto per piccoli lavori in casa? Contatta QUBO su WhatsApp o scopri i nostri servizi a Cervignano del Friuli e dintorni.",
    path: "https://quboservice.com/pubblicita",
  }),
  title: { absolute: title },
  robots: { index: false, follow: true },
  manifest: null,
  icons: {
    icon: { url: "/images/advertising/qubo-icon.png", type: "image/png", sizes: "180x180" },
    shortcut: "/images/advertising/qubo-icon.png",
    apple: "/images/advertising/qubo-icon.png",
  },
};

export default function AdvertisingPage() {
  return <AdvertisingLanding />;
}
