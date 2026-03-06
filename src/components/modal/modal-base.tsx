import { Background, shadowXl, Surface } from "@foundations";
import { useKeyDown } from "hooks";
import React, {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

const ESC_KEYS = ["Escape", "Esc"] as const;

const fadeIn = keyframes`
  from { opacity: .4; }
  to { opacity: 1; }
`;

const grow = keyframes`
  from { transform: scale(.96); opacity: .96; }
  to { transform: scale(1); opacity: 1; }
`;

const OverlayFrame = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20000;
  background-color: ${Background.Overlay};
  display: grid;
  place-items: center;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ModalFrame = styled.div<{ widthValue: string }>`
  background-color: ${Surface.Default.Default};
  width: min(calc(100vw - 32px), ${({ widthValue }) => widthValue});
  max-height: calc(100vh - 32px);
  overflow: hidden;
  border-radius: 8px;
  ${shadowXl};
  animation: ${grow} 0.12s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MODAL_SIZE = {
  small: "456px",
  critical: "518px",
  default: "616px",
  large: "776px",
  xLarge: "936px",
} as const;

export type ModalSize = keyof typeof MODAL_SIZE;

export interface ModalBaseProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  children: ReactNode;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  modalSize?: ModalSize;
  onOverlayClick?: () => void;
  onClose: () => void;
  "aria-labelledby"?: string;
  "aria-label"?: string;

  /** Optional focus target when opening */
  initialFocusRef?: React.RefObject<HTMLElement>;

  /** Portal support */
  usePortal?: boolean;
  portalContainer?: Element | null; // defaults to document.body
}

export function ModalBase({
  open,
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  modalSize = "default",
  onOverlayClick,
  onClose,
  className,
  initialFocusRef,
  usePortal = true,
  portalContainer,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  ...rest
}: ModalBaseProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef<string>("");

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
      previousOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    const raf = requestAnimationFrame(() => {
      initialFocusRef?.current?.focus?.();
      if (!initialFocusRef?.current) {
        panelRef.current?.focus?.();
      }
    });

    return () => {
      cancelAnimationFrame(raf);

      if (typeof document !== "undefined") {
        document.body.style.overflow = previousOverflowRef.current || "";
      }

      previousActiveElementRef.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  if (!open) {
    return null;
  }

  const computedAriaLabel = ariaLabelledby || ariaLabel ? ariaLabel : "Dialog";

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onOverlayClick?.();

    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const content = (
    <OverlayFrame onClick={handleOverlayClick} data-testid="modal-overlay">
      <ModalFrame
        {...rest}
        ref={panelRef}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-label={computedAriaLabel}
        widthValue={MODAL_SIZE[modalSize]}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalFrame>
    </OverlayFrame>
  );

  // Portal mounting (safe for SSR)
  if (!usePortal) {
    return content;
  }

  const mount =
    portalContainer ?? (typeof document !== "undefined" ? document.body : null);

  // If we can't resolve a mount node (SSR), just render inline
  return mount ? createPortal(content, mount) : content;
}
