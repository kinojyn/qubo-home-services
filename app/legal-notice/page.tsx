import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage } from "@/components/sections/LegalPage";
import { LEGAL_NOTICE_DOCUMENT } from "@/constants/legal";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(LEGAL_NOTICE_DOCUMENT);

export default function LegalNoticePage() {
  return (
    <PageWrapper>
      <JsonLd data={createPageStructuredData(LEGAL_NOTICE_DOCUMENT)} />
      <LegalPage document={LEGAL_NOTICE_DOCUMENT} />
    </PageWrapper>
  );
}
