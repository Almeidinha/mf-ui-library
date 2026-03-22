import { toCssSize } from "helpers/css-helpers";
import { clamp } from "helpers/numbers";
import { useControllableState } from "hooks/useControllableState";
import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";

import {
  DEFAULT_MINI_SIZE,
  DEFAULT_SIZE,
  DEFAULT_SWIPE_AREA_WIDTH,
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_Z_INDEX,
  FOCUSABLE_SELECTOR,
  SWIPE_CLOSE_THRESHOLD,
  SWIPE_OPEN_THRESHOLD,
} from "./constants";
import { SIGNED_DELTA } from "./helpers";
import {
  DrawerSwipeArea,
  resolveContainer,
  Root,
  SharedDrawerRenderer,
  shouldUseMini,
} from "./internal";
import { DrawerAnchor, SwipeableDrawerProps } from "./types";

type GestureState = {
  dragging: boolean;
  start: number;
  pointerId: number | null;
  mode: "open" | "close" | null;
};

const isHorizontal = (anchor: DrawerAnchor) => {
  return anchor === "left" || anchor === "right";
};

const getPoint = (
  event: PointerEvent | ReactPointerEvent<HTMLDivElement>,
  axis: "x" | "y",
) => {
  return axis === "x" ? event.clientX : event.clientY;
};

const isTouchPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
  return event.pointerType === "touch";
};

const shouldIgnoreSwipeStart = (
  event: ReactPointerEvent<HTMLDivElement>,
  mode: "open" | "close",
  allowSwipeInChildren?: boolean | ((target: HTMLElement) => boolean),
) => {
  if (mode !== "close") {
    return false;
  }

  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (typeof allowSwipeInChildren === "function") {
    return !allowSwipeInChildren(target);
  }

  if (allowSwipeInChildren === true) {
    return false;
  }

  return target.closest(FOCUSABLE_SELECTOR) !== null;
};

function useSwipeableDrawer({
  anchor,
  swipeable,
  size,
  miniActive,
  miniSize,
  onRequestOpen,
  onRequestClose,
  allowSwipeInChildren,
}: {
  anchor: DrawerAnchor;
  swipeable: boolean;
  size: number | string;
  miniActive: boolean;
  miniSize: number | string;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  allowSwipeInChildren?: boolean | ((target: HTMLElement) => boolean);
}) {
  const [dragOffset, setDragOffset] = useControllableState<number, false>({
    value: undefined,
    defaultValue: 0,
  });

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
  }, [setDragOffset]);

  const handlePointerDown = useCallback(
    (mode: "open" | "close") => (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!swipeable) {
        return;
      }

      if (!isTouchPointer(event)) {
        return;
      }

      if (shouldIgnoreSwipeStart(event, mode, allowSwipeInChildren)) {
        return;
      }

      gestureRef.current.dragging = true;
      gestureRef.current.start = getPoint(event, axis);
      gestureRef.current.pointerId = event.pointerId;
      gestureRef.current.mode = mode;

      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [allowSwipeInChildren, axis, swipeable],
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
    [anchor, axis, maxDragDistance, setDragOffset],
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
}

export function SwipeableDrawer({
  open: openProp,
  defaultOpen = false,
  onOpen,
  onClose,
  onOpenChange,
  children,
  anchor = "left",
  variant = "temporary",
  containerRef,
  keepMounted = true,
  mini = false,
  miniSize = DEFAULT_MINI_SIZE,
  size = DEFAULT_SIZE,
  overlay = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  lockScroll = true,
  zIndex = DEFAULT_Z_INDEX,
  transitionDuration = DEFAULT_TRANSITION_DURATION,
  className,
  contentClassName,
  style,
  contentStyle,
  swipeAreaWidth = DEFAULT_SWIPE_AREA_WIDTH,
  disableSwipeToOpen = false,
  disableDiscovery = false,
  allowSwipeInChildren,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SwipeableDrawerProps) {
  const [open, setOpen] = useControllableState<boolean, false>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const miniActive = shouldUseMini(variant, mini);
  const sizeCss = toCssSize(size, DEFAULT_SIZE);
  const miniSizeCss = toCssSize(miniSize, DEFAULT_MINI_SIZE);
  const mountNode = resolveContainer(containerRef);
  const discoverySize = disableDiscovery ? 0 : Math.min(20, swipeAreaWidth);

  const handleRequestOpen = useCallback(() => {
    if (open) {
      return;
    }

    setOpen(true);
    onOpen?.();
  }, [onOpen, open, setOpen]);

  const handleRequestClose = useCallback(() => {
    if (!open) {
      return;
    }

    setOpen(false);
    onClose?.();
  }, [onClose, open, setOpen]);

  const {
    dragOffset,
    endGesture,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useSwipeableDrawer({
    anchor,
    swipeable: true,
    size,
    miniActive,
    miniSize,
    onRequestOpen: handleRequestOpen,
    onRequestClose: handleRequestClose,
    allowSwipeInChildren,
  });

  const showSwipeArea = !open && !miniActive && !disableSwipeToOpen;

  const swipeArea = (
    <Root
      $zIndex={zIndex}
      $variant="temporary"
      className={className}
      style={style}
    >
      <DrawerSwipeArea
        anchor={anchor}
        swipeAreaWidth={swipeAreaWidth}
        discoverySize={discoverySize}
        visible={showSwipeArea}
        disableDiscovery={disableDiscovery}
        onPointerDown={handlePointerDown("open")}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={endGesture}
      />
    </Root>
  );

  const surfacePointerHandlers = useMemo(
    () => ({
      onPointerDown: open ? handlePointerDown("close") : undefined,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: endGesture,
    }),
    [endGesture, handlePointerDown, handlePointerMove, handlePointerUp, open],
  );

  return (
    <>
      {showSwipeArea
        ? mountNode
          ? createPortal(swipeArea, mountNode)
          : swipeArea
        : null}

      <SharedDrawerRenderer
        open={open}
        anchor={anchor}
        variant={variant}
        containerRef={containerRef}
        keepMounted={keepMounted}
        miniActive={miniActive}
        overlay={overlay}
        closeOnOverlayClick={closeOnOverlayClick}
        lockScroll={lockScroll}
        closeOnEsc={closeOnEsc}
        zIndex={zIndex}
        duration={transitionDuration}
        sizeCss={sizeCss}
        miniSizeCss={miniSizeCss}
        className={className}
        contentClassName={contentClassName}
        style={style}
        contentStyle={contentStyle}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        dragOffset={dragOffset}
        onRequestClose={handleRequestClose}
        surfacePointerHandlers={surfacePointerHandlers}
      >
        {children}
      </SharedDrawerRenderer>
    </>
  );
}
