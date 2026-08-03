"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ServicesHouse } from "@/components/sections/ServicesHouse";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { SERVICES_PAGE_CONTENT } from "@/locales/servicesPage";

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: MOTION_SEQUENCES.hero },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "var(--ds-motion-distance-lg)" },
  visible: { opacity: 1, y: 0 },
};

export function ServicesPageHero() {
  const { locale } = useLocale();
  const content = SERVICES_PAGE_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.hero;

  return (
    <motion.section
      animate="visible"
      aria-describedby="services-page-description"
      aria-labelledby="services-page-title"
      className="bg-background-primary pb-20 pt-30 tablet:pb-24 tablet:pt-40 laptop:pb-30 laptop:pt-44"
      initial={false}
      variants={shouldReduceMotion ? undefined : CONTAINER_VARIANTS}
    >
      <Container size="wide">
        <div className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:items-end laptop:gap-8">
          <motion.div
            className="col-span-4 tablet:col-span-5 laptop:col-span-6"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
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

            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.eyebrow}
            </p>
            <h1
              className="max-w-reading text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary tablet:text-5xl laptop:text-6xl"
              id="services-page-title"
            >
              {content.title}
            </h1>
            <p
              className="mt-6 max-w-reading text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg"
              id="services-page-description"
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

          <motion.div
            className="col-span-4 tablet:col-span-3 laptop:col-span-6"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <ServicesHouse />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
