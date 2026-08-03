import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICE_AREA_DETAIL_CONTENT } from "@/constants/serviceAreas";
import { SERVICE_DETAILS } from "@/data/services";
import type { ServiceArea } from "@/features/serviceAreas";

type ServiceAreaContentProps = {
  area: ServiceArea;
  relatedAreas: readonly ServiceArea[];
};

export function ServiceAreaContent({ area, relatedAreas }: ServiceAreaContentProps) {
  return (
    <>
      <Section aria-labelledby="local-services-title" spacing="xl" surface="secondary">
        <Container size="wide">
          <Reveal className="max-w-reading">
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {SERVICE_AREA_DETAIL_CONTENT.servicesEyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="local-services-title"
            >
              {SERVICE_AREA_DETAIL_CONTENT.servicesTitle}
            </h2>
            <p className="mt-6 text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {SERVICE_AREA_DETAIL_CONTENT.servicesDescription}
            </p>
          </Reveal>

          <Reveal delay={0.06} distance="md">
            <ul className="mt-12 grid grid-cols-4 gap-6 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
              {SERVICE_DETAILS.map((service) => (
                <li className="col-span-4" key={service.slug}>
                  <Link
                    aria-label={`${SERVICE_AREA_DETAIL_CONTENT.serviceLinkLabel} ${service.title}`}
                    className="group flex h-full flex-col rounded-2xl border border-border-default bg-surface p-7 shadow-sm transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-hover-lift)] motion-safe:hover:shadow-lg motion-safe:focus-visible:translate-y-[var(--ds-motion-hover-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                    href={`/services/${service.slug}`}
                  >
                    <ServiceIcon className="size-icon-lg text-accent" name={service.icon} />
                    <h3 className="mt-5 font-heading text-xl font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      {SERVICE_AREA_DETAIL_CONTENT.serviceLinkLabel} {service.title}
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

      <Section aria-labelledby="local-benefits-title" spacing="xl">
        <Container size="wide">
          <Reveal>
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {SERVICE_AREA_DETAIL_CONTENT.benefitsEyebrow}
            </p>
            <h2
              className="max-w-reading text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="local-benefits-title"
            >
              {SERVICE_AREA_DETAIL_CONTENT.benefitsTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.06} distance="md">
            <ul className="mt-12 grid grid-cols-4 gap-6 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
              {area.benefits.map((benefit) => (
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

      <Section aria-labelledby="local-context-title" spacing="xl" surface="secondary">
        <Container size="wide">
          <Reveal className="grid grid-cols-4 gap-10 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
            <div className="col-span-4 laptop:col-span-7">
              <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
                {SERVICE_AREA_DETAIL_CONTENT.localEyebrow} · {area.city}
              </p>
              <h2
                className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
                id="local-context-title"
              >
                {SERVICE_AREA_DETAIL_CONTENT.localTitle}
              </h2>
              <p className="mt-6 max-w-reading text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
                {area.localContext}
              </p>
            </div>

            <aside
              aria-labelledby="nearby-areas-title"
              className="col-span-4 rounded-2xl border border-border-default bg-surface p-8 shadow-sm laptop:col-span-5"
            >
              <MapPin aria-hidden="true" className="size-icon-lg text-accent" />
              <h2
                className="mt-6 font-heading text-xl font-semibold text-text-primary"
                id="nearby-areas-title"
              >
                {SERVICE_AREA_DETAIL_CONTENT.nearbyTitle}
              </h2>
              <ul className="mt-5 grid gap-2">
                {area.nearbyAreas.map((nearbyArea) => (
                  <li className="text-sm font-medium text-text-secondary" key={nearbyArea}>
                    {nearbyArea}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-divider pt-6 text-xs leading-relaxed text-text-muted">
                {SERVICE_AREA_DETAIL_CONTENT.nearbyDescription}
              </p>
            </aside>
          </Reveal>

          <Reveal delay={0.06} distance="sm">
            <nav
              aria-labelledby="related-areas-title"
              className="mt-12 border-t border-divider pt-8"
            >
              <h2
                className="font-heading text-xl font-semibold text-text-primary"
                id="related-areas-title"
              >
                {SERVICE_AREA_DETAIL_CONTENT.relatedAreasTitle}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-3">
                {relatedAreas.map((relatedArea) => (
                  <li key={relatedArea.slug}>
                    <Link
                      className="inline-flex min-h-touch-target items-center rounded-lg border border-border-default bg-surface px-4 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                      href={`/zone-servite/${relatedArea.slug}`}
                    >
                      {relatedArea.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
