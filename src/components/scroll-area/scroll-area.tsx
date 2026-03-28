import { Borders, Text } from "foundation/colors";
import { clamp } from "helpers/numbers";
import React, {
  type ComponentPropsWithoutRef,
  forwardRef,
  type UIEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";

type ScrollAreaProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onScroll"
> & {
  children: React.ReactNode;
  maxHeight?: number | string;
  maxWidth?: number | string;
  autoHideDelay?: number;
  scrollbarSize?: number;
  alwaysShowScrollbar?: boolean;
  smoothScroll?: boolean;
  overlayScrollbar?: boolean;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
};

type DragAxis = "x" | "y" | null;

const Root = styled.div<{
  $maxHeight?: number | string;
  $maxWidth?: number | string;
}>`
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  ${({ $maxHeight }) =>
    $maxHeight !== undefined &&
    css`
      max-height: ${typeof $maxHeight === "number"
        ? `${$maxHeight}px`
        : $maxHeight};
    `}

  ${({ $maxWidth }) =>
    $maxWidth !== undefined &&
    css`
      max-width: ${typeof $maxWidth === "number"
        ? `${$maxWidth}px`
        : $maxWidth};
    `}
`;

const Viewport = styled.div<{
  $smoothScroll: boolean;
  $maxHeight?: number | string;
  $maxWidth?: number | string;
  $overlayScrollbar: boolean;
  $hasVerticalScrollbar: boolean;
  $hasHorizontalScrollbar: boolean;
  $scrollbarSize: number;
}>`
  width: 100%;
  overflow: auto;
  min-width: 0;
  min-height: 0;
  scroll-behavior: ${({ $smoothScroll }) =>
    $smoothScroll ? "smooth" : "auto"};

  ${({ $maxHeight }) =>
    $maxHeight !== undefined &&
    css`
      max-height: ${typeof $maxHeight === "number"
        ? `${$maxHeight}px`
        : $maxHeight};
    `}

  ${({ $maxWidth }) =>
    $maxWidth !== undefined &&
    css`
      max-width: ${typeof $maxWidth === "number"
        ? `${$maxWidth}px`
        : $maxWidth};
    `}

  ${({ $overlayScrollbar, $hasVerticalScrollbar, $scrollbarSize }) =>
    !$overlayScrollbar &&
    $hasVerticalScrollbar &&
    css`
      padding-right: ${$scrollbarSize + 8}px;
    `}

  ${({ $overlayScrollbar, $hasHorizontalScrollbar, $scrollbarSize }) =>
    !$overlayScrollbar &&
    $hasHorizontalScrollbar &&
    css`
      padding-bottom: ${$scrollbarSize + 8}px;
    `}

  box-sizing: border-box;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;

const Track = styled.div.attrs<{
  $axis: "x" | "y";
  $visible: boolean;
  $size: number;
  $overlayScrollbar: boolean;
}>(({ $axis, $visible, $size, $overlayScrollbar }) => ({
  style:
    $axis === "y"
      ? {
          top: $overlayScrollbar ? 4 : 0,
          right: $overlayScrollbar ? 4 : 0,
          bottom: $overlayScrollbar ? 4 : 0,
          width: $size,
          opacity: $visible ? 1 : 0,
        }
      : {
          left: $overlayScrollbar ? 4 : 0,
          right: $overlayScrollbar ? 4 : 0,
          bottom: $overlayScrollbar ? 4 : 0,
          height: $size,
          opacity: $visible ? 1 : 0,
        },
}))`
  position: absolute;
  z-index: 2;
  transition: opacity 160ms ease;
  pointer-events: none;
`;

const Thumb = styled.div.attrs<{
  $axis: "x" | "y";
  $offset: number;
  $length: number;
  $size: number;
  $dragging: boolean;
}>(({ $axis, $offset, $length, $size }) => ({
  style:
    $axis === "y"
      ? {
          top: $offset,
          right: 0,
          width: $size,
          height: $length,
        }
      : {
          left: $offset,
          bottom: 0,
          height: $size,
          width: $length,
        },
}))`
  position: absolute;
  border-radius: 999px;
  background: ${Borders.Default.Active};
  pointer-events: auto;
  cursor: pointer;
  user-select: none;
  touch-action: none;
  transition: background 160ms ease;

  &:hover {
    background: ${Text.Muted};
  }

  ${({ $dragging }) =>
    $dragging &&
    css`
      background: ${Text.Default};
    `}
`;

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea(
    {
      children,
      className,
      style,
      maxHeight,
      maxWidth,
      autoHideDelay = 700,
      scrollbarSize = 8,
      smoothScroll = true,
      alwaysShowScrollbar = false,
      overlayScrollbar = true,
      onScroll,
      ...rootProps
    }: ScrollAreaProps,
    ref,
  ) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const hideTimerRef = useRef<number | null>(null);

    const dragAxisRef = useRef<DragAxis>(null);
    const dragStartPointerRef = useRef(0);
    const dragStartScrollRef = useRef(0);

    const [isHovered, setIsHovered] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDraggingX, setIsDraggingX] = useState(false);
    const [isDraggingY, setIsDraggingY] = useState(false);

    const [metrics, setMetrics] = useState({
      scrollTop: 0,
      scrollLeft: 0,
      scrollHeight: 1,
      scrollWidth: 1,
      clientHeight: 1,
      clientWidth: 1,
    });

    useImperativeHandle(ref, () => viewportRef.current as HTMLDivElement, []);

    const updateMetrics = useCallback(() => {
      const el = viewportRef.current;
      if (!el) {
        return;
      }

      setMetrics({
        scrollTop: el.scrollTop,
        scrollLeft: el.scrollLeft,
        scrollHeight: el.scrollHeight,
        scrollWidth: el.scrollWidth,
        clientHeight: el.clientHeight,
        clientWidth: el.clientWidth,
      });
    }, []);

    useLayoutEffect(() => {
      updateMetrics();
    }, [children, updateMetrics]);

    useEffect(() => {
      const el = viewportRef.current;
      if (!el) {
        return;
      }

      updateMetrics();

      const resizeObserver = new ResizeObserver(() => {
        updateMetrics();
      });

      resizeObserver.observe(el);

      const contentChild = el.firstElementChild;
      if (contentChild instanceof HTMLElement) {
        resizeObserver.observe(contentChild);
      }

      window.addEventListener("resize", updateMetrics);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateMetrics);
      };
    }, [updateMetrics, children]);

    const clearHideTimer = useCallback(() => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    }, []);

    const scheduleHide = useCallback(() => {
      clearHideTimer();

      if (alwaysShowScrollbar || isHovered || isDraggingX || isDraggingY) {
        return;
      }

      hideTimerRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, autoHideDelay);
    }, [
      autoHideDelay,
      alwaysShowScrollbar,
      clearHideTimer,
      isDraggingX,
      isDraggingY,
      isHovered,
    ]);

    const handleScroll = useCallback(
      (event: UIEvent<HTMLDivElement>) => {
        updateMetrics();
        setIsScrolling(true);
        scheduleHide();
        onScroll?.(event);
      },
      [onScroll, scheduleHide, updateMetrics],
    );

    const verticalOverflow = metrics.scrollHeight > metrics.clientHeight + 1;
    const horizontalOverflow = metrics.scrollWidth > metrics.clientWidth + 1;

    const verticalTrackLength = Math.max(metrics.clientHeight - 8, 0);
    const horizontalTrackLength = Math.max(metrics.clientWidth - 8, 0);

    const verticalThumbLength = verticalOverflow
      ? clamp(
          (metrics.clientHeight / metrics.scrollHeight) * verticalTrackLength,
          24,
          verticalTrackLength,
        )
      : 0;

    const horizontalThumbLength = horizontalOverflow
      ? clamp(
          (metrics.clientWidth / metrics.scrollWidth) * horizontalTrackLength,
          24,
          horizontalTrackLength,
        )
      : 0;

    const maxVerticalThumbOffset = Math.max(
      verticalTrackLength - verticalThumbLength,
      0,
    );
    const maxHorizontalThumbOffset = Math.max(
      horizontalTrackLength - horizontalThumbLength,
      0,
    );

    const verticalThumbOffset =
      metrics.scrollHeight <= metrics.clientHeight
        ? 0
        : (metrics.scrollTop / (metrics.scrollHeight - metrics.clientHeight)) *
          maxVerticalThumbOffset;

    const horizontalThumbOffset =
      metrics.scrollWidth <= metrics.clientWidth
        ? 0
        : (metrics.scrollLeft / (metrics.scrollWidth - metrics.clientWidth)) *
          maxHorizontalThumbOffset;

    const showScrollbar = useMemo(() => {
      if (alwaysShowScrollbar) {
        return true;
      }
      return isHovered || isScrolling || isDraggingX || isDraggingY;
    }, [alwaysShowScrollbar, isDraggingX, isDraggingY, isHovered, isScrolling]);

    const handleMouseEnter = useCallback(() => {
      clearHideTimer();
      setIsHovered(true);
      setIsScrolling(true);
    }, [clearHideTimer]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      scheduleHide();
    }, [scheduleHide]);

    const startDrag = useCallback(
      (axis: "x" | "y", clientX: number, clientY: number) => {
        const el = viewportRef.current;
        if (!el) {
          return;
        }

        dragAxisRef.current = axis;
        dragStartPointerRef.current = axis === "y" ? clientY : clientX;
        dragStartScrollRef.current =
          axis === "y" ? el.scrollTop : el.scrollLeft;

        if (axis === "y") {
          setIsDraggingY(true);
        } else {
          setIsDraggingX(true);
        }

        clearHideTimer();
        setIsScrolling(true);
      },
      [clearHideTimer],
    );

    useEffect(() => {
      const handlePointerMove = (event: PointerEvent) => {
        const el = viewportRef.current;
        if (!el || !dragAxisRef.current) {
          return;
        }

        const axis = dragAxisRef.current;

        if (axis === "y") {
          const delta = event.clientY - dragStartPointerRef.current;
          const scrollable = el.scrollHeight - el.clientHeight;
          const thumbScrollable = Math.max(
            verticalTrackLength - verticalThumbLength,
            1,
          );

          el.scrollTop =
            dragStartScrollRef.current + (delta / thumbScrollable) * scrollable;
        } else {
          const delta = event.clientX - dragStartPointerRef.current;
          const scrollable = el.scrollWidth - el.clientWidth;
          const thumbScrollable = Math.max(
            horizontalTrackLength - horizontalThumbLength,
            1,
          );

          el.scrollLeft =
            dragStartScrollRef.current + (delta / thumbScrollable) * scrollable;
        }

        updateMetrics();
      };

      const stopDrag = () => {
        dragAxisRef.current = null;
        setIsDraggingX(false);
        setIsDraggingY(false);
        scheduleHide();
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", stopDrag);
      window.addEventListener("pointercancel", stopDrag);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", stopDrag);
        window.removeEventListener("pointercancel", stopDrag);
      };
    }, [
      horizontalThumbLength,
      horizontalTrackLength,
      scheduleHide,
      updateMetrics,
      verticalThumbLength,
      verticalTrackLength,
    ]);

    return (
      <Root
        ref={rootRef}
        className={className}
        style={style}
        $maxHeight={maxHeight}
        $maxWidth={maxWidth}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rootProps}
      >
        <Viewport
          ref={viewportRef}
          onScroll={handleScroll}
          $smoothScroll={smoothScroll}
          $maxHeight={maxHeight}
          $maxWidth={maxWidth}
          $overlayScrollbar={overlayScrollbar}
          $hasVerticalScrollbar={verticalOverflow}
          $hasHorizontalScrollbar={horizontalOverflow}
          $scrollbarSize={scrollbarSize}
        >
          {children}
        </Viewport>

        {verticalOverflow ? (
          <Track
            $axis="y"
            $visible={showScrollbar}
            $size={scrollbarSize}
            $overlayScrollbar={overlayScrollbar}
          >
            <Thumb
              role="presentation"
              $axis="y"
              $offset={verticalThumbOffset}
              $length={verticalThumbLength}
              $size={scrollbarSize}
              $dragging={isDraggingY}
              onPointerDown={(event) => {
                event.preventDefault();
                startDrag("y", event.clientX, event.clientY);
              }}
            />
          </Track>
        ) : null}

        {horizontalOverflow ? (
          <Track
            $axis="x"
            $visible={showScrollbar}
            $size={scrollbarSize}
            $overlayScrollbar={overlayScrollbar}
          >
            <Thumb
              role="presentation"
              $axis="x"
              $offset={horizontalThumbOffset}
              $length={horizontalThumbLength}
              $size={scrollbarSize}
              $dragging={isDraggingX}
              onPointerDown={(event) => {
                event.preventDefault();
                startDrag("x", event.clientX, event.clientY);
              }}
            />
          </Track>
        ) : null}
      </Root>
    );
  },
);
