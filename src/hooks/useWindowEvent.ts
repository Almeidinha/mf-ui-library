import { useEffect, useRef } from "react";

export function useWindowEvent<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  enabled = true,
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: WindowEventMap[K]) => {
      handlerRef.current(event);
    };

    window.addEventListener(eventName, listener as EventListener);

    return () => {
      window.removeEventListener(eventName, listener as EventListener);
    };
  }, [eventName, enabled]);
}
