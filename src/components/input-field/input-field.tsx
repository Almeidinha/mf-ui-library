import {
  Borders,
  Focused,
  Margin,
  Padding,
  Surface,
  Typography,
} from "@foundations";
import {
  forwardRef,
  getSlot,
  If,
  is,
  isDefined,
  isEmpty,
  Slot,
} from "@helpers";
import { labelPositionType } from "components/select/types";
import { Label } from "components/typography";
import { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

import { Flex, SpaceBetween } from "../layout";
import { LabeledInput } from "./components";

const InputBorder = styled(SpaceBetween)<{
  $invalid?: boolean;
  $disabled?: boolean;
}>`
  background: ${({ $invalid }) =>
    is($invalid) ? Surface.Critical.Subdued : Surface.Default.Default};
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
      ${({ $invalid }) => (is($invalid) ? Focused.Critical : Focused.Default)};
  }
  ${({ $invalid, $disabled }) => {
    if (is($disabled)) {
      return `
        background: ${is($invalid) ? Surface.Critical.Subdued : Surface.Neutral.Subdued};
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

  ${Typography.Body}

  ::placeholder {
    ${Typography.LightText}
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

const InputFrame = styled.label<{
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

const ControlsFrame = styled(Flex)`
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
        htmlFor={label && props.name}
      >
        <If is={label}>
          <InputLabel $labelPosition={labelPosition} subtle subdued>
            {label}
            {required}
          </InputLabel>
        </If>
        <InputLayout>
          <If is={prefix}>
            <PrefixFrame subtle subdued>
              {prefix}
            </PrefixFrame>
          </If>
          <HTMLInput
            ref={ref}
            aria-invalid={props.invalid || undefined}
            aria-required={props.required || undefined}
            {...inputProps}
          />
          <If is={suffix}>
            <SuffixFrame subtle subdued>
              {suffix}
            </SuffixFrame>
          </If>
        </InputLayout>
      </InputFrame>
      <If is={icon}>
        <ControlsFrame center>{icon}</ControlsFrame>
      </If>
      <If is={controls}>
        <ControlsFrame center>{controls}</ControlsFrame>
      </If>
    </InputBorder>
  );
});

InputField.Icon = IconSlot;
InputField.Controls = ControlsSlot;
InputField.Label = LabeledInput;
