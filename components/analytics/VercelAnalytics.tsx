"use client";

import { Analytics } from "@vercel/analytics/next";

import { useCookieConsent } from "@/contexts/CookieContext";

/**
 * Loads Vercel Web Analytics only after the visitor opts in to analytics.
 * This keeps the analytics integration aligned with the site's cookie banner.
 */
export function VercelAnalytics() {
  const { hasInteracted, preferences } = useCookieConsent();

  if (!hasInteracted || !preferences.analytics) return null;

  return <Analytics />;
}
