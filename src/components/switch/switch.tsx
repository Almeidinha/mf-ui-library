import { Body } from "components/typography";
import { Surface } from "foundation/colors";
import { Margin } from "foundation/spacing";
import { FC } from "helpers/generic-types";
import { isDefined } from "helpers/safe-navigation";
import React, { InputHTMLAttributes, useId } from "react";
import styled from "styled-components";

const Container = styled.label`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  min-width: 0;
  flex: 1;
`;

const SwitchControl = styled.span`
  position: relative;
  display: inline-flex;
  width: 34px;
  height: 20px;
  flex-shrink: 0;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  pointer-events: none;

  &:checked + span {
    background-color: ${Surface.Success.Depressed};
  }

  &:checked + span::before {
    transform: translateX(14px);
  }

  &:disabled + span {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible + span {
    outline: 2px solid ${Surface.Success.Depressed};
    outline-offset: 2px;
  }
`;

const Slider = styled.span`
  position: absolute;
  inset: 0;
  cursor: pointer;
  background-color: ${Surface.Neutral.Default};
  transition: background-color 0.2s ease;
  border-radius: 999px;

  &::before {
    content: "";
    position: absolute;
    left: ${Margin.xxxs};
    bottom: ${Margin.xxxs};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${Surface.Default?.Default ?? "#fff"};
    transform: translateX(0);
    transition: transform 0.2s ease;
  }
`;

const HelpTextContainer = styled(Body)`
  margin-top: ${Margin.xxs};
`;

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & {
  label?: string;
  helpText?: string;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export const Switch: FC<SwitchProps> = ({
  id,
  disabled = false,
  label,
  helpText,
  checked,
  onChange,
  ...inputProps
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked, event);
  };

  const hasText = isDefined(label) || isDefined(helpText);

  return (
    <Container htmlFor={inputId}>
      {hasText && (
        <TextContainer>
          {isDefined(label) && <Body>{label}</Body>}
          {isDefined(helpText) && (
            <HelpTextContainer subdued>{helpText}</HelpTextContainer>
          )}
        </TextContainer>
      )}

      <SwitchControl>
        <HiddenInput
          {...inputProps}
          id={inputId}
          role="switch"
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleToggle}
        />
        <Slider aria-hidden="true" />
      </SwitchControl>
    </Container>
  );
};
