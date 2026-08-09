import type { Review } from "@/types/reviews";

/**
 * Reviews are intentionally not seeded in the repository. Only verified,
 * consented reviews from the published store may be shown publicly.
 */
export const DEFAULT_REVIEWS: Review[] = [];
