"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { CalendarCheck2, MessageCircleMore, Sparkles, UsersRound } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES } from "@/locales/whyChooseUs";

type FeatureIcon = "contact" | "visit" | "communication" | "care";

const SECTION_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.section,
  },
};

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

const FEATURE_LIST_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.featureCards,
  },
};

const FEATURE_ICONS: Record<FeatureIcon, typeof UsersRound> = {
  contact: UsersRound,
  visit: CalendarCheck2,
  communication: MessageCircleMore,
  care: Sparkles,
};

const BLOB_STYLES = [
  "left-0 top-0 -translate-x-1/3 -translate-y-1/3",
  "right-0 top-0 translate-x-1/3 -translate-y-1/3",
  "left-0 bottom-0 -translate-x-1/3 translate-y-1/3",
  "right-0 bottom-0 translate-x-1/3 translate-y-1/3",
] as const;

export function WhyChooseUs() {
  const { locale } = useLocale();
  const content = WHY_CHOOSE_US_CONTENT[locale];
  const features = WHY_CHOOSE_US_FEATURES[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  return (
    <Section
      aria-labelledby="why-choose-us-title"
      className="premium-section premium-section-why relative overflow-hidden"
      id="perche-noi"
      spacing="xl"
      surface="secondary"
    >
      {BLOB_STYLES.map((position, i) => (
        <div aria-hidden="true" className={`pointer-events-none absolute -z-0 ${position}`} key={i}>
          <motion.div
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.08, 0.95, 1] }}
            className="size-[300px] rounded-full mix-blend-multiply laptop:size-[400px] dark:mix-blend-screen"
            style={{
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(245,117,35,0.08) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(245,117,35,0.05) 0%, transparent 70%)",
            }}
            transition={{
              duration: 16 + i * 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
      ))}

      <Container className="relative z-10" size="wide">
        <motion.div
          className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8"
          initial={false}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.14, once: true }}
          whileInView="visible"
        >
          <motion.div
            className="col-span-4 max-w-reading tablet:col-span-8 laptop:col-span-4"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="why-choose-us-title"
            >
              {content.title}
            </h2>
            <p className="mt-6 text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </motion.div>

          <motion.ul
            aria-label={content.listLabel}
            className="col-span-4 grid gap-6 tablet:col-span-8 tablet:auto-rows-fr tablet:grid-cols-2 laptop:col-span-8"
            variants={FEATURE_LIST_VARIANTS}
          >
            {features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];

              return (
                <motion.li
                  className="premium-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface/90 p-8 shadow-sm backdrop-blur-sm outline outline-1 outline-divider/50 transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-card-elevation)] motion-safe:hover:scale-[var(--ds-motion-hover-scale)] motion-safe:hover:shadow-lg"
                  key={feature.title}
                  transition={transition}
                  variants={ITEM_VARIANTS}
                >
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-[var(--ds-duration-normal)] ease-standard bg-gradient-to-b from-accent/5 to-transparent group-hover:opacity-100 group-focus-within:opacity-100" />
                  <div className="relative premium-icon flex size-12 items-center justify-center rounded-xl bg-background-secondary text-accent shadow-sm ring-1 ring-accent/10 transition-all duration-[var(--ds-duration-normal)] ease-standard group-hover:bg-accent group-hover:text-on-accent group-hover:ring-0">
                    <Icon aria-hidden="true" className="size-icon-lg" />
                  </div>
                  <h3 className="relative mt-8 font-heading text-xl font-semibold tracking-tight text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="relative mt-4 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  );
}
