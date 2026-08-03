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

export type AppSettings = {
  whatsappNumber: string;
};

type SettingsContextValue = {
  loading: boolean;
  settings: AppSettings;

  /** Returns the full wa.me URL for the configured WhatsApp number */
  getWhatsAppUrl(): string;
};

const DEFAULT_SETTINGS: AppSettings = {
  whatsappNumber: "393201391900",
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to load settings");
        const data = (await res.json()) as AppSettings;
        if (!cancelled) {
          setSettings(data);
        }
      } catch {
        /* keep defaults on error */
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const getWhatsAppUrl = useCallback(() => {
    const clean = settings.whatsappNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${clean}`;
  }, [settings.whatsappNumber]);

  const value = useMemo<SettingsContextValue>(
    () => ({ getWhatsAppUrl, loading, settings }),
    [getWhatsAppUrl, loading, settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}
