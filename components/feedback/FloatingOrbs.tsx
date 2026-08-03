"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function FloatingOrbs() {
  const { scrollYProgress } = useScroll();

  const firstOrbY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const secondOrbY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-48 -right-48 size-96 rounded-full opacity-[var(--ds-opacity-subtle)] blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--ds-color-orange-soft), transparent 70%)",
          y: firstOrbY,
        }}
      />
      <motion.div
        className="absolute -bottom-48 -left-48 size-80 rounded-full opacity-[var(--ds-opacity-subtle)] blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--ds-color-orange-subtle), transparent 70%)",
          y: secondOrbY,
        }}
      />
    </div>
  );
}
