import { ReactNode } from "react";

export type ChartSeriesType = "line" | "bar" | "area" | "radar";
type CurveType = "linear" | "monotone" | "step" | "stepAfter" | "stepBefore";
export type ChartVariant =
  | "line"
  | "bar"
  | "area"
  | "composed"
  | "pie"
  | "radar";
export type ChartPieVariant = "pie" | "donut";
export type ChartCartesianLayout = "horizontal" | "vertical";

export type ChartYAxisConfig = {
  id?: string | number;
  orientation?: "left" | "right";
  width?: number;
  label?: string;
  tickFormatter?: (value: unknown) => string;
  allowDecimals?: boolean;
};

export type ChartSeries<TData> = {
  key: keyof TData & string;
  label: string;
  type?: ChartSeriesType;
  color?: string;
  yAxisId?: string | number;
  hidden?: boolean;

  curve?: CurveType;
  strokeWidth?: number;
  showDots?: boolean;
  connectNulls?: boolean;
  dashed?: boolean;

  stackId?: string;
  radius?: number | [number, number, number, number];
};

export type ChartProps<TData extends Record<string, unknown>> = {
  data: TData[];
  xKey: keyof TData & string;
  series: ChartSeries<TData>[];

  variant?: ChartVariant;
  pieVariant?: ChartPieVariant;
  cartesianLayout?: ChartCartesianLayout;
  height?: number;
  loading?: boolean;
  empty?: boolean;

  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;

  xAxisLabel?: string;
  yAxisLabel?: string;

  formatXAxis?: (value: unknown) => string;
  formatYAxis?: (value: unknown) => string;
  formatTooltipValue?: (value: unknown, key: string) => string;
  formatTooltipLabel?: (label: unknown) => string;

  yAxes?: ChartYAxisConfig[];
  pieInnerRadius?: number | string;
  pieOuterRadius?: number | string;
  pieShowLabels?: boolean;

  className?: string;
  ariaLabel?: string;
  emptyState?: ReactNode;
};
