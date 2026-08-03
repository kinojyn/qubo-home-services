"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import type { ServiceFaqItem } from "@/features/services";
import { SERVICE_DETAIL_CONTENT } from "@/locales/serviceDetail";

type ServiceFaqProps = {
  items: readonly ServiceFaqItem[];
};

export function ServiceFaq({ items }: ServiceFaqProps) {
  const { locale } = useLocale();
  const content = SERVICE_DETAIL_CONTENT[locale];
  const accordionItems = items.map((item) => ({
    content: <p className="max-w-reading leading-relaxed">{item.answer}</p>,
    id: item.id,
    title: item.question,
  }));

  return (
    <Section aria-labelledby="service-faq-title" spacing="xl" surface="secondary">
      <Container size="wide">
        <Reveal className="grid grid-cols-4 gap-10 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
          <div className="col-span-4 laptop:col-span-5">
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.faqEyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="service-faq-title"
            >
              {content.faqTitle}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.faqDescription}
            </p>
          </div>
          <div className="col-span-4 rounded-2xl bg-surface px-6 shadow-sm tablet:col-span-8 tablet:px-8 laptop:col-span-7">
            <Accordion items={accordionItems} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
