import { QuotesData, QuoteSubmission } from "@/types/quotes";
import { DEFAULT_QUOTES_DATA } from "./quoteDefaults";
import { mutatePublished, publishDraft, readPublished } from "@/lib/admin/storage";

export type { QuoteSubmission } from "@/types/quotes";

const QUOTES_CONFIG_KEY = "quotes-config";
const SUBMISSIONS_KEY = "quotes-submissions";

export async function getQuotesData(): Promise<QuotesData> {
  try {
    const data = await readPublished<QuotesData | null>(QUOTES_CONFIG_KEY, null);
    if (!data) {
      return DEFAULT_QUOTES_DATA;
    }
    return data;
  } catch {
    return DEFAULT_QUOTES_DATA;
  }
}

export async function saveQuotesData(data: QuotesData): Promise<void> {
  await publishDraft(QUOTES_CONFIG_KEY, data);
}

export async function getSubmissions(): Promise<QuoteSubmission[]> {
  try {
    return await readPublished<QuoteSubmission[]>(SUBMISSIONS_KEY, []);
  } catch {
    return [];
  }
}

export async function saveSubmissions(submissions: QuoteSubmission[]): Promise<void> {
  await publishDraft(SUBMISSIONS_KEY, submissions);
}

export async function addSubmission(submission: QuoteSubmission): Promise<void> {
  await mutatePublished<QuoteSubmission[]>(SUBMISSIONS_KEY, [], (submissions) => [
    ...submissions,
    submission,
  ]);
}

export async function updateSubmissionStatus(
  id: string,
  status: QuoteSubmission["status"],
): Promise<boolean> {
  let updated = false;
  await mutatePublished<QuoteSubmission[]>(SUBMISSIONS_KEY, [], (submissions) =>
    submissions.map((submission) => {
      if (submission.id !== id) return submission;
      updated = true;
      return { ...submission, status };
    }),
  );
  return updated;
}

export async function updateSubmissionDelivery(
  id: string,
  delivery: NonNullable<QuoteSubmission["delivery"]>,
): Promise<boolean> {
  let updated = false;
  await mutatePublished<QuoteSubmission[]>(SUBMISSIONS_KEY, [], (submissions) =>
    submissions.map((submission) => {
      if (submission.id !== id) return submission;
      updated = true;
      return { ...submission, delivery };
    }),
  );
  return updated;
}

export async function pruneExpiredSubmissions(createdBefore: number): Promise<number> {
  let removed = 0;
  await mutatePublished<QuoteSubmission[]>(SUBMISSIONS_KEY, [], (submissions) => {
    const retained = submissions.filter((submission) => submission.createdAt >= createdBefore);
    removed = submissions.length - retained.length;
    return retained;
  });
  return removed;
}
