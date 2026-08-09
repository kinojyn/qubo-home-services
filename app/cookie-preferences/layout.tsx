import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Preferenze cookie",
  description: "Gestisci le preferenze relative ai cookie utilizzati dal sito QUBO.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/cookie-preferences",
  },
};

export default function CookiePreferencesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
