import { Padding, Surface } from "@foundations";
import { FC, isDefined } from "@helpers";
import { Caption } from "components/typography";
import {
  CSSProperties,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useId,
  useState,
} from "react";
import styled, { css, keyframes } from "styled-components";

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

function getContainerPosition(position: Position) {
  switch (position) {
    case "top":
      return css`
        left: 50%;
        bottom: calc(100% + ${GAP}px);
        transform: translateX(-50%);
      `;
    case "top-left":
      return css`
        left: 0;
        bottom: calc(100% + ${GAP}px);
      `;
    case "top-right":
      return css`
        right: 0;
        bottom: calc(100% + ${GAP}px);
      `;
    case "bottom":
      return css`
        left: 50%;
        top: calc(100% + ${GAP}px);
        transform: translateX(-50%);
      `;
    case "bottom-left":
      return css`
        left: 0;
        top: calc(100% + ${GAP}px);
      `;
    case "bottom-right":
      return css`
        right: 0;
        top: calc(100% + ${GAP}px);
      `;
    case "left":
      return css`
        right: calc(100% + ${GAP}px);
        top: 50%;
        transform: translateY(-50%);
      `;
    case "right":
      return css`
        left: calc(100% + ${GAP}px);
        top: 50%;
        transform: translateY(-50%);
      `;
  }
}

function getArrowPosition(position: Position) {
  switch (position) {
    case "top":
      return css`
        &::after {
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          border-color: ${Surface.Default.Inverse} transparent transparent
            transparent;
        }
      `;
    case "top-left":
      return css`
        &::after {
          left: ${ARROW_OFFSET}px;
          top: 100%;
          border-color: ${Surface.Default.Inverse} transparent transparent
            transparent;
        }
      `;
    case "top-right":
      return css`
        &::after {
          right: ${ARROW_OFFSET}px;
          top: 100%;
          border-color: ${Surface.Default.Inverse} transparent transparent
            transparent;
        }
      `;
    case "bottom":
      return css`
        &::after {
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
          border-color: transparent transparent ${Surface.Default.Inverse}
            transparent;
        }
      `;
    case "bottom-left":
      return css`
        &::after {
          left: ${ARROW_OFFSET}px;
          bottom: 100%;
          border-color: transparent transparent ${Surface.Default.Inverse}
            transparent;
        }
      `;
    case "bottom-right":
      return css`
        &::after {
          right: ${ARROW_OFFSET}px;
          bottom: 100%;
          border-color: transparent transparent ${Surface.Default.Inverse}
            transparent;
        }
      `;
    case "left":
      return css`
        &::after {
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-color: transparent transparent transparent
            ${Surface.Default.Inverse};
        }
      `;
    case "right":
      return css`
        &::after {
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-color: transparent ${Surface.Default.Inverse} transparent
            transparent;
        }
      `;
  }
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TooltipContainer = styled.div<{
  $position: Position;
  $width?: number;
}>`
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  width: ${({ $width }) => (isDefined($width) ? `${$width}px` : "max-content")};
  max-width: min(320px, calc(100vw - 16px));
  ${({ $position }) => getContainerPosition($position)}
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

  ${({ $position }) => getArrowPosition($position)}
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
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const id = `tooltip-${useId()}`;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

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

      {isOpen && (
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
      )}
    </TooltipWrapper>
  );
};
