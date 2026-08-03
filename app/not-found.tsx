import type { Metadata } from "next";

import { NotFoundContent } from "@/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { follow: false, index: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
