"use client";

import { animate, motion, type Variants, useInView, useReducedMotion } from "framer-motion";
import { Grid3X3, ListChecks, UserCheck, Home } from "lucide-react";
import { useEffect, useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { STATISTICS, STATISTICS_CONTENT } from "@/locales/statistics";

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

const STATISTIC_LIST_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.statisticCards,
  },
};

const STAT_ICONS = {
  0: Grid3X3,
  1: ListChecks,
  2: UserCheck,
  3: Home,
} as const;

type AnimatedCounterProps = {
  accessibleValue: string;
  suffix: string;
  value: number;
};

const ITALIAN_NUMBER_FORMATTER = new Intl.NumberFormat("it-IT");

function AnimatedCounter({ accessibleValue, suffix, value }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { amount: 0.8, once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const counter = counterRef.current;

    if (!counter || !isInView) {
      return;
    }

    if (shouldReduceMotion) {
      counter.textContent = ITALIAN_NUMBER_FORMATTER.format(value);
      return;
    }

    const animation = animate(0, value, {
      ...MOTION_TRANSITIONS.counter,
      onUpdate: (latestValue) => {
        counter.textContent = ITALIAN_NUMBER_FORMATTER.format(Math.round(latestValue));
      },
    });

    return () => animation.stop();
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span className="font-display text-5xl font-semibold leading-tight tracking-tight text-accent tabular-nums">
      <span aria-hidden="true">
        <span ref={counterRef}>{shouldReduceMotion ? value : 0}</span>
        {suffix}
      </span>
      <span className="sr-only">{accessibleValue}</span>
    </span>
  );
}

export function Statistics() {
  const { locale } = useLocale();
  const statistics = STATISTICS[locale];
  const statisticsContent = STATISTICS_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  return (
    <Section
      aria-labelledby="statistics-title"
      className="premium-section premium-section-statistics"
      id="numeri"
      spacing="xl"
      surface="primary"
    >
      <Container size="wide">
        <motion.div
          initial={false}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.14, once: true }}
          whileInView="visible"
        >
          <motion.div
            className="mx-auto max-w-reading text-center"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {statisticsContent.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="statistics-title"
            >
              {statisticsContent.title}
            </h2>
            <p className="mx-auto mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {statisticsContent.description}
            </p>
          </motion.div>

          <motion.ul
            aria-label={statisticsContent.listLabel}
            className="mt-12 grid gap-6 tablet:auto-rows-fr tablet:grid-cols-2 laptop:grid-cols-4 laptop:gap-8"
            variants={STATISTIC_LIST_VARIANTS}
          >
            {statistics.map((statistic, index) => {
              const Icon = STAT_ICONS[index as keyof typeof STAT_ICONS];

              return (
                <motion.li
                  className="premium-card premium-stat-card group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-background-secondary to-background-secondary/80 p-8 shadow-sm outline outline-1 outline-divider/50 transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-card-elevation)] motion-safe:hover:scale-[var(--ds-motion-hover-scale)] motion-safe:hover:shadow-lg"
                  key={statistic.label}
                  transition={transition}
                  variants={ITEM_VARIANTS}
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 opacity-5 transition-opacity duration-[var(--ds-duration-normal)] ease-standard group-hover:opacity-10">
                    <Icon className="size-24 text-accent" />
                  </div>
                  <div className="relative mb-6 flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <div className="relative">
                    <AnimatedCounter
                      accessibleValue={statistic.accessibleValue}
                      suffix={statistic.suffix}
                      value={statistic.value}
                    />
                    <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-text-primary">
                      {statistic.label}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {statistic.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  );
}
