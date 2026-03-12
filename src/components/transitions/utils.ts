import { CSSProperties, Ref } from "react";

import { TransitionEasing, TransitionTimeout } from "./types";

export function normalizeTimeout(timeout: TransitionTimeout = 200) {
  if (typeof timeout === "number") {
    return {
      appear: timeout,
      enter: timeout,
      exit: timeout,
    };
  }

  return {
    appear: timeout.appear ?? timeout.enter ?? 200,
    enter: timeout.enter ?? 200,
    exit: timeout.exit ?? 200,
  };
}

export function normalizeEasing(easing: TransitionEasing = "ease-in-out") {
  if (typeof easing === "string") {
    return {
      appear: easing,
      enter: easing,
      exit: easing,
    };
  }

  return {
    appear: easing.appear ?? easing.enter ?? "ease-in-out",
    enter: easing.enter ?? "ease-in-out",
    exit: easing.exit ?? "ease-in-out",
  };
}

export function mergeStyles(
  ...styles: Array<CSSProperties | undefined>
): CSSProperties {
  return Object.assign({}, ...styles);
}

export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(value);
        return;
      }

      try {
        (ref as { current: T | null }).current = value;
      } catch {
        // noop
      }
    });
  };
}

export function toCssUnit(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

export function getSlideTransform(
  direction: "up" | "down" | "left" | "right",
  offset: number | string,
) {
  const value = toCssUnit(offset);

  switch (direction) {
    case "up":
      return `translateY(${value})`;
    case "down":
      return `translateY(calc(${value} * -1))`;
    case "left":
      return `translateX(${value})`;
    case "right":
      return `translateX(calc(${value} * -1))`;
    default:
      return `translateY(calc(${value} * -1))`;
  }
}
