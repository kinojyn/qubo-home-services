"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Globe2, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Drawer } from "@/components/ui/Drawer";
import { BrandLogo } from "@/components/navigation/BrandLogo";
import { MOTION_TRANSITIONS } from "@/constants/motion";
import { LAPTOP_MEDIA_QUERY } from "@/constants/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { NAVIGATION_CONTENT, NAVIGATION_LINKS } from "@/locales/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { LOCALE_META, LOCALES } from "@/types/locale";
import { mergeClassNames } from "@/utils/mergeClassNames";

const NAVIGATION_LINK_CLASS_NAME =
  "inline-flex min-h-touch-target items-center rounded-sm px-3 text-sm font-medium text-text-secondary transition duration-[var(--ds-duration-normal)] ease-standard hover:bg-background-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

const LANGUAGE_LABELS = {
  it: { current: "Lingua", select: "Seleziona lingua" },
  en: { current: "Language", select: "Select language" },
  de: { current: "Sprache", select: "Sprache auswählen" },
} as const;

function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  function select(next: (typeof LOCALES)[number]) {
    setLocale(next);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  const currentMeta = LOCALE_META[locale];
  const languageLabels = LANGUAGE_LABELS[locale];

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${languageLabels.current}: ${currentMeta.label}`}
        className="inline-flex min-h-touch-target items-center gap-2 rounded-md px-3 text-sm font-medium text-text-secondary transition duration-[var(--ds-duration-normal)] ease-standard hover:bg-background-secondary hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        onClick={() => setIsOpen((prev) => !prev)}
        ref={triggerRef}
        type="button"
      >
        <Globe2 aria-hidden="true" className="size-icon-md" />
        <span aria-hidden="true">{currentMeta.shortLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-icon-sm opacity-[var(--ds-opacity-muted)] transition-transform duration-[var(--ds-duration-normal)] ease-standard"
          style={{ rotate: isOpen ? "180deg" : "0deg" }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-[var(--ds-z-dropdown)] mt-2 min-w-[9rem] overflow-hidden rounded-lg border border-divider bg-surface py-1 shadow-lg"
          ref={panelRef}
          role="listbox"
          aria-label={languageLabels.select}
        >
          {LOCALES.map((l) => {
            const meta = LOCALE_META[l];
            const isActive = l === locale;
            return (
              <button
                aria-selected={isActive}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-text-secondary transition duration-[var(--ds-duration-normal)] ease-standard hover:bg-background-secondary hover:text-text-primary"
                key={l}
                onClick={() => select(l)}
                role="option"
                type="button"
              >
                <span className="flex-1">{meta.label}</span>
                {isActive && <Check aria-hidden="true" className="size-icon-sm text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NavigationLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { locale } = useLocale();
  return (
    <nav
      aria-label={
        mobile
          ? NAVIGATION_CONTENT[locale].mobileNavigationLabel
          : NAVIGATION_CONTENT[locale].primaryNavigationLabel
      }
      className={mergeClassNames(mobile ? "grid gap-2" : "flex items-center gap-1")}
    >
      {NAVIGATION_LINKS[locale].map((link) => (
        <Link
          className={mergeClassNames(
            NAVIGATION_LINK_CLASS_NAME,
            mobile && "w-full justify-between px-4",
          )}
          href={link.href}
          key={link.href}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const isScrolled = useScrolled();
  const { locale } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion
    ? MOTION_TRANSITIONS.instant
    : MOTION_TRANSITIONS.navigation;

  const content = NAVIGATION_CONTENT[locale];

  useEffect(() => {
    const mediaQuery = window.matchMedia(LAPTOP_MEDIA_QUERY);

    function closeDesktopMenu(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    }

    mediaQuery.addEventListener("change", closeDesktopMenu);
    return () => mediaQuery.removeEventListener("change", closeDesktopMenu);
  }, []);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: isScrolled
            ? "var(--ds-color-glass-surface-strong)"
            : "var(--ds-color-surface-transparent)",
          borderColor: isScrolled
            ? "var(--ds-color-divider)"
            : "var(--ds-color-divider-transparent)",
          boxShadow: isScrolled ? "var(--ds-shadow-premium-navbar)" : "none",
        }}
        className="premium-navbar fixed inset-x-0 top-0 z-[var(--ds-z-sticky)] border-b"
        data-state={isScrolled ? "solid" : "transparent"}
        initial={false}
        transition={transition}
      >
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[var(--ds-z-tooltip)] focus:rounded-md focus:bg-surface focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-text-primary focus:shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-focus-ring"
          href="#main-content"
        >
          {content.skipLinkLabel}
        </a>
        <Container size="wide">
          <div className="flex min-h-20 items-center justify-between gap-4">
            <BrandLogo />

            <div className="hidden items-center gap-2 laptop:flex">
              <NavigationLinks />
              <LanguageSwitcher />
              <ButtonLink href={content.ctaHref}>{content.ctaLabel}</ButtonLink>
            </div>

            <div className="flex items-center gap-2 laptop:hidden">
              <div className="hidden items-center gap-2 tablet:flex">
                <LanguageSwitcher />
                <ButtonLink className="px-4" href={content.ctaHref}>
                  {content.ctaLabel}
                </ButtonLink>
              </div>
              <Button
                aria-controls={mobileMenuId}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? content.menuCloseLabel : content.menuOpenLabel}
                onClick={() => setIsMenuOpen(true)}
                variant="icon"
              >
                <Menu aria-hidden="true" className="size-icon-lg" />
              </Button>
            </div>
          </div>
        </Container>
      </motion.header>

      <Drawer
        closeLabel={content.menuCloseLabel}
        id={mobileMenuId}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        title={content.menuLabel}
      >
        <div className="grid gap-8">
          <NavigationLinks mobile onNavigate={closeMenu} />
          <div className="grid gap-4 border-t border-divider pt-6">
            <LanguageSwitcher />
            <ButtonLink href={content.ctaHref} onClick={closeMenu}>
              {content.ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </Drawer>
    </>
  );
}
