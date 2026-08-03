"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useLocale } from "@/contexts/LocaleContext";
import { useCookieConsent } from "@/contexts/CookieContext";
import { COOKIE_CONTENT } from "@/locales/cookie";

export function CookieConsentBanner() {
  const { locale } = useLocale();
  const { acceptAll, bannerVisible, dismissBanner, openPreferences, rejectAll } =
    useCookieConsent();
  const content = COOKIE_CONTENT[locale];

  if (!bannerVisible) return null;

  return (
    <div
      aria-label={content.bannerTitle}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-divider bg-background-primary shadow-xl motion-safe:animate-slide-up"
      role="dialog"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 pb-6 pt-5 tablet:px-8 laptop:flex-row laptop:items-start laptop:gap-10 laptop:px-12 laptop:pb-8 laptop:pt-6">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary">{content.bannerTitle}</p>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-text-secondary">
            {content.bannerDescription}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 tablet:flex-row tablet:items-center">
          <Button onClick={acceptAll} variant="primary">
            {content.acceptAllLabel}
          </Button>
          <Button onClick={rejectAll} variant="secondary">
            {content.rejectAllLabel}
          </Button>
          <Button onClick={openPreferences} variant="ghost">
            {content.customizeLabel}
          </Button>
        </div>
        <button
          aria-label={locale === "en" ? "Close" : locale === "de" ? "Schließen" : "Chiudi"}
          className="-mr-2 -mt-2 flex size-8 shrink-0 items-center justify-center self-start rounded-md text-text-secondary transition hover:bg-background-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring laptop:mt-0"
          onClick={dismissBanner}
          type="button"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
