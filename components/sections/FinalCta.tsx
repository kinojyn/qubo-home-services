"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { FINAL_CTA_CONTENT } from "@/locales/finalCta";

const SECTION_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
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

const FLOATING_ORBS = [
  { size: 160, x: "5%", y: "15%", duration: 8, delay: 0 },
  { size: 100, x: "85%", y: "10%", duration: 10, delay: 1 },
  { size: 200, x: "90%", y: "75%", duration: 12, delay: 2 },
  { size: 80, x: "10%", y: "80%", duration: 7, delay: 0.5 },
];

const DOTS = [
  { x: "20%", y: "30%", size: 3, delay: 0 },
  { x: "40%", y: "20%", size: 2, delay: 1 },
  { x: "60%", y: "85%", size: 3, delay: 2 },
  { x: "80%", y: "40%", size: 2, delay: 0.5 },
  { x: "30%", y: "70%", size: 2, delay: 1.5 },
  { x: "70%", y: "55%", size: 3, delay: 2.5 },
];

export function FinalCta() {
  const { locale } = useLocale();
  const content = FINAL_CTA_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  return (
    <Section aria-labelledby="final-cta-title" id="cta-finale" spacing="xl">
      <Container size="wide">
        <motion.div
          className="premium-final-cta relative isolate overflow-hidden rounded-2xl bg-text-primary px-6 py-16 text-center shadow-xl tablet:px-12 tablet:py-20 laptop:px-20 laptop:py-24"
          initial={false}
          transition={transition}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.2, once: true }}
          whileInView="visible"
        >
          {!shouldReduceMotion &&
            FLOATING_ORBS.map((orb, i) => (
              <motion.div
                animate={{
                  x: [0, 20, -10, 15, 0],
                  y: [0, -15, 10, -5, 0],
                }}
                aria-hidden="true"
                className="absolute -z-10 rounded-full bg-accent opacity-[var(--ds-opacity-subtle)] blur-xl"
                key={`orb-${i}`}
                style={{
                  height: orb.size,
                  left: orb.x,
                  top: orb.y,
                  width: orb.size,
                }}
                transition={{
                  duration: orb.duration,
                  delay: orb.delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ))}

          {!shouldReduceMotion &&
            DOTS.map((dot, i) => (
              <motion.div
                animate={{ opacity: [0, 0.4, 0] }}
                aria-hidden="true"
                className="absolute -z-10 rounded-full bg-background-primary"
                key={`dot-${i}`}
                style={{
                  height: dot.size,
                  left: dot.x,
                  top: dot.y,
                  width: dot.size,
                }}
                transition={{
                  duration: 3,
                  delay: dot.delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ))}

          <motion.p
            className="text-label font-semibold tracking-wide text-accent uppercase"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            className="mx-auto mt-6 max-w-reading text-balance font-heading text-section-title font-semibold tracking-tight text-background-primary"
            id="final-cta-title"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            {content.title}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-narrow text-pretty text-md leading-relaxed text-background-primary opacity-[var(--ds-opacity-muted)] tablet:text-lg"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            {content.description}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-stretch justify-center gap-4 tablet:flex-row tablet:items-center"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <ButtonLink
              className="group w-full tablet:w-auto"
              href={content.primaryHref}
              trailingIcon={
                <ArrowRight
                  aria-hidden="true"
                  className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                />
              }
            >
              {content.primaryLabel}
            </ButtonLink>
            <ButtonLink
              className="w-full tablet:w-auto"
              href={content.secondaryHref}
              variant="secondary"
            >
              {content.secondaryLabel}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
