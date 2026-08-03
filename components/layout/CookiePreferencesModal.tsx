"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useLocale } from "@/contexts/LocaleContext";
import {
  useCookieConsent,
  type CookieCategory,
  type CookiePreferences,
} from "@/contexts/CookieContext";
import { COOKIE_CONTENT } from "@/locales/cookie";

const ALL_CATEGORIES: CookieCategory[] = ["analytics", "marketing", "preferences", "statistics"];

type ToggleSwitchProps = {
  checked: boolean;
  disabled?: boolean;
  id: string;
  label: string;
  onChange: () => void;
};

function ToggleSwitch({ checked, disabled = false, id, label, onChange }: ToggleSwitchProps) {
  return (
    <label
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-[var(--ds-duration-normal)] ${
        checked ? "bg-accent" : "bg-border-strong"
      } ${disabled ? "opacity-50" : ""}`}
      htmlFor={id}
    >
      <span className="sr-only">{label}</span>
      <input
        checked={checked}
        className="peer sr-only"
        disabled={disabled}
        id={id}
        onChange={onChange}
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform duration-[var(--ds-duration-normal)] ${
          checked ? "translate-x-[1.375rem]" : "translate-x-[0.125rem]"
        }`}
      />
    </label>
  );
}

export function CookiePreferencesModal() {
  const { preferencesOpen } = useCookieConsent();

  if (!preferencesOpen) return null;

  return <CookiePreferencesDialog />;
}

function CookiePreferencesDialog() {
  const { locale } = useLocale();
  const { closePreferences, preferences, updatePreferences } = useCookieConsent();
  const content = COOKIE_CONTENT[locale];

  const [draft, setDraft] = useState<CookiePreferences>(preferences);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [closePreferences]);

  const handleToggle = useCallback((category: CookieCategory) => {
    setDraft((prev) => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const handleSave = useCallback(() => {
    updatePreferences(draft);
  }, [draft, updatePreferences]);

  const handleCancel = useCallback(() => {
    closePreferences();
  }, [closePreferences]);

  return (
    <div
      aria-labelledby="cookie-preferences-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm motion-safe:animate-fade-in tablet:items-center tablet:p-6"
      onClick={closePreferences}
      role="dialog"
    >
      <div
        aria-describedby="cookie-preferences-modal-description"
        className="max-h-[calc(100dvh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-3xl border border-divider bg-background-primary p-5 shadow-2xl motion-safe:animate-scale-in tablet:max-h-[calc(100dvh-3rem)] tablet:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">Privacy</p>
            <h2
              className="mt-1 font-heading text-2xl font-semibold text-text-primary"
              id="cookie-preferences-modal-title"
            >
              {content.modalTitle}
            </h2>
            <p
              className="mt-2 text-sm leading-relaxed text-text-secondary"
              id="cookie-preferences-modal-description"
            >
              {content.bannerDescription}
            </p>
          </div>
          <button
            aria-label={content.closeLabel}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-divider text-text-secondary transition hover:border-accent/30 hover:bg-accent/5 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            onClick={closePreferences}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="mt-7 grid gap-3">
          {/* Necessary — always locked on */}
          <div className="flex items-start justify-between gap-4 rounded-2xl border border-divider bg-surface p-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text-primary">
                {content.categories.necessary.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {content.categories.necessary.description}
              </p>
            </div>
            <ToggleSwitch
              checked={true}
              disabled={true}
              id="cookie-necessary"
              label={content.categories.necessary.title}
              onChange={() => {}}
            />
          </div>

          {ALL_CATEGORIES.map((category) => (
            <div
              className="flex items-start justify-between gap-4 rounded-2xl border border-divider bg-surface p-4 transition-colors hover:border-accent/30"
              key={category}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-primary">
                  {content.categories[category].title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  {content.categories[category].description}
                </p>
              </div>
              <ToggleSwitch
                checked={draft[category]}
                id={`cookie-${category}`}
                label={content.categories[category].title}
                onChange={() => handleToggle(category)}
              />
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-divider pt-5 tablet:flex-row-reverse">
          <Button className="w-full tablet:w-auto" onClick={handleSave} variant="primary">
            {content.saveLabel}
          </Button>
          <Button className="w-full tablet:w-auto" onClick={handleCancel} variant="secondary">
            {content.cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
