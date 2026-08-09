"use client";

import { MessageCircle } from "lucide-react";

import { useLocale } from "@/contexts/LocaleContext";
import { useSettings } from "@/contexts/SettingsContext";

const FLOATING_CTA_CONTENT = {
  it: { label: "Aiuto urgente?", ariaLabel: "Contattaci su WhatsApp" },
  en: { label: "Urgent help?", ariaLabel: "Contact us on WhatsApp" },
  de: { label: "Dringende Hilfe?", ariaLabel: "Kontaktieren Sie uns über WhatsApp" },
} as const;

export function FloatingCta() {
  const { getWhatsAppUrl } = useSettings();
  const { locale } = useLocale();

  return (
    <div className="floating-emergency-shell">
      <a
        aria-label={`${FLOATING_CTA_CONTENT[locale].label}: ${FLOATING_CTA_CONTENT[locale].ariaLabel}`}
        className="floating-emergency-cta"
        href={getWhatsAppUrl()}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="floating-emergency-icon">
          <MessageCircle aria-hidden="true" size={23} strokeWidth={2.35} />
          <span aria-hidden="true" className="floating-emergency-status" />
        </span>
        <span className="floating-emergency-label">{FLOATING_CTA_CONTENT[locale].label}</span>
      </a>
    </div>
  );
}
