"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { HERO_CONTENT, HERO_TRUST_INDICATORS } from "@/locales/hero";
import { SERVICES_CONTENT } from "@/locales/services";
import { PROCESS_CONTENT, PROCESS_STEPS } from "@/locales/process";
import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES } from "@/locales/whyChooseUs";
import { STATISTICS_CONTENT, STATISTICS } from "@/locales/statistics";
import { TESTIMONIALS_CONTENT } from "@/locales/testimonials";
import { GALLERY_CONTENT } from "@/locales/gallery";
import { FAQ_CONTENT, FAQ_ITEMS } from "@/locales/faq";
import { ESTIMATE_CONTENT } from "@/constants/estimate";
import { CONTACT_CONTENT } from "@/constants/contact";
import { FINAL_CTA_CONTENT } from "@/locales/finalCta";
import type { SectionId } from "@/types/admin";

function mergeContent<T extends Record<string, unknown>>(
  base: T,
  overrides: Record<string, unknown> | undefined,
): T {
  if (!overrides) return base;
  const result = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== undefined && value !== null && key !== "_items" && key !== "_listItems") {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
}

function getListItems<T>(
  defaultItems: readonly T[],
  overrides: Record<string, unknown> | undefined,
): T[] {
  if (!overrides) return [...defaultItems];
  const overrideItems = overrides._items || overrides._listItems;
  if (Array.isArray(overrideItems) && overrideItems.length > 0) return overrideItems as T[];
  return [...defaultItems];
}

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-block rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400">
      {label}
    </span>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</h4>
      {children}
    </div>
  );
}

type PreviewProps = {
  content: Record<string, unknown>;
};

function HeroPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = HERO_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  const indicators = getListItems(HERO_TRUST_INDICATORS[locale], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Hero" />
      <h2 className="text-2xl font-bold text-white">
        {merged.headlineFirstLine as string} {merged.headlineSecondLine as string}
      </h2>
      <p className="text-zinc-400">{(merged.description as string)?.slice(0, 150)}...</p>
      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-amber-600/20 px-3 py-1 text-sm text-amber-400">
          {(merged.primaryCtaLabel as string) || "N/A"}
        </span>
        <span className="rounded bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
          {(merged.emergencyCtaLabel as string) || "N/A"}
        </span>
      </div>
      {indicators.length > 0 && (
        <FieldGroup label="Trust Indicators">
          <div className="flex flex-wrap gap-2">
            {indicators.map((item, i) => (
              <span key={i} className="rounded bg-zinc-800/50 px-2 py-1 text-xs text-zinc-500">
                {(item as { icon: string; label: string }).label}
              </span>
            ))}
          </div>
        </FieldGroup>
      )}
    </div>
  );
}

function ServicesPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = SERVICES_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Services" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <p className="rounded bg-zinc-800/50 px-3 py-2 text-sm text-zinc-500">
        {(merged.ctaText as string) || ""}
      </p>
    </div>
  );
}

function HowItWorksPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const merged = mergeContent(
    PROCESS_CONTENT[locale] as unknown as Record<string, unknown>,
    content,
  );
  const steps = getListItems(PROCESS_STEPS[locale], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="How It Works" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <FieldGroup label="Steps">
        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((step, i) => (
            <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <span className="text-xs font-bold text-amber-500">
                {(step as { number: string; title: string; description: string }).number}
              </span>
              <h4 className="mt-1 text-sm font-semibold text-white">
                {(step as { number: string; title: string; description: string }).title}
              </h4>
              <p className="mt-1 text-xs text-zinc-500">
                {(step as { number: string; title: string; description: string }).description}
              </p>
            </div>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}

function WhyChooseUsPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = WHY_CHOOSE_US_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  const features = getListItems(WHY_CHOOSE_US_FEATURES[locale], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Why Choose Us" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <FieldGroup label="Features">
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feat, i) => (
            <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase text-amber-500/60">
                  {(feat as { icon: string; title: string; description: string }).icon}
                </span>
                <h4 className="text-sm font-semibold text-white">
                  {(feat as { icon: string; title: string; description: string }).title}
                </h4>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                {(feat as { icon: string; title: string; description: string }).description}
              </p>
            </div>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}

function StatisticsPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = STATISTICS_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  const stats = getListItems(STATISTICS[locale], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Statistics" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <FieldGroup label="Stats">
        <div className="grid gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-center"
            >
              <div className="text-2xl font-bold text-amber-400">
                {(stat as { value: number; suffix: string; label: string }).value}
                {(stat as { value: number; suffix: string; label: string }).suffix}
              </div>
              <p className="text-xs text-zinc-400">
                {(stat as { value: number; suffix: string; label: string }).label}
              </p>
            </div>
          ))}
        </div>
      </FieldGroup>
    </div>
  );
}

function TestimonialsPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = TESTIMONIALS_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  const items = getListItems([], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Testimonials" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      {items.length > 0 && (
        <FieldGroup label="Reviews">
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">
                    {(item as { name: string; text: string; role: string; rating?: number }).name}
                  </h4>
                  {(item as { name: string; text: string; role: string; rating?: number })
                    .rating && (
                    <span className="text-xs text-amber-400">
                      {"★".repeat(
                        (item as { name: string; text: string; role: string; rating?: number })
                          .rating || 0,
                      )}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs italic text-zinc-500">
                  &ldquo;
                  {(
                    item as { name: string; text: string; role: string; rating?: number }
                  ).text?.slice(0, 100)}
                  &rdquo;
                </p>
              </div>
            ))}
          </div>
        </FieldGroup>
      )}
    </div>
  );
}

function GalleryPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = GALLERY_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  const projects = getListItems([], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Gallery" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      {projects.length > 0 && (
        <FieldGroup label="Projects">
          <div className="grid gap-3 sm:grid-cols-3">
            {projects.map((project, i) => (
              <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
                <div className="flex gap-2">
                  <div className="flex-1 rounded bg-zinc-800/50 p-2 text-center">
                    <span className="text-[10px] text-zinc-600">before</span>
                  </div>
                  <div className="flex-1 rounded bg-zinc-800/50 p-2 text-center">
                    <span className="text-[10px] text-zinc-600">after</span>
                  </div>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-white">
                  {(project as { title: string; id: string }).title}
                </h4>
              </div>
            ))}
          </div>
        </FieldGroup>
      )}
    </div>
  );
}

function FaqPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = FAQ_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  const items = getListItems(FAQ_ITEMS[locale], content);
  return (
    <div className="space-y-4">
      <SectionLabel label="FAQ" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <FieldGroup label="Questions">
        {items.map((item, i) => (
          <details key={i} className="rounded-lg border border-zinc-800 bg-zinc-900/50">
            <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-white">
              {(item as { id: string; question: string; answer: string }).question}
            </summary>
            <p className="border-t border-zinc-800 px-3 py-2 text-xs text-zinc-400">
              {(item as { id: string; question: string; answer: string }).answer}
            </p>
          </details>
        ))}
      </FieldGroup>
    </div>
  );
}

function EstimatePreview({ content }: PreviewProps) {
  const merged = mergeContent(ESTIMATE_CONTENT as unknown as Record<string, unknown>, content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Request Estimate" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <div className="rounded-lg border border-dashed border-zinc-700 p-4 text-center text-sm text-zinc-600">
        Estimate form appears here
      </div>
    </div>
  );
}

function ContactPreview({ content }: PreviewProps) {
  const merged = mergeContent(CONTACT_CONTENT as unknown as Record<string, unknown>, content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Contact" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <div className="rounded-lg border border-dashed border-zinc-700 p-4 text-center text-sm text-zinc-600">
        Contact form appears here
      </div>
    </div>
  );
}

function FinalCtaPreview({ content }: PreviewProps) {
  const { locale } = useLocale();
  const base = FINAL_CTA_CONTENT[locale];
  const merged = mergeContent(base as unknown as Record<string, unknown>, content);
  return (
    <div className="space-y-4">
      <SectionLabel label="Final CTA" />
      <div className="space-y-1">
        <p className="text-xs font-medium text-amber-500/80">{(merged.eyebrow as string) || ""}</p>
        <h2 className="text-2xl font-bold text-white">{(merged.title as string) || ""}</h2>
        <p className="text-zinc-400">{(merged.description as string)?.slice(0, 200)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-amber-600/20 px-3 py-1 text-sm font-medium text-amber-400">
          {(merged.primaryLabel as string) || "N/A"}
        </span>
        <span className="rounded bg-zinc-700/50 px-3 py-1 text-sm text-zinc-300">
          {(merged.secondaryLabel as string) || "N/A"}
        </span>
      </div>
    </div>
  );
}

type Props = {
  sectionId: SectionId;
  content: Record<string, unknown>;
};

export function SectionPreview({ sectionId, content }: Props) {
  const previews: Record<SectionId, React.FC<PreviewProps>> = {
    hero: HeroPreview,
    services: ServicesPreview,
    howItWorks: HowItWorksPreview,
    whyChooseUs: WhyChooseUsPreview,
    statistics: StatisticsPreview,
    testimonials: TestimonialsPreview,
    gallery: GalleryPreview,
    faq: FaqPreview,
    estimate: EstimatePreview,
    contact: ContactPreview,
    finalCta: FinalCtaPreview,
  };

  const Preview = previews[sectionId];
  if (!Preview) return <div className="p-4 text-zinc-500">Unknown section: {sectionId}</div>;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <Preview content={content} />
    </div>
  );
}
