"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useId, useCallback } from "react";

import { useRoomHover } from "@/contexts/RoomHoverContext";
import { HOUSE_ROOM_ZONES } from "@/constants/house";
import { useLocale } from "@/contexts/LocaleContext";
import { HOUSE_CONTENT, HOUSE_ROOM_LABELS } from "@/locales/house";

export function ServicesHouse() {
  const { locale } = useLocale();
  const content = HOUSE_CONTENT[locale];
  const roomLabels = HOUSE_ROOM_LABELS[locale];
  const descriptionId = useId();
  const labelId = useId();
  const { setActiveRoomId } = useRoomHover();

  const handlePointerEnter = useCallback((id: string) => setActiveRoomId(id), [setActiveRoomId]);

  const handlePointerLeave = useCallback(() => setActiveRoomId(null), [setActiveRoomId]);

  return (
    <figure aria-describedby={descriptionId} aria-labelledby={labelId} className="relative isolate">
      <figcaption className="sr-only">
        <span id={labelId}>{content.label}</span>
        <span id={descriptionId}>{content.description}</span>
      </figcaption>

      <div
        className="relative w-full"
        style={{ transform: "scale(1.4)", transformOrigin: "center" }}
      >
        <div className="relative w-full">
          <Image
            alt=""
            className="h-auto w-full select-none"
            draggable={false}
            height={2050}
            priority
            sizes="100vw"
            src="/images/hero/house servizi.webp"
            width={3070}
          />

          <div
            aria-label={content.servicesLabel}
            className="absolute inset-0"
            role="region"
            onPointerLeave={handlePointerLeave}
          >
            {HOUSE_ROOM_ZONES.map((zone) => (
              <RoomZone
                key={zone.id}
                label={roomLabels[zone.id] ?? zone.label}
                onHover={handlePointerEnter}
                roomId={zone.id}
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

type RoomZoneProps = {
  label: string;
  onHover: (id: string) => void;
  roomId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function RoomZone({ label, onHover, roomId, x, y, width, height }: RoomZoneProps) {
  return (
    <div
      className="group/room absolute cursor-pointer"
      onPointerEnter={() => onHover(roomId)}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/0 to-white/0 opacity-0 transition-opacity duration-[var(--ds-duration-normal)] ease-standard group-hover/room:from-white/[0.07] group-hover/room:to-white/[0.03] group-hover/room:opacity-100" />

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-semibold text-text-primary shadow-sm opacity-0 backdrop-blur-sm transition-all duration-[var(--ds-duration-normal)] ease-standard group-hover/room:opacity-100 group-hover/room:shadow-md"
      >
        {label}
      </motion.span>
    </div>
  );
}
