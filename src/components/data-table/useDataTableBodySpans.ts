import { clamp } from "helpers/numbers";
import React from "react";

import type { GroupedBodyEntry, RenderedColumn } from "./dataTable.shared";
import { isActionsColumn } from "./dataTable.shared";
import type { DataTableRegularColumn, DataTableSpanValue } from "./types";

export type ResolvedBodyCell<T extends Record<string, unknown>> = {
  renderedColumn: RenderedColumn<T>;
  columnStart: number;
  colSpan: number;
  rowSpan: number;
  rawValue?: React.ReactNode;
};

type UseDataTableBodySpansArgs<T extends Record<string, unknown>> = {
  groupedBodyEntries: GroupedBodyEntry<T>[];
  renderedColumns: RenderedColumn<T>[];
  getColumnRawValue: (
    row: T,
    column: DataTableRegularColumn<T>,
  ) => React.ReactNode;
};

type UseDataTableBodySpansResult<T extends Record<string, unknown>> = {
  hasBodySpans: boolean;
  bodyCellsByKey: Map<React.Key, ResolvedBodyCell<T>[]>;
};

const EMPTY_ROW_CELLS_BY_KEY = new Map<React.Key, never[]>();

function collectRowSections<T extends Record<string, unknown>>(
  groupedBodyEntries: GroupedBodyEntry<T>[],
) {
  const rowSections: Array<
    Array<Extract<GroupedBodyEntry<T>, { type: "row" }>>
  > = [];
  let currentSection: Array<Extract<GroupedBodyEntry<T>, { type: "row" }>> = [];

  groupedBodyEntries.forEach((entry) => {
    if (entry.type === "group") {
      if (currentSection.length > 0) {
        rowSections.push(currentSection);
        currentSection = [];
      }

      return;
    }

    currentSection.push(entry);
  });

  if (currentSection.length > 0) {
    rowSections.push(currentSection);
  }

  return rowSections;
}

function resolveClampedSpanValue(value: unknown, max: number) {
  const parsedValue = typeof value === "number" ? value : Number(value);

  return clamp(Math.floor(parsedValue), 1, max);
}

function resolveSpanValue<T extends Record<string, unknown>>(
  span: DataTableSpanValue<T> | undefined,
  args: {
    row: T;
    rowIndex: number;
    rows: T[];
    value: React.ReactNode;
  },
) {
  if (typeof span === "function") {
    return span(args);
  }

  return span;
}

function getAvailableColSpanCount(
  blockedColumns: boolean[],
  skippedColumns: boolean[],
  startIndex: number,
) {
  const nextBlockedIndex = blockedColumns.findIndex(
    (isBlocked, index) =>
      index > startIndex && (isBlocked || skippedColumns[index]),
  );

  return nextBlockedIndex === -1
    ? blockedColumns.length - startIndex
    : nextBlockedIndex - startIndex;
}

function markSkippedColumns(
  skippedColumns: boolean[],
  startIndex: number,
  colSpan: number,
) {
  for (let offset = 1; offset < colSpan; offset += 1) {
    skippedColumns[startIndex + offset] = true;
  }
}

function markRowSpanCoverage(
  nextPendingRowSpans: number[],
  startIndex: number,
  colSpan: number,
  rowSpan: number,
) {
  if (rowSpan <= 1) {
    return;
  }

  for (let offset = 0; offset < colSpan; offset += 1) {
    const columnIndex = startIndex + offset;
    nextPendingRowSpans[columnIndex] = Math.max(
      nextPendingRowSpans[columnIndex],
      rowSpan - 1,
    );
  }
}

function buildSectionBodyCells<T extends Record<string, unknown>>(
  sectionEntries: Array<Extract<GroupedBodyEntry<T>, { type: "row" }>>,
  renderedColumns: RenderedColumn<T>[],
  getColumnRawValue: (
    row: T,
    column: DataTableRegularColumn<T>,
  ) => React.ReactNode,
  bodyCellsByKey: Map<React.Key, ResolvedBodyCell<T>[]>,
) {
  const sectionRows = sectionEntries.map(({ row }) => row);

  sectionEntries.reduce<number[]>(
    (pendingRowSpans, entry, rowIndex) => {
      const blockedColumns = pendingRowSpans.map((count) => count > 0);
      const nextPendingRowSpans = pendingRowSpans.map((count) =>
        count > 0 ? count - 1 : 0,
      );
      const skippedColumns = renderedColumns.map(() => false);

      const rowCells = renderedColumns.flatMap<ResolvedBodyCell<T>>(
        (renderedColumn, columnIndex) => {
          if (blockedColumns[columnIndex] || skippedColumns[columnIndex]) {
            return [];
          }

          const { column } = renderedColumn;

          if (isActionsColumn(column)) {
            return [
              {
                renderedColumn,
                columnStart: columnIndex + 1,
                colSpan: 1,
                rowSpan: 1,
              },
            ];
          }

          const rawValue = getColumnRawValue(entry.row, column);
          const spanArgs = {
            row: entry.row,
            rowIndex,
            rows: sectionRows,
            value: rawValue,
          };
          const colSpan = resolveClampedSpanValue(
            resolveSpanValue(column.colSpan, spanArgs),
            getAvailableColSpanCount(
              blockedColumns,
              skippedColumns,
              columnIndex,
            ),
          );
          const rowSpan = resolveClampedSpanValue(
            resolveSpanValue(column.rowSpan, spanArgs),
            sectionEntries.length - rowIndex,
          );

          markSkippedColumns(skippedColumns, columnIndex, colSpan);
          markRowSpanCoverage(
            nextPendingRowSpans,
            columnIndex,
            colSpan,
            rowSpan,
          );

          return [
            {
              renderedColumn,
              columnStart: columnIndex + 1,
              colSpan,
              rowSpan,
              rawValue,
            },
          ];
        },
      );

      bodyCellsByKey.set(entry.key, rowCells);

      return nextPendingRowSpans;
    },
    renderedColumns.map(() => 0),
  );
}

export function useDataTableBodySpans<T extends Record<string, unknown>>({
  groupedBodyEntries,
  renderedColumns,
  getColumnRawValue,
}: UseDataTableBodySpansArgs<T>): UseDataTableBodySpansResult<T> {
  const hasBodySpans = React.useMemo(
    () =>
      renderedColumns.some(
        ({ column }) =>
          !isActionsColumn(column) &&
          (column.colSpan !== undefined || column.rowSpan !== undefined),
      ),
    [renderedColumns],
  );

  const bodyCellsByKey = React.useMemo(() => {
    if (!hasBodySpans) {
      return EMPTY_ROW_CELLS_BY_KEY as Map<React.Key, ResolvedBodyCell<T>[]>;
    }

    const nextBodyCellsByKey = new Map<React.Key, ResolvedBodyCell<T>[]>();

    collectRowSections(groupedBodyEntries).forEach((sectionEntries) => {
      buildSectionBodyCells(
        sectionEntries,
        renderedColumns,
        getColumnRawValue,
        nextBodyCellsByKey,
      );
    });

    return nextBodyCellsByKey;
  }, [groupedBodyEntries, renderedColumns, getColumnRawValue, hasBodySpans]);

  return {
    hasBodySpans,
    bodyCellsByKey,
  };
}
