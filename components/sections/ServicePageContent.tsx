"use client";

import { FinalCta } from "@/components/sections/FinalCta";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceBenefits } from "@/components/sections/ServiceBenefits";
import { ServiceFaq } from "@/components/sections/ServiceFaq";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { ServiceProblems } from "@/components/sections/ServiceProblems";
import { useLocale } from "@/contexts/LocaleContext";
import type { ServiceDetail } from "@/features/services";
import { SERVICE_DETAILS_LOCALE } from "@/locales/serviceData";

type ServicePageContentProps = {
  service: ServiceDetail;
  relatedServices: readonly ServiceDetail[];
};

export function ServicePageContent({ service, relatedServices }: ServicePageContentProps) {
  const { locale } = useLocale();
  const localServices = SERVICE_DETAILS_LOCALE[locale];
  const localizedService = { ...service, ...localServices[service.slug] };
  const localizedRelated = relatedServices.map((item) => ({
    ...item,
    ...localServices[item.slug],
  }));

  return (
    <>
      <ServicePageHero service={localizedService} />
      <ServiceBenefits benefits={localizedService.benefits} />
      <ServiceProblems
        areaDescription={localizedService.areaDescription}
        problems={localizedService.problems}
      />
      <HowItWorks />
      <ServiceFaq items={localizedService.faq} />
      <RelatedServices services={localizedRelated} />
      <FinalCta />
    </>
  );
}
