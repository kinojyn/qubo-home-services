export type ServiceIcon = "electrical" | "plumbing" | "furniture" | "media" | "doors" | "handyman";

export type ServiceSlug =
  | "riparazioni-elettriche"
  | "piccoli-interventi-idraulici"
  | "montaggio-mobili"
  | "tv-e-tende"
  | "porte-e-serrature"
  | "pittura-e-lavori-tuttofare";

export type ServiceBenefit = {
  description: string;
  title: string;
};

export type ServiceFaqItem = {
  answer: string;
  id: string;
  question: string;
};

export type ServiceMetadata = {
  description: string;
  title: string;
};

export type ServiceDetail = {
  areaDescription: string;
  benefits: readonly ServiceBenefit[];
  description: string;
  eyebrow: string;
  faq: readonly ServiceFaqItem[];
  headline: string;
  icon: ServiceIcon;
  introduction: string;
  metadata: ServiceMetadata;
  problems: readonly string[];
  relatedSlugs: readonly ServiceSlug[];
  slug: ServiceSlug;
  title: string;
};
