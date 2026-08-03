"use client";

import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useLocale } from "@/contexts/LocaleContext";
import type { LegalDocument } from "@/constants/legal";
import { LEGAL_CONTENT } from "@/locales/legal";

type LegalPageProps = {
  document: LegalDocument;
};

export function LegalPage({ document }: LegalPageProps) {
  const { locale } = useLocale();
  const content = LEGAL_CONTENT[locale];

  return (
    <>
      <Section aria-labelledby="legal-page-title" spacing="xl" surface="secondary">
        <Container size="wide">
          <nav aria-label="Percorso pagina" className="mb-10 text-sm text-text-secondary">
            <Link
              className="rounded-sm transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              href="/"
            >
              Home
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span aria-current="page">{document.eyebrow}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-eyebrow text-accent">
            {document.eyebrow}
          </p>
          <h1
            className="mt-5 max-w-reading text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary tablet:text-5xl laptop:text-page-title"
            id="legal-page-title"
          >
            {document.title}
          </h1>
          <p className="mt-6 max-w-reading text-base leading-relaxed text-text-secondary tablet:text-lg">
            {document.description}
          </p>
          <p className="mt-5 text-sm text-text-muted">{content.reviewDate}</p>
        </Container>
      </Section>

      <Section aria-label={`Contenuto: ${document.title}`} spacing="xl" surface="primary">
        <Container className="grid gap-10 laptop:grid-cols-12" size="wide">
          <div className="grid gap-10 laptop:col-span-8">
            {document.sections.map((section, index) => {
              const sectionId = `legal-section-${index + 1}`;

              return (
                <section aria-labelledby={sectionId} key={section.title}>
                  <h2
                    className="font-heading text-2xl font-semibold tracking-tight text-text-primary"
                    id={sectionId}
                  >
                    {section.title}
                  </h2>
                  <div className="mt-4 grid gap-4 text-base leading-relaxed text-text-secondary">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-divider bg-surface p-6 shadow-sm laptop:col-span-4 laptop:p-8">
            <h2 className="font-heading text-xl font-semibold text-text-primary">
              {content.noticeTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {content.noticeDescription}
            </p>
            <ButtonLink className="mt-6 w-full tablet:w-auto" href="/contact" variant="secondary">
              {content.backLabel}
            </ButtonLink>
          </aside>
        </Container>
      </Section>
    </>
  );
}
