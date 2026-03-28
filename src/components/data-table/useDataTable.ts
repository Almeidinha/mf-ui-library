import {
  compareValues,
  getNextSortDirection,
  paginateRows,
} from "helpers/table-helpers";
import useDebounce from "hooks/useDebounce";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getColumnId, isActionsColumn } from "./dataTable.shared";
import {
  isAdvancedFilterComplete,
  isAdvancedFilterValueRequired,
  matchesAdvancedFilterValue,
  normalizeAdvancedFilterValue,
} from "./dataTableAdvancedFilters.shared";
import {
  createDataTableDataSourceCache,
  serializeDataTableGetRowsParams,
} from "./dataTableDataSource";
import {
  DataTableAdvancedFilter,
  DataTableColumn,
  DataTableColumnVisibility,
  DataTableGetRowsParams,
  DataTableGetRowsResponse,
  DataTablePin,
  DataTablePinnedColumns,
  DataTableRegularColumn,
  DataTableServerFilter,
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

function normalizeSearchValue(value: ReactNode) {
  return normalizeAdvancedFilterValue(value);
}

function normalizeServerFilters(filters: DataTableAdvancedFilter[]) {
  return filters.map<DataTableServerFilter>(
    ({ field, operator, value, connector }) => ({
      field,
      operator,
      value,
      connector,
    }),
  );
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
  const fieldSet = new Set(fields);

  if (!defaultOrder?.length) {
    return fields;
  }

  const validDefaultOrder = defaultOrder.filter((field) => fieldSet.has(field));
  const validDefaultOrderSet = new Set(validDefaultOrder);
  const missingFields = fields.filter(
    (field) => !validDefaultOrderSet.has(field),
  );

  return [...validDefaultOrder, ...missingFields];
}

function normalizePinnedColumns(
  order: string[],
  pinned?: Partial<DataTablePinnedColumns>,
): DataTablePinnedColumns {
  const orderSet = new Set(order);
  const left = (pinned?.left ?? []).filter((field) => orderSet.has(field));
  const leftSet = new Set(left);
  const right = (pinned?.right ?? []).filter(
    (field) => orderSet.has(field) && !leftSet.has(field),
  );

  return { left, right };
}

function buildDefaultPinnedColumns<T extends Record<string, unknown>>(
  columns: DataTableColumn<T>[],
  order: string[],
  defaultPinnedColumns?: Partial<DataTablePinnedColumns>,
): DataTablePinnedColumns {
  const defaultLeft = defaultPinnedColumns?.left ?? [];
  const defaultRight = defaultPinnedColumns?.right ?? [];

  const actionFields = columns
    .filter((column) => column.type === "actions")
    .map((column) => String(column.field));

  return normalizePinnedColumns(order, {
    left: defaultLeft,
    right: [...defaultRight, ...actionFields],
  });
}

const EMPTY_PINNED_COLUMNS: DataTablePinnedColumns = { left: [], right: [] };

export function useDataTable<T extends Record<string, unknown>>(
  props: UseDataTableProps<T>,
): UseDataTableResult<T> {
  const {
    rows = [],
    columns,
    showActionColumns = true,
    rowKey,
    paginated = false,
    defaultPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    dataSource,
    dataSourceCache: providedDataSourceCache,
    dataSourceCacheTtl,
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
  const isServerData = Boolean(dataSource);

  const enabledColumns = useMemo(
    () =>
      showActionColumns
        ? columns
        : columns.filter((column) => !isActionsColumn(column)),
    [columns, showActionColumns],
  );

  const columnManagementEnabled =
    props.manageColumns ||
    controlledColumnVisibility !== undefined ||
    defaultColumnVisibility !== undefined ||
    onColumnVisibilityChange !== undefined ||
    controlledColumnOrder !== undefined ||
    defaultColumnOrder !== undefined ||
    onColumnOrderChange !== undefined ||
    controlledPinnedColumns !== undefined ||
    defaultPinnedColumns !== undefined ||
    onPinnedColumnsChange !== undefined ||
    Boolean(props.storageKey);

  const storedState = useMemo(
    () => (columnManagementEnabled ? readStoredState(props.storageKey) : null),
    [columnManagementEnabled, props.storageKey],
  );

  const defaultVisibilityState = useMemo(
    () =>
      buildDefaultVisibility(
        enabledColumns,
        storedState?.columnVisibility ?? defaultColumnVisibility,
      ),
    [enabledColumns, defaultColumnVisibility, storedState],
  );

  const defaultOrderState = useMemo(
    () =>
      buildDefaultOrder(
        enabledColumns,
        storedState?.columnOrder ?? defaultColumnOrder,
      ),
    [enabledColumns, defaultColumnOrder, storedState],
  );

  const defaultColumnOrderState = useMemo(
    () => enabledColumns.map(getColumnId),
    [enabledColumns],
  );

  const defaultPinnedState = useMemo(() => {
    if (!columnManagementEnabled) {
      return EMPTY_PINNED_COLUMNS;
    }

    return buildDefaultPinnedColumns(
      enabledColumns,
      defaultOrderState,
      storedState?.pinnedColumns ?? defaultPinnedColumns,
    );
  }, [
    columnManagementEnabled,
    enabledColumns,
    defaultOrderState,
    defaultPinnedColumns,
    storedState,
  ]);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, searchDebounce);
  const [advancedFilters, setAdvancedFilters] = useState<
    DataTableAdvancedFilter[]
  >([]);
  const [serverRows, setServerRows] = useState<T[]>(rows);
  const [serverTotalRows, setServerTotalRows] = useState(rows.length);
  const [loading, setLoading] = useState(() => Boolean(dataSource));
  const requestVersionRef = useRef(0);
  const pendingRequestsRef = useRef<
    Map<string, Promise<DataTableGetRowsResponse<T>>>
  >(new Map());

  const defaultDataSourceCache = useMemo(
    () =>
      isServerData
        ? createDataTableDataSourceCache<T>({
            ttl: dataSourceCacheTtl,
          })
        : null,
    [dataSourceCacheTtl, isServerData],
  );
  const dataSourceCache = providedDataSourceCache ?? defaultDataSourceCache;
  const isSearchPending = isServerData && search !== debouncedSearch;

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
    () => defaultVisibilityState,
  );
  const [internalColumnOrder, setInternalColumnOrder] = useState(
    () => defaultOrderState,
  );
  const [internalPinnedColumns, setInternalPinnedColumns] = useState(
    () => defaultPinnedState,
  );

  const sortField = controlledSortField ?? internalSortField;
  const sortDirection = controlledSortDirection ?? internalSortDirection;
  const selectedKeys = selectedRows ?? internalSelectedKeys;
  const selectedKeySet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  const columnVisibility = columnManagementEnabled
    ? (controlledColumnVisibility ?? internalColumnVisibility)
    : defaultVisibilityState;

  const columnOrder = columnManagementEnabled
    ? (controlledColumnOrder ?? internalColumnOrder)
    : defaultColumnOrderState;

  const pinnedColumns = columnManagementEnabled
    ? (controlledPinnedColumns ?? internalPinnedColumns)
    : EMPTY_PINNED_COLUMNS;

  const columnById = useMemo(
    () =>
      new Map(enabledColumns.map((column) => [getColumnId(column), column])),
    [enabledColumns],
  );

  React.useEffect(() => {
    if (
      !columnManagementEnabled ||
      !props.storageKey ||
      typeof window === "undefined"
    ) {
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
  }, [
    columnManagementEnabled,
    props.storageKey,
    columnVisibility,
    columnOrder,
    pinnedColumns,
  ]);

  const setSort = (nextField: string | null, nextDirection: SortDirection) => {
    if (onSortChange) {
      onSortChange(nextField, nextDirection);
      return;
    }

    setInternalSortField(nextField);
    setInternalSortDirection(nextDirection);
  };

  const setPage = (nextPage: number) => {
    if (isServerData) {
      setLoading(true);
    }

    setPageState(Math.max(0, nextPage));
  };

  const setSearchValue = (value: string) => {
    if (isServerData) {
      setLoading(true);
    }

    setSearch(value);
    setPageState(0);
  };

  const setAdvancedFiltersValue = (filters: DataTableAdvancedFilter[]) => {
    if (isServerData) {
      setLoading(true);
    }

    setAdvancedFilters(filters);
    setPageState(0);
  };

  const setPageSize = (nextPageSize: number) => {
    if (isServerData) {
      setLoading(true);
    }

    setPageSizeState(nextPageSize);
    setPageState(0);
  };

  const setSelectedKeys = (keys: React.Key[]) => {
    if (selectedRows === undefined) {
      setInternalSelectedKeys(keys);
    }

    const nextKeySet = new Set(keys);

    onSelectedRowsChange?.(
      keys,
      sourceRows.filter((row) => nextKeySet.has(getRowKeyValue(row, rowKey))),
    );
  };

  const setColumnVisibility = (nextVisibility: DataTableColumnVisibility) => {
    if (controlledColumnVisibility === undefined) {
      setInternalColumnVisibility(nextVisibility);
    }

    onColumnVisibilityChange?.(nextVisibility);
  };

  const toggleColumnVisibility = (field: string) => {
    const column = columnById.get(field);

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
    const normalizedOrder = buildDefaultOrder(enabledColumns, nextOrder);

    if (controlledColumnOrder === undefined) {
      setInternalColumnOrder(normalizedOrder);
    }

    onColumnOrderChange?.(normalizedOrder);
  };

  const reorderColumn = (field: string, toIndex: number) => {
    const column = columnById.get(field);

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

    if (controlledPinnedColumns === undefined) {
      setInternalPinnedColumns(normalized);
    }

    onPinnedColumnsChange?.(normalized);
  };

  const pinColumn = (field: string, pin: DataTablePin | null) => {
    const column = columnById.get(field);

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
    if (!columnManagementEnabled) {
      return enabledColumns;
    }

    return columnOrder
      .map((field) => columnById.get(field))
      .filter(Boolean) as DataTableColumn<T>[];
  }, [columnManagementEnabled, enabledColumns, columnOrder, columnById]);

  const visibleColumns = useMemo(() => {
    if (!columnManagementEnabled) {
      return enabledColumns;
    }

    const leftPinnedSet = new Set(pinnedColumns.left);
    const rightPinnedSet = new Set(pinnedColumns.right);

    const nextVisibleColumns = orderedColumns.filter(
      (column) => columnVisibility[getColumnId(column)] !== false,
    );

    const leftPinned = nextVisibleColumns.filter((column) =>
      leftPinnedSet.has(getColumnId(column)),
    );

    const rightPinned = nextVisibleColumns.filter((column) =>
      rightPinnedSet.has(getColumnId(column)),
    );

    const center = nextVisibleColumns.filter((column) => {
      const field = getColumnId(column);

      return !leftPinnedSet.has(field) && !rightPinnedSet.has(field);
    });

    return [...leftPinned, ...center, ...rightPinned];
  }, [
    columnManagementEnabled,
    enabledColumns,
    orderedColumns,
    columnVisibility,
    pinnedColumns,
  ]);

  const searchableColumns = useMemo(
    () =>
      searchable
        ? visibleColumns.filter(
            (column): column is DataTableRegularColumn<T> =>
              isRegularColumn(column) && column.searchable !== false,
          )
        : [],
    [visibleColumns, searchable],
  );

  const searchableFieldSet = useMemo(
    () => new Set(searchableColumns.map(getColumnId)),
    [searchableColumns],
  );

  const activeAdvancedFilters = useMemo(
    () =>
      advancedFilters.filter((filter) =>
        isAdvancedFilterComplete(filter, searchableFieldSet),
      ),
    [advancedFilters, searchableFieldSet],
  );

  const serverFilters = useMemo(
    () => normalizeServerFilters(activeAdvancedFilters),
    [activeAdvancedFilters],
  );

  const searchableRows = useMemo(() => {
    if (isServerData || !searchable || searchableColumns.length === 0) {
      return null;
    }

    return rows.map((row) => ({
      row,
      searchText: searchableColumns
        .map((column) => normalizeSearchValue(getColumnRawValue(row, column)))
        .filter(Boolean)
      .join(" "),
    }));
  }, [isServerData, rows, searchable, searchableColumns]);

  const searchableColumnById = useMemo(
    () =>
      new Map(searchableColumns.map((column) => [getColumnId(column), column])),
    [searchableColumns],
  );

  const searchableRowMap = useMemo(
    () =>
      searchableRows
        ? new Map(
            searchableRows.map(({ row, searchText }) => [row, searchText]),
          )
        : null,
    [searchableRows],
  );

  const compiledAdvancedFilters = useMemo(
    () =>
      activeAdvancedFilters
        .map((filter) => {
          const column = searchableColumnById.get(filter.field);

          if (!column) {
            return null;
          }

          return {
            ...filter,
            column,
            normalizedQuery: isAdvancedFilterValueRequired(filter.operator)
              ? normalizeAdvancedFilterValue(filter.value)
              : "",
          };
        })
        .filter(Boolean) as Array<
        DataTableAdvancedFilter & {
          column: DataTableRegularColumn<T>;
          normalizedQuery: string;
        }
      >,
    [activeAdvancedFilters, searchableColumnById],
  );

  const serverQuery = useMemo<DataTableGetRowsParams>(
    () => ({
      paginated,
      page,
      pageSize,
      sortField,
      sortDirection,
      search: debouncedSearch.trim(),
      filters: serverFilters,
    }),
    [
      paginated,
      page,
      pageSize,
      sortField,
      sortDirection,
      debouncedSearch,
      serverFilters,
    ],
  );

  const cachedServerResponse = useMemo(
    () => (dataSource ? dataSourceCache?.get(serverQuery) : undefined),
    [dataSource, dataSourceCache, serverQuery],
  );
  const sourceRows = isServerData
    ? (cachedServerResponse?.rows ?? serverRows)
    : rows;
  const resolvedLoading = isServerData ? loading && !cachedServerResponse : false;

  useEffect(() => {
    if (!dataSource) {
      return;
    }

    requestVersionRef.current += 1;
  }, [dataSource, serverQuery]);

  useEffect(() => {
    if (!dataSource || isSearchPending || cachedServerResponse) {
      return;
    }

    const requestKey = serializeDataTableGetRowsParams(serverQuery);
    const requestVersion = requestVersionRef.current;
    const abortController =
      typeof AbortController === "undefined"
        ? null
        : new AbortController();
    const params: DataTableGetRowsParams = abortController
      ? {
          ...serverQuery,
          signal: abortController.signal,
        }
      : serverQuery;

    const existingRequest = pendingRequestsRef.current.get(requestKey);
    const request =
      existingRequest ??
      dataSource
        .getRows(params)
        .then((response) => ({
          rows: response.rows,
          totalRows: response.totalRows,
        }))
        .finally(() => {
          pendingRequestsRef.current.delete(requestKey);
        });

    pendingRequestsRef.current.set(requestKey, request);

    request
      .then((response) => {
        dataSourceCache?.set(serverQuery, response);

        if (requestVersionRef.current !== requestVersion) {
          return;
        }

        setServerRows(response.rows);
        setServerTotalRows(response.totalRows);
        setLoading(false);
      })
      .catch(() => {
        if (requestVersionRef.current !== requestVersion) {
          return;
        }

        setLoading(false);
      });

    return () => {
      abortController?.abort();
    };
  }, [cachedServerResponse, dataSource, dataSourceCache, isSearchPending, serverQuery]);

  const filteredRows = useMemo(() => {
    if (isServerData) {
      return sourceRows;
    }

    const hasQuery = searchable && debouncedSearch.trim().length > 0;
    const hasAdvancedFilters = compiledAdvancedFilters.length > 0;

    if (!hasQuery && !hasAdvancedFilters) {
      return rows;
    }

    if (hasQuery && !searchableRowMap) {
      return [];
    }

    const query = debouncedSearch.trim().toLowerCase();

    return rows.filter((row) => {
      if (hasQuery) {
        const searchText = searchableRowMap?.get(row);

        if (!searchText?.includes(query)) {
          return false;
        }
      }

      if (!hasAdvancedFilters) {
        return true;
      }

      return compiledAdvancedFilters.reduce<boolean>(
        (matches, filter, index) => {
          const rawValue = getColumnRawValue(row, filter.column);
          const normalizedValue = normalizeAdvancedFilterValue(rawValue);
          const nextMatch = matchesAdvancedFilterValue(
            normalizedValue,
            filter.operator,
            filter.normalizedQuery,
          );

          if (index === 0) {
            return nextMatch;
          }

          return filter.connector === "or"
            ? matches || nextMatch
            : matches && nextMatch;
        },
        true,
      );
    });
  }, [
    isServerData,
    sourceRows,
    rows,
    searchable,
    debouncedSearch,
    searchableRowMap,
    compiledAdvancedFilters,
  ]);

  const sortedRows = useMemo(() => {
    if (isServerData) {
      return filteredRows;
    }

    if (!sortField || sortDirection === "NONE") {
      return filteredRows;
    }

    const column = columnById.get(sortField);

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
  }, [filteredRows, columnById, isServerData, sortField, sortDirection]);

  const pagination = useMemo(() => {
    if (isServerData) {
      return {
        rows: sortedRows,
        pageIndex: page,
        pageCount:
          paginated && pageSize > 0
            ? Math.max(1, Math.ceil(serverTotalRows / pageSize))
            : 1,
      };
    }

    if (!paginated) {
      return {
        rows: sortedRows,
        pageIndex: 0,
        pageCount: 1,
      };
    }

    return paginateRows(sortedRows, page, pageSize);
  }, [isServerData, sortedRows, paginated, page, pageSize, serverTotalRows]);

  const visibleRows = pagination.rows;
  const safePage = pagination.pageIndex;
  const totalRows = isServerData
    ? (cachedServerResponse?.totalRows ?? serverTotalRows)
    : sortedRows.length;
  const totalPages = pagination.pageCount;

  const visibleKeys = useMemo(
    () => visibleRows.map((row) => getRowKeyValue(row, rowKey)),
    [visibleRows, rowKey],
  );
  const visibleKeySet = useMemo(() => new Set(visibleKeys), [visibleKeys]);

  const allVisibleSelected =
    checkboxSelection &&
    visibleKeys.length > 0 &&
    visibleKeys.every((key) => selectedKeySet.has(key));

  const someVisibleSelected =
    checkboxSelection &&
    visibleKeys.some((key) => selectedKeySet.has(key)) &&
    !allVisibleSelected;

  const toggleSort = (field: string, sortable?: boolean) => {
    if (!sortable) {
      return;
    }

    if (sortField !== field) {
      if (isServerData) {
        setLoading(true);
        setPageState(0);
      }
      setSort(field, "ASC");
      return;
    }

    const nextDirection = getNextSortDirection(sortDirection);

    if (isServerData) {
      setLoading(true);
      setPageState(0);
    }
    setSort(nextDirection === "NONE" ? null : field, nextDirection);
  };

  const toggleRow = (row: T) => {
    if (!checkboxSelection) {
      return;
    }

    const key = getRowKeyValue(row, rowKey);
    const exists = selectedKeySet.has(key);

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
      const nextKeys = selectedKeys.filter((key) => !visibleKeySet.has(key));
      setSelectedKeys(nextKeys);
      return;
    }

    const nextKeys = Array.from(new Set([...selectedKeys, ...visibleKeys]));
    setSelectedKeys(nextKeys);
  };

  const getRowKey = useCallback(
    (row: T) => getRowKeyValue(row, rowKey),
    [rowKey],
  );

  const getRegularColumnRawValue = useCallback(
    (row: T, column: DataTableRegularColumn<T>) =>
      getColumnRawValue(row, column),
    [],
  );

  return {
    search,
    setSearch: setSearchValue,
    advancedFilters,
    setAdvancedFilters: setAdvancedFiltersValue,
    searchableColumns,

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
    loading: resolvedLoading,
    isServerData,

    visibleRows,
    visibleColumns,

    selectedKeys,
    selectedKeySet,
    setSelectedKeys,
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

    getRowKey,
    getColumnRawValue: getRegularColumnRawValue,
  };
}
