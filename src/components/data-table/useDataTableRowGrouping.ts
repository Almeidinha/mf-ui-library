import React from "react";

import {
  collectRowGroupKeys,
  createRowGroupNodes,
  DataTableRowGroupingConfig,
  EMPTY_GROUPED_BODY,
  flattenRowGroupNodes,
  normalizeRowGrouping,
  RowGroupNode,
  RowLeafEntry,
} from "./dataTable.grouping.shared";
import type { GroupedBodyEntry } from "./dataTable.shared";
import type { DataTableRowGrouping } from "./types";

const EMPTY_KEY_SET = new Set<React.Key>();

type UseDataTableRowGroupingArgs<T extends Record<string, unknown>> = {
  rowGrouping?: DataTableRowGrouping<T>;
  visibleRows: T[];
  getRowKey: (row: T) => React.Key;
  checkboxSelection: boolean;
  selectedKeys: React.Key[];
  selectedKeySet: Set<React.Key>;
  setSelectedKeys: (keys: React.Key[]) => void;
};

type UseDataTableRowGroupingResult<T extends Record<string, unknown>> = {
  groupingConfig: DataTableRowGroupingConfig<T> | null;
  groupedBodyEntries: GroupedBodyEntry<T>[];
  allExpandedSelected: boolean;
  someExpandedSelected: boolean;
  toggleAllExpanded: () => void;
  selectAllState: boolean | undefined;
  toggleGroup: (groupKey: string) => void;
  renderGroupHeader?: DataTableRowGroupingConfig<T>["renderGroupHeader"];
};

export function useDataTableRowGrouping<T extends Record<string, unknown>>({
  rowGrouping,
  visibleRows,
  getRowKey,
  checkboxSelection,
  selectedKeys,
  selectedKeySet,
  setSelectedKeys,
}: UseDataTableRowGroupingArgs<T>): UseDataTableRowGroupingResult<T> {
  const groupingConfig = React.useMemo(
    () => normalizeRowGrouping(rowGrouping),
    [rowGrouping],
  );

  const groupingIdentityKey = React.useMemo(
    () =>
      groupingConfig
        ? `${groupingConfig.fields.join("::")}|${groupingConfig.collapsible ? "1" : "0"}|${groupingConfig.defaultCollapsed ? "1" : "0"}`
        : "",
    [groupingConfig],
  );

  const rowGroupNodes = React.useMemo(() => {
    if (!groupingConfig) {
      return EMPTY_GROUPED_BODY as Array<RowGroupNode<T> | RowLeafEntry<T>>;
    }

    return createRowGroupNodes(visibleRows, groupingConfig.fields, getRowKey);
  }, [visibleRows, groupingConfig, getRowKey]);

  const [collapsedGroupKeys, setCollapsedGroupKeys] = React.useState<
    Set<string>
  >(() => new Set());

  const previousGroupingIdentityRef = React.useRef<string>("");

  React.useEffect(() => {
    if (!groupingConfig?.collapsible) {
      return;
    }

    setCollapsedGroupKeys((previous) => {
      const visibleGroupKeys = collectRowGroupKeys(rowGroupNodes);
      const visibleKeySet = new Set(visibleGroupKeys);
      const shouldReset =
        previousGroupingIdentityRef.current !== groupingIdentityKey;

      previousGroupingIdentityRef.current = groupingIdentityKey;

      if (shouldReset) {
        if (!groupingConfig.defaultCollapsed) {
          return new Set();
        }

        return new Set(visibleGroupKeys);
      }

      const next = new Set(
        [...previous].filter((groupKey) => visibleKeySet.has(groupKey)),
      );

      return next;
    });
  }, [rowGroupNodes, groupingConfig, groupingIdentityKey]);

  React.useEffect(() => {
    if (groupingConfig) {
      return;
    }

    previousGroupingIdentityRef.current = "";
    setCollapsedGroupKeys((previous) =>
      previous.size === 0 ? previous : new Set(),
    );
  }, [groupingConfig]);

  const toggleGroup = React.useCallback((groupKey: string) => {
    setCollapsedGroupKeys((previous) => {
      const next = new Set(previous);

      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }

      return next;
    });
  }, []);

  const groupedBodyEntries = React.useMemo<GroupedBodyEntry<T>[]>(() => {
    if (!groupingConfig) {
      return visibleRows.map((row) => ({
        type: "row",
        key: getRowKey(row),
        row,
      }));
    }

    return flattenRowGroupNodes(
      rowGroupNodes,
      collapsedGroupKeys,
      groupingConfig.collapsible,
    );
  }, [
    visibleRows,
    rowGroupNodes,
    groupingConfig,
    collapsedGroupKeys,
    getRowKey,
  ]);

  const expandedRowKeys = React.useMemo(
    () =>
      groupedBodyEntries.flatMap((entry) =>
        entry.type === "row" ? [entry.key] : [],
      ),
    [groupedBodyEntries],
  );

  const expandedRowKeySet = React.useMemo(
    () => new Set(expandedRowKeys),
    [expandedRowKeys],
  );

  const effectiveExpandedRowKeySet = groupingConfig
    ? expandedRowKeySet
    : EMPTY_KEY_SET;

  const allExpandedSelected =
    checkboxSelection &&
    expandedRowKeys.length > 0 &&
    expandedRowKeys.every((key) => selectedKeySet.has(key));

  const someExpandedSelected =
    checkboxSelection &&
    expandedRowKeys.some((key) => selectedKeySet.has(key)) &&
    !allExpandedSelected;

  const toggleAllExpanded = React.useCallback(() => {
    if (!checkboxSelection) {
      return;
    }

    if (allExpandedSelected) {
      setSelectedKeys(
        selectedKeys.filter((key) => !effectiveExpandedRowKeySet.has(key)),
      );
      return;
    }

    setSelectedKeys(Array.from(new Set([...selectedKeys, ...expandedRowKeys])));
  }, [
    checkboxSelection,
    allExpandedSelected,
    setSelectedKeys,
    selectedKeys,
    effectiveExpandedRowKeySet,
    expandedRowKeys,
  ]);

  const selectAllState = allExpandedSelected
    ? true
    : someExpandedSelected
      ? undefined
      : false;

  return {
    groupingConfig,
    groupedBodyEntries,
    allExpandedSelected,
    someExpandedSelected,
    toggleAllExpanded,
    selectAllState,
    toggleGroup,
    renderGroupHeader: groupingConfig?.renderGroupHeader,
  };
}
