"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

import { MOTION_TRANSITIONS } from "@/constants/motion";
import { mergeClassNames } from "@/utils/mergeClassNames";

type RevealDistance = "sm" | "md" | "lg";

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "animate" | "exit" | "initial" | "transition" | "viewport" | "whileInView"
> & {
  delay?: number;
  distance?: RevealDistance;
};

const DISTANCES: Record<RevealDistance, string> = {
  sm: "var(--ds-motion-distance-sm)",
  md: "var(--ds-motion-distance-md)",
  lg: "var(--ds-motion-distance-lg)",
};

export function Reveal({ children, className, delay = 0, distance = "lg", ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion
    ? MOTION_TRANSITIONS.instant
    : { ...MOTION_TRANSITIONS.section, delay };

  return (
    <motion.div
      className={mergeClassNames(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: DISTANCES[distance] }}
      transition={transition}
      viewport={{ amount: 0.16, margin: "0px 0px -6% 0px", once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
