import { compareValues, getNextSortDirection, paginateRows } from "@helpers";
import useDebounce from "hooks/useDebounce";
import React, { useMemo, useState } from "react";

import {
  DataTableColumn,
  DataTableColumnVisibility,
  DataTablePin,
  DataTablePinnedColumns,
  DataTableRegularColumn,
  SortDirection,
  UseDataTableProps,
  UseDataTableResult,
} from "./types";

function readStoredState(storageKey?: string) {
  if (!storageKey || typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as {
      columnVisibility?: DataTableColumnVisibility;
      columnOrder?: string[];
      pinnedColumns?: DataTablePinnedColumns;
    };
  } catch {
    return null;
  }
}

function getRowKeyValue<T extends Record<string, unknown>>(
  row: T,
  rowKey: keyof T | ((row: T) => React.Key),
): React.Key {
  if (typeof rowKey === "function") {
    return rowKey(row);
  }
  return row[rowKey] as React.Key;
}

function getColumnId<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
) {
  return String(column.field);
}

function isActionsColumn<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
): column is Extract<DataTableColumn<T>, { type: "actions" }> {
  return column.type === "actions";
}

function isRegularColumn<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
): column is DataTableRegularColumn<T> {
  return column.type !== "actions";
}

function getColumnFieldValue<T extends Record<string, unknown>>(
  row: T,
  column: DataTableRegularColumn<T>,
) {
  return row[column.field as keyof T];
}

function getColumnRawValue<T extends Record<string, unknown>>(
  row: T,
  column: DataTableRegularColumn<T>,
): React.ReactNode {
  const fieldValue = getColumnFieldValue(row, column);

  if (column.valueGetter) {
    return column.valueGetter(fieldValue, row);
  }

  return fieldValue as React.ReactNode;
}

function normalizeSearchValue(value: unknown) {
  if (value == null) {
    return "";
  }
  if (typeof value === "string") {
    return value.toLowerCase();
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).toLowerCase();
  }
  return "";
}

function buildDefaultVisibility<T extends Record<string, unknown>>(
  columns: DataTableColumn<T>[],
  defaultVisibility?: DataTableColumnVisibility,
): DataTableColumnVisibility {
  return columns.reduce<DataTableColumnVisibility>((acc, column) => {
    const field = getColumnId(column);
    acc[field] = defaultVisibility?.[field] ?? true;
    return acc;
  }, {});
}

function buildDefaultOrder<T extends Record<string, unknown>>(
  columns: DataTableColumn<T>[],
  defaultOrder?: string[],
) {
  const fields = columns.map(getColumnId);

  if (!defaultOrder?.length) {
    return fields;
  }

  const validDefaultOrder = defaultOrder.filter((field) =>
    fields.includes(field),
  );
  const missingFields = fields.filter(
    (field) => !validDefaultOrder.includes(field),
  );

  return [...validDefaultOrder, ...missingFields];
}

function normalizePinnedColumns(
  order: string[],
  pinned?: Partial<DataTablePinnedColumns>,
): DataTablePinnedColumns {
  const left = (pinned?.left ?? []).filter((field) => order.includes(field));
  const right = (pinned?.right ?? []).filter(
    (field) => order.includes(field) && !left.includes(field),
  );

  return { left, right };
}

export function useDataTable<T extends Record<string, unknown>>(
  props: UseDataTableProps<T>,
): UseDataTableResult<T> {
  const {
    rows,
    columns,
    rowKey,
    paginated = false,
    defaultPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    searchable = false,
    searchDebounce = 250,
    checkboxSelection = false,
    selectedRows,
    onSelectedRowsChange,
    sortField: controlledSortField,
    sortDirection: controlledSortDirection,
    onSortChange,

    columnVisibility: controlledColumnVisibility,
    defaultColumnVisibility,
    onColumnVisibilityChange,

    columnOrder: controlledColumnOrder,
    defaultColumnOrder,
    onColumnOrderChange,

    pinnedColumns: controlledPinnedColumns,
    defaultPinnedColumns,
    onPinnedColumnsChange,
  } = props;

  const storedState = useMemo(
    () => readStoredState(props.storageKey),
    [props.storageKey],
  );

  const defaultVisibilityState = useMemo(
    () =>
      buildDefaultVisibility(
        columns,
        storedState?.columnVisibility ?? defaultColumnVisibility,
      ),
    [columns, defaultColumnVisibility, storedState],
  );

  const defaultOrderState = useMemo(
    () =>
      buildDefaultOrder(
        columns,
        storedState?.columnOrder ?? defaultColumnOrder,
      ),
    [columns, defaultColumnOrder, storedState],
  );

  const defaultPinnedState = useMemo(
    () =>
      normalizePinnedColumns(
        defaultOrderState,
        storedState?.pinnedColumns ?? defaultPinnedColumns,
      ),
    [defaultOrderState, defaultPinnedColumns, storedState],
  );

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, searchDebounce);

  const [internalSortField, setInternalSortField] = useState<string | null>(
    null,
  );
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>("NONE");
  const [page, setPageState] = useState(0);
  const [pageSize, setPageSizeState] = useState(defaultPageSize);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<React.Key[]>(
    [],
  );

  const [internalColumnVisibility, setInternalColumnVisibility] = useState(
    defaultVisibilityState,
  );
  const [internalColumnOrder, setInternalColumnOrder] =
    useState(defaultOrderState);
  const [internalPinnedColumns, setInternalPinnedColumns] =
    useState(defaultPinnedState);

  const sortField = controlledSortField ?? internalSortField;
  const sortDirection = controlledSortDirection ?? internalSortDirection;
  const selectedKeys = selectedRows ?? internalSelectedKeys;
  const columnVisibility =
    controlledColumnVisibility ?? internalColumnVisibility;
  const columnOrder = controlledColumnOrder ?? internalColumnOrder;
  const pinnedColumns = controlledPinnedColumns ?? internalPinnedColumns;

  React.useEffect(() => {
    if (!props.storageKey || typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        props.storageKey,
        JSON.stringify({
          columnVisibility,
          columnOrder,
          pinnedColumns,
        }),
      );
    } catch {
      // ignore storage failures
    }
  }, [props.storageKey, columnVisibility, columnOrder, pinnedColumns]);

  const setSort = (nextField: string | null, nextDirection: SortDirection) => {
    if (onSortChange) {
      onSortChange(nextField, nextDirection);
      return;
    }

    setInternalSortField(nextField);
    setInternalSortDirection(nextDirection);
  };

  const setPage = (nextPage: number) => {
    setPageState(Math.max(0, nextPage));
  };

  const setPageSize = (nextPageSize: number) => {
    setPageSizeState(nextPageSize);
    setPageState(0);
  };

  const setSelectedKeys = (keys: React.Key[]) => {
    if (!selectedRows) {
      setInternalSelectedKeys(keys);
    }

    onSelectedRowsChange?.(
      keys,
      rows.filter((row) => keys.includes(getRowKeyValue(row, rowKey))),
    );
  };

  const setColumnVisibility = (nextVisibility: DataTableColumnVisibility) => {
    if (!controlledColumnVisibility) {
      setInternalColumnVisibility(nextVisibility);
    }

    onColumnVisibilityChange?.(nextVisibility);
  };

  const toggleColumnVisibility = (field: string) => {
    const column = columns.find((col) => getColumnId(col) === field);

    if (!column || column.hideable === false) {
      return;
    }

    setColumnVisibility({
      ...columnVisibility,
      [field]: !(columnVisibility[field] ?? true),
    });
  };

  const resetColumnVisibility = () => {
    setColumnVisibility(defaultVisibilityState);
  };

  const setColumnOrder = (nextOrder: string[]) => {
    const normalizedOrder = buildDefaultOrder(columns, nextOrder);

    if (!controlledColumnOrder) {
      setInternalColumnOrder(normalizedOrder);
    }

    onColumnOrderChange?.(normalizedOrder);
  };

  const reorderColumn = (field: string, toIndex: number) => {
    const column = columns.find((col) => getColumnId(col) === field);

    if (!column || column.reorderable === false) {
      return;
    }

    const currentIndex = columnOrder.indexOf(field);

    if (currentIndex === -1) {
      return;
    }

    const nextOrder = [...columnOrder];
    nextOrder.splice(currentIndex, 1);
    nextOrder.splice(
      Math.max(0, Math.min(toIndex, nextOrder.length)),
      0,
      field,
    );

    setColumnOrder(nextOrder);
  };

  const resetColumnOrder = () => {
    setColumnOrder(defaultOrderState);
  };

  const setPinnedColumns = (nextPinned: DataTablePinnedColumns) => {
    const normalized = normalizePinnedColumns(columnOrder, nextPinned);

    if (!controlledPinnedColumns) {
      setInternalPinnedColumns(normalized);
    }

    onPinnedColumnsChange?.(normalized);
  };

  const pinColumn = (field: string, pin: DataTablePin | null) => {
    const column = columns.find((col) => getColumnId(col) === field);

    if (!column || column.pinnable === false) {
      return;
    }

    const left = pinnedColumns.left.filter((id) => id !== field);
    const right = pinnedColumns.right.filter((id) => id !== field);

    if (pin === "left") {
      setPinnedColumns({
        left: [...left, field],
        right,
      });
      return;
    }

    if (pin === "right") {
      setPinnedColumns({
        left,
        right: [...right, field],
      });
      return;
    }

    setPinnedColumns({ left, right });
  };

  const resetPinnedColumns = () => {
    setPinnedColumns(defaultPinnedState);
  };

  const orderedColumns = useMemo(() => {
    const columnMap = new Map(
      columns.map((column) => [getColumnId(column), column]),
    );

    return columnOrder
      .map((field) => columnMap.get(field))
      .filter(Boolean) as DataTableColumn<T>[];
  }, [columns, columnOrder]);

  const visibleColumns = useMemo(() => {
    const nextVisibleColumns = orderedColumns.filter(
      (column) => columnVisibility[getColumnId(column)] !== false,
    );

    const leftPinned = nextVisibleColumns.filter((column) =>
      pinnedColumns.left.includes(getColumnId(column)),
    );

    const rightPinned = nextVisibleColumns.filter((column) =>
      pinnedColumns.right.includes(getColumnId(column)),
    );

    const center = nextVisibleColumns.filter((column) => {
      const field = getColumnId(column);

      return (
        !pinnedColumns.left.includes(field) &&
        !pinnedColumns.right.includes(field)
      );
    });

    return [...leftPinned, ...center, ...rightPinned];
  }, [orderedColumns, columnVisibility, pinnedColumns]);

  const filteredRows = useMemo(() => {
    if (!searchable) {
      return rows;
    }

    const query = debouncedSearch.trim().toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      visibleColumns.some((column) => {
        if (!isRegularColumn(column)) {
          return false;
        }

        if (column.searchable === false) {
          return false;
        }

        const value = getColumnRawValue(row, column);
        return normalizeSearchValue(value).includes(query);
      }),
    );
  }, [rows, visibleColumns, searchable, debouncedSearch]);

  const sortedRows = useMemo(() => {
    if (!sortField || sortDirection === "NONE") {
      return filteredRows;
    }

    const column = columns.find((c) => String(c.field) === sortField);

    if (!column || isActionsColumn(column)) {
      return filteredRows;
    }

    const nextRows = [...filteredRows].sort((rowA, rowB) => {
      const a = column.sortValueGetter
        ? column.sortValueGetter(rowA)
        : getColumnRawValue(rowA, column);

      const b = column.sortValueGetter
        ? column.sortValueGetter(rowB)
        : getColumnRawValue(rowB, column);

      return compareValues(a, b);
    });

    return sortDirection === "DESC" ? nextRows.reverse() : nextRows;
  }, [filteredRows, columns, sortField, sortDirection]);

  const pagination = useMemo(() => {
    if (!paginated) {
      return {
        rows: sortedRows,
        pageIndex: 0,
        pageCount: 1,
      };
    }

    return paginateRows(sortedRows, page, pageSize);
  }, [sortedRows, paginated, page, pageSize]);

  const visibleRows = pagination.rows;
  const safePage = pagination.pageIndex;
  const totalRows = sortedRows.length;
  const totalPages = pagination.pageCount;

  const visibleKeys = useMemo(
    () => visibleRows.map((row) => getRowKeyValue(row, rowKey)),
    [visibleRows, rowKey],
  );

  const allVisibleSelected =
    checkboxSelection &&
    visibleKeys.length > 0 &&
    visibleKeys.every((key) => selectedKeys.includes(key));

  const someVisibleSelected =
    checkboxSelection &&
    visibleKeys.some((key) => selectedKeys.includes(key)) &&
    !allVisibleSelected;

  const toggleSort = (field: string, sortable?: boolean) => {
    if (!sortable) {
      return;
    }

    if (sortField !== field) {
      setSort(field, "ASC");
      return;
    }

    const nextDirection = getNextSortDirection(sortDirection);

    setSort(nextDirection === "NONE" ? null : field, nextDirection);
  };

  const toggleRow = (row: T) => {
    if (!checkboxSelection) {
      return;
    }

    const key = getRowKeyValue(row, rowKey);
    const exists = selectedKeys.includes(key);

    const nextKeys = exists
      ? selectedKeys.filter((k) => k !== key)
      : [...selectedKeys, key];

    setSelectedKeys(nextKeys);
  };

  const toggleAllVisible = () => {
    if (!checkboxSelection) {
      return;
    }

    if (allVisibleSelected) {
      const nextKeys = selectedKeys.filter((key) => !visibleKeys.includes(key));
      setSelectedKeys(nextKeys);
      return;
    }

    const nextKeys = Array.from(new Set([...selectedKeys, ...visibleKeys]));
    setSelectedKeys(nextKeys);
  };

  return {
    search,
    setSearch,

    sortField,
    sortDirection,
    toggleSort,

    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    pageSizeOptions,
    paginated,
    totalRows,
    totalPages,

    visibleRows,
    visibleColumns,

    selectedKeys,
    allVisibleSelected,
    someVisibleSelected,
    toggleRow,
    toggleAllVisible,

    columnVisibility,
    setColumnVisibility,
    toggleColumnVisibility,
    resetColumnVisibility,

    columnOrder,
    setColumnOrder,
    reorderColumn,
    resetColumnOrder,

    pinnedColumns,
    setPinnedColumns,
    pinColumn,
    resetPinnedColumns,

    getRowKey: (row) => getRowKeyValue(row, rowKey),
    getColumnRawValue: (row, column) => getColumnRawValue(row, column),
  };
}
