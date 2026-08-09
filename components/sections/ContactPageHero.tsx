"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, ClipboardList, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { CONTACT_PAGE_CONTENT } from "@/locales/contact";

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: MOTION_SEQUENCES.hero },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "var(--ds-motion-distance-lg)" },
  visible: { opacity: 1, y: 0 },
};

export function ContactPageHero() {
  const { locale } = useLocale();
  const content = CONTACT_PAGE_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.hero;

  return (
    <motion.section
      animate="visible"
      aria-describedby="contact-page-description"
      aria-labelledby="contact-page-title"
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
              id="contact-page-title"
            >
              {content.title}
            </h1>
            <p
              className="mt-6 max-w-reading text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg"
              id="contact-page-description"
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
            aria-labelledby="contact-options-title"
            className="col-span-4 rounded-2xl bg-text-primary p-8 text-background-primary shadow-lg tablet:col-span-7 laptop:col-span-5 laptop:p-10"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="text-label font-semibold tracking-wide text-accent uppercase">
              {content.optionsEyebrow}
            </p>
            <h2 className="mt-5 font-heading text-2xl font-semibold" id="contact-options-title">
              {content.optionsTitle}
            </h2>

            <div className="mt-8 grid gap-6">
              <a
                className="group flex gap-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
                href={content.primaryCtaHref}
              >
                <MessageCircle
                  aria-hidden="true"
                  className="mt-1 size-icon-lg shrink-0 text-accent"
                />
                <span>
                  <span className="block text-sm font-semibold">{content.questionTitle}</span>
                  <span className="mt-1 block text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
                    {content.questionDescription}
                  </span>
                </span>
              </a>

              <Link
                className="group flex gap-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
                href={content.secondaryCtaHref}
              >
                <ClipboardList
                  aria-hidden="true"
                  className="mt-1 size-icon-lg shrink-0 text-accent"
                />
                <span>
                  <span className="block text-sm font-semibold">{content.estimateTitle}</span>
                  <span className="mt-1 block text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
                    {content.estimateDescription}
                  </span>
                </span>
              </Link>

              <div className="flex gap-4 border-t border-background-primary pt-6">
                <MapPin aria-hidden="true" className="mt-1 size-icon-lg shrink-0 text-accent" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                    {content.areaLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{content.areaName}</p>
                  <p className="mt-1 text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
                    {content.areaNote}
                  </p>
                </div>
              </div>
              <div className="grid gap-2 border-t border-background-primary pt-6 text-sm">
                <a
                  className="font-semibold text-background-primary underline decoration-accent underline-offset-4"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  className="break-all text-sm opacity-[var(--ds-opacity-muted)] underline decoration-accent underline-offset-4"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </motion.section>
  );
}
