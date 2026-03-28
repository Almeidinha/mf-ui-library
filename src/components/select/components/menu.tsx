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

const MENU_BOTTOM_SPACER = 4;

const MenuFooterSpacer = styled.div`
  height: ${MENU_BOTTOM_SPACER}px;
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

  const baseOptions = useMemo(() => safeArray(propOptions), [propOptions]);
  const isMultiLevel = is(multiLevel);
  const isMulti = is(multi);
  const [expandedParent, setExpandedParent] = useState<IOption<T> | null>(null);
  const options = useMemo(() => {
    if (!isMultiLevel || !expandedParent) {
      return baseOptions;
    }

    return [{ ...expandedParent, isParent: true }, ...safeArray(expandedParent.options)];
  }, [baseOptions, expandedParent, isMultiLevel]);

  const listRef = useRef<VirtuosoHandle | null>(null);

  const contentHeight = options.length * rowHeight + MENU_BOTTOM_SPACER + 2;
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
      if (Array.isArray(value) && isMulti) {
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
    [getOptionKey, isMulti, onSelect, value],
  );

  const handleExpand = useCallback((option: IOption<T>) => {
    setExpandedParent(option);
  }, []);

  const handleReturn = useCallback(() => {
    setExpandedParent(null);
  }, []);

  const handleExited = useCallback(() => {
    if (isMultiLevel) {
      setExpandedParent(null);
    }
  }, [isMultiLevel]);

  const normalizedValue = useMemo<T[]>(() => {
    if (isMulti && Array.isArray(value)) {
      return value;
    }

    if (isNil(value) || Array.isArray(value)) {
      return [];
    }

    return [value];
  }, [isMulti, value]);

  const activeKeys = useMemo(
    () => new Set(normalizedValue.map((item) => getOptionKey(item))),
    [normalizedValue, getOptionKey],
  );

  const flatItemData: ItemData<T> = useMemo(
    () => ({
      options,
      value: normalizedValue,
      activeKeys,
      multi: isMulti,
      selectedIndex,
      rowHeight,
      labelComponent,
      getOptionKey,
      onSelect: handleSelect,
    }),
    [
      activeKeys,
      getOptionKey,
      handleSelect,
      isMulti,
      labelComponent,
      normalizedValue,
      options,
      rowHeight,
      selectedIndex,
    ],
  );

  const multiLevelItemData: ItemData<T> = useMemo(
    () => ({
      ...flatItemData,
      search,
      onExpand: handleExpand,
      onReturn: handleReturn,
    }),
    [flatItemData, handleExpand, handleReturn, search],
  );

  const itemData = isMultiLevel ? multiLevelItemData : flatItemData;

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

      return <MenuRow {...rowProps} />;
    },
    [itemData, rowHeight],
  );

  const renderMultiLevelMenuRow = useCallback(
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

      return <MenuRowWithMultiLevels {...rowProps} />;
    },
    [itemData, rowHeight],
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
        components={{ Footer: MenuFooterSpacer }}
        fixedItemHeight={rowHeight}
        initialItemCount={initialItemCount}
        initialTopMostItemIndex={initialTopMostItemIndex}
        computeItemKey={getItemKey}
        itemContent={isMultiLevel ? renderMultiLevelMenuRow : renderMenuRow}
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
