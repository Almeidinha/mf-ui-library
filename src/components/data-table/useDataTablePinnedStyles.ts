import React from "react";

import { getColumnId, getResolvedColumnWidth } from "./dataTable.shared";
import type { DataTableColumn } from "./types";

const CHECKBOX_COLUMN_WIDTH = 55;

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

function buildPinnedOffsets<T extends Record<string, unknown>>(
  columns: DataTableColumn<T>[],
  pinnedSet: Set<string>,
  columnWidthMap: Record<string, number>,
  initialOffset = 0,
) {
  const map: Record<string, number> = {};
  let offset = initialOffset;

  columns.forEach((column) => {
    const field = getColumnId(column);

    if (!pinnedSet.has(field)) {
      return;
    }

    map[field] = offset;
    offset += columnWidthMap[field];
  });

  return map;
}

type UseDataTablePinnedStylesArgs<T extends Record<string, unknown>> = {
  visibleColumns: DataTableColumn<T>[];
  pinnedColumns: {
    left: string[];
    right: string[];
  };
  checkboxSelection: boolean;
  borderColor: string;
};

type UseDataTablePinnedStylesResult = {
  checkboxColumnWidth: number;
  leftPinnedSet: Set<string>;
  rightPinnedSet: Set<string>;
  lastLeftPinnedField: string | null;
  firstRightPinnedField: string | null;
  columnWidthMap: Record<string, number>;
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
  computedColumnWidth: number;
  stickyStyles: Record<string, React.CSSProperties | undefined>;
};

export function useDataTablePinnedStyles<T extends Record<string, unknown>>({
  visibleColumns,
  pinnedColumns,
  checkboxSelection,
  borderColor,
}: UseDataTablePinnedStylesArgs<T>): UseDataTablePinnedStylesResult {
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

  const leftOffsets = React.useMemo(
    () =>
      buildPinnedOffsets(
        visibleColumns,
        leftPinnedSet,
        columnWidthMap,
        checkboxSelection ? CHECKBOX_COLUMN_WIDTH : 0,
      ),
    [visibleColumns, leftPinnedSet, columnWidthMap, checkboxSelection],
  );

  const rightOffsets = React.useMemo(
    () =>
      buildPinnedOffsets(
        [...visibleColumns].reverse(),
        rightPinnedSet,
        columnWidthMap,
      ),
    [visibleColumns, rightPinnedSet, columnWidthMap],
  );

  const computedColumnWidth = React.useMemo(
    () =>
      visibleColumns.reduce(
        (total, column) => total + columnWidthMap[getColumnId(column)],
        checkboxSelection ? CHECKBOX_COLUMN_WIDTH : 0,
      ),
    [visibleColumns, columnWidthMap, checkboxSelection],
  );

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
              ? `1px solid ${borderColor}`
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
              ? `1px solid ${borderColor}`
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
    borderColor,
  ]);

  return {
    checkboxColumnWidth: CHECKBOX_COLUMN_WIDTH,
    leftPinnedSet,
    rightPinnedSet,
    lastLeftPinnedField,
    firstRightPinnedField,
    columnWidthMap,
    leftOffsets,
    rightOffsets,
    computedColumnWidth,
    stickyStyles,
  };
}
