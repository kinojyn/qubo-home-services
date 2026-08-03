"use client";

import { Check, MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import { SERVICE_DETAIL_CONTENT } from "@/locales/serviceDetail";

type ServiceProblemsProps = {
  areaDescription: string;
  problems: readonly string[];
};

export function ServiceProblems({ areaDescription, problems }: ServiceProblemsProps) {
  const { locale } = useLocale();
  const content = SERVICE_DETAIL_CONTENT[locale];
  return (
    <Section spacing="xl" surface="secondary">
      <Container size="wide">
        <Reveal className="grid grid-cols-4 gap-10 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
          <div className="col-span-4 laptop:col-span-7">
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.problemsEyebrow}
            </p>
            <h2 className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary">
              {content.problemsTitle}
            </h2>
            <ul
              aria-label={content.problemsListLabel}
              className="mt-8 grid gap-3 tablet:grid-cols-2"
            >
              {problems.map((problem) => (
                <li
                  className="flex min-h-touch-target items-center gap-3 rounded-xl bg-surface px-5 py-3 text-sm text-text-secondary shadow-xs"
                  key={problem}
                >
                  <Check aria-hidden="true" className="size-icon-md shrink-0 text-accent" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>
          <aside
            className="col-span-4 rounded-2xl bg-text-primary p-8 text-background-primary shadow-lg laptop:col-span-5 laptop:p-10"
            aria-labelledby="service-area-title"
          >
            <MapPin aria-hidden="true" className="size-icon-xl text-accent" />
            <p className="mt-6 text-label font-semibold tracking-wide text-accent uppercase">
              {content.areaEyebrow}
            </p>
            <h2 className="mt-4 font-heading text-2xl font-semibold" id="service-area-title">
              {content.areaTitle}
            </h2>
            <p className="mt-4 text-md font-medium">{content.areaName}</p>
            <p className="mt-4 text-sm leading-relaxed opacity-[var(--ds-opacity-muted)]">
              {areaDescription}
            </p>
            <p className="mt-6 border-t border-background-primary pt-6 text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
              {content.areaNote}
            </p>
          </aside>
        </Reveal>
      </Container>
    </Section>
  );
}
