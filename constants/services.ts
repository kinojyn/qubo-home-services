import { SERVICE_DETAILS } from "@/data/services";

export type { ServiceIcon } from "@/features/services";

export const SERVICES_CONTENT = {
  eyebrow: "I nostri servizi",
  title: "Piccoli interventi. Un unico team.",
  description:
    "Dalle riparazioni quotidiane alle installazioni per la casa: raccontaci cosa serve e penseremo noi al resto.",
  listLabel: "Servizi disponibili",
  ctaText:
    "Non trovi esattamente quello che cerchi? Descrivici il problema e ti diremo come possiamo aiutarti.",
  ctaLabel: "Parliamo del tuo intervento",
  ctaHref: "/#preventivo",
} as const;

export const SERVICES = SERVICE_DETAILS.map(({ description, icon, slug, title }) => ({
  description,
  icon,
  slug,
  title,
}));
