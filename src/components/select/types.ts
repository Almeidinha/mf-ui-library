import { FC } from "@helpers";
import { IconListMajor, IconNames } from "components/icon/icon-list";
import { Placement } from "helpers/portal-position";
import React, { CSSProperties, HTMLAttributes, RefObject } from "react";

type SelectIconType = (typeof IconListMajor)[IconNames];

export interface IOption<T> {
  value: T;
  disabled?: boolean;
  label: string;
  [key: string]: unknown;
  options?: IOption<T>[];
  isParent?: boolean;
  isExpanded?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
}

export type LabelComponentProps<T> = {
  value: T;
  active: boolean;
  type: "value-single" | "value-multi" | "option";
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  [key: string]: unknown;
};

export type SelectLabelComponent<T> = FC<LabelComponentProps<T>>;
export type SelectMenuComponent<T> = FC<MenuComponentProps<T>>;

interface SelectCommonProps<T> {
  className?: string;
  id?: string;
  style?: CSSProperties;
  options?: IOption<T>[];
  placeholder?: string;
  emptyText?: string;
  clearable?: boolean;
  searchable?: boolean;
  searchDebounce?: number;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  invalid?: boolean;
  errors?: { message: string }[];
  rowHeight?: number;
  menuHeight?: number;
  menuPosition?: "top" | "bottom";
  menuTitle?: string;
  label?: string;
  labelPosition?: "top" | "side";
  labelComponent?: SelectLabelComponent<T>;
  menuComponent?: SelectMenuComponent<T>;
  maxLength?: number;
  multiLevel?: boolean;

  disablePortal?: boolean;
  portalContainer?: HTMLElement;
  portalPlacement?: Placement;
  portalOffset?: number;
  viewportPadding?: number;
  matchAnchorWidth?: boolean;

  filterBehavior?: (this: void, search: string, option: IOption<T>) => boolean;
  getOptionKey?: (this: void, value: T) => string;
  onSearch?(this: void, value: string): void;
  onOpen?: (this: void) => void;
  onClose?: (this: void) => void;
  onInputChange?: (this: void, value: string) => void;

  customIcon?: SelectIconType;

  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

type SelectSingleProps<T> = SelectCommonProps<T> & {
  multi?: false | undefined;
  value?: T;
  onChange?(this: void, value: T | undefined, option?: IOption<T>): void;
};

type SelectMultiProps<T> = SelectCommonProps<T> & {
  multi: true;
  value?: T[];
  onChange?(this: void, value: T[], option?: IOption<T>): void;
};

export type ISelectProps<T> = SelectSingleProps<T> | SelectMultiProps<T>;

export type IValueProps<T> = {
  options?: IOption<T>[];
  value: T | T[] | undefined;
  placeholder?: string;
  clearable?: boolean;
  searchable?: boolean;
  iconPosition?: "left" | "right";

  labelComponent?: SelectLabelComponent<T>;

  disabled?: boolean;
  invalid?: boolean;
  errors?: { message: string }[];
  search?: string;
  open: boolean;
  focused?: boolean;
  multi?: boolean;
  multiLevel?: boolean;
  labelId: string;

  label?: string;
  labelPosition?: "top" | "side";
  maxLength?: number;

  onClear(this: void): void;
  onClick(this: void): void;
  onSearch(this: void, search: string): void;
  onSearchFocus(this: void): void;
  onSearchBlur(this: void): void;

  getOptionKey?: (value: T) => string;
  onInputChange?(this: void, value: string): void;
  onOptionRemove: (value: T) => void;

  customIcon?: SelectIconType;
};

export interface IMenuContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  menuTop?: number;
  menuHeight?: RectSize;
  menuPosition?: "top" | "bottom";
  invalid?: boolean;
  labelPosition?: string;
  label?: string;
  children?: React.ReactNode;
  disableInlinePosition?: boolean;
  onRef?(el: HTMLDivElement | undefined): void;
  onClick?(this: void, el: React.MouseEvent<HTMLDivElement>): void;
}

export type MenuPortalProps = {
  disablePortal?: boolean;
  portalContainer?: HTMLElement;
  anchorRef?: RefObject<HTMLElement | null>;
  portalPlacement?: Placement;
  portalOffset?: number;
  viewportPadding?: number;
  matchAnchorWidth?: boolean;
};

type RectSize = number | "auto";

export interface IValueComponentSingleProps<T> {
  className?: string;
  option: IOption<T>;
  labelComponent?: SelectLabelComponent<T>;
}

export interface IValueComponentMultiProps<T> {
  className?: string;
  option: IOption<T>;
  labelComponent?: SelectLabelComponent<T>;
  options: IOption<T>[];
  onRemove(this: void, value: T): void;
}

export interface ItemData<T> {
  options: IOption<T>[];
  value: T[];
  multi?: boolean;
  selectedIndex?: number;
  rowHeight?: number;
  search?: string;
  labelComponent?: SelectLabelComponent<T>;

  getOptionKey: (value: T) => string;
  onSelect: (value: T, option: IOption<T>) => void;
  onExpand?: (option: IOption<T>) => void;
  onReturn?: () => void;
}

export type MenuComponentProps<T> = {
  options?: IOption<T>[];
  value?: T | T[];

  labelComponent?: SelectLabelComponent<T>;
  menuComponent?: SelectMenuComponent<T>;
  emptyText?: string;

  multi?: boolean;
  rowHeight?: number;
  menuHeight?: number;
  menuPosition?: "top" | "bottom";

  invalid?: boolean;
  selectedIndex?: number;
  open: boolean;
  search?: string;

  labelPosition?: string;
  label?: string;
  menuTitle?: string;
  multiLevel?: boolean;
  className?: string;

  disablePortal?: boolean;
  portalContainer?: HTMLElement;
  anchorRef?: RefObject<HTMLElement | null>;
  portalPlacement?: Placement;
  portalOffset?: number;
  viewportPadding?: number;
  matchAnchorWidth?: boolean;

  getOptionKey: (value: T) => string;
  onSelect(this: void, value: T | T[] | undefined, option?: IOption<T>): void;
  onExpand?(this: void, option: IOption<T>): void;
  onReturn?(this: void): void;
};

export interface IPosition {
  menuPosition?: "top" | "bottom";
  menuHeight?: RectSize;
  label?: string;
  labelPosition?: string;
}

export interface IMenuRowProps<T> {
  index: number;
  data: ItemData<T>;
  style?: CSSProperties;
}

export type OptionItemState = "default" | "active" | "selected";

export const DEFAULT_ROW_HEIGHT = 42;
export const DEFAULT_MENU_HEIGHT = 190;
export const DEFAULT_EMPTY_TEXT = "No results found";
export const DEFAULT_PLACEHOLDER = "Select Something";

export const enum menuPositionType {
  TOP = "top",
  BOTTOM = "bottom",
}

export const enum labelPositionType {
  TOP = "top",
  SIDE = "side",
}

export const enum iconPositionType {
  LEFT = "left",
  RIGHT = "right",
}
