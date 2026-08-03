"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { StarRating } from "@/components/ui/StarRating";
import { useLocale } from "@/contexts/LocaleContext";
import { TRUST_RATING_CONTENT } from "@/locales/trust";

interface HeroRatingData {
  averageRating: number;
  totalReviews: number;
  reviewSource: string;
}

export function HeroTrustRating() {
  const { locale } = useLocale();
  const content = TRUST_RATING_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const [data, setData] = useState<HeroRatingData | null>(null);
  const [displayRating, setDisplayRating] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const ratingLabel =
    locale === "it"
      ? `${displayRating.toFixed(1)} su 5 stelle`
      : locale === "en"
        ? `${displayRating.toFixed(1)} out of 5 stars`
        : `${displayRating.toFixed(1)} von 5 Sternen`;
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [settingsRes, reviewsRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/reviews"),
        ]);

        if (cancelled) return;

        const settings = settingsRes.ok ? await settingsRes.json() : {};
        const reviewsData = reviewsRes.ok ? await reviewsRes.json() : null;

        let avgRating = settings.heroRating ?? 0;
        let totalReviews = settings.heroReviewCount ?? 0;
        let source = settings.heroReviewSource ?? "";

        if (reviewsData && settings.reviewProvider === "manual" && reviewsData.reviews?.length) {
          const visible = reviewsData.reviews.filter(
            (r: { status: string }) => r.status === "visible",
          );
          totalReviews = visible.length;
          if (totalReviews > 0) {
            avgRating =
              Math.round(
                (visible.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
                  totalReviews) *
                  10,
              ) / 10;
          }
          source = content.reviewSource;
        }

        if (!source) {
          source = content.reviewSource;
        }

        if (!cancelled) setData({ averageRating: avgRating, totalReviews, reviewSource: source });
      } catch {
        if (!cancelled) {
          setData({
            averageRating: 4.9,
            totalReviews: 12,
            reviewSource: content.reviewSource,
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [content.reviewSource, locale]);

  useEffect(() => {
    if (!data) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const startTime = performance.now();
    const ratingTarget = data.averageRating;
    const countTarget = data.totalReviews;
    const duration = 1000;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayRating(eased * ratingTarget);
      setDisplayCount(Math.round(eased * countTarget));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayRating(ratingTarget);
        setDisplayCount(countTarget);
      }
    }

    if (shouldReduceMotion) {
      setDisplayRating(ratingTarget);
      setDisplayCount(countTarget);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [data, shouldReduceMotion]);

  if (!data || data.totalReviews === 0) return null;

  return (
    <motion.div
      className="inline-flex items-center gap-4 rounded-2xl border border-border-default/40 bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-5 py-3 shadow-xs backdrop-blur-sm transition-all duration-300 motion-safe:hover:translate-y-[-2px] motion-safe:hover:shadow-md"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <StarRating ariaLabel={ratingLabel} rating={displayRating} size={18} />
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-text-primary tabular-nums">
            {displayRating.toFixed(1)}
          </span>
          <span className="text-xs text-text-muted">/ 5</span>
        </div>
      </div>
      <div className="hidden h-6 w-px bg-border-default/30 sm:block" aria-hidden="true" />
      <div className="hidden sm:block">
        <p className="text-xs text-text-muted">
          {displayCount} {displayCount === 1 ? content.singular : content.plural}
        </p>
        <p className="text-[11px] text-text-muted/50">{data.reviewSource}</p>
      </div>
    </motion.div>
  );
}
