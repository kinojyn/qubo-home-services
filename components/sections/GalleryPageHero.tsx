"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Images } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { GALLERY_PAGE_CONTENT, GALLERY_PAGE_GUIDE_ITEMS } from "@/locales/gallery";

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: MOTION_SEQUENCES.hero },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "var(--ds-motion-distance-lg)" },
  visible: { opacity: 1, y: 0 },
};

export function GalleryPageHero() {
  const { locale } = useLocale();
  const content = GALLERY_PAGE_CONTENT[locale];
  const guideItems = GALLERY_PAGE_GUIDE_ITEMS[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.hero;

  return (
    <motion.section
      animate="visible"
      aria-describedby="gallery-page-description"
      aria-labelledby="gallery-page-title"
      className="bg-background-primary pb-20 pt-30 tablet:pb-24 tablet:pt-40 laptop:pb-30 laptop:pt-44"
      initial={false}
      variants={shouldReduceMotion ? undefined : CONTAINER_VARIANTS}
    >
      <Container size="wide">
        <motion.nav
          aria-label={content.breadcrumbLabel}
          className="mb-10 flex items-center gap-2 text-xs text-text-muted"
          transition={transition}
          variants={ITEM_VARIANTS}
        >
          <Link
            className="rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            href="/"
          >
            {content.breadcrumbHomeLabel}
          </Link>
          <ChevronRight aria-hidden="true" className="size-icon-sm" />
          <span aria-current="page" className="font-medium text-text-primary">
            {content.breadcrumbCurrentLabel}
          </span>
        </motion.nav>

        <div className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:items-end laptop:gap-8">
          <motion.div
            className="col-span-4 tablet:col-span-7 laptop:col-span-7"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.eyebrow}
            </p>
            <h1
              className="max-w-reading text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary tablet:text-5xl laptop:text-6xl"
              id="gallery-page-title"
            >
              {content.title}
            </h1>
            <p
              className="mt-6 max-w-reading text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg"
              id="gallery-page-description"
            >
              {content.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 mobile:flex-row">
              <ButtonLink
                className="group w-full mobile:w-auto"
                href={content.primaryCtaHref}
                trailingIcon={
                  <ArrowRight
                    aria-hidden="true"
                    className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                  />
                }
              >
                {content.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                className="w-full mobile:w-auto"
                href={content.secondaryCtaHref}
                variant="secondary"
              >
                {content.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </motion.div>

          <motion.aside
            aria-labelledby="gallery-guide-title"
            className="col-span-4 rounded-2xl bg-text-primary p-8 text-background-primary shadow-lg tablet:col-span-7 laptop:col-span-5 laptop:p-10"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <Images aria-hidden="true" className="size-icon-xl text-accent" />
            <p className="mt-6 text-label font-semibold tracking-wide text-accent uppercase">
              {content.guideEyebrow}
            </p>
            <h2 className="mt-5 font-heading text-2xl font-semibold" id="gallery-guide-title">
              {content.guideTitle}
            </h2>
            <ul aria-label={content.guideLabel} className="mt-8 grid gap-3">
              {guideItems.map((item) => (
                <li className="flex min-h-touch-target items-center gap-3 text-sm" key={item}>
                  <CheckCircle2 aria-hidden="true" className="size-icon-md shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </Container>
    </motion.section>
  );
}
