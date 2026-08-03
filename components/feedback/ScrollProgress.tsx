"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[calc(var(--ds-z-sticky)+10)] h-[3px] origin-left"
      style={{
        background: "linear-gradient(90deg, var(--ds-color-accent), var(--ds-color-orange-700))",
        scaleX,
      }}
    />
  );
}
