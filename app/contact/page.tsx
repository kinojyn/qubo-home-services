import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { Contact } from "@/components/sections/Contact";
import { ContactPageHero } from "@/components/sections/ContactPageHero";
import { CONTACT_PAGE_METADATA } from "@/constants/contact";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(CONTACT_PAGE_METADATA);

export default function ContactPage() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          ...CONTACT_PAGE_METADATA,
          type: "ContactPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Contatti", path: CONTACT_PAGE_METADATA.path },
          ],
        })}
      />
      <ContactPageHero />
      <Contact />
    </PageWrapper>
  );
}
