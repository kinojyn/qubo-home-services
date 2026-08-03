"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Review, ReviewBadge, ReviewProvider, ReviewStatus } from "@/types/reviews";
import { BADGE_LABELS, REVIEW_PROVIDER_OPTIONS } from "@/types/reviews";
import { DEFAULT_REVIEWS } from "@/data/reviews";
import { StarRating } from "@/components/ui/StarRating";
import { Copy, Eye, EyeOff, Pin, PinOff, Plus, Save, Search, Trash2, X } from "lucide-react";

type SortKey = "newest" | "oldest" | "highest" | "lowest";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [provider, setProvider] = useState<ReviewProvider>("manual");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [statusFilter, setStatusFilter] = useState<"all" | ReviewStatus>("all");

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Review>>({});

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews ?? []);
        setProvider(data.provider ?? "manual");
      } else {
        setReviews(DEFAULT_REVIEWS);
      }
    } catch {
      setReviews(DEFAULT_REVIEWS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveAll = useCallback(async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews, provider }),
      });
      if (res.ok) setMessage("Salvato");
      else setMessage("Errore salvataggio");
    } catch {
      setMessage("Errore salvataggio");
    } finally {
      setSaving(false);
    }
  }, [reviews, provider]);

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.service.toLowerCase().includes(q) ||
          r.text.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    result.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      switch (sort) {
        case "oldest":
          return a.createdAt - b.createdAt;
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return result;
  }, [reviews, search, sort, statusFilter]);

  function openAddForm() {
    setEditingReview(null);
    setFormData({
      id: "",
      name: "",
      city: "",
      service: "",
      rating: 5,
      text: "",
      date: new Date().toISOString().split("T")[0],
      status: "visible",
      pinned: false,
      badges: ["verified"],
      provider: "manual",
    });
    setShowForm(true);
  }

  function openEditForm(review: Review) {
    setEditingReview(review);
    setFormData({ ...review });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingReview(null);
    setFormData({});
  }

  function saveForm() {
    if (!formData.name || !formData.text) return;
    const now = Date.now();
    if (editingReview) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingReview.id ? ({ ...r, ...formData, updatedAt: now } as Review) : r,
        ),
      );
    } else {
      const review: Review = {
        id: `review-${now}-${Math.random().toString(36).slice(2, 7)}`,
        name: formData.name || "",
        city: formData.city || "",
        service: formData.service || "",
        rating: Math.min(5, Math.max(0.5, formData.rating ?? 5)),
        text: formData.text || "",
        date: formData.date || new Date().toISOString().split("T")[0],
        createdAt: now,
        updatedAt: now,
        status: formData.status ?? "visible",
        pinned: formData.pinned ?? false,
        badges: formData.badges ?? ["verified"],
        avatar: formData.avatar,
        provider: formData.provider ?? "manual",
      };
      setReviews((prev) => [review, ...prev]);
    }
    closeForm();
  }

  function deleteReview(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  function toggleStatus(id: string) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "visible" ? "hidden" : "visible" } : r,
      ),
    );
  }

  function togglePinned(id: string) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, pinned: !r.pinned } : r)));
  }

  function duplicateReview(id: string) {
    const target = reviews.find((r) => r.id === id);
    if (!target) return;
    const now = Date.now();
    const copy: Review = {
      ...target,
      id: `review-${now}-${Math.random().toString(36).slice(2, 7)}`,
      name: `${target.name} (copia)`,
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    setReviews((prev) => [copy, ...prev]);
  }

  function toggleBadge(badge: ReviewBadge) {
    setFormData((prev) => {
      const current = prev.badges ?? [];
      const next = current.includes(badge)
        ? current.filter((b) => b !== badge)
        : [...current, badge];
      return { ...prev, badges: next };
    });
  }

  if (loading) return <div className="p-6 text-zinc-500">Caricamento...</div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Recensioni</h1>
        <div className="flex gap-3">
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            <Plus size={16} /> Aggiungi
          </button>
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Salvataggio..." : "Salva"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            message === "Salvato" ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca recensioni..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | ReviewStatus)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 focus:border-amber-500 focus:outline-none"
        >
          <option value="all">Tutti</option>
          <option value="visible">Visibili</option>
          <option value="hidden">Nascosti</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 focus:border-amber-500 focus:outline-none"
        >
          <option value="newest">Più recenti</option>
          <option value="oldest">Più vecchi</option>
          <option value="highest">Valutazione alta</option>
          <option value="lowest">Valutazione bassa</option>
        </select>

        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as ReviewProvider)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-300 focus:border-amber-500 focus:outline-none"
        >
          {REVIEW_PROVIDER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredReviews.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-500">Nessuna recensione trovata.</p>
        )}

        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className={`rounded-xl border p-4 ${
              review.status === "hidden"
                ? "border-zinc-800/50 bg-zinc-900/50 opacity-60"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{review.name}</span>
                  {review.pinned && (
                    <span className="rounded bg-amber-600/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">
                      PINNATO
                    </span>
                  )}
                  {review.status === "hidden" && (
                    <span className="rounded bg-zinc-700 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                      NASCOSTO
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                  <span>{review.city}</span>
                  <span>{review.service}</span>
                  <span>{review.date}</span>
                  <span className="capitalize">{review.provider}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300 line-clamp-2">
                  {review.text}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <StarRating rating={review.rating} size={14} />
                  <span className="text-xs text-zinc-500">{review.rating}</span>
                </div>
                {review.badges.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {review.badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                      >
                        {BADGE_LABELS[badge]}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => openEditForm(review)}
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                  title="Modifica"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </button>
                <button
                  onClick={() => toggleStatus(review.id)}
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                  title={review.status === "visible" ? "Nascondi" : "Mostra"}
                >
                  {review.status === "visible" ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button
                  onClick={() => togglePinned(review.id)}
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                  title={review.pinned ? "Rimuovi pin" : "Pinna"}
                >
                  {review.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                </button>
                <button
                  onClick={() => duplicateReview(review.id)}
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
                  title="Duplica"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => deleteReview(review.id)}
                  className="rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-900/50 hover:text-red-300"
                  title="Elimina"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editingReview ? "Modifica recensione" : "Nuova recensione"}
              </h2>
              <button
                onClick={closeForm}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">
                    Nome cliente *
                  </label>
                  <input
                    value={formData.name ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Citta</label>
                  <input
                    value={formData.city ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                    placeholder="Udine"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Servizio</label>
                <input
                  value={formData.service ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="Riparazioni elettriche"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Valutazione</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={formData.rating ?? 5}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, rating: parseFloat(e.target.value) }))
                    }
                    className="flex-1 accent-amber-500"
                  />
                  <span className="w-8 text-sm font-medium text-zinc-300">
                    {formData.rating ?? 5}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const r = formData.rating ?? 5;
                      const filled = r >= star;
                      const half = !filled && r >= star - 0.5;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                          className="p-0.5"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <defs>
                              <clipPath id={`half-${star}`}>
                                <rect x="0" y="0" width="12" height="24" />
                              </clipPath>
                            </defs>
                            <path
                              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                              fill={
                                filled
                                  ? "var(--ds-color-accent)"
                                  : half
                                    ? "var(--ds-color-border-strong)"
                                    : "var(--ds-color-border-strong)"
                              }
                            />
                            {half && (
                              <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                fill="var(--ds-color-accent)"
                                clipPath={`url(#half-${star})`}
                              />
                            )}
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">
                  Testo recensione *
                </label>
                <textarea
                  value={formData.text ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, text: e.target.value }))}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  placeholder="Scrivi la recensione..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Data</label>
                  <input
                    type="date"
                    value={formData.date ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-400">Fornitore</label>
                  <select
                    value={formData.provider ?? "manual"}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, provider: e.target.value as ReviewProvider }))
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
                  >
                    {REVIEW_PROVIDER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.status === "visible"}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        status: e.target.checked ? "visible" : "hidden",
                      }))
                    }
                    className="accent-amber-500"
                  />
                  Visibile
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={formData.pinned ?? false}
                    onChange={(e) => setFormData((p) => ({ ...p, pinned: e.target.checked }))}
                    className="accent-amber-500"
                  />
                  In primo piano
                </label>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">Badge</label>
                <div className="flex flex-wrap gap-2">
                  {(["verified", "recommended", "emergency", "repeat", "new"] as ReviewBadge[]).map(
                    (badge) => (
                      <button
                        key={badge}
                        type="button"
                        onClick={() => toggleBadge(badge)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                          (formData.badges ?? []).includes(badge)
                            ? "border-amber-600 bg-amber-600/20 text-amber-400"
                            : "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                        }`}
                      >
                        {BADGE_LABELS[badge]}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={saveForm}
                  className="flex-1 rounded-lg bg-amber-600 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
                >
                  {editingReview ? "Salva modifiche" : "Aggiungi recensione"}
                </button>
                <button
                  onClick={closeForm}
                  className="rounded-lg border border-zinc-700 px-6 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800"
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
