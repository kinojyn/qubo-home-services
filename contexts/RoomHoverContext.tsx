"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ActiveRoomId = string | null;

type RoomHoverContextValue = {
  activeRoomId: ActiveRoomId;
  setActiveRoomId: (id: ActiveRoomId) => void;
};

export const RoomHoverContext = createContext<RoomHoverContextValue | null>(null);

export function RoomHoverProvider({ children }: { children: ReactNode }) {
  const [activeRoomId, setActiveRoomId] = useState<ActiveRoomId>(null);

  return (
    <RoomHoverContext.Provider value={{ activeRoomId, setActiveRoomId }}>
      {children}
    </RoomHoverContext.Provider>
  );
}

export function useRoomHover() {
  const ctx = useContext(RoomHoverContext);
  if (!ctx) throw new Error("useRoomHover must be used within RoomHoverProvider");
  return ctx;
}
