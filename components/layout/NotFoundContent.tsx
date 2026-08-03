"use client";

import { ArrowLeft } from "lucide-react";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";

const CONTENT = {
  it: {
    title: "Questa pagina non è disponibile.",
    description:
      "Il collegamento potrebbe essere cambiato oppure la pagina non esiste. Torna alla home per continuare.",
    action: "Torna alla home",
  },
  en: {
    title: "This page is not available.",
    description:
      "The link may have changed or the page does not exist. Return to the home page to continue.",
    action: "Back to home",
  },
  de: {
    title: "Diese Seite ist nicht verfügbar.",
    description:
      "Der Link wurde möglicherweise geändert oder die Seite existiert nicht. Kehren Sie zur Startseite zurück.",
    action: "Zur Startseite",
  },
} as const;

export function NotFoundContent() {
  const { locale } = useLocale();
  const content = CONTENT[locale];
  return (
    <PageWrapper className="flex items-center">
      <Container className="py-section-xl text-center" size="reading">
        <p className="text-sm font-semibold uppercase tracking-eyebrow text-accent">Error 404</p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight text-text-primary tablet:text-5xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-reading text-base leading-relaxed text-text-secondary tablet:text-lg">
          {content.description}
        </p>
        <ButtonLink
          className="mt-8"
          href="/"
          leadingIcon={<ArrowLeft aria-hidden="true" className="size-icon-md" />}
        >
          {content.action}
        </ButtonLink>
      </Container>
    </PageWrapper>
  );
}
