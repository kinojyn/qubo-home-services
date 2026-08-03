import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage } from "@/components/sections/LegalPage";
import { COOKIE_DOCUMENT } from "@/constants/legal";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(COOKIE_DOCUMENT);

export default function CookiePolicyPage() {
  return (
    <PageWrapper>
      <JsonLd data={createPageStructuredData(COOKIE_DOCUMENT)} />
      <LegalPage document={COOKIE_DOCUMENT} />
    </PageWrapper>
  );
}
