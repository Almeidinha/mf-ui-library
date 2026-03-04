import { Focused } from "@foundations";
import { forwardRef, If, is, isDefined } from "@helpers";
import { Spinner } from "components/spinner";
import { Label } from "components/typography";
import React, { ComponentType } from "react";
import styled, { css } from "styled-components";

import {
  BUTTON_FRAME_BLOCKED_PROPS,
  ButtonSizeProps,
  ButtonType,
  ButtonTypeProps,
  getBackgroundColorByType,
  getBackgroundColorDisabledByType,
  getBackgroundColorHoverByType,
  getBackgroundColorPressedByType,
  getBorderByType,
  getBorderDisabledByType,
  getButtonType,
  getCursor,
  getIconColorByType,
  getIconColorOnHoverByType,
  getIsDisabled,
  getPaddingBySize,
  getPaddingByType,
  getTextColorByType,
  getTextColorIfDisabled,
  getTextColorOnHoverByType,
  getTextDecorationHoverByType,
} from "./button-flags";

const ButtonFrame = styled.button.withConfig({
  shouldForwardProp: (prop) => !BUTTON_FRAME_BLOCKED_PROPS.has(prop),
})<{
  backgroundColor: string;
  buttonSize: string;
  cursor: string;
  backgroundHover: string;
  textDecorationHover: string;
  backgroundPressed: string;
  textColorHover: string;
  buttonBorder: string;
  isDisabled: boolean;
  iconColor: string;
  iconColorHover: string;
}>`
  padding: ${({ buttonSize }) => buttonSize};
  border: ${({ buttonBorder }) => buttonBorder};
  border-radius: 6px;
  background: ${({ backgroundColor }) => backgroundColor};
  cursor: ${({ cursor }) => cursor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  align-items: center;
  position: relative;
  --icon-color: ${({ iconColor }) => iconColor};
  svg {
    color: var(--icon-color);
  }

  ${(props) =>
    !props.isDisabled &&
    css`
      &:hover {
        background: ${props.backgroundHover};
        color: ${props.textColorHover};
        text-decoration: ${props.textDecorationHover};
        div {
          color: ${props.textColorHover};
        }
        --icon-color: ${props.iconColorHover};
        svg {
          color: var(--icon-color);
        }
      }

      outline-offset: -2px;
      &:focus,
      :focus-visible {
        outline: 2px solid ${Focused.Default};
      }

      &:active {
        text-decoration: "none";
        background: ${props.backgroundPressed};
      }
    `}
`;

const ButtonText = styled(Label)<{
  $textColor: string;
  $textColorDisabled: string;
  $isLoading: boolean;
}>`
  color: ${({ $textColorDisabled, $textColor }) =>
    $textColorDisabled !== "" ? $textColorDisabled : $textColor};

  ${({ $isLoading }) =>
    $isLoading
      ? `
    opacity: 0;
  `
      : ""}
`;

const IconContainer = styled.div<{ $isLoading: boolean }>`
  width: 20px;
  ${({ $isLoading }) => ($isLoading ? "visibility: hidden;" : "")}
`;

const Loading = styled(Spinner)`
  position: absolute;
`;

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  IconPrefix?: ComponentType;
  IconSuffix?: ComponentType;
  children?: React.ReactNode;
  subtle?: boolean;
}

export type ButtonProps = IButtonProps & ButtonTypeProps & ButtonSizeProps;

function makeButtonConfig(props: ButtonProps) {
  const buttonType = getButtonType(props);
  const isDisabled = getIsDisabled(props);
  const backgroundColor = isDisabled
    ? getBackgroundColorDisabledByType(buttonType)
    : getBackgroundColorByType(buttonType);
  const buttonPadding = getPaddingBySize(props);
  const buttonOverridePadding = getPaddingByType(buttonType);
  const cursor = getCursor(props);
  const backgroundHover = getBackgroundColorHoverByType(buttonType);
  const textDecorationHover = getTextDecorationHoverByType(buttonType);
  const backgroundPressed = getBackgroundColorPressedByType(buttonType);
  const textColorHover = getTextColorOnHoverByType(buttonType);
  const iconColorHover = getIconColorOnHoverByType(buttonType);
  const buttonBorder = isDisabled
    ? getBorderDisabledByType(buttonType)
    : getBorderByType(buttonType);
  const buttonSize =
    buttonOverridePadding !== "" ? buttonOverridePadding : buttonPadding;
  const textColor = getTextColorByType(buttonType);
  const iconColor = getIconColorByType(buttonType);
  const textColorDisabled = getTextColorIfDisabled(props);

  return {
    backgroundColor,
    buttonSize,
    cursor,
    backgroundHover,
    textDecorationHover,
    backgroundPressed,
    textColorHover,
    iconColorHover,
    buttonBorder,
    isDisabled,
    textColor,
    iconColor,
    textColorDisabled,
    buttonType,
  };
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      loading,
      IconPrefix,
      IconSuffix,
      type = "button",
      ...htmlProps
    } = props;
    const { textColor, textColorDisabled, buttonType, ...buttonConfig } =
      makeButtonConfig(props);
    return (
      <ButtonFrame
        ref={ref}
        {...htmlProps}
        type={type}
        {...buttonConfig}
        data-testid="button-test"
        role="button"
      >
        {isDefined(IconPrefix) && (
          <IconContainer $isLoading={is(loading)}>
            <IconPrefix />
          </IconContainer>
        )}

        <If is={children}>
          <ButtonText
            strong
            $textColor={textColor}
            $textColorDisabled={textColorDisabled}
            $isLoading={is(loading)}
          >
            {children}
          </ButtonText>
        </If>
        <If is={loading}>
          <Loading
            small
            onPrimary={
              buttonType === ButtonType.Primary ||
              buttonType === ButtonType.DestructivePrimary
            }
          />
        </If>

        {isDefined(IconSuffix) && (
          <IconContainer $isLoading={is(loading)}>
            <IconSuffix />
          </IconContainer>
        )}
      </ButtonFrame>
    );
  },
);
