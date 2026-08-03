import type { EstimateRequestData } from "./schema";

const PREVIEW_DELAY_MS = 650;

export async function submitEstimatePreview(request: EstimateRequestData) {
  void request;
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, PREVIEW_DELAY_MS);
  });
}
