"use client";

import { useCallback, useEffect, useState } from "react";
import { QuoteCategory, QuotesData } from "@/types/quotes";
import { GripVertical, Plus, Save, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const [data, setData] = useState<QuotesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/quotes/config");
      if (res.ok) setData(await res.json());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/quotes/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setMessage("Saved successfully");
      else setMessage("Failed to save");
    } catch {
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const updateCategory = (index: number, field: keyof QuoteCategory, value: string | number) => {
    if (!data) return;
    const updated = { ...data };
    updated.categories = updated.categories.map((c, i) =>
      i === index ? { ...c, [field]: value } : c,
    );
    setData(updated);
  };

  const addCategory = () => {
    if (!data) return;
    const updated = { ...data };
    updated.categories = [
      ...updated.categories,
      { id: "", name: "", icon: "Wrench", order: updated.categories.length },
    ];
    setData(updated);
  };

  const removeCategory = (index: number) => {
    if (!data) return;
    const updated = { ...data };
    updated.categories = updated.categories.filter((_, i) => i !== index);
    setData(updated);
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    if (!data) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= data.categories.length) return;
    const updated = { ...data };
    const items = [...updated.categories];
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    updated.categories = items.map((c, i) => ({ ...c, order: i }));
    setData(updated);
  };

  if (loading) return <div className="p-6 text-zinc-500">Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <div className="flex gap-3">
          <button
            onClick={addCategory}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            <Plus size={16} /> Add Category
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            message.includes("successfully")
              ? "bg-green-900/50 text-green-300"
              : "bg-red-900/50 text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-3">
        {data?.categories.map((cat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveCategory(i, -1)}
                className="text-zinc-500 hover:text-zinc-300"
                disabled={i === 0}
              >
                <GripVertical size={14} />
              </button>
            </div>

            <input
              value={cat.name}
              onChange={(e) => updateCategory(i, "name", e.target.value)}
              placeholder="Category name"
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />

            <input
              value={cat.icon}
              onChange={(e) => updateCategory(i, "icon", e.target.value)}
              placeholder="Icon name"
              className="w-36 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />

            <input
              type="number"
              value={cat.order}
              onChange={(e) => updateCategory(i, "order", parseInt(e.target.value) || 0)}
              className="w-20 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            />

            <button onClick={() => removeCategory(i)} className="text-red-400 hover:text-red-300">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
