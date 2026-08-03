"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import type { ServiceDetail } from "@/features/services";
import { SERVICE_DETAIL_CONTENT } from "@/locales/serviceDetail";

type RelatedServicesProps = {
  services: readonly ServiceDetail[];
};

export function RelatedServices({ services }: RelatedServicesProps) {
  const { locale } = useLocale();
  const content = SERVICE_DETAIL_CONTENT[locale];
  return (
    <Section aria-labelledby="related-services-title" spacing="xl">
      <Container size="wide">
        <Reveal>
          <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
            {content.relatedEyebrow}
          </p>
          <h2
            className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
            id="related-services-title"
          >
            {content.relatedTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.06} distance="md">
          <ul
            aria-label={content.relatedListLabel}
            className="mt-12 grid grid-cols-4 gap-6 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8"
          >
            {services.map((service) => (
              <li className="col-span-4" key={service.slug}>
                <Link
                  className="group flex h-full flex-col rounded-2xl border border-border-default bg-surface p-8 shadow-sm transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-hover-lift)] motion-safe:hover:shadow-lg motion-safe:focus-visible:translate-y-[var(--ds-motion-hover-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                  href={`/services/${service.slug}`}
                >
                  <ServiceIcon className="size-icon-lg text-accent" name={service.icon} />
                  <h3 className="mt-6 font-heading text-xl font-semibold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    {content.relatedLinkLabel}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
