import { Breakpoint, breakpoints } from "foundation/breakpoints";
import React, { forwardRef } from "react";
import styled from "styled-components";

import { LayoutPrimitiveProps, mergeSx, SystemRoot } from "./system";

type ContainerFixedBreakpoint = Exclude<Breakpoint, "xs">;

type ContainerMaxWidth = Breakpoint | false;

const CONTAINER_WIDTHS: Record<Breakpoint, number> = {
  xs: 444,
  sm: breakpoints.values.sm,
  md: breakpoints.values.md,
  lg: breakpoints.values.lg,
  xl: breakpoints.values.xl,
};

function getBreakpointSequence(maxWidth: ContainerMaxWidth) {
  const keys = breakpoints.keys.filter(
    (key): key is ContainerFixedBreakpoint => key !== "xs",
  );

  if (maxWidth === false || maxWidth === "xs") {
    return keys;
  }

  const endIndex = keys.indexOf(maxWidth);
  return endIndex === -1 ? keys : keys.slice(0, endIndex + 1);
}

function getContainerWidthRules(maxWidth: ContainerMaxWidth, fixed: boolean) {
  if (maxWidth === false && !fixed) {
    return "";
  }

  if (fixed) {
    return getBreakpointSequence(maxWidth)
      .map(
        (breakpoint) =>
          `${breakpoints.up(breakpoint)} { max-width: ${CONTAINER_WIDTHS[breakpoint]}px; }`,
      )
      .join("\n");
  }

  const resolvedMaxWidth = maxWidth === false ? "xl" : maxWidth;

  return `${breakpoints.up(resolvedMaxWidth)} { max-width: ${CONTAINER_WIDTHS[resolvedMaxWidth]}px; }`;
}

const ContainerRoot = styled(SystemRoot).withConfig({
  shouldForwardProp: (prop) =>
    !["$disableGutters", "$fixed", "$maxWidth"].includes(prop),
})<{
  $disableGutters: boolean;
  $fixed: boolean;
  $maxWidth: ContainerMaxWidth;
}>`
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  ${({ $disableGutters }) =>
    $disableGutters
      ? "padding-left: 0; padding-right: 0;"
      : `
          padding-left: 16px;
          padding-right: 16px;

          ${breakpoints.up("sm")} {
            padding-left: 24px;
            padding-right: 24px;
          }
        `}

  ${({ $maxWidth, $fixed }) => getContainerWidthRules($maxWidth, $fixed)}
`;

export type ContainerProps = React.HTMLAttributes<HTMLElement> &
  LayoutPrimitiveProps & {
    disableGutters?: boolean;
    fixed?: boolean;
    maxWidth?: ContainerMaxWidth;
  };

export const Container = forwardRef<HTMLElement, ContainerProps>(
  function Container(
    {
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth = "lg",
      sx,
      ...htmlProps
    },
    ref,
  ) {
    const mergedSx = mergeSx({ minWidth: 0 }, sx);

    return (
      <ContainerRoot
        as={component}
        ref={ref}
        $disableGutters={disableGutters}
        $fixed={fixed}
        $maxWidth={maxWidth}
        $sx={mergedSx}
        {...htmlProps}
      />
    );
  },
);
