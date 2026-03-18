import { is, isDefined } from "@helpers";
import { SPACING } from "foundation/spacing/spacing";
import React, { forwardRef } from "react";
import styled from "styled-components";

type FlexAlign = "flex-start" | "center" | "flex-end";
type FlexJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type FlexProps = React.HTMLAttributes<HTMLElement> & {
  align?: FlexAlign;
  column?: boolean;
  component?: React.ElementType;
  gap?: SPACING;
  justify?: FlexJustify;
};

const FlexRoot = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["align", "column", "gap", "justify"].includes(prop),
})<{
  align?: FlexAlign;
  column?: boolean;
  gap?: SPACING;
  justify?: FlexJustify;
}>`
  display: flex;
  ${({ align }) => (isDefined(align) ? `align-items: ${align};` : "")}
  flex-direction: ${({ column }) => (is(column) ? "column" : "row")};
  ${({ gap }) => (isDefined(gap) ? `gap: ${gap};` : "")}
  ${({ justify }) => (isDefined(justify) ? `justify-content: ${justify};` : "")}
`;

export const Flex = forwardRef<HTMLElement, FlexProps>(function Flex(
  { component = "div", ...props },
  ref,
) {
  return <FlexRoot as={component} ref={ref} {...props} />;
});
