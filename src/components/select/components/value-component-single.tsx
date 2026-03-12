import { JSX, memo } from "react";

import { IValueComponentSingleProps, SelectLabelComponent } from "../types";
import { SelectLabel } from "./helpers";

// eslint-disable-next-line comma-spacing
const ValueComponentSingleImpl = <T,>({
  option,
  labelComponent = SelectLabel,
  className,
}: IValueComponentSingleProps<T>) => {
  const LabelComponent: SelectLabelComponent<T> = labelComponent;

  const composedClassName = ["value-single", className]
    .filter(Boolean)
    .join(" ");

  return (
    <LabelComponent
      value={option.value}
      active
      type="value-single"
      className={composedClassName}
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
