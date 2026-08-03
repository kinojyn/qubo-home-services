import catalogue from "./fvg-localities.json";

export type FvgLocalityKind = "municipality" | "locality";

export type FvgLocality = {
  id: string;
  name: string;
  aliases: string[];
  municipality: string;
  municipalityCode: string;
  province: string;
  kind: FvgLocalityKind;
  latitude: number;
  longitude: number;
  distance: number;
  fee: number;
  population: number;
};

type FvgLocalityCatalogue = {
  generatedAt: string;
  municipalityCount: number;
  localityCount: number;
  localities: FvgLocality[];
  sources: {
    geonames: string;
    geonamesLicense: string;
    istat: string;
  };
};

export const FVG_LOCALITY_CATALOGUE = catalogue as FvgLocalityCatalogue;
export const FVG_LOCALITIES = FVG_LOCALITY_CATALOGUE.localities;

const FEATURED_NAMES = [
  "Cervignano del Friuli",
  "Palmanova",
  "Aquileia",
  "Terzo d'Aquileia",
  "San Giorgio di Nogaro",
  "Latisana",
  "Grado",
  "Monfalcone",
  "Gorizia",
  "Udine",
  "Cividale del Friuli",
  "Trieste",
  "Codroipo",
  "Pordenone",
  "Spilimbergo",
  "San Daniele del Friuli",
  "Gemona del Friuli",
  "Tolmezzo",
  "Tarvisio",
] as const;

export const FEATURED_FVG_LOCALITIES = FEATURED_NAMES.flatMap((name) => {
  const locality = FVG_LOCALITIES.find(
    (item) => item.kind === "municipality" && item.name === name,
  );
  return locality ? [locality] : [];
});

export function normalizeLocalitySearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("it")
    .trim();
}

export function searchFvgLocalities(query: string, limit = 12): FvgLocality[] {
  const normalizedQuery = normalizeLocalitySearch(query);
  if (!normalizedQuery) return FEATURED_FVG_LOCALITIES.slice(0, limit);

  return FVG_LOCALITIES.map((locality) => {
    const name = normalizeLocalitySearch(locality.name);
    const municipality = normalizeLocalitySearch(locality.municipality);
    const aliases = locality.aliases.map(normalizeLocalitySearch);
    let relevance = Number.POSITIVE_INFINITY;

    if (name === normalizedQuery) relevance = 0;
    else if (name.startsWith(normalizedQuery)) relevance = 1;
    else if (aliases.some((alias) => alias === normalizedQuery)) relevance = 2;
    else if (aliases.some((alias) => alias.startsWith(normalizedQuery))) relevance = 3;
    else if (municipality === normalizedQuery) relevance = 4;
    else if (municipality.startsWith(normalizedQuery)) relevance = 5;
    else if (name.includes(normalizedQuery)) relevance = 6;
    else if (aliases.some((alias) => alias.includes(normalizedQuery))) relevance = 7;
    else if (municipality.includes(normalizedQuery)) relevance = 8;

    return { locality, relevance };
  })
    .filter(({ relevance }) => Number.isFinite(relevance))
    .sort(
      (left, right) =>
        left.relevance - right.relevance ||
        Number(right.locality.kind === "municipality") -
          Number(left.locality.kind === "municipality") ||
        right.locality.population - left.locality.population ||
        left.locality.name.localeCompare(right.locality.name, "it"),
    )
    .slice(0, limit)
    .map(({ locality }) => locality);
}

export function findFvgLocality(idOrName: string | undefined): FvgLocality | undefined {
  const value = idOrName?.trim();
  if (!value) return undefined;

  return (
    FVG_LOCALITIES.find((locality) => locality.id === value) ??
    FVG_LOCALITIES.find(
      (locality) =>
        locality.kind === "municipality" &&
        normalizeLocalitySearch(locality.name) === normalizeLocalitySearch(value),
    ) ??
    FVG_LOCALITIES.find(
      (locality) => normalizeLocalitySearch(locality.name) === normalizeLocalitySearch(value),
    )
  );
}

export function formatFvgLocality(locality: FvgLocality): string {
  return locality.kind === "municipality"
    ? locality.name
    : `${locality.name} — ${locality.municipality}`;
}
