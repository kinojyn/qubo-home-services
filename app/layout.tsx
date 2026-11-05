import type { ReactNode } from "react";

import { FloatingCta, FloatingOrbs, ScrollProgress } from "@/components/feedback";
import { VercelAnalytics } from "@/components/analytics/VercelAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/layout/CookiePreferencesModal";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Navbar } from "@/components/navigation/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { CookieProvider } from "@/contexts/CookieContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { createRootMetadata, createSiteStructuredData } from "@/lib/seo";
import { LOCALE_META } from "@/types/locale";

import "./globals.css";

export const metadata = createRootMetadata();

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={LOCALE_META.it.languageTag}>
      <body>
        <LocaleProvider>
          <SettingsProvider>
            <CookieProvider>
              <JsonLd data={createSiteStructuredData()} />
              <SiteChrome>
                <ScrollProgress />
                <FloatingOrbs />
                <Navbar />
              </SiteChrome>
              {children}
              <SiteChrome>
                <FloatingCta />
                <Footer />
                <CookieConsentBanner />
              </SiteChrome>
              <CookiePreferencesModal />
              <VercelAnalytics />
              <MetaPixel />
            </CookieProvider>
          </SettingsProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
