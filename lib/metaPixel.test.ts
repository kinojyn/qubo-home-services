import { afterEach, describe, expect, it } from "vitest";

import { META_PIXEL_ID, updateMetaPixel } from "./metaPixel";

function queued() {
  return (window as unknown as { fbq: { queue: unknown[][] } }).fbq.queue;
}

afterEach(() => {
  for (const key of ["fbq", "_fbq", "quboPixelState"]) Reflect.deleteProperty(window, key);
  document.getElementById("qubo-meta-pixel")?.remove();
});

describe("Meta marketing consent", () => {
  it("does not load tracking before consent, after rejection or on an admin page", () => {
    updateMetaPixel(false, "/pubblicita");
    updateMetaPixel(true, "/admin/requests");
    expect("fbq" in window).toBe(false);
    expect(document.querySelector('script[src*="facebook.net"]')).toBeNull();
  });

  it("initializes the correct pixel once and counts SPA page changes without double counting", () => {
    updateMetaPixel(true, "/pubblicita");
    updateMetaPixel(true, "/pubblicita");
    updateMetaPixel(true, "/services");
    expect(queued().filter(([name]) => name === "init")).toEqual([["init", META_PIXEL_ID]]);
    expect(queued().filter(([name]) => name === "trackSingle")).toEqual([
      ["trackSingle", META_PIXEL_ID, "PageView"],
      ["trackSingle", META_PIXEL_ID, "PageView"],
    ]);
    expect(document.querySelectorAll("#qubo-meta-pixel")).toHaveLength(1);
  });

  it("withdraws consent, clears pending events and cookies, and can grant it again", () => {
    updateMetaPixel(true, "/pubblicita");
    document.cookie = "_fbp=test; path=/";
    updateMetaPixel(false, "/pubblicita");
    expect(queued().at(-1)).toEqual(["consent", "revoke"]);
    expect(queued().some(([name]) => String(name).startsWith("track"))).toBe(false);
    expect(document.cookie).not.toContain("_fbp=");
    updateMetaPixel(true, "/pubblicita");
    expect(queued().filter(([name]) => name === "init")).toHaveLength(1);
    expect(queued().at(-1)).toEqual(["trackSingle", META_PIXEL_ID, "PageView"]);
  });
});
