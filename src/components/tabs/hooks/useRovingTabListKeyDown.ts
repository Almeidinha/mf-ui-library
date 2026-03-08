import React, { useCallback } from "react";

type NavKey =
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "ArrowDown"
  | "Home"
  | "End";

type ActivateKey = "Enter" | " ";

export type RovingKeyDownOptions = {
  selectedIndex: number;
  onActivate?: (index: number) => void;
  activationMode?: "auto" | "manual";
  wrap?: boolean;
  itemSelector?: string;

  /**
   * Which keys this handler should respond to.
   * Keep this typed as strings to avoid unsafe casts; KeyboardEvent.key is string.
   */
  keys?: ReadonlyArray<NavKey | ActivateKey>;

  /**
   * Optional filter: skip disabled items.
   * If not provided, default skips aria-disabled="true" or [disabled].
   */
  isItemDisabled?: (el: HTMLElement) => boolean;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const DEFAULT_KEYS: ReadonlyArray<NavKey | ActivateKey> = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "Enter",
  " ",
];

function defaultIsItemDisabled(el: HTMLElement) {
  if (el.getAttribute("aria-disabled") === "true") {
    return true;
  }
  // Safe DOM-level check (no any):
  if (el.hasAttribute("disabled")) {
    return true;
  }

  // Some components use a "disabled" prop but render as div; you can extend
  // by passing isItemDisabled from the caller when needed.
  return false;
}

export function useRovingTabListKeyDown(options: RovingKeyDownOptions) {
  const {
    selectedIndex,
    onActivate,
    activationMode = "auto",
    wrap = true,
    itemSelector = '[role="tab"]',
    keys = DEFAULT_KEYS,
    isItemDisabled = defaultIsItemDisabled,
  } = options;

  return useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!keys.includes(e.key as NavKey | ActivateKey)) {
        return;
      }

      const getGlobalIndex = (el: HTMLElement) => {
        const raw = el.getAttribute("data-index");
        if (raw == null) {
          return null;
        }
        const n = Number(raw);
        return Number.isFinite(n) ? n : null;
      };

      const container = e.currentTarget as HTMLElement;

      const allItems = Array.from(
        container.querySelectorAll<HTMLElement>(itemSelector),
      );
      const items = allItems.filter((el) => !isItemDisabled(el));
      if (!items.length) {
        return;
      }

      const activeEl = document.activeElement as HTMLElement | null;
      const focusedIndex = items.findIndex((t) => t === activeEl);
      const baseIndex = focusedIndex >= 0 ? focusedIndex : selectedIndex;

      const isActivateKey = e.key === "Enter" || e.key === " ";
      const isNavKey =
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "Home" ||
        e.key === "End";

      const focusAt = (next: number) => {
        const max = items.length - 1;

        const target = wrap
          ? ((next % items.length) + items.length) % items.length
          : clamp(next, 0, max);

        items[target]?.focus();
        return target;
      };

      if (activationMode === "manual" && isActivateKey) {
        e.preventDefault();
        const global = getGlobalIndex(items[baseIndex]);
        if (global !== null) {
          onActivate?.(global);
        }
        return;
      }

      if (!isNavKey) {
        return;
      }

      e.preventDefault();

      let next = baseIndex;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = baseIndex + 1;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = baseIndex - 1;
      }
      if (e.key === "Home") {
        next = 0;
      }
      if (e.key === "End") {
        next = items.length - 1;
      }

      const newFocusedIndex = focusAt(next);

      if (activationMode === "auto") {
        const global = getGlobalIndex(items[newFocusedIndex]);
        if (global !== null) {
          onActivate?.(global);
        }
      }
    },
    [
      activationMode,
      isItemDisabled,
      itemSelector,
      keys,
      onActivate,
      selectedIndex,
      wrap,
    ],
  );
}
