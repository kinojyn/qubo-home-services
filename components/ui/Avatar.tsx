import Image from "next/image";

import { mergeClassNames } from "@/utils/mergeClassNames";

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  alt?: string;
  className?: string;
  initials: string;
  size?: AvatarSize;
  src?: string;
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "size-avatar-sm text-xs",
  md: "size-avatar-md text-xs",
  lg: "size-avatar-lg text-sm",
  xl: "size-avatar-xl text-md",
};

export function Avatar({ alt = "", className, initials, size = "md", src }: AvatarProps) {
  return (
    <span
      aria-label={!src && alt ? alt : undefined}
      className={mergeClassNames(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-secondary font-semibold text-text-secondary",
        SIZE_CLASSES[size],
        className,
      )}
      role={!src && alt ? "img" : undefined}
    >
      {src ? (
        <Image alt={alt} className="object-cover" fill sizes="var(--ds-size-avatar-xl)" src={src} />
      ) : (
        <span aria-hidden={Boolean(alt)}>{initials}</span>
      )}
    </span>
  );
}
