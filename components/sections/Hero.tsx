"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle, UsersRound, Zap } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { MOTION_SEQUENCES, MOTION_TRANSITIONS } from "@/constants/motion";
import { useLocale } from "@/contexts/LocaleContext";
import { useSettings } from "@/contexts/SettingsContext";
import { HERO_CONTENT, HERO_TRUST_INDICATORS } from "@/locales/hero";

import { HeroTrustRating } from "@/components/trust/HeroTrustRating";
import { InteractiveHouse } from "./InteractiveHouse";

const HERO_ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: "var(--ds-motion-distance-lg)",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const HERO_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: MOTION_SEQUENCES.hero,
  },
};

const TRUST_ICONS = {
  response: Zap,
  local: MapPin,
  team: UsersRound,
} as const;

export function Hero() {
  const { locale } = useLocale();
  const content = HERO_CONTENT[locale];
  const trustIndicators = HERO_TRUST_INDICATORS[locale];
  const { getWhatsAppUrl } = useSettings();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.hero;

  return (
    <motion.section
      animate="visible"
      aria-describedby="hero-description"
      aria-labelledby="hero-title"
      className="premium-hero relative flex min-h-svh items-center bg-background-primary pb-20 pt-24 tablet:pb-24 tablet:pt-30 laptop:py-30"
      initial={false}
      variants={shouldReduceMotion ? undefined : HERO_CONTAINER_VARIANTS}
    >
      <Container size="wide">
        <Grid className="items-center gap-y-16 laptop:gap-x-12 laptop:gap-y-0">
          <div className="relative z-20 col-span-4 tablet:col-span-8 laptop:col-span-6 laptop:col-start-1 laptop:row-start-1">
            <div className="grid max-w-reading gap-8">
              <motion.div
                className="grid gap-6"
                transition={transition}
                variants={HERO_ITEM_VARIANTS}
              >
                <h1
                  className="bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-balance font-display text-4xl font-semibold leading-tight tracking-tight text-transparent tablet:text-5xl laptop:text-hero"
                  id="hero-title"
                >
                  {content.headlineFirstLine}
                  <span className="block">{content.headlineSecondLine}</span>
                </h1>
                <p
                  className="max-w-narrow text-pretty text-md leading-relaxed text-text-secondary tablet:text-lg"
                  id="hero-description"
                >
                  {content.description}
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3 mobile:flex-row"
                transition={transition}
                variants={HERO_ITEM_VARIANTS}
              >
                <ButtonLink
                  className="group w-full mobile:w-auto"
                  href={content.primaryCtaHref}
                  trailingIcon={
                    <ArrowRight
                      aria-hidden="true"
                      className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
                    />
                  }
                >
                  {content.primaryCtaLabel}
                </ButtonLink>
                <ButtonLink
                  className="group w-full mobile:w-auto"
                  href={getWhatsAppUrl()}
                  leadingIcon={
                    <MessageCircle
                      aria-hidden="true"
                      className="size-icon-md transition-transform duration-[var(--ds-duration-normal)] ease-standard motion-safe:group-hover:scale-[var(--ds-motion-hover-scale)] motion-safe:group-focus-visible:scale-[var(--ds-motion-hover-scale)]"
                    />
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  {content.emergencyCtaLabel}
                </ButtonLink>
              </motion.div>

              <motion.div transition={transition} variants={HERO_ITEM_VARIANTS}>
                <HeroTrustRating />
              </motion.div>

              <motion.ul
                aria-label={content.trustLabel}
                className="flex flex-wrap gap-x-6 gap-y-3"
                transition={transition}
                variants={HERO_ITEM_VARIANTS}
              >
                {trustIndicators.map((indicator) => {
                  const Icon = TRUST_ICONS[indicator.icon];

                  return (
                    <li
                      className="flex min-h-touch-target items-center gap-2 rounded-full bg-gradient-to-r from-orange-soft/40 to-transparent px-4 py-1.5 text-xs font-medium text-text-secondary shadow-sm"
                      key={indicator.label}
                    >
                      <Icon aria-hidden="true" className="size-icon-sm text-accent" />
                      {indicator.label}
                    </li>
                  );
                })}
              </motion.ul>
            </div>
          </div>

          <motion.div
            className="relative z-30 col-span-4 w-full justify-self-center tablet:col-span-8 laptop:col-span-7 laptop:col-start-6 laptop:row-start-1 laptop:translate-x-8 laptop:scale-[1.1]"
            transition={transition}
            variants={HERO_ITEM_VARIANTS}
          >
            <InteractiveHouse />
          </motion.div>
        </Grid>
      </Container>
    </motion.section>
  );
}
