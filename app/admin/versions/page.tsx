"use client";

import { useCallback, useEffect, useState } from "react";
import type { VersionRecord } from "@/types/admin";

export default function VersionsPage() {
  const [versions, setVersions] = useState<VersionRecord[]>([]);
  const [restoring, setRestoring] = useState<string | null>(null);

  const loadVersions = useCallback(async () => {
    const res = await fetch("/api/versions");
    if (res.ok) setVersions(await res.json());
  }, []);

  useEffect(() => {
    loadVersions();
  }, [loadVersions]);

  async function handleRestore(id: string) {
    setRestoring(id);
    await fetch("/api/versions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setRestoring(null);
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Version History</h1>

      {versions.length === 0 ? (
        <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 p-16">
          <p className="text-zinc-500">No versions yet. Publish to create a version.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...versions].reverse().map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div>
                <p className="font-medium text-white">{v.label}</p>
                <p className="mt-1 text-sm text-zinc-400">
                  by {v.user} &middot; {new Date(v.timestamp).toLocaleString("it-IT")}
                </p>
              </div>
              <button
                onClick={() => handleRestore(v.id)}
                disabled={restoring === v.id}
                className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
              >
                {restoring === v.id ? "Restoring..." : "Restore"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
