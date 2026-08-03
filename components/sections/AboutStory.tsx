"use client";

import { MapPin } from "lucide-react";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import { ABOUT_LOCAL_CONTENT, ABOUT_STORY_CONTENT } from "@/locales/about";

export function AboutStory() {
  const { locale } = useLocale();
  const story = ABOUT_STORY_CONTENT[locale];
  const local = ABOUT_LOCAL_CONTENT[locale];
  return (
    <Section aria-labelledby="about-story-title" spacing="xl" surface="secondary">
      <Container size="wide">
        <Reveal className="grid grid-cols-4 gap-12 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8">
          <div className="col-span-4 tablet:col-span-8 laptop:col-span-7">
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {story.eyebrow}
            </p>
            <h2
              className="max-w-reading text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="about-story-title"
            >
              {story.title}
            </h2>
            <div className="mt-8 grid max-w-reading gap-5 text-md leading-relaxed text-text-secondary">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="col-span-4 grid gap-6 tablet:col-span-8 tablet:grid-cols-2 laptop:col-span-5 laptop:grid-cols-1">
            <aside className="rounded-2xl border border-border-default bg-surface p-8 shadow-sm">
              <p className="text-label font-semibold tracking-wide text-accent uppercase">
                {story.asideEyebrow}
              </p>
              <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-text-primary">
                {story.asideTitle}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                {story.asideDescription}
              </p>
            </aside>

            <aside className="rounded-2xl bg-text-primary p-8 text-background-primary shadow-lg">
              <MapPin aria-hidden="true" className="size-icon-xl text-accent" />
              <p className="mt-6 text-label font-semibold tracking-wide text-accent uppercase">
                {local.eyebrow}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-semibold">{local.title}</h3>
              <p className="mt-4 text-sm leading-relaxed opacity-[var(--ds-opacity-muted)]">
                {local.description}
              </p>
              <p className="mt-6 border-t border-background-primary pt-6 text-xs leading-relaxed opacity-[var(--ds-opacity-muted)]">
                {local.note}
              </p>
            </aside>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
