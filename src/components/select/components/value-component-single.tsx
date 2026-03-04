import { JSX, memo } from "react";

import { IValueComponentSingleProps, SelectLabelComponent } from "../types";
import { SelectLabel } from "./helpers";

// eslint-disable-next-line comma-spacing
const ValueComponentSingleImpl = <T,>(props: IValueComponentSingleProps<T>) => {
  const { option, labelComponent = SelectLabel } = props;

  const LabelComponent: SelectLabelComponent<T> = labelComponent;

  const className = ["value-single", props.className].filter(Boolean).join(" ");

  return (
    <LabelComponent
      value={option.value}
      active
      type="value-single"
      className={className}
      default
      disabled={option.disabled}
      label={option.label}
      icon={option.icon}
      style={{ pointerEvents: "none" }}
    >
      {option.label}
    </LabelComponent>
  );
};

export default memo(ValueComponentSingleImpl) as <T>(
  props: IValueComponentSingleProps<T>,
) => JSX.Element;
