import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { TransformIconWrapper } from "components/shared-styled-components";
import { Body, Label } from "components/typography";
import { Borders, Focus, Icons, Surface, Text } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { If, maybeRender, Nothing } from "helpers/nothing";
import {
  defaultTo,
  is,
  isDefined,
  isEmpty,
  safeArray,
} from "helpers/safe-navigation";
import React, {
  JSX,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";

import {
  DEFAULT_PLACEHOLDER,
  iconPositionType,
  IValueProps,
  labelPositionType,
} from "../types";
import { defaultGetOptionKey, getValueOptions, keys } from "../utils";
import ValueComponentMulti from "./value-component-multi";
import ValueComponentSingle from "./value-component-single";

interface IValueContainerProps {
  disabled?: boolean;
  $invalid?: boolean;
  $menuIsOpen?: boolean;
  $iconPosition?: "left" | "right";
}

const ValueContainer = styled(Flex).attrs({
  justify: "space-between",
})<IValueContainerProps>`
  pointer-events: ${({ disabled }) => (is(disabled) ? "none" : "auto")};
  padding: ${Padding.xs} ${Padding.none};
  background: ${({ $invalid, disabled }) =>
    is($invalid)
      ? Surface.Critical.Muted
      : is(disabled)
        ? Surface.Default.Muted
        : Surface.Default.Default};
  cursor: default;
  border: 1px solid
    ${({ $invalid }) =>
      is($invalid) ? Borders.Critical.Default : Borders.Default.Default};
  border-radius: 6px;
  outline-offset: -2px;

  flex-direction: ${({ $iconPosition }) =>
    is($iconPosition === iconPositionType.LEFT) ? "row-reverse" : "row"};

  ${({ $menuIsOpen }) =>
    is($menuIsOpen) &&
    css`
      outline: 2px solid ${Focus.Default};
    `}

  ${({ disabled }) =>
    is(disabled) &&
    `
    &:focus-visible {
      outline: none;
    }
  `}
  
  ${({ disabled, $invalid }) =>
    !is(disabled) &&
    `
    &:focus  {
      outline: 2px solid ${$invalid ? Focus.Critical : Focus.Default};
    }

    &:focus-within {
      outline: 2px solid ${$invalid ? Focus.Critical : Focus.Default};
    }
  `}
`;

const ValueWrapper = styled(Flex)<{
  $label?: string;
  $labelPosition?: string;
  $iconPosition?: string;
}>`
  width: 100%;
  padding-right: ${Padding.xs};
  display: ${({ $label, $labelPosition }) =>
    isDefined($label) &&
    !isEmpty($label) &&
    $labelPosition === labelPositionType.TOP
      ? "block"
      : "flex"};

  flex-direction: ${({ $iconPosition }) =>
    is($iconPosition === iconPositionType.LEFT) ? "row-reverse" : "row"};
`;

const ValueLabel = styled(Label)<{ $labelPosition: string | undefined }>`
  padding-left: ${Padding.s};
  margin-bottom: ${({ $labelPosition }) =>
    $labelPosition === labelPositionType.TOP ? Margin.xxs : Margin.none};
  display: flex;
  align-self: ${({ $labelPosition }) =>
    $labelPosition === labelPositionType.TOP ? "flex-start" : "center"};
  width: fit-content;
  white-space: pre;
  ${({ $labelPosition }) =>
    $labelPosition === labelPositionType.TOP &&
    css`
      flex-basis: 100%;
    `}
`;

const ValueLeft = styled(Flex)<{ $multi?: boolean; $hasValue?: boolean }>`
  padding-left: ${Padding.s};
  width: 100%;
  flex-wrap: ${({ $multi, $hasValue }) =>
    is($multi) && is($hasValue) ? "wrap" : "nowrap"};
  user-select: none;
  min-width: 0;
  min-height: 20px;
  box-sizing: border-box;
  gap: ${({ $multi, $hasValue }) => (is($multi) && is($hasValue) ? "4px" : 0)};
  ${Typography.Body}
`;

const ValueRight = styled(Flex)<{ $iconPosition?: "left" | "right" }>`
  padding-right: ${({ $iconPosition }) =>
    is($iconPosition !== iconPositionType.LEFT)
      ? `${Padding.xs}`
      : `${Padding.none}`};
  padding-left: ${({ $iconPosition }) =>
    is($iconPosition === iconPositionType.LEFT)
      ? `${Padding.xs}`
      : `${Padding.none}`};
  cursor: pointer;
`;

const Placeholder = styled(Label)`
  pointer-events: none;
  color: ${Text.Soft};
`;

const ClearButton = styled(Button).attrs<{ plain?: boolean; subtle?: boolean }>(
  {
    plain: true,
    subtle: true,
  },
)`
  padding: ${Padding.none};
  margin-right: ${Margin.none};
  gap: 0;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: transparent;
  }
`;

const ErrorMessage = styled.div<{ visible?: boolean }>`
  display: ${({ visible }) => (is(visible) ? "flex" : "none")};
  flex-direction: row;
  width: 100%;
  padding: ${Padding.xxs} ${Padding.none};
  & path {
    fill: ${Icons.Critical};
  }
  div {
    color: ${Text.Critical};
    margin: ${Margin.none} ${Margin.xxs};
  }
`;

const SearchSpan = styled.span<{ $canSearch: boolean }>`
  min-width: 1px;
  margin-left: -1px;
  user-select: text;
  opacity: ${({ $canSearch }) => (is($canSearch) ? 1 : 0)};
  position: ${({ $canSearch }) => (is($canSearch) ? "relative" : "absolute")};
  left: ${({ $canSearch }) => (is($canSearch) ? "1px" : "0")};
  outline: none;
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${Text.Default};
`;

// eslint-disable-next-line comma-spacing
const ValueImpl = <T,>({
  options = [],
  value,
  disabled,
  clearable,
  open,
  multi,
  maxLength,
  multiLevel,
  focused,
  invalid,
  errors,
  label,
  searchable,
  labelPosition = labelPositionType.TOP,
  iconPosition,
  customIcon,
  labelId,
  placeholder,
  labelComponent,
  onOptionRemove,
  onClick,
  onClear,
  onSearchBlur,
  onInputChange,
  onSearch,
  onSearchFocus,
  getOptionKey = defaultGetOptionKey,
}: IValueProps<T>) => {
  const searchRef = useRef<HTMLSpanElement>(null);
  const [searchText, setSearchText] = useState("");

  const valueOptions = useMemo(() => {
    return getValueOptions(options, value, multi, multiLevel, getOptionKey);
  }, [options, value, multi, multiLevel, getOptionKey]);

  const clearSearch = useCallback(() => {
    if (searchRef.current) {
      searchRef.current.innerText = "";
    }
    setSearchText("");
  }, []);

  const focusSearch = useCallback(() => {
    searchRef.current?.focus();
  }, []);

  const onContainerClick = useCallback(() => {
    if (is(disabled)) {
      return;
    }

    if (is(searchable)) {
      focusSearch();
    }
    onClick();
  }, [disabled, searchable, focusSearch, onClick]);

  const handleOnClear = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onClear();
      clearSearch();
    },
    [onClear, clearSearch],
  );

  const handleOnSearchBlur = useCallback(() => {
    clearSearch();
    onSearchBlur?.();
  }, [clearSearch, onSearchBlur]);

  const emitSearch = useCallback(() => {
    const text = (searchRef.current?.innerText ?? "").trim();

    setSearchText(text);

    onInputChange?.(text);
    if (is(searchable)) {
      onSearch(text);
    }
  }, [onInputChange, onSearch, searchable]);

  const onBeforeInput = useCallback(
    (event: React.FormEvent<HTMLSpanElement>) => {
      if (!isDefined(maxLength)) {
        return;
      }

      const nativeEvent = event.nativeEvent;
      if (!(nativeEvent instanceof InputEvent)) {
        return;
      }

      const inputType = nativeEvent.inputType;
      if (inputType.startsWith("delete")) {
        return;
      }

      const current = searchRef.current?.innerText ?? "";
      const incoming =
        typeof nativeEvent.data === "string" ? nativeEvent.data : "";
      const nextLen = current.length + incoming.length;

      if (nextLen > maxLength) {
        event.preventDefault();
      }
    },
    [maxLength],
  );

  const onSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (
        (!is(searchable) && event.key !== keys.TAB) ||
        event.key === keys.ENTER ||
        event.key === keys.ARROW_UP ||
        event.key === keys.ARROW_DOWN
      ) {
        event.preventDefault();
      }
    },
    [searchable],
  );

  const canSearch = useMemo(() => {
    if (is(disabled) || !is(searchable)) {
      return false;
    }
    return is(open) || is(focused);
  }, [disabled, searchable, open, focused]);

  const renderSearch = () => {
    if (!canSearch) {
      return <Nothing />;
    }

    return (
      <SearchSpan
        className="search"
        contentEditable
        $canSearch={canSearch}
        role="textbox"
        aria-multiline={false}
        aria-label="Search"
        spellCheck={false}
        onInput={emitSearch}
        onKeyDown={onSearchKeyDown}
        onBeforeInput={onBeforeInput}
        onBlur={handleOnSearchBlur}
        ref={searchRef}
      />
    );
  };

  const renderLabel = () => {
    return maybeRender(
      label,
      <ValueLabel id={labelId} $labelPosition={labelPosition} subtle muted>
        {label}
      </ValueLabel>,
    );
  };

  const renderValues = () => {
    if (is(searchable) && is(open) && !is(multi)) {
      return <Nothing />;
    }

    const shouldDisplayPlaceholder =
      valueOptions.length === 0 && !focused && searchText.length === 0;

    if (shouldDisplayPlaceholder) {
      return (
        <Placeholder>{defaultTo(placeholder, DEFAULT_PLACEHOLDER)}</Placeholder>
      );
    }

    return valueOptions.map((option) =>
      is(multi) ? (
        <ValueComponentMulti<T>
          key={getOptionKey(option.value)}
          option={option}
          labelComponent={labelComponent}
          options={valueOptions}
          onRemove={onOptionRemove}
        />
      ) : (
        <ValueComponentSingle<T>
          key={getOptionKey(option.value)}
          option={option}
          labelComponent={labelComponent}
        />
      ),
    );
  };

  const showClearer = is(clearable) && valueOptions.length > 0;
  const searchAtStart = !is(multi) || valueOptions.length === 0;
  const searchAtEnd = is(multi) && valueOptions.length > 0;

  return (
    <>
      <ValueContainer
        data-role="value"
        className="select-value"
        disabled={disabled}
        $invalid={invalid}
        $menuIsOpen={open}
        tabIndex={0}
        onClick={onContainerClick}
        align="center"
        $iconPosition={iconPosition}
        onFocus={onSearchFocus}
      >
        <ValueWrapper
          $label={label}
          $labelPosition={labelPosition}
          $iconPosition={iconPosition}
        >
          {renderLabel()}

          <ValueLeft
            className="value-left"
            $multi={multi}
            $hasValue={valueOptions.length > 0}
          >
            {searchAtStart ? renderSearch() : null}
            {renderValues()}
            {searchAtEnd ? renderSearch() : null}
          </ValueLeft>
        </ValueWrapper>
        <If is={showClearer}>
          <ClearButton
            tabIndex={-1}
            className="clearer"
            onClick={handleOnClear}
            IconPrefix={IconMinor.Xmark}
            plain
            subtle
          />
        </If>
        <ValueRight
          className="value-right"
          align="center"
          $iconPosition={iconPosition}
        >
          {isDefined(customIcon) ? (
            customIcon
          ) : is(searchable) ? (
            <IconMinor.MagnifyingGlass />
          ) : (
            <TransformIconWrapper $rotate={open} aria-hidden="true">
              <IconMinor.ChevronDownSolid />
            </TransformIconWrapper>
          )}
        </ValueRight>
      </ValueContainer>

      {safeArray(errors).map((e) => (
        <ErrorMessage visible={!open} key={e.message}>
          <IconMinor.CircleExclamation />
          <Body>{e.message}</Body>
        </ErrorMessage>
      ))}
    </>
  );
};

const Value = memo(ValueImpl) as <T>(props: IValueProps<T>) => JSX.Element;
export default Value;
