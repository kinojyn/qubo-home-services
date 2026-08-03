import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { Gallery } from "@/components/sections/Gallery";
import { GalleryPageHero } from "@/components/sections/GalleryPageHero";
import { GALLERY_PAGE_METADATA } from "@/constants/gallery";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(GALLERY_PAGE_METADATA);

export default function GalleryPage() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          ...GALLERY_PAGE_METADATA,
          type: "CollectionPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Galleria", path: GALLERY_PAGE_METADATA.path },
          ],
        })}
      />
      <GalleryPageHero />
      <Gallery />
      <FinalCta />
    </PageWrapper>
  );
}
