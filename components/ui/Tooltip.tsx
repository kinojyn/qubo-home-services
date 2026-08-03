"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cloneElement, type ReactElement, type ReactNode, useId, useState } from "react";

import { MOTION_TRANSITIONS } from "@/constants/motion";
import { mergeClassNames } from "@/utils/mergeClassNames";

type TooltipPosition = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
  content: ReactNode;
  position?: TooltipPosition;
};

const POSITION_CLASSES: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
};

export function Tooltip({ children, className, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.tooltip;
  const existingDescriptionId = children.props["aria-describedby"];
  const descriptionIds = [existingDescriptionId, isVisible ? tooltipId : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className="relative inline-flex"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsVisible(false);
        }
      }}
      onFocus={() => setIsVisible(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setIsVisible(false);
        }
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {cloneElement(children, {
        "aria-describedby": descriptionIds || undefined,
      })}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            animate={{ opacity: 1, scale: 1 }}
            className={mergeClassNames(
              "pointer-events-none absolute z-[var(--ds-z-tooltip)] w-max max-w-card-compact rounded-sm bg-text-primary px-3 py-2 text-xs text-background-primary shadow-md",
              POSITION_CLASSES[position],
              className,
            )}
            exit={{ opacity: 0, scale: 0.98 }}
            id={tooltipId}
            initial={{ opacity: 0, scale: 0.98 }}
            role="tooltip"
            transition={transition}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
