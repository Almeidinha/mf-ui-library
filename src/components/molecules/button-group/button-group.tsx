import { Borders } from "foundation/colors";
import React from "react";
import styled, { css } from "styled-components";

import { Button, ButtonProps } from "../button";

const GROUP_RADIUS = "6px";

type ButtonGroupOrientation = "horizontal" | "vertical";
type ButtonGroupSize = "small" | "default" | "large";

const GroupRoot = styled.div<{
  $fullWidth: boolean;
  $orientation: ButtonGroupOrientation;
}>`
  display: inline-flex;
  align-items: stretch;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  flex-direction: ${({ $orientation }) =>
    $orientation === "vertical" ? "column" : "row"};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      > * {
        flex: 1 1 0;
      }
    `}
`;

const GroupItem = styled.div<{
  $fullWidth: boolean;
  $outlined: boolean;
  $orientation: ButtonGroupOrientation;
}>`
  display: flex;
  position: relative;
  flex: ${({ $fullWidth }) => ($fullWidth ? "1 1 0" : "0 0 auto")};

  ${({ $orientation, $outlined }) =>
    $orientation === "horizontal"
      ? css`
          &:not(:first-child) {
            margin-left: ${$outlined ? "0" : "-1px"};
          }
        `
      : css`
          &:not(:first-child) {
            margin-top: ${$outlined ? "0" : "-1px"};
          }
        `}

  ${({ $outlined, $orientation }) =>
    $outlined &&
    ($orientation === "horizontal"
      ? css`
          &:not(:first-child)::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 1px;
            background: ${Borders.Default.Subdued};
            z-index: 2;
            pointer-events: none;
          }
        `
      : css`
          &:not(:first-child)::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: ${Borders.Default.Subdued};
            z-index: 2;
            pointer-events: none;
          }
        `)}

  &:hover,
  &:focus-within {
    z-index: 1;
  }

  > * {
    ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
  }

  ${({ $orientation }) =>
    $orientation === "horizontal"
      ? css`
          &:first-child > * {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }

          &:not(:first-child):not(:last-child) > * {
            border-radius: 0;
          }

          &:last-child > * {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          &:only-child > * {
            border-radius: ${GROUP_RADIUS};
          }
        `
      : css`
          &:first-child > * {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          &:not(:first-child):not(:last-child) > * {
            border-radius: 0;
          }

          &:last-child > * {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }

          &:only-child > * {
            border-radius: ${GROUP_RADIUS};
          }
        `}
`;

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  fullWidth?: boolean;
  outlined?: boolean;
  orientation?: ButtonGroupOrientation;
  size?: ButtonGroupSize;
}

function hasExplicitSize(props: ButtonProps) {
  return props.small || props.default || props.large;
}

function getSizeProps(size?: ButtonGroupSize): Partial<ButtonProps> {
  if (size === "small") {
    return { default: undefined, large: undefined, small: true };
  }

  if (size === "large") {
    return { default: undefined, large: true, small: undefined };
  }

  if (size === "default") {
    return { default: true, large: undefined, small: undefined };
  }

  return {};
}

function renderGroupChild(
  child: React.ReactNode,
  outlined: boolean,
  size?: ButtonGroupSize,
) {
  if (!outlined || !React.isValidElement<ButtonProps>(child)) {
    if (!React.isValidElement<ButtonProps>(child) || child.type !== Button) {
      return child;
    }

    if (hasExplicitSize(child.props) || size == null) {
      return child;
    }

    return React.cloneElement(child, getSizeProps(size));
  }

  if (child.type !== Button) {
    return child;
  }

  return React.cloneElement(child, {
    basic: undefined,
    destructive: undefined,
    destructivePrimary: undefined,
    outline: undefined,
    plain: true,
    primary: undefined,
    subtle: true,
    ...(hasExplicitSize(child.props) ? {} : getSizeProps(size)),
  });
}

export const ButtonGroup = ({
  children,
  fullWidth = false,
  outlined = false,
  orientation = "horizontal",
  size,
  ...htmlProps
}: ButtonGroupProps) => {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <GroupRoot
      {...htmlProps}
      role={htmlProps.role ?? "group"}
      $fullWidth={fullWidth}
      $orientation={orientation}
    >
      {items.map((child, index) => (
        <GroupItem
          key={
            React.isValidElement(child) && child.key != null ? child.key : index
          }
          $fullWidth={fullWidth}
          $outlined={outlined}
          $orientation={orientation}
        >
          {renderGroupChild(child, outlined, size)}
        </GroupItem>
      ))}
    </GroupRoot>
  );
};
