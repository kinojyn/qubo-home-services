"use client";

import { ClipboardCheck, Handshake, Heart, House } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import { ABOUT_VALUES, ABOUT_VALUES_CONTENT, type AboutValue } from "@/locales/about";

const VALUE_ICONS: Record<AboutValue["icon"], typeof ClipboardCheck> = {
  clarity: ClipboardCheck,
  coordination: Handshake,
  care: Heart,
  home: House,
};

export function AboutValues() {
  const { locale } = useLocale();
  const content = ABOUT_VALUES_CONTENT[locale];
  const values = ABOUT_VALUES[locale];
  return (
    <Section aria-labelledby="about-values-title" spacing="xl">
      <Container size="wide">
        <Reveal className="max-w-reading">
          <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
            {content.eyebrow}
          </p>
          <h2
            className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
            id="about-values-title"
          >
            {content.title}
          </h2>
          <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
            {content.description}
          </p>
        </Reveal>

        <Reveal delay={0.06} distance="md">
          <ul
            aria-label={content.listLabel}
            className="mt-12 grid grid-cols-4 gap-6 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8"
          >
            {values.map((value) => {
              const Icon = VALUE_ICONS[value.icon];

              return (
                <li
                  className="group col-span-4 h-full rounded-2xl border border-border-default bg-surface p-8 shadow-sm transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-hover-lift)] motion-safe:hover:shadow-lg tablet:col-span-4 laptop:col-span-3"
                  key={value.title}
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-background-secondary text-accent transition-colors duration-[var(--ds-duration-normal)] ease-standard group-hover:bg-accent group-hover:text-on-accent">
                    <Icon aria-hidden="true" className="size-icon-lg" />
                  </div>
                  <h3 className="mt-8 font-heading text-xl font-semibold tracking-tight text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
