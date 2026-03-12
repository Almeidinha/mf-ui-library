import { JSX, memo } from "react";
import { areEqual } from "react-window";

import { IMenuRowProps } from "../types";
import { OptionComponent } from "./option";
import { OptionMultiLevelComponent } from "./option-multiLevel";

// TODO: we may remove these two functions and use the components directly in the Menu component,
// but for now we will keep them for better readability and separation of concerns.
// eslint-disable-next-line comma-spacing
const MenuRowInner = <T,>({ index, style, data }: IMenuRowProps<T>) => {
  const {
    options,
    labelComponent,
    selectedIndex,
    rowHeight,
    //search,
    onSelect,
    value,
    getOptionKey,
  } = data;

  const option = options[index];

  return (
    <div style={style}>
      <OptionComponent<T>
        option={option}
        labelComponent={labelComponent}
        height={rowHeight}
        active={value.some(
          (val) => getOptionKey(val) === getOptionKey(option.value),
        )}
        selected={selectedIndex === index}
        //search={search}
        onSelect={onSelect}
      />
    </div>
  );
};

export const MenuRow = memo(MenuRowInner, areEqual) as <T>(
  props: IMenuRowProps<T>,
) => JSX.Element;

// eslint-disable-next-line comma-spacing
const MenuRowWithMultiLevelsInner = <T,>({
  index,
  style,
  data,
}: IMenuRowProps<T>) => {
  const {
    value,
    options,
    labelComponent,
    selectedIndex,
    rowHeight,
    search,
    onSelect,
    onExpand,
    onReturn,
    getOptionKey,
  } = data;

  const option = options[index];

  return (
    <div style={style}>
      <OptionMultiLevelComponent<T>
        option={option}
        labelComponent={labelComponent}
        height={rowHeight}
        active={value.some(
          (val) => getOptionKey(val) === getOptionKey(option.value),
        )}
        selected={selectedIndex === index}
        search={search}
        onSelect={onSelect}
        onExpand={onExpand}
        onReturn={onReturn}
      />
    </div>
  );
};

export const MenuRowWithMultiLevels = memo(
  MenuRowWithMultiLevelsInner,
  areEqual,
) as <T>(props: IMenuRowProps<T>) => JSX.Element;
