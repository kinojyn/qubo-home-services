import type { ContactRequestData } from "./schema";

const PREVIEW_DELAY_MS = 650;

export async function submitContactPreview(request: ContactRequestData) {
  void request;
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, PREVIEW_DELAY_MS);
  });
}
