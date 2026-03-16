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
import { Gap } from "foundation/spacing";
import { If } from "helpers/nothing";
import React from "react";
import styled from "styled-components";

import { DataTableColumnManager } from "./DataTableColumnManager";
import { DataTableColumn, DataTableProps } from "./types";
import { useDataTable } from "./useDataTable";

const TableScroll = styled.div`
  width: 100%;
  position: relative;
  overflow-x: auto;
`;

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
  } = props;

  const tableAreaRef = React.useRef<HTMLDivElement | null>(null);

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

  const leftOffsets = React.useMemo(() => {
    let offset = checkboxSelection ? 56 : 0;
    const map: Record<string, number> = {};

    visibleColumns.forEach((column) => {
      const field = getColumnId(column);

      if (pinnedColumns.left.includes(field)) {
        map[field] = offset;
        offset += getColumnEstimatedWidth(column.width);
      }
    });

    return map;
  }, [visibleColumns, pinnedColumns.left, checkboxSelection]);

  const rightOffsets = React.useMemo(() => {
    let offset = 0;
    const map: Record<string, number> = {};

    [...visibleColumns].reverse().forEach((column) => {
      const field = getColumnId(column);

      if (pinnedColumns.right.includes(field)) {
        map[field] = offset;
        offset += getColumnEstimatedWidth(column.width);
      }
    });

    return map;
  }, [visibleColumns, pinnedColumns.right]);

  const getStickyStyle = (field: string): React.CSSProperties | undefined => {
    if (pinnedColumns.left.includes(field)) {
      return {
        position: "sticky",
        left: leftOffsets[field],
        zIndex: 2,
        background: "inherit",
      };
    }

    if (pinnedColumns.right.includes(field)) {
      return {
        position: "sticky",
        right: rightOffsets[field],
        zIndex: 2,
        background: "inherit",
      };
    }

    return undefined;
  };

  return (
    <Flex column gap={Gap.l}>
      <Flex justify="space-between" center gap={Gap.m}>
        {searchable ? (
          <InputText
            value={search}
            onChange={setSearch}
            placeholder={searchPlaceholder}
          />
        ) : (
          <div />
        )}

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

      <TableScroll ref={tableAreaRef}>
        <Table>
          <TableHead>
            <TableRow>
              {checkboxSelection ? (
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
                    position: "sticky",
                    left: 0,
                    zIndex: 3,
                    background: "inherit",
                  }}
                />
              ) : null}

              {visibleColumns.map((column) => {
                const field = getColumnId(column);
                const currentSort =
                  sortField === field ? sortDirection : "NONE";
                const sortable = !isActionsColumn(column) && column.sortable;

                return (
                  <TableHeaderCell
                    key={field}
                    sort={sortable ? currentSort : undefined}
                    onSortClick={() => toggleSort(field, sortable)}
                    style={{
                      width: column.width,
                      textAlign: getTextAlign(column.align),
                      ...getStickyStyle(field),
                    }}
                    title={column.description}
                  >
                    {column.headerName ?? ""}
                  </TableHeaderCell>
                );
              })}
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
                    {checkboxSelection ? (
                      <TableBodyCell.Select
                        selected={isSelected}
                        onChange={() => toggleRow(row)}
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 2,
                          background: "inherit",
                        }}
                      />
                    ) : null}

                    {visibleColumns.map((column) => {
                      const field = getColumnId(column);

                      if (isActionsColumn(column)) {
                        const actions = column
                          .getActions(row)
                          .filter(
                            (action) => !resolveActionFlag(action.hidden, row),
                          );

                        return (
                          <TableBodyCell.Actions
                            key={field}
                            fitContent={column.fitContent ?? true}
                            style={{
                              textAlign: getTextAlign(column.align),
                              ...getStickyStyle(field),
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
                            textAlign: getTextAlign(column.align),
                            ...getStickyStyle(field),
                          }}
                        >
                          {content}
                        </TableBodyCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableScroll>

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
