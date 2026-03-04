import { useEffect } from "react";

export function useKeyDown(targetKey: string, handler: () => void) {
  useEffect(() => {
    function downHandler({ key }: { key: string }) {
      if (key === targetKey) {
        handler();
      }
    }

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [handler, targetKey]);
  return;
}
