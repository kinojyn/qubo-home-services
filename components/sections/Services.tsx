"use client";

import { useContext } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SERVICES } from "@/constants/services";
import { HOUSE_ROOM_ZONES } from "@/constants/house";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { SERVICE_DETAILS_LOCALE } from "@/locales/serviceData";
import { SERVICES_CONTENT } from "@/locales/services";
import { RoomHoverContext } from "@/contexts/RoomHoverContext";

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

const CARD_LIST_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.serviceCards,
  },
};

const ROOM_SLUG_MAP = Object.fromEntries(HOUSE_ROOM_ZONES.map((z) => [z.serviceSlug, z.id]));

const ACTIVE_CLASSES = "ring-accent motion-safe:-translate-y-1 shadow-lg";

export function Services() {
  const { locale } = useLocale();
  const content = SERVICES_CONTENT[locale];
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.section;
  const hoverContext = useContext(RoomHoverContext);
  const activeRoomId = hoverContext?.activeRoomId ?? null;
  const setActiveRoomId = hoverContext?.setActiveRoomId ?? (() => {});

  return (
    <Section
      aria-labelledby="services-title"
      className="premium-section premium-section-services"
      id="servizi"
      spacing="xl"
      surface="secondary"
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
              id="services-title"
            >
              {content.title}
            </h2>
            <p className="mt-6 max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg">
              {content.description}
            </p>
          </motion.div>

          <motion.ul
            aria-label={content.listLabel}
            className="mt-12 grid grid-cols-4 gap-6 tablet:grid-cols-8 laptop:grid-cols-12 laptop:gap-8"
            variants={CARD_LIST_VARIANTS}
          >
            {SERVICES.map((service) => {
              const localizedService = SERVICE_DETAILS_LOCALE[locale][service.slug];
              const roomId = ROOM_SLUG_MAP[service.slug] ?? null;
              const isActive = activeRoomId !== null && activeRoomId === roomId;

              return (
                <motion.li
                  className={`premium-card group relative col-span-4 h-full overflow-hidden rounded-2xl bg-gradient-to-b from-surface to-surface/95 shadow-sm outline outline-1 outline-divider/50 transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:translate-y-[var(--ds-motion-card-elevation)] motion-safe:hover:scale-[var(--ds-motion-hover-scale)] motion-safe:hover:shadow-lg motion-safe:focus-within:translate-y-[var(--ds-motion-card-elevation)] motion-safe:focus-within:scale-[var(--ds-motion-hover-scale)] motion-safe:focus-within:shadow-lg${isActive ? ` ${ACTIVE_CLASSES}` : ""}`}
                  key={service.slug}
                  onPointerEnter={() => roomId && setActiveRoomId(roomId)}
                  onPointerLeave={() => roomId && setActiveRoomId(null)}
                  transition={transition}
                  variants={ITEM_VARIANTS}
                >
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-[var(--ds-duration-normal)] ease-standard bg-gradient-to-b from-accent/5 to-transparent group-hover:opacity-100 group-focus-within:opacity-100" />
                  <Link
                    aria-label={`${content.discoverServiceLabel} ${localizedService.title}`}
                    className="relative flex h-full flex-col rounded-2xl p-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                    href={`/services/${service.slug}`}
                  >
                    <div className="premium-icon flex size-12 items-center justify-center rounded-xl bg-background-secondary text-accent shadow-sm ring-1 ring-accent/10 transition-all duration-[var(--ds-duration-normal)] ease-standard group-hover:bg-accent group-hover:shadow-md group-hover:ring-0 group-hover:text-on-accent">
                      <ServiceIcon className="size-icon-lg" name={service.icon} />
                    </div>
                    <h3 className="mt-8 font-heading text-xl font-semibold tracking-tight text-text-primary">
                      {localizedService.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {localizedService.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent transition-colors duration-[var(--ds-duration-normal)] ease-standard group-hover:text-accent-hover">
                      {content.discoverServiceLabel}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-within:translate-x-1"
                      />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            className="mt-12 flex flex-col gap-6 border-t border-divider pt-8 tablet:flex-row tablet:items-center tablet:justify-between"
            transition={transition}
            variants={ITEM_VARIANTS}
          >
            <p className="max-w-reading text-md leading-relaxed text-text-secondary">
              {content.ctaText}
            </p>
            <ButtonLink
              className="group w-full shrink-0 tablet:w-auto"
              href={content.ctaHref}
              trailingIcon={
                <ArrowRight
                  aria-hidden="true"
                  className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                />
              }
            >
              {content.ctaLabel}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
