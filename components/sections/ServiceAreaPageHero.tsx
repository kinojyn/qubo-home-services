import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SERVICE_AREA_DETAIL_CONTENT } from "@/constants/serviceAreas";
import type { ServiceArea } from "@/features/serviceAreas";

type ServiceAreaPageHeroProps = {
  area: ServiceArea;
};

export function ServiceAreaPageHero({ area }: ServiceAreaPageHeroProps) {
  return (
    <section
      aria-describedby="service-area-page-description"
      aria-labelledby="service-area-page-title"
      className="bg-background-primary pb-20 pt-30 tablet:pb-24 tablet:pt-40 laptop:pb-30 laptop:pt-44"
    >
      <Container size="wide">
        <Reveal distance="sm">
          <nav
            aria-label={SERVICE_AREA_DETAIL_CONTENT.breadcrumbLabel}
            className="mb-10 flex flex-wrap items-center gap-2 text-xs text-text-muted"
          >
            <Link
              className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              href="/"
            >
              {SERVICE_AREA_DETAIL_CONTENT.breadcrumbHomeLabel}
            </Link>
            <ChevronRight aria-hidden="true" className="size-icon-sm" />
            <Link
              className="rounded-sm hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              href="/zone-servite"
            >
              {SERVICE_AREA_DETAIL_CONTENT.breadcrumbAreasLabel}
            </Link>
            <ChevronRight aria-hidden="true" className="size-icon-sm" />
            <span aria-current="page" className="font-medium text-text-primary">
              {area.city}
            </span>
          </nav>
        </Reveal>

        <Reveal
          className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:items-center laptop:gap-8"
          delay={0.06}
        >
          <div className="col-span-4 tablet:col-span-8 laptop:col-span-8">
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {SERVICE_AREA_DETAIL_CONTENT.heroEyebrow} · {area.city}
            </p>
            <h1
              className="max-w-reading text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-text-primary mobile:text-4xl tablet:text-5xl laptop:text-6xl"
              id="service-area-page-title"
            >
              {area.headline}
            </h1>
            <p
              className="mt-6 max-w-reading text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg"
              id="service-area-page-description"
            >
              {area.introduction}
            </p>
            <div className="mt-10 flex flex-col gap-3 mobile:flex-row">
              <ButtonLink
                className="group w-full mobile:w-auto"
                href={SERVICE_AREA_DETAIL_CONTENT.primaryCtaHref}
                trailingIcon={
                  <ArrowRight
                    aria-hidden="true"
                    className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                  />
                }
              >
                {SERVICE_AREA_DETAIL_CONTENT.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                className="w-full mobile:w-auto"
                href={SERVICE_AREA_DETAIL_CONTENT.secondaryCtaHref}
                variant="secondary"
              >
                {SERVICE_AREA_DETAIL_CONTENT.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </div>

          <aside className="col-span-4 rounded-2xl bg-text-primary p-8 text-background-primary shadow-lg tablet:col-span-5 laptop:col-span-4">
            <MapPin aria-hidden="true" className="size-icon-xl text-accent" />
            <p className="mt-6 text-label font-semibold tracking-wide text-accent uppercase">
              {SERVICE_AREA_DETAIL_CONTENT.coverageLabel}
            </p>
            <p className="mt-4 font-heading text-2xl font-semibold">{area.city}</p>
            <p className="mt-2 text-sm opacity-[var(--ds-opacity-muted)]">
              Provincia di {area.province} · {SERVICE_AREA_DETAIL_CONTENT.coverageRegion}
            </p>
            <p className="mt-6 border-t border-background-primary pt-6 text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
              {SERVICE_AREA_DETAIL_CONTENT.availabilityNote}
            </p>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
