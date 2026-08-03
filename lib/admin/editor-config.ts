import type { SectionId } from "@/types/admin";

export type FieldType = "text" | "textarea" | "href" | "image" | "number" | "icon";

export interface SectionField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

export interface ListConfig {
  itemLabel: string;
  itemsLabel: string;
  addLabel: string;
  fields: SectionField[];
  defaultItem: Record<string, string>;
  keyField?: string;
}

export interface SectionEditorConfig {
  fields: SectionField[];
  listConfig?: ListConfig;
}

export const SECTION_EDITOR_CONFIGS: Record<SectionId, SectionEditorConfig> = {
  hero: {
    fields: [
      { key: "headlineFirstLine", label: "Headline (first line)", type: "text" },
      { key: "headlineSecondLine", label: "Headline (second line)", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryCtaLabel", label: "Primary CTA label", type: "text" },
      { key: "primaryCtaHref", label: "Primary CTA href", type: "href" },
      { key: "emergencyCtaLabel", label: "Emergency CTA label", type: "text" },
      { key: "emergencyCtaHref", label: "Emergency CTA href", type: "href" },
      { key: "trustLabel", label: "Trust section label", type: "text" },
    ],
  },

  services: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "listLabel", label: "List ARIA label", type: "text" },
      { key: "ctaText", label: "CTA text", type: "textarea" },
      { key: "ctaLabel", label: "CTA button label", type: "text" },
      { key: "ctaHref", label: "CTA button href", type: "href" },
    ],
    listConfig: {
      itemLabel: "service",
      itemsLabel: "Services",
      addLabel: "Add service",
      keyField: "slug",
      defaultItem: { title: "", description: "", slug: "", icon: "handyman" },
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "slug", label: "Slug", type: "text", placeholder: "e.g. riparazioni-elettriche" },
        { key: "icon", label: "Icon name", type: "icon" },
      ],
    },
  },

  howItWorks: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "listLabel", label: "List ARIA label", type: "text" },
    ],
    listConfig: {
      itemLabel: "step",
      itemsLabel: "Steps",
      addLabel: "Add step",
      keyField: "number",
      defaultItem: { number: "", title: "", description: "" },
      fields: [
        { key: "number", label: "Number", type: "text", placeholder: "e.g. 01" },
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  },

  whyChooseUs: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "listLabel", label: "List ARIA label", type: "text" },
    ],
    listConfig: {
      itemLabel: "feature",
      itemsLabel: "Features",
      addLabel: "Add feature",
      defaultItem: { title: "", description: "", icon: "contact" },
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon", label: "Icon", type: "icon" },
      ],
    },
  },

  statistics: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    listConfig: {
      itemLabel: "statistic",
      itemsLabel: "Statistics",
      addLabel: "Add statistic",
      defaultItem: { value: "0", suffix: "", label: "", description: "", accessibleValue: "" },
      fields: [
        { key: "value", label: "Value", type: "number" },
        { key: "suffix", label: "Suffix", type: "text", placeholder: "e.g. +, %, k" },
        { key: "label", label: "Label", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  },

  testimonials: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "notice", label: "Notice text", type: "textarea" },
      { key: "previousLabel", label: "Previous button label", type: "text" },
      { key: "nextLabel", label: "Next button label", type: "text" },
    ],
    listConfig: {
      itemLabel: "review",
      itemsLabel: "Reviews",
      addLabel: "Add review",
      defaultItem: { name: "", text: "", role: "", rating: "5" },
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "text", label: "Review text", type: "textarea" },
        { key: "role", label: "Role", type: "text" },
        { key: "rating", label: "Rating (1-5)", type: "number" },
      ],
    },
  },

  gallery: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "notice", label: "Notice text", type: "textarea" },
    ],
    listConfig: {
      itemLabel: "project",
      itemsLabel: "Projects",
      addLabel: "Add project",
      keyField: "id",
      defaultItem: { title: "", id: "", before: "", after: "" },
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "id", label: "ID", type: "text", placeholder: "unique identifier" },
        { key: "before", label: "Before image URL", type: "image" },
        { key: "after", label: "After image URL", type: "image" },
      ],
    },
  },

  faq: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    listConfig: {
      itemLabel: "question",
      itemsLabel: "FAQ items",
      addLabel: "Add question",
      keyField: "id",
      defaultItem: { question: "", answer: "", id: "" },
      fields: [
        { key: "question", label: "Question", type: "text" },
        { key: "answer", label: "Answer", type: "textarea" },
        { key: "id", label: "ID", type: "text", placeholder: "unique identifier" },
      ],
    },
  },

  estimate: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  contact: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },

  finalCta: {
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "primaryLabel", label: "Primary button label", type: "text" },
      { key: "primaryHref", label: "Primary button href", type: "href" },
      { key: "secondaryLabel", label: "Secondary button label", type: "text" },
      { key: "secondaryHref", label: "Secondary button href", type: "href" },
    ],
  },
};
