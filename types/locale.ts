export type Locale = "it" | "en" | "de";

export const LOCALES: Locale[] = ["it", "en", "de"];

export const LOCALE_META: Record<
  Locale,
  { label: string; shortLabel: string; languageTag: string; locale: string }
> = {
  it: { label: "Italiano", shortLabel: "IT", languageTag: "it-IT", locale: "it_IT" },
  en: { label: "English", shortLabel: "EN", languageTag: "en-GB", locale: "en_GB" },
  de: { label: "Deutsch", shortLabel: "DE", languageTag: "de-DE", locale: "de_DE" },
};
