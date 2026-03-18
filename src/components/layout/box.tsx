import React, { forwardRef } from "react";

import { LayoutPrimitiveProps, SystemRoot } from "./system";

export type BoxProps = React.HTMLAttributes<HTMLElement> & LayoutPrimitiveProps;

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  { component = "div", sx, ...htmlProps },
  ref,
) {
  return <SystemRoot as={component} ref={ref} $sx={sx} {...htmlProps} />;
});
