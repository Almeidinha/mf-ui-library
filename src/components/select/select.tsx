import {
  defaultTo,
  forwardRef,
  is,
  isDefined,
  isNil,
  PropsWithChildren,
  safeArray,
} from "@helpers";
import { useMergedRefs, useOnClickOutside } from "hooks";
import React, { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";

import { Menu } from "./components/menu";
import Value from "./components/value";
import { IOption, ISelectProps } from "./types";
import { defaultGetOptionKey, keys } from "./utils";

const Container = styled.div<{ disabled?: boolean }>`
  position: relative;
  cursor: default;
  width: 100%;
  box-sizing: border-box;
  pointer-events: ${({ disabled }) => (is(disabled) ? "none" : "auto")};
  opacity: ${({ disabled }) => (is(disabled) ? 0.75 : 1)};
  user-select: none;
`;

/**
 *
 * TODO: IMPLEMENT LOADING STATE
 */
// eslint-disable-next-line comma-spacing
const SelectImpl = <T,>(
  props: ISelectProps<T>,
  selectRef: React.ForwardedRef<HTMLDivElement>,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined,
  );
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [focused, setFocused] = useState<boolean>(false);

  const {
    className,
    id,
    style,
    clearable,
    placeholder,
    value: selectValue,
    disabled,
    invalid,
    errors,
    labelComponent,
    menuComponent,
    multi,
    emptyText,
    rowHeight,
    menuHeight,
    menuTitle,
    menuPosition,
    label,
    labelPosition,
    customIcon,
    multiLevel,
    ariaLabel,
    searchable,
    ariaLabelledBy,
    ariaDescribedBy,
    onOpen,
    onClose,
    onInputChange,
    filterBehavior: filterResults = (searchValue: string, option: IOption<T>) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
  } = props;

  const value = is(multi) ? defaultTo(selectValue, []) : selectValue;

  const getOptionKey = props.getOptionKey ?? defaultGetOptionKey;
  const iconPosition = props.iconPosition;
  const labelId = id
    ? `${id}-label`
    : `label-${label?.replace(/\s+/g, "-").toLocaleLowerCase()}`;

  const options = useMemo((): IOption<T>[] => {
    const base = defaultTo(props.options, []);
    if (!isDefined(search) || search === "") {
      return base;
    }

    return safeArray(base).filter((option) => filterResults(search, option));
  }, [props.options, search, filterResults]);

  const openMenu = useCallback(() => {
    setOpen(true);
    setSearch(search);

    const singleValue = !Array.isArray(value) ? value : undefined;

    setSelectedIndex(
      singleValue === undefined
        ? undefined
        : options.findIndex(
            (o) => getOptionKey(o.value) === getOptionKey(singleValue),
          ),
    );

    onOpen?.();
  }, [value, search, options, getOptionKey, onOpen]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setFocused(false);
    setSearch(undefined);
    setSelectedIndex(undefined);
    onClose?.();
  }, [onClose]);

  const clickAwayRef = useOnClickOutside((event: Event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest?.(".select-menu")) {
      return;
    }
    closeMenu();
  });

  const mergedRef = useMergedRefs<HTMLDivElement>(selectRef, clickAwayRef);

  const onOptionSelect = useCallback(
    (nextValue: T | undefined | T[], option?: IOption<T>) => {
      const callOnChangeSingle = (v: T | undefined, opt?: IOption<T>) => {
        if (props.multi === true) {
          return;
        }
        props.onChange?.(v, opt);
      };

      const callOnChangeMulti = (v: T[], opt?: IOption<T>) => {
        if (props.multi !== true) {
          return;
        }
        props.onChange?.(v, opt);
      };

      if (is(multi)) {
        callOnChangeMulti(nextValue as T[], option);
        return;
      }

      const single = Array.isArray(nextValue) ? undefined : nextValue;
      callOnChangeSingle(single, option);

      closeMenu();
    },
    [multi, props, closeMenu],
  );

  const toggleMenu = useCallback((): void => {
    if (!open) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [closeMenu, open, openMenu]);

  const getNewSelectedIndex = useCallback(
    (key: string): number | undefined => {
      if (options.length === 0) {
        return undefined;
      }
      if (isNil(selectedIndex)) {
        return 0;
      }

      let next = selectedIndex;

      if (key === keys.ARROW_UP) {
        next = next - 1;
        if (next < 0) {
          next = options.length - 1;
        }
      }

      if (key === keys.ARROW_DOWN) {
        next = next === options.length - 1 ? 0 : next + 1;
      }

      return next;
    },
    [options.length, selectedIndex],
  );

  function onKeyDown(e: React.KeyboardEvent): void {
    const { key } = e;

    switch (key) {
      case keys.TAB:
        if (open) {
          closeMenu();
        }
        break;

      case keys.ARROW_UP:
      case keys.ARROW_DOWN:
        e.preventDefault();

        if (open) {
          setSelectedIndex(getNewSelectedIndex(key));
        } else {
          openMenu();
        }
        break;
    }
  }

  function onKeyUp(e: React.KeyboardEvent): void {
    const { key } = e;

    switch (key) {
      case keys.ENTER: {
        if (!open) {
          openMenu();
          return;
        }

        if (selectedIndex === undefined) {
          return;
        }
        const option = options[selectedIndex];
        if (!isDefined(option)) {
          return;
        }

        const newValue = option.value;

        if (Array.isArray(value) && is(multi)) {
          const k = getOptionKey(newValue);
          const exists = value.some((v) => getOptionKey(v) === k);
          const next = exists
            ? value.filter((v) => getOptionKey(v) !== k)
            : [...value, newValue];
          onOptionSelect(next, option);
        } else {
          onOptionSelect(newValue, option);
        }
        break;
      }

      case keys.ESC:
        if (open) {
          closeMenu();
        }
        break;
    }
  }

  function onClear() {
    setFocused(false);
    setSearch(undefined);
    setSelectedIndex(undefined);
    onOptionSelect(is(multi) ? [] : undefined);
  }

  function onSearch(searchValue: string): void {
    setSearch(searchValue);
    setOpen(true);
    setSelectedIndex(0);
    props.onSearch?.(searchValue);
  }

  function onSearchFocus() {
    setFocused(true);
  }

  function onSearchBlur() {
    setFocused(false);
  }

  function onOptionRemove(removedValue: T): void {
    //TODO check is need to chec for array
    if (Array.isArray(value) && is(multi)) {
      const removedKey = getOptionKey(removedValue);
      const next = value.filter((v) => getOptionKey(v) !== removedKey);
      onOptionSelect(next);
    }
  }

  const classNames = [
    "select",
    className,
    open && "open",
    is(invalid) && "has-error",
  ].filter(Boolean);

  return (
    <Container
      id={id}
      style={style}
      disabled={disabled}
      ref={mergedRef}
      className={classNames.join(" ")}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      role="combobox"
      aria-expanded={open}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy ?? labelId}
      aria-describedby={ariaDescribedBy}
    >
      <Value
        clearable={clearable}
        searchable={searchable}
        iconPosition={iconPosition}
        open={open}
        disabled={disabled}
        multi={multi}
        focused={focused}
        options={props.options}
        placeholder={placeholder}
        invalid={invalid}
        errors={errors}
        value={value}
        search={search}
        label={label}
        labelPosition={labelPosition}
        labelComponent={labelComponent}
        onClear={onClear}
        onClick={toggleMenu}
        onSearch={onSearch}
        onSearchFocus={onSearchFocus}
        onSearchBlur={onSearchBlur}
        onOptionRemove={onOptionRemove}
        onInputChange={onInputChange}
        maxLength={props.maxLength}
        customIcon={customIcon}
        multiLevel={multiLevel}
        labelId={labelId}
      />
      <Menu
        open={open}
        options={options}
        value={value}
        multi={multi}
        invalid={invalid}
        search={search}
        label={label}
        labelPosition={labelPosition}
        selectedIndex={selectedIndex}
        labelComponent={labelComponent}
        menuComponent={menuComponent}
        emptyText={emptyText}
        rowHeight={rowHeight}
        menuTitle={menuTitle}
        menuHeight={menuHeight}
        menuPosition={menuPosition}
        onSelect={onOptionSelect}
        multiLevel={multiLevel}
        getOptionKey={getOptionKey}
      />
    </Container>
  );
};

export const Select = forwardRef(SelectImpl) as <T>(
  props: PropsWithChildren<ISelectProps<T>> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => ReturnType<typeof SelectImpl>;
