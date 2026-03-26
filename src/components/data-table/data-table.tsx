import { Checkbox } from "components/checkbox";
import { IconMinor } from "components/icon";
import { InputText } from "components/input-field";
import { Flex } from "components/layout";
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
import { Gap, Padding } from "foundation/spacing";
import { toCssSize } from "helpers/css-helpers";
import { If } from "helpers/nothing";
import React from "react";
import styled from "styled-components";

import type {
  GroupedBodyEntry,
  HeaderCellDescriptor,
  RenderedColumn,
} from "./dataTable.shared";
import {
  getColumnId,
  getDefaultGroupLabel,
  getResolvedColumnWidth,
  getTextAlign,
  isActionsColumn,
} from "./dataTable.shared";
import { DataTableColumnManager } from "./DataTableColumnManager";
import type { DataTableProps } from "./types";
import { useDataTable } from "./useDataTable";
import {
  type ResolvedBodyCell,
  useDataTableBodySpans,
} from "./useDataTableBodySpans";
import { useDataTableColumnGrouping } from "./useDataTableColumnGrouping";
import { useDataTablePinnedStyles } from "./useDataTablePinnedStyles";
import { useDataTableRowGrouping } from "./useDataTableRowGrouping";

const TableFrame = styled.div<{
  $responsive: boolean;
  $borderTop?: boolean;
  $borderBottom?: boolean;
}>`
  display: grid;
  min-width: 0;
  border-top: ${({ $borderTop }) =>
    $borderTop ? `1px solid ${Borders.Default.Default}` : "none"};
  border-bottom: ${({ $borderBottom }) =>
    $borderBottom ? `1px solid ${Borders.Default.Default}` : "none"};
  overflow: hidden;
  border-top-left-radius: ${({ $borderTop }) => ($borderTop ? 0 : "6px")};
  border-top-right-radius: ${({ $borderTop }) => ($borderTop ? 0 : "6px")};
  border-bottom-left-radius: ${({ $borderBottom }) =>
    $borderBottom ? 0 : "6px"};
  border-bottom-right-radius: ${({ $borderBottom }) =>
    $borderBottom ? 0 : "6px"};

  & table {
    display: ${(props) => (props.$responsive ? "table" : "block")};
    border: none;
    box-shadow: none;
  }
`;

const TableScroll = styled.div<{ $maxTableHeight?: string }>`
  width: 100%;
  min-width: 0;
  max-height: ${({ $maxTableHeight }) => $maxTableHeight};
  overflow: auto;
`;

const TableContainer = styled(Flex)`
  position: relative;
  flex-direction: column;
  border: 1px solid ${Borders.Default.Default};
  ${shadowMd};
  background: ${Surface.Default.Default};
`;

export const TableSibling = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: ${Padding.m};
`;

const checkboxStickyStyle: React.CSSProperties = {
  position: "sticky",
  left: 0,
  background: "inherit",
};

const GroupToggleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${Gap.s};
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
`;

function resolveActionFlag<T extends Record<string, unknown>>(
  value: boolean | ((row: T) => boolean) | undefined,
  row: T,
) {
  if (typeof value === "function") {
    return value(row);
  }

  return Boolean(value);
}

export function DataTable<T extends Record<string, unknown>>(
  props: DataTableProps<T>,
) {
  const {
    searchable = false,
    columns,
    columnGroups: rawColumnGroups,
    searchPlaceholder = "Search...",
    checkboxSelection = false,
    emptyMessage = "No rows found.",
    showBackdrop,
    mode,
    layoutMode = "responsive",
    tableWidth,
    minTableWidth,
    maxTableHeight = "max-content",
    striped = true,
    showCellBorders = false,
    manageColumns = false,
    rowGrouping: rawRowGrouping,
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
    selectedKeySet,
    setSelectedKeys,
    toggleRow,

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

  const {
    checkboxColumnWidth,
    leftPinnedSet,
    rightPinnedSet,
    lastLeftPinnedField,
    firstRightPinnedField,
    leftOffsets,
    rightOffsets,
    computedColumnWidth,
    stickyStyles,
  } = useDataTablePinnedStyles({
    visibleColumns,
    pinnedColumns,
    checkboxSelection,
    borderColor: Borders.Default.Default,
  });

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

  const { hasGroupedHeaders, headerRowCount, headerRows } =
    useDataTableColumnGrouping({
      columnGroups: rawColumnGroups,
      renderedColumns,
    });

  const {
    groupedBodyEntries,
    toggleAllExpanded,
    selectAllState,
    toggleGroup,
    renderGroupHeader,
  } = useDataTableRowGrouping({
    rowGrouping: rawRowGrouping,
    visibleRows,
    getRowKey,
    checkboxSelection,
    selectedKeys,
    selectedKeySet,
    setSelectedKeys,
  });

  const bodySpanState = useDataTableBodySpans<T>({
    groupedBodyEntries,
    renderedColumns,
    getColumnRawValue,
  });
  const { hasBodySpans, bodyCellsByKey } = bodySpanState;

  const cellBorderMode = React.useMemo(() => {
    if (!showCellBorders) {
      return undefined;
    }

    return lastLeftPinnedField || firstRightPinnedField ? "horizontal" : "all";
  }, [showCellBorders, lastLeftPinnedField, firstRightPinnedField]);

  const defaultBodyCells = React.useMemo<ResolvedBodyCell<T>[]>(
    () =>
      renderedColumns.map((renderedColumn, columnIndex) => ({
        renderedColumn,
        columnStart: columnIndex + 1,
        colSpan: 1,
        rowSpan: 1,
        rawValue: undefined,
      })),
    [renderedColumns],
  );

  const lastVisibleField = renderedColumns[renderedColumns.length - 1]?.field;

  const shouldRenderHeaderDivider = React.useCallback(
    (field: string) => {
      if (showCellBorders) {
        return false;
      }

      if (!field || field === lastVisibleField) {
        return false;
      }

      if (field === lastLeftPinnedField || field === firstRightPinnedField) {
        return false;
      }

      return true;
    },
    [
      showCellBorders,
      lastVisibleField,
      lastLeftPinnedField,
      firstRightPinnedField,
    ],
  );

  const renderSelectAllHeader = React.useCallback(
    (rowSpan?: number) => {
      const sharedStyle = {
        ...checkboxStickyStyle,
        background: Surface.Default.Muted,
        borderRight:
          showCellBorders && !lastLeftPinnedField
            ? `1px solid ${Borders.Default.Default}`
            : undefined,
      };

      if (rowSpan) {
        return (
          <TableHeaderCell
            rowSpan={rowSpan}
            style={sharedStyle}
            dividerRight={!showCellBorders && visibleColumns.length > 0}
          >
            <Checkbox
              checked={selectAllState}
              onChange={toggleAllExpanded}
              indeterminate
            />
          </TableHeaderCell>
        );
      }

      return (
        <TableHeaderCell
          style={sharedStyle}
          dividerRight={!showCellBorders && visibleColumns.length > 0}
        >
          <Checkbox
            checked={selectAllState}
            onChange={toggleAllExpanded}
            indeterminate
          />
        </TableHeaderCell>
      );
    },
    [
      lastLeftPinnedField,
      selectAllState,
      toggleAllExpanded,
      showCellBorders,
      visibleColumns.length,
    ],
  );

  const renderColumnHeaderCell = React.useCallback(
    (renderedColumn: RenderedColumn<T>, rowSpan?: number) => {
      const { field, sortable, currentSort, textAlign, stickyStyle, column } =
        renderedColumn;

      return (
        <TableHeaderCell
          key={field}
          rowSpan={rowSpan}
          dividerRight={shouldRenderHeaderDivider(field)}
          sort={sortable ? currentSort : undefined}
          onSortClick={() => toggleSort(field, sortable)}
          style={{
            textAlign,
            ...stickyStyle,
            background: Surface.Default.Muted,
          }}
          title={column.description}
        >
          {column.headerName ?? ""}
        </TableHeaderCell>
      );
    },
    [toggleSort, shouldRenderHeaderDivider],
  );

  const getGroupHeaderStickyStyle = React.useCallback(
    (leafColumns: RenderedColumn<T>[]) => {
      const leafFields = leafColumns.map(({ field }) => field);
      const allPinnedLeft = leafFields.every((field) =>
        leftPinnedSet.has(field),
      );
      const allPinnedRight = leafFields.every((field) =>
        rightPinnedSet.has(field),
      );
      const firstField = leafFields[0];
      const lastField = leafFields[leafFields.length - 1];

      if (allPinnedLeft) {
        return {
          position: "sticky" as const,
          left: leftOffsets[firstField],
          zIndex: 3,
          background: Surface.Default.Muted,
          borderRight:
            lastField === lastLeftPinnedField
              ? `1px solid ${Borders.Default.Default}`
              : undefined,
        };
      }

      if (allPinnedRight) {
        return {
          position: "sticky" as const,
          right: rightOffsets[firstField],
          zIndex: 3,
          background: Surface.Default.Muted,
          borderLeft:
            firstField === firstRightPinnedField
              ? `1px solid ${Borders.Default.Default}`
              : undefined,
        };
      }

      return undefined;
    },
    [
      leftPinnedSet,
      rightPinnedSet,
      leftOffsets,
      rightOffsets,
      lastLeftPinnedField,
      firstRightPinnedField,
    ],
  );

  const renderGroupHeaderContent = React.useCallback(
    (entry: Extract<GroupedBodyEntry<T>, { type: "group" }>) => {
      const content = renderGroupHeader ? (
        renderGroupHeader(
          entry.value,
          entry.rows,
          entry.collapsed,
          entry.depth,
          entry.path,
        )
      ) : (
        <Label strong>{getDefaultGroupLabel(entry.value)}</Label>
      );

      if (!entry.collapsible) {
        return content;
      }

      return (
        <GroupToggleButton
          type="button"
          aria-label={getDefaultGroupLabel(entry.value)}
          onClick={() => toggleGroup(entry.key)}
          style={{ paddingLeft: entry.depth * 16 }}
        >
          {entry.collapsed ? (
            <IconMinor.ChevronRightSolid />
          ) : (
            <IconMinor.ChevronDownSolid />
          )}
          {content}
        </GroupToggleButton>
      );
    },
    [renderGroupHeader, toggleGroup],
  );

  return (
    <TableContainer ref={tableAreaRef}>
      <If is={searchable || manageColumns}>
        <TableSibling gap={Gap.m}>
          <If is={searchable}>
            <InputText
              value={search}
              onChange={setSearch}
              placeholder={searchPlaceholder}
            />
          </If>

          <If is={manageColumns}>
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
          </If>
        </TableSibling>
      </If>

      <TableFrame
        $responsive={isResponsive}
        $borderTop={searchable || manageColumns}
        $borderBottom={paginated}
      >
        <TableScroll $maxTableHeight={toCssSize(maxTableHeight)}>
          <Table
            $cellBorders={cellBorderMode}
            $width={isResponsive ? "100%" : tableWidth || "auto"}
            $minWidth={
              isResponsive ? undefined : minTableWidth || computedColumnWidth
            }
          >
            <colgroup>
              <If is={checkboxSelection}>
                <col
                  style={{
                    width: checkboxColumnWidth,
                    minWidth: checkboxColumnWidth,
                  }}
                />
              </If>

              {renderedColumns.map(({ column, field }) => {
                const width = getResolvedColumnWidth(column);
                const flexibleResponsiveColumn =
                  isResponsive && (column.fullWidth || column.width == null);

                return (
                  <col
                    key={field}
                    style={{
                      width: flexibleResponsiveColumn
                        ? "auto"
                        : column.fitContent
                          ? "fit-content"
                          : width,
                      minWidth: width,
                    }}
                  />
                );
              })}
            </colgroup>

            <TableHead>
              <If is={hasGroupedHeaders}>
                {headerRows.map((headerRow: HeaderCellDescriptor<T>[]) => (
                  <TableRow
                    key={headerRow
                      .map((cell) =>
                        cell.type === "group"
                          ? `group-${cell.group.key}`
                          : `column-${cell.column.field}`,
                      )
                      .join("|")}
                  >
                    <If
                      is={Boolean(
                        checkboxSelection &&
                        headerRows[0] &&
                        headerRow === headerRows[0],
                      )}
                    >
                      {renderSelectAllHeader(headerRowCount)}
                    </If>

                    {headerRow.map((cell) => {
                      if (cell.type === "column") {
                        return renderColumnHeaderCell(
                          cell.column,
                          cell.rowSpan,
                        );
                      }

                      return (
                        <TableHeaderCell
                          key={`${cell.group.key}-${cell.leafColumns[0].field}`}
                          colSpan={cell.colSpan}
                          dividerRight={shouldRenderHeaderDivider(
                            cell.leafColumns[cell.leafColumns.length - 1]
                              ?.field ?? "",
                          )}
                          style={{
                            textAlign: cell.group.align ?? "left",
                            ...getGroupHeaderStickyStyle(cell.leafColumns),
                            background: Surface.Default.Muted,
                          }}
                          title={cell.group.description}
                        >
                          {cell.group.headerName}
                        </TableHeaderCell>
                      );
                    })}
                  </TableRow>
                ))}
              </If>

              <If is={!hasGroupedHeaders}>
                <TableRow>
                  <If is={checkboxSelection}>{renderSelectAllHeader()}</If>

                  {renderedColumns.map((column) =>
                    renderColumnHeaderCell(column),
                  )}
                </TableRow>
              </If>
            </TableHead>

            <TableBody $striped={striped}>
              {visibleRows.length === 0 ? (
                <TableRow>
                  <TableBodyCell colSpan={colSpan}>
                    <Label muted>{emptyMessage}</Label>
                  </TableBodyCell>
                </TableRow>
              ) : (
                groupedBodyEntries.map((entry) => {
                  if (entry.type === "group") {
                    return (
                      <TableRow key={entry.key}>
                        <TableBodyCell
                          colSpan={colSpan}
                          style={{ background: Surface.Default.Muted }}
                        >
                          {renderGroupHeaderContent(entry)}
                        </TableBodyCell>
                      </TableRow>
                    );
                  }

                  const { row, key } = entry;
                  const isSelected = selectedKeySet.has(key);
                  const bodyCells =
                    hasBodySpans && bodyCellsByKey.has(key)
                      ? (bodyCellsByKey.get(key) ?? defaultBodyCells)
                      : defaultBodyCells;

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

                      {bodyCells.map(
                        ({ renderedColumn, colSpan, rowSpan, rawValue }) => {
                          const { field, textAlign, stickyStyle, column } =
                            renderedColumn;

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
                                colSpan={colSpan > 1 ? colSpan : undefined}
                                rowSpan={rowSpan > 1 ? rowSpan : undefined}
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

                          const resolvedValue =
                            rawValue ?? getColumnRawValue(row, column);
                          const content = column.renderCell
                            ? column.renderCell(row, resolvedValue)
                            : resolvedValue;

                          return (
                            <TableBodyCell
                              key={field}
                              fitContent={column.fitContent}
                              overflow={column.overflow}
                              colSpan={colSpan > 1 ? colSpan : undefined}
                              rowSpan={rowSpan > 1 ? rowSpan : undefined}
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
        <TableSibling gap={Gap.m}>
          <Label muted>
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
        </TableSibling>
      </If>
    </TableContainer>
  );
}
