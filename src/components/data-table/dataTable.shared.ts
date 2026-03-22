import React from "react";

import type { DataTableColumn, DataTableProps } from "./types";

export type GroupValue = string | number | boolean | null | undefined;

export type DataTableColumnGroupConfig<T extends Record<string, unknown>> = {
  key: string;
  headerName: React.ReactNode;
  description?: string;
  align?: DataTableColumn<T>["align"];
  fields: string[];
  children: DataTableColumnGroupConfig<T>[];
};

export type RenderedColumn<T extends Record<string, unknown>> = {
  column: DataTableColumn<T>;
  field: string;
  sortable: boolean | undefined;
  currentSort: DataTableProps<T>["sortDirection"];
  textAlign: "left" | "center" | "right";
  stickyStyle?: React.CSSProperties;
};

export type HeaderCellDescriptor<T extends Record<string, unknown>> =
  | {
      type: "group";
      group: DataTableColumnGroupConfig<T>;
      leafColumns: RenderedColumn<T>[];
      colSpan: number;
    }
  | {
      type: "column";
      column: RenderedColumn<T>;
      rowSpan: number;
    };

export type GroupedBodyEntry<T extends Record<string, unknown>> =
  | {
      type: "group";
      key: string;
      value: GroupValue;
      rows: T[];
      collapsed: boolean;
      collapsible: boolean;
      depth: number;
      path: GroupValue[];
    }
  | {
      type: "row";
      key: React.Key;
      row: T;
    };

export function getColumnId<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
) {
  return String(column.field);
}

export function isActionsColumn<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
): column is Extract<DataTableColumn<T>, { type: "actions" }> {
  return column.type === "actions";
}

export function getTextAlign(
  align?: DataTableColumn<Record<string, unknown>>["align"],
) {
  return align ?? "left";
}

export function getResolvedColumnWidth<T extends Record<string, unknown>>(
  column: DataTableColumn<T>,
) {
  return column.width ?? (column.fitContent ? 120 : 160);
}

export function getDefaultGroupLabel(value: GroupValue) {
  return value == null || value === "" ? "Ungrouped" : String(value);
}
