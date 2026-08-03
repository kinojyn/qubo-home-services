"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { PROCESS_CONTENT, PROCESS_STEPS } from "@/locales/process";

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

const TIMELINE_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.processSteps,
  },
};

const CONNECTOR_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export function HowItWorks() {
  const { locale } = useLocale();
  const processContent = PROCESS_CONTENT[locale];
  const processSteps = PROCESS_STEPS[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  return (
    <Section
      aria-labelledby="process-title"
      className="premium-section premium-section-process"
      id="come-funziona"
      spacing="xl"
      surface="primary"
    >
      <Container size="wide">
        <motion.div
          initial={false}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.18, once: true }}
          whileInView="visible"
        >
          <motion.div className="max-w-reading" transition={transition} variants={ITEM_VARIANTS}>
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {processContent.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="process-title"
            >
              {processContent.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {processContent.description}
            </p>
          </motion.div>

          <motion.ol
            aria-label={processContent.listLabel}
            className="premium-timeline mt-12 grid gap-8 laptop:grid-cols-4"
            variants={TIMELINE_VARIANTS}
          >
            {processSteps.map((step, index) => {
              const hasConnector = index < processSteps.length - 1;

              return (
                <motion.li
                  className="relative flex gap-6 laptop:block"
                  key={step.number}
                  transition={transition}
                  variants={ITEM_VARIANTS}
                >
                  <div className="premium-step-marker relative z-base flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold tracking-wide text-on-accent shadow-sm">
                    {step.number}
                  </div>

                  {hasConnector && (
                    <motion.span
                      aria-hidden="true"
                      className="premium-step-connector absolute -bottom-8 left-6 top-12 w-[var(--ds-border-width-default)] origin-top bg-divider laptop:-right-8 laptop:bottom-auto laptop:left-12 laptop:top-6 laptop:h-[var(--ds-border-width-default)] laptop:w-auto laptop:origin-left"
                      transition={transition}
                      variants={CONNECTOR_VARIANTS}
                    />
                  )}

                  <div className="pt-1 laptop:pt-8">
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </motion.div>
      </Container>
    </Section>
  );
}
