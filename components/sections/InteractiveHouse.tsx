"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

import { HOUSE_HOTSPOTS } from "@/constants/house";
import { useLocale } from "@/contexts/LocaleContext";
import { HOUSE_CONTENT, HOUSE_HOTSPOT_LABELS } from "@/locales/house";

export function InteractiveHouse() {
  const { locale } = useLocale();
  const content = HOUSE_CONTENT[locale];
  const hotspotLabels = HOUSE_HOTSPOT_LABELS[locale];
  const descriptionId = useId();
  const labelId = useId();

  return (
    <figure
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      className="relative isolate w-full"
    >
      <figcaption className="sr-only">
        <span id={labelId}>{content.label}</span>
        <span id={descriptionId}>{content.description}</span>
      </figcaption>
      <Image
        alt=""
        className="h-auto w-full select-none"
        draggable={false}
        height={2050}
        priority
        sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 42vw"
        src="/images/hero/house servizi.webp"
        width={3070}
      />
      <ul aria-label={content.servicesLabel} className="absolute inset-0 z-10">
        {HOUSE_HOTSPOTS.map((hotspot) => (
          <li
            className="absolute -translate-x-1/2 -translate-y-1/2"
            key={hotspot.id}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
          >
            <Link
              className="premium-hotspot flex min-h-touch-target items-center gap-2 whitespace-nowrap rounded-lg border border-divider bg-surface/95 px-2.5 text-xs font-semibold text-text-primary shadow-sm backdrop-blur-sm transition duration-[var(--ds-duration-normal)] ease-standard motion-safe:hover:-translate-y-1 hover:border-accent hover:shadow-md motion-safe:focus-visible:-translate-y-1 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transform-none tablet:px-4"
              href={hotspot.href}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
                className="inline-flex size-2 shrink-0 rounded-full bg-accent"
                transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
              />
              {hotspotLabels[hotspot.id]}
            </Link>
          </li>
        ))}
      </ul>
    </figure>
  );
}
