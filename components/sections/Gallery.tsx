"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { GalleryImagePanel } from "@/components/sections/GalleryImagePanel";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GALLERY_IMAGE_SIZES } from "@/constants/gallery";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { GALLERY_CONTENT } from "@/locales/gallery";
import { GALLERY_PROJECTS } from "@/data/gallery";

const SECTION_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.section,
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: "var(--ds-motion-distance-lg)",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const GALLERY_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.galleryCards,
  },
};

const GalleryLightbox = dynamic(() =>
  import("@/components/sections/GalleryLightbox").then((module) => module.GalleryLightbox),
);

export function Gallery() {
  const { locale } = useLocale();
  const content = GALLERY_CONTENT[locale];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;
  const activeProject = GALLERY_PROJECTS[activeIndex ?? 0];

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPreviousProject = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return (currentIndex - 1 + GALLERY_PROJECTS.length) % GALLERY_PROJECTS.length;
    });
  }, []);
  const showNextProject = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return (currentIndex + 1) % GALLERY_PROJECTS.length;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function handleLightboxKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousProject();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextProject();
      }
    }

    document.addEventListener("keydown", handleLightboxKeyDown);
    return () => document.removeEventListener("keydown", handleLightboxKeyDown);
  }, [activeIndex, showNextProject, showPreviousProject]);

  return (
    <Section
      aria-labelledby="gallery-title"
      className="premium-section premium-section-gallery"
      id="galleria"
      spacing="xl"
      surface="primary"
    >
      <Container size="wide">
        <motion.div
          initial={false}
          variants={shouldReduceMotion ? undefined : SECTION_VARIANTS}
          viewport={{ amount: 0.12, once: true }}
          whileInView="visible"
        >
          <motion.div className="max-w-reading" transition={transition} variants={ITEM_VARIANTS}>
            <p className="mb-4 text-label font-semibold tracking-wide text-accent uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="text-balance font-heading text-section-title font-semibold tracking-tight text-text-primary"
              id="gallery-title"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </motion.div>

          <p className="mt-8 inline-flex rounded-full border border-accent/15 bg-accent/5 px-4 py-2 text-xs font-semibold tracking-wide text-accent">
            {content.notice}
          </p>

          <motion.ul
            aria-label={content.listLabel}
            className="mt-8 grid gap-6 tablet:grid-cols-2 laptop:grid-cols-3 laptop:gap-8"
            variants={GALLERY_VARIANTS}
          >
            {GALLERY_PROJECTS.map((project, index) => (
              <motion.li key={project.id} transition={transition} variants={ITEM_VARIANTS}>
                <motion.article
                  className="premium-card premium-gallery-card group relative h-full rounded-2xl bg-background-secondary p-4 text-left shadow-sm transition-shadow duration-[var(--ds-duration-normal)] ease-standard hover:shadow-lg tablet:p-6"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: "var(--ds-motion-card-elevation)",
                          scale: "var(--ds-motion-hover-scale)",
                        }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: "var(--ds-motion-button-press)" }
                  }
                >
                  <div className="grid grid-cols-2 gap-3">
                    <GalleryImagePanel
                      alt={project.before.alt}
                      label="Prima"
                      sizes={GALLERY_IMAGE_SIZES}
                      src={project.before.src}
                    />
                    <GalleryImagePanel
                      alt={project.after.alt}
                      label="Dopo"
                      sizes={GALLERY_IMAGE_SIZES}
                      src={project.after.src}
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 px-2 pb-2">
                    <div>
                      <h3 className="font-heading text-xl font-semibold tracking-tight text-text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs text-text-secondary">{content.previewLabel}</p>
                    </div>
                    <Expand
                      aria-hidden="true"
                      className="size-icon-md shrink-0 text-accent transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:scale-[var(--ds-motion-hover-scale)] motion-safe:group-focus-visible:scale-[var(--ds-motion-hover-scale)]"
                    />
                  </div>
                  <button
                    aria-label={content.openComparisonLabel(project.title)}
                    className="absolute inset-0 rounded-2xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                </motion.article>
              </motion.li>
            ))}
          </motion.ul>
          <Link
            className="mt-8 inline-flex min-h-touch-target items-center rounded-lg border border-border-default bg-surface px-4 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            href="/gallery"
          >
            {content.pageLinkLabel}
          </Link>
        </motion.div>
      </Container>

      {activeIndex !== null ? (
        <GalleryLightbox
          activeIndex={activeIndex}
          activeProject={activeProject}
          onClose={closeLightbox}
          onNext={showNextProject}
          onPrevious={showPreviousProject}
        />
      ) : null}
    </Section>
  );
}
