import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { SERVICES_PAGE_METADATA } from "@/constants/servicesPage";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata({
  ...SERVICES_PAGE_METADATA,
  imagePath: "/services/opengraph-image",
  twitterImagePath: "/services/twitter-image",
});

export default function ServicesPage() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          ...SERVICES_PAGE_METADATA,
          type: "CollectionPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Servizi", path: SERVICES_PAGE_METADATA.path },
          ],
        })}
      />
      <ServicesPageContent />
    </PageWrapper>
  );
}
