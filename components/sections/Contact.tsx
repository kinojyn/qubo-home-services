"use client";

import { motion, type Variants, useInView, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { CONTACT_CONTENT } from "@/locales/contact";

const SECTION_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: MOTION_SEQUENCES.section },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: "var(--ds-motion-distance-lg)" },
  visible: { opacity: 1, y: 0 },
};

const ContactForm = dynamic(() =>
  import("@/components/forms/ContactForm").then((module) => module.ContactForm),
);

type ContactProps = {
  deferForm?: boolean;
};

function ContactFormPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="min-h-[32rem] animate-pulse rounded-2xl bg-background-secondary motion-reduce:animate-none tablet:min-h-[28rem]"
    />
  );
}

export function Contact({ deferForm = false }: ContactProps) {
  const { locale } = useLocale();
  const content = CONTACT_CONTENT[locale];
  const formRef = useRef<HTMLDivElement>(null);
  const formIsNearViewport = useInView(formRef, {
    margin: "400px 0px",
    once: true,
  });
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;

  return (
    <Section
      aria-labelledby="contact-title"
      className="premium-section premium-section-contact"
      id="contatti"
      spacing="xl"
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
              {content.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="contact-title"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </motion.div>
          <motion.div
            className="col-span-4 tablet:col-span-8 laptop:col-span-7"
            ref={formRef}
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            {!deferForm || formIsNearViewport ? <ContactForm /> : <ContactFormPlaceholder />}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
