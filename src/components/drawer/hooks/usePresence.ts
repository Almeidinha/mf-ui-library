import { RefObject, useEffect, useMemo, useRef, useState } from "react";

import { DrawerAnchor } from "../types";

const getPersistentTransitionProperty = (anchor: DrawerAnchor) => {
  return anchor === "left" || anchor === "right" ? "width" : "height";
};

type UsePresenceProps = {
  open: boolean;
  keepMounted: boolean;
  miniActive: boolean;
  anchor: DrawerAnchor;
  ref: RefObject<HTMLElement | null>;
};

export const usePresence = ({
  open,
  keepMounted,
  miniActive,
  anchor,
  ref,
}: UsePresenceProps) => {
  const shouldStayMounted = keepMounted || miniActive;

  const [present, setPresent] = useState(open || shouldStayMounted);
  const [renderedOpen, setRenderedOpen] = useState(open);

  const prevOpenRef = useRef(open);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = open;

    if (raf1Ref.current !== null) {
      cancelAnimationFrame(raf1Ref.current);
      raf1Ref.current = null;
    }

    if (raf2Ref.current !== null) {
      cancelAnimationFrame(raf2Ref.current);
      raf2Ref.current = null;
    }

    if (shouldStayMounted) {
      raf1Ref.current = requestAnimationFrame(() => {
        setPresent(true);
        setRenderedOpen(open);
      });

      return () => {
        if (raf1Ref.current !== null) {
          cancelAnimationFrame(raf1Ref.current);
        }
      };
    }

    if (open && !wasOpen) {
      raf1Ref.current = requestAnimationFrame(() => {
        setPresent(true);
        setRenderedOpen(false);

        raf2Ref.current = requestAnimationFrame(() => {
          setRenderedOpen(true);
        });
      });

      return () => {
        if (raf1Ref.current !== null) {
          cancelAnimationFrame(raf1Ref.current);
        }
        if (raf2Ref.current !== null) {
          cancelAnimationFrame(raf2Ref.current);
        }
      };
    }

    if (!open && wasOpen) {
      const node = ref.current;

      raf1Ref.current = requestAnimationFrame(() => {
        setRenderedOpen(false);
      });

      if (!node) {
        raf2Ref.current = requestAnimationFrame(() => {
          setPresent(false);
        });

        return () => {
          if (raf1Ref.current !== null) {
            cancelAnimationFrame(raf1Ref.current);
          }
          if (raf2Ref.current !== null) {
            cancelAnimationFrame(raf2Ref.current);
          }
        };
      }

      const expectedProperty = getPersistentTransitionProperty(anchor);

      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.target !== node) {
          return;
        }

        if (event.propertyName !== expectedProperty) {
          return;
        }

        setPresent(false);
      };

      node.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        node.removeEventListener("transitionend", handleTransitionEnd);

        if (raf1Ref.current !== null) {
          cancelAnimationFrame(raf1Ref.current);
        }
        if (raf2Ref.current !== null) {
          cancelAnimationFrame(raf2Ref.current);
        }
      };
    }

    return () => {
      if (raf1Ref.current !== null) {
        cancelAnimationFrame(raf1Ref.current);
      }
      if (raf2Ref.current !== null) {
        cancelAnimationFrame(raf2Ref.current);
      }
    };
  }, [anchor, open, ref, shouldStayMounted]);

  return useMemo(
    () => ({
      present,
      renderedOpen,
    }),
    [present, renderedOpen],
  );
};
