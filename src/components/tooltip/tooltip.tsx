import { Caption } from "components/typography";
import { Surface } from "foundation/colors";
import { Padding } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { If } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import { useControllableState } from "hooks/useControllableState";
import { CSSProperties, FocusEvent, MouseEvent, ReactNode, useId } from "react";
import styled, { css, keyframes, RuleSet } from "styled-components";

type Position =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right";

const GAP = 5;
const ARROW_OFFSET = 12;

export const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CONTAINER_POSITION_MAP: Record<Position, RuleSet<object>> = {
  top: css`
    left: 50%;
    bottom: calc(100% + ${GAP}px);
    transform: translateX(-50%);
  `,
  "top-left": css`
    left: 0;
    bottom: calc(100% + ${GAP}px);
  `,
  "top-right": css`
    right: 0;
    bottom: calc(100% + ${GAP}px);
  `,
  bottom: css`
    left: 50%;
    top: calc(100% + ${GAP}px);
    transform: translateX(-50%);
  `,
  "bottom-left": css`
    left: 0;
    top: calc(100% + ${GAP}px);
  `,
  "bottom-right": css`
    right: 0;
    top: calc(100% + ${GAP}px);
  `,
  left: css`
    right: calc(100% + ${GAP}px);
    top: 50%;
    transform: translateY(-50%);
  `,
  right: css`
    left: calc(100% + ${GAP}px);
    top: 50%;
    transform: translateY(-50%);
  `,
};

const ARROW_POSITION_MAP: Record<Position, RuleSet<object>> = {
  top: css`
    &::after {
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      border-color: ${Surface.Default.Inverse} transparent transparent
        transparent;
    }
  `,
  "top-left": css`
    &::after {
      left: ${ARROW_OFFSET}px;
      top: 100%;
      border-color: ${Surface.Default.Inverse} transparent transparent
        transparent;
    }
  `,
  "top-right": css`
    &::after {
      right: ${ARROW_OFFSET}px;
      top: 100%;
      border-color: ${Surface.Default.Inverse} transparent transparent
        transparent;
    }
  `,
  bottom: css`
    &::after {
      left: 50%;
      bottom: 100%;
      transform: translateX(-50%);
      border-color: transparent transparent ${Surface.Default.Inverse}
        transparent;
    }
  `,
  "bottom-left": css`
    &::after {
      left: ${ARROW_OFFSET}px;
      bottom: 100%;
      border-color: transparent transparent ${Surface.Default.Inverse}
        transparent;
    }
  `,
  "bottom-right": css`
    &::after {
      right: ${ARROW_OFFSET}px;
      bottom: 100%;
      border-color: transparent transparent ${Surface.Default.Inverse}
        transparent;
    }
  `,
  left: css`
    &::after {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-color: transparent transparent transparent
        ${Surface.Default.Inverse};
    }
  `,
  right: css`
    &::after {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-color: transparent ${Surface.Default.Inverse} transparent
        transparent;
    }
  `,
};

export const TooltipContainer = styled.div<{
  $position: Position;
  $width?: number;
}>`
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  width: ${({ $width }) => (isDefined($width) ? `${$width}px` : "max-content")};
  max-width: min(320px, calc(100vw - 16px));
  ${({ $position }) => CONTAINER_POSITION_MAP[$position]}
`;

export const TooltipBox = styled(Caption)<{ $position: Position }>`
  position: relative;
  display: block;
  background-color: ${Surface.Default.Inverse};
  color: ${Surface.Default.Default};
  text-align: center;
  border-radius: 6px;
  padding: ${Padding.xxs} ${Padding.xs};
  white-space: normal;
  animation: ${fadeIn} 0.1s linear;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
  }

  ${({ $position }) => ARROW_POSITION_MAP[$position]}
`;

export type TooltipProps = {
  position?: Position;
  content: ReactNode;
  children: ReactNode;
  width?: number;
  className?: string;
  style?: CSSProperties;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Tooltip: FC<TooltipProps> = ({
  position = "top",
  content,
  width,
  children,
  style,
  className,
  open,
  defaultOpen = false,
  onOpenChange,
}) => {
  const id = `tooltip-${useId()}`;

  const [isOpen, setOpen] = useControllableState<boolean, false>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      hide();
    }
  };

  const handleMouseLeave = (event: MouseEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      hide();
    }
  };

  return (
    <TooltipWrapper
      aria-describedby={isOpen ? id : undefined}
      onMouseEnter={show}
      onMouseLeave={handleMouseLeave}
      onFocus={show}
      onBlur={handleBlur}
    >
      {children}

      <If is={isOpen}>
        <TooltipContainer $position={position} $width={width}>
          <TooltipBox
            id={id}
            role="tooltip"
            style={style}
            className={className}
            $position={position}
          >
            {content}
          </TooltipBox>
        </TooltipContainer>
      </If>
    </TooltipWrapper>
  );
};
