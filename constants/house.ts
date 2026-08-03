export type HouseHotspotId = "electricity" | "painting" | "plumbing" | "doors" | "furniture";

export type HouseHotspot = {
  href: string;
  id: HouseHotspotId;
  label: string;
  x: number;
  y: number;
};

export type HouseRoomZone = {
  id: HouseHotspotId;
  label: string;
  /** Room zone as percentage of image dimensions */
  x: number;
  y: number;
  width: number;
  height: number;
  serviceSlug: string;
};

export const HOUSE_CONTENT = {
  description: "Seleziona un servizio sulla casa per scoprire i relativi piccoli interventi.",
  label: "Casa isometrica interattiva",
  servicesLabel: "Servizi disponibili sulla casa",
  roomZoneLabel: "Scopri il servizio",
} as const;

export const HOUSE_HOTSPOTS: readonly HouseHotspot[] = [
  {
    href: "/services/riparazioni-elettriche",
    id: "electricity",
    label: "Elettricità",
    x: 28,
    y: 31,
  },
  {
    href: "/services/pittura-e-lavori-tuttofare",
    id: "painting",
    label: "Pittura",
    x: 68,
    y: 23,
  },
  {
    href: "/services/piccoli-interventi-idraulici",
    id: "plumbing",
    label: "Idraulica",
    x: 17,
    y: 54,
  },
  {
    href: "/services/porte-e-serrature",
    id: "doors",
    label: "Porte",
    x: 50,
    y: 78,
  },
  {
    href: "/services/montaggio-mobili",
    id: "furniture",
    label: "Montaggio mobili",
    x: 78,
    y: 57,
  },
] as const;

/** Room hover zones for the services page house.
 *  Each zone covers a room area in the cutaway illustration.
 */
export const HOUSE_ROOM_ZONES: readonly HouseRoomZone[] = [
  {
    id: "electricity",
    label: "Soggiorno",
    x: 12,
    y: 14,
    width: 30,
    height: 34,
    serviceSlug: "riparazioni-elettriche",
  },
  {
    id: "painting",
    label: "Camera",
    x: 52,
    y: 8,
    width: 34,
    height: 32,
    serviceSlug: "pittura-e-lavori-tuttofare",
  },
  {
    id: "plumbing",
    label: "Cucina",
    x: 6,
    y: 40,
    width: 26,
    height: 30,
    serviceSlug: "piccoli-interventi-idraulici",
  },
  {
    id: "doors",
    label: "Ingresso",
    x: 34,
    y: 62,
    width: 30,
    height: 34,
    serviceSlug: "porte-e-serrature",
  },
  {
    id: "furniture",
    label: "Ripostiglio",
    x: 60,
    y: 42,
    width: 32,
    height: 36,
    serviceSlug: "montaggio-mobili",
  },
] as const;
