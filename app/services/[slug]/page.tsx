import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { ServicePageContent } from "@/components/sections/ServicePageContent";
import { SERVICE_DETAILS } from "@/data/services";
import {
  createServiceStructuredData,
  getRelatedServices,
  getServiceBySlug,
} from "@/features/services";
import { createPageMetadata, serializeJsonLd } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_DETAILS.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return { robots: { follow: false, index: false } };

  const path = `/services/${service.slug}`;

  return createPageMetadata({
    title: service.metadata.title,
    description: service.metadata.description,
    imagePath: `${path}/opengraph-image`,
    path,
    twitterImagePath: `${path}/twitter-image`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const relatedServices = getRelatedServices(service);
  const structuredData = serializeJsonLd(createServiceStructuredData(service));

  return (
    <PageWrapper>
      <script dangerouslySetInnerHTML={{ __html: structuredData }} type="application/ld+json" />
      <ServicePageContent relatedServices={relatedServices} service={service} />
    </PageWrapper>
  );
}
