import { Borders, Surface } from "foundation/colors/color-guidelines";
import React, { forwardRef } from "react";
import styled from "styled-components";

import { LayoutPrimitiveProps, mergeSx, SystemRoot } from "./system";

type PaperVariant = "elevation" | "outlined";

const PAPER_SHADOWS = [
  "none",
  "0px 1px 2px rgba(0, 0, 0, 0.05)",
  "0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.04)",
  "0px 2px 10px rgba(0, 0, 0, 0.1)",
  "0px 4px 12px rgba(0, 0, 0, 0.12)",
  "0px 6px 16px rgba(0, 0, 0, 0.14)",
  "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "0px 12px 20px rgba(0, 0, 0, 0.14)",
  "0px 14px 24px rgba(0, 0, 0, 0.16)",
  "0px 16px 28px rgba(0, 0, 0, 0.18)",
  "0px 18px 30px rgba(0, 0, 0, 0.18)",
  "0px 20px 32px rgba(0, 0, 0, 0.2)",
  "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "0px 22px 36px rgba(0, 0, 0, 0.2)",
  "0px 24px 40px rgba(0, 0, 0, 0.2)",
  "0px 26px 42px rgba(0, 0, 0, 0.22)",
  "0px 28px 44px rgba(0, 0, 0, 0.22)",
  "0px 30px 46px rgba(0, 0, 0, 0.24)",
  "0px 32px 48px rgba(0, 0, 0, 0.24)",
  "0px 34px 50px rgba(0, 0, 0, 0.24)",
  "0px 36px 52px rgba(0, 0, 0, 0.24)",
  "0px 38px 54px rgba(0, 0, 0, 0.24)",
  "0px 40px 56px rgba(0, 0, 0, 0.25)",
  "0px 42px 58px rgba(0, 0, 0, 0.25)",
  "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
] as const;

function getPaperShadow(level: number) {
  const clampedLevel = Math.max(
    0,
    Math.min(Math.round(level), PAPER_SHADOWS.length - 1),
  );
  return PAPER_SHADOWS[clampedLevel];
}

const PaperRoot = styled(SystemRoot).withConfig({
  shouldForwardProp: (prop) =>
    !["$elevation", "$square", "$variant"].includes(prop),
})<{
  $elevation: number;
  $square: boolean;
  $variant: PaperVariant;
}>`
  background-color: ${Surface.Default.Default};
  background-image: none;
  color: inherit;
  transition:
    box-shadow 180ms ease,
    border-color 180ms ease;
  border-radius: ${({ $square }) => ($square ? "0" : "6px")};
  box-shadow: ${({ $variant, $elevation }) =>
    $variant === "outlined" ? "none" : getPaperShadow($elevation)};
  border-width: ${({ $variant }) => ($variant === "outlined" ? "1px" : "0")};
  border-style: solid;
  border-color: ${({ $variant }) =>
    $variant === "outlined" ? Borders.Default.Default : "transparent"};
`;

export type PaperProps = React.HTMLAttributes<HTMLElement> &
  LayoutPrimitiveProps & {
    elevation?: number;
    square?: boolean;
    variant?: PaperVariant;
  };

export const Paper = forwardRef<HTMLElement, PaperProps>(function Paper(
  {
    component = "div",
    elevation = 1,
    square = false,
    sx,
    variant = "elevation",
    ...htmlProps
  },
  ref,
) {
  const mergedSx = mergeSx({ overflow: "hidden" }, sx);

  return (
    <PaperRoot
      as={component}
      ref={ref}
      $elevation={elevation}
      $square={square}
      $variant={variant}
      $sx={mergedSx}
      {...htmlProps}
    />
  );
});
