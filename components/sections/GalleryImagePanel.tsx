import Image from "next/image";

type GalleryImagePanelProps = {
  alt: string;
  label: string;
  sizes: string;
  src: string;
};

export function GalleryImagePanel({ alt, label, sizes, src }: GalleryImagePanelProps) {
  return (
    <figure className="premium-gallery-image relative aspect-square overflow-hidden rounded-xl bg-background-secondary">
      <Image alt={alt} className="object-cover" fill loading="lazy" sizes={sizes} src={src} />
      <figcaption className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text-primary shadow-xs">
        {label}
      </figcaption>
    </figure>
  );
}
