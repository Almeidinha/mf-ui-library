import { InputText } from "components/input-field";
import { Flex, SpaceBetween } from "components/layout";
import { Pagination } from "components/pagination";
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "components/table";
import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap } from "foundation/spacing";
import { If } from "helpers/nothing";
import React from "react";
import styled from "styled-components";

import { DataTableColumnManager } from "./DataTableColumnManager";
import { DataTableColumn, DataTableProps } from "./types";
import { useDataTable } from "./useDataTable";

const TableFrame = styled.div<{ $responsive: boolean }>`
  border: 1px solid ${Borders.Default.Default};
  ${shadowMd};
  background: ${Surface.Default.Default};
  overflow: hidden;

  & table {
    display: ${(props) => (props.$responsive ? "table" : "block")};
    border: none;
    box-shadow: none;
  }
`;

const TableScroll = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
`;

const CHECKBOX_COLUMN_WIDTH = 55;

const checkboxStickyStyle: React.CSSProperties = {
  position: "sticky",
  left: 0,
  background: "inherit",
};

function getTextAlign(
  align?: DataTableColumn<Record<string, unknown>>["align"],
) {
  return align ?? "left";
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

function resolveActionFlag<T extends Record<string, unknown>>(
  value: boolean | ((row: T) => boolean) | undefined,
  row: T,
) {
  if (typeof value === "function") {
    return value(row);
  }

  return Boolean(value);
}

function getColumnEstimatedWidth(width?: number | string) {
  if (typeof width === "number") {
    return width;
  }

  if (typeof width === "string") {
    const parsed = Number.parseFloat(width);
    return Number.isNaN(parsed) ? 160 : parsed;
  }

  return 160;
}

function getResolvedColumnWidth<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
) {
  return column.width ?? (column.fitContent ? 120 : 160);
}

type RenderedColumn<T extends Record<string, unknown>> = {
  column: DataTableColumn<T>;
  field: string;
  sortable: boolean | undefined;
  currentSort: DataTableProps<T>["sortDirection"];
  textAlign: ReturnType<typeof getTextAlign>;
  stickyStyle?: React.CSSProperties;
};

export function DataTable<T extends Record<string, unknown>>(
  props: DataTableProps<T>,
) {
  const {
    searchable = false,
    columns,
    searchPlaceholder = "Search...",
    checkboxSelection = false,
    emptyMessage = "No rows found.",
    showBackdrop,
    mode,
    layoutMode = "responsive",
    tableWidth,
    minTableWidth,
  } = props;

  const tableAreaRef = React.useRef<HTMLDivElement | null>(null);
  const isResponsive = layoutMode === "responsive";

  const {
    search,
    setSearch,

    sortField,
    sortDirection,
    toggleSort,

    page,
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
    toggleColumnVisibility,
    resetColumnVisibility,

    columnOrder,
    setColumnOrder,
    resetColumnOrder,

    pinnedColumns,
    pinColumn,
    resetPinnedColumns,

    getRowKey,
    getColumnRawValue,
  } = useDataTable(props);

  const colSpan = visibleColumns.length + (checkboxSelection ? 1 : 0);

  const leftPinnedSet = React.useMemo(
    () => new Set(pinnedColumns.left),
    [pinnedColumns.left],
  );

  const rightPinnedSet = React.useMemo(
    () => new Set(pinnedColumns.right),
    [pinnedColumns.right],
  );

  const lastLeftPinnedField = React.useMemo(() => {
    const leftPinnedVisible = visibleColumns.filter((column) =>
      leftPinnedSet.has(getColumnId(column)),
    );

    if (leftPinnedVisible.length === 0) {
      return null;
    }

    return getColumnId(leftPinnedVisible[leftPinnedVisible.length - 1]);
  }, [visibleColumns, leftPinnedSet]);

  const firstRightPinnedField = React.useMemo(() => {
    const rightPinnedVisible = visibleColumns.filter((column) =>
      rightPinnedSet.has(getColumnId(column)),
    );

    if (rightPinnedVisible.length === 0) {
      return null;
    }

    return getColumnId(rightPinnedVisible[0]);
  }, [visibleColumns, rightPinnedSet]);

  const columnWidthMap = React.useMemo(() => {
    const map: Record<string, number> = {};

    visibleColumns.forEach((column) => {
      map[getColumnId(column)] = getColumnEstimatedWidth(
        getResolvedColumnWidth(column),
      );
    });

    return map;
  }, [visibleColumns]);

  const leftOffsets = React.useMemo(() => {
    let offset = checkboxSelection ? CHECKBOX_COLUMN_WIDTH : 0;
    const map: Record<string, number> = {};

    visibleColumns.forEach((column) => {
      const field = getColumnId(column);

      if (leftPinnedSet.has(field)) {
        map[field] = offset;
        offset += columnWidthMap[field];
      }
    });

    return map;
  }, [visibleColumns, leftPinnedSet, columnWidthMap, checkboxSelection]);

  const rightOffsets = React.useMemo(() => {
    let offset = 0;
    const map: Record<string, number> = {};

    [...visibleColumns].reverse().forEach((column) => {
      const field = getColumnId(column);

      if (rightPinnedSet.has(field)) {
        map[field] = offset;
        offset += columnWidthMap[field];
      }
    });

    return map;
  }, [visibleColumns, rightPinnedSet, columnWidthMap]);

  const computedColumnWidth = React.useMemo(() => {
    return visibleColumns.reduce(
      (total, column) => {
        return total + columnWidthMap[getColumnId(column)];
      },
      checkboxSelection ? CHECKBOX_COLUMN_WIDTH : 0,
    );
  }, [visibleColumns, columnWidthMap, checkboxSelection]);

  const stickyStyles = React.useMemo(() => {
    const map: Record<string, React.CSSProperties | undefined> = {};

    visibleColumns.forEach((column) => {
      const field = getColumnId(column);

      if (leftPinnedSet.has(field)) {
        map[field] = {
          position: "sticky",
          left: leftOffsets[field],
          zIndex: 2,
          background: "inherit",
          borderRight:
            field === lastLeftPinnedField
              ? `1px solid ${Borders.Default.Default}`
              : undefined,
        };
        return;
      }

      if (rightPinnedSet.has(field)) {
        map[field] = {
          position: "sticky",
          right: rightOffsets[field],
          zIndex: 2,
          background: "inherit",
          borderLeft:
            field === firstRightPinnedField
              ? `1px solid ${Borders.Default.Default}`
              : undefined,
        };
        return;
      }

      map[field] = undefined;
    });

    return map;
  }, [
    visibleColumns,
    leftPinnedSet,
    rightPinnedSet,
    leftOffsets,
    rightOffsets,
    lastLeftPinnedField,
    firstRightPinnedField,
  ]);

  const renderedColumns = React.useMemo<RenderedColumn<T>[]>(() => {
    return visibleColumns.map((column) => {
      const field = getColumnId(column);
      const sortable = !isActionsColumn(column) && column.sortable;

      return {
        column,
        field,
        sortable,
        currentSort: sortField === field ? sortDirection : "NONE",
        textAlign: getTextAlign(column.align),
        stickyStyle: stickyStyles[field],
      };
    });
  }, [visibleColumns, sortField, sortDirection, stickyStyles]);

  return (
    <Flex column gap={Gap.l}>
      <Flex justify="space-between" center gap={Gap.m}>
        <If is={searchable}>
          <InputText
            value={search}
            onChange={setSearch}
            placeholder={searchPlaceholder}
          />
        </If>

        <DataTableColumnManager
          columns={columns}
          columnVisibility={columnVisibility}
          toggleColumnVisibility={toggleColumnVisibility}
          resetColumnVisibility={resetColumnVisibility}
          pinnedColumns={pinnedColumns}
          pinColumn={pinColumn}
          resetPinnedColumns={resetPinnedColumns}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          resetColumnOrder={resetColumnOrder}
          mode={mode}
          showBackdrop={showBackdrop}
          inlineContainerRef={tableAreaRef}
        />
      </Flex>
      <TableFrame $responsive={isResponsive}>
        <TableScroll ref={tableAreaRef}>
          <Table
            $width={isResponsive ? "100%" : tableWidth || "auto"}
            $minWidth={
              isResponsive ? undefined : minTableWidth || computedColumnWidth
            }
          >
            <colgroup>
              <If is={checkboxSelection}>
                <col
                  style={{
                    width: CHECKBOX_COLUMN_WIDTH,
                    minWidth: CHECKBOX_COLUMN_WIDTH,
                  }}
                />
              </If>

              {renderedColumns.map(({ column, field }) => {
                const width = getResolvedColumnWidth(column);

                return (
                  <col
                    key={field}
                    style={{
                      width: column.fitContent ? "fit-content" : width,
                      minWidth: width,
                    }}
                  />
                );
              })}
            </colgroup>

            <TableHead>
              <TableRow>
                <If is={checkboxSelection}>
                  <TableHeaderCell.Select
                    checked={
                      allVisibleSelected
                        ? true
                        : someVisibleSelected
                          ? undefined
                          : false
                    }
                    onChange={toggleAllVisible}
                    style={{
                      ...checkboxStickyStyle,
                      background: Surface.Default.Subdued,
                      borderRight: !lastLeftPinnedField
                        ? `1px solid ${Borders.Default.Default}`
                        : undefined,
                    }}
                  />
                </If>

                {renderedColumns.map(
                  ({
                    field,
                    sortable,
                    currentSort,
                    textAlign,
                    stickyStyle,
                    column,
                  }) => (
                    <TableHeaderCell
                      key={field}
                      sort={sortable ? currentSort : undefined}
                      onSortClick={() => toggleSort(field, sortable)}
                      style={{
                        textAlign,
                        ...stickyStyle,
                        background: Surface.Default.Subdued,
                      }}
                      title={column.description}
                    >
                      {column.headerName ?? ""}
                    </TableHeaderCell>
                  ),
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.length === 0 ? (
                <TableRow>
                  <TableBodyCell colSpan={colSpan}>
                    <Label subdued>{emptyMessage}</Label>
                  </TableBodyCell>
                </TableRow>
              ) : (
                visibleRows.map((row) => {
                  const key = getRowKey(row);
                  const isSelected = selectedKeys.includes(key);

                  return (
                    <TableRow key={key} selected={isSelected}>
                      <If is={checkboxSelection}>
                        <TableBodyCell.Select
                          selected={isSelected}
                          onChange={() => toggleRow(row)}
                          style={{
                            ...checkboxStickyStyle,
                            background: isSelected
                              ? Surface.Selected.Default
                              : checkboxStickyStyle.background,
                            borderRight: !lastLeftPinnedField
                              ? `1px solid ${Borders.Default.Default}`
                              : undefined,
                            zIndex: 2,
                          }}
                        />
                      </If>

                      {renderedColumns.map(
                        ({ field, textAlign, stickyStyle, column }) => {
                          if (isActionsColumn(column)) {
                            const actions = column
                              .getActions(row)
                              .filter(
                                (action) =>
                                  !resolveActionFlag(action.hidden, row),
                              );

                            return (
                              <TableBodyCell.Actions
                                key={field}
                                fitContent={column.fitContent ?? true}
                                style={{
                                  textAlign,
                                  ...stickyStyle,
                                }}
                              >
                                {actions.map((action) => {
                                  const isDisabled = resolveActionFlag(
                                    action.disabled,
                                    row,
                                  );

                                  return (
                                    <TableBodyCell.Action
                                      key={`${field}-${action.key}`}
                                      onClick={() => action.onClick(row)}
                                      disabled={isDisabled}
                                      destructive={action.destructive}
                                      icon={action.icon}
                                    >
                                      {action.label}
                                    </TableBodyCell.Action>
                                  );
                                })}
                              </TableBodyCell.Actions>
                            );
                          }

                          const rawValue = getColumnRawValue(row, column);
                          const content = column.renderCell
                            ? column.renderCell(row, rawValue)
                            : rawValue;

                          return (
                            <TableBodyCell
                              key={field}
                              fitContent={column.fitContent}
                              style={{
                                textAlign,
                                ...stickyStyle,
                                background: isSelected
                                  ? Surface.Selected.Default
                                  : stickyStyle?.background,
                              }}
                            >
                              {content}
                            </TableBodyCell>
                          );
                        },
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableScroll>
      </TableFrame>

      <If is={paginated}>
        <SpaceBetween align="center">
          <Label subdued>
            {totalRows === 0
              ? "0 results"
              : `${page * pageSize + 1}-${Math.min(
                  (page + 1) * pageSize,
                  totalRows,
                )} of ${totalRows}`}
          </Label>

          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onChange={(nextPage) => setPage(nextPage - 1)}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            showPageSizeSelector
            pageSizeOptions={pageSizeOptions}
          />
        </SpaceBetween>
      </If>
    </Flex>
  );
}
