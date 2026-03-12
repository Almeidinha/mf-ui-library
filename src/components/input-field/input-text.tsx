import { FC } from "@helpers";
import { InputHTMLAttributes } from "react";

import { InputField, InputFieldSlots } from "./input-field";

interface IInputTextProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  value?: string;
  onChange?: (change: string) => void;
  label?: string;
  invalid?: boolean;
  prefix?: string;
  suffix?: string;
}

export const InputText: FC<IInputTextProps, InputFieldSlots> = ({
  value,
  onChange,
  ...inputFieldProps
}) => {
  return (
    <InputField
      {...inputFieldProps}
      type="text"
      onChange={(e) => onChange?.(e.target.value)}
      value={value}
    />
  );
};

InputText.Icon = InputField.Icon;
InputText.Controls = InputField.Controls;
InputText.Label = InputField.Label;
