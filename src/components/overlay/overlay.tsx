import { Background } from "foundation/colors";
import { useLockBodyScroll } from "hooks/useLockBodyScroll";
import React from "react";
import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: .4; }
  to { opacity: 1; }
`;

type OverlayScroll = "body" | "content" | "none";

type OverlayProps = {
  open: boolean;
  children?: React.ReactNode;
  onOverlayClick?: () => void;
  lockBodyScroll?: boolean;
  zIndex?: number;
  transparent?: boolean;
  padded?: boolean;
  scroll?: "body" | "content" | "none";
  fullScreen?: boolean;
  animated?: boolean;
};

const OverlayFrame = styled.div<{
  $zIndex: number;
  $transparent: boolean;
  $padded: boolean;
  $scroll: OverlayScroll;
  $fullScreen: boolean;
  $animated: boolean;
}>`
  position: fixed;
  inset: 0;
  z-index: ${({ $zIndex }) => $zIndex};
  background-color: ${({ $transparent }) =>
    $transparent ? "transparent" : Background.Overlay};
  display: grid;

  ${({ $animated }) =>
    $animated &&
    css`
      animation: ${fadeIn} 0.2s ease-out;
    `}

  ${({ $fullScreen, $padded }) =>
    $fullScreen
      ? css`
          padding: 0;
        `
      : css`
          padding: ${$padded ? "16px" : "0"};
        `}

  ${({ $scroll, $fullScreen }) =>
    $scroll === "body"
      ? css`
          place-items: ${$fullScreen ? "stretch" : "start center"};
          overflow-y: auto;
          overflow-x: hidden;
        `
      : $scroll === "content"
        ? css`
            place-items: center;
            overflow: hidden;
          `
        : css`
            place-items: center;
            overflow: hidden;
          `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export function Overlay({
  open,
  children,
  onOverlayClick,
  lockBodyScroll = false,
  zIndex = 999,
  transparent = false,
  padded = true,
  scroll = "none",
  fullScreen = false,
  animated = true,
}: OverlayProps) {
  useLockBodyScroll(open && lockBodyScroll);

  if (!open) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    onOverlayClick?.();
  };

  return (
    <OverlayFrame
      $zIndex={zIndex}
      $transparent={transparent}
      $padded={padded}
      $scroll={scroll}
      $fullScreen={fullScreen}
      $animated={animated}
      onClick={handleClick}
    >
      {children}
    </OverlayFrame>
  );
}
