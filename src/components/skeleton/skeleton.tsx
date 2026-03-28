import { Surface } from "foundation/colors";
import { toCssSize } from "helpers/css-helpers";
import React from "react";
import styled, { css, keyframes } from "styled-components";

type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
type SkeletonAnimation = "pulse" | "wave" | false;

export type SkeletonProps = {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const BORDER_RADIUS: Record<SkeletonVariant, string> = {
  text: "4px",
  circular: "50%",
  rectangular: "4px",
  rounded: "8px",
};

const SkeletonRoot = styled.span<{
  $variant: SkeletonVariant;
  $animation: SkeletonAnimation;
  $width?: number | string;
  $height?: number | string;
}>`
  position: relative;
  display: block;
  overflow: hidden;
  background-color: ${Surface.Neutral.Default};
  width: ${({ $width, $variant }) =>
    toCssSize($width) || ($variant === "text" ? "100%" : undefined)};
  height: ${({ $height, $variant }) =>
    toCssSize($height) || ($variant === "text" ? "1em" : undefined)};
  border-radius: ${({ $variant }) => BORDER_RADIUS[$variant]};

  ${({ $variant, $height }) =>
    $variant === "text" &&
    css`
      transform: scale(1, 0.6);
      transform-origin: 0 60%;
      margin-top: 0;
      margin-bottom: 0;
      height: ${toCssSize($height) || "1em"};
    `}

  ${({ $animation }) =>
    $animation === "pulse" &&
    css`
      animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
    `}

  ${({ $animation }) =>
    $animation === "wave" &&
    css`
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          ${Surface.Default.Hover},
          transparent
        );
        animation: ${wave} 1.6s linear 0.5s infinite;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      animation: none;
    }
  }
`;

export const Skeleton = ({
  variant = "text",
  animation = "wave",
  width = "100%",
  height = variant === "text" ? "1em" : undefined,
  className,
  style,
}: SkeletonProps) => {
  return (
    <SkeletonRoot
      aria-hidden="true"
      $variant={variant}
      $animation={animation}
      $width={width}
      $height={height}
      className={className}
      style={style}
    />
  );
};
