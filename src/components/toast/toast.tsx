import { IconMinor } from "components/icon";
import { Button } from "components/molecules";
import { Body, Heading3 } from "components/typography";
import { Borders, Focused, Surface, Text } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap, Margin, Padding } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import {
  AnimationEvent,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { css, RuleSet } from "styled-components";

type ToastViewportLayerProps = {
  children: ReactNode;
  disablePortal?: boolean;
  container?: Element | DocumentFragment | null;
};

export type ToastPosition =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ToastVariant = "info" | "default" | "success" | "warning" | "error";

export type ToastSharedProps = {
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  actionText?: string;
  actionAltText?: string;
  closeable?: boolean;
  onActionClick?: () => void;
};

type ToastItemProps = ToastSharedProps & {
  open: boolean;
  position: ToastPosition;
  onOpenChange: (open: boolean) => void;
  onRemove?: () => void;
  createdAt?: number;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  onFocusCapture?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlurCapture?: (event: FocusEvent<HTMLDivElement>) => void;
};

export type ToastItemData = ToastSharedProps & {
  id: string;
  open: boolean;
  key?: string;
  createdAt: number;
};

export type StandaloneToastProps = ToastSharedProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: ToastPosition;
  label?: string;
  disablePortal?: boolean;
  portalContainer?: Element | DocumentFragment | null;
};

const BACKGROUND_MAP: Record<ToastVariant, string> = {
  info: Surface.Highlight.Subdued,
  success: Surface.Success.Subdued,
  warning: Surface.Warning.Subdued,
  error: Surface.Critical.Subdued,
  default: Surface.Neutral.Subdued,
};

const BORDER_COLOR_MAP: Record<ToastVariant, string> = {
  info: Borders.Highlight.Subdued,
  success: Borders.Success.Subdued,
  warning: Borders.Warning.Subdued,
  error: Borders.Critical.Subdued,
  default: Borders.Default.Subdued,
};

const VIEW_PORT_POSITION_MAP: Record<ToastPosition, RuleSet<object>> = {
  top: css`
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  bottom: css`
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  "top-left": css`
    top: 0;
    left: 0;
    align-items: flex-start;
  `,
  "top-right": css`
    top: 0;
    right: 0;
    align-items: flex-end;
  `,
  "bottom-left": css`
    bottom: 0;
    left: 0;
    align-items: flex-start;
  `,
  "bottom-right": css`
    bottom: 0;
    right: 0;
    align-items: flex-end;
  `,
};

const topAnimation = css`
  animation: slideInFromTop 180ms cubic-bezier(0.16, 1, 0.3, 1);
`;
const bottomAnimation = css`
  animation: slideInFromBottom 180ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const ENTER_ANIMATION_MAP: Record<ToastPosition, RuleSet<object>> = {
  top: topAnimation,
  "top-left": topAnimation,
  "top-right": topAnimation,
  bottom: bottomAnimation,
  "bottom-right": bottomAnimation,
  "bottom-left": bottomAnimation,
};

function getLiveRegionProps(variant: ToastVariant) {
  if (variant === "error") {
    return {
      role: "alert" as const,
      "aria-live": "assertive" as const,
      "aria-atomic": "true" as const,
    };
  }

  return {
    role: "status" as const,
    "aria-live": "polite" as const,
    "aria-atomic": "true" as const,
  };
}

export const ToastViewport = styled.div<{ $position: ToastPosition }>`
  --viewport-padding: ${Padding.l};

  position: fixed;
  display: flex;
  flex-direction: column;
  gap: ${Gap.l};
  width: min(420px, calc(100vw - (var(--viewport-padding) * 2)));
  max-width: 100vw;
  padding: var(--viewport-padding);
  margin: ${Margin.none};
  z-index: 44000;
  pointer-events: none;

  ${({ $position }: { $position: ToastPosition }) =>
    VIEW_PORT_POSITION_MAP[$position]};

  @media (max-width: 640px) {
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
    transform: none;
    width: 100%;
    align-items: stretch;
  }
`;

const ToastRoot = styled.div<{
  $variant: ToastVariant;
  $position: ToastPosition;
}>`
  box-shadow: ${shadowMd};
  border-radius: 6px;
  padding: ${Padding.s} ${Padding.m};
  display: flex;
  align-items: flex-start;
  gap: ${Gap.m};
  background-color: ${({ $variant }: { $variant: ToastVariant }) =>
    BACKGROUND_MAP[$variant]};
  border: 1px solid
    ${({ $variant }: { $variant: ToastVariant }) => BORDER_COLOR_MAP[$variant]};
  pointer-events: auto;

  &[data-state="open"] {
    ${({ $position }: { $position: ToastPosition }) =>
      ENTER_ANIMATION_MAP[$position]};
  }

  &[data-state="closed"] {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    animation: toastHide 140ms ease-in;
  }

  @keyframes toastHide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-16px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(16px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &[data-state="open"],
    &[data-state="closed"] {
      animation: none;
      transition: none;
    }
  }
`;

const Content = styled.div`
  min-width: 0;
  flex: 1;
`;

const ToastTitle = styled(Heading3)`
  margin: ${Margin.none};
`;

const ToastDescription = styled(Body)`
  margin: ${Margin.none};
`;

const ToastClose = styled(Button).attrs({
  type: "button",
  subtle: true,
  plain: true,
})`
  padding: ${Padding.none};
  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid ${Focused.Default};
    border-radius: 0;
  }
`;

const ActionButton = styled(Button).attrs({
  type: "button",
  subtle: true,
  plain: true,
})`
  padding: ${Padding.none};
  > div {
    color: ${Text.Subdued};
  }
  &:focus {
    border: none;
    outline: none;
    border-bottom: 2px solid ${Focused.Default};
    border-radius: 0;
  }
`;

export const ToastViewportLayer: FC<ToastViewportLayerProps> = ({
  children,
  disablePortal = false,
  container,
}) => {
  if (disablePortal) {
    return <>{children}</>;
  }

  if (typeof document === "undefined") {
    return null;
  }
  console.log("Creating portal for ToastViewportLayer, container:");

  return createPortal(children, container ?? document.body);
};

export const ToastItem: FC<ToastItemProps> = ({
  open,
  onOpenChange,
  position,
  variant = "default",
  title,
  closeable = true,
  description,
  onActionClick,
  actionText,
  actionAltText,
  onRemove,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
}) => {
  const liveRegionProps = useMemo(() => getLiveRegionProps(variant), [variant]);

  return (
    <ToastRoot
      $variant={variant}
      $position={position}
      data-state={open ? "open" : "closed"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
      onAnimationEnd={(event: AnimationEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) {
          return;
        }

        if (event.animationName === "toastHide") {
          onRemove?.();
        }
      }}
      {...liveRegionProps}
      aria-label={actionAltText}
    >
      <Content>
        <If is={isDefined(title)}>
          <ToastTitle>{title}</ToastTitle>
        </If>
        <ToastDescription>{description}</ToastDescription>
      </Content>

      <If is={isDefined(actionText) && isDefined(onActionClick)}>
        <ActionButton
          type="button"
          onClick={() => {
            onActionClick?.();
            onOpenChange(false);
          }}
          aria-label={actionAltText || actionText}
        >
          {actionText}
        </ActionButton>
      </If>

      <If is={closeable}>
        <ToastClose
          type="button"
          aria-label="Close notification"
          onClick={() => onOpenChange(false)}
          IconPrefix={IconMinor.Xmark}
        ></ToastClose>
      </If>
    </ToastRoot>
  );
};

type StandaloneViewportProps = {
  position: ToastPosition;
  label: string;
  children: ReactNode;
};

const StandaloneViewport: FC<StandaloneViewportProps> = ({
  position,
  label,
  children,
}) => {
  return (
    <ToastViewport $position={position} aria-label={label}>
      {children}
    </ToastViewport>
  );
};

export const StandaloneToast: FC<StandaloneToastProps> = ({
  open,
  onOpenChange,
  position = "top",
  label = "Notification",
  variant = "default",
  duration,
  title,
  closeable,
  description,
  actionText,
  actionAltText,
  onActionClick,
  disablePortal = false,
  portalContainer,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!open || !duration || isPaused) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onOpenChange(false);
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [open, duration, isPaused, onOpenChange]);

  return (
    <ToastViewportLayer
      disablePortal={disablePortal}
      container={portalContainer}
    >
      <StandaloneViewport position={position} label={label}>
        <ToastItem
          open={open}
          onOpenChange={onOpenChange}
          position={position}
          variant={variant}
          title={title}
          closeable={closeable}
          description={description}
          actionText={actionText}
          actionAltText={actionAltText}
          onActionClick={onActionClick}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            const nextFocused = event.relatedTarget as Node | null;

            if (event.currentTarget.contains(nextFocused)) {
              return;
            }

            setIsPaused(false);
          }}
        />
      </StandaloneViewport>
    </ToastViewportLayer>
  );
};

export const Toast = StandaloneToast;
