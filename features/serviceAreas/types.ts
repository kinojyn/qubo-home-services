export type ServiceAreaSlug = "udine" | "trieste" | "pordenone" | "gorizia";

export type ServiceAreaBenefit = {
  description: string;
  title: string;
};

export type ServiceAreaMetadata = {
  description: string;
  title: string;
};

export type ServiceArea = {
  benefits: readonly ServiceAreaBenefit[];
  city: string;
  headline: string;
  introduction: string;
  localContext: string;
  metadata: ServiceAreaMetadata;
  nearbyAreas: readonly string[];
  province: string;
  slug: ServiceAreaSlug;
};
