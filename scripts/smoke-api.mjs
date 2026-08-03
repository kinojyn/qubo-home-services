import { randomBytes } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close((error) => (error || !port ? reject(error) : resolve(port)));
    });
  });
}

async function waitForServer(origin, child, getLogs) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Smoke server stopped unexpectedly.\n${getLogs()}`);
    }
    try {
      const response = await fetch(`${origin}/api/settings`, {
        signal: AbortSignal.timeout(1_000),
      });
      if (response.ok) return;
    } catch {
      // The server is still compiling.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Smoke server did not become ready.\n${getLogs()}`);
}

const storageDirectory = await mkdtemp(join(tmpdir(), "qubo-smoke-"));
const port = await availablePort();
const origin = `http://localhost:${port}`;
const password = `Smoke-${randomBytes(18).toString("base64url")}Aa1!`;
const child = spawn(
  process.execPath,
  [join(process.cwd(), "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      ADMIN_INITIAL_PASSWORD: password,
      ADMIN_INITIAL_USERNAME: "smoke-admin",
      ADMIN_JWT_SECRET: randomBytes(48).toString("hex"),
      CONTENT_STORAGE_DIR: storageDirectory,
      WEB3FORMS_ACCESS_KEY: " ",
    },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

let logs = "";
for (const stream of [child.stdout, child.stderr]) {
  stream?.on("data", (chunk) => {
    logs = `${logs}${String(chunk)}`.slice(-12_000);
  });
}

try {
  await waitForServer(origin, child, () => logs);
  const sameOriginHeaders = {
    "Content-Type": "application/json",
    Origin: origin,
    "Sec-Fetch-Site": "same-origin",
  };
  const loginResponse = await fetch(`${origin}/api/auth/login`, {
    body: JSON.stringify({ password, username: "smoke-admin" }),
    headers: sameOriginHeaders,
    method: "POST",
  });
  if (!loginResponse.ok) {
    throw new Error(
      `Smoke login failed with ${loginResponse.status}: ${await loginResponse.text()}`,
    );
  }
  const sessionCookie = loginResponse.headers.get("set-cookie")?.split(";", 1)[0];
  if (!sessionCookie) throw new Error("Smoke login did not create a session cookie.");

  const quoteResponse = await fetch(`${origin}/api/quotes/submissions`, {
    body: JSON.stringify({
      answers: {},
      categoryId: "altro",
      consentAt: 0,
      customDescription: "Automated production-readiness smoke test",
      customRequest: true,
      customerInfo: {
        address: "Via Test 1",
        city: "Aiello del Friuli",
        email: "",
        name: "Test Produzione",
        notes: "",
        phone: "+390000000000",
      },
      localityId: "3183389",
      privacyConsent: true,
      privacyPolicyVersion: "2026-07-19",
      website: "",
    }),
    headers: sameOriginHeaders,
    method: "POST",
  });
  if (!quoteResponse.ok) throw new Error(`Smoke quote failed with ${quoteResponse.status}.`);

  const submissionsResponse = await fetch(`${origin}/api/quotes/submissions`, {
    headers: { Cookie: sessionCookie },
  });
  if (!submissionsResponse.ok) {
    throw new Error(`Smoke admin read failed with ${submissionsResponse.status}.`);
  }
  const submissions = await submissionsResponse.json();
  const saved = submissions[0];
  if (
    submissions.length !== 1 ||
    saved.privacyConsent !== true ||
    saved.privacyPolicyVersion !== "2026-07-19" ||
    saved.consentAt <= 0
  ) {
    throw new Error("Smoke quote was not stored with canonical consent evidence.");
  }

  console.log("API smoke test passed: admin login, quote storage, consent, and protected read.");
} finally {
  child.kill();
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 3_000)),
  ]);
  await rm(storageDirectory, { force: true, recursive: true });
}
