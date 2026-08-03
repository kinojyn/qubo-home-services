import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { ComponentProps } from "react";

import { Spinner } from "@/components/ui/Spinner";
import { mergeClassNames } from "@/utils/mergeClassNames";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingLabel?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-accent px-6 text-on-accent shadow-sm hover:bg-accent-hover motion-safe:hover:translate-y-[var(--ds-motion-hover-lift)] hover:shadow-md active:bg-accent-active motion-safe:active:translate-y-0 motion-safe:active:scale-[var(--ds-motion-button-press)]",
  secondary:
    "border border-border-strong bg-surface px-6 text-text-primary motion-safe:hover:translate-y-[var(--ds-motion-hover-lift)] hover:border-text-primary hover:shadow-sm motion-safe:active:translate-y-0 motion-safe:active:scale-[var(--ds-motion-button-press)]",
  ghost:
    "bg-transparent px-6 text-text-primary hover:bg-background-secondary active:opacity-[var(--ds-opacity-active)] motion-safe:active:scale-[var(--ds-motion-button-press)]",
  text: "min-h-touch-target bg-transparent px-2 text-accent hover:text-accent-hover hover:underline motion-safe:active:scale-[var(--ds-motion-button-press)]",
  icon: "size-button bg-transparent p-0 text-text-primary hover:bg-background-secondary active:opacity-[var(--ds-opacity-active)] motion-safe:active:scale-[var(--ds-motion-button-press)]",
};

function getButtonClassName(variant: ButtonVariant, className?: string) {
  return mergeClassNames(
    "premium-button inline-flex h-button items-center justify-center gap-2 rounded-lg text-sm font-semibold transition duration-[var(--ds-duration-normal)] ease-standard motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
    VARIANT_CLASSES[variant],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled,
    isLoading = false,
    leadingIcon,
    loadingLabel = "Loading",
    trailingIcon,
    type = "button",
    variant = "primary",
    ...props
  },
  ref,
) {
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      aria-busy={isLoading || undefined}
      className={getButtonClassName(
        variant,
        mergeClassNames(
          "disabled:cursor-not-allowed disabled:bg-disabled-background disabled:text-disabled-text disabled:opacity-[var(--ds-opacity-disabled)] disabled:shadow-none disabled:transform-none",
          className,
        ),
      )}
      disabled={isDisabled}
      ref={ref}
      type={type}
      {...props}
    >
      {isLoading ? <Spinner label={loadingLabel} size="sm" /> : leadingIcon}
      {children}
      {!isLoading && trailingIcon}
    </button>
  );
});

export function ButtonLink({
  children,
  className,
  leadingIcon,
  trailingIcon,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={getButtonClassName(variant, className)} {...props}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}
