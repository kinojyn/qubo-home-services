import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutPageHero } from "@/components/sections/AboutPageHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { AboutValues } from "@/components/sections/AboutValues";
import { FinalCta } from "@/components/sections/FinalCta";
import { ABOUT_PAGE_METADATA } from "@/constants/about";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata(ABOUT_PAGE_METADATA);

export default function AboutPage() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          ...ABOUT_PAGE_METADATA,
          type: "AboutPage",
          breadcrumbs: [
            { name: "Home", path: "/" },
            { name: "Chi siamo", path: ABOUT_PAGE_METADATA.path },
          ],
        })}
      />
      <AboutPageHero />
      <AboutStory />
      <AboutValues />
      <FinalCta />
    </PageWrapper>
  );
}
