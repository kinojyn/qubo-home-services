import Link from "next/link";

type BrandLogoProps = {
  onClick?: () => void;
};

export function BrandLogo({ onClick }: BrandLogoProps) {
  return (
    <Link
      aria-label="QUBO — Qualità, Urgenza, Benfatto, Organizzato — pagina iniziale"
      className="inline-flex min-h-touch-target shrink-0 items-center gap-3 rounded-sm font-heading text-sm font-semibold tracking-tight text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      href="/"
      onClick={onClick}
    >
      {/* The brand mark is a local static asset, so a direct image keeps it reliable in every environment. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="QUBO"
        className="h-12 w-12 shrink-0 object-contain"
        height={48}
        src="/images/brand/qubo-logo.png"
        width={48}
      />
      <span className="hidden mobile:inline">QUBO</span>
      <span className="sr-only">Qualità, Urgenza, Benfatto, Organizzato</span>
    </Link>
  );
}
