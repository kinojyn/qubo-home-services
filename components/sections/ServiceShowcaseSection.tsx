"use client";

import { type Variants, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

import type { ServiceDetail, ServiceSlug } from "@/features/services/types";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SERVICE_SHOWCASE_IMAGES } from "@/constants/serviceShowcase";
import { useLocale } from "@/contexts/LocaleContext";

const SECTION_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const IMAGE_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const FLOAT_ANIMATION = {
  y: [0, -6, 0],
  transition: { duration: 6, ease: "easeInOut" as const, repeat: Infinity },
};

type ServiceShowcaseSectionProps = {
  index: number;
  service: ServiceDetail;
};

export function ServiceShowcaseSection({ index, service }: ServiceShowcaseSectionProps) {
  const { locale } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const isReversed = index % 2 !== 0;
  const bgClass =
    index % 2 === 0
      ? "bg-background-primary"
      : "bg-[linear-gradient(110deg,var(--color-background-primary)_75%,#FFB587_100%)]";

  return (
    <motion.section
      className={`py-16 tablet:py-20 laptop:py-24 ${bgClass}`}
      initial={false}
      variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
      viewport={{ amount: 0.15, once: true }}
      whileInView="visible"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-10 laptop:grid-cols-2 laptop:gap-16">
          <motion.div
            className={`${isReversed ? "laptop:order-first" : "laptop:order-last"} relative z-0`}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            variants={shouldReduceMotion ? undefined : IMAGE_VARIANTS}
          >
            <ServiceShowcaseImage
              shouldReduceMotion={shouldReduceMotion ?? false}
              slug={service.slug}
              title={service.title}
            />
          </motion.div>

          <motion.div
            className={`${isReversed ? "laptop:order-last" : "laptop:order-first"} relative z-10`}
            variants={shouldReduceMotion ? undefined : ITEM_VARIANTS}
          >
            <p className="mb-3 text-label font-semibold tracking-wide text-accent uppercase">
              {service.eyebrow}
            </p>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-text-primary tablet:text-4xl laptop:text-4xl">
              {service.headline}
            </h2>
            <p className="mt-6 text-pretty text-md leading-relaxed text-text-secondary">
              {service.description}
            </p>

            <ul className="mt-8 space-y-4">
              {service.benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="size-3 text-accent" />
                  </span>
                  <div>
                    <span className="font-medium text-text-primary">{benefit.title}</span>
                    <span className="text-text-secondary"> &mdash; {benefit.description}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ButtonLink
                className="group w-full mobile:w-auto"
                href={`/services/${service.slug}`}
                trailingIcon={
                  <ArrowRight
                    aria-hidden="true"
                    className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                  />
                }
              >
                {locale === "en"
                  ? "Explore service"
                  : locale === "de"
                    ? "Dienstleistung ansehen"
                    : "Scopri il servizio"}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}

function ServiceShowcaseImage({
  shouldReduceMotion,
  slug,
  title,
}: {
  shouldReduceMotion: boolean;
  slug: ServiceSlug;
  title: string;
}) {
  const imagePath = SERVICE_SHOWCASE_IMAGES[slug];

  return (
    <motion.div animate={shouldReduceMotion ? { y: 0 } : FLOAT_ANIMATION} className="-mx-[15%]">
      <Image
        alt={title}
        className="h-auto w-[130%]"
        height={720}
        sizes="(min-width: 1024px) 48vw, 100vw"
        src={imagePath}
        width={960}
      />
    </motion.div>
  );
}
