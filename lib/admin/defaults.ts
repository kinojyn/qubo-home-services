import type { ContentDraft, SectionDraft } from "@/types/admin";

function s(
  id: SectionDraft["id"],
  index: number,
  extra: Record<string, unknown> = {},
): SectionDraft {
  return { id, visible: true, order: index, content: extra };
}

export function createDefaultDraft(): ContentDraft {
  const home: ContentDraft["home"] = {
    sections: [
      s("hero", 0),
      s("services", 1),
      s("howItWorks", 2),
      s("whyChooseUs", 3),
      s("statistics", 4),
      s("testimonials", 5),
      s("gallery", 6),
      s("faq", 7),
      s("estimate", 8),
      s("contact", 9),
      s("finalCta", 10),
    ],
    meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 },
  };

  return {
    home,
    about: { sections: [], meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 } },
    services: { sections: [], meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 } },
    serviceAreas: {
      sections: [],
      meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 },
    },
    gallery: { sections: [], meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 } },
    faq: { sections: [], meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 } },
    contact: { sections: [], meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 } },
    legal: { sections: [], meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 } },
    meta: { updatedAt: Date.now(), updatedBy: "system", version: 1 },
  };
}
