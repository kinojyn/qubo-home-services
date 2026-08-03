import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { Faq } from "@/components/sections/Faq";
import { FaqPageHero } from "@/components/sections/FaqPageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { FAQ_PAGE_METADATA } from "@/constants/faq";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(FAQ_PAGE_METADATA);

export default function FaqPage() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          ...FAQ_PAGE_METADATA,
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "FAQ", path: FAQ_PAGE_METADATA.path },
          ],
        })}
      />
      <FaqPageHero />
      <Faq />
      <FinalCta />
    </PageWrapper>
  );
}
