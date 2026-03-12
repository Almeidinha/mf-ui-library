import { is } from "@helpers";
import { Label } from "components/typography";
import { JSX, memo, useCallback } from "react";
import { areEqual } from "react-window";

import { IOption, SelectLabelComponent } from "../types";
import { getOptionState } from "../utils";
import { CheckIcon, OptionItem } from "./helpers";

export type OptionComponentProps<T> = {
  option: IOption<T>;
  active?: boolean;
  selected?: boolean;
  height?: number;
  //search?: string;
  className?: string;
  labelComponent?: SelectLabelComponent<T>;
  onSelect: (value: T, option: IOption<T>) => void;
  //multi?: boolean;
};

// eslint-disable-next-line comma-spacing
const OptionComponentImpl = <T,>({
  active,
  selected,
  labelComponent = Label,
  option,
  height,
  onSelect,
  className,
}: OptionComponentProps<T>) => {
  const SelectLabel: SelectLabelComponent<T> = labelComponent;

  const onClick = useCallback(() => {
    onSelect(option.value, option);
  }, [onSelect, option]);

  const composedClassName = [
    "option",
    className,
    is(selected) ? "selected" : "",
    is(active) ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <OptionItem
      className={composedClassName}
      data-role="option"
      center
      state={getOptionState(active, selected)}
      height={height}
      onClick={onClick}
    >
      <SelectLabel
        value={option.value}
        type="option"
        active={is(active)}
        disabled={option.disabled}
        label={option.label}
        icon={option.icon}
      >
        {option.label}
      </SelectLabel>
      {is(active) && <CheckIcon />}
    </OptionItem>
  );
};

export const OptionComponent = memo(OptionComponentImpl, areEqual) as <T>(
  props: OptionComponentProps<T>,
) => JSX.Element;
