"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function MediaPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    const res = await fetch("/api/media");
    if (res.ok) setFiles(await res.json());
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/media", { method: "POST", body: formData });
    setUploading(false);
    loadFiles();
  }

  async function handleDelete(filename: string) {
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    loadFiles();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Media Library</h1>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {files.length === 0 ? (
        <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 p-16">
          <p className="text-zinc-500">No media files yet. Upload an image to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 tablet:grid-cols-3 laptop:grid-cols-4">
          {files.map((filename) => (
            <div
              key={filename}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            >
              <div className="aspect-square overflow-hidden bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/media/file/${filename}`}
                  alt={filename}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-xs text-zinc-400">{filename}</p>
              </div>
              <button
                onClick={() => handleDelete(filename)}
                className="absolute right-2 top-2 rounded bg-red-900/80 px-2 py-1 text-xs text-red-300 opacity-0 transition-opacity group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
