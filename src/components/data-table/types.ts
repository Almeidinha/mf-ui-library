import React, { ComponentType, ReactNode } from "react";

export type SortDirection = "ASC" | "DESC" | "NONE";

export type DataTableAlign = "left" | "center" | "right";
export type DataTablePin = "left" | "right";
export type DataTableCellOverflow = "ellipsis" | "wrap" | "visible";
export type DataTableGroupValue = string | number | boolean | null | undefined;
export type DataTableSpanArgs<T extends Record<string, unknown>> = {
  row: T;
  rowIndex: number;
  rows: T[];
  value: ReactNode;
};

export type DataTableSpanValue<T extends Record<string, unknown>> =
  | number
  | ((args: DataTableSpanArgs<T>) => number | null | undefined);

export type DataTableRowKey<T> = keyof T | ((row: T) => React.Key);

export type DataTableColumnManagerMode = "portal" | "inline";

export type DataTableLayoutMode = "responsive" | "fixed";
export type DataTableSize = "small" | "medium" | "large";

export type DataTableAction<T extends Record<string, unknown>> = {
  key: string;
  label: ReactNode;
  onClick: (row: T) => void;

  disabled?: boolean | ((row: T) => boolean);
  hidden?: boolean | ((row: T) => boolean);
  destructive?: boolean;
  icon?: ComponentType;
};

type DataTableBaseColumn<T extends Record<string, unknown>> = {
  field: keyof T | string;
  headerName: ReactNode;
  description?: string;

  width?: number | string;
  fullWidth?: boolean;
  overflow?: DataTableCellOverflow;
  fitContent?: boolean;
  align?: DataTableAlign;

  sortable?: boolean;
  searchable?: boolean;

  hideable?: boolean;
  pinnable?: boolean;
  reorderable?: boolean;

  valueGetter?: (value: unknown, row: T) => ReactNode;
  renderCell?: (row: T, value: ReactNode) => ReactNode;
  colSpan?: DataTableSpanValue<T>;
  rowSpan?: DataTableSpanValue<T>;
  sortValueGetter?: (row: T) => string | number | null | undefined;
};

export type DataTableRegularColumn<T extends Record<string, unknown>> =
  DataTableBaseColumn<T> & {
    type?: "text" | "number";
  };

export type DataTableActionsColumn<T extends Record<string, unknown>> = {
  field: string;
  headerName?: ReactNode;
  description?: string;

  type: "actions";
  width?: number | string;
  fullWidth?: boolean;
  overflow?: DataTableCellOverflow;
  fitContent?: boolean;
  align?: DataTableAlign;

  sortable?: false;
  searchable?: false;

  hideable?: boolean;
  pinnable?: boolean;
  reorderable?: boolean;

  getActions: (row: T) => DataTableAction<T>[];
};

export type DataTableColumn<T extends Record<string, unknown>> =
  | DataTableRegularColumn<T>
  | DataTableActionsColumn<T>;

export type DataTableColumnGroup<T extends Record<string, unknown>> = {
  key: string;
  headerName: ReactNode;
  description?: string;
  align?: DataTableAlign;
  fields?: Array<keyof T | string>;
  children?: DataTableColumnGroup<T>[];
};

export type DataTableRowGrouping<T extends Record<string, unknown>> = {
  field?: keyof T | string;
  fields?: Array<keyof T | string>;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  renderGroupHeader?: (
    value: DataTableGroupValue,
    rows: T[],
    collapsed: boolean,
    depth: number,
    path: DataTableGroupValue[],
  ) => ReactNode;
};

export type DataTableColumnVisibility = Record<string, boolean>;

export type DataTablePinnedColumns = {
  left: string[];
  right: string[];
};

export type DataTableAdvancedFilterOperator =
  | "contains"
  | "notContains"
  | "equals"
  | "notEquals"
  | "startsWith"
  | "endsWith"
  | "isEmpty"
  | "isNotEmpty";

export type DataTableAdvancedFilterConnector = "and" | "or";

export type DataTableAdvancedFilter = {
  id: string;
  field: string;
  operator: DataTableAdvancedFilterOperator;
  value: string;
  connector: DataTableAdvancedFilterConnector;
};

export type DataTableProps<T extends Record<string, unknown>> = {
  rows: T[];
  columns: DataTableColumn<T>[];
  columnGroups?: DataTableColumnGroup<T>[];
  rowGrouping?: DataTableRowGrouping<T>;

  rowKey: DataTableRowKey<T>;

  layoutMode?: DataTableLayoutMode;
  size?: DataTableSize;
  tableWidth?: number | string;
  minTableWidth?: number | string;
  minTableHeight?: number | string;
  maxTableHeight?: number | string;
  striped?: boolean;
  showCellBorders?: boolean;
  showActionColumns?: boolean;

  storageKey?: string;

  paginated?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];

  searchable?: boolean;
  searchPlaceholder?: string;
  searchDebounce?: number;

  checkboxSelection?: boolean;
  selectedRows?: React.Key[];
  onSelectedRowsChange?: (keys: React.Key[], rows: T[]) => void;

  emptyMessage?: ReactNode;

  sortField?: string | null;
  sortDirection?: SortDirection;
  onSortChange?: (sortField: string | null, direction: SortDirection) => void;

  columnVisibility?: DataTableColumnVisibility;
  defaultColumnVisibility?: DataTableColumnVisibility;
  onColumnVisibilityChange?: (visibility: DataTableColumnVisibility) => void;

  columnOrder?: string[];
  defaultColumnOrder?: string[];
  onColumnOrderChange?: (order: string[]) => void;

  manageColumns?: boolean;
  pinnedColumns?: DataTablePinnedColumns;
  defaultPinnedColumns?: DataTablePinnedColumns;
  onPinnedColumnsChange?: (pinned: DataTablePinnedColumns) => void;
  mode?: DataTableColumnManagerMode;
  showBackdrop?: boolean;
};

export type UseDataTableProps<T extends Record<string, unknown>> =
  DataTableProps<T>;

export type UseDataTableResult<T extends Record<string, unknown>> = {
  search: string;
  setSearch: (value: string) => void;
  advancedFilters: DataTableAdvancedFilter[];
  setAdvancedFilters: (filters: DataTableAdvancedFilter[]) => void;
  searchableColumns: DataTableRegularColumn<T>[];

  sortField: string | null;
  sortDirection: SortDirection;
  toggleSort: (field: string, sortable?: boolean) => void;

  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  pageSizeOptions: number[];
  paginated: boolean;
  totalRows: number;
  totalPages: number;

  visibleRows: T[];
  visibleColumns: DataTableColumn<T>[];

  selectedKeys: React.Key[];
  selectedKeySet: Set<React.Key>;
  setSelectedKeys: (keys: React.Key[]) => void;
  allVisibleSelected: boolean;
  someVisibleSelected: boolean;
  toggleRow: (row: T) => void;
  toggleAllVisible: () => void;

  columnVisibility: DataTableColumnVisibility;
  setColumnVisibility: (visibility: DataTableColumnVisibility) => void;
  toggleColumnVisibility: (field: string) => void;
  resetColumnVisibility: () => void;

  columnOrder: string[];
  setColumnOrder: (order: string[]) => void;
  reorderColumn: (field: string, toIndex: number) => void;
  resetColumnOrder: () => void;

  pinnedColumns: DataTablePinnedColumns;
  setPinnedColumns: (pinned: DataTablePinnedColumns) => void;
  pinColumn: (field: string, pin: DataTablePin | null) => void;
  resetPinnedColumns: () => void;

  getRowKey: (row: T) => React.Key;
  getColumnRawValue: (row: T, column: DataTableRegularColumn<T>) => ReactNode;
};
