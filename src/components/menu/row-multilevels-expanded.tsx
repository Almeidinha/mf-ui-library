import { IMenuRowProps } from "components/select/types";
import React, { JSX, memo } from "react";

import { OptionMultiLevelExpandedComponent } from "./option-multilevel-expanded";

type MenuRowProps<T> = IMenuRowProps<T> & {
  expandedKeys: Set<string>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

// TODO, remove this dilemma as we now use OptionMultiLevelExpandedComponent directly in MenuListExpanded
// eslint-disable-next-line comma-spacing
const RowMultiLevelsExpandedImp = <T,>({
  index,
  data,
  expandedKeys,
  containerRef,
}: MenuRowProps<T>) => {
  const {
    value,
    options,
    labelComponent,
    selectedIndex,
    rowHeight,
    onSelect,
    onExpand,
    onReturn,
    getOptionKey,
  } = data;

  const option = options[index];

  return (
    <OptionMultiLevelExpandedComponent
      option={option}
      labelComponent={labelComponent}
      height={rowHeight}
      selectedValues={value}
      selected={selectedIndex === index}
      onSelect={onSelect}
      onExpand={onExpand}
      onReturn={onReturn}
      getOptionKey={getOptionKey}
      expandedKeys={expandedKeys}
      containerRef={containerRef}
    />
  );
};

export const RowMultiLevelsExpanded = memo(RowMultiLevelsExpandedImp) as <T>(
  props: MenuRowProps<T>,
) => JSX.Element;
