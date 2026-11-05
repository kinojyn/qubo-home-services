import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { CookiePreferences } from "@/contexts/CookieContext";

import { trackAdvertisingClick } from "./analytics";

const { track } = vi.hoisted(() => ({ track: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track }));

const rejected: CookiePreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
  statistics: false,
};

describe("advertising click events", () => {
  const fbq = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "fbq", { configurable: true, value: fbq });
  });

  afterEach(() => {
    Reflect.deleteProperty(window, "fbq");
  });

  it("sends nothing before consent or after rejection", () => {
    trackAdvertisingClick("whatsapp_click", {
      hasInteracted: false,
      preferences: { ...rejected, analytics: true, marketing: true },
    });
    trackAdvertisingClick("website_click", { hasInteracted: true, preferences: rejected });
    expect(track).not.toHaveBeenCalled();
    expect(fbq).not.toHaveBeenCalled();
  });

  it.each(["whatsapp_click", "website_click"] as const)(
    "sends %s to the existing analytics with fixed, non-personal properties",
    (event) => {
      trackAdvertisingClick(event, {
        hasInteracted: true,
        preferences: { ...rejected, analytics: true },
      });
      expect(track).toHaveBeenCalledExactlyOnceWith(event, { page: "/pubblicita" });
      expect(fbq).not.toHaveBeenCalled();
    },
  );

  it("reuses an existing Pixel only with marketing consent and reports Contact, never Lead", () => {
    trackAdvertisingClick("whatsapp_click", {
      hasInteracted: true,
      preferences: { ...rejected, marketing: true },
    });
    expect(track).not.toHaveBeenCalled();
    expect(fbq.mock.calls).toEqual([
      ["trackCustom", "whatsapp_click", { page: "/pubblicita" }],
      ["track", "Contact", { page: "/pubblicita" }],
    ]);
  });

  it("does not create a Pixel when none is installed", () => {
    Reflect.deleteProperty(window, "fbq");
    trackAdvertisingClick("whatsapp_click", {
      hasInteracted: true,
      preferences: { ...rejected, marketing: true },
    });
    expect("fbq" in window).toBe(false);
  });

  it("does not report Contact for a website visit", () => {
    trackAdvertisingClick("website_click", {
      hasInteracted: true,
      preferences: { ...rejected, marketing: true },
    });
    expect(fbq).toHaveBeenCalledExactlyOnceWith("trackCustom", "website_click", {
      page: "/pubblicita",
    });
  });

  it("does not let a provider error block navigation", () => {
    track.mockImplementationOnce(() => {
      throw new Error("analytics unavailable");
    });
    fbq.mockImplementationOnce(() => {
      throw new Error("pixel unavailable");
    });
    expect(() =>
      trackAdvertisingClick("whatsapp_click", {
        hasInteracted: true,
        preferences: { ...rejected, analytics: true, marketing: true },
      }),
    ).not.toThrow();
  });
});
