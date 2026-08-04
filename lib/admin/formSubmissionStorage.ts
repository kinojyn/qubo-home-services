import type { ContactRequestData } from "@/features/contact";
import type { EstimateRequestData } from "@/features/estimate";
import { mutatePublished, readPublished } from "@/lib/admin/storage";

export type DeliveryStatus = "pending" | "delivered" | "failed";

export interface SubmissionDelivery {
  status: DeliveryStatus;
  attemptedAt?: number;
  error?: string;
}

export type StoredFormSubmission =
  | {
      id: string;
      createdAt: number;
      form: "contact";
      data: ContactRequestData;
      delivery: SubmissionDelivery;
    }
  | {
      id: string;
      createdAt: number;
      form: "estimate";
      data: EstimateRequestData;
      delivery: SubmissionDelivery;
    };

const SUBMISSIONS_KEY = "form-submissions";

export async function getFormSubmissions(): Promise<StoredFormSubmission[]> {
  return readPublished<StoredFormSubmission[]>(SUBMISSIONS_KEY, []);
}

export async function addFormSubmission(submission: StoredFormSubmission): Promise<void> {
  await mutatePublished<StoredFormSubmission[]>(SUBMISSIONS_KEY, [], (submissions) => [
    ...submissions,
    submission,
  ]);
}

export async function updateFormSubmissionDelivery(
  id: string,
  delivery: SubmissionDelivery,
): Promise<boolean> {
  let updated = false;
  await mutatePublished<StoredFormSubmission[]>(SUBMISSIONS_KEY, [], (submissions) =>
    submissions.map((submission) => {
      if (submission.id !== id) return submission;
      updated = true;
      return { ...submission, delivery };
    }),
  );
  return updated;
}
