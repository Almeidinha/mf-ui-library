import { Overlay } from "components/overlay";
import { Surface } from "foundation/colors";
import { shadowXl } from "foundation/shadows";
import { useKeyDown } from "hooks";
import React, {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";

const ESC_KEYS = ["Escape", "Esc"] as const;

const grow = keyframes`
  from { transform: scale(.96); opacity: .96; }
  to { transform: scale(1); opacity: 1; }
`;

export const MODAL_MAX_WIDTH = {
  xs: "456px",
  sm: "518px",
  md: "616px",
  lg: "776px",
  xl: "936px",
} as const;

export type ModalMaxWidthPreset = keyof typeof MODAL_MAX_WIDTH;
export type ModalMaxWidth = ModalMaxWidthPreset | false | (string & {});

export type ModalScroll = "paper" | "body";

const ModalFrame = styled.div<{
  $resolvedMaxWidth: string;
  $fullWidth: boolean;
  $fullScreen: boolean;
  $scroll: ModalScroll;
}>`
  background-color: ${Surface.Default.Default};
  box-sizing: border-box;
  ${shadowXl};
  animation: ${grow} 0.12s ease-out;

  ${({ $fullScreen, $resolvedMaxWidth, $fullWidth, $scroll }) =>
    $fullScreen
      ? css`
          width: 100vw;
          height: 100vh;
          max-width: 100vw;
          max-height: 100vh;
          border-radius: 0;
        `
      : css`
          width: ${$fullWidth
            ? "min(calc(100vw - 32px), 100%)"
            : `min(calc(100vw - 32px), ${$resolvedMaxWidth})`};
          max-width: ${$resolvedMaxWidth};
          max-height: ${$scroll === "body" ? "none" : `calc(100vh - 32px)`};
          border-radius: 8px;
        `}

  ${({ $fullScreen, $scroll }) =>
    $fullScreen || $scroll === "paper"
      ? css`
          overflow: hidden;
          display: flex;
          flex-direction: column;
        `
      : css`
          overflow: visible;
          display: block;
        `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export interface ModalBaseProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children: ReactNode;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  onOverlayClick?: () => void;
  onClose: () => void;
  "aria-labelledby"?: string;
  "aria-label"?: string;

  /** Optional focus target when opening */
  initialFocusRef?: React.RefObject<HTMLElement>;

  /** Portal support */
  usePortal?: boolean;
  portalContainer?: Element | null;

  /** Makes the modal take the available width up to maxWidth */
  fullWidth?: boolean;

  /** Makes the modal take the full viewport */
  fullScreen?: boolean;

  /**
   * Controls the modal max width.
   * Can be a preset token, false to disable the max-width constraint,
   * or any CSS width value.
   */
  maxWidth?: ModalMaxWidth;

  /**
   * paper: modal content scrolls inside the paper
   * body: overlay area scrolls instead
   */
  scroll?: ModalScroll;
}

function resolveMaxWidth(maxWidth: ModalMaxWidth | undefined) {
  if (maxWidth === false) {
    return "calc(100vw - 32px)";
  }

  if (typeof maxWidth === "string" && maxWidth in MODAL_MAX_WIDTH) {
    return MODAL_MAX_WIDTH[maxWidth as keyof typeof MODAL_MAX_WIDTH];
  }

  if (typeof maxWidth === "string") {
    return maxWidth;
  }

  return MODAL_MAX_WIDTH.md;
}

export function ModalBase({
  open,
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  onOverlayClick,
  onClose,
  className,
  initialFocusRef,
  usePortal = true,
  portalContainer,
  fullWidth = false,
  fullScreen = false,
  maxWidth = "md",
  scroll = "paper",
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  ...rest
}: ModalBaseProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const resolvedMaxWidth = useMemo(() => resolveMaxWidth(maxWidth), [maxWidth]);

  useKeyDown(
    ESC_KEYS,
    (e) => {
      e.preventDefault?.();
      e.stopPropagation?.();
      onClose();
    },
    { enabled: open && closeOnEsc },
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    if (typeof document !== "undefined") {
      previousActiveElementRef.current =
        document.activeElement as HTMLElement | null;
    }

    const raf = requestAnimationFrame(() => {
      initialFocusRef?.current?.focus?.();

      if (!initialFocusRef?.current) {
        panelRef.current?.focus?.();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      previousActiveElementRef.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  if (!open) {
    return null;
  }

  const computedAriaLabel = ariaLabelledby || ariaLabel ? ariaLabel : "Dialog";

  const handleOverlayClick = () => {
    onOverlayClick?.();

    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const content = (
    <Overlay
      open={open}
      lockBodyScroll
      zIndex={20000}
      onOverlayClick={handleOverlayClick}
      transparent={false}
      padded={!fullScreen}
      scroll={scroll === "body" ? "body" : "content"}
      fullScreen={fullScreen}
    >
      <ModalFrame
        {...rest}
        ref={panelRef}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-label={computedAriaLabel}
        data-scroll={scroll}
        data-fullscreen={fullScreen ? "true" : "false"}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        $resolvedMaxWidth={resolvedMaxWidth}
        $fullWidth={fullWidth}
        $fullScreen={fullScreen}
        $scroll={scroll}
      >
        {children}
      </ModalFrame>
    </Overlay>
  );

  if (!usePortal) {
    return content;
  }

  const mount =
    portalContainer ?? (typeof document !== "undefined" ? document.body : null);

  return mount ? createPortal(content, mount) : content;
}
