"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import { FAQ_CONTENT, FAQ_ITEMS } from "@/locales/faq";
import { serializeJsonLd } from "@/lib/seo";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";

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

export function Faq() {
  const { locale } = useLocale();
  const content = FAQ_CONTENT[locale];
  const faqItems = FAQ_ITEMS[locale];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
      name: item.question,
    })),
  };

  const serializedStructuredData = serializeJsonLd(faqStructuredData);
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;
  const accordionItems = faqItems.map((item) => ({
    content: <p className="max-w-reading leading-relaxed">{item.answer}</p>,
    id: item.id,
    title: item.question,
  }));

  return (
    <Section
      aria-labelledby="faq-title"
      className="premium-section premium-section-faq"
      id="faq"
      spacing="xl"
      surface="secondary"
    >
      <script
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
        type="application/ld+json"
      />
      <Container size="wide">
        <motion.div
          className="grid grid-cols-4 gap-10 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8"
          initial={false}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.12, once: true }}
          whileInView="visible"
        >
          <motion.div
            className="col-span-4 laptop:col-span-5"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="faq-title"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </motion.div>

          <motion.div
            className="premium-accordion-shell col-span-4 rounded-2xl bg-surface px-6 shadow-sm tablet:col-span-8 tablet:px-8 laptop:col-span-7"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <Accordion items={accordionItems} />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
