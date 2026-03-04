import React, { useMemo } from "react";

export function useMergedRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return useMemo(() => {
    return (value: T) => {
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        if (typeof ref === "function") {
          ref(value);
        } else if ("current" in ref) {
          (ref as { current: T | null }).current = value;
        }
      });
    };
  }, [refs]);
}
