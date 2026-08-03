import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";

import robots, { createRobotsFile } from "./robots";

describe("robots", () => {
  it("prevents non-production indexing and exposes production discovery URLs", () => {
    const privateDirectives = createRobotsFile(false);
    const publicDirectives = createRobotsFile(true);

    expect(privateDirectives.rules).toEqual({ userAgent: "*", disallow: "/" });
    expect(privateDirectives.sitemap).toBeUndefined();
    expect(publicDirectives.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(publicDirectives.sitemap).toBe(new URL("/sitemap.xml", siteConfig.url).toString());
    expect(publicDirectives.host).toBe(siteConfig.url);
    expect(robots()).toEqual(createRobotsFile(siteConfig.isIndexable));
  });
});
