"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

import { ServiceWizard, type QuotesConfig } from "@/components/quotes/ServiceWizard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ESTIMATE_CONTENT } from "@/constants/estimate";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import quotesConfig from "@/data/quotes-config.json";

const SECTION_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: MOTION_SEQUENCES.section },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "var(--ds-motion-distance-lg)" },
  visible: { opacity: 1, y: 0 },
};

const INITIAL_QUOTES_CONFIG = quotesConfig as QuotesConfig;

export function Estimate() {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  return (
    <Section
      aria-labelledby="estimate-title"
      className="premium-section premium-section-estimate"
      id="preventivo"
      spacing="xl"
      surface="secondary"
    >
      <Container size="wide">
        <motion.div
          className="grid grid-cols-4 gap-10 tablet:grid-cols-8 laptop:grid-cols-12 laptop:items-start laptop:gap-8"
          initial={false}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.08, once: true }}
          whileInView="visible"
        >
          <motion.div
            className="col-span-4 laptop:sticky laptop:top-24 laptop:col-span-5"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {ESTIMATE_CONTENT.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="estimate-title"
            >
              {ESTIMATE_CONTENT.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {ESTIMATE_CONTENT.description}
            </p>
          </motion.div>

          <motion.div
            className="col-span-4 tablet:col-span-8 laptop:col-span-7"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <div className="premium-form-surface min-w-0 overflow-hidden rounded-2xl border border-border-default/70 shadow-xl shadow-black/5">
              <ServiceWizard initialData={INITIAL_QUOTES_CONFIG} />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
