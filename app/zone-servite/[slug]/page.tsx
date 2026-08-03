import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { JsonLd } from "@/components/seo/JsonLd";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceAreaContent } from "@/components/sections/ServiceAreaContent";
import { ServiceAreaPageHero } from "@/components/sections/ServiceAreaPageHero";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import {
  createServiceAreaStructuredData,
  getRelatedServiceAreas,
  getServiceAreaBySlug,
} from "@/features/serviceAreas";
import { createPageMetadata } from "@/lib/seo";

type ServiceAreaPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: ServiceAreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) return { robots: { follow: false, index: false } };

  return createPageMetadata({
    ...area.metadata,
    path: `/zone-servite/${area.slug}`,
  });
}

export default async function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) notFound();

  return (
    <PageWrapper>
      <JsonLd data={createServiceAreaStructuredData(area)} />
      <ServiceAreaPageHero area={area} />
      <ServiceAreaContent area={area} relatedAreas={getRelatedServiceAreas(area.slug)} />
      <FinalCta />
    </PageWrapper>
  );
}
