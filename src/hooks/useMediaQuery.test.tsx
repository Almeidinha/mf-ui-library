import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./useMediaQuery";

type MatchMediaListener = (event: MediaQueryListEvent) => void;

function installMatchMedia(initialMatches = false) {
  let matches = initialMatches;
  const listeners = new Set<MatchMediaListener>();

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => {
      const queryList = {
        get matches() {
          return matches;
        },
        media: query,
        onchange: null,
        addEventListener: (_: "change", listener: MatchMediaListener) => {
          listeners.add(listener);
        },
        removeEventListener: (_: "change", listener: MatchMediaListener) => {
          listeners.delete(listener);
        },
        addListener: (listener: MatchMediaListener) => {
          listeners.add(listener);
        },
        removeListener: (listener: MatchMediaListener) => {
          listeners.delete(listener);
        },
        dispatchEvent: () => true,
      };

      return queryList;
    }),
  });

  return {
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches: nextMatches } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe("useMediaQuery", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the current match state", () => {
    installMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);
  });

  it("normalizes queries that include the @media prefix", () => {
    installMatchMedia(false);

    renderHook(() => useMediaQuery("@media (min-width: 768px)"));

    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 768px)");
  });

  it("updates when the media query match state changes", () => {
    const controller = installMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);

    act(() => {
      controller.setMatches(true);
    });

    expect(result.current).toBe(true);
  });

  it("uses defaultMatches when matchMedia is unavailable", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: undefined,
    });

    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 768px)", { defaultMatches: true }),
    );

    expect(result.current).toBe(true);
  });
});
