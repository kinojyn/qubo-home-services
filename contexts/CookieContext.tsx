"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CookieCategory = "analytics" | "marketing" | "preferences" | "statistics";

export type CookiePreferences = Record<CookieCategory, boolean>;

const STORAGE_KEY = "ds-home-services-cookie-consent";
const BANNER_DISMISSED_KEY = "ds-home-services-cookie-banner-dismissed";
const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
const BANNER_DISMISS_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const DEFAULT_PREFERENCES: CookiePreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
  statistics: false,
};

type CookieContextValue = {
  bannerVisible: boolean;
  dismissBanner: () => void;
  preferences: CookiePreferences;
  openPreferences: () => void;
  preferencesOpen: boolean;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (prefs: CookiePreferences) => void;
  hasInteracted: boolean;
};

type StoredCookiePreferences = Partial<CookiePreferences> & {
  savedAt?: number;
};

const CookieContext = createContext<CookieContextValue | null>(null);

function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredCookiePreferences;
    const isExpired =
      typeof parsed.savedAt !== "number" ||
      parsed.savedAt > Date.now() ||
      Date.now() - parsed.savedAt > CONSENT_MAX_AGE_MS;

    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      analytics: parsed.analytics ?? false,
      marketing: parsed.marketing ?? false,
      preferences: parsed.preferences ?? false,
      statistics: parsed.statistics ?? false,
    };
  } catch {
    return null;
  }
}

function storePreferences(prefs: CookiePreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, savedAt: Date.now() }));
  } catch {
    /* silently ignore storage errors */
  }
}

function getBannerDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const dismissedAt = Number(localStorage.getItem(BANNER_DISMISSED_KEY));
    const isValid =
      Number.isFinite(dismissedAt) &&
      dismissedAt <= Date.now() &&
      Date.now() - dismissedAt <= BANNER_DISMISS_MAX_AGE_MS;

    if (!isValid) localStorage.removeItem(BANNER_DISMISSED_KEY);
    return isValid;
  } catch {
    return false;
  }
}

function storeBannerDismissed(): void {
  try {
    localStorage.setItem(BANNER_DISMISSED_KEY, String(Date.now()));
  } catch {
    /* silently ignore storage errors */
  }
}

type CookieProviderProps = {
  children: ReactNode;
};

export function CookieProvider({ children }: CookieProviderProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const stored = getStoredPreferences();
    if (stored) {
      setPreferences(stored);
      setHasInteracted(true);
      setBannerVisible(false);
    } else {
      const dismissed = getBannerDismissed();
      setBannerVisible(!dismissed);
    }
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerVisible(false);
    storeBannerDismissed();
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const acceptAll = useCallback(() => {
    const all: CookiePreferences = {
      analytics: true,
      marketing: true,
      preferences: true,
      statistics: true,
    };
    setPreferences(all);
    storePreferences(all);
    setHasInteracted(true);
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    storePreferences(DEFAULT_PREFERENCES);
    setHasInteracted(true);
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const updatePreferences = useCallback((prefs: CookiePreferences) => {
    setPreferences(prefs);
    storePreferences(prefs);
    setHasInteracted(true);
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const value = useMemo<CookieContextValue>(
    () => ({
      acceptAll,
      bannerVisible,
      closePreferences,
      dismissBanner,
      hasInteracted,
      openPreferences,
      preferences,
      preferencesOpen,
      rejectAll,
      updatePreferences,
    }),
    [
      acceptAll,
      bannerVisible,
      closePreferences,
      dismissBanner,
      hasInteracted,
      openPreferences,
      preferences,
      preferencesOpen,
      rejectAll,
      updatePreferences,
    ],
  );

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
}

export function useCookieConsent(): CookieContextValue {
  const ctx = useContext(CookieContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return ctx;
}
