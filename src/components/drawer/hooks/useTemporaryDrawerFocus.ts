import { RefObject, useEffect, useRef } from "react";

import { FOCUSABLE_SELECTOR } from "../constants";

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true",
  );
};

export const useTemporaryDrawerFocus = ({
  enabled,
  open,
  surfaceRef,
  onRequestClose,
}: {
  enabled: boolean;
  open: boolean;
  surfaceRef: RefObject<HTMLElement | null>;
  onRequestClose: () => void;
}) => {
  const previousFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !open) {
      return;
    }

    previousFocusedRef.current = document.activeElement as HTMLElement | null;

    const surface = surfaceRef.current;
    if (!surface) {
      return;
    }

    const focusable = getFocusableElements(surface);
    const firstFocusable = focusable[0];

    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      surface.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = getFocusableElements(surface);
      if (elements.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || active === surface) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    surface.addEventListener("keydown", handleKeyDown);

    return () => {
      surface.removeEventListener("keydown", handleKeyDown);

      const previous = previousFocusedRef.current;
      if (previous && document.contains(previous)) {
        previous.focus();
      }
    };
  }, [enabled, onRequestClose, open, surfaceRef]);
};
