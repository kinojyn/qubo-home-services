"use client";

import { motion, type Transition } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";

type OverlayBackdropProps = {
  onClick: () => void;
  transition: Transition;
};

type OverlayHeaderProps = {
  closeLabel: string;
  description?: string;
  descriptionId: string;
  onClose: () => void;
  title: string;
  titleId: string;
};

export function OverlayBackdrop({ onClick, transition }: OverlayBackdropProps) {
  return (
    <motion.button
      animate={{ opacity: 1 }}
      aria-hidden="true"
      className="absolute inset-0 cursor-default bg-overlay backdrop-blur-md"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClick}
      tabIndex={-1}
      transition={transition}
      type="button"
    />
  );
}

export function OverlayHeader({
  closeLabel,
  description,
  descriptionId,
  onClose,
  title,
  titleId,
}: OverlayHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="grid gap-2">
        <h2 className="text-xl font-semibold text-text-primary" id={titleId}>
          {title}
        </h2>
        {description && (
          <p className="text-sm text-text-secondary" id={descriptionId}>
            {description}
          </p>
        )}
      </div>
      <Button aria-label={closeLabel} onClick={onClose} variant="icon">
        <X aria-hidden="true" className="size-icon-md" />
      </Button>
    </div>
  );
}
