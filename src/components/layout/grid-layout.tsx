import { FC, PropsWithChildren } from "@helpers";
import styled from "styled-components";

export type GridProps = PropsWithChildren<{
  columns?: number;
  rows?: number;
  columnGutter?: number;
  rowGutter?: number;
}>;

type GridDefaults = Omit<GridProps, "children">;

const DEFAULT = {
  columns: 12,
  columnGutter: 24,
  rowGutter: 24,
} as const;

const clampInt = (value: unknown, fallback: number, min = 1) => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) {
    return fallback;
  }
  return Math.max(min, Math.floor(n));
};

const clampPx = (value: unknown, fallback: number) => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) {
    return fallback;
  }
  return Math.max(0, n);
};

export const Grid = styled.div<GridProps>`
  display: grid;

  ${({ columns }) => {
    const cols = clampInt(columns, DEFAULT.columns, 1);
    return `grid-template-columns: repeat(${cols}, minmax(0, 1fr));`;
  }}

  ${({ rows }) => {
    if (rows == null) {
      return "";
    }
    const r = clampInt(rows, 1, 1);
    return `grid-template-rows: repeat(${r}, minmax(0, 1fr));`;
  }}

  ${({ columnGutter }) =>
    `column-gap: ${clampPx(columnGutter, DEFAULT.columnGutter)}px;`}
  ${({ rowGutter }) => `row-gap: ${clampPx(rowGutter, DEFAULT.rowGutter)}px;`}
`;

interface CellProps {
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  rowStart?: number;
}

export const Cell = styled.div<CellProps>`
  ${({ colSpan }) =>
    colSpan ? `grid-column: span ${clampInt(colSpan, 1, 1)};` : ""}
  ${({ rowSpan }) =>
    rowSpan ? `grid-row: span ${clampInt(rowSpan, 1, 1)};` : ""}
  ${({ colStart }) =>
    colStart ? `grid-column-start: ${clampInt(colStart, 1, 1)};` : ""}
  ${({ rowStart }) =>
    rowStart ? `grid-row-start: ${clampInt(rowStart, 1, 1)};` : ""}
`;

export function gridLayoutGenerator(defaults: GridDefaults = {}) {
  const GridGenerated: FC<GridProps> = ({ children, ...props }) => (
    <Grid {...defaults} {...props}>
      {children}
    </Grid>
  );

  return {
    Grid: GridGenerated,
    Cell,
  };
}
