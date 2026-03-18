import { Flex } from "components/layout";
import { Heading4, Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Margin, Padding } from "foundation/spacing";
import { If, maybeRender } from "helpers/nothing";
import {
  defaultTo,
  is,
  isDefined,
  isEmpty,
  isNil,
  safeArray,
} from "helpers/safe-navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import {
  DEFAULT_EMPTY_TEXT,
  DEFAULT_ROW_HEIGHT,
  IOption,
  MenuComponentProps,
} from "../types";
import { CheckIcon, EmptyOptionItem, SelectLabel } from "./helpers";

const MenuListFrame = styled.div<{ $height?: number }>`
  border: 1px solid ${Borders.Default.Subdued};
  background-color: ${Surface.Default.Default};
  position: absolute;
  height: ${(props) => props.$height}px;
  max-height: ${(props) => props.$height}px;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 10px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    min-height: 50px;
    border: 2px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 1em;
    background-color: ${Surface.Neutral.Default};
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  ${shadowMd};
`;

const MenuRow = styled(Flex).attrs({ justify: "space-between" })<{ $active?: boolean }>`
  border: none;
  text-align: left;
  padding: ${Padding.s};
  margin: ${Margin.none} ${Margin.xxs};
  background-color: ${({ $active }) =>
    is($active) ? Surface.Selected.Default : Surface.Default.Default};
  border-radius: 6px;

  i:first-child {
    align-self: start;
    margin-right: ${Margin.s};
  }
  i:last-child {
    align-self: center;
  }
  &:first-of-type {
    margin-top: ${Margin.xxs};
  }
  &:last-of-type {
    margin-bottom: ${Margin.xxs};
  }

  &:hover {
    background-color: ${({ $active }) =>
      is($active) ? Surface.Selected.Hover : Surface.Default.Hover};
  }

  &:active {
    background-color: ${({ $active }) =>
      is($active) ? Surface.Selected.Pressed : Surface.Default.Pressed};
  }
`;

const OptionLabel = styled(Label)`
  cursor: pointer;
`;

const ValueWrapper = styled.div`
  width: 100%;
`;

const TitleRow = styled(Heading4)`
  height: 44px;
  margin: ${Margin.none} ${Margin.xxs};
  border-bottom: 1px solid ${Borders.Default.Subdued};
  display: flex;
  align-items: center;
  padding-left: ${Padding.s};
`;

type RowProps<T> = Omit<MenuComponentProps<T>, "onSelect" | "open"> & {
  index: number;
  handleClick: (option: IOption<T>) => void;
};

// eslint-disable-next-line comma-spacing
const Row = <T,>({
  index,
  value,
  multi,
  options = [],
  handleClick,
  getOptionKey,
}: RowProps<T>) => {
  const hasIcon = safeArray(options).some((option) =>
    isDefined(option["icon"]),
  );

  const currentValue = useMemo<T[]>(() => {
    if (is(multi) && Array.isArray(value)) {
      return value;
    }
    if (isNil(value) || Array.isArray(value)) {
      return [];
    }
    return [value];
  }, [value, multi]);

  const option = options[index];

  return (
    <MenuRow
      className="menu-row"
      align="center"
      $active={currentValue.some(
        (val) => getOptionKey(val) === getOptionKey(option.value),
      )}
      onClick={() => handleClick(option)}
    >
      <If is={hasIcon}>{option["icon"]}</If>
      <ValueWrapper>
        <OptionLabel>{option.label}</OptionLabel>
        <If is={option["helperText"]}>
          <OptionLabel subdued>{option["helperText"]}</OptionLabel>
        </If>
      </ValueWrapper>
      {maybeRender(
        currentValue.some(
          (val) => getOptionKey(val) === getOptionKey(option.value),
        ),
        <CheckIcon />,
      )}
    </MenuRow>
  );
};

// eslint-disable-next-line comma-spacing
export const MenuList = <T,>({
  open,
  value,
  selectedIndex,
  rowHeight,
  multi,
  menuPosition,
  menuHeight = 184,
  options,
  emptyText,
  menuTitle,
  search,
  onSelect,
  getOptionKey,
}: MenuComponentProps<T>) => {
  const safeOptions = safeArray(options);

  const optionsHeight = safeOptions.reduce((acc, obj) => {
    return acc + (isDefined(obj["helperText"]) ? 72 : 52);
  }, 0);

  const height = Math.min(Math.max(optionsHeight, 40), menuHeight);

  const list = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (option: IOption<T>) => {
      const newValue =
        Array.isArray(value) && is(multi)
          ? [...value, option.value]
          : option.value;
      onSelect(newValue, option);
    },
    [multi, onSelect, value],
  );

  useEffect(() => {
    if (is(open) && isDefined(list.current) && isDefined(selectedIndex)) {
      list.current.scrollTo(
        0,
        selectedIndex * (defaultTo(rowHeight, DEFAULT_ROW_HEIGHT) + 4),
      );
    }
  }, [open, selectedIndex, rowHeight]);

  if (safeOptions.length === 0) {
    return (
      <EmptyOptionItem $menuPosition={menuPosition}>
        <SelectLabel>
          <p>{defaultTo(emptyText, DEFAULT_EMPTY_TEXT)}</p>
        </SelectLabel>
      </EmptyOptionItem>
    );
  }

  return (
    <MenuListFrame $height={height} ref={list}>
      {maybeRender(
        isDefined(menuTitle) && (isNil(search) || isEmpty(search)),
        <TitleRow>{menuTitle}</TitleRow>,
      )}

      {safeOptions.map((option, index) => (
        <Row<T>
          key={option.label}
          index={index}
          handleClick={handleClick}
          value={value}
          multi={multi}
          options={safeOptions}
          getOptionKey={getOptionKey}
        />
      ))}
    </MenuListFrame>
  );
};
