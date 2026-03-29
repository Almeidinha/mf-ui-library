import { Borders, Focus, Icons, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
import { FC } from "helpers/generic-types";
import { is } from "helpers/safe-navigation";
import { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;

  margin: ${Margin.none};
  width: 1.5em;
  height: 1.5em;

  border: 2px solid ${Borders.Default.Dark};
  border-radius: 50%;

  cursor: pointer;
  display: grid;
  place-items: center;

  /* Avoid transition: all (can animate things you don't want, and is heavier) */
  transition:
    border-color 0.1s ease-in-out,
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out;

  /* Inner dot */
  &::after {
    content: "";
    display: block;
    width: 0.75em;
    height: 0.75em;
    border-radius: 50%;
    background-color: transparent;
    transition: background-color 0.1s ease-in-out;
  }

  /* Hover (unchecked): subtle feedback, no dot fill */
  &:hover {
    border-color: ${Focus.Default};
  }

  /* Checked */
  &:checked {
    border-color: ${Borders.Highlight.Default};
  }

  &:checked::after {
    background-color: ${Icons.Highlight};
  }

  /* Hover (checked): keep dot, adjust border/backplate */
  &:checked:hover {
    background-color: ${Surface.Default.Default};
    border-color: ${Icons.Highlight};
  }

  /* Focus ring: prefer focus-visible */
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px auto ${Focus.Default};
    outline-offset: 4px;
  }

  /* Disabled */
  &:disabled {
    cursor: not-allowed;
    border-color: ${Borders.Default.Default};
    background-color: ${Surface.Default.Default};
  }

  &:disabled:hover {
    border-color: ${Borders.Default.Default};
  }

  &:disabled::after {
    background-color: transparent;
  }

  &:disabled:checked::after {
    background-color: ${Borders.Default.Default};
  }

  &:disabled:checked:hover {
    background-color: ${Surface.Default.Default};
    border-color: ${Borders.Default.Default};
  }
`;

const Label = styled.label<{ $disabled: boolean }>`
  ${TypographyStyles.Label}
  padding: ${Padding.xxs} ${Padding.none};
  display: inline-flex;
  align-items: center;
  width: fit-content;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
`;

const LabelText = styled.span`
  margin-left: ${Margin.xs};
`;

export type RadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: string | ReactNode;
};

export const RadioButton: FC<RadioButtonProps> = ({
  className,
  label,
  disabled,
  onChange,
  checked,
  id,
  ...htmlProps
}) => {
  return (
    <Label htmlFor={id} $disabled={is(disabled)} className={className}>
      <Radio
        id={id}
        type="radio"
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        {...htmlProps}
      />
      <LabelText>{label}</LabelText>
    </Label>
  );
};
