import { Slide } from "components/transitions";
import { clamp } from "helpers/numbers";
import {
  defaultTo,
  is,
  isDefined,
  isNil,
  safeArray,
} from "helpers/safe-navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import styled from "styled-components";

import {
  DEFAULT_EMPTY_TEXT,
  DEFAULT_MENU_HEIGHT,
  DEFAULT_ROW_HEIGHT,
  IMenuRowProps,
  IOption,
  ItemData,
  labelPositionType,
  MenuComponentProps,
  menuPositionType,
} from "../types";
import { defaultGetOptionKey } from "../utils";
import { EmptyOptionItem, SelectLabel } from "./helpers";
import { MenuContainer } from "./menu-container";
import { MenuPortalLayer } from "./menu-portal-layer";
import { MenuRow, MenuRowWithMultiLevels } from "./menu-row";

const MenuPanel = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
`;

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

    disablePortal = true,
    portalContainer,
    anchorRef,
    portalPlacement,
    portalOffset = 4,
    viewportPadding = 8,
    matchAnchorWidth = true,
  } = props;

  const [options, setOptions] = useState<IOption<T>[]>(() =>
    safeArray(propOptions),
  );

  const listRef = useRef<VirtuosoHandle | null>(null);

  const contentHeight = options.length * rowHeight + 2;
  const height = clamp(contentHeight, rowHeight, menuHeight);
  const itemCount = options.length;
  const initialItemCount = Math.min(
    itemCount,
    Math.max(Math.ceil(height / rowHeight) + 2, 1),
  );

  const initialTopMostItemIndex = useMemo(() => {
    if (!is(open) || selectedIndex === undefined || selectedIndex < 0) {
      return 0;
    }

    return { index: selectedIndex, align: "center" as const };
  }, [open, selectedIndex]);

  useEffect(() => {
    setOptions(safeArray(propOptions));
  }, [propOptions]);

  const scrollSelectedRow = useCallback(() => {
    if (
      !is(open) ||
      !listRef.current ||
      selectedIndex === undefined ||
      selectedIndex < 0
    ) {
      return;
    }

    listRef.current.scrollToIndex({
      index: selectedIndex,
      align: "center",
      behavior: "auto",
    });
  }, [open, selectedIndex]);

  useLayoutEffect(() => {
    if (!is(open)) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollSelectedRow();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open, options.length, height, scrollSelectedRow]);

  const handleSelect = useCallback(
    (nextValue: T, option: IOption<T>) => {
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
    [multi, value, onSelect, getOptionKey],
  );

  const handleExpand = useCallback((option: IOption<T>) => {
    setOptions([{ ...option, isParent: true }, ...safeArray(option.options)]);
  }, []);

  const handleReturn = useCallback(() => {
    setOptions(safeArray(propOptions));
  }, [propOptions]);

  const handleExited = useCallback(() => {
    if (is(multiLevel)) {
      setOptions(safeArray(propOptions));
    }
  }, [multiLevel, propOptions]);

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

  const getItemKey = useCallback(
    (index: number, option?: IOption<T>) =>
      option
        ? `${is(option.isParent) ? "parent" : "option"}-${getOptionKey(option.value)}-${index}`
        : index,
    [getOptionKey],
  );

  const renderMenuRow = useCallback(
    (index: number, option?: IOption<T>) => {
      if (!option) {
        return null;
      }

      const rowProps: IMenuRowProps<T> = {
        index,
        data: itemData,
        style: {
          height: rowHeight,
          boxSizing: "border-box",
        },
      };

      return is(multiLevel) ? (
        <MenuRowWithMultiLevels {...rowProps} />
      ) : (
        <MenuRow {...rowProps} />
      );
    },
    [itemData, rowHeight, multiLevel],
  );

  const renderList = () => {
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
      <Virtuoso<IOption<T>>
        className="menu-list"
        ref={listRef}
        data={options}
        fixedItemHeight={rowHeight}
        initialItemCount={initialItemCount}
        initialTopMostItemIndex={initialTopMostItemIndex}
        computeItemKey={getItemKey}
        itemContent={renderMenuRow}
        style={{ height, width: "100%" }}
      />
    );
  };

  const resolvedPlacement =
    portalPlacement ??
    (menuPosition === menuPositionType.TOP ? "top-start" : "bottom-start");

  return (
    <MenuPortalLayer
      open={open}
      disablePortal={disablePortal}
      portalContainer={portalContainer}
      anchorRef={anchorRef}
      placement={resolvedPlacement}
      offset={portalOffset}
      viewportPadding={viewportPadding}
      matchAnchorWidth={matchAnchorWidth}
    >
      <Slide
        in={open}
        timeout={{ enter: 180, exit: 140 }}
        direction={menuPosition === "top" ? "up" : "down"}
        mountOnEnter
        unmountOnExit
        enter
        exit
        onExited={handleExited}
      >
        <MenuContainer
          disableInlinePosition={!disablePortal}
          className={className}
          invalid={invalid}
          label={label}
          menuHeight={height}
          menuPosition={menuPosition}
          labelPosition={labelPosition}
        >
          <MenuPanel>{renderList()}</MenuPanel>
        </MenuContainer>
      </Slide>
    </MenuPortalLayer>
  );
};
