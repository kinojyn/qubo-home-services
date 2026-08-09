"use client";

import { MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/navigation/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/contexts/LocaleContext";
import { FOOTER_CONTENT, FOOTER_LEGAL_LINKS, FOOTER_RESOURCE_LINKS } from "@/locales/footer";
import { NAVIGATION_LINKS } from "@/locales/navigation";

const FOOTER_LINK_CLASS_NAME =
  "inline-flex min-h-touch-target items-center rounded-sm text-sm text-text-secondary transition duration-[var(--ds-duration-normal)] ease-standard hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

type FooterProps = {
  year?: number;
};

export function Footer({ year = new Date().getFullYear() }: FooterProps) {
  const { locale } = useLocale();
  const content = FOOTER_CONTENT[locale];

  return (
    <footer className="premium-footer border-t border-divider bg-background-secondary">
      <Container size="wide">
        <div className="grid gap-12 py-16 tablet:grid-cols-2 tablet:py-20 laptop:grid-cols-3 laptop:gap-8 laptop:py-24">
          <div className="grid content-start gap-6">
            <BrandLogo />
            <p className="max-w-card-compact text-sm leading-relaxed text-text-secondary">
              {content.brandDescription}
            </p>
            <p className="max-w-card-compact text-xs font-semibold tracking-wide text-accent uppercase">
              {siteConfig.brandMeaning}
            </p>
          </div>

          <nav aria-labelledby="footer-navigation-heading">
            <h2
              className="mb-4 text-sm font-semibold text-text-primary"
              id="footer-navigation-heading"
            >
              {content.navigationHeading}
            </h2>
            <ul className="grid gap-1">
              {NAVIGATION_LINKS[locale].map((link) => (
                <li key={link.href}>
                  <Link className={FOOTER_LINK_CLASS_NAME} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_RESOURCE_LINKS[locale].map((link) => (
                <li key={link.href}>
                  <Link className={FOOTER_LINK_CLASS_NAME} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-heading" id="footer-contatti">
            <h2
              className="mb-4 text-sm font-semibold text-text-primary"
              id="footer-contact-heading"
            >
              {content.contactHeading}
            </h2>
            <div className="grid gap-4">
              <p className="flex min-h-touch-target items-center gap-3 text-sm text-text-secondary">
                <MapPin aria-hidden="true" className="size-icon-md shrink-0 text-accent" />
                {content.contactRegion}
              </p>
              <a className={FOOTER_LINK_CLASS_NAME} href={`tel:${siteConfig.contact.phone}`}>
                {siteConfig.contact.phoneDisplay}
              </a>
              <a className={FOOTER_LINK_CLASS_NAME} href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              <ButtonLink
                className="w-fit px-4"
                href="/#preventivo"
                leadingIcon={<MessageCircle aria-hidden="true" className="size-icon-md" />}
                variant="secondary"
              >
                {content.contactActionLabel}
              </ButtonLink>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6 border-t border-divider py-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="text-xs text-text-muted">
            © {year} QUBO. {content.copyrightSuffix}
          </p>
          <nav aria-labelledby="footer-legal-heading">
            <h2 className="sr-only" id="footer-legal-heading">
              {content.legalHeading}
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LEGAL_LINKS[locale].map((link) => (
                <li key={link.href}>
                  <Link className={FOOTER_LINK_CLASS_NAME} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
