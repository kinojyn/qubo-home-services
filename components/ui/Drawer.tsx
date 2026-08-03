"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { OverlayBackdrop, OverlayHeader } from "@/components/ui/OverlayChrome";
import { MOTION_TRANSITIONS } from "@/constants/motion";
import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";
import { mergeClassNames } from "@/utils/mergeClassNames";

type DrawerSide = "left" | "right";

type DrawerProps = {
  children: React.ReactNode;
  className?: string;
  closeLabel?: string;
  description?: string;
  isOpen: boolean;
  id?: string;
  onClose: () => void;
  side?: DrawerSide;
  title: string;
};

const SIDE_CLASSES: Record<DrawerSide, string> = {
  left: "left-0",
  right: "right-0",
};

const SIDE_OFFSET: Record<DrawerSide, string> = {
  left: "-100%",
  right: "100%",
};

export function Drawer({
  children,
  className,
  closeLabel = "Close panel",
  description,
  id,
  isOpen,
  onClose,
  side = "right",
  title,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const shouldReduceMotion = useReducedMotion();

  useDismissibleLayer({ containerRef: panelRef, isOpen, onClose });

  if (typeof document === "undefined") {
    return null;
  }

  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.drawer;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--ds-z-modal)]" data-dismissible-layer>
          <OverlayBackdrop onClick={onClose} transition={transition} />
          <motion.div
            animate={{ x: 0 }}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            aria-modal="true"
            className={mergeClassNames(
              "absolute top-0 h-full w-full max-w-narrow overflow-auto bg-surface-elevated p-6 text-text-primary shadow-xl tablet:p-8",
              SIDE_CLASSES[side],
              className,
            )}
            exit={{ x: SIDE_OFFSET[side] }}
            initial={{ x: SIDE_OFFSET[side] }}
            id={id}
            ref={panelRef}
            role="dialog"
            tabIndex={-1}
            transition={transition}
          >
            <OverlayHeader
              closeLabel={closeLabel}
              description={description}
              descriptionId={descriptionId}
              onClose={onClose}
              title={title}
              titleId={titleId}
            />
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
