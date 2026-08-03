"use client";

import { type RefObject, useEffect } from "react";

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)).filter(
    (element) => !element.hidden && element.getAttribute("aria-hidden") !== "true",
  );
}

type UseDismissibleLayerOptions = {
  containerRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
};

export function useDismissibleLayer({ containerRef, isOpen, onClose }: UseDismissibleLayerOptions) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const layerRoot = container.closest<HTMLElement>("[data-dismissible-layer]");
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== layerRoot && !element.contains(layerRoot),
    );
    const previousInertStates = backgroundElements.map((element) => element.inert);

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
    });

    const focusableElements = getFocusableElements(container);
    const firstFocusableElement = focusableElements[0] ?? container;
    firstFocusableElement?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !container) {
        return;
      }

      const currentFocusableElements = getFocusableElements(container);

      if (currentFocusableElements.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = currentFocusableElements[0];
      const lastElement = currentFocusableElements.at(-1);
      const focusIsInside =
        document.activeElement instanceof Node && container.contains(document.activeElement);

      if (!focusIsInside) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement)?.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    function keepFocusInside(event: FocusEvent) {
      if (
        container &&
        event.target instanceof Node &&
        !container.contains(event.target) &&
        document.body.contains(container)
      ) {
        (getFocusableElements(container)[0] ?? container).focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", keepFocusInside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", keepFocusInside);
      document.body.style.overflow = previousOverflow;
      backgroundElements.forEach((element, index) => {
        element.inert = previousInertStates[index];
      });

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [containerRef, isOpen, onClose]);
}
