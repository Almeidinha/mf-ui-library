import type { DataTableProps } from "../data-table/types";

export type {
  DataTableAction as DataGridAction,
  DataTableActionsColumn as DataGridActionsColumn,
  DataTableAlign as DataGridAlign,
  DataTableColumn as DataGridColumn,
  DataTableColumnGroup as DataGridColumnGroup,
  DataTableColumnManagerMode as DataGridColumnManagerMode,
  DataTableColumnVisibility as DataGridColumnVisibility,
  DataTableGroupValue as DataGridGroupValue,
  DataTableLayoutMode as DataGridLayoutMode,
  DataTablePin as DataGridPin,
  DataTablePinnedColumns as DataGridPinnedColumns,
  DataTableRegularColumn as DataGridRegularColumn,
  DataTableRowGrouping as DataGridRowGrouping,
  DataTableRowKey as DataGridRowKey,
  SortDirection as DataGridSortDirection,
  DataTableSpanArgs as DataGridSpanArgs,
  DataTableSpanValue as DataGridSpanValue,
} from "../data-table/types";

export type DataGridProps<T extends Record<string, unknown>> =
  DataTableProps<T> & {
    cellSelection?: boolean;
  };
