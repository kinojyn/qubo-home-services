import type { ReviewsData } from "@/types/reviews";
import { DEFAULT_REVIEWS_DATA } from "@/types/reviews";
import { DEFAULT_REVIEWS } from "@/data/reviews";
import { readPublished, publishDraft } from "@/lib/admin/storage";

const REVIEWS_KEY = "reviews";

export async function getReviewsData(): Promise<ReviewsData> {
  try {
    const data = await readPublished<ReviewsData | null>(REVIEWS_KEY, null);
    if (!data) {
      return { provider: "manual", reviews: DEFAULT_REVIEWS };
    }
    return data;
  } catch {
    return DEFAULT_REVIEWS_DATA;
  }
}

export async function saveReviewsData(data: ReviewsData): Promise<void> {
  await publishDraft(REVIEWS_KEY, data);
}
