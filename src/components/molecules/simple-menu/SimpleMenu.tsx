import { Button } from "components/molecules/button";
import { CardFrame } from "components/shared-styled-components";
import { Gap, Margin, Padding } from "foundation/spacing";
import { useOnClickOutside, useRepositionOnScroll } from "hooks";
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";

const grow = keyframes`
  from { transform: scale(.6) }
  to { transform: scale(1) }
`;

type SimpleMenuPosition =
  | "bottom-end"
  | "bottom-start"
  | "top-end"
  | "top-start";

export type SimpleMenuProps = {
  children: ReactNode;
  className?: string;

  usePortal?: boolean;
  anchorRef?: RefObject<HTMLElement | null>;
  open?: boolean;
  onClose?: () => void;

  width?: number | string;
  offset?: number;
  position?: SimpleMenuPosition;
  zIndex?: number;
};

const SimpleMenuFrame = styled(CardFrame)<{
  $inline: boolean;
  $width: string;
  $zIndex: number;
  $position: SimpleMenuPosition;
}>`
  padding: ${Padding.xxs};
  display: flex;
  flex-direction: column;
  gap: ${Gap.xxxs};

  ${({ $inline, $position }) =>
    $inline
      ? css`
          position: absolute;
          ${$position.startsWith("bottom")
            ? css`
                top: calc(100% + 4px);
              `
            : css`
                bottom: calc(100% + 4px);
              `}

          ${$position.endsWith("end")
            ? css`
                right: 0;
                transform-origin: top right;
              `
            : css`
                left: 0;
                transform-origin: top left;
              `}
          visibility: visible;
        `
      : css`
          position: fixed;
          visibility: hidden;
        `}

  z-index: ${({ $zIndex }) => $zIndex};
  width: ${({ $width }) => $width};
  will-change: transform;
  animation: ${grow} 0.12s ease-out;

  ul {
    margin: ${Margin.none};
    padding: ${Padding.none};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

function toCssSize(value?: number | string, fallback = "240px") {
  if (typeof value === "number") {
    return `${value}px`;
  }

  if (typeof value === "string") {
    return value;
  }

  return fallback;
}

function parseWidth(value?: number | string, fallback = 240) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
}

function getMenuItems(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])',
    ),
  );
}

export function SimpleMenu({
  children,
  className,
  usePortal = false,
  anchorRef,
  open = true,
  onClose,
  width = 240,
  offset = 4,
  position = "bottom-end",
  zIndex = 2000,
}: SimpleMenuProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  const resolvedWidth = toCssSize(width);
  const numericWidth = useMemo(() => parseWidth(width), [width]);

  const updatePosition = useCallback(() => {
    if (
      !usePortal ||
      !open ||
      !anchorRef?.current ||
      !frameRef.current ||
      typeof window === "undefined"
    ) {
      return;
    }

    const frame = frameRef.current;
    const anchor = anchorRef.current;
    const rect = anchor.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const actualWidth = frame.offsetWidth || numericWidth;
    const estimatedHeight = frame.offsetHeight || 200;
    const gap = 8;

    const preferBottom = position.startsWith("bottom");
    const preferEnd = position.endsWith("end");

    const hasRoomBelow =
      rect.bottom + offset + estimatedHeight <= viewportHeight - gap;
    const hasRoomAbove = rect.top - offset - estimatedHeight >= gap;

    const verticalPosition = preferBottom
      ? hasRoomBelow || !hasRoomAbove
        ? "bottom"
        : "top"
      : hasRoomAbove || !hasRoomBelow
        ? "top"
        : "bottom";

    let left = preferEnd ? rect.right - actualWidth : rect.left;

    if (left + actualWidth > viewportWidth - gap) {
      left = viewportWidth - gap - actualWidth;
    }

    if (left < gap) {
      left = gap;
    }

    const top =
      verticalPosition === "bottom"
        ? rect.bottom + offset
        : rect.top - offset - estimatedHeight;

    frame.style.left = `${left}px`;
    frame.style.top = `${Math.max(gap, top)}px`;
    frame.style.visibility = "visible";
  }, [usePortal, open, anchorRef, position, numericWidth, offset]);

  useEffect(() => {
    if (!usePortal || !open) {
      return;
    }

    const raf = requestAnimationFrame(() => {
      updatePosition();

      const items = getMenuItems(frameRef.current);
      items[0]?.focus();
    });

    return () => cancelAnimationFrame(raf);
  }, [usePortal, open, updatePosition]);

  useRepositionOnScroll({
    enabled: usePortal && open,
    onReposition: updatePosition,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = getMenuItems(frameRef.current);

    if (items.length === 0) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        anchorRef?.current?.focus?.();
      }
      return;
    }

    const activeIndex = items.findIndex(
      (item) => item === document.activeElement,
    );

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        onClose?.();
        anchorRef?.current?.focus?.();
        break;

      case "ArrowDown": {
        event.preventDefault();
        const nextIndex =
          activeIndex === -1 ? 0 : (activeIndex + 1) % items.length;
        items[nextIndex]?.focus();
        break;
      }

      case "ArrowUp": {
        event.preventDefault();
        const nextIndex =
          activeIndex === -1
            ? items.length - 1
            : (activeIndex - 1 + items.length) % items.length;
        items[nextIndex]?.focus();
        break;
      }

      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;

      case "End":
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;

      case "Tab":
        onClose?.();
        break;

      default:
        break;
    }
  };

  const content = (
    <SimpleMenuFrame
      ref={frameRef}
      className={className}
      id={menuId}
      role="menu"
      tabIndex={-1}
      onKeyDownCapture={handleKeyDown}
      $inline={!usePortal}
      $width={resolvedWidth}
      $zIndex={zIndex}
      $position={position}
    >
      {children}
    </SimpleMenuFrame>
  );

  if (!usePortal) {
    return content;
  }

  if (typeof document === "undefined" || !open) {
    return null;
  }

  return createPortal(content, document.body);
}

export const SimpleMenuItem = styled(Button).attrs({
  type: "button",
  role: "menuitem",
  large: true,
})<{
  destructive?: boolean;
}>`
  padding: ${Padding.s};
  border: none;
  width: 100%;
  justify-content: flex-start;
  border-radius: 6px;
  box-sizing: border-box;
`;

type UseSimpleMenuStateOptions = {
  closeOnItemSelect?: boolean;
};

export function useSimpleMenuState(options?: UseSimpleMenuStateOptions) {
  const { closeOnItemSelect = false } = options ?? {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const onItemSelect = useCallback(() => {
    if (closeOnItemSelect) {
      setIsOpen(false);
    }
  }, [closeOnItemSelect]);

  const withItemAction = useCallback(
    <T extends (...args: unknown[]) => void>(callback?: T) =>
      (...args: Parameters<T>) => {
        callback?.(...args);
        if (closeOnItemSelect) {
          setIsOpen(false);
        }
      },
    [closeOnItemSelect],
  );

  const ref = useOnClickOutside(() => {
    setIsOpen((prev) => (prev ? false : prev));
  });

  return {
    isOpen,
    toggle,
    open,
    close,
    onItemSelect,
    withItemAction,
    clickOutsideRef: ref,
  };
}
