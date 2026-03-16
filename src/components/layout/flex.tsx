import { is, isDefined } from "@helpers";
import { SPACING } from "foundation/spacing/spacing";
import styled from "styled-components";

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["center", "column", "gap", "justify"].includes(prop),
})<{
  column?: boolean;
  center?: boolean;
  gap?: SPACING;
  justify?: string;
}>`
  display: flex;
  ${({ center }) => (is(center) ? "align-items: center;" : "")}
  flex-direction: ${({ column }) => (is(column) ? "column" : "row")};
  ${({ gap }) => (isDefined(gap) ? `gap: ${gap};` : "")}
  ${({ justify }) => (isDefined(justify) ? `justify-content: ${justify};` : "")}
`;

export const SpaceBetween = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !["align"].includes(prop),
})<{
  align?: "left" | "center" | "right";
}>`
  text-align: ${({ align }) => align || "left"};
  justify-content: space-between;
`;

export const SpaceAround = styled(Flex).withConfig({
  shouldForwardProp: (prop) => !["align"].includes(prop),
})<{
  align?: "left" | "center" | "right";
}>`
  text-align: ${({ align }) => align || "left"};
  justify-content: space-around;
`;

export const Center = styled(Flex)`
  align-items: center;
  justify-content: space-around;
`;
