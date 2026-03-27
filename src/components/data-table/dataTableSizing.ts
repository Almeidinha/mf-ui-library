import { Padding } from "foundation/spacing";

import type { DataTableSize } from "./types";

export const DEFAULT_DATA_TABLE_SIZE: DataTableSize = "medium";

const DATA_TABLE_CELL_PADDING: Record<DataTableSize, string> = {
  small: Padding.xs,
  medium: Padding.m,
  large: `${Padding.l} ${Padding.m}`,
};

const DATA_TABLE_SHELL_PADDING: Record<DataTableSize, string> = {
  small: Padding.xs,
  medium: Padding.m,
  large: Padding.m,
};

const DATA_TABLE_HEADER_DIVIDER_INSET: Record<DataTableSize, string> = {
  small: Padding.xs,
  medium: Padding.s,
  large: Padding.m,
};

export function getDataTableCellPadding(
  size: DataTableSize = DEFAULT_DATA_TABLE_SIZE,
) {
  return DATA_TABLE_CELL_PADDING[size];
}

export function getDataTableHeaderDividerInset(
  size: DataTableSize = DEFAULT_DATA_TABLE_SIZE,
) {
  return DATA_TABLE_HEADER_DIVIDER_INSET[size];
}

export function getDataTableShellPadding(
  size: DataTableSize = DEFAULT_DATA_TABLE_SIZE,
) {
  return DATA_TABLE_SHELL_PADDING[size];
}
