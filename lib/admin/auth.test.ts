import { afterEach, describe, expect, it, vi } from "vitest";

describe("admin JWT authentication", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("verifies a development token after the server module reloads", async () => {
    const firstRuntime = await import("./auth");
    const token = firstRuntime.createToken("admin");

    vi.resetModules();
    const reloadedRuntime = await import("./auth");

    expect(reloadedRuntime.verifyToken(token)).toMatchObject({ username: "admin" });
  });
});
