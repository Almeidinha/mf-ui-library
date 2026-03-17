import React, { ComponentType, ReactNode } from "react";

export type SortDirection = "ASC" | "DESC" | "NONE";

export type DataTableAlign = "left" | "center" | "right";
export type DataTablePin = "left" | "right";

export type DataTableRowKey<T> = keyof T | ((row: T) => React.Key);

export type DataTableColumnManagerMode = "portal" | "inline";

export type DataTableLayoutMode = "responsive" | "fixed";

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
  fitContent?: boolean;
  align?: DataTableAlign;

  sortable?: boolean;
  searchable?: boolean;

  hideable?: boolean;
  pinnable?: boolean;
  reorderable?: boolean;

  valueGetter?: (value: unknown, row: T) => ReactNode;
  renderCell?: (row: T, value: ReactNode) => ReactNode;
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

export type DataTableColumnVisibility = Record<string, boolean>;

export type DataTablePinnedColumns = {
  left: string[];
  right: string[];
};

export type DataTableProps<T extends Record<string, unknown>> = {
  rows: T[];
  columns: DataTableColumn<T>[];

  rowKey: DataTableRowKey<T>;

  layoutMode?: DataTableLayoutMode;
  tableWidth?: number | string;
  minTableWidth?: number | string;

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
