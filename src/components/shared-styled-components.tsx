import { Borders, Focus, Surface, TextColors } from "foundation/colors";
import { shadow } from "foundation/shadows";
import { Margin, Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
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

export const TransformIconWrapper = styled.span<{
  $rotate?: boolean;
  $angle?: number;
}>`
  flex: 0 0 auto;
  width: var(--accordion-icon-size);
  height: var(--accordion-icon-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(
    ${({ $rotate: $expanded, $angle }) =>
      $expanded ? `${$angle ?? 180}deg` : "0deg"}
  );
  transition: transform 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CloseButton = styled.button.attrs({ type: "button" })`
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 4px;

  &:hover {
    background-color: ${Surface.Default.Hover};
  }

  &:active {
    background-color: ${Surface.Default.Pressed};
  }

  &:focus-visible {
    outline: 2px solid ${Focus.Default};
  }
`;

export const NativeSelect = styled.select`
  appearance: none;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  border: 1px solid ${Borders.Default.Default};
  border-radius: 6px;
  padding: 0 32px 0 ${Padding.s};
  background: ${Surface.Default.Default};
  background-image:
    linear-gradient(45deg, transparent 50%, ${TextColors.Soft} 50%),
    linear-gradient(135deg, ${TextColors.Soft} 50%, transparent 50%);
  background-position:
    calc(100% - 16px) calc(50% - 2px),
    calc(100% - 11px) calc(50% - 2px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  color: ${TextColors.Default};
  cursor: pointer;
  ${TypographyStyles.Label}

  &:focus-visible {
    outline: 2px solid ${Focus.Default};
    outline-offset: -2px;
  }

  & option {
    ${TypographyStyles.Body}
  }
`;
