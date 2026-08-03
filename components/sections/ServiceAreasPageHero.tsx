"use client";

import { ArrowDown, Check, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";
import { FVG_LOCALITY_CATALOGUE } from "@/data/fvgLocalities";
import { SERVICE_AREAS_PAGE_CONTENT } from "@/locales/serviceAreas";

import styles from "./ServiceAreasPage.module.css";

export function ServiceAreasPageHero() {
  const { locale } = useLocale();
  const content = SERVICE_AREAS_PAGE_CONTENT[locale];
  const numberLocale = locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "it-IT";

  return (
    <section
      aria-describedby="service-areas-page-description"
      aria-labelledby="service-areas-page-title"
      className={styles.hero}
    >
      <Container size="wide">
        <Reveal distance="sm">
          <nav aria-label={content.breadcrumbLabel} className={styles.breadcrumb}>
            <Link href="/">{content.breadcrumbHomeLabel}</Link>
            <ChevronRight aria-hidden="true" size={14} />
            <span aria-current="page">{content.breadcrumbCurrentLabel}</span>
          </nav>
        </Reveal>

        <div className={styles.heroGrid}>
          <Reveal delay={0.04}>
            <div className={styles.eyebrow}>
              <MapPin aria-hidden="true" size={16} />
              {content.eyebrow}
            </div>
            <h1 className={styles.heroTitle} id="service-areas-page-title">
              {content.title}
            </h1>
            <p className={styles.heroDescription} id="service-areas-page-description">
              {content.description}
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.heroCta} href="#scegli-comune">
                {content.heroCtaLabel}
                <ArrowDown aria-hidden="true" size={17} />
              </Link>
              <p className={styles.heroCount}>
                <strong>{FVG_LOCALITY_CATALOGUE.localityCount.toLocaleString(numberLocale)}</strong>
                {content.locationsCountLabel}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} distance="md">
            <aside className={styles.journeyCard}>
              <div className={styles.journeyIcon}>
                <MapPin aria-hidden="true" size={25} />
              </div>
              <h2 className={styles.journeyTitle}>{content.heroCoverageTitle}</h2>
              <ol className={styles.steps}>
                {content.heroSteps.map((step, index) => (
                  <li className={styles.step} key={step}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span>{step}</span>
                    {index === content.heroSteps.length - 1 && (
                      <Check
                        aria-hidden="true"
                        color="var(--ds-color-accent)"
                        size={16}
                        strokeWidth={3}
                      />
                    )}
                  </li>
                ))}
              </ol>
              <p className={styles.journeyNote}>{content.coverageNote}</p>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
