import { JsonLd } from "@/components/seo/JsonLd";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Faq } from "@/components/sections/Faq";
import { Estimate } from "@/components/sections/Estimate";
import { FinalCta } from "@/components/sections/FinalCta";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Services } from "@/components/sections/Services";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { siteConfig } from "@/config/site";
import { createPageMetadata, createPageStructuredData } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: siteConfig.homeTitle,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  return (
    <PageWrapper>
      <JsonLd
        data={createPageStructuredData({
          description: siteConfig.description,
          path: "/",
          title: siteConfig.homeTitle,
        })}
      />
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <Gallery />
      <Faq />
      <Estimate />
      <FinalCta />
    </PageWrapper>
  );
}
