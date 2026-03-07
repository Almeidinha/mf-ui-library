import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
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
  outline: none;

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

          &:focus-visible {
            box-shadow: 0 0 0 2px ${Borders.Highlight.Default};
          }
        `
      : css`
          padding: ${Padding.m};
          border-bottom: ${$selected
            ? `3px solid ${Borders.Highlight.Default}`
            : "3px solid transparent"};

          &:focus-visible {
            border-bottom: 3px solid ${Borders.Highlight.Default};
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
