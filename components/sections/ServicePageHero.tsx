"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SERVICE_SHOWCASE_IMAGES } from "@/constants/serviceShowcase";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import type { ServiceDetail } from "@/features/services";
import { SERVICE_DETAIL_CONTENT } from "@/locales/serviceDetail";

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: MOTION_SEQUENCES.hero },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "var(--ds-motion-distance-lg)" },
  visible: { opacity: 1, y: 0 },
};

type ServicePageHeroProps = {
  service: ServiceDetail;
};

export function ServicePageHero({ service }: ServicePageHeroProps) {
  const { locale } = useLocale();
  const content = SERVICE_DETAIL_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.hero;

  return (
    <motion.section
      animate="visible"
      aria-describedby="service-page-description"
      aria-labelledby="service-page-title"
      className="bg-background-primary pb-20 pt-30 tablet:pb-24 tablet:pt-40 laptop:pb-30 laptop:pt-44"
      initial={false}
      variants={shouldReduceMotion ? undefined : CONTAINER_VARIANTS}
    >
      <Container size="wide">
        <motion.nav
          aria-label={content.breadcrumbLabel}
          className="mb-10 flex flex-wrap items-center gap-2 text-xs text-text-muted"
          transition={transition}
          variants={ITEM_VARIANTS}
        >
          <Link
            className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            href="/"
          >
            {content.breadcrumbHomeLabel}
          </Link>
          <ChevronRight aria-hidden="true" className="size-icon-sm" />
          <Link
            className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            href="/services"
          >
            {content.breadcrumbServicesLabel}
          </Link>
          <ChevronRight aria-hidden="true" className="size-icon-sm" />
          <span aria-current="page" className="font-medium text-text-primary">
            {service.title}
          </span>
        </motion.nav>

        <div className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:items-center laptop:gap-8">
          <motion.div
            className="col-span-4 tablet:col-span-8 laptop:col-span-5"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="mb-3 text-label font-semibold tracking-wide text-accent uppercase">
              {service.eyebrow}
            </p>
            <h1
              className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary tablet:text-3xl laptop:text-4xl"
              id="service-page-title"
            >
              {service.headline}
            </h1>
            <p
              className="mt-4 text-pretty text-sm leading-relaxed text-text-secondary tablet:text-md"
              id="service-page-description"
            >
              {service.introduction}
            </p>
            <div className="mt-8 flex flex-col gap-3 mobile:flex-row">
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
            className="col-span-4 tablet:col-span-5 laptop:col-span-7"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <Image
              alt={service.title}
              className="h-auto w-full"
              height={1024}
              fetchPriority="high"
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 62vw, 768px"
              src={SERVICE_SHOWCASE_IMAGES[service.slug]}
              width={1536}
            />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
