"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { OverlayBackdrop, OverlayHeader } from "@/components/ui/OverlayChrome";
import { MOTION_TRANSITIONS } from "@/constants/motion";
import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";
import { mergeClassNames } from "@/utils/mergeClassNames";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  closeLabel?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  title: string;
};

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "max-w-card-default",
  md: "max-w-narrow",
  lg: "max-w-reading",
};

export function Modal({
  children,
  className,
  closeLabel = "Close dialog",
  description,
  isOpen,
  onClose,
  size = "md",
  title,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const shouldReduceMotion = useReducedMotion();

  useDismissibleLayer({ containerRef: panelRef, isOpen, onClose });

  if (typeof document === "undefined") {
    return null;
  }

  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.modal;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--ds-z-modal)] flex items-center justify-center p-4 tablet:p-6"
          data-dismissible-layer
        >
          <OverlayBackdrop onClick={onClose} transition={transition} />
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            aria-modal="true"
            className={mergeClassNames(
              "relative z-[var(--ds-z-modal)] max-h-full w-full overflow-auto rounded-xl bg-surface-elevated p-6 text-text-primary shadow-xl tablet:p-8",
              SIZE_CLASSES[size],
              className,
            )}
            exit={{ opacity: 0, scale: 0.98, y: "var(--ds-motion-distance-md)" }}
            initial={{ opacity: 0, scale: 0.98, y: "var(--ds-motion-distance-md)" }}
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
