"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import {
  FEATURED_FVG_LOCALITIES,
  FVG_LOCALITY_CATALOGUE,
  searchFvgLocalities,
} from "@/data/fvgLocalities";
import { SERVICE_AREAS_PAGE_CONTENT } from "@/locales/serviceAreas";

import styles from "./ServiceAreasPage.module.css";

export function ServiceAreasGrid() {
  const { locale } = useLocale();
  const content = SERVICE_AREAS_PAGE_CONTENT[locale];
  const [query, setQuery] = useState("");
  const numberLocale = locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "it-IT";

  const filteredLocations = useMemo(() => {
    if (!query.trim()) return FEATURED_FVG_LOCALITIES;
    return searchFvgLocalities(query, 24);
  }, [query]);

  const hasResults = filteredLocations.length > 0;

  return (
    <section
      aria-labelledby="service-areas-grid-title"
      className={styles.directory}
      id="scegli-comune"
    >
      <Container size="wide">
        <Reveal className={styles.sectionIntro}>
          <div>
            <p className={styles.sectionLabel}>{content.gridEyebrow}</p>
            <h2 className={styles.sectionTitle} id="service-areas-grid-title">
              {content.gridTitle}
            </h2>
          </div>
          <p className={styles.sectionDescription}>{content.gridDescription}</p>
        </Reveal>

        <Reveal delay={0.06} distance="sm">
          <div className={styles.searchPanel}>
            <label className={styles.searchField} htmlFor="service-area-search">
              <span className="sr-only">{content.searchLabel}</span>
              <Search aria-hidden="true" className={styles.searchIcon} size={20} />
              <input
                autoComplete="off"
                className={styles.searchInput}
                id="service-area-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={content.searchPlaceholder}
                type="search"
                value={query}
              />
            </label>
            <div className={styles.countBadge}>
              <strong>{FVG_LOCALITY_CATALOGUE.localityCount.toLocaleString(numberLocale)}</strong>
              {content.locationsCountLabel}
            </div>
            <p className={styles.searchHint}>{content.searchHint}</p>
          </div>
        </Reveal>

        <div className={styles.resultsHeader}>
          <div>
            <p className={styles.directoryLabel}>{content.locationsDirectoryLabel}</p>
            <h3 className={styles.directoryTitle}>
              {hasResults ? content.locationsDirectoryTitle : content.noResultsTitle}
            </h3>
          </div>
          <p aria-live="polite" className={styles.resultCount}>
            {hasResults
              ? `${filteredLocations.length} ${content.locationsCountLabel}`
              : content.noResultsDescription}
          </p>
        </div>

        {hasResults ? (
          <>
            <p className={styles.directoryDescription}>{content.locationsDirectoryDescription}</p>
            <ul className={styles.cityGrid}>
              {filteredLocations.map((location) => (
                <li key={location.id}>
                  <Link
                    aria-label={`${content.selectCityLabel}: ${location.name}`}
                    className={styles.cityCard}
                    href={`/richiedi-preventivo?locality=${encodeURIComponent(location.id)}#preventivo-form`}
                  >
                    <span className={styles.cityIcon}>
                      <MapPin aria-hidden="true" size={20} />
                    </span>
                    <span>
                      <span className={styles.cityName}>{location.name}</span>
                      <span className={styles.cityMeta}>
                        <span>
                          {location.kind === "municipality"
                            ? `${content.municipalityTypeLabel} · ${location.province}`
                            : `${content.localityTypeLabel} · ${location.municipality}`}
                        </span>
                        <span>
                          {location.distance} km {content.distanceLabel}
                        </span>
                        <span>
                          {content.travelFeeLabel}: <strong>+€{location.fee}</strong>
                        </span>
                      </span>
                    </span>
                    <span className={styles.cityAction}>
                      <span>{content.selectCityLabel}</span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className={styles.emptyState}>
            <Link className={styles.emptyLink} href="/richiedi-preventivo#preventivo-form">
              {content.requestCoverageLabel}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        )}

        <Reveal delay={0.08} distance="sm">
          <div className={styles.referenceAreas}>
            <p className={styles.referenceTitle}>{content.referenceAreasTitle}</p>
            <ul className={styles.referenceList}>
              {SERVICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link
                    aria-label={`${content.cardLinkLabel} ${area.city}`}
                    className={styles.referenceLink}
                    href={`/zone-servite/${area.slug}`}
                  >
                    <MapPin aria-hidden="true" size={16} />
                    {area.city}
                    <ArrowRight aria-hidden="true" size={15} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className={styles.dataSource}>
          {content.dataSourceLabel} ·{" "}
          <a href="https://www.geonames.org/" rel="noreferrer" target="_blank">
            CC BY 4.0
          </a>
        </p>
      </Container>
    </section>
  );
}
