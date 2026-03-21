import { clamp } from "helpers/numbers";
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import {
  DEFAULT_MINI_SIZE,
  DEFAULT_SIZE,
  INTERACTIVE_SELECTOR,
  SWIPE_CLOSE_THRESHOLD,
  SWIPE_OPEN_THRESHOLD,
} from "../constants";
import { SIGNED_DELTA } from "../helpers";
import { DrawerAnchor } from "../types";

type GestureState = {
  dragging: boolean;
  start: number;
  pointerId: number | null;
  mode: "open" | "close" | null;
};

export const isHorizontal = (anchor: DrawerAnchor) => {
  return anchor === "left" || anchor === "right";
};

const getPoint = (
  event: PointerEvent | ReactPointerEvent<HTMLDivElement>,
  axis: "x" | "y",
) => {
  return axis === "x" ? event.clientX : event.clientY;
};

const shouldIgnoreCloseSwipeStart = (
  event: ReactPointerEvent<HTMLDivElement>,
  mode: "open" | "close",
) => {
  if (mode !== "close") {
    return false;
  }

  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return target.closest(INTERACTIVE_SELECTOR) !== null;
};

export const useSwipeableDrawer = ({
  anchor,
  swipeable,
  size,
  miniActive,
  miniSize,
  onRequestOpen,
  onRequestClose,
}: {
  anchor: DrawerAnchor;
  open: boolean;
  swipeable: boolean;
  size: number | string;
  miniActive: boolean;
  miniSize: number | string;
  onRequestOpen: () => void;
  onRequestClose: () => void;
}) => {
  const [dragOffset, setDragOffset] = useState(0);

  const gestureRef = useRef<GestureState>({
    dragging: false,
    start: 0,
    pointerId: null,
    mode: null,
  });

  const axis = isHorizontal(anchor) ? "x" : "y";
  const sizeNumber = typeof size === "number" ? size : DEFAULT_SIZE;
  const effectiveMini = miniActive
    ? typeof miniSize === "number"
      ? miniSize
      : DEFAULT_MINI_SIZE
    : 0;
  const maxDragDistance = Math.max(sizeNumber - effectiveMini, 1);

  const endGesture = useCallback(() => {
    gestureRef.current.dragging = false;
    gestureRef.current.pointerId = null;
    gestureRef.current.mode = null;
    setDragOffset(0);
  }, []);

  const handlePointerDown = useCallback(
    (mode: "open" | "close") => (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!swipeable) {
        return;
      }

      if (shouldIgnoreCloseSwipeStart(event, mode)) {
        return;
      }

      gestureRef.current.dragging = true;
      gestureRef.current.start = getPoint(event, axis);
      gestureRef.current.pointerId = event.pointerId;
      gestureRef.current.mode = mode;

      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [axis, swipeable],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const gesture = gestureRef.current;

      if (!gesture.dragging || gesture.pointerId !== event.pointerId) {
        return;
      }

      const current = getPoint(event, axis);
      const signedDelta = SIGNED_DELTA[anchor](current - gesture.start);

      if (gesture.mode === "close") {
        setDragOffset(clamp(signedDelta, -maxDragDistance, 0));
        return;
      }

      setDragOffset(clamp(signedDelta - maxDragDistance, -maxDragDistance, 0));
    },
    [anchor, axis, maxDragDistance],
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const gesture = gestureRef.current;

      if (!gesture.dragging || gesture.pointerId !== event.pointerId) {
        return;
      }

      const current = getPoint(event, axis);
      const signedDelta = SIGNED_DELTA[anchor](current - gesture.start);

      if (gesture.mode === "close") {
        const ratio = Math.abs(signedDelta) / maxDragDistance;
        endGesture();

        if (ratio >= SWIPE_CLOSE_THRESHOLD) {
          onRequestClose();
        }

        return;
      }

      endGesture();

      if (signedDelta >= SWIPE_OPEN_THRESHOLD) {
        onRequestOpen();
      }
    },
    [anchor, axis, endGesture, maxDragDistance, onRequestClose, onRequestOpen],
  );

  return {
    dragOffset,
    endGesture,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
