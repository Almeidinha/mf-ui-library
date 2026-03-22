import React from "react";

import type {
  DataTableColumnGroupConfig,
  GroupedBodyEntry,
  GroupValue,
} from "./dataTable.shared";
import type { DataTableRowGrouping } from "./types";

export type DataTableRowGroupingConfig<T extends Record<string, unknown>> = {
  fields: string[];
  collapsible: boolean;
  defaultCollapsed: boolean;
  renderGroupHeader?: (
    value: GroupValue,
    rows: T[],
    collapsed: boolean,
    depth: number,
    path: GroupValue[],
  ) => React.ReactNode;
};

export type RowLeafEntry<T extends Record<string, unknown>> = {
  type: "row";
  key: React.Key;
  row: T;
};

export type RowGroupNode<T extends Record<string, unknown>> = {
  type: "group";
  key: string;
  value: GroupValue;
  rows: T[];
  depth: number;
  path: GroupValue[];
  children: Array<RowGroupNode<T> | RowLeafEntry<T>>;
};

export const EMPTY_GROUPED_BODY: never[] = [];
export const EMPTY_HEADER_ROWS: never[] = [];
export const EMPTY_GROUP_PATHS = new Map<string, never[]>();

export function isObjectRecord(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function toGroupValue(value: unknown): GroupValue {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value == null
  ) {
    return value;
  }

  return undefined;
}

export function normalizeColumnGroups<T extends Record<string, unknown>>(
  value: unknown,
): DataTableColumnGroupConfig<T>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((group) => {
    if (!isObjectRecord(group)) {
      return [];
    }

    const fields = Array.isArray(group.fields)
      ? group.fields.map((field) => String(field))
      : [];
    const children = normalizeColumnGroups<T>(group.children);

    if (fields.length === 0 && children.length === 0) {
      return [];
    }

    const align =
      group.align === "left" ||
      group.align === "center" ||
      group.align === "right"
        ? group.align
        : undefined;

    return [
      {
        key:
          typeof group.key === "string"
            ? group.key
            : [...fields, ...children.map((child) => child.key)].join("-"),
        headerName: (group.headerName ??
          (typeof group.key === "string"
            ? group.key
            : "Group")) as React.ReactNode,
        description:
          typeof group.description === "string" ? group.description : undefined,
        align,
        fields,
        children,
      },
    ];
  });
}

export function collectColumnGroupPaths<T extends Record<string, unknown>>(
  groups: DataTableColumnGroupConfig<T>[],
) {
  const paths = new Map<string, DataTableColumnGroupConfig<T>[]>();

  const visit = (
    group: DataTableColumnGroupConfig<T>,
    ancestors: DataTableColumnGroupConfig<T>[],
  ) => {
    const path = [...ancestors, group];

    group.fields.forEach((field) => {
      paths.set(field, path);
    });

    group.children.forEach((child) => {
      visit(child, path);
    });
  };

  groups.forEach((group) => {
    visit(group, []);
  });

  return paths;
}

export function normalizeRowGrouping<T extends Record<string, unknown>>(
  rawRowGrouping: DataTableRowGrouping<T> | undefined,
): DataTableRowGroupingConfig<T> | null {
  if (!isObjectRecord(rawRowGrouping)) {
    return null;
  }

  const renderGroupHeader =
    typeof rawRowGrouping.renderGroupHeader === "function"
      ? rawRowGrouping.renderGroupHeader
      : undefined;

  const fields = Array.isArray(rawRowGrouping.fields)
    ? rawRowGrouping.fields.map((field) => String(field))
    : typeof rawRowGrouping.field === "string"
      ? [rawRowGrouping.field]
      : [];

  if (fields.length === 0) {
    return null;
  }

  return {
    fields,
    collapsible: rawRowGrouping.collapsible === true,
    defaultCollapsed: rawRowGrouping.defaultCollapsed === true,
    renderGroupHeader,
  };
}

export function createRowGroupNodes<T extends Record<string, unknown>>(
  rows: T[],
  fields: string[],
  getRowKey: (row: T) => React.Key,
  depth = 0,
  path: GroupValue[] = [],
): Array<RowGroupNode<T> | RowLeafEntry<T>> {
  if (depth >= fields.length) {
    return rows.map((row) => ({
      type: "row",
      key: getRowKey(row),
      row,
    }));
  }

  const field = fields[depth];
  const groups = new Map<string, { value: GroupValue; rows: T[] }>();
  const orderedKeys: string[] = [];

  rows.forEach((row) => {
    const value = toGroupValue(row[field]);
    const key = `group-${[...path, value]
      .map((segment) => String(segment ?? "__ungrouped__"))
      .join("::")}`;

    const existing = groups.get(key);

    if (existing) {
      existing.rows.push(row);
      return;
    }

    groups.set(key, { value, rows: [row] });
    orderedKeys.push(key);
  });

  return orderedKeys.flatMap((key) => {
    const group = groups.get(key);

    if (!group) {
      return [];
    }

    const nextPath = [...path, group.value];

    return [
      {
        type: "group" as const,
        key,
        value: group.value,
        rows: group.rows,
        depth,
        path: nextPath,
        children: createRowGroupNodes(
          group.rows,
          fields,
          getRowKey,
          depth + 1,
          nextPath,
        ),
      },
    ];
  });
}

export function flattenRowGroupNodes<T extends Record<string, unknown>>(
  nodes: Array<RowGroupNode<T> | RowLeafEntry<T>>,
  collapsedGroupKeys: Set<string>,
  collapsible: boolean,
): GroupedBodyEntry<T>[] {
  return nodes.flatMap((node) => {
    if (node.type === "row") {
      return [node];
    }

    const collapsed = collapsible && collapsedGroupKeys.has(node.key);

    return [
      {
        type: "group" as const,
        key: node.key,
        value: node.value,
        rows: node.rows,
        collapsed,
        collapsible,
        depth: node.depth,
        path: node.path,
      },
      ...(collapsed
        ? []
        : flattenRowGroupNodes(node.children, collapsedGroupKeys, collapsible)),
    ];
  });
}

export function collectRowGroupKeys<T extends Record<string, unknown>>(
  nodes: Array<RowGroupNode<T> | RowLeafEntry<T>>,
): string[] {
  return nodes.flatMap((node) => {
    if (node.type === "row") {
      return [];
    }

    return [node.key, ...collectRowGroupKeys(node.children)];
  });
}
