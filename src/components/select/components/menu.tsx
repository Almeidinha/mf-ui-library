import { Slide } from "components/transitions";
import {
  defaultTo,
  is,
  isDefined,
  isNil,
  safeArray,
} from "helpers/safe-navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FixedSizeList } from "react-window";

import {
  DEFAULT_EMPTY_TEXT,
  DEFAULT_MENU_HEIGHT,
  DEFAULT_ROW_HEIGHT,
  IOption,
  ItemData,
  labelPositionType,
  MenuComponentProps,
  menuPositionType,
} from "../types";
import { defaultGetOptionKey } from "../utils";
import { EmptyOptionItem, SelectLabel } from "./helpers";
import { MenuContainer } from "./menu-container";
import { MenuRow, MenuRowWithMultiLevels } from "./menu-row";

// eslint-disable-next-line comma-spacing
export const Menu = <T,>(props: MenuComponentProps<T>) => {
  const {
    rowHeight = DEFAULT_ROW_HEIGHT,
    selectedIndex,
    open,
    invalid,
    menuHeight = DEFAULT_MENU_HEIGHT,
    menuPosition = menuPositionType.BOTTOM,
    labelPosition = labelPositionType.TOP,
    label,
    multiLevel,
    menuComponent: MenuComponent,
    emptyText,
    search,
    multi,
    value,
    labelComponent,
    className,
    options: propOptions,
    onSelect,
    getOptionKey = defaultGetOptionKey,
  } = props;

  const [options, setOptions] = useState<IOption<T>[]>(() =>
    safeArray(propOptions),
  );

  const listRef = useRef<FixedSizeList>(null);

  const height = Math.min(
    Math.max(options.length * rowHeight, rowHeight) + 10,
    menuHeight,
  );

  useEffect(() => {
    setOptions(safeArray(propOptions));
  }, [propOptions]);

  useEffect(() => {
    if (!is(open)) {
      return;
    }

    if (!listRef.current) {
      return;
    }

    if (selectedIndex === undefined || selectedIndex < 0) {
      return;
    }

    listRef.current.scrollToItem(selectedIndex, "center");
  }, [open, selectedIndex]);

  const handleSelect = useCallback(
    (nextValue: T, option: IOption<T>) => {
      if (is(multiLevel)) {
        setOptions(safeArray(propOptions));
      }

      if (Array.isArray(value) && is(multi)) {
        const nextKey = getOptionKey(nextValue);

        const found = value.some((item) => getOptionKey(item) === nextKey);
        const values = found
          ? value.filter((item) => getOptionKey(item) !== nextKey)
          : [...value, nextValue];

        onSelect(values, option);
        return;
      }

      onSelect(nextValue, option);
    },
    [multiLevel, propOptions, multi, value, onSelect, getOptionKey],
  );

  const handleExpand = useCallback((option: IOption<T>) => {
    setOptions([{ ...option, isParent: true }, ...safeArray(option.options)]);
  }, []);

  const handleReturn = useCallback(() => {
    setOptions(safeArray(propOptions));
  }, [propOptions]);

  const normalizedValue = useMemo<T[]>(() => {
    if (is(multi) && Array.isArray(value)) {
      return value;
    }

    if (isNil(value) || Array.isArray(value)) {
      return [];
    }

    return [value];
  }, [value, multi]);

  const itemData: ItemData<T> = useMemo(
    () => ({
      options,
      value: normalizedValue,
      multi,
      selectedIndex,
      rowHeight,
      search,
      labelComponent,
      getOptionKey,
      onSelect: handleSelect,
      onExpand: handleExpand,
      onReturn: handleReturn,
    }),
    [
      options,
      normalizedValue,
      multi,
      selectedIndex,
      rowHeight,
      search,
      labelComponent,
      getOptionKey,
      handleSelect,
      handleExpand,
      handleReturn,
    ],
  );

  const renderList = () => {
    const itemCount = options.length;

    if (isDefined(MenuComponent)) {
      return <MenuComponent {...props} options={options} />;
    }

    if (itemCount === 0) {
      return (
        <EmptyOptionItem $menuPosition={menuPosition}>
          <SelectLabel>
            <p>{defaultTo(emptyText, DEFAULT_EMPTY_TEXT)}</p>
          </SelectLabel>
        </EmptyOptionItem>
      );
    }

    return (
      <FixedSizeList<ItemData<T>>
        className="menu-list"
        style={{ position: "absolute" }}
        ref={listRef}
        width="100%"
        height={height}
        itemSize={rowHeight}
        itemCount={itemCount}
        itemData={itemData}
      >
        {is(multiLevel) ? MenuRowWithMultiLevels : MenuRow}
      </FixedSizeList>
    );
  };

  return (
    <Slide
      in={open}
      direction={menuPosition === "top" ? "up" : "down"}
      mountOnEnter
      unmountOnExit
    >
      <MenuContainer
        className={className}
        invalid={invalid}
        label={label}
        menuHeight={height}
        menuPosition={menuPosition}
        labelPosition={labelPosition}
      >
        {renderList()}
      </MenuContainer>
    </Slide>
  );
};
