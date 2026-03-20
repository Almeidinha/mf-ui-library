import { Slide, SlideDirection } from "components/transitions";
import { Borders } from "foundation/colors";
import { toCssSize } from "helpers/css-helpers";
import { If } from "helpers/nothing";
import { useControllableState } from "hooks/useControllableState";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css, RuleSet } from "styled-components";

import {
  DEFAULT_MINI_SIZE,
  DEFAULT_SIZE,
  DEFAULT_SWIPE_EDGE,
  DEFAULT_TRANSITION_DURATION,
  DEFAULT_TRANSITION_OFFSET,
  DEFAULT_Z_INDEX,
} from "./constants";
import { usePresence } from "./hooks/usePresence";
import { isHorizontal, useSwipeableDrawer } from "./hooks/useSwipeableDrawer";
import { useTemporaryDrawerFocus } from "./hooks/useTemporaryDrawerFocus";
import {
  DrawerAnchor,
  DrawerProps,
  DrawerSurfaceProps,
  DrawerVariant,
  PersistentDrawerProps,
  TemporaryDrawerContentProps,
  TemporaryDrawerProps,
} from "./types";

const resolveContainer = (
  container?: DrawerProps["container"],
): HTMLElement | null => {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof container === "function") {
    return container();
  }

  return container ?? document.body;
};

const shouldUseMini = (
  anchor: DrawerAnchor,
  variant: DrawerVariant,
  mini: boolean,
) => {
  return variant === "persistent" && mini && isHorizontal(anchor);
};

const getClosedTransform = (anchor: DrawerAnchor, miniOffset = "0px") => {
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
};

const EDGE_POSITION_MAP: Record<DrawerAnchor, RuleSet<object>> = {
  left: css`
    left: 0;
    top: 0;
    bottom: 0;
  `,
  right: css`
    right: 0;
    top: 0;
    bottom: 0;
  `,
  top: css`
    top: 0;
    left: 0;
    right: 0;
  `,
  bottom: css`
    bottom: 0;
    left: 0;
    right: 0;
  `,
};

const SLIDE_DIRECTION_MAP: Record<DrawerAnchor, SlideDirection> = {
  left: "right",
  right: "left",
  top: "down",
  bottom: "up",
};

const getPersistentClosedTransform = (
  anchor: DrawerAnchor,
  size: string,
  miniOffset = "0px",
) => {
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
};

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
          ${EDGE_POSITION_MAP[$anchor]}
          width: ${$size}px;
        `;
      case "top":
      case "bottom":
        return css`
          ${EDGE_POSITION_MAP[$anchor]}
          height: ${$size}px;
        `;
    }
  }}
`;

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

function TemporaryDrawerContent({
  open,
  onRequestClose,
  //onRequestOpen,
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
        direction={SLIDE_DIRECTION_MAP[anchor]}
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
  const inlineRootRef = useRef<HTMLDivElement | null>(null);

  const { present, renderedOpen } = usePresence({
    open,
    keepMounted,
    miniActive,
    anchor,
    ref: inlineRootRef,
  });

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

  if (!present) {
    return null;
  }

  return (
    <InlineRoot
      ref={inlineRootRef}
      $zIndex={zIndex}
      $anchor={anchor}
      $open={renderedOpen}
      $size={sizeCss}
      $miniSize={miniSizeCss}
      $miniActive={miniActive}
      $duration={duration}
      className={className}
      style={style}
    >
      <DrawerSurface
        open={renderedOpen}
        anchor={anchor}
        temporary={false}
        sizeCss={sizeCss}
        miniSizeCss={miniSizeCss}
        miniCollapsed={Boolean(miniActive && !renderedOpen)}
        dragOffset={dragOffset}
        duration={duration}
        swipeable={swipeable}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        className={contentClassName}
        style={contentStyle}
        onPointerDown={renderedOpen ? handlePointerDown("close") : undefined}
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
  const [open, setOpen] = useControllableState<boolean, false>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const temporary = variant === "temporary";
  const miniActive = shouldUseMini(anchor, variant, mini);
  const sizeCss = toCssSize(size, DEFAULT_SIZE);
  const miniSizeCss = toCssSize(miniSize, DEFAULT_MINI_SIZE);

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
