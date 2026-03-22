import { Borders } from "foundation/colors";
import { If } from "helpers/nothing";
import { RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css, RuleSet } from "styled-components";

import { usePresence } from "./hooks/usePresence";
import { useTemporaryDrawerFocus } from "./hooks/useTemporaryDrawerFocus";
import {
  DrawerAnchor,
  DrawerSurfaceProps,
  DrawerVariant,
  SharedDrawerRenderProps,
  SwipeAreaProps,
} from "./types";

export const resolveContainer = (
  containerRef?: RefObject<HTMLElement | null>,
): HTMLElement | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return containerRef?.current ?? document.body;
};

export function shouldUseMini(variant: DrawerVariant, mini: boolean) {
  return variant === "persistent" && mini;
}

const CLOSED_TRANSFORM: Record<DrawerAnchor, (miniOffset?: string) => string> =
  {
    left: (miniOffset = "0px") =>
      `translate3d(calc(-100% + ${miniOffset}), 0, 0)`,
    right: (miniOffset = "0px") =>
      `translate3d(calc(100% - ${miniOffset}), 0, 0)`,
    top: () => "translate3d(0, -100%, 0)",
    bottom: () => "translate3d(0, 100%, 0)",
  };

const PERSISTENT_CLOSED_TRANSFORM: Record<
  DrawerAnchor,
  (size: string, miniOffset?: string) => string
> = {
  left: (size, miniOffset = "0px") =>
    `translate3d(calc(-1 * (${size} - ${miniOffset})), 0, 0)`,
  right: (size, miniOffset = "0px") =>
    `translate3d(calc(${size} - ${miniOffset}), 0, 0)`,
  top: (size, miniOffset = "0px") =>
    `translate3d(0, calc(-1 * (${size} - ${miniOffset})), 0)`,
  bottom: (size, miniOffset = "0px") =>
    `translate3d(0, calc(${size} - ${miniOffset}), 0)`,
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

export const Root = styled.div<{
  $zIndex: number;
  $variant?: DrawerVariant;
  $open?: boolean;
  $size?: string;
  $miniSize?: string;
  $miniActive?: boolean;
  $anchor?: DrawerAnchor;
  $duration?: number;
}>`
  position: ${({ $variant }) =>
    $variant === "temporary" ? "fixed" : "relative"};
  ${({ $variant }) => $variant === "temporary" && "inset: 0;"}
  z-index: ${({ $zIndex }) => $zIndex};
  pointer-events: none;

  ${({ $variant, $duration = 0 }) =>
    $variant === "persistent" &&
    css`
      overflow: hidden;
      flex-shrink: 0;
      min-width: 0;
      min-height: 0;
      box-sizing: border-box;
      transition:
        width ${$duration}ms ease,
        height ${$duration}ms ease;
    `}

  ${({ $variant, $anchor, $open, $size, $miniSize, $miniActive }) => {
    if ($variant !== "persistent") {
      return "";
    }

    const closedSize = $miniActive ? ($miniSize ?? "0px") : "0px";
    const currentSize = $open ? ($size ?? "0px") : closedSize;

    if ($anchor === "left" || $anchor === "right") {
      return css`
        width: ${currentSize};
        height: 100%;
      `;
    }

    if ($anchor === "top" || $anchor === "bottom") {
      return css`
        width: 100%;
        height: ${currentSize};
      `;
    }

    return "";
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
  $dragOffset?: number;
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

  ${({ $anchor }) =>
    ($anchor === "left" || $anchor === "right") &&
    css`
      touch-action: pan-y;
    `}

  ${({ $anchor }) =>
    ($anchor === "top" || $anchor === "bottom") &&
    css`
      touch-action: pan-x;
    `}

  ${({ $anchor, $size, $temporary, $miniActive, $miniSize, $open }) => {
    const closedSize = $miniActive ? $miniSize : "0px";
    const currentSize = $open ? $size : closedSize;
    const currentHeight = $open ? $size : $miniSize;
    const persistentInlineSize = $miniActive ? currentSize : $size;
    const persistentInlineHeight = $miniActive ? currentHeight : $size;

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
              height: ${persistentInlineHeight};
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
              height: ${persistentInlineHeight};
            `;
    }
  }}

  ${({
    $anchor,
    $open,
    $miniActive,
    $miniSize,
    $size,
    $dragOffset = 0,
    $temporary,
  }) => {
    const miniOffset = $miniActive ? $miniSize : "0px";
    const isPersistentMiniClosed = !$temporary && !$open && $miniActive;

    const baseTransform = $open
      ? "translate3d(0, 0, 0)"
      : $temporary
        ? CLOSED_TRANSFORM[$anchor](miniOffset)
        : isPersistentMiniClosed
          ? "translate3d(0, 0, 0)"
          : PERSISTENT_CLOSED_TRANSFORM[$anchor]($size ?? "0px", miniOffset);

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

const SwipeArea = styled.div<{
  $anchor: DrawerAnchor;
  $size: number;
  $discoverySize: number;
  $visible: boolean;
}>`
  position: absolute;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  z-index: 1;

  ${({ $anchor }) =>
    ($anchor === "left" || $anchor === "right") &&
    css`
      touch-action: pan-y;
    `}

  ${({ $anchor }) =>
    ($anchor === "top" || $anchor === "bottom") &&
    css`
      touch-action: pan-x;
    `}

  ${({ $anchor, $size, $discoverySize }) => {
    switch ($anchor) {
      case "left":
        return css`
          ${EDGE_POSITION_MAP.left}
          width: ${$size + $discoverySize}px;
        `;
      case "right":
        return css`
          ${EDGE_POSITION_MAP.right}
          width: ${$size + $discoverySize}px;
        `;
      case "top":
        return css`
          ${EDGE_POSITION_MAP.top}
          height: ${$size + $discoverySize}px;
        `;
      case "bottom":
        return css`
          ${EDGE_POSITION_MAP.bottom}
          height: ${$size + $discoverySize}px;
        `;
    }
  }}
`;

const DiscoveryPeek = styled.div<{
  $anchor: DrawerAnchor;
  $size: number;
}>`
  position: absolute;

  ${({ $anchor, $size }) => {
    switch ($anchor) {
      case "left":
        return css`
          left: 0;
          top: 0;
          bottom: 0;
          width: ${$size}px;
        `;
      case "right":
        return css`
          right: 0;
          top: 0;
          bottom: 0;
          width: ${$size}px;
        `;
      case "top":
        return css`
          top: 0;
          left: 0;
          right: 0;
          height: ${$size}px;
        `;
      case "bottom":
        return css`
          bottom: 0;
          left: 0;
          right: 0;
          height: ${$size}px;
        `;
    }
  }}
`;

export function DrawerSwipeArea({
  anchor,
  swipeAreaWidth,
  discoverySize,
  visible,
  disableDiscovery,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: SwipeAreaProps) {
  return (
    <SwipeArea
      $anchor={anchor}
      $size={swipeAreaWidth}
      $discoverySize={disableDiscovery ? 0 : discoverySize}
      $visible={visible}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {!disableDiscovery && (
        <DiscoveryPeek $anchor={anchor} $size={discoverySize} />
      )}
    </SwipeArea>
  );
}

export function DrawerSurfaceComponent({
  open,
  anchor,
  temporary,
  sizeCss,
  miniSizeCss,
  miniCollapsed,
  dragOffset = 0,
  duration,
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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {children}
    </Surface>
  );
}

export function SharedDrawerRenderer({
  open,
  anchor,
  variant,
  containerRef,
  keepMounted,
  miniActive,
  overlay,
  closeOnOverlayClick,
  lockScroll,
  closeOnEsc,
  zIndex,
  duration,
  sizeCss,
  miniSizeCss,
  className,
  contentClassName,
  style,
  contentStyle,
  ariaLabel,
  ariaLabelledBy,
  children,
  dragOffset = 0,
  onRequestClose,
  surfacePointerHandlers,
}: SharedDrawerRenderProps) {
  const temporary = variant === "temporary";
  const mountNode = resolveContainer(containerRef);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const persistentRootRef = useRef<HTMLDivElement | null>(null);
  const persistentSurfaceRef = useRef<HTMLDivElement | null>(null);

  const { present, renderedOpen } = usePresence({
    open,
    keepMounted,
    miniActive,
    anchor,
    ref: persistentRootRef,
  });

  useTemporaryDrawerFocus({
    enabled: temporary,
    open,
    surfaceRef: contentRef,
    onRequestClose,
  });

  useEffect(() => {
    if (!temporary || !lockScroll || !open) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [lockScroll, open, temporary]);

  useEffect(() => {
    if (!temporary || !closeOnEsc || !open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, onRequestClose, open, temporary]);

  if (temporary) {
    const content = (
      <Root
        $zIndex={zIndex}
        $variant="temporary"
        className={className}
        style={style}
      >
        <If is={overlay}>
          <Backdrop
            $open={open}
            $duration={duration}
            onClick={closeOnOverlayClick ? onRequestClose : undefined}
          />
        </If>

        <DrawerSurfaceComponent
          open={open}
          anchor={anchor}
          temporary
          sizeCss={sizeCss}
          miniSizeCss={miniSizeCss}
          miniCollapsed={false}
          dragOffset={dragOffset}
          duration={duration}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          className={contentClassName}
          style={contentStyle}
          contentRef={contentRef}
          onPointerDown={surfacePointerHandlers?.onPointerDown}
          onPointerMove={surfacePointerHandlers?.onPointerMove}
          onPointerUp={surfacePointerHandlers?.onPointerUp}
          onPointerCancel={surfacePointerHandlers?.onPointerCancel}
        >
          {children}
        </DrawerSurfaceComponent>
      </Root>
    );

    return mountNode ? createPortal(content, mountNode) : content;
  }

  if (!present) {
    return null;
  }

  return (
    <Root
      ref={persistentRootRef}
      $zIndex={zIndex}
      $variant="persistent"
      $anchor={anchor}
      $open={renderedOpen}
      $size={sizeCss}
      $miniSize={miniSizeCss}
      $miniActive={miniActive}
      $duration={duration}
      className={className}
      style={style}
    >
      <DrawerSurfaceComponent
        contentRef={persistentSurfaceRef}
        open={renderedOpen}
        anchor={anchor}
        temporary={false}
        sizeCss={sizeCss}
        miniSizeCss={miniSizeCss}
        miniCollapsed={Boolean(miniActive && !renderedOpen)}
        dragOffset={dragOffset}
        duration={duration}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        className={contentClassName}
        style={contentStyle}
        onPointerDown={surfacePointerHandlers?.onPointerDown}
        onPointerMove={surfacePointerHandlers?.onPointerMove}
        onPointerUp={surfacePointerHandlers?.onPointerUp}
        onPointerCancel={surfacePointerHandlers?.onPointerCancel}
      >
        {children}
      </DrawerSurfaceComponent>
    </Root>
  );
}
