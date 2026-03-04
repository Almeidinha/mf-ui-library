import { Focused, Icons, Surface } from "@foundations";
import { FC, is } from "@helpers";
import { IconMinor } from "components/icon";
import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
}

const ClosableWrapper = styled.button<{ $disabled: boolean }>`
  appearance: none;
  border: 0;
  margin: 0;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${({ $disabled }) =>
    $disabled ? Surface.Neutral.Subdued : Surface.Neutral.Default};
  border-radius: 0px 4px 4px 0px;

  ${({ $disabled }) =>
    !$disabled
      ? `
        cursor: pointer;

        &:hover {
          background: ${Surface.Neutral.Hover};
          svg path { fill: ${Icons.Hover}; }
        }

        &:active {
          background: ${Surface.Neutral.Pressed};
          svg path { fill: ${Icons.Pressed}; }
        }

        &:focus {
          outline: 2px solid ${Focused.Default};
          outline-offset: -2px;
        }
      `
      : `
        cursor: default;
        svg path { fill: ${Icons.Disabled}; }
      `}
`;

export const CloseButton: FC<CloseButtonProps> = ({
  disabled,
  ariaLabel,
  type,
  onClick,
  ...rest
}) => {
  const isDisabled = is(disabled);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) {
      return;
    }
    onClick?.(e);
  };

  return (
    <ClosableWrapper
      {...rest}
      type={type ?? "button"}
      disabled={isDisabled}
      $disabled={isDisabled}
      aria-label={ariaLabel ?? "Remove"}
      onClick={handleClick}
    >
      <IconMinor.Xmark />
    </ClosableWrapper>
  );
};
