"use client";

import { ServiceShowcaseSection } from "@/components/sections/ServiceShowcaseSection";
import { useLocale } from "@/contexts/LocaleContext";
import { SERVICE_DETAILS } from "@/data/services";
import { SERVICE_DETAILS_LOCALE } from "@/locales/serviceData";

export function ServicesShowcase() {
  const { locale } = useLocale();
  const services = SERVICE_DETAILS.map((service) => ({
    ...service,
    ...SERVICE_DETAILS_LOCALE[locale][service.slug],
  }));

  return (
    <>
      {services.map((service, index) => (
        <ServiceShowcaseSection index={index} key={service.slug} service={service} />
      ))}
    </>
  );
}
