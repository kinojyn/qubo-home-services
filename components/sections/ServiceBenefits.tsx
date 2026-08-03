"use client";

import { CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import type { ServiceBenefit } from "@/features/services";
import { SERVICE_DETAIL_CONTENT } from "@/locales/serviceDetail";

type ServiceBenefitsProps = {
  benefits: readonly ServiceBenefit[];
};

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  const { locale } = useLocale();
  const content = SERVICE_DETAIL_CONTENT[locale];
  return (
    <Section aria-labelledby="service-benefits-title" spacing="xl">
      <Container size="wide">
        <Reveal className="max-w-reading">
          <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
            {content.benefitsEyebrow}
          </p>
          <h2
            className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
            id="service-benefits-title"
          >
            {content.benefitsTitle}
          </h2>
          <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
            {content.benefitsDescription}
          </p>
        </Reveal>
        <Reveal delay={0.06} distance="md">
          <ul className="mt-12 grid grid-cols-4 gap-6 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
            {benefits.map((benefit) => (
              <li
                className="col-span-4 rounded-2xl border border-border-default bg-surface p-8 shadow-sm transition-shadow duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:shadow-md"
                key={benefit.title}
              >
                <CheckCircle2 aria-hidden="true" className="size-icon-lg text-accent" />
                <h3 className="mt-6 font-heading text-xl font-semibold text-text-primary">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
