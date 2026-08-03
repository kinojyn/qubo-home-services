"use client";

import { mergeClassNames } from "@/utils/mergeClassNames";

type StarRatingProps = {
  rating: number;
  size?: number;
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
  ariaLabel?: string;
};

function roundToHalf(n: number): number {
  return Math.round(n * 2) / 2;
}

function Star({
  fill,
  size,
  interactive,
  onClick,
}: {
  fill: "full" | "half" | "empty";
  size: number;
  interactive?: boolean;
  onClick?: () => void;
}) {
  return (
    <span
      aria-hidden="true"
      className={mergeClassNames(
        "relative inline-block select-none",
        interactive && "cursor-pointer",
      )}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <svg
        className="absolute inset-0"
        fill={fill === "empty" ? "var(--ds-color-border-strong)" : "var(--ds-color-accent)"}
        height={size}
        viewBox="0 0 24 24"
        width={size}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      {fill === "half" && (
        <svg
          className="absolute inset-0"
          height={size}
          style={{ clipPath: "inset(0 50% 0 0)" }}
          viewBox="0 0 24 24"
          width={size}
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="var(--ds-color-accent)"
          />
        </svg>
      )}
    </span>
  );
}

export function StarRating({
  rating,
  size = 16,
  showValue,
  interactive,
  onChange,
  className,
  ariaLabel,
}: StarRatingProps) {
  const displayRating = roundToHalf(rating);

  function handleClick(value: number) {
    if (interactive && onChange) {
      const newRating = displayRating === value ? value - 0.5 : value;
      onChange(Math.max(0.5, roundToHalf(newRating)));
    }
  }

  return (
    <span
      aria-label={ariaLabel ?? `${displayRating} su 5 stelle`}
      className={mergeClassNames("inline-flex items-center gap-0.5", className)}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        let fill: "full" | "half" | "empty";
        if (displayRating >= star) {
          fill = "full";
        } else if (displayRating >= star - 0.5) {
          fill = "half";
        } else {
          fill = "empty";
        }

        return (
          <Star
            key={star}
            fill={fill}
            interactive={interactive}
            onClick={() => handleClick(star)}
            size={size}
          />
        );
      })}

      {showValue && (
        <span className="ml-1.5 text-sm font-semibold leading-none text-text-primary">
          {displayRating}
        </span>
      )}
    </span>
  );
}
