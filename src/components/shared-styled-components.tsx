import { Surface } from "foundation/colors";
import { shadow } from "foundation/shadows";
import { Margin } from "foundation/spacing";
import styled from "styled-components";

export const CardFrame = styled.section.withConfig({
  shouldForwardProp: (prop) => !["column"].includes(prop),
})<{
  column?: boolean;
}>`
  background: ${Surface.Default.Default};

  border-radius: 6px;
  margin-bottom: ${Margin.m};

  ${shadow};
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
`;

export const CardFrameV2 = styled.div.withConfig({
  shouldForwardProp: (prop) => !["column"].includes(prop),
})<{
  column?: boolean;
}>`
  background: ${Surface.Default.Default};
  border-radius: 6px;
  margin-bottom: ${Margin.m};
  ${shadow};
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
`;

export const TransformIconWrapper = styled.span<{ $rotate: boolean }>`
  flex: 0 0 auto;
  width: var(--accordion-icon-size);
  height: var(--accordion-icon-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(
    ${({ $rotate: $expanded }) => ($expanded ? "180deg" : "0deg")}
  );
  transition: transform 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
