import { JSX } from "react";
import { RowComponentProps } from "react-window";

import { ItemData } from "../types";
import { OptionComponent } from "./option";
import { OptionMultiLevelComponent } from "./option-multiLevel";

// TODO: we may remove these two functions and use the components directly in the Menu component,
// but for now we will keep them for better readability and separation of concerns.
// eslint-disable-next-line comma-spacing
const MenuRowInner = <T,>({
  ariaAttributes,
  index,
  style,
  ...data
}: RowComponentProps<ItemData<T>>) => {
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
    <div style={style} {...ariaAttributes}>
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

export const MenuRow = MenuRowInner as <T>(
  props: RowComponentProps<ItemData<T>>,
) => JSX.Element;

// eslint-disable-next-line comma-spacing
const MenuRowWithMultiLevelsInner = <T,>({
  ariaAttributes,
  index,
  style,
  ...data
}: RowComponentProps<ItemData<T>>) => {
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
    <div style={style} {...ariaAttributes}>
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

export const MenuRowWithMultiLevels = MenuRowWithMultiLevelsInner as <T>(
  props: RowComponentProps<ItemData<T>>,
) => JSX.Element;
