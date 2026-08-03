import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

function renderWithLocale(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult {
  return render(ui, { wrapper: LocaleProvider, ...options });
}

function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult {
  function Providers({ children }: { children: ReactNode }) {
    return (
      <LocaleProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </LocaleProvider>
    );
  }

  return render(ui, { wrapper: Providers, ...options });
}

export { renderWithLocale, renderWithProviders };
