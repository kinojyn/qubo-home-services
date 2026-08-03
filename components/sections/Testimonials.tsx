"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Quote, ShieldCheck, Star } from "lucide-react";
import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StarRating } from "@/components/ui/StarRating";
import { BADGE_LABELS } from "@/types/reviews";
import type { Review, ReviewBadge } from "@/types/reviews";
import type { Locale } from "@/types/locale";
import { MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { TESTIMONIALS_CONTENT } from "@/locales/testimonials";
import { DEFAULT_REVIEWS } from "@/data/reviews";

const ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: "var(--ds-motion-distance-lg)",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const BADGE_COLORS: Record<ReviewBadge, string> = {
  verified: "bg-accent/10 text-accent",
  recommended: "bg-success/10 text-success",
  emergency: "bg-warning/10 text-warning",
  repeat: "bg-info/10 text-info",
  new: "bg-background-secondary text-text-muted",
};

const BADGE_LABELS_BY_LOCALE: Record<Locale, Record<ReviewBadge, string>> = {
  it: BADGE_LABELS,
  en: {
    verified: "Verified customer",
    recommended: "Recommended",
    emergency: "Emergency service",
    repeat: "Returning customer",
    new: "New",
  },
  de: {
    verified: "Verifizierter Kunde",
    recommended: "Empfohlen",
    emergency: "Notdienst",
    repeat: "Stammkunde",
    new: "Neu",
  },
};

function getRelativeDate(dateStr: string, locale: Locale): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffDays = Math.round((now - then) / 86400000);
  const translations: Record<Locale, Record<string, string>> = {
    it: {
      day: "giorno",
      days: "giorni",
      month: "mese",
      months: "mesi",
      year: "anno",
      years: "anni",
    },
    en: {
      day: "day",
      days: "days",
      month: "month",
      months: "months",
      year: "year",
      years: "years",
    },
    de: {
      day: "Tag",
      days: "Tage",
      month: "Monat",
      months: "Monate",
      year: "Jahr",
      years: "Jahre",
    },
  };
  const t = translations[locale];
  const ago = locale === "it" ? "fa" : locale === "en" ? "ago" : "vor";
  if (diffDays < 30)
    return locale === "de"
      ? `${ago} ${diffDays} ${diffDays === 1 ? t.day : t.days}`
      : `${diffDays} ${diffDays === 1 ? t.day : t.days} ${ago}`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12)
    return locale === "de"
      ? `${ago} ${diffMonths} ${diffMonths === 1 ? t.month : t.months}`
      : `${diffMonths} ${diffMonths === 1 ? t.month : t.months} ${ago}`;
  const diffYears = Math.floor(diffMonths / 12);
  return locale === "de"
    ? `${ago} ${diffYears} ${diffYears === 1 ? t.year : t.years}`
    : `${diffYears} ${diffYears === 1 ? t.year : t.years} ${ago}`;
}

export function Testimonials() {
  const { locale } = useLocale();
  const content = TESTIMONIALS_CONTENT[locale];
  const carouselRef = useRef<HTMLUListElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  // Render a verified fallback immediately so the section is useful before the
  // client-side API request completes (or if client hydration is delayed).
  // The request below replaces these with the reviews saved from the admin area.
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortFilter, setSortFilter] = useState<"newest" | "oldest" | "highest">("newest");
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews ?? []);
        } else {
          setReviews(DEFAULT_REVIEWS);
        }
      } catch {
        setReviews(DEFAULT_REVIEWS);
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  const visibleReviews = useMemo(() => reviews.filter((r) => r.status === "visible"), [reviews]);

  const serviceOptions = useMemo(() => {
    const set = new Set(visibleReviews.map((r) => r.service));
    return Array.from(set).sort();
  }, [visibleReviews]);

  const filteredReviews = useMemo(() => {
    const result = visibleReviews.filter(
      (r) => (serviceFilter === "all" || r.service === serviceFilter) && r.rating >= ratingFilter,
    );

    result.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      switch (sortFilter) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [visibleReviews, serviceFilter, ratingFilter, sortFilter]);

  const averageRating = useMemo(() => {
    if (visibleReviews.length === 0) return 0;
    const sum = visibleReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / visibleReviews.length) * 10) / 10;
  }, [visibleReviews]);

  const totalReviews = visibleReviews.length;

  const updatePagination = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel || carousel.clientWidth === 0) return;
    const nextPageCount = Math.max(1, Math.ceil(carousel.scrollWidth / carousel.clientWidth));
    const nextCurrentPage = Math.min(
      nextPageCount,
      Math.max(1, Math.round(carousel.scrollLeft / carousel.clientWidth) + 1),
    );
    setPageCount(nextPageCount);
    setCurrentPage(nextCurrentPage);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    updatePagination();
    carousel.addEventListener("scroll", updatePagination, { passive: true });
    window.addEventListener("resize", updatePagination);
    return () => {
      carousel.removeEventListener("scroll", updatePagination);
      window.removeEventListener("resize", updatePagination);
    };
  }, [updatePagination, filteredReviews.length]);

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      left: direction * carousel.clientWidth,
    });
  }

  function handleCarouselKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1);
    }
  }

  return (
    <Section
      aria-labelledby="testimonials-title"
      className="premium-section premium-section-testimonials"
      id="recensioni"
      spacing="xl"
      surface="secondary"
    >
      <Container size="wide">
        <motion.div
          className="flex flex-col gap-8 tablet:flex-row tablet:items-end tablet:justify-between"
          initial={false}
          transition={transition}
          variants={ITEM_VARIANTS}
          viewport={{ amount: 0.3, once: true }}
          whileInView="visible"
        >
          <div className="max-w-reading">
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="testimonials-title"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <Button
              aria-label={content.previousLabel}
              className="border border-border-strong bg-surface"
              disabled={currentPage <= 1}
              leadingIcon={<ChevronLeft aria-hidden="true" className="size-icon-md" />}
              onClick={() => moveCarousel(-1)}
              variant="icon"
            />
            <Button
              aria-label={content.nextLabel}
              className="border border-border-strong bg-surface"
              disabled={currentPage >= pageCount}
              leadingIcon={<ChevronRight aria-hidden="true" className="size-icon-md" />}
              onClick={() => moveCarousel(1)}
              variant="icon"
            />
          </div>
        </motion.div>

        {loaded && totalReviews > 0 && (
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border-default bg-surface p-5 shadow-xs tablet:p-6"
            initial={false}
            transition={transition}
            variants={ITEM_VARIANTS}
            viewport={{ amount: 0.3, once: true }}
            whileInView="visible"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-accent">
                <Star size={22} fill="var(--ds-color-accent)" strokeWidth={0} />
                <span className="text-xl font-bold text-text-primary">{averageRating}</span>
              </span>
              <div className="text-sm">
                <StarRating
                  ariaLabel={
                    locale === "it"
                      ? `${averageRating} su 5 stelle`
                      : locale === "en"
                        ? `${averageRating} out of 5 stars`
                        : `${averageRating} von 5 Sternen`
                  }
                  rating={averageRating}
                  size={14}
                />
                <p className="mt-0.5 text-text-muted">{content.reviewCount(totalReviews)}</p>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-divider sm:block" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <select
                aria-label={content.serviceFilterLabel}
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="rounded-lg border border-border-default bg-background-secondary px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">{content.allServicesLabel}</option>
                {serviceOptions.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc}
                  </option>
                ))}
              </select>

              <select
                aria-label={content.ratingFilterLabel}
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="rounded-lg border border-border-default bg-background-secondary px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value={0}>{content.allRatingsLabel}</option>
                <option value={4}>{content.ratingOption(4)}</option>
                <option value={3}>{content.ratingOption(3)}</option>
                <option value={2}>{content.ratingOption(2)}</option>
              </select>

              <select
                aria-label={content.sortLabel}
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value as "newest" | "oldest" | "highest")}
                className="rounded-lg border border-border-default bg-background-secondary px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="newest">{content.sortNewest}</option>
                <option value="oldest">{content.sortOldest}</option>
                <option value="highest">{content.sortHighest}</option>
              </select>
            </div>
          </motion.div>
        )}

        {!loaded && (
          <p className="mt-8 rounded-lg bg-warning-surface px-6 py-4 text-xs leading-relaxed text-warning">
            {content.notice}
          </p>
        )}

        <div
          aria-label={content.listLabel}
          aria-roledescription="carousel"
          className="mt-8 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          onKeyDown={handleCarouselKeyDown}
          role="region"
          tabIndex={0}
        >
          {filteredReviews.length === 0 ? (
            <p className="py-12 text-center text-sm text-text-muted">{content.noReviewsLabel}</p>
          ) : (
            <ul
              className="-mx-3 flex snap-x snap-mandatory overflow-x-auto scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden laptop:-mx-4"
              ref={carouselRef}
            >
              {filteredReviews.map((review) => (
                <motion.li
                  className="w-full shrink-0 snap-start px-3 tablet:w-1/2 laptop:w-1/3 laptop:px-4"
                  initial={false}
                  key={review.id}
                  transition={transition}
                  variants={ITEM_VARIANTS}
                  viewport={{ amount: 0.35, once: true }}
                  whileInView="visible"
                >
                  <article className="premium-card premium-testimonial-card flex h-full min-h-[var(--ds-size-card-compact)] flex-col rounded-2xl bg-surface p-8 shadow-sm transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-card-elevation)] motion-safe:hover:shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                      <Quote aria-hidden="true" className="size-icon-xl shrink-0 text-accent" />
                      <StarRating
                        ariaLabel={
                          locale === "it"
                            ? `${review.rating} su 5 stelle`
                            : locale === "en"
                              ? `${review.rating} out of 5 stars`
                              : `${review.rating} von 5 Sternen`
                        }
                        rating={review.rating}
                        size={16}
                      />
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                      {review.text}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center gap-2 font-medium text-text-primary">
                        <span>{review.name}</span>
                        <span aria-hidden="true" className="text-text-muted">
                          /
                        </span>
                        <span className="flex items-center gap-1 text-sm font-normal text-text-muted">
                          <MapPin size={12} aria-hidden="true" />
                          {review.city}
                        </span>
                      </div>

                      <p className="mt-0.5 text-xs text-text-muted">
                        {review.service} &middot; {getRelativeDate(review.date, locale)}
                      </p>

                      {review.badges.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {review.badges.map((badge) => (
                            <span
                              key={badge}
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-relaxed ${BADGE_COLORS[badge]}`}
                            >
                              <ShieldCheck size={11} aria-hidden="true" />
                              {BADGE_LABELS_BY_LOCALE[locale][badge]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <p aria-live="polite" className="sr-only">
          {content.listLabel} &mdash; {content.pageInfo(currentPage, pageCount)}
        </p>
      </Container>
    </Section>
  );
}
