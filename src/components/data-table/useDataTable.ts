import { compareValues, getNextSortDirection, paginateRows } from "@helpers";
import useDebounce from "hooks/useDebounce";
import React, { useMemo, useState } from "react";

import {
  DataTableColumn,
  DataTableRegularColumn,
  SortDirection,
  UseDataTableProps,
  UseDataTableResult,
} from "./types";

function getRowKeyValue<T extends Record<string, unknown>>(
  row: T,
  rowKey: keyof T | ((row: T) => React.Key),
): React.Key {
  if (typeof rowKey === "function") {
    return rowKey(row);
  }
  return row[rowKey] as React.Key;
}

function isActionsColumn<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
): column is Extract<DataTableColumn<T>, { type: "actions" }> {
  return column.type === "actions";
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
  } = props;

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

  const sortField = controlledSortField ?? internalSortField;
  const sortDirection = controlledSortDirection ?? internalSortDirection;
  const selectedKeys = selectedRows ?? internalSelectedKeys;

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

  const filteredRows = useMemo(() => {
    if (!searchable) {
      return rows;
    }

    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return rows;
    }

    return rows.filter((row) =>
      columns.some((column) => {
        if (isActionsColumn(column)) {
          return false;
        }
        if (column.searchable === false) {
          return false;
        }

        const value = getColumnRawValue(row, column);
        return normalizeSearchValue(value).includes(query);
      }),
    );
  }, [rows, columns, searchable, debouncedSearch]);

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

    selectedKeys,
    allVisibleSelected,
    someVisibleSelected,
    toggleRow,
    toggleAllVisible,

    getRowKey: (row) => getRowKeyValue(row, rowKey),
    getColumnRawValue: (row, column) => getColumnRawValue(row, column),
  };
}
