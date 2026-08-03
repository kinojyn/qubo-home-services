import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage } from "@/components/sections/LegalPage";
import { TERMS_DOCUMENT } from "@/constants/legal";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(TERMS_DOCUMENT);

export default function TermsPage() {
  return (
    <PageWrapper>
      <JsonLd data={createPageStructuredData(TERMS_DOCUMENT)} />
      <LegalPage document={TERMS_DOCUMENT} />
    </PageWrapper>
  );
}
