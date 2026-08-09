"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReviewProvider } from "@/types/reviews";
import { REVIEW_PROVIDER_OPTIONS } from "@/types/reviews";

const REVIEW_SOURCE_OPTIONS = [
  { value: "Recensioni clienti", label: "Recensioni clienti" },
  { value: "Google Reviews", label: "Google Reviews" },
  { value: "Recensioni dal sito", label: "Recensioni dal sito" },
  { value: "Trustpilot", label: "Trustpilot" },
];

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsMessage, setSettingsMessage] = useState("");

  const [reviewProvider, setReviewProvider] = useState<ReviewProvider>("manual");
  const [reviewProviderMessage, setReviewProviderMessage] = useState("");

  const [heroRating, setHeroRating] = useState("0");
  const [heroReviewCount, setHeroReviewCount] = useState("0");
  const [heroReviewSource, setHeroReviewSource] = useState("Recensioni clienti");
  const [heroReviewMessage, setHeroReviewMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setWhatsappNumber(data.whatsappNumber ?? "393201391900");
          setReviewProvider(data.reviewProvider ?? "manual");
          setHeroRating(String(data.heroRating ?? 0));
          setHeroReviewCount(String(data.heroReviewCount ?? 0));
          setHeroReviewSource(data.heroReviewSource ?? "Recensioni clienti");
        }
      } catch {
        /* keep default */
      } finally {
        setSettingsLoading(false);
      }
    }
    load();
  }, []);

  const handleChangePassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setMessage("");
      if (password !== confirm) {
        setMessage("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setMessage("Password must be at least 6 characters");
        return;
      }
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setMessage("Password changed successfully");
        setPassword("");
        setConfirm("");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to change password");
      }
    },
    [password, confirm],
  );

  const handleSaveWhatsApp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSettingsMessage("");
      try {
        const res = await fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ whatsappNumber }),
        });
        if (res.ok) {
          setSettingsMessage("WhatsApp number saved successfully");
        } else {
          const data = await res.json();
          setSettingsMessage(data.error || "Failed to save");
        }
      } catch {
        setSettingsMessage("Failed to save settings");
      }
    },
    [whatsappNumber],
  );

  const handleSaveReviewProvider = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setReviewProviderMessage("");
      try {
        const res = await fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reviewProvider }),
        });
        if (res.ok) {
          setReviewProviderMessage("Review provider saved successfully");
        } else {
          const data = await res.json();
          setReviewProviderMessage(data.error || "Failed to save");
        }
      } catch {
        setReviewProviderMessage("Failed to save settings");
      }
    },
    [reviewProvider],
  );

  const handleSaveHeroReview = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setHeroReviewMessage("");
      const rating = parseFloat(heroRating);
      const count = parseInt(heroReviewCount, 10);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        setHeroReviewMessage("Rating must be between 0 and 5");
        return;
      }
      if (isNaN(count) || count < 0) {
        setHeroReviewMessage("Review count must be a positive number");
        return;
      }
      try {
        const res = await fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            heroRating: rating,
            heroReviewCount: count,
            heroReviewSource,
          }),
        });
        if (res.ok) {
          setHeroReviewMessage("Hero review settings saved successfully");
        } else {
          const data = await res.json();
          setHeroReviewMessage(data.error || "Failed to save");
        }
      } catch {
        setHeroReviewMessage("Failed to save settings");
      }
    },
    [heroRating, heroReviewCount, heroReviewSource],
  );

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>

      <div className="mb-8 max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-medium text-white">Emergency WhatsApp Number</h2>
        <p className="mb-4 text-sm text-zinc-400">
          This number is used by all &quot;Aiuto Urgente&quot; buttons across the website. Enter the
          full number including country code (e.g. 393201391900).
        </p>

        {settingsLoading ? (
          <p className="text-sm text-zinc-500">Loading...</p>
        ) : (
          <form onSubmit={handleSaveWhatsApp} className="space-y-4">
            <div>
              <label
                htmlFor="whatsappNumber"
                className="mb-1 block text-sm font-medium text-zinc-300"
              >
                WhatsApp Number
              </label>
              <input
                id="whatsappNumber"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="393201391900"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
            {settingsMessage && (
              <div
                className={`rounded-lg px-4 py-2 text-sm ${
                  settingsMessage.includes("successfully")
                    ? "bg-green-900/50 text-green-300"
                    : "bg-red-900/50 text-red-300"
                }`}
              >
                {settingsMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-500"
            >
              Save WhatsApp Number
            </button>
          </form>
        )}
      </div>

      <div className="mb-8 max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-medium text-white">Review Provider</h2>
        <p className="mb-4 text-sm text-zinc-400">
          Choose how reviews are sourced. &quot;Google Reviews&quot; and &quot;Both&quot; modes will
          display Google Reviews alongside manual entries once the Google API is configured.
        </p>

        <form onSubmit={handleSaveReviewProvider} className="space-y-4">
          <div>
            <label
              htmlFor="reviewProvider"
              className="mb-1 block text-sm font-medium text-zinc-300"
            >
              Source
            </label>
            <select
              id="reviewProvider"
              value={reviewProvider}
              onChange={(e) => setReviewProvider(e.target.value as ReviewProvider)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {REVIEW_PROVIDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {reviewProviderMessage && (
            <div
              className={`rounded-lg px-4 py-2 text-sm ${
                reviewProviderMessage.includes("successfully")
                  ? "bg-green-900/50 text-green-300"
                  : "bg-red-900/50 text-red-300"
              }`}
            >
              {reviewProviderMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-500"
          >
            Save Review Provider
          </button>
        </form>
      </div>

      <div className="mb-8 max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-medium text-white">Hero Trust Rating</h2>
        <p className="mb-4 text-sm text-zinc-400">
          Configure the trust rating card displayed in the Hero section. When using manual reviews,
          the rating and count are automatically calculated from visible reviews.
        </p>

        <form onSubmit={handleSaveHeroReview} className="space-y-4">
          <div>
            <label htmlFor="heroRating" className="mb-1 block text-sm font-medium text-zinc-300">
              Average Rating (0–5)
            </label>
            <input
              id="heroRating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={heroRating}
              onChange={(e) => setHeroRating(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div>
            <label
              htmlFor="heroReviewCount"
              className="mb-1 block text-sm font-medium text-zinc-300"
            >
              Number of Reviews
            </label>
            <input
              id="heroReviewCount"
              type="number"
              min={0}
              step={1}
              value={heroReviewCount}
              onChange={(e) => setHeroReviewCount(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <div>
            <label
              htmlFor="heroReviewSource"
              className="mb-1 block text-sm font-medium text-zinc-300"
            >
              Review Source Label
            </label>
            <select
              id="heroReviewSource"
              value={heroReviewSource}
              onChange={(e) => setHeroReviewSource(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {REVIEW_SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {heroReviewMessage && (
            <div
              className={`rounded-lg px-4 py-2 text-sm ${
                heroReviewMessage.includes("successfully")
                  ? "bg-green-900/50 text-green-300"
                  : "bg-red-900/50 text-red-300"
              }`}
            >
              {heroReviewMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-500"
          >
            Save Hero Review Settings
          </button>
        </form>
      </div>

      <div className="max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-4 text-lg font-medium text-white">Change Password</h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-300">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-zinc-300">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
              minLength={6}
            />
          </div>
          {message && (
            <div
              className={`rounded-lg px-4 py-2 text-sm ${
                message.includes("successfully")
                  ? "bg-green-900/50 text-green-300"
                  : "bg-red-900/50 text-red-300"
              }`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-500"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
