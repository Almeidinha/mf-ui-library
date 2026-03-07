import { Label } from "components/typography";
import { Borders, Focused, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { FC, PropsWithChildren } from "helpers/generic-types";
import { Nothing } from "helpers/nothing";
import { isDefined } from "helpers/safe-navigation";
import { forwardRef, HTMLAttributes } from "react";
import styled, { css } from "styled-components";

export type TabProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    Prefix?: FC<HTMLAttributes<HTMLElement>>;
    selected?: boolean;
    secondary?: boolean;
  }
>;

const TabFrame = styled.div<{ $selected: boolean; $secondary: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none; /* rely on focus-visible below */
  user-select: none;

  &:focus-visible {
    outline: 2px solid ${Focused.Default};
    outline-offset: -2px;
    ${({ $secondary }) =>
      !$secondary &&
      css`
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      `}
  }

  ${({ $secondary, $selected }) =>
    $secondary
      ? css`
          padding: ${Padding.xs} ${Padding.m};
          border: ${$selected
            ? "1px solid transparent"
            : `1px solid ${Surface.Default.Depressed}`};
          background: ${$selected
            ? Surface.Default.Depressed
            : Surface.Default.Default};
          border-radius: 18px;
          &:hover {
            background: ${$selected
              ? Surface.Default.Depressed
              : Surface.Default.Hover};
          }
        `
      : css`
          padding: ${Padding.m};
          border-bottom: 3px solid
            ${$selected ? Borders.Highlight.Default : "transparent"};

          /* extra focus affordance for primary tabs: underline even when not selected */
          &:focus-visible {
            border-bottom-color: ${Borders.Highlight.Default};
          }
          &:hover {
            border-bottom-color: ${$selected
              ? Borders.Highlight.Default
              : Borders.Default.Subdued};
          }
        `}
`;

export const Tab = forwardRef<HTMLDivElement, TabProps>((props, ref) => {
  const {
    Prefix,
    selected = false,
    secondary = false,
    children,
    ...rest
  } = props;

  return (
    <TabFrame
      {...rest}
      ref={ref}
      role="tab"
      aria-selected={selected}
      $selected={selected}
      $secondary={secondary}
    >
      {isDefined(Prefix) ? (
        <Prefix style={{ marginRight: Margin.xs }} />
      ) : (
        <Nothing />
      )}

      <Label strong subdued={!selected && !secondary}>
        {children}
      </Label>
    </TabFrame>
  );
});

Tab.displayName = "Tab";
