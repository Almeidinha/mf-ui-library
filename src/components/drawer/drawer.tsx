import { Slide } from "components/transitions";
import { Borders } from "foundation/colors";
import { toCssSize } from "helpers/css-helpers";
import { If } from "helpers/nothing";
import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";

import { DrawerAnchor, DrawerProps, DrawerVariant } from "./types";

const DEFAULT_SIZE = 280;
const DEFAULT_MINI_SIZE = 64;
const DEFAULT_SWIPE_EDGE = 20;
const DEFAULT_Z_INDEX = 1300;
const DEFAULT_TRANSITION_DURATION = 220;
const DEFAULT_TRANSITION_OFFSET = 8;

const SWIPE_CLOSE_THRESHOLD = 0.35;
const SWIPE_OPEN_THRESHOLD = 24;

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(",");

function resolveContainer(
  container?: DrawerProps["container"],
): HTMLElement | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof container === "function") {
    return container();
  }

  return container ?? document.body;
}

function isHorizontal(anchor: DrawerAnchor) {
  return anchor === "left" || anchor === "right";
}

function shouldUseMini(
  anchor: DrawerAnchor,
  variant: DrawerVariant,
  mini: boolean,
) {
  return variant === "persistent" && mini && isHorizontal(anchor);
}

function getClosedTransform(anchor: DrawerAnchor, miniOffset = "0px") {
  switch (anchor) {
    case "left":
      return `translate3d(calc(-100% + ${miniOffset}), 0, 0)`;
    case "right":
      return `translate3d(calc(100% - ${miniOffset}), 0, 0)`;
    case "top":
      return "translate3d(0, -100%, 0)";
    case "bottom":
      return "translate3d(0, 100%, 0)";
  }
}

function getEdgePosition(anchor: DrawerAnchor) {
  switch (anchor) {
    case "left":
      return css`
        left: 0;
        top: 0;
        bottom: 0;
      `;
    case "right":
      return css`
        right: 0;
        top: 0;
        bottom: 0;
      `;
    case "top":
      return css`
        top: 0;
        left: 0;
        right: 0;
      `;
    case "bottom":
      return css`
        bottom: 0;
        left: 0;
        right: 0;
      `;
  }
}

function getSlideDirection(anchor: DrawerAnchor) {
  switch (anchor) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "down";
    case "bottom":
      return "up";
  }
}

function getPoint(
  event: PointerEvent | ReactPointerEvent<HTMLDivElement>,
  axis: "x" | "y",
) {
  return axis === "x" ? event.clientX : event.clientY;
}

function getSignedDelta(anchor: DrawerAnchor, raw: number) {
  switch (anchor) {
    case "left":
      return raw;
    case "right":
      return -raw;
    case "top":
      return raw;
    case "bottom":
      return -raw;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true",
  );
}

function useControlledOpen({
  open,
  defaultOpen = false,
  onOpen,
  onClose,
  onOpenChange,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);

      if (nextOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    [isControlled, onClose, onOpen, onOpenChange],
  );

  return [resolvedOpen, setOpen] as const;
}

function getPersistentClosedTransform(
  anchor: DrawerAnchor,
  size: string,
  miniOffset = "0px",
) {
  switch (anchor) {
    case "left":
      return `translate3d(calc(-1 * (${size} - ${miniOffset})), 0, 0)`;
    case "right":
      return `translate3d(calc(${size} - ${miniOffset}), 0, 0)`;
    case "top":
      return `translate3d(0, calc(-1 * (${size} - ${miniOffset})), 0)`;
    case "bottom":
      return `translate3d(0, calc(${size} - ${miniOffset}), 0)`;
  }
}

type GestureState = {
  dragging: boolean;
  start: number;
  pointerId: number | null;
  mode: "open" | "close" | null;
};

function useSwipeableDrawer({
  anchor,
  open,
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
}) {
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

      gestureRef.current.dragging = true;
      gestureRef.current.start = getPoint(event, axis);
      gestureRef.current.pointerId = event.pointerId;
      gestureRef.current.mode = mode;

      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
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
      const signedDelta = getSignedDelta(anchor, current - gesture.start);

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
      const signedDelta = getSignedDelta(anchor, current - gesture.start);

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

function useTemporaryDrawerFocus({
  enabled,
  open,
  surfaceRef,
  onRequestClose,
}: {
  enabled: boolean;
  open: boolean;
  surfaceRef: RefObject<HTMLElement | null>;
  onRequestClose: () => void;
}) {
  const previousFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !open) {
      return;
    }

    previousFocusedRef.current = document.activeElement as HTMLElement | null;

    const surface = surfaceRef.current;
    if (!surface) {
      return;
    }

    const focusable = getFocusableElements(surface);
    const firstFocusable = focusable[0];

    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      surface.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = getFocusableElements(surface);
      if (elements.length === 0) {
        event.preventDefault();
        surface.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || active === surface) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    surface.addEventListener("keydown", handleKeyDown);

    return () => {
      surface.removeEventListener("keydown", handleKeyDown);

      const previous = previousFocusedRef.current;
      if (previous && document.contains(previous)) {
        previous.focus();
      }
    };
  }, [enabled, onRequestClose, open, surfaceRef]);
}

const Root = styled.div<{ $zIndex: number }>`
  position: fixed;
  inset: 0;
  z-index: ${({ $zIndex }) => $zIndex};
  pointer-events: none;
`;

const InlineRoot = styled.div<{
  $zIndex: number;
  $anchor: DrawerAnchor;
  $open: boolean;
  $size: string;
  $miniSize: string;
  $miniActive: boolean;
  $duration: number;
}>`
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  overflow: hidden;
  flex-shrink: 0;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  transition:
    width ${({ $duration }) => $duration}ms ease,
    height ${({ $duration }) => $duration}ms ease;

  ${({ $anchor, $open, $size, $miniSize, $miniActive }) => {
    const closedSize = $miniActive ? $miniSize : "0px";
    const currentSize = $open ? $size : closedSize;

    switch ($anchor) {
      case "left":
      case "right":
        return css`
          width: ${currentSize};
          height: 100%;
        `;

      case "top":
      case "bottom":
        return css`
          width: 100%;
          height: ${currentSize};
        `;
    }
  }}
`;

const Backdrop = styled.div<{
  $open: boolean;
  $duration: number;
}>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: opacity ${({ $duration }) => $duration}ms ease;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

const Surface = styled.div<{
  $anchor: DrawerAnchor;
  $open: boolean;
  $temporary: boolean;
  $size?: string;
  $miniSize?: string;
  $miniActive?: boolean;
  $dragOffset: number;
  $duration: number;
}>`
  position: ${({ $temporary }) => ($temporary ? "absolute" : "relative")};
  background: white;
  border: 1px solid ${Borders.Default.Default};
  border-top-width: ${({ $anchor }) => ($anchor === "bottom" ? "1px" : "0")};
  border-bottom-width: ${({ $anchor }) => ($anchor === "top" ? "1px" : "0")};
  border-left-width: ${({ $anchor }) => ($anchor === "right" ? "1px" : "0")};
  border-right-width: ${({ $anchor }) => ($anchor === "left" ? "1px" : "0")};
  overflow: auto;
  pointer-events: auto;
  will-change: transform;
  transition: transform ${({ $duration }) => $duration}ms ease;
  outline: none;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;

  ${({ $anchor, $size, $temporary, $miniActive, $miniSize, $open }) => {
    const closedSize = $miniActive ? $miniSize : "0px";
    const currentSize = $open ? $size : closedSize;
    const persistentInlineSize = $miniActive ? currentSize : $size;

    switch ($anchor) {
      case "left":
        return $temporary
          ? css`
              top: 0;
              left: 0;
              bottom: 0;
              width: ${$size};
            `
          : css`
              width: ${persistentInlineSize};
              height: 100%;
            `;

      case "right":
        return $temporary
          ? css`
              top: 0;
              right: 0;
              bottom: 0;
              width: ${$size};
            `
          : css`
              width: ${persistentInlineSize};
              height: 100%;
            `;

      case "top":
        return $temporary
          ? css`
              top: 0;
              left: 0;
              right: 0;
              height: ${$size};
            `
          : css`
              width: 100%;
              height: ${$size};
            `;

      case "bottom":
        return $temporary
          ? css`
              left: 0;
              right: 0;
              bottom: 0;
              height: ${$size};
            `
          : css`
              width: 100%;
              height: ${$size};
            `;
    }
  }}

  ${({
    $anchor,
    $open,
    $miniActive,
    $miniSize,
    $size,
    $dragOffset,
    $temporary,
  }) => {
    const miniOffset = $miniActive ? $miniSize : "0px";
    const isPersistentMiniClosed = !$temporary && !$open && $miniActive;

    const baseTransform = $open
      ? "translate3d(0, 0, 0)"
      : $temporary
        ? getClosedTransform($anchor, miniOffset)
        : isPersistentMiniClosed
          ? "translate3d(0, 0, 0)"
          : getPersistentClosedTransform($anchor, $size ?? "0px", "0px");

    const dragTransform =
      $dragOffset === 0
        ? baseTransform
        : (() => {
            switch ($anchor) {
              case "left":
              case "right":
                return `${baseTransform} translate3d(${$dragOffset}px, 0, 0)`;
              case "top":
              case "bottom":
                return `${baseTransform} translate3d(0, ${$dragOffset}px, 0)`;
            }
          })();

    return css`
      transform: ${dragTransform};
    `;
  }}
`;

const SwipeEdge = styled.div<{
  $anchor: DrawerAnchor;
  $size: number;
  $visible: boolean;
}>`
  position: absolute;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  z-index: 1;

  ${({ $anchor, $size }) => {
    switch ($anchor) {
      case "left":
      case "right":
        return css`
          ${getEdgePosition($anchor)}
          width: ${$size}px;
        `;
      case "top":
      case "bottom":
        return css`
          ${getEdgePosition($anchor)}
          height: ${$size}px;
        `;
    }
  }}
`;

type DrawerSurfaceProps = {
  open: boolean;
  anchor: DrawerAnchor;
  temporary: boolean;
  sizeCss: string;
  miniSizeCss: string;
  miniCollapsed: boolean;
  dragOffset: number;
  duration: number;
  swipeable: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  style?: CSSProperties;
  contentRef?: RefObject<HTMLDivElement | null>;
  onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerCancel?: () => void;
  children: ReactNode;
};

function DrawerSurface({
  open,
  anchor,
  temporary,
  sizeCss,
  miniSizeCss,
  miniCollapsed,
  dragOffset,
  duration,
  swipeable,
  ariaLabel,
  ariaLabelledBy,
  className,
  style,
  contentRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  children,
}: DrawerSurfaceProps) {
  return (
    <Surface
      ref={contentRef}
      role={temporary ? "dialog" : "complementary"}
      aria-modal={temporary ? true : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={temporary ? -1 : undefined}
      $anchor={anchor}
      $open={open}
      $temporary={temporary}
      $size={sizeCss}
      $miniSize={miniSizeCss}
      $miniActive={miniCollapsed}
      $dragOffset={dragOffset}
      $duration={duration}
      className={className}
      style={style}
      onPointerDown={swipeable ? onPointerDown : undefined}
      onPointerMove={swipeable ? onPointerMove : undefined}
      onPointerUp={swipeable ? onPointerUp : undefined}
      onPointerCancel={swipeable ? onPointerCancel : undefined}
    >
      {children}
    </Surface>
  );
}

type TemporaryDrawerContentProps = {
  open: boolean;
  onRequestClose: () => void;
  onRequestOpen: () => void;
  anchor: DrawerAnchor;
  swipeable: boolean;
  swipeEdgeSize: number;
  overlay: boolean;
  closeOnOverlayClick: boolean;
  sizeCss: string;
  miniSizeCss: string;
  dragOffset: number;
  duration: number;
  transitionOffset: number;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  contentRef: RefObject<HTMLDivElement | null>;
  handlePointerDown: (
    mode: "open" | "close",
  ) => (event: ReactPointerEvent<HTMLDivElement>) => void;
  handlePointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  handlePointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  endGesture: () => void;
  children: ReactNode;
};

function TemporaryDrawerContent({
  open,
  onRequestClose,
  onRequestOpen,
  anchor,
  swipeable,
  swipeEdgeSize,
  overlay,
  closeOnOverlayClick,
  sizeCss,
  miniSizeCss,
  dragOffset,
  duration,
  transitionOffset,
  contentClassName,
  contentStyle,
  ariaLabel,
  ariaLabelledBy,
  contentRef,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  endGesture,
  children,
}: TemporaryDrawerContentProps) {
  return (
    <>
      <If is={overlay}>
        <Backdrop
          $open={open}
          $duration={duration}
          onClick={closeOnOverlayClick ? onRequestClose : undefined}
        />
      </If>

      <If is={swipeable}>
        <SwipeEdge
          $anchor={anchor}
          $size={swipeEdgeSize}
          $visible={!open}
          onPointerDown={handlePointerDown("open")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={endGesture}
        />
      </If>

      <Slide
        in={open}
        direction={getSlideDirection(anchor)}
        offset={transitionOffset}
        timeout={duration}
        mountOnEnter={false}
        unmountOnExit={false}
      >
        <DrawerSurface
          open={open}
          anchor={anchor}
          temporary
          sizeCss={sizeCss}
          miniSizeCss={miniSizeCss}
          miniCollapsed={false}
          dragOffset={dragOffset}
          duration={duration}
          swipeable={swipeable}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          className={contentClassName}
          style={contentStyle}
          contentRef={contentRef}
          onPointerDown={open ? handlePointerDown("close") : undefined}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={endGesture}
        >
          {children}
        </DrawerSurface>
      </Slide>
    </>
  );
}

type TemporaryDrawerProps = {
  open: boolean;
  onRequestClose: () => void;
  onRequestOpen: () => void;
  anchor: DrawerAnchor;
  container?: DrawerProps["container"];
  swipeable: boolean;
  swipeEdgeSize: number;
  keepMounted: boolean;
  overlay: boolean;
  closeOnOverlayClick: boolean;
  lockScroll: boolean;
  closeOnEsc: boolean;
  zIndex: number;
  duration: number;
  transitionOffset: number;
  size: number | string;
  miniActive: boolean;
  miniSize: number | string;
  sizeCss: string;
  miniSizeCss: string;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
};

function TemporaryDrawer({
  open,
  onRequestClose,
  onRequestOpen,
  anchor,
  container,
  swipeable,
  swipeEdgeSize,
  keepMounted,
  overlay,
  closeOnOverlayClick,
  lockScroll,
  closeOnEsc,
  zIndex,
  duration,
  transitionOffset,
  size,
  miniActive,
  miniSize,
  sizeCss,
  miniSizeCss,
  className,
  contentClassName,
  style,
  contentStyle,
  ariaLabel,
  ariaLabelledBy,
  children,
}: TemporaryDrawerProps) {
  const mountNode = resolveContainer(container);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const {
    dragOffset,
    endGesture,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useSwipeableDrawer({
    anchor,
    open,
    swipeable,
    size,
    miniActive,
    miniSize,
    onRequestOpen,
    onRequestClose,
  });

  useTemporaryDrawerFocus({
    enabled: true,
    open,
    surfaceRef: contentRef,
    onRequestClose,
  });

  useEffect(() => {
    if (!lockScroll || !open) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [lockScroll, open]);

  useEffect(() => {
    if (!closeOnEsc || !open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onRequestClose, open]);

  if (!keepMounted && !open) {
    return swipeable ? (
      <Root $zIndex={zIndex} className={className} style={style}>
        <TemporaryDrawerContent
          open={open}
          onRequestClose={onRequestClose}
          onRequestOpen={onRequestOpen}
          anchor={anchor}
          swipeable={swipeable}
          swipeEdgeSize={swipeEdgeSize}
          overlay={false}
          closeOnOverlayClick={closeOnOverlayClick}
          sizeCss={sizeCss}
          miniSizeCss={miniSizeCss}
          dragOffset={dragOffset}
          duration={duration}
          transitionOffset={transitionOffset}
          contentClassName={contentClassName}
          contentStyle={contentStyle}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          contentRef={contentRef}
          handlePointerDown={handlePointerDown}
          handlePointerMove={handlePointerMove}
          handlePointerUp={handlePointerUp}
          endGesture={endGesture}
        >
          {children}
        </TemporaryDrawerContent>
      </Root>
    ) : null;
  }

  const content = (
    <Root $zIndex={zIndex} className={className} style={style}>
      <TemporaryDrawerContent
        open={open}
        onRequestClose={onRequestClose}
        onRequestOpen={onRequestOpen}
        anchor={anchor}
        swipeable={swipeable}
        swipeEdgeSize={swipeEdgeSize}
        overlay={overlay}
        closeOnOverlayClick={closeOnOverlayClick}
        sizeCss={sizeCss}
        miniSizeCss={miniSizeCss}
        dragOffset={dragOffset}
        duration={duration}
        transitionOffset={transitionOffset}
        contentClassName={contentClassName}
        contentStyle={contentStyle}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        contentRef={contentRef}
        handlePointerDown={handlePointerDown}
        handlePointerMove={handlePointerMove}
        handlePointerUp={handlePointerUp}
        endGesture={endGesture}
      >
        {children}
      </TemporaryDrawerContent>
    </Root>
  );

  return mountNode ? createPortal(content, mountNode) : content;
}

type PersistentDrawerProps = {
  open: boolean;
  anchor: DrawerAnchor;
  swipeable: boolean;
  keepMounted: boolean;
  miniActive: boolean;
  size: number | string;
  miniSize: number | string;
  sizeCss: string;
  miniSizeCss: string;
  zIndex: number;
  duration: number;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onRequestOpen: () => void;
  onRequestClose: () => void;
  children: ReactNode;
};

function PersistentDrawer({
  open,
  anchor,
  swipeable,
  keepMounted,
  miniActive,
  size,
  miniSize,
  sizeCss,
  miniSizeCss,
  zIndex,
  duration,
  className,
  contentClassName,
  style,
  contentStyle,
  ariaLabel,
  ariaLabelledBy,
  onRequestOpen,
  onRequestClose,
  children,
}: PersistentDrawerProps) {
  const shouldRender = keepMounted || open || miniActive;

  const {
    dragOffset,
    endGesture,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useSwipeableDrawer({
    anchor,
    open,
    swipeable,
    size,
    miniActive,
    miniSize,
    onRequestOpen,
    onRequestClose,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <InlineRoot
      $zIndex={zIndex}
      $anchor={anchor}
      $open={open}
      $size={sizeCss}
      $miniSize={miniSizeCss}
      $miniActive={miniActive}
      $duration={duration}
      className={className}
      style={style}
    >
      <DrawerSurface
        open={open}
        anchor={anchor}
        temporary={false}
        sizeCss={sizeCss}
        miniSizeCss={miniSizeCss}
        miniCollapsed={Boolean(miniActive && !open)}
        dragOffset={dragOffset}
        duration={duration}
        swipeable={swipeable}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        className={contentClassName}
        style={contentStyle}
        onPointerDown={open ? handlePointerDown("close") : undefined}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={endGesture}
      >
        {children}
      </DrawerSurface>
    </InlineRoot>
  );
}

export function Drawer({
  open: openProp,
  defaultOpen = false,
  onOpen,
  onClose,
  onOpenChange,
  children,
  anchor = "left",
  variant = "temporary",
  container,
  swipeable = false,
  swipeEdgeSize = DEFAULT_SWIPE_EDGE,
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
  transitionOffset = DEFAULT_TRANSITION_OFFSET,
  className,
  contentClassName,
  style,
  contentStyle,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: DrawerProps) {
  const [open, setOpen] = useControlledOpen({
    open: openProp,
    defaultOpen,
    onOpen,
    onClose,
    onOpenChange,
  });

  const temporary = variant === "temporary";
  const miniActive = shouldUseMini(anchor, variant, mini);
  const sizeCss = toCssSize(size, DEFAULT_SIZE);
  const miniSizeCss = toCssSize(miniSize, DEFAULT_MINI_SIZE);

  const handleRequestOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleRequestClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  if (temporary) {
    return (
      <TemporaryDrawer
        open={open}
        onRequestClose={handleRequestClose}
        onRequestOpen={handleRequestOpen}
        anchor={anchor}
        container={container}
        swipeable={swipeable}
        swipeEdgeSize={swipeEdgeSize}
        keepMounted={keepMounted}
        overlay={overlay}
        closeOnOverlayClick={closeOnOverlayClick}
        lockScroll={lockScroll}
        closeOnEsc={closeOnEsc}
        zIndex={zIndex}
        duration={transitionDuration}
        transitionOffset={transitionOffset}
        size={size}
        miniActive={miniActive}
        miniSize={miniSize}
        sizeCss={sizeCss}
        miniSizeCss={miniSizeCss}
        className={className}
        contentClassName={contentClassName}
        style={style}
        contentStyle={contentStyle}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
      >
        {children}
      </TemporaryDrawer>
    );
  }

  return (
    <PersistentDrawer
      open={open}
      anchor={anchor}
      swipeable={swipeable}
      keepMounted={keepMounted}
      miniActive={miniActive}
      size={size}
      miniSize={miniSize}
      sizeCss={sizeCss}
      miniSizeCss={miniSizeCss}
      zIndex={zIndex}
      duration={transitionDuration}
      className={className}
      contentClassName={contentClassName}
      style={style}
      contentStyle={contentStyle}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      onRequestOpen={handleRequestOpen}
      onRequestClose={handleRequestClose}
    >
      {children}
    </PersistentDrawer>
  );
}
