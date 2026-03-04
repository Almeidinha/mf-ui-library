import * as React from "react";

import { isNil } from "../helpers/safe-navigation";

export function useOnClickOutside(
  handler: (event: Event) => void,
): React.RefObject<HTMLDivElement | null> {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const clickOutsideListener = () => {
    const listener = (event: Event): void => {
      if (
        isNil(ref.current) ||
        ref.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener, true);
    document.addEventListener("touchstart", listener, true);
    return () => {
      document.removeEventListener("mousedown", listener, true);
      document.removeEventListener("touchstart", listener, true);
    };
  };

  React.useEffect(clickOutsideListener, [ref, handler]);

  return ref;
}
