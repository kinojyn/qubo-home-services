import type { Locale } from "@/types/locale";

export interface TrustRatingContent {
  reviewSource: string;
  singular: string;
  plural: string;
}

export const TRUST_RATING_CONTENT: Record<Locale, TrustRatingContent> = {
  it: {
    reviewSource: "Recensioni clienti",
    singular: "recensione",
    plural: "recensioni",
  },
  en: {
    reviewSource: "Customer reviews",
    singular: "review",
    plural: "reviews",
  },
  de: {
    reviewSource: "Kundenbewertungen",
    singular: "Bewertung",
    plural: "Bewertungen",
  },
};
