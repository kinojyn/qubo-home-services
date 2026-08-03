"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type ReactNode, useId, useState } from "react";

import { MOTION_TRANSITIONS } from "@/constants/motion";
import { mergeClassNames } from "@/utils/mergeClassNames";

export type AccordionItem = {
  content: ReactNode;
  disabled?: boolean;
  id: string;
  title: ReactNode;
};

type AccordionProps = {
  className?: string;
  defaultOpenId?: string;
  items: AccordionItem[];
};

export function Accordion({ className, defaultOpenId, items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const instanceId = useId();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion ? MOTION_TRANSITIONS.instant : MOTION_TRANSITIONS.modal;

  return (
    <div className={mergeClassNames("divide-y divide-divider", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const triggerId = `${instanceId}-accordion-trigger-${item.id}`;
        const panelId = `${instanceId}-accordion-panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="premium-accordion-trigger flex min-h-button w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-text-primary transition duration-[var(--ds-duration-normal)] ease-standard hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:text-disabled-text"
                disabled={item.disabled}
                id={triggerId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                type="button"
              >
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className={mergeClassNames(
                    "size-icon-md shrink-0 transition-transform duration-[var(--ds-duration-normal)] ease-standard",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  aria-labelledby={triggerId}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  role="region"
                  transition={transition}
                >
                  <div className="pb-6 text-sm text-text-secondary">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
