import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Button } from "components/molecules/button";
import { TransformIconWrapper } from "components/shared-styled-components";
import { Body, Label } from "components/typography";
import { Borders, Focus, Icons, Surface, TextColors } from "foundation/colors";
import { Margin, Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
import { If, maybeRender, Nothing } from "helpers/nothing";
import {
  defaultTo,
  is,
  isDefined,
  isEmpty,
  isNil,
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
  IOption,
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
  ${TypographyStyles.Body}
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
  color: ${TextColors.Soft};
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

const ErrorMessage = styled.div<{ $visible?: boolean }>`
  display: ${({ $visible }) => (is($visible) ? "flex" : "none")};
  flex-direction: row;
  width: 100%;
  padding: ${Padding.xxs} ${Padding.none};
  & path {
    fill: ${Icons.Critical};
  }
  div {
    color: ${TextColors.Critical};
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
  color: ${TextColors.Default};
`;

function getSingleValueOption<T>(
  options: IValueProps<T>["options"],
  value: T | undefined,
  getOptionKey: (value: T) => string,
) {
  if (isNil(value)) {
    return undefined;
  }

  const key = getOptionKey(value);
  return safeArray(options).find((option) => getOptionKey(option.value) === key);
}

function renderSingleValueContent<T>(params: {
  isSearchable: boolean;
  isOpen: boolean;
  isFocused: boolean | undefined;
  placeholder?: string;
  searchText: string;
  option?: IOption<T>;
  getOptionKey: (value: T) => string;
  labelComponent?: IValueProps<T>["labelComponent"];
}) {
  const {
    isSearchable,
    isOpen,
    isFocused,
    placeholder,
    searchText,
    option,
    getOptionKey,
    labelComponent,
  } = params;

  if (isSearchable && isOpen) {
    return <Nothing />;
  }

  if (!option && !isFocused && searchText.length === 0) {
    return <Placeholder>{defaultTo(placeholder, DEFAULT_PLACEHOLDER)}</Placeholder>;
  }

  if (!option) {
    return <Nothing />;
  }

  return (
    <ValueComponentSingle<T>
      key={getOptionKey(option.value)}
      option={option}
      labelComponent={labelComponent}
    />
  );
}

function renderMultiValueContent<T>(params: {
  isFocused: boolean | undefined;
  placeholder?: string;
  searchText: string;
  valueOptions: IOption<T>[];
  getOptionKey: (value: T) => string;
  labelComponent?: IValueProps<T>["labelComponent"];
  onOptionRemove: IValueProps<T>["onOptionRemove"];
}) {
  const {
    isFocused,
    placeholder,
    searchText,
    valueOptions,
    getOptionKey,
    labelComponent,
    onOptionRemove,
  } = params;

  if (valueOptions.length === 0 && !isFocused && searchText.length === 0) {
    return <Placeholder>{defaultTo(placeholder, DEFAULT_PLACEHOLDER)}</Placeholder>;
  }

  return valueOptions.map((option) => (
    <ValueComponentMulti<T>
      key={getOptionKey(option.value)}
      option={option}
      labelComponent={labelComponent}
      options={valueOptions}
      onRemove={onOptionRemove}
    />
  ));
}

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
  const isMulti = is(multi);
  const isSearchable = is(searchable);
  const isSimpleSingle = !isMulti && !is(multiLevel);

  const valueOptions = useMemo(() => {
    if (isSimpleSingle && !Array.isArray(value)) {
      const singleOption = getSingleValueOption(options, value, getOptionKey);
      return singleOption ? [singleOption] : [];
    }

    return getValueOptions(options, value, multi, multiLevel, getOptionKey);
  }, [getOptionKey, isSimpleSingle, multi, multiLevel, options, value]);
  const singleValueOption = !isMulti ? valueOptions[0] : undefined;

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

    if (isSearchable) {
      focusSearch();
    }
    onClick();
  }, [disabled, isSearchable, focusSearch, onClick]);

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
    if (isSearchable) {
      onSearch(text);
    }
  }, [onInputChange, onSearch, isSearchable]);

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
        (!isSearchable && event.key !== keys.TAB) ||
        event.key === keys.ENTER ||
        event.key === keys.ARROW_UP ||
        event.key === keys.ARROW_DOWN
      ) {
        event.preventDefault();
      }
    },
    [isSearchable],
  );

  const canSearch = useMemo(() => {
    if (is(disabled) || !isSearchable) {
      return false;
    }
    return is(open) || is(focused);
  }, [disabled, isSearchable, open, focused]);

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

  const showClearer = is(clearable) && valueOptions.length > 0;
  const searchAtStart = !isMulti || valueOptions.length === 0;
  const searchAtEnd = isMulti && valueOptions.length > 0;
  const valueContent = isMulti
    ? renderMultiValueContent({
        isFocused: focused,
        placeholder,
        searchText,
        valueOptions,
        getOptionKey,
        labelComponent,
        onOptionRemove,
      })
    : renderSingleValueContent({
        isSearchable,
        isOpen: is(open),
        isFocused: focused,
        placeholder,
        searchText,
        option: singleValueOption,
        getOptionKey,
        labelComponent,
      });

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
            $multi={isMulti}
            $hasValue={valueOptions.length > 0}
          >
            {searchAtStart ? renderSearch() : null}
            {valueContent}
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
          ) : isSearchable ? (
            <IconMinor.MagnifyingGlass />
          ) : (
            <TransformIconWrapper $rotate={open} aria-hidden="true">
              <IconMinor.ChevronDownSolid />
            </TransformIconWrapper>
          )}
        </ValueRight>
      </ValueContainer>

      {safeArray(errors).map((e) => (
        <ErrorMessage $visible={!open} key={e.message}>
          <IconMinor.CircleExclamation />
          <Body>{e.message}</Body>
        </ErrorMessage>
      ))}
    </>
  );
};

const Value = memo(ValueImpl) as <T>(props: IValueProps<T>) => JSX.Element;
export default Value;
