import { Checkbox } from "components/checkbox";
import { DataTableCellOverflow } from "components/data-table/types";
import { IconMinor } from "components/icon";
import { InputText } from "components/input-field";
import { Flex } from "components/layout";
import {
  SimpleMenu,
  SimpleMenuItem,
  useSimpleMenuState,
} from "components/molecules";
import { Button } from "components/molecules/button";
import { Pagination } from "components/pagination";
import { Label } from "components/typography";
import { Borders, Surface } from "foundation/colors";
import { shadowMd } from "foundation/shadows";
import { Gap, Padding } from "foundation/spacing";
import { Typography } from "foundation/typography";
import { toCssSize } from "helpers/css-helpers";
import { useMergedRefs, useOnClickOutside } from "hooks";
import React, {
  ComponentType,
  HTMLAttributes,
  JSX,
  Key,
  KeyboardEvent,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";

import type {
  GroupedBodyEntry,
  HeaderCellDescriptor,
  RenderedColumn,
} from "../data-table/dataTable.shared";
import {
  getColumnId,
  getDefaultGroupLabel,
  getResolvedColumnWidth,
  getTextAlign,
  isActionsColumn,
} from "../data-table/dataTable.shared";
import { DataTableColumnManager } from "../data-table/DataTableColumnManager";
import type { DataTableRegularColumn } from "../data-table/types";
import { useDataTable } from "../data-table/useDataTable";
import {
  type ResolvedBodyCell,
  useDataTableBodySpans,
} from "../data-table/useDataTableBodySpans";
import { useDataTableColumnGrouping } from "../data-table/useDataTableColumnGrouping";
import { useDataTablePinnedStyles } from "../data-table/useDataTablePinnedStyles";
import { useDataTableRowGrouping } from "../data-table/useDataTableRowGrouping";
import type { DataGridProps } from "./types";

const CHECKBOX_COLUMN_FIELD = "__checkbox__";
const HEADER_SCROLLBAR_SPACER = 15;

const GridFrame = styled.div<{
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
`;

const GridHeaderScroll = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GridBodyScroll = styled.div<{ $maxHeight?: string }>`
  width: 100%;
  min-width: 0;
  max-height: ${({ $maxHeight }) => $maxHeight};
  overflow: auto;
`;

const GridContainer = styled(Flex)`
  position: relative;
  flex-direction: column;
  border: 1px solid ${Borders.Default.Default};
  ${shadowMd};
  background: ${Surface.Default.Default};
`;

const GridSibling = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: ${Padding.m};
`;

const GridSurface = styled.div<{
  $width?: string;
  $minWidth?: string;
}>`
  position: relative;
  width: ${({ $width }) => $width ?? "100%"};
  min-width: ${({ $minWidth }) => $minWidth ?? "100%"};
`;

const GridHeader = styled.div<{
  $templateColumns: string;
  $rowCount: number;
}>`
  display: grid;
  grid-template-columns: ${({ $templateColumns }) => $templateColumns};
  grid-template-rows: repeat(
    ${({ $rowCount }) => $rowCount},
    minmax(48px, auto)
  );
  z-index: 4;
  background: ${Surface.Default.Muted};
`;

const GridBody = styled.div<{
  $templateColumns: string;
  $rowCount: number;
}>`
  display: grid;
  grid-template-columns: ${({ $templateColumns }) => $templateColumns};
  grid-template-rows: repeat(
    ${({ $rowCount }) => $rowCount},
    minmax(48px, auto)
  );
  align-items: stretch;
`;

const GridRow = styled.div`
  display: contents;
`;

type GridCellStyleProps = {
  $sticky?: boolean;
  $fitContent?: boolean;
  $allowOverflow?: boolean;
  $borderRight?: boolean;
  $borderBottom?: boolean;
  $focused?: boolean;
};

const cellStyles = css<GridCellStyleProps>`
  box-sizing: border-box;
  min-width: 0;
  display: flex;
  align-items: center;
  padding: ${Padding.m};
  position: relative;
  overflow: ${({ $allowOverflow }) => ($allowOverflow ? "visible" : "hidden")};
  border-right: ${({ $borderRight }) =>
    $borderRight ? `1px solid ${Borders.Default.Muted}` : "none"};
  border-bottom: ${({ $borderBottom }) =>
    $borderBottom ? `1px solid ${Borders.Default.Muted}` : "none"};
  white-space: ${({ $fitContent }) => ($fitContent ? "nowrap" : "nowrap")};
  text-overflow: ellipsis;
  outline: ${({ $focused }) =>
    $focused ? `2px solid ${Borders.Default.Default}` : "none"};
  outline-offset: ${({ $focused }) => ($focused ? "-2px" : "0")};
  ${({ $sticky }) =>
    $sticky &&
    css`
      z-index: 2;
    `}
`;

const HeaderCellFrame = styled.div<
  GridCellStyleProps & {
    $textAlign: "left" | "center" | "right";
    $dividerRight?: boolean;
  }
>`
  ${cellStyles}
  justify-content: ${({ $textAlign }) =>
    $textAlign === "right"
      ? "flex-end"
      : $textAlign === "center"
        ? "center"
        : "flex-start"};
  background: ${Surface.Default.Muted};
  font-weight: 600;

  ${({ $dividerRight }) =>
    $dividerRight &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: ${Padding.s};
        right: 0;
        bottom: ${Padding.s};
        width: 1px;
        background: ${Borders.Default.Muted};
      }
    `}
`;

const BodyCellFrame = styled.div<
  GridCellStyleProps & {
    $textAlign: "left" | "center" | "right";
    $selected?: boolean;
    $striped?: boolean;
    $spansRows?: boolean;
  }
>`
  ${cellStyles}
  align-items: ${({ $spansRows }) => ($spansRows ? "flex-start" : "center")};
  justify-content: ${({ $textAlign }) =>
    $textAlign === "right"
      ? "flex-end"
      : $textAlign === "center"
        ? "center"
        : "flex-start"};
  background: ${({ $selected, $striped }) =>
    $selected
      ? Surface.Selected.Default
      : $striped
        ? Surface.Default.Muted
        : Surface.Default.Default};
  z-index: ${({ $spansRows }) => ($spansRows ? 1 : "auto")};
`;

const GroupCellFrame = styled.div<GridCellStyleProps>`
  ${cellStyles}
  background: ${Surface.Default.Muted};
  font-weight: 600;
`;

const HeaderScrollbarSpacerCell = styled.div`
  background: ${Surface.Default.Muted};
  border-bottom: 1px solid ${Borders.Default.Muted};
`;

const EmptyCellFrame = styled.div<GridCellStyleProps>`
  ${cellStyles}
  background: ${Surface.Default.Default};
`;

const RowDividerFrame = styled.div`
  pointer-events: none;
  border-top: 1px solid ${Borders.Default.Muted};
  z-index: 2;
`;

const HeaderSortButton = styled(Button).attrs({
  type: "button",
  plain: true,
  subtle: true,
})`
  all: unset;
  display: flex;
  align-items: center;
  gap: ${Padding.xs};
  width: 100%;
  min-width: 0;
  cursor: pointer;
`;

const CellContent = styled.span<{
  $textAlign: "left" | "center" | "right";
  $fitContent?: boolean;
  $overflow?: DataTableCellOverflow;
}>`
  display: block;
  min-width: 0;
  width: ${({ $fitContent }) => ($fitContent ? "auto" : "100%")};
  flex: ${({ $fitContent }) => ($fitContent ? "0 0 auto" : "1 1 auto")};
  overflow: ${({ $overflow = "ellipsis" }) =>
    $overflow === "ellipsis" ? "hidden" : "visible"};
  text-overflow: ${({ $overflow = "ellipsis" }) =>
    $overflow === "ellipsis" ? "ellipsis" : "clip"};
  white-space: ${({ $overflow = "ellipsis" }) =>
    $overflow === "wrap" ? "normal" : "nowrap"};
  overflow-wrap: ${({ $overflow = "ellipsis" }) =>
    $overflow === "wrap" ? "anywhere" : "normal"};
  text-align: ${({ $textAlign }) => $textAlign};
  ${Typography.Body}
`;

const HeaderSortContent = styled.span<{
  $textAlign: "left" | "center" | "right";
}>`
  display: inline-flex;
  align-items: center;
  gap: ${Padding.xs};
  width: 100%;
  min-width: 0;
  justify-content: ${({ $textAlign }) =>
    $textAlign === "right"
      ? "flex-end"
      : $textAlign === "center"
        ? "center"
        : "flex-start"};
`;

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

const ActionMenuRoot = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const ActionMenu = styled(SimpleMenu)`
  width: max-content;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 31;
`;

const ActionsIcon = styled(IconMinor.EllipsisVertical)`
  display: block;
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

function createGridTemplateColumns<T extends Record<string, unknown>>(
  renderedColumns: RenderedColumn<T>[],
  isResponsive: boolean,
  checkboxSelection: boolean,
  checkboxColumnWidth: number,
  columnWidthMap: Record<string, number>,
) {
  const columns = renderedColumns.map(({ column, field }) => {
    const estimatedWidth = columnWidthMap[field] ?? 160;
    const resolvedWidth = getResolvedColumnWidth(column);
    const minWidth =
      typeof resolvedWidth === "number"
        ? `${resolvedWidth}px`
        : (resolvedWidth ?? `${estimatedWidth}px`);

    if (!isResponsive) {
      return minWidth;
    }

    if (column.fullWidth || column.width == null) {
      return `minmax(${minWidth}, 1fr)`;
    }

    return minWidth;
  });

  if (checkboxSelection) {
    columns.unshift(`${checkboxColumnWidth}px`);
  }

  return columns.join(" ");
}

function toGridSpan(start: number, span = 1) {
  return `${start} / span ${span}`;
}

function getGridBodyBackground(striped: boolean, rowIndex: number) {
  if (!striped) {
    return false;
  }

  return rowIndex % 2 === 1;
}

function addScrollbarSpacerToSize(size: string, spacer: number) {
  if (spacer <= 0 || !size) {
    return size;
  }

  if (
    size === "auto" ||
    size === "max-content" ||
    size === "min-content" ||
    size === "fit-content"
  ) {
    return size;
  }

  return `calc(${size} + ${spacer}px)`;
}

type ActionDescriptor<T extends Record<string, unknown>> = {
  key: string;
  label: ReactNode;
  onClick: (row: T) => void;
  disabled?: boolean | ((row: T) => boolean);
  destructive?: boolean;
  icon?: ComponentType;
};

type FocusableGridCellKind =
  | "header-checkbox"
  | "header-column"
  | "header-group"
  | "body-checkbox"
  | "body-cell"
  | "body-actions"
  | "group-row"
  | "empty";

type FocusableGridCell = {
  key: string;
  kind: FocusableGridCellKind;
  rowIndex: number;
  colIndex: number;
  rowSpan: number;
  colSpan: number;
  sortable?: boolean;
  field?: string;
  groupKey?: string;
  collapsed?: boolean;
  collapsible?: boolean;
  selected?: boolean;
  rowKey?: Key;
};

type FocusableCellDomProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  role: "columnheader" | "gridcell";
  tabIndex?: number;
  "aria-colindex": number;
  "aria-rowindex": number;
  "aria-colspan"?: number;
  "aria-rowspan"?: number;
  "aria-selected"?: true;
  "aria-expanded"?: boolean;
  ref?: (node: HTMLDivElement | null) => void;
};

const EMPTY_FOCUSABLE_CELLS: FocusableGridCell[] = [];
const EMPTY_FOCUSABLE_CELL_MAP = new Map<string, FocusableGridCell>();
const EMPTY_SLOT_OWNER_MAP = new Map<string, string>();

function getGridSlotKey(rowIndex: number, colIndex: number) {
  return `${rowIndex}:${colIndex}`;
}

function getGridCellDomId(key: string) {
  return `data-grid-cell-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function GridActionsCell<T extends Record<string, unknown>>({
  actions,
  row,
  buttonTabIndex,
  onTriggerRef,
}: {
  actions: ActionDescriptor<T>[];
  row: T;
  buttonTabIndex?: number;
  onTriggerRef?: (node: HTMLButtonElement | null) => void;
}) {
  const { clickOutsideRef, isOpen, close, toggle } = useSimpleMenuState({
    closeOnItemSelect: true,
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <ActionMenuRoot ref={clickOutsideRef}>
      <Button
        ref={(node) => {
          triggerRef.current = node;
          onTriggerRef?.(node);
        }}
        plain
        subtle
        type="button"
        tabIndex={buttonTabIndex}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <ActionsIcon />
      </Button>

      {isOpen ? (
        <ActionMenu
          usePortal
          open={isOpen}
          onClose={close}
          anchorRef={triggerRef}
          position="bottom-end"
          zIndex={4000}
        >
          {actions.map((action) => {
            const disabled = resolveActionFlag(action.disabled, row);

            return (
              <SimpleMenuItem
                key={action.key}
                onClick={() => {
                  if (disabled) {
                    return;
                  }

                  action.onClick(row);
                  close();
                }}
                disabled={disabled}
                IconPrefix={action.icon}
                destructive={action.destructive}
              >
                {action.label}
              </SimpleMenuItem>
            );
          })}
        </ActionMenu>
      ) : null}
    </ActionMenuRoot>
  );
}

type DataGridEmptyRowProps = {
  emptyMessage: ReactNode;
  headerRowCount: number;
  totalColumnCount: number;
  isFocused: boolean;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
};

const DataGridEmptyRow = memo(function DataGridEmptyRow({
  emptyMessage,
  headerRowCount,
  totalColumnCount,
  isFocused,
  getFocusableCellProps,
}: DataGridEmptyRowProps) {
  return (
    <GridRow role="row">
      <EmptyCellFrame
        key="empty"
        $focused={isFocused}
        {...getFocusableCellProps({
          key: "empty",
          kind: "empty",
          rowIndex: headerRowCount + 1,
          colIndex: 1,
          rowSpan: 1,
          colSpan: totalColumnCount,
        })}
        style={{
          gridColumn: `1 / span ${totalColumnCount}`,
          gridRow: toGridSpan(1),
        }}
      >
        <Label muted>{emptyMessage}</Label>
      </EmptyCellFrame>
    </GridRow>
  );
});

type DataGridGroupRowProps<T extends Record<string, unknown>> = {
  entry: Extract<GroupedBodyEntry<T>, { type: "group" }>;
  rowIndex: number;
  headerRowCount: number;
  totalColumnCount: number;
  isFocused: boolean;
  renderGroupHeaderContent: (
    entry: Extract<GroupedBodyEntry<T>, { type: "group" }>,
  ) => ReactNode;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
};

const DataGridGroupRow = memo(
  function DataGridGroupRow<T extends Record<string, unknown>>({
    entry,
    rowIndex,
    headerRowCount,
    totalColumnCount,
    isFocused,
    renderGroupHeaderContent,
    getFocusableCellProps,
  }: DataGridGroupRowProps<T>) {
    const gridRowStart = rowIndex + 1;

    return (
      <GridRow role="row">
        <GroupCellFrame
          $focused={isFocused}
          {...getFocusableCellProps({
            key: `group-row-${entry.key}`,
            kind: "group-row",
            rowIndex: headerRowCount + rowIndex + 1,
            colIndex: 1,
            rowSpan: 1,
            colSpan: totalColumnCount,
            groupKey: entry.key,
            collapsed: entry.collapsed,
            collapsible: entry.collapsible,
          })}
          style={{
            gridColumn: `1 / span ${totalColumnCount}`,
            gridRow: toGridSpan(gridRowStart),
          }}
        >
          {renderGroupHeaderContent(entry)}
        </GroupCellFrame>
      </GridRow>
    );
  },
  function areGroupRowPropsEqual<T extends Record<string, unknown>>(
    previous: DataGridGroupRowProps<T>,
    next: DataGridGroupRowProps<T>,
  ) {
    return (
      previous.entry === next.entry &&
      previous.rowIndex === next.rowIndex &&
      previous.headerRowCount === next.headerRowCount &&
      previous.totalColumnCount === next.totalColumnCount &&
      previous.isFocused === next.isFocused &&
      previous.renderGroupHeaderContent === next.renderGroupHeaderContent &&
      previous.getFocusableCellProps === next.getFocusableCellProps
    );
  },
) as <T extends Record<string, unknown>>(
  props: DataGridGroupRowProps<T>,
) => JSX.Element;

type DataGridDataRowProps<T extends Record<string, unknown>> = {
  entry: Extract<GroupedBodyEntry<T>, { type: "row" }>;
  rowIndex: number;
  headerRowCount: number;
  checkboxSelection: boolean;
  lastLeftPinnedField: string | null;
  showCellBorders: boolean;
  isSelected: boolean;
  isStriped: boolean;
  activeCellKey: string | null;
  resolvedBodyCells: ResolvedBodyCell<T>[];
  shouldRenderBorderRight: (field: string, colSpan?: number) => boolean;
  getFocusableCellProps: (cell: FocusableGridCell) => FocusableCellDomProps;
  toggleRowSelection: (rowKey: Key) => void;
  getColumnRawValue: (row: T, column: DataTableRegularColumn<T>) => ReactNode;
  cellSelection: boolean;
  actionTriggerRefs: RefObject<Record<string, HTMLButtonElement | null>>;
};

const DataGridDataRow = memo(
  function DataGridDataRow<T extends Record<string, unknown>>({
    entry,
    rowIndex,
    headerRowCount,
    checkboxSelection,
    lastLeftPinnedField,
    showCellBorders,
    isSelected,
    isStriped,
    activeCellKey,
    resolvedBodyCells,
    shouldRenderBorderRight,
    getFocusableCellProps,
    toggleRowSelection,
    getColumnRawValue,
    cellSelection,
    actionTriggerRefs,
  }: DataGridDataRowProps<T>) {
    const { row, key } = entry;
    const gridRowStart = rowIndex + 1;

    return (
      <GridRow role="row">
        {checkboxSelection ? (
          <BodyCellFrame
            key={`${key}-${CHECKBOX_COLUMN_FIELD}`}
            $sticky
            $focused={activeCellKey === `${key}-${CHECKBOX_COLUMN_FIELD}`}
            $textAlign="center"
            $selected={isSelected}
            $striped={isStriped}
            $borderRight={Boolean(!lastLeftPinnedField && showCellBorders)}
            {...getFocusableCellProps({
              key: `${key}-${CHECKBOX_COLUMN_FIELD}`,
              kind: "body-checkbox",
              rowIndex: headerRowCount + rowIndex + 1,
              colIndex: 1,
              rowSpan: 1,
              colSpan: 1,
              rowKey: key,
              selected: isSelected,
            })}
            style={{
              gridColumn: toGridSpan(1),
              gridRow: toGridSpan(gridRowStart),
              position: "sticky",
              left: 0,
              zIndex: 3,
              background: isSelected
                ? Surface.Selected.Default
                : isStriped
                  ? Surface.Default.Muted
                  : Surface.Default.Default,
            }}
          >
            <Checkbox
              checked={isSelected}
              tabIndex={cellSelection ? -1 : undefined}
              onChange={() => toggleRowSelection(key)}
              aria-label={`Select row ${String(key)}`}
            />
          </BodyCellFrame>
        ) : null}

        {resolvedBodyCells.map(
          ({ renderedColumn, columnStart, colSpan, rowSpan, rawValue }) => {
            const { field, textAlign, stickyStyle, column } = renderedColumn;
            const resolvedColumnStart = Number(columnStart);
            const gridColumnStart =
              resolvedColumnStart + (checkboxSelection ? 1 : 0);

            if (isActionsColumn(column)) {
              const actions = column
                .getActions(row)
                .filter((action) => !resolveActionFlag(action.hidden, row));

              return (
                <BodyCellFrame
                  key={`${key}-${field}`}
                  $sticky={Boolean(stickyStyle)}
                  $focused={activeCellKey === `${key}-${field}`}
                  $textAlign={textAlign}
                  $fitContent={column.fitContent ?? true}
                  $allowOverflow
                  $selected={isSelected}
                  $striped={isStriped}
                  $spansRows={rowSpan > 1}
                  $borderRight={shouldRenderBorderRight(field, colSpan)}
                  {...getFocusableCellProps({
                    key: `${key}-${field}`,
                    kind: "body-actions",
                    rowIndex: headerRowCount + rowIndex + 1,
                    colIndex: gridColumnStart,
                    rowSpan,
                    colSpan,
                    field,
                    rowKey: key,
                    selected: isSelected,
                  })}
                  style={{
                    gridColumn: toGridSpan(gridColumnStart, colSpan),
                    gridRow: toGridSpan(gridRowStart, rowSpan),
                    ...stickyStyle,
                    background: isSelected
                      ? Surface.Selected.Default
                      : isStriped
                        ? Surface.Default.Muted
                        : Surface.Default.Default,
                    zIndex: stickyStyle ? 3 : undefined,
                  }}
                >
                  <GridActionsCell
                    actions={actions}
                    row={row}
                    buttonTabIndex={cellSelection ? -1 : undefined}
                    onTriggerRef={(node) => {
                      actionTriggerRefs.current[`${key}-${field}`] = node;
                    }}
                  />
                </BodyCellFrame>
              );
            }

            const resolvedValue = rawValue ?? getColumnRawValue(row, column);
            const content = column.renderCell
              ? column.renderCell(row, resolvedValue)
              : resolvedValue;

            return (
              <BodyCellFrame
                key={`${key}-${field}`}
                $sticky={Boolean(stickyStyle)}
                $focused={activeCellKey === `${key}-${field}`}
                $textAlign={textAlign}
                $fitContent={column.fitContent}
                $selected={isSelected}
                $striped={isStriped}
                $spansRows={rowSpan > 1}
                $borderRight={shouldRenderBorderRight(field, colSpan)}
                {...getFocusableCellProps({
                  key: `${key}-${field}`,
                  kind: "body-cell",
                  rowIndex: headerRowCount + rowIndex + 1,
                  colIndex: gridColumnStart,
                  rowSpan,
                  colSpan,
                  field,
                  rowKey: key,
                  selected: isSelected,
                })}
                style={{
                  gridColumn: toGridSpan(gridColumnStart, colSpan),
                  gridRow: toGridSpan(gridRowStart, rowSpan),
                  ...stickyStyle,
                  background: isSelected
                    ? Surface.Selected.Default
                    : isStriped
                      ? Surface.Default.Muted
                      : Surface.Default.Default,
                }}
              >
                <CellContent
                  $textAlign={textAlign}
                  $fitContent={column.fitContent}
                  $overflow={column.overflow}
                >
                  {content}
                </CellContent>
              </BodyCellFrame>
            );
          },
        )}
      </GridRow>
    );
  },
  function areDataRowPropsEqual<T extends Record<string, unknown>>(
    previous: DataGridDataRowProps<T>,
    next: DataGridDataRowProps<T>,
  ) {
    return (
      previous.entry === next.entry &&
      previous.rowIndex === next.rowIndex &&
      previous.headerRowCount === next.headerRowCount &&
      previous.checkboxSelection === next.checkboxSelection &&
      previous.lastLeftPinnedField === next.lastLeftPinnedField &&
      previous.showCellBorders === next.showCellBorders &&
      previous.isSelected === next.isSelected &&
      previous.isStriped === next.isStriped &&
      previous.activeCellKey === next.activeCellKey &&
      previous.resolvedBodyCells === next.resolvedBodyCells &&
      previous.shouldRenderBorderRight === next.shouldRenderBorderRight &&
      previous.getFocusableCellProps === next.getFocusableCellProps &&
      previous.toggleRowSelection === next.toggleRowSelection &&
      previous.getColumnRawValue === next.getColumnRawValue &&
      previous.cellSelection === next.cellSelection &&
      previous.actionTriggerRefs === next.actionTriggerRefs
    );
  },
) as <T extends Record<string, unknown>>(
  props: DataGridDataRowProps<T>,
) => JSX.Element;

export function DataGrid<T extends Record<string, unknown>>(
  props: DataGridProps<T>,
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
    cellSelection = false,
  } = props;

  const tableAreaRef = useRef<HTMLDivElement | null>(null);
  const headerScrollRef = useRef<HTMLDivElement | null>(null);
  const bodyScrollRef = useRef<HTMLDivElement | null>(null);
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const actionTriggerRefs = useRef<Record<string, HTMLButtonElement | null>>(
    {},
  );
  const isResponsive = layoutMode === "responsive";
  const [hasBodyVerticalScrollbar, setHasBodyVerticalScrollbar] =
    useState(false);
  const [hasBodyHorizontalScrollbar, setHasBodyHorizontalScrollbar] =
    useState(false);
  const previousCellSelectionRef = useRef(cellSelection);

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

  const totalColumnCount = visibleColumns.length + (checkboxSelection ? 1 : 0);

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
    columnWidthMap,
  } = useDataTablePinnedStyles({
    visibleColumns,
    pinnedColumns,
    checkboxSelection,
    borderColor: Borders.Default.Default,
  });

  const renderedColumns = useMemo<RenderedColumn<T>[]>(() => {
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

  const defaultBodyCells = useMemo<ResolvedBodyCell<T>[]>(
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

  const gridTemplateColumns = useMemo(
    () =>
      createGridTemplateColumns(
        renderedColumns,
        isResponsive,
        checkboxSelection,
        checkboxColumnWidth,
        columnWidthMap,
      ),
    [
      renderedColumns,
      isResponsive,
      checkboxSelection,
      checkboxColumnWidth,
      columnWidthMap,
    ],
  );

  const gridWidth = isResponsive
    ? "100%"
    : toCssSize(tableWidth, "max-content");
  const gridMinWidth = isResponsive
    ? toCssSize(minTableWidth, "100%")
    : toCssSize(minTableWidth, `${computedColumnWidth}px`);
  const headerScrollbarSpacer = hasBodyVerticalScrollbar
    ? HEADER_SCROLLBAR_SPACER
    : 0;
  const shouldExtendHeaderSurface =
    hasBodyVerticalScrollbar && hasBodyHorizontalScrollbar;
  const headerGridTemplateColumns = useMemo(
    () =>
      headerScrollbarSpacer > 0
        ? `${gridTemplateColumns} ${headerScrollbarSpacer}px`
        : gridTemplateColumns,
    [gridTemplateColumns, headerScrollbarSpacer],
  );
  const headerGridWidth = useMemo(
    () =>
      addScrollbarSpacerToSize(
        gridWidth,
        shouldExtendHeaderSurface ? headerScrollbarSpacer : 0,
      ),
    [gridWidth, headerScrollbarSpacer, shouldExtendHeaderSurface],
  );
  const headerGridMinWidth = useMemo(
    () =>
      addScrollbarSpacerToSize(
        gridMinWidth,
        shouldExtendHeaderSurface ? headerScrollbarSpacer : 0,
      ),
    [gridMinWidth, headerScrollbarSpacer, shouldExtendHeaderSurface],
  );

  const getGroupHeaderStickyStyle = useCallback(
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
          zIndex: 5,
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
          zIndex: 5,
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

  const fieldBeforeFirstRightPinned = useMemo(() => {
    if (!firstRightPinnedField) {
      return null;
    }

    const firstRightPinnedIndex = renderedColumns.findIndex(
      ({ field }) => field === firstRightPinnedField,
    );

    if (firstRightPinnedIndex <= 0) {
      return null;
    }

    return renderedColumns[firstRightPinnedIndex - 1]?.field ?? null;
  }, [renderedColumns, firstRightPinnedField]);

  const lastVisibleField = renderedColumns[renderedColumns.length - 1]?.field;

  const shouldRenderBorderRight = useCallback(
    (field: string, colSpan = 1) => {
      if (!showCellBorders || colSpan !== 1) {
        return false;
      }

      if (field === fieldBeforeFirstRightPinned) {
        return false;
      }

      if (field === lastVisibleField) {
        return false;
      }

      return true;
    },
    [showCellBorders, fieldBeforeFirstRightPinned, lastVisibleField],
  );

  const shouldRenderHeaderDivider = useCallback(
    (field: string) => {
      if (showCellBorders) {
        return false;
      }

      if (!field || field === lastVisibleField) {
        return false;
      }

      if (
        field === lastLeftPinnedField ||
        field === fieldBeforeFirstRightPinned
      ) {
        return false;
      }

      return true;
    },
    [
      showCellBorders,
      lastVisibleField,
      lastLeftPinnedField,
      fieldBeforeFirstRightPinned,
    ],
  );

  const renderGroupHeaderContent = useCallback(
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
          tabIndex={cellSelection ? -1 : undefined}
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
    [cellSelection, renderGroupHeader, toggleGroup],
  );

  const toggleRowSelection = useCallback(
    (rowKey: Key) => {
      const next = selectedKeys.includes(rowKey)
        ? selectedKeys.filter((selectedKey) => selectedKey !== rowKey)
        : [...selectedKeys, rowKey];

      setSelectedKeys(next);
    },
    [selectedKeys, setSelectedKeys],
  );

  const focusableCells = useMemo<FocusableGridCell[]>(() => {
    if (!cellSelection) {
      return EMPTY_FOCUSABLE_CELLS;
    }

    const cells: FocusableGridCell[] = [];

    if (checkboxSelection) {
      cells.push({
        key: `${CHECKBOX_COLUMN_FIELD}-header`,
        kind: "header-checkbox",
        rowIndex: 1,
        colIndex: 1,
        rowSpan: headerRowCount,
        colSpan: 1,
      });
    }

    if (!hasGroupedHeaders) {
      renderedColumns.forEach((renderedColumn, columnIndex) => {
        const start = columnIndex + 1 + (checkboxSelection ? 1 : 0);

        cells.push({
          key: renderedColumn.field,
          kind: "header-column",
          rowIndex: 1,
          colIndex: start,
          rowSpan: 1,
          colSpan: 1,
          sortable: Boolean(renderedColumn.sortable),
          field: renderedColumn.field,
        });
      });
    } else {
      headerRows.forEach((headerRow, rowIndex) => {
        let columnStart = checkboxSelection ? 2 : 1;

        headerRow.forEach((cell) => {
          if (cell.type === "column") {
            cells.push({
              key: `${cell.column.field}-header`,
              kind: "header-column",
              rowIndex: rowIndex + 1,
              colIndex: columnStart,
              rowSpan: cell.rowSpan,
              colSpan: 1,
              sortable: Boolean(cell.column.sortable),
              field: cell.column.field,
            });

            columnStart += 1;
            return;
          }

          cells.push({
            key: `group-${cell.group.key}-${rowIndex + 1}`,
            kind: "header-group",
            rowIndex: rowIndex + 1,
            colIndex: columnStart,
            rowSpan: 1,
            colSpan: cell.colSpan,
          });

          columnStart += cell.colSpan;
        });
      });
    }

    if (visibleRows.length === 0) {
      cells.push({
        key: "empty",
        kind: "empty",
        rowIndex: headerRowCount + 1,
        colIndex: 1,
        rowSpan: 1,
        colSpan: totalColumnCount,
      });

      return cells;
    }

    groupedBodyEntries.forEach((entry, rowIndex) => {
      const gridRowIndex = headerRowCount + rowIndex + 1;

      if (entry.type === "group") {
        cells.push({
          key: `group-row-${entry.key}`,
          kind: "group-row",
          rowIndex: gridRowIndex,
          colIndex: 1,
          rowSpan: 1,
          colSpan: totalColumnCount,
          groupKey: entry.key,
          collapsed: entry.collapsed,
          collapsible: entry.collapsible,
        });
        return;
      }

      if (checkboxSelection) {
        cells.push({
          key: `${entry.key}-${CHECKBOX_COLUMN_FIELD}`,
          kind: "body-checkbox",
          rowIndex: gridRowIndex,
          colIndex: 1,
          rowSpan: 1,
          colSpan: 1,
          rowKey: entry.key,
          selected: selectedKeySet.has(entry.key),
        });
      }

      const resolvedBodyCells: ResolvedBodyCell<T>[] =
        hasBodySpans && bodyCellsByKey.has(entry.key)
          ? (bodyCellsByKey.get(entry.key) ?? defaultBodyCells)
          : defaultBodyCells;

      resolvedBodyCells.forEach(
        ({ renderedColumn, columnStart, colSpan, rowSpan }) => {
          const gridColumnStart =
            Number(columnStart) + (checkboxSelection ? 1 : 0);

          cells.push({
            key: `${entry.key}-${renderedColumn.field}`,
            kind: isActionsColumn(renderedColumn.column)
              ? "body-actions"
              : "body-cell",
            rowIndex: gridRowIndex,
            colIndex: gridColumnStart,
            rowSpan,
            colSpan,
            field: renderedColumn.field,
            rowKey: entry.key,
            selected: selectedKeySet.has(entry.key),
          });
        },
      );
    });

    return cells;
  }, [
    cellSelection,
    checkboxSelection,
    headerRowCount,
    hasGroupedHeaders,
    headerRows,
    renderedColumns,
    visibleRows.length,
    groupedBodyEntries,
    totalColumnCount,
    selectedKeySet,
    hasBodySpans,
    bodyCellsByKey,
    defaultBodyCells,
  ]);

  const focusableCellMap = useMemo(
    () =>
      cellSelection
        ? new Map(focusableCells.map((cell) => [cell.key, cell]))
        : EMPTY_FOCUSABLE_CELL_MAP,
    [cellSelection, focusableCells],
  );

  const slotOwnerMap = useMemo(() => {
    if (!cellSelection) {
      return EMPTY_SLOT_OWNER_MAP;
    }

    const map = new Map<string, string>();

    focusableCells.forEach((cell) => {
      for (
        let rowIndex = cell.rowIndex;
        rowIndex < cell.rowIndex + cell.rowSpan;
        rowIndex += 1
      ) {
        for (
          let colIndex = cell.colIndex;
          colIndex < cell.colIndex + cell.colSpan;
          colIndex += 1
        ) {
          map.set(getGridSlotKey(rowIndex, colIndex), cell.key);
        }
      }
    });

    return map;
  }, [cellSelection, focusableCells]);

  const totalGridRows = headerRowCount + Math.max(groupedBodyEntries.length, 1);
  const [activeCellKey, setActiveCellKey] = useState<string | null>(() =>
    cellSelection ? (focusableCells[0]?.key ?? null) : null,
  );
  const clickAwayRef = useOnClickOutside(() => {
    if (!cellSelection) {
      return;
    }

    setActiveCellKey(null);
  });
  const mergedContainerRef = useMergedRefs<HTMLDivElement>(
    tableAreaRef,
    clickAwayRef,
  );

  useEffect(() => {
    if (!cellSelection) {
      setActiveCellKey(null);
      previousCellSelectionRef.current = false;
      return;
    }

    if (focusableCells.length === 0) {
      setActiveCellKey(null);
      previousCellSelectionRef.current = true;
      return;
    }

    const wasCellSelectionEnabled = previousCellSelectionRef.current;

    setActiveCellKey((previous) => {
      if (previous && focusableCellMap.has(previous)) {
        return previous;
      }

      if (previous === null && wasCellSelectionEnabled) {
        return null;
      }

      return focusableCells[0]?.key ?? null;
    });

    previousCellSelectionRef.current = true;
  }, [cellSelection, focusableCells, focusableCellMap]);

  const focusCell = useCallback(
    (cellKey: string) => {
      if (!cellSelection) {
        return;
      }

      setActiveCellKey(cellKey);

      requestAnimationFrame(() => {
        const node = cellRefs.current[cellKey];

        node?.focus();
        if (typeof node?.scrollIntoView === "function") {
          node.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      });
    },
    [cellSelection],
  );

  const moveFocusByCoordinates = useCallback(
    (
      currentCell: FocusableGridCell,
      nextRowIndex: number,
      nextColIndex: number,
      rowStep: number,
      colStep: number,
    ) => {
      let rowIndex = nextRowIndex;
      let colIndex = nextColIndex;

      while (
        rowIndex >= 1 &&
        rowIndex <= totalGridRows &&
        colIndex >= 1 &&
        colIndex <= totalColumnCount
      ) {
        const nextKey = slotOwnerMap.get(getGridSlotKey(rowIndex, colIndex));

        if (nextKey && nextKey !== currentCell.key) {
          focusCell(nextKey);
          return true;
        }

        rowIndex += rowStep;
        colIndex += colStep;
      }

      return false;
    },
    [focusCell, slotOwnerMap, totalColumnCount, totalGridRows],
  );

  const activateFocusedCell = useCallback(
    (cell: FocusableGridCell) => {
      switch (cell.kind) {
        case "header-checkbox":
          toggleAllExpanded();
          return;

        case "header-column":
          if (cell.field && cell.sortable) {
            toggleSort(cell.field, cell.sortable);
          }
          return;

        case "group-row":
          if (cell.groupKey && cell.collapsible) {
            toggleGroup(cell.groupKey);
          }
          return;

        case "body-checkbox":
          if (cell.rowKey !== undefined) {
            toggleRowSelection(cell.rowKey);
          }
          return;

        case "body-actions": {
          const trigger = actionTriggerRefs.current[cell.key];
          trigger?.click();
          return;
        }

        default:
          return;
      }
    },
    [toggleAllExpanded, toggleSort, toggleGroup, toggleRowSelection],
  );

  const handleCellKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, cellKey: string) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      const currentCell = focusableCellMap.get(cellKey);

      if (!currentCell) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();

          if (
            currentCell.kind === "group-row" &&
            currentCell.collapsible &&
            currentCell.groupKey &&
            !currentCell.collapsed
          ) {
            toggleGroup(currentCell.groupKey);
            return;
          }

          moveFocusByCoordinates(
            currentCell,
            currentCell.rowIndex,
            currentCell.colIndex - 1,
            0,
            -1,
          );
          return;

        case "ArrowRight":
          event.preventDefault();

          if (
            currentCell.kind === "group-row" &&
            currentCell.collapsible &&
            currentCell.groupKey &&
            currentCell.collapsed
          ) {
            toggleGroup(currentCell.groupKey);
            return;
          }

          moveFocusByCoordinates(
            currentCell,
            currentCell.rowIndex,
            currentCell.colIndex + currentCell.colSpan,
            0,
            1,
          );
          return;

        case "ArrowUp":
          event.preventDefault();
          moveFocusByCoordinates(
            currentCell,
            currentCell.rowIndex - 1,
            currentCell.colIndex,
            -1,
            0,
          );
          return;

        case "ArrowDown":
          event.preventDefault();
          moveFocusByCoordinates(
            currentCell,
            currentCell.rowIndex + currentCell.rowSpan,
            currentCell.colIndex,
            1,
            0,
          );
          return;

        case "Home":
          event.preventDefault();

          if (event.ctrlKey || event.metaKey) {
            const firstCellKey = focusableCells[0]?.key;

            if (firstCellKey) {
              focusCell(firstCellKey);
            }

            return;
          }

          moveFocusByCoordinates(currentCell, currentCell.rowIndex, 1, 0, 1);
          return;

        case "End":
          event.preventDefault();

          if (event.ctrlKey || event.metaKey) {
            const lastCellKey = focusableCells[focusableCells.length - 1]?.key;

            if (lastCellKey) {
              focusCell(lastCellKey);
            }

            return;
          }

          moveFocusByCoordinates(
            currentCell,
            currentCell.rowIndex,
            totalColumnCount,
            0,
            -1,
          );
          return;

        case "PageUp":
          event.preventDefault();
          moveFocusByCoordinates(
            currentCell,
            headerRowCount + 1,
            currentCell.colIndex,
            1,
            0,
          );
          return;

        case "PageDown":
          event.preventDefault();
          moveFocusByCoordinates(
            currentCell,
            totalGridRows,
            currentCell.colIndex,
            -1,
            0,
          );
          return;

        case "Enter":
        case " ":
        case "Space":
          event.preventDefault();
          activateFocusedCell(currentCell);
          return;

        default:
          return;
      }
    },
    [
      activateFocusedCell,
      focusCell,
      focusableCellMap,
      focusableCells,
      headerRowCount,
      moveFocusByCoordinates,
      toggleGroup,
      totalColumnCount,
      totalGridRows,
    ],
  );

  const getFocusableCellProps = useCallback(
    (cell: FocusableGridCell): FocusableCellDomProps => ({
      id: getGridCellDomId(cell.key),
      role: cell.kind.startsWith("header") ? "columnheader" : "gridcell",
      tabIndex: cellSelection
        ? activeCellKey === cell.key
          ? 0
          : -1
        : undefined,
      "aria-colindex": cell.colIndex,
      "aria-rowindex": cell.rowIndex,
      "aria-colspan": cell.colSpan > 1 ? cell.colSpan : undefined,
      "aria-rowspan": cell.rowSpan > 1 ? cell.rowSpan : undefined,
      "aria-selected": cell.selected || undefined,
      "aria-expanded":
        cell.kind === "group-row" && cell.collapsible
          ? !cell.collapsed
          : undefined,
      ref: cellSelection
        ? (node: HTMLDivElement | null) => {
            cellRefs.current[cell.key] = node;
          }
        : undefined,
      onFocus: cellSelection
        ? () => {
            setActiveCellKey(cell.key);
          }
        : undefined,
      onClick: cellSelection
        ? () => {
            setActiveCellKey(cell.key);
          }
        : undefined,
      onKeyDown: cellSelection
        ? (event: KeyboardEvent<HTMLDivElement>) =>
            handleCellKeyDown(event, cell.key)
        : undefined,
    }),
    [activeCellKey, cellSelection, handleCellKeyDown],
  );

  const headerCells = useMemo(() => {
    const rows = Array.from(
      { length: headerRowCount },
      () => [] as ReactNode[],
    );

    const pushHeaderCell = (rowIndex: number, node: ReactNode) => {
      rows[rowIndex]?.push(node);
    };

    if (checkboxSelection) {
      pushHeaderCell(
        0,
        <HeaderCellFrame
          key={CHECKBOX_COLUMN_FIELD}
          $sticky
          $focused={activeCellKey === `${CHECKBOX_COLUMN_FIELD}-header`}
          $textAlign="center"
          $dividerRight={!showCellBorders && visibleColumns.length > 0}
          $borderBottom
          aria-label="Select rows"
          {...getFocusableCellProps(
            focusableCellMap.get(`${CHECKBOX_COLUMN_FIELD}-header`) ?? {
              key: `${CHECKBOX_COLUMN_FIELD}-header`,
              kind: "header-checkbox",
              rowIndex: 1,
              colIndex: 1,
              rowSpan: headerRowCount,
              colSpan: 1,
            },
          )}
          style={{
            gridColumn: toGridSpan(1),
            gridRow: toGridSpan(1, headerRowCount),
            position: "sticky",
            left: 0,
            zIndex: 6,
            background: Surface.Default.Muted,
            borderRight:
              showCellBorders && !lastLeftPinnedField
                ? `1px solid ${Borders.Default.Default}`
                : undefined,
          }}
        >
          <Checkbox
            checked={selectAllState}
            onChange={toggleAllExpanded}
            indeterminate
            tabIndex={cellSelection ? -1 : undefined}
            aria-label="Select all visible rows"
          />
        </HeaderCellFrame>,
      );
    }

    if (!hasGroupedHeaders) {
      renderedColumns.forEach((renderedColumn, columnIndex) => {
        const { field, sortable, currentSort, textAlign, stickyStyle, column } =
          renderedColumn;
        const start = columnIndex + 1 + (checkboxSelection ? 1 : 0);

        pushHeaderCell(
          0,
          <HeaderCellFrame
            key={field}
            $sticky={Boolean(stickyStyle)}
            $focused={activeCellKey === field}
            $textAlign={textAlign}
            $dividerRight={shouldRenderHeaderDivider(field)}
            $borderRight={shouldRenderBorderRight(field)}
            $borderBottom
            {...getFocusableCellProps(
              focusableCellMap.get(field) ?? {
                key: field,
                kind: "header-column",
                rowIndex: 1,
                colIndex: start,
                rowSpan: 1,
                colSpan: 1,
                sortable: Boolean(sortable),
                field,
              },
            )}
            title={column.description}
            style={{
              gridColumn: toGridSpan(start),
              gridRow: toGridSpan(1),
              ...stickyStyle,
              background: Surface.Default.Muted,
            }}
            aria-sort={
              sortable
                ? currentSort === "ASC"
                  ? "ascending"
                  : currentSort === "DESC"
                    ? "descending"
                    : "none"
                : undefined
            }
          >
            {sortable ? (
              <HeaderSortButton
                tabIndex={cellSelection ? -1 : undefined}
                onClick={() => toggleSort(field, sortable)}
              >
                <HeaderSortContent $textAlign={textAlign}>
                  <CellContent $textAlign={textAlign}>
                    {typeof column.headerName === "string" ? (
                      <Label strong muted>
                        {column.headerName}
                      </Label>
                    ) : (
                      (column.headerName ?? "")
                    )}
                  </CellContent>
                  {currentSort === "ASC" ? (
                    <IconMinor.ChevronUpSolid />
                  ) : currentSort === "DESC" ? (
                    <IconMinor.ChevronDownSolid />
                  ) : null}
                </HeaderSortContent>
              </HeaderSortButton>
            ) : typeof column.headerName === "string" ? (
              <CellContent $textAlign={textAlign}>
                <Label strong muted>
                  {column.headerName}
                </Label>
              </CellContent>
            ) : (
              <CellContent $textAlign={textAlign}>
                {column.headerName ?? ""}
              </CellContent>
            )}
          </HeaderCellFrame>,
        );
      });

      return rows.map((rowCells, rowIndex) => (
        <GridRow key={`header-row-${rowIndex + 1}`} role="row">
          {rowCells}
        </GridRow>
      ));
    }

    headerRows.forEach((headerRow: HeaderCellDescriptor<T>[], rowIndex) => {
      let columnStart = checkboxSelection ? 2 : 1;

      headerRow.forEach((cell) => {
        if (cell.type === "column") {
          const {
            field,
            sortable,
            currentSort,
            textAlign,
            stickyStyle,
            column,
          } = cell.column;

          pushHeaderCell(
            rowIndex,
            <HeaderCellFrame
              key={`${field}-header`}
              $sticky={Boolean(stickyStyle)}
              $focused={activeCellKey === `${field}-header`}
              $textAlign={textAlign}
              $dividerRight={shouldRenderHeaderDivider(field)}
              $borderRight={shouldRenderBorderRight(field)}
              $borderBottom
              {...getFocusableCellProps(
                focusableCellMap.get(`${field}-header`) ?? {
                  key: `${field}-header`,
                  kind: "header-column",
                  rowIndex: rowIndex + 1,
                  colIndex: columnStart,
                  rowSpan: cell.rowSpan,
                  colSpan: 1,
                  sortable: Boolean(sortable),
                  field,
                },
              )}
              title={column.description}
              style={{
                gridColumn: toGridSpan(columnStart),
                gridRow: toGridSpan(rowIndex + 1, cell.rowSpan),
                ...stickyStyle,
                background: Surface.Default.Muted,
              }}
              aria-sort={
                sortable
                  ? currentSort === "ASC"
                    ? "ascending"
                    : currentSort === "DESC"
                      ? "descending"
                      : "none"
                  : undefined
              }
            >
              {sortable ? (
                <HeaderSortButton
                  tabIndex={cellSelection ? -1 : undefined}
                  onClick={() => toggleSort(field, sortable)}
                >
                  <HeaderSortContent $textAlign={textAlign}>
                    <CellContent $textAlign={textAlign}>
                      {typeof column.headerName === "string" ? (
                        <Label strong muted>
                          {column.headerName}
                        </Label>
                      ) : (
                        (column.headerName ?? "")
                      )}
                    </CellContent>
                    {currentSort === "ASC" ? (
                      <IconMinor.ChevronUpSolid />
                    ) : currentSort === "DESC" ? (
                      <IconMinor.ChevronDownSolid />
                    ) : null}
                  </HeaderSortContent>
                </HeaderSortButton>
              ) : typeof column.headerName === "string" ? (
                <CellContent $textAlign={textAlign}>
                  <Label strong muted>
                    {column.headerName}
                  </Label>
                </CellContent>
              ) : (
                <CellContent $textAlign={textAlign}>
                  {column.headerName ?? ""}
                </CellContent>
              )}
            </HeaderCellFrame>,
          );

          columnStart += 1;
          return;
        }

        pushHeaderCell(
          rowIndex,
          <HeaderCellFrame
            key={`group-${cell.group.key}-${cell.leafColumns
              .map(({ field }) => field)
              .join("-")}`}
            $sticky={Boolean(getGroupHeaderStickyStyle(cell.leafColumns))}
            $focused={
              activeCellKey === `group-${cell.group.key}-${rowIndex + 1}`
            }
            $textAlign={cell.group.align ?? "left"}
            $dividerRight={shouldRenderHeaderDivider(
              cell.leafColumns[cell.leafColumns.length - 1]?.field ?? "",
            )}
            $borderRight={shouldRenderBorderRight(
              cell.leafColumns[cell.leafColumns.length - 1]?.field ?? "",
            )}
            $borderBottom
            {...getFocusableCellProps(
              focusableCellMap.get(
                `group-${cell.group.key}-${rowIndex + 1}`,
              ) ?? {
                key: `group-${cell.group.key}-${rowIndex + 1}`,
                kind: "header-group",
                rowIndex: rowIndex + 1,
                colIndex: columnStart,
                rowSpan: 1,
                colSpan: cell.colSpan,
              },
            )}
            title={cell.group.description}
            style={{
              gridColumn: toGridSpan(columnStart, cell.colSpan),
              gridRow: toGridSpan(rowIndex + 1),
              ...getGroupHeaderStickyStyle(cell.leafColumns),
              background: Surface.Default.Muted,
            }}
          >
            {typeof cell.group.headerName === "string" ? (
              <CellContent $textAlign={cell.group.align ?? "left"}>
                <Label strong muted>
                  {cell.group.headerName}
                </Label>
              </CellContent>
            ) : (
              <CellContent $textAlign={cell.group.align ?? "left"}>
                {cell.group.headerName}
              </CellContent>
            )}
          </HeaderCellFrame>,
        );

        columnStart += cell.colSpan;
      });
    });

    return rows.map((rowCells, rowIndex) => (
      <GridRow key={`header-row-${rowIndex + 1}`} role="row">
        {rowCells}
      </GridRow>
    ));
  }, [
    checkboxSelection,
    headerRowCount,
    lastLeftPinnedField,
    showCellBorders,
    selectAllState,
    toggleAllExpanded,
    activeCellKey,
    hasGroupedHeaders,
    renderedColumns,
    toggleSort,
    headerRows,
    getGroupHeaderStickyStyle,
    shouldRenderBorderRight,
    shouldRenderHeaderDivider,
    getFocusableCellProps,
    focusableCellMap,
    cellSelection,
    visibleColumns.length,
  ]);

  const bodyRows = useMemo(() => {
    if (visibleRows.length === 0) {
      return [
        <DataGridEmptyRow
          key="body-row-empty"
          emptyMessage={emptyMessage}
          headerRowCount={headerRowCount}
          totalColumnCount={totalColumnCount}
          isFocused={activeCellKey === "empty"}
          getFocusableCellProps={getFocusableCellProps}
        />,
      ];
    }

    return groupedBodyEntries.map((entry, rowIndex) => {
      if (entry.type === "group") {
        return (
          <DataGridGroupRow
            key={`body-group-row-${entry.key}`}
            entry={entry}
            rowIndex={rowIndex}
            headerRowCount={headerRowCount}
            totalColumnCount={totalColumnCount}
            isFocused={activeCellKey === `group-row-${entry.key}`}
            renderGroupHeaderContent={renderGroupHeaderContent}
            getFocusableCellProps={getFocusableCellProps}
          />
        );
      }

      const isSelected = selectedKeySet.has(entry.key);
      const isStriped = getGridBodyBackground(striped, rowIndex);
      const resolvedBodyCells: ResolvedBodyCell<T>[] =
        hasBodySpans && bodyCellsByKey.has(entry.key)
          ? (bodyCellsByKey.get(entry.key) ?? defaultBodyCells)
          : defaultBodyCells;

      return (
        <DataGridDataRow
          key={`body-data-row-${entry.key}`}
          entry={entry}
          rowIndex={rowIndex}
          headerRowCount={headerRowCount}
          checkboxSelection={checkboxSelection}
          lastLeftPinnedField={lastLeftPinnedField}
          showCellBorders={showCellBorders}
          isSelected={isSelected}
          isStriped={isStriped}
          activeCellKey={activeCellKey}
          resolvedBodyCells={resolvedBodyCells}
          shouldRenderBorderRight={shouldRenderBorderRight}
          getFocusableCellProps={getFocusableCellProps}
          toggleRowSelection={toggleRowSelection}
          getColumnRawValue={getColumnRawValue}
          cellSelection={cellSelection}
          actionTriggerRefs={actionTriggerRefs}
        />
      );
    });
  }, [
    visibleRows.length,
    totalColumnCount,
    emptyMessage,
    groupedBodyEntries,
    showCellBorders,
    activeCellKey,
    renderGroupHeaderContent,
    selectedKeySet,
    striped,
    hasBodySpans,
    bodyCellsByKey,
    defaultBodyCells,
    checkboxSelection,
    lastLeftPinnedField,
    shouldRenderBorderRight,
    getFocusableCellProps,
    getColumnRawValue,
    headerRowCount,
    toggleRowSelection,
    cellSelection,
    actionTriggerRefs,
  ]);

  const bodyRowDividers = useMemo(() => {
    if (!showCellBorders) {
      return [];
    }

    const dividers: ReactNode[] = [];

    groupedBodyEntries.forEach((entry, entryIndex) => {
      if (entryIndex === 0) {
        return;
      }

      const previousEntry = groupedBodyEntries[entryIndex - 1];
      const gridRowStart = entryIndex + 1;

      if (entry.type === "group" || previousEntry?.type === "group") {
        dividers.push(
          <RowDividerFrame
            key={`divider-${entry.key}`}
            style={{
              gridColumn: `1 / span ${totalColumnCount}`,
              gridRow: toGridSpan(gridRowStart),
            }}
          />,
        );
        return;
      }

      const previousCells: ResolvedBodyCell<T>[] =
        hasBodySpans && bodyCellsByKey.has(previousEntry.key)
          ? (bodyCellsByKey.get(previousEntry.key) ?? defaultBodyCells)
          : defaultBodyCells;
      const coveredSlots = Array.from(
        { length: totalColumnCount },
        () => false,
      );

      previousCells.forEach(({ columnStart, colSpan, rowSpan }) => {
        if (rowSpan <= 1) {
          return;
        }

        const resolvedColumnStart = Number(columnStart);
        const gridColumnStart =
          resolvedColumnStart + (checkboxSelection ? 1 : 0);

        for (
          let slot = gridColumnStart;
          slot < gridColumnStart + colSpan;
          slot += 1
        ) {
          coveredSlots[slot - 1] = true;
        }
      });

      let segmentStart: number | null = null;

      coveredSlots.forEach((isCovered, slotIndex) => {
        const slot = slotIndex + 1;

        if (!isCovered && segmentStart == null) {
          segmentStart = slot;
        }

        const isLastSlot = slot === totalColumnCount;

        if (segmentStart != null && (isCovered || isLastSlot)) {
          const segmentEnd = isCovered ? slot - 1 : slot;

          if (segmentEnd >= segmentStart) {
            dividers.push(
              <RowDividerFrame
                key={`divider-${entry.key}-${segmentStart}`}
                style={{
                  gridColumn: toGridSpan(
                    segmentStart,
                    segmentEnd - segmentStart + 1,
                  ),
                  gridRow: toGridSpan(gridRowStart),
                }}
              />,
            );
          }

          segmentStart = null;
        }
      });
    });

    return dividers;
  }, [
    groupedBodyEntries,
    showCellBorders,
    totalColumnCount,
    hasBodySpans,
    bodyCellsByKey,
    defaultBodyCells,
    checkboxSelection,
  ]);

  const syncScrollLeft = useCallback((source: "header" | "body") => {
    const sourceElement =
      source === "header" ? headerScrollRef.current : bodyScrollRef.current;
    const targetElement =
      source === "header" ? bodyScrollRef.current : headerScrollRef.current;

    if (!sourceElement || !targetElement) {
      return;
    }

    if (targetElement.scrollLeft !== sourceElement.scrollLeft) {
      targetElement.scrollLeft = sourceElement.scrollLeft;
    }
  }, []);

  const updateBodyVerticalScrollbar = useCallback(() => {
    const bodyScrollElement = bodyScrollRef.current;

    if (!bodyScrollElement) {
      setHasBodyVerticalScrollbar(false);
      setHasBodyHorizontalScrollbar(false);
      return;
    }

    setHasBodyVerticalScrollbar(
      bodyScrollElement.scrollHeight > bodyScrollElement.clientHeight + 1,
    );
    setHasBodyHorizontalScrollbar(
      bodyScrollElement.scrollWidth > bodyScrollElement.clientWidth + 1,
    );
  }, []);

  useLayoutEffect(() => {
    const bodyScrollElement = bodyScrollRef.current;
    const headerScrollElement = headerScrollRef.current;

    if (bodyScrollElement && headerScrollElement) {
      if (headerScrollElement.scrollLeft !== bodyScrollElement.scrollLeft) {
        headerScrollElement.scrollLeft = bodyScrollElement.scrollLeft;
      }
    }

    updateBodyVerticalScrollbar();

    if (!bodyScrollElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateBodyVerticalScrollbar();
    });

    resizeObserver.observe(bodyScrollElement);

    const contentElement = bodyScrollElement.firstElementChild;

    if (contentElement instanceof HTMLElement) {
      resizeObserver.observe(contentElement);
    }

    window.addEventListener("resize", updateBodyVerticalScrollbar);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateBodyVerticalScrollbar);
    };
  }, [
    updateBodyVerticalScrollbar,
    groupedBodyEntries.length,
    visibleRows.length,
    gridTemplateColumns,
    gridWidth,
    gridMinWidth,
    headerGridTemplateColumns,
    headerGridWidth,
    headerGridMinWidth,
    maxTableHeight,
  ]);

  return (
    <GridContainer ref={mergedContainerRef}>
      {searchable || manageColumns ? (
        <GridSibling gap={Gap.m}>
          {searchable ? (
            <InputText
              value={search}
              onChange={setSearch}
              placeholder={searchPlaceholder}
            />
          ) : null}

          {manageColumns ? (
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
          ) : null}
        </GridSibling>
      ) : null}

      <GridFrame
        $borderTop={searchable || manageColumns}
        $borderBottom={paginated}
        role="grid"
        aria-label="Data grid"
        aria-colcount={totalColumnCount}
        aria-rowcount={totalGridRows}
        aria-readonly="true"
        aria-multiselectable={checkboxSelection || undefined}
      >
        <GridHeaderScroll
          ref={headerScrollRef}
          onScroll={() => syncScrollLeft("header")}
        >
          <GridSurface $width={headerGridWidth} $minWidth={headerGridMinWidth}>
            <GridHeader
              $templateColumns={headerGridTemplateColumns}
              $rowCount={headerRowCount}
              role="rowgroup"
            >
              {headerCells}
              {headerScrollbarSpacer > 0
                ? Array.from({ length: headerRowCount }, (_, rowIndex) => (
                    <HeaderScrollbarSpacerCell
                      key={`header-scrollbar-spacer-${rowIndex + 1}`}
                      aria-hidden="true"
                      style={{
                        gridColumn: toGridSpan(totalColumnCount + 1),
                        gridRow: toGridSpan(rowIndex + 1),
                      }}
                    />
                  ))
                : null}
            </GridHeader>
          </GridSurface>
        </GridHeaderScroll>

        <GridBodyScroll
          ref={bodyScrollRef}
          $maxHeight={toCssSize(maxTableHeight)}
          onScroll={() => syncScrollLeft("body")}
        >
          <GridSurface $width={gridWidth} $minWidth={gridMinWidth}>
            <GridBody
              $templateColumns={gridTemplateColumns}
              $rowCount={Math.max(groupedBodyEntries.length, 1)}
              role="rowgroup"
            >
              {bodyRowDividers}
              {bodyRows}
            </GridBody>
          </GridSurface>
        </GridBodyScroll>
      </GridFrame>

      {paginated ? (
        <GridSibling gap={Gap.m}>
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
        </GridSibling>
      ) : null}
    </GridContainer>
  );
}
