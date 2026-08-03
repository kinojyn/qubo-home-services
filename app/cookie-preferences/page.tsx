"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { COOKIE_PREFERENCES_DOCUMENT } from "@/constants/legal";
import { useLocale } from "@/contexts/LocaleContext";
import { useCookieConsent } from "@/contexts/CookieContext";
import { createPageStructuredData } from "@/lib/seo";
import { COOKIE_CONTENT } from "@/locales/cookie";
import { Button } from "@/components/ui/Button";

function CookiePreferencesContent() {
  const { locale } = useLocale();
  const { openPreferences } = useCookieConsent();
  const content = COOKIE_CONTENT[locale];

  return (
    <>
      <Section aria-labelledby="cookie-preferences-title" spacing="xl" surface="secondary">
        <Container size="wide">
          <h1
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary tablet:text-5xl laptop:text-page-title"
            id="cookie-preferences-title"
          >
            {COOKIE_PREFERENCES_DOCUMENT.title}
          </h1>
          <p className="mt-6 max-w-reading text-base leading-relaxed text-text-secondary tablet:text-lg">
            {COOKIE_PREFERENCES_DOCUMENT.description}
          </p>
        </Container>
      </Section>

      <Section aria-label={COOKIE_PREFERENCES_DOCUMENT.title} spacing="xl" surface="primary">
        <Container size="wide">
          <div className="grid gap-10 laptop:grid-cols-12">
            <div className="grid gap-10 laptop:col-span-8">
              {COOKIE_PREFERENCES_DOCUMENT.sections.map((section, index) => {
                const sectionId = `cookie-section-${index + 1}`;

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
                {content.modalTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {content.bannerDescription}
              </p>
              <Button
                className="mt-6 w-full tablet:w-auto"
                onClick={openPreferences}
                variant="primary"
              >
                {content.customizeLabel}
              </Button>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function CookiePreferencesPage() {
  const structured = createPageStructuredData(COOKIE_PREFERENCES_DOCUMENT);

  return (
    <PageWrapper>
      <JsonLd data={structured} />
      <CookiePreferencesContent />
    </PageWrapper>
  );
}
