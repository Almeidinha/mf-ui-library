import { Flex } from "components/layout";
import { Skeleton } from "components/skeleton";
import { Body, Label } from "components/typography";
import { Borders, Surface, TextColors } from "foundation/colors";
import { Padding } from "foundation/spacing";
import { TypographyStyles } from "foundation/typography";
import { useMemo } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

import type {
  ChartPieVariant,
  ChartProps,
  ChartSeries,
  ChartSeriesType,
  ChartVariant,
  ChartYAxisConfig,
} from "./types";

const DEFAULT_SERIES_COLORS = [
  Surface.Selected.Active,
  Surface.Success.Active,
  Surface.Warning.Active,
  Surface.Critical.Active,
  Surface.Violet.Active,
  Surface.Cyan.Active,
];

const Root = styled.div`
  width: 100%;
  min-width: 0;
`;

const ChartFrame = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
  min-width: 0;
  border: 1px solid ${Borders.Default.Default};
  border-radius: 12px;
  background: ${Surface.Default.Default};
  padding: ${Padding.m};
`;

const EmptyState = styled(Flex)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TooltipCard = styled.div`
  min-width: 180px;
  border: 1px solid ${Borders.Default.Default};
  border-radius: 10px;
  background: ${Surface.Default.Default};
  box-shadow: var(--mfui-shadow-shadowlg);
  padding: ${Padding.s};
`;

const TooltipTitle = styled.div`
  ${TypographyStyles.Label};
  color: ${TextColors.Active};
  margin-bottom: 8px;
`;

const TooltipRow = styled.div`
  display: grid;
  grid-template-columns: 12px 1fr auto;
  align-items: center;
  gap: 8px;

  & + & {
    margin-top: 6px;
  }
`;

const TooltipDot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  display: inline-block;
`;

const Header = styled(Flex)`
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const AxisLabel = styled(Label)`
  color: ${TextColors.Default};
`;

function defaultFormat(value: unknown): string {
  if (value == null) {
    return "—";
  }
  if (typeof value === "number") {
    return value.toLocaleString();
  }
  if (typeof value === "string" || typeof value === "boolean") {
    return String(value);
  }
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (typeof value === "symbol") {
    return value.description ?? value.toString();
  }
  if (Array.isArray(value)) {
    return value.map((entry) => defaultFormat(entry)).join(", ");
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return "—";
}

function resolveSeriesType(
  variant: ChartVariant,
  seriesType?: ChartSeriesType,
): ChartSeriesType {
  if (seriesType) {
    return seriesType;
  }
  if (
    variant === "line" ||
    variant === "bar" ||
    variant === "area" ||
    variant === "radar"
  ) {
    return variant;
  }
  return "line";
}

function toRechartsDataKey<TData extends Record<string, unknown>>(
  key: keyof TData & string,
) {
  return key as never;
}

function getSeriesColor(color: string | undefined, index: number) {
  return color ?? DEFAULT_SERIES_COLORS[index % DEFAULT_SERIES_COLORS.length];
}

function getCartesianYAxisConfigs<TData extends Record<string, unknown>>(
  series: ChartSeries<TData>[],
  yAxes?: ChartYAxisConfig[],
): ChartYAxisConfig[] {
  if (yAxes?.length) {
    return yAxes;
  }

  const ids = Array.from(
    new Set(series.filter((item) => !item.hidden).map((item) => item.yAxisId)),
  );

  return (ids.length > 0 ? ids : [undefined]).map(
    (id, index): ChartYAxisConfig => ({
      id,
      orientation: index % 2 === 0 ? "left" : "right",
      width: 48,
    }),
  );
}

function renderCartesianSeries<TData extends Record<string, unknown>>(
  series: ChartSeries<TData>[],
  variant: ChartVariant,
) {
  return series
    .filter((item) => !item.hidden)
    .map((item, index) => {
      const type = resolveSeriesType(variant, item.type);
      const color = getSeriesColor(item.color, index);

      if (type === "bar") {
        return (
          <Bar
            key={item.key}
            dataKey={toRechartsDataKey(item.key)}
            name={item.label}
            yAxisId={item.yAxisId}
            fill={color}
            stackId={item.stackId}
            radius={item.radius ?? 8}
            maxBarSize={40}
          />
        );
      }

      if (type === "area") {
        return (
          <Area
            key={item.key}
            dataKey={toRechartsDataKey(item.key)}
            name={item.label}
            yAxisId={item.yAxisId}
            type={item.curve || "monotone"}
            stroke={color}
            fill={color}
            fillOpacity={0.16}
            strokeWidth={item.strokeWidth ?? 2}
            connectNulls={item.connectNulls}
            strokeDasharray={item.dashed ? "6 4" : undefined}
          />
        );
      }

      if (type === "radar") {
        return (
          <Radar
            key={item.key}
            dataKey={toRechartsDataKey(item.key)}
            name={item.label}
            stroke={color}
            fill={color}
            fillOpacity={0.2}
            strokeWidth={item.strokeWidth ?? 2}
          />
        );
      }

      return (
        <Line
          key={item.key}
          dataKey={toRechartsDataKey(item.key)}
          name={item.label}
          yAxisId={item.yAxisId}
          type={item.curve || "monotone"}
          stroke={color}
          strokeWidth={item.strokeWidth ?? 2}
          dot={item.showDots ?? false}
          activeDot={{ r: 4 }}
          connectNulls={item.connectNulls}
          strokeDasharray={item.dashed ? "6 4" : undefined}
        />
      );
    });
}

function renderPieSeries<TData extends Record<string, unknown>>(
  data: TData[],
  xKey: keyof TData & string,
  series: ChartSeries<TData>[],
  pieVariant: ChartPieVariant,
  pieInnerRadius?: number | string,
  pieOuterRadius?: number | string,
  pieShowLabels?: boolean,
) {
  const visibleSeries = series.filter((item) => !item.hidden);
  const primarySeries = visibleSeries[0];

  if (!primarySeries) {
    return null;
  }

  return (
    <Pie
      data={data}
      dataKey={toRechartsDataKey(primarySeries.key)}
      nameKey={toRechartsDataKey(xKey)}
      name={primarySeries.label}
      innerRadius={pieVariant === "donut" ? (pieInnerRadius ?? "56%") : 0}
      outerRadius={pieOuterRadius ?? "82%"}
      paddingAngle={2}
      label={pieShowLabels}
      labelLine={false}
    >
      {data.map((entry, index) => (
        <Cell
          key={`pie-cell-${String(entry[xKey])}`}
          fill={getSeriesColor(undefined, index)}
        />
      ))}
    </Pie>
  );
}

type RechartsTooltipPayload = {
  color?: string;
  name?: string;
  value?: unknown;
  dataKey?: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: RechartsTooltipPayload[];
  label?: unknown;
  formatTooltipValue?: (value: unknown, key: string) => string;
  formatTooltipLabel?: (label: unknown) => string;
};

function CustomTooltip({
  active,
  payload,
  label,
  formatTooltipValue,
  formatTooltipLabel,
}: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <TooltipCard>
      <TooltipTitle>
        {formatTooltipLabel ? formatTooltipLabel(label) : defaultFormat(label)}
      </TooltipTitle>

      {payload.map((entry) => {
        const key = entry.dataKey ?? entry.name ?? "";
        return (
          <TooltipRow key={`${key}`}>
            <TooltipDot $color={entry.color || "#999"} />
            <Body>{entry.name ?? key}</Body>
            <Body>
              {formatTooltipValue
                ? formatTooltipValue(entry.value, String(key))
                : defaultFormat(entry.value)}
            </Body>
          </TooltipRow>
        );
      })}
    </TooltipCard>
  );
}

export function Chart<TData extends Record<string, unknown>>({
  data,
  xKey,
  series,
  variant = "line",
  pieVariant = "pie",
  cartesianLayout = "horizontal",
  height = 320,
  loading = false,
  empty = false,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  xAxisLabel,
  yAxisLabel,
  formatXAxis,
  formatYAxis,
  formatTooltipValue,
  formatTooltipLabel,
  yAxes,
  pieInnerRadius,
  pieOuterRadius,
  pieShowLabels = false,
  className,
  ariaLabel,
  emptyState,
}: ChartProps<TData>) {
  const hasData = useMemo(() => {
    return Array.isArray(data) && data.length > 0;
  }, [data]);

  const visibleSeries = useMemo(
    () => series.filter((item) => !item.hidden),
    [series],
  );

  const cartesianYAxes = useMemo(
    () => getCartesianYAxisConfigs(series, yAxes),
    [series, yAxes],
  );

  const hasRenderableSeries = visibleSeries.length > 0;

  return (
    <Root className={className}>
      {(xAxisLabel || yAxisLabel) && variant !== "pie" ? (
        <Header>
          {yAxisLabel ? <AxisLabel>{yAxisLabel}</AxisLabel> : <span />}
          {xAxisLabel ? <AxisLabel>{xAxisLabel}</AxisLabel> : null}
        </Header>
      ) : null}

      <ChartFrame $height={height} role="img" aria-label={ariaLabel}>
        {loading ? (
          <Skeleton variant="rounded" width="100%" height="100%" />
        ) : empty || !hasData || !hasRenderableSeries ? (
          <EmptyState>
            {emptyState ?? <Body>No data available</Body>}
          </EmptyState>
        ) : variant === "pie" ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {showTooltip ? (
                <Tooltip
                  content={
                    <CustomTooltip
                      formatTooltipValue={formatTooltipValue}
                      formatTooltipLabel={formatTooltipLabel}
                    />
                  }
                />
              ) : null}

              {showLegend ? <Legend verticalAlign="top" height={36} /> : null}

              {renderPieSeries(
                data,
                xKey,
                series,
                pieVariant,
                pieInnerRadius,
                pieOuterRadius,
                pieShowLabels,
              )}
            </PieChart>
          </ResponsiveContainer>
        ) : variant === "radar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              {showGrid ? <PolarGrid /> : null}

              <PolarAngleAxis
                dataKey={toRechartsDataKey(xKey)}
                tickFormatter={(value) =>
                  formatXAxis ? formatXAxis(value) : defaultFormat(value)
                }
              />

              <PolarRadiusAxis
                tickFormatter={(value) =>
                  formatYAxis ? formatYAxis(value) : defaultFormat(value)
                }
              />

              {showTooltip ? (
                <Tooltip
                  content={
                    <CustomTooltip
                      formatTooltipValue={formatTooltipValue}
                      formatTooltipLabel={formatTooltipLabel}
                    />
                  }
                />
              ) : null}

              {showLegend ? <Legend verticalAlign="top" height={36} /> : null}

              {renderCartesianSeries(series, variant)}
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} layout={cartesianLayout}>
              {showGrid ? (
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke={Borders.Default.Default}
                />
              ) : null}

              {cartesianLayout === "vertical" ? (
                <>
                  <XAxis
                    type="number"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      formatXAxis ? formatXAxis(value) : defaultFormat(value)
                    }
                  />

                  <YAxis
                    type="category"
                    dataKey={toRechartsDataKey(xKey)}
                    tickLine={false}
                    axisLine={false}
                    width={96}
                    tickFormatter={(value) =>
                      formatYAxis ? formatYAxis(value) : defaultFormat(value)
                    }
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey={toRechartsDataKey(xKey)}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={24}
                    tickFormatter={(value) =>
                      formatXAxis ? formatXAxis(value) : defaultFormat(value)
                    }
                  />

                  {cartesianYAxes.map((axis, index) => (
                    <YAxis
                      key={`y-axis-${String(axis.id ?? index)}`}
                      yAxisId={axis.id}
                      orientation={axis.orientation}
                      tickLine={false}
                      axisLine={false}
                      width={axis.width ?? 48}
                      allowDecimals={axis.allowDecimals}
                      tickFormatter={(value) =>
                        axis.tickFormatter
                          ? axis.tickFormatter(value)
                          : formatYAxis
                            ? formatYAxis(value)
                            : defaultFormat(value)
                      }
                      label={axis.label}
                    />
                  ))}
                </>
              )}

              {showTooltip ? (
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                  content={
                    <CustomTooltip
                      formatTooltipValue={formatTooltipValue}
                      formatTooltipLabel={formatTooltipLabel}
                    />
                  }
                />
              ) : null}

              {showLegend ? <Legend verticalAlign="top" height={36} /> : null}

              {renderCartesianSeries(series, variant)}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </ChartFrame>
    </Root>
  );
}
