import React from "react";

import {
  collectColumnGroupPaths,
  EMPTY_GROUP_PATHS,
  EMPTY_HEADER_ROWS,
  normalizeColumnGroups,
} from "./dataTable.grouping.shared";
import type {
  DataTableColumnGroupConfig,
  HeaderCellDescriptor,
  RenderedColumn,
} from "./dataTable.shared";

type UseDataTableColumnGroupingArgs<T extends Record<string, unknown>> = {
  columnGroups?: unknown;
  renderedColumns: RenderedColumn<T>[];
};

type UseDataTableColumnGroupingResult<T extends Record<string, unknown>> = {
  hasGroupedHeaders: boolean;
  headerRowCount: number;
  headerRows: HeaderCellDescriptor<T>[][];
};

export function useDataTableColumnGrouping<T extends Record<string, unknown>>({
  columnGroups,
  renderedColumns,
}: UseDataTableColumnGroupingArgs<T>): UseDataTableColumnGroupingResult<T> {
  const hasColumnGrouping =
    Array.isArray(columnGroups) && columnGroups.length > 0;

  const groupingColumns = React.useMemo(
    () =>
      hasColumnGrouping
        ? normalizeColumnGroups<T>(columnGroups)
        : ([] as DataTableColumnGroupConfig<T>[]),
    [hasColumnGrouping, columnGroups],
  );

  const columnGroupPaths = React.useMemo(
    () =>
      hasColumnGrouping
        ? collectColumnGroupPaths(groupingColumns)
        : (EMPTY_GROUP_PATHS as Map<string, DataTableColumnGroupConfig<T>[]>),
    [hasColumnGrouping, groupingColumns],
  );

  const maxHeaderGroupDepth = React.useMemo(
    () =>
      hasColumnGrouping
        ? renderedColumns.reduce(
            (depth, column) =>
              Math.max(depth, columnGroupPaths.get(column.field)?.length ?? 0),
            0,
          )
        : 0,
    [hasColumnGrouping, renderedColumns, columnGroupPaths],
  );

  const hasGroupedHeaders = maxHeaderGroupDepth > 0;
  const headerRowCount = hasGroupedHeaders ? maxHeaderGroupDepth + 1 : 1;

  const headerRows = React.useMemo<HeaderCellDescriptor<T>[][]>(() => {
    if (!hasGroupedHeaders) {
      return EMPTY_HEADER_ROWS as HeaderCellDescriptor<T>[][];
    }

    return Array.from({ length: headerRowCount }, (_, depth) => {
      return renderedColumns.reduce<HeaderCellDescriptor<T>[]>(
        (cells, column) => {
          const path = columnGroupPaths.get(column.field) ?? [];

          if (depth < path.length) {
            const group = path[depth];
            const lastCell = cells[cells.length - 1];

            if (
              lastCell?.type === "group" &&
              lastCell.group.key === group.key
            ) {
              lastCell.colSpan += 1;
              lastCell.leafColumns.push(column);
              return cells;
            }

            cells.push({
              type: "group",
              group,
              leafColumns: [column],
              colSpan: 1,
            });
            return cells;
          }

          if (depth === path.length) {
            cells.push({
              type: "column",
              column,
              rowSpan: maxHeaderGroupDepth - path.length + 1,
            });
          }

          return cells;
        },
        [],
      );
    });
  }, [
    hasGroupedHeaders,
    headerRowCount,
    renderedColumns,
    columnGroupPaths,
    maxHeaderGroupDepth,
  ]);

  return {
    hasGroupedHeaders,
    headerRowCount,
    headerRows,
  };
}
