import type { SVGAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type PlantVariant = "leaf-spray" | "branch" | "fern";

type PlantDecorationProps = SVGAttributes<SVGSVGElement> & {
  variant?: PlantVariant;
};

const VARIANTS: Record<PlantVariant, { viewBox: string; children: React.ReactNode }> = {
  "leaf-spray": {
    viewBox: "0 0 120 120",
    children: (
      <>
        <path
          d="M100 20C85 35 75 55 70 70c-5 15-8 30-5 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M95 25C80 38 72 52 68 62"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M85 30c-8 10-14 22-18 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
        <ellipse
          cx="70"
          cy="70"
          rx="8"
          ry="5"
          fill="currentColor"
          opacity="0.15"
          transform="rotate(-30 70 70)"
        />
        <ellipse
          cx="62"
          cy="55"
          rx="6"
          ry="4"
          fill="currentColor"
          opacity="0.1"
          transform="rotate(-20 62 55)"
        />
      </>
    ),
  },
  branch: {
    viewBox: "0 0 80 160",
    children: (
      <>
        <path
          d="M10 150 Q20 100 30 70 Q40 40 55 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse
          cx="55"
          cy="15"
          rx="6"
          ry="9"
          fill="currentColor"
          opacity="0.12"
          transform="rotate(20 55 15)"
        />
        <ellipse
          cx="40"
          cy="50"
          rx="5"
          ry="7"
          fill="currentColor"
          opacity="0.1"
          transform="rotate(-15 40 50)"
        />
        <ellipse
          cx="25"
          cy="85"
          rx="4"
          ry="6"
          fill="currentColor"
          opacity="0.08"
          transform="rotate(10 25 85)"
        />
      </>
    ),
  },
  fern: {
    viewBox: "0 0 100 160",
    children: (
      <>
        <path
          d="M50 155 Q55 100 60 60 Q65 30 70 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = 130 - i * 20;
          const spread = 10 + i * 3;
          return (
            <path
              d={`M${52 + i * 2} ${y} Q${52 + i * 2 + spread} ${y - 8} ${52 + i * 2 + spread + 5} ${y - 4}`}
              fill="none"
              stroke="currentColor"
              key={i}
              strokeWidth="1"
              strokeLinecap="round"
              opacity={0.5 - i * 0.07}
            />
          );
        })}
      </>
    ),
  },
};

export function PlantDecoration({
  className,
  variant = "leaf-spray",
  ...props
}: PlantDecorationProps) {
  const config = VARIANTS[variant];

  return (
    <svg
      aria-hidden="true"
      className={mergeClassNames("pointer-events-none select-none", className)}
      fill="none"
      role="presentation"
      viewBox={config.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {config.children}
    </svg>
  );
}
