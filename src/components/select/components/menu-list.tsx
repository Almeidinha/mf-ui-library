import { SpaceBetween } from "components/layout";
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

const MenuRow = styled(SpaceBetween)<{ $active?: boolean }>`
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

type RowProps<T> = MenuComponentProps<T> & {
  index: number;
  handleClick: (option: IOption<T>) => void;
};

// eslint-disable-next-line comma-spacing
const Row = <T,>(props: RowProps<T>) => {
  const { index, options = [], handleClick, getOptionKey } = props;

  const hasIcon = safeArray(options).some((option) =>
    isDefined(option["icon"]),
  );

  const currentValue = useMemo<T[]>(() => {
    if (is(props.multi) && Array.isArray(props.value)) {
      return props.value;
    }
    if (isNil(props.value) || Array.isArray(props.value)) {
      return [];
    }
    return [props.value];
  }, [props.value, props.multi]);

  const option = options[index];

  return (
    <MenuRow
      className="menu-row"
      center
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
export const MenuList = <T,>(props: MenuComponentProps<T>) => {
  const { menuHeight = 184 } = props;

  const options = safeArray(props.options);

  const optionsHeight = options.reduce((acc, obj) => {
    return acc + (isDefined(obj["helperText"]) ? 72 : 52);
  }, 0);

  const height = Math.min(Math.max(optionsHeight, 40), menuHeight);

  const list = useRef<HTMLDivElement>(null);

  const { open, selectedIndex, rowHeight, menuPosition } = props;

  const handleClick = useCallback(
    (option: IOption<T>) => {
      const newValue =
        Array.isArray(props.value) && is(props.multi)
          ? [...props.value, option.value]
          : option.value;
      props.onSelect(newValue, option);
    },
    [props],
  );

  useEffect(() => {
    if (is(open) && isDefined(list.current) && isDefined(selectedIndex)) {
      list.current.scrollTo(
        0,
        selectedIndex * (defaultTo(rowHeight, DEFAULT_ROW_HEIGHT) + 4),
      );
    }
  }, [open, selectedIndex, rowHeight]);

  if (options.length === 0) {
    const { emptyText } = props;
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
        isDefined(props.menuTitle) &&
          (isNil(props.search) || isEmpty(props.search)),
        <TitleRow>{props.menuTitle}</TitleRow>,
      )}

      {options.map((_, index) => (
        <Row<T>
          key={index}
          index={index}
          handleClick={handleClick}
          {...props}
        />
      ))}
    </MenuListFrame>
  );
};
