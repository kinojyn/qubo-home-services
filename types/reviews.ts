export type ReviewBadge = "verified" | "recommended" | "emergency" | "repeat" | "new";

export type ReviewProvider = "manual" | "google" | "both";

export type ReviewStatus = "visible" | "hidden";

export interface Review {
  id: string;
  name: string;
  city: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  createdAt: number;
  updatedAt: number;
  status: ReviewStatus;
  pinned: boolean;
  badges: ReviewBadge[];
  avatar?: string;
  provider: ReviewProvider;
  googleReviewId?: string;
  customerId?: string;
}

export interface ReviewsData {
  provider: ReviewProvider;
  reviews: Review[];
}

export const BADGE_LABELS: Record<ReviewBadge, string> = {
  verified: "Cliente verificato",
  recommended: "Consigliato",
  emergency: "Servizio urgente",
  repeat: "Cliente abituale",
  new: "Nuovo cliente",
};

export const REVIEW_PROVIDER_OPTIONS: { value: ReviewProvider; label: string }[] = [
  { value: "manual", label: "Recensioni manuali" },
  { value: "google", label: "Google Reviews" },
  { value: "both", label: "Entrambi" },
];

export const DEFAULT_REVIEWS_DATA: ReviewsData = {
  provider: "manual",
  reviews: [],
};
