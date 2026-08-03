export type SectionId =
  | "hero"
  | "services"
  | "howItWorks"
  | "whyChooseUs"
  | "statistics"
  | "testimonials"
  | "gallery"
  | "faq"
  | "estimate"
  | "contact"
  | "finalCta";

export type AdminStatus = "draft" | "published";

export interface AdminUser {
  username: string;
  passwordHash: string;
}

export interface AdminSession {
  id: string;
  username: string;
  createdAt: number;
}

export interface DraftMeta {
  updatedAt: number;
  updatedBy: string;
  version: number;
}

export interface SectionDraft {
  id: SectionId;
  visible: boolean;
  order: number;
  content: Record<string, unknown>;
}

export interface PageDraft {
  sections: SectionDraft[];
  meta: DraftMeta;
}

export interface ContentDraft {
  home: PageDraft;
  about: PageDraft;
  services: PageDraft;
  serviceAreas: PageDraft;
  gallery: PageDraft;
  faq: PageDraft;
  contact: PageDraft;
  legal: PageDraft;
  meta: DraftMeta;
}

export interface VersionRecord {
  id: string;
  timestamp: number;
  user: string;
  label: string;
  snapshot: ContentDraft;
}
