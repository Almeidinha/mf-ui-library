import { useEffect, useRef } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

export function useKeyDown(
  targetKeys: string | readonly string[],
  handler: KeyHandler,
  options?: {
    enabled?: boolean;
    eventTarget?: Window | Document | HTMLElement;
  },
) {
  const { enabled = true, eventTarget } = options ?? {};

  const handlerRef = useRef<KeyHandler>(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const target =
      eventTarget ?? (typeof window !== "undefined" ? window : undefined);

    if (!target) {
      return;
    }

    const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];
    const keySet = new Set(keys);

    const downHandler = (e: KeyboardEvent) => {
      if (keySet.has(e.key)) {
        handlerRef.current(e);
      }
    };

    target.addEventListener("keydown", downHandler as EventListener);

    return () => {
      target.removeEventListener("keydown", downHandler as EventListener);
    };
  }, [targetKeys, enabled, eventTarget]);
}
