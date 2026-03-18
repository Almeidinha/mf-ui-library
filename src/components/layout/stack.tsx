import React, { forwardRef, Fragment } from "react";

import {
  LayoutPrimitiveProps,
  mergeSx,
  ResponsiveValue,
  SxObject,
  SystemRoot,
} from "./system";

type StackDirection = "column" | "column-reverse" | "row" | "row-reverse";

function getDividerNodeKey(node: React.ReactNode, fallback: string) {
  if (React.isValidElement(node) && node.key != null) {
    return String(node.key);
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  return fallback;
}

function withDividers(children: React.ReactNode, divider?: React.ReactNode) {
  const items = React.Children.toArray(children);

  if (!divider || items.length <= 1) {
    return items;
  }

  const [firstChild, ...remainingChildren] = items;
  let previousChild = firstChild;

  return [
    firstChild,
    ...remainingChildren.flatMap((child) => {
      const previousKey = getDividerNodeKey(previousChild, "previous-node");
      const childKey = getDividerNodeKey(child, "current-node");
      const dividerKey = `stack-divider-${previousKey}-${childKey}`;

      previousChild = child;

      return [<Fragment key={dividerKey}>{divider}</Fragment>, child];
    }),
  ];
}

export type StackProps = React.HTMLAttributes<HTMLElement> &
  LayoutPrimitiveProps & {
    direction?: ResponsiveValue<StackDirection>;
    divider?: React.ReactNode;
    spacing?: ResponsiveValue<number | string>;
    useFlexGap?: boolean;
  };

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    children,
    component = "div",
    direction = "column",
    divider,
    spacing = 0,
    sx,
    useFlexGap = false,
    ...htmlProps
  },
  ref,
) {
  const stackSx: SxObject = {
    display: "flex",
    flexDirection: direction,
    gap: spacing,
    minWidth: 0,
  };
  const mergedSx = mergeSx(stackSx, sx);

  return (
    <SystemRoot
      as={component}
      ref={ref}
      data-use-flex-gap={useFlexGap ? "true" : "false"}
      $sx={mergedSx}
      {...htmlProps}
    >
      {withDividers(children, divider)}
    </SystemRoot>
  );
});
