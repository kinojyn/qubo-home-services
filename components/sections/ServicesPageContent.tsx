"use client";

import { RoomHoverProvider } from "@/contexts/RoomHoverContext";
import { ServicesPageHero } from "@/components/sections/ServicesPageHero";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { FinalCta } from "@/components/sections/FinalCta";

export function ServicesPageContent() {
  return (
    <RoomHoverProvider>
      <ServicesPageHero />
      <ServicesShowcase />
      <FinalCta />
    </RoomHoverProvider>
  );
}
