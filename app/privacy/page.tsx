import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage } from "@/components/sections/LegalPage";
import { PRIVACY_DOCUMENT } from "@/constants/legal";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(PRIVACY_DOCUMENT);

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <JsonLd data={createPageStructuredData(PRIVACY_DOCUMENT)} />
      <LegalPage document={PRIVACY_DOCUMENT} />
    </PageWrapper>
  );
}
