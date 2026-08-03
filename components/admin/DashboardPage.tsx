"use client";

import Link from "next/link";
import { useAdmin } from "@/contexts/AdminContext";

export function DashboardPage() {
  const { draft, publish } = useAdmin();

  if (!draft) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  const homeSections = draft.home.sections;

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Last updated: {new Date(draft.meta.updatedAt).toLocaleString("it-IT")}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={publish}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
          >
            Publish Changes
          </button>
          <Link
            href="/admin/editor"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            Open Editor
          </Link>
        </div>
      </div>

      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {homeSections.map((section) => (
          <div
            key={section.id}
            className={`rounded-xl border p-4 ${
              section.visible
                ? "border-zinc-800 bg-zinc-900"
                : "border-zinc-800/50 bg-zinc-900/50 opacity-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium capitalize text-white">{section.id}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  section.visible ? "bg-green-900/50 text-green-400" : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {section.visible ? "Visible" : "Hidden"}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">Order: {section.order}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <h2 className="mb-2 text-sm font-medium text-white">Quick Actions</h2>
        <div className="grid gap-2 tablet:grid-cols-2 laptop:grid-cols-4">
          <Link
            href="/admin/editor"
            className="rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-amber-600/50 hover:text-amber-400"
          >
            ✎ Edit Homepage
          </Link>
          <Link
            href="/admin/media"
            className="rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-amber-600/50 hover:text-amber-400"
          >
            ▣ Media Library
          </Link>
          <Link
            href="/admin/versions"
            className="rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-amber-600/50 hover:text-amber-400"
          >
            ↺ View History
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-300 transition-colors hover:border-amber-600/50 hover:text-amber-400"
          >
            ↗ View Site
          </a>
        </div>
      </div>
    </div>
  );
}
