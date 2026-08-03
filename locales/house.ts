import type { Locale } from "@/types/locale";

export interface HouseContent {
  description: string;
  label: string;
  servicesLabel: string;
  roomZoneLabel: string;
}

export interface HouseHotspot {
  href: string;
  id: "electricity" | "painting" | "plumbing" | "doors" | "furniture";
  label: string;
  x: number;
  y: number;
}

export interface HouseRoomZone {
  id: "electricity" | "painting" | "plumbing" | "doors" | "furniture";
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  serviceSlug: string;
}

export const HOUSE_CONTENT: Record<Locale, HouseContent> = {
  it: {
    description: "Seleziona un servizio sulla casa per scoprire i relativi piccoli interventi.",
    label: "Casa isometrica interattiva",
    servicesLabel: "Servizi disponibili sulla casa",
    roomZoneLabel: "Scopri il servizio",
  },
  en: {
    description: "Select a service on the house to discover the related small jobs.",
    label: "Interactive isometric house",
    servicesLabel: "Services available on the house",
    roomZoneLabel: "Discover the service",
  },
  de: {
    description:
      "Wählen Sie einen Service am Haus, um die dazugehörigen kleinen Arbeiten zu entdecken.",
    label: "Interaktives isometrisches Haus",
    servicesLabel: "Verfügbare Dienstleistungen am Haus",
    roomZoneLabel: "Service entdecken",
  },
};

export const HOUSE_HOTSPOT_LABELS: Record<Locale, Record<string, string>> = {
  it: {
    electricity: "Elettricità",
    painting: "Pittura",
    plumbing: "Idraulica",
    doors: "Porte",
    furniture: "Montaggio mobili",
  },
  en: {
    electricity: "Electricity",
    painting: "Painting",
    plumbing: "Plumbing",
    doors: "Doors",
    furniture: "Furniture assembly",
  },
  de: {
    electricity: "Elektrik",
    painting: "Malerei",
    plumbing: "Sanitär",
    doors: "Türen",
    furniture: "Möbelmontage",
  },
};

export const HOUSE_ROOM_LABELS: Record<Locale, Record<string, string>> = {
  it: {
    electricity: "Soggiorno",
    painting: "Camera",
    plumbing: "Cucina",
    doors: "Ingresso",
    furniture: "Ripostiglio",
  },
  en: {
    electricity: "Living room",
    painting: "Bedroom",
    plumbing: "Kitchen",
    doors: "Entrance",
    furniture: "Storage room",
  },
  de: {
    electricity: "Wohnzimmer",
    painting: "Schlafzimmer",
    plumbing: "Küche",
    doors: "Eingang",
    furniture: "Abstellraum",
  },
};
