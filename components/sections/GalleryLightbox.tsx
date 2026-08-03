"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { GalleryImagePanel } from "@/components/sections/GalleryImagePanel";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GALLERY_CONTENT, LIGHTBOX_IMAGE_SIZES } from "@/constants/gallery";
import { GALLERY_PROJECTS } from "@/data/gallery";

type GalleryProject = (typeof GALLERY_PROJECTS)[number];

type GalleryLightboxProps = {
  activeIndex: number;
  activeProject: GalleryProject;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function GalleryLightbox({
  activeIndex,
  activeProject,
  onClose,
  onNext,
  onPrevious,
}: GalleryLightboxProps) {
  return (
    <Modal
      closeLabel={GALLERY_CONTENT.closeLabel}
      description="Confronto reale prima e dopo l'intervento."
      isOpen
      onClose={onClose}
      size="lg"
      title={activeProject.title}
    >
      <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-6">
        <GalleryImagePanel
          alt={activeProject.before.alt}
          label="Prima"
          sizes={LIGHTBOX_IMAGE_SIZES}
          src={activeProject.before.src}
        />
        <GalleryImagePanel
          alt={activeProject.after.alt}
          label="Dopo"
          sizes={LIGHTBOX_IMAGE_SIZES}
          src={activeProject.after.src}
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Button
          aria-label={GALLERY_CONTENT.previousLabel}
          className="border border-border-strong bg-surface"
          onClick={onPrevious}
          variant="icon"
        >
          <ChevronLeft aria-hidden="true" className="size-icon-md" />
        </Button>
        <p aria-live="polite" className="text-xs font-medium text-text-secondary">
          Lavoro {activeIndex + 1} di {GALLERY_PROJECTS.length}
        </p>
        <Button
          aria-label={GALLERY_CONTENT.nextLabel}
          className="border border-border-strong bg-surface"
          onClick={onNext}
          variant="icon"
        >
          <ChevronRight aria-hidden="true" className="size-icon-md" />
        </Button>
      </div>
    </Modal>
  );
}
