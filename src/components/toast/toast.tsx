import { IconMinor } from "components/icon";
import { Borders, Focused, Surface, Text } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap, Margin, Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { FC } from "helpers/generic-types";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import { AnimationEvent, ReactNode, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";

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
  onActionClick?: () => void;
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
};

const TOAST_BACKGROUND: Record<ToastVariant, string> = {
  info: Surface.Highlight.Subdued,
  success: Surface.Success.Subdued,
  warning: Surface.Warning.Subdued,
  error: Surface.Critical.Subdued,
  default: Surface.Neutral.Subdued,
};

const TOAST_BORDER_COLOR: Record<ToastVariant, string> = {
  info: Borders.Highlight.Subdued,
  success: Borders.Success.Subdued,
  warning: Borders.Warning.Subdued,
  error: Borders.Critical.Subdued,
  default: Borders.Default.Subdued,
};

function resolveToastBackground(variant: ToastVariant) {
  switch (variant) {
    case "info":
      return TOAST_BACKGROUND.info;
    case "success":
      return TOAST_BACKGROUND.success;
    case "warning":
      return TOAST_BACKGROUND.warning;
    case "error":
      return TOAST_BACKGROUND.error;
    case "default":
    default:
      return TOAST_BACKGROUND.default;
  }
}

function resolveToastBorderColor(variant: ToastVariant) {
  switch (variant) {
    case "info":
      return TOAST_BORDER_COLOR.info;
    case "success":
      return TOAST_BORDER_COLOR.success;
    case "warning":
      return TOAST_BORDER_COLOR.warning;
    case "error":
      return TOAST_BORDER_COLOR.error;
    case "default":
    default:
      return TOAST_BORDER_COLOR.default;
  }
}

const VIEWPORT_POSITION_STYLES: Record<
  ToastPosition,
  ReturnType<typeof css>
> = {
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

function resolveViewportPositionStyles(position: ToastPosition) {
  switch (position) {
    case "top":
      return VIEWPORT_POSITION_STYLES.top;
    case "bottom":
      return VIEWPORT_POSITION_STYLES.bottom;
    case "top-left":
      return VIEWPORT_POSITION_STYLES["top-left"];
    case "top-right":
      return VIEWPORT_POSITION_STYLES["top-right"];
    case "bottom-left":
      return VIEWPORT_POSITION_STYLES["bottom-left"];
    case "bottom-right":
    default:
      return VIEWPORT_POSITION_STYLES["bottom-right"];
  }
}

const ENTER_ANIMATION_STYLES: Record<ToastPosition, ReturnType<typeof css>> = {
  top: css`
    animation: slideInFromTop 180ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  bottom: css`
    animation: slideInFromBottom 180ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  "top-left": css`
    animation: slideInFromTop 180ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  "top-right": css`
    animation: slideInFromTop 180ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  "bottom-left": css`
    animation: slideInFromBottom 180ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  "bottom-right": css`
    animation: slideInFromBottom 180ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
};

function resolveEnterAnimationStyles(position: ToastPosition) {
  switch (position) {
    case "top":
      return ENTER_ANIMATION_STYLES.top;
    case "bottom":
      return ENTER_ANIMATION_STYLES.bottom;
    case "top-left":
      return ENTER_ANIMATION_STYLES["top-left"];
    case "top-right":
      return ENTER_ANIMATION_STYLES["top-right"];
    case "bottom-left":
      return ENTER_ANIMATION_STYLES["bottom-left"];
    case "bottom-right":
    default:
      return ENTER_ANIMATION_STYLES["bottom-right"];
  }
}

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
    resolveViewportPositionStyles($position)};

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
    resolveToastBackground($variant)};
  border: 1px solid
    ${({ $variant }: { $variant: ToastVariant }) =>
      resolveToastBorderColor($variant)};
  pointer-events: auto;

  &:focus-visible {
    outline: 2px solid ${Focused.Default};
    outline-offset: -2px;
  }

  &[data-state="open"] {
    ${({ $position }: { $position: ToastPosition }) =>
      resolveEnterAnimationStyles($position)};
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

const ToastTitle = styled.h3`
  margin: ${Margin.none};
  ${Typography.Label};
  color: ${Text.Subdued};
`;

const ToastDescription = styled.p`
  margin: ${Margin.none};
  color: ${Text.Subdued};
  ${Typography.BodyLarge};
`;

const ToastClose = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  flex-shrink: 0;
  margin-top: 2px;

  &:focus-visible {
    outline: 2px solid ${Focused.Default};
    outline-offset: 2px;
  }
`;

const CloseIcon = styled(IconMinor.Xmark)`
  color: ${Text.Subdued};

  svg path {
    fill: ${Text.Subdued};
  }
`;

const ActionButton = styled.button`
  all: unset;
  ${Typography.Label};
  color: ${Text.Subdued};
  cursor: pointer;
  flex-shrink: 0;
  margin-left: ${Margin.s};

  &:focus-visible {
    outline: 2px solid ${Focused.Default};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

type ToastItemProps = ToastSharedProps & {
  open: boolean;
  position: ToastPosition;
  onOpenChange: (open: boolean) => void;
  onRemove?: () => void;
  createdAt?: number;
};

export const ToastItem: FC<ToastItemProps> = ({
  open,
  onOpenChange,
  position,
  variant = "default",
  title,
  description,
  onActionClick,
  actionText,
  actionAltText,
  onRemove,
}) => {
  const liveRegionProps = useMemo(() => getLiveRegionProps(variant), [variant]);

  return (
    <ToastRoot
      $variant={variant}
      $position={position}
      data-state={open ? "open" : "closed"}
      tabIndex={0}
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

      <ToastClose
        type="button"
        aria-label="Close notification"
        onClick={() => onOpenChange(false)}
      >
        <CloseIcon aria-hidden />
      </ToastClose>
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
  description,
  actionText,
  actionAltText,
  onActionClick,
}) => {
  useEffect(() => {
    if (!open || !duration) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onOpenChange(false);
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [open, duration, onOpenChange]);

  return (
    <StandaloneViewport position={position} label={label}>
      <ToastItem
        open={open}
        onOpenChange={onOpenChange}
        position={position}
        variant={variant}
        title={title}
        description={description}
        actionText={actionText}
        actionAltText={actionAltText}
        onActionClick={onActionClick}
      />
    </StandaloneViewport>
  );
};

export const Toast = StandaloneToast;
