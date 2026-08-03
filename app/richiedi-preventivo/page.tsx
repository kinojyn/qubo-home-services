import { JsonLd } from "@/components/seo/JsonLd";
import { QuotePageAside, QuotePageHero, QuotePageIntro } from "@/components/quotes/QuotePageCopy";
import { ServiceWizard, type QuotesConfig } from "@/components/quotes/ServiceWizard";
import { Container } from "@/components/ui/Container";
import quotesConfig from "@/data/quotes-config.json";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

const INITIAL_QUOTES_CONFIG = quotesConfig as QuotesConfig;

export const metadata = createPageMetadata({
  title: "Richiedi Preventivo per lavori di casa in Friuli",
  description:
    "Richiedi un preventivo gratuito e immediato per servizi domestici in Friuli Venezia Giulia.",
  path: "/richiedi-preventivo",
});

type RichiediPreventivoPageProps = {
  searchParams: Promise<{
    city?: string | string[];
    locality?: string | string[];
  }>;
};

export default async function RichiediPreventivoPage({
  searchParams,
}: RichiediPreventivoPageProps) {
  const params = await searchParams;
  const initialLocality =
    typeof params.locality === "string"
      ? params.locality
      : typeof params.city === "string"
        ? params.city
        : undefined;

  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          title: "Richiedi Preventivo",
          description: "Richiedi un preventivo gratuito e immediato per servizi domestici.",
          path: "/richiedi-preventivo",
          type: "WebPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Richiedi Preventivo", path: "/richiedi-preventivo" },
          ],
        })}
      />
      <QuotePageHero />
      <section className="relative overflow-clip bg-background-secondary py-section-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-48 size-80 rounded-full opacity-[var(--ds-opacity-subtle)] blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--ds-color-orange-subtle), transparent 70%)",
          }}
        />
        <Container size="content">
          <div className="grid min-w-0 gap-8 desktop:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] desktop:items-start">
            <div className="mx-auto w-full min-w-0 max-w-reading desktop:mx-0 desktop:max-w-none">
              <QuotePageIntro />
              <div
                className="premium-form-surface min-w-0 scroll-mt-28 overflow-hidden rounded-2xl border border-border-default/70 shadow-xl shadow-black/5"
                id="preventivo-form"
              >
                <ServiceWizard
                  initialData={INITIAL_QUOTES_CONFIG}
                  initialLocality={initialLocality}
                />
              </div>
            </div>
            <QuotePageAside />
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
