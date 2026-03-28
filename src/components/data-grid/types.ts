import { GroupedBodyEntry } from "components/data-table/dataTable.shared";
import { ResolvedBodyCell } from "components/data-table/useDataTableBodySpans";
import {
  ComponentType,
  HTMLAttributes,
  Key,
  ReactNode,
  RefObject,
} from "react";
import { CSSProperties } from "styled-components";

import type {
  DataTableProps,
  DataTableRegularColumn,
} from "../data-table/types";

export type {
  DataTableAction as DataGridAction,
  DataTableActionsColumn as DataGridActionsColumn,
  DataTableAlign as DataGridAlign,
  DataTableCellOverflow as DataGridCellOverflow,
  DataTableColumn as DataGridColumn,
  DataTableColumnGroup as DataGridColumnGroup,
  DataTableColumnManagerMode as DataGridColumnManagerMode,
  DataTableColumnVisibility as DataGridColumnVisibility,
  DataTableDataSource as DataGridDataSource,
  DataTableDataSourceCache as DataGridDataSourceCache,
  DataTableGetRowsParams as DataGridGetRowsParams,
  DataTableGetRowsResponse as DataGridGetRowsResponse,
  DataTableGroupValue as DataGridGroupValue,
  DataTableLayoutMode as DataGridLayoutMode,
  DataTablePin as DataGridPin,
  DataTablePinnedColumns as DataGridPinnedColumns,
  DataTableRegularColumn as DataGridRegularColumn,
  DataTableRowGrouping as DataGridRowGrouping,
  DataTableRowKey as DataGridRowKey,
  DataTableServerFilter as DataGridServerFilter,
  DataTableSize as DataGridSize,
  SortDirection as DataGridSortDirection,
  DataTableSpanArgs as DataGridSpanArgs,
  DataTableSpanValue as DataGridSpanValue,
} from "../data-table/types";

export type DataGridProps<T extends Record<string, unknown>> =
  DataTableProps<T> & {
    cellSelection?: boolean;
  };

export type GridCellStyleProps = {
  $sticky?: boolean;
  $fitContent?: boolean;
  $allowOverflow?: boolean;
  $borderRight?: boolean;
  $borderBottom?: boolean;
  $focused?: boolean;
  $showCellBorders?: boolean;
};

export type DataGridCssVariables = CSSProperties & {
  "--data-table-cell-padding"?: string;
  "--data-table-header-divider-inset"?: string;
  "--data-table-shell-padding"?: string;
};

export type ActionDescriptor<T extends Record<string, unknown>> = {
  key: string;
  label: ReactNode;
  onClick: (row: T) => void;
  disabled?: boolean | ((row: T) => boolean);
  destructive?: boolean;
  icon?: ComponentType;
};

export type FocusableGridCellKind =
  | "body-checkbox"
  | "body-cell"
  | "body-actions"
  | "group-row"
  | "empty";

export type FocusableGridCell = {
  key: string;
  kind: FocusableGridCellKind;
  itemIndex?: number;
  rowIndex: number;
  colIndex: number;
  rowSpan: number;
  colSpan: number;
  groupKey?: string;
  collapsed?: boolean;
  collapsible?: boolean;
  selected?: boolean;
  rowKey?: Key;
};

export type FocusableCellDomProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  role: "gridcell";
  tabIndex?: number;
  "aria-colindex": number;
  "aria-rowindex": number;
  "aria-colspan"?: number;
  "aria-rowspan"?: number;
  "aria-selected"?: true;
  "aria-expanded"?: boolean;
  ref?: (node: HTMLDivElement | null) => void;
};

export type DataGridEmptyRowProps = {
  emptyMessage: ReactNode;
  loading: boolean;
  headerRowCount: number;
  totalColumnCount: number;
  showCellBorders: boolean;
  hasBorderBottom: boolean;
  isFocused: boolean;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
};

export type DataGridGroupRowProps<T extends Record<string, unknown>> = {
  entry: Extract<GroupedBodyEntry<T>, { type: "group" }>;
  rowIndex: number;
  headerRowCount: number;
  totalColumnCount: number;
  showCellBorders: boolean;
  hasBorderBottom: boolean;
  isFocused: boolean;
  renderGroupHeaderContent: (
    entry: Extract<GroupedBodyEntry<T>, { type: "group" }>,
  ) => ReactNode;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
};

export type DataGridDataRowProps<T extends Record<string, unknown>> = {
  entry: Extract<GroupedBodyEntry<T>, { type: "row" }>;
  rowIndex: number;
  headerRowCount: number;
  checkboxSelection: boolean;
  lastLeftPinnedField: string | null;
  showCellBorders: boolean;
  isSelected: boolean;
  isStriped: boolean;
  activeCellKey: string | null;
  resolvedBodyCells: ResolvedBodyCell<T>[];
  shouldRenderBorderRight: (field: string, colSpan?: number) => boolean;
  shouldRenderBorderBottom: (rowIndex: number, rowSpan?: number) => boolean;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
  toggleRowSelection: (rowKey: Key) => void;
  getColumnRawValue: (row: T, column: DataTableRegularColumn<T>) => ReactNode;
  cellSelection: boolean;
  actionTriggerRefs: RefObject<Record<string, HTMLButtonElement | null>>;
};

export type VirtualizedDataGridGroupRowProps<
  T extends Record<string, unknown>,
> = {
  entry: Extract<GroupedBodyEntry<T>, { type: "group" }>;
  itemIndex: number;
  headerRowCount: number;
  totalColumnCount: number;
  gridTemplateColumns: string;
  showCellBorders: boolean;
  hasBorderBottom: boolean;
  isFocused: boolean;
  renderGroupHeaderContent: (
    entry: Extract<GroupedBodyEntry<T>, { type: "group" }>,
  ) => ReactNode;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
};

export type VirtualizedDataGridRowProps<T extends Record<string, unknown>> = {
  entry: Extract<GroupedBodyEntry<T>, { type: "row" }>;
  itemIndex: number;
  headerRowCount: number;
  gridTemplateColumns: string;
  checkboxSelection: boolean;
  lastLeftPinnedField: string | null;
  showCellBorders: boolean;
  isSelected: boolean;
  isStriped: boolean;
  activeCellKey: string | null;
  resolvedBodyCells: ResolvedBodyCell<T>[];
  shouldRenderBorderRight: (field: string, colSpan?: number) => boolean;
  shouldRenderBorderBottom: (rowIndex: number, rowSpan?: number) => boolean;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
  toggleRowSelection: (rowKey: Key) => void;
  getColumnRawValue: (row: T, column: DataTableRegularColumn<T>) => ReactNode;
  cellSelection: boolean;
  actionTriggerRefs: RefObject<Record<string, HTMLButtonElement | null>>;
};
