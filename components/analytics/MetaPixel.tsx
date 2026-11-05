"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useCookieConsent } from "@/contexts/CookieContext";
import { updateMetaPixel } from "@/lib/metaPixel";

export function MetaPixel() {
  const pathname = usePathname();
  const { hasInteracted, preferences } = useCookieConsent();

  useEffect(() => {
    updateMetaPixel(hasInteracted && preferences.marketing, pathname);
  }, [hasInteracted, preferences.marketing, pathname]);

  return null;
}
