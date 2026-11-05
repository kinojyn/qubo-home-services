import { track } from "@vercel/analytics";

import type { CookiePreferences } from "@/contexts/CookieContext";

export type AdvertisingClick = "whatsapp_click" | "website_click";

type ExistingMetaWindow = Window & {
  fbq?: (
    method: "track" | "trackCustom",
    event: string,
    properties?: Record<string, string>,
  ) => void;
};

/** A click is an outbound interaction, never a confirmed lead or order. */
export function trackAdvertisingClick(
  event: AdvertisingClick,
  consent: { hasInteracted: boolean; preferences: CookiePreferences },
) {
  if (!consent.hasInteracted) return;

  // Fixed properties only: no URL queries, contact details, message text or identifiers.
  const properties = { page: "/pubblicita" };

  if (consent.preferences.analytics) {
    try {
      track(event, properties);
    } catch {
      // Analytics must never prevent an outbound navigation.
    }
  }

  const fbq = (window as ExistingMetaWindow).fbq;
  if (consent.preferences.marketing && typeof fbq === "function") {
    try {
      fbq("trackCustom", event, properties);
      if (event === "whatsapp_click") fbq("track", "Contact", properties);
    } catch {
      // Reuse an existing Pixel if available; do not install or initialize another one.
    }
  }
}
