const DEFAULT_SPRING = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 0.9,
} as const;

const SOFT_SPRING = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
} as const;

export const MOTION_TRANSITIONS = {
  instant: { duration: 0 },
  modal: DEFAULT_SPRING,
  navigation: DEFAULT_SPRING,
  drawer: SOFT_SPRING,
  hero: SOFT_SPRING,
  section: SOFT_SPRING,
  counter: {
    duration: 0.8,
    ease: "easeOut",
  },
  hotspot: {
    duration: 2.4,
    ease: "easeOut",
    repeat: Infinity,
  },
  tooltip: {
    type: "spring",
    stiffness: 260,
    damping: 28,
    mass: 0.8,
  },
} as const;

export const MOTION_SEQUENCES = {
  hero: {
    delayChildren: 0.08,
    staggerChildren: 0.1,
  },
  houseHotspots: {
    stagger: 0.16,
  },
  section: {
    staggerChildren: 0.12,
  },
  serviceCards: {
    staggerChildren: 0.08,
  },
  processSteps: {
    staggerChildren: 0.14,
  },
  featureCards: {
    staggerChildren: 0.1,
  },
  statisticCards: {
    staggerChildren: 0.1,
  },
  galleryCards: {
    staggerChildren: 0.1,
  },
} as const;

export const MOTION_EFFECTS = {
  hotspot: {
    activeOpacity: 0.18,
    activeRadius: 46,
    pulseOpacity: [0.56, 0],
    pulseRadius: [8, 24],
  },
} as const;
