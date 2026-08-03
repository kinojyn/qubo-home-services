import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceAreasGrid } from "@/components/sections/ServiceAreasGrid";
import { ServiceAreasPageHero } from "@/components/sections/ServiceAreasPageHero";
import { SERVICE_AREAS_PAGE_METADATA } from "@/constants/serviceAreas";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(SERVICE_AREAS_PAGE_METADATA);

export default function ServiceAreasPage() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          ...SERVICE_AREAS_PAGE_METADATA,
          type: "CollectionPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Zone servite", path: SERVICE_AREAS_PAGE_METADATA.path },
          ],
        })}
      />
      <ServiceAreasPageHero />
      <ServiceAreasGrid />
      <FinalCta />
    </PageWrapper>
  );
}
