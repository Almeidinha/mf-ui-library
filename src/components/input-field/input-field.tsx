import { labelPositionType } from "components/select/types";
import { Label } from "components/typography";
import { Borders, Focus, Surface } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
import { forwardRef } from "helpers/generic-types";
import { If } from "helpers/nothing";
import { is, isDefined, isEmpty } from "helpers/safe-navigation";
import { getSlot, Slot } from "helpers/slots";
import { InputHTMLAttributes, useId } from "react";
import styled, { css } from "styled-components";

import { Flex } from "../layout";
import { LabeledInput } from "./components";

const InputBorder = styled(Flex).attrs({ justify: "space-between" })<{
  $invalid?: boolean;
  $disabled?: boolean;
}>`
  background: ${({ $invalid }) =>
    is($invalid) ? Surface.Critical.Muted : Surface.Default.Default};
  border: 1px solid
    ${({ $invalid }) =>
      is($invalid) ? Borders.Critical.Default : Borders.Default.Default};
  border-radius: 6px;
  box-sizing: border-box;
  padding: ${Padding.none} ${Padding.s};

  user-select: none;
  outline-offset: -2px;

  &:focus-within {
    outline: 2px solid
      ${({ $invalid }) => (is($invalid) ? Focus.Critical : Focus.Default)};
  }
  ${({ $invalid, $disabled }) => {
    if (is($disabled)) {
      return `
        background: ${is($invalid) ? Surface.Critical.Muted : Surface.Neutral.Muted};
        cursor: default;
        opacity: 0.75;
      `;
    }
    return "";
  }}
`;

const InputLayout = styled(Flex)`
  width: 100%;
  flex: 1 1 auto;
`;

export const HTMLInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !["invalid"].includes(prop),
})`
  border: 0;
  background: transparent;
  outline: none;
  font: inherit;
  color: inherit;
  cursor: auto;
  padding: ${Padding.xxs} ${Padding.none};
  width: 100%;

  /* Chrome, Safari, Edge, Opera */
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  ${TypographyStyles.Body}

  ::placeholder {
    ${TypographyStyles.SoftText}
  }
`;

const PrefixFrame = styled(Label)`
  margin-right: ${Margin.xs};
  align-self: center;
`;

const SuffixFrame = styled(Label)`
  margin-left: ${Margin.xs};
  align-self: center;
`;

class IconSlot extends Slot {}
class ControlsSlot extends Slot {}

export type InputFieldSlots = {
  Icon: typeof IconSlot;
  Controls: typeof ControlsSlot;
  Label: typeof LabeledInput;
};

export interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  prefix?: string;
  suffix?: string;
  label?: string;
  labelPosition?: "top" | "side";
}

const InputFrame = styled.label.withConfig({
  shouldForwardProp: (prop) => !["label", "$labelPosition"].includes(prop),
})<{
  label?: string;
  $labelPosition?: "top" | "side";
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${Padding.xxs} ${Padding.none};

  ${(props) => {
    const hasLabel = isDefined(props.label) && !isEmpty(props.label);

    if (hasLabel && props.$labelPosition === labelPositionType.TOP) {
      return `
        padding: ${Padding.xs} ${Padding.none} ${Padding.xxs} ${Padding.none};
      `;
    }

    if (hasLabel && props.$labelPosition === labelPositionType.SIDE) {
      return `
        flex-direction: row;
        align-items: center;
      `;
    }

    return "";
  }}
`;

const ControlsFrame = styled(Flex).attrs({ align: "center" })`
  margin-left: ${Margin.s};
`;

const InputLabel = styled(Label)<{ $labelPosition?: string }>`
  ${({ $labelPosition }) =>
    $labelPosition === labelPositionType.SIDE &&
    css`
      margin-right: ${Padding.xs};
      flex: 0 0 auto;
    `}
`;

export const InputField = forwardRef<
  HTMLInputElement,
  IInputFieldProps,
  InputFieldSlots
>((props: IInputFieldProps, ref) => {
  const {
    children,
    prefix,
    suffix,
    label,
    className,
    style,
    labelPosition = labelPositionType.TOP,
    ...inputProps
  } = props;

  const generatedId = useId();
  const inputId = props.id ?? props.name ?? generatedId;

  const icon = getSlot(IconSlot, children);
  const controls = getSlot(ControlsSlot, children);
  const required = is(props.required) ? "*" : "";

  return (
    <InputBorder
      $invalid={props.invalid}
      $disabled={props.disabled}
      className={className}
      style={style}
    >
      <InputFrame
        label={label}
        $labelPosition={labelPosition}
        htmlFor={inputId}
      >
        <If is={label}>
          <InputLabel $labelPosition={labelPosition} subtle muted>
            {label}
            {required}
          </InputLabel>
        </If>
        <InputLayout>
          <If is={prefix}>
            <PrefixFrame subtle muted>
              {prefix}
            </PrefixFrame>
          </If>
          <HTMLInput
            ref={ref}
            id={inputId}
            aria-invalid={props.invalid || undefined}
            aria-required={props.required || undefined}
            {...inputProps}
          />
          <If is={suffix}>
            <SuffixFrame subtle muted>
              {suffix}
            </SuffixFrame>
          </If>
        </InputLayout>
      </InputFrame>
      <If is={icon}>
        <ControlsFrame>{icon}</ControlsFrame>
      </If>
      <If is={controls}>
        <ControlsFrame>{controls}</ControlsFrame>
      </If>
    </InputBorder>
  );
});

InputField.Icon = IconSlot;
InputField.Controls = ControlsSlot;
InputField.Label = LabeledInput;
