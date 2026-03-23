import { render, screen } from "@testing-library/react";
import type { JSX } from "react";
import { vi } from "vitest";

import { Chart } from "./chart";
import type { ChartProps } from "./types";

vi.mock("recharts", async () => {
  const original = await vi.importActual<typeof import("recharts")>("recharts");

  const Passthrough = ({
    children,
  }: {
    children?: JSX.Element | JSX.Element[];
  }) => <div>{children}</div>;

  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: JSX.Element }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    ComposedChart: Passthrough,
    PieChart: Passthrough,
    RadarChart: Passthrough,
    CartesianGrid: () => <div data-testid="chart-grid" />,
    PolarGrid: () => <div data-testid="chart-polar-grid" />,
    Legend: () => <div data-testid="chart-legend" />,
    Tooltip: () => <div data-testid="chart-tooltip" />,
    XAxis: () => <div data-testid="chart-x-axis" />,
    YAxis: () => <div data-testid="chart-y-axis" />,
    PolarAngleAxis: () => <div data-testid="chart-polar-angle-axis" />,
    PolarRadiusAxis: () => <div data-testid="chart-polar-radius-axis" />,
    Line: ({ name }: { name?: string }) => <div>{`line:${name}`}</div>,
    Bar: ({ name }: { name?: string }) => <div>{`bar:${name}`}</div>,
    Area: ({ name }: { name?: string }) => <div>{`area:${name}`}</div>,
    Radar: ({ name }: { name?: string }) => <div>{`radar:${name}`}</div>,
    Pie: ({
      name,
      innerRadius,
      children,
    }: {
      name?: string;
      innerRadius?: number | string;
      children?: JSX.Element | JSX.Element[];
    }) => (
      <div data-testid="chart-pie">
        {`pie:${name}:${String(innerRadius ?? 0)}`}
        {children}
      </div>
    ),
    Cell: () => <div data-testid="chart-pie-cell" />,
  };
});

type RevenuePoint = {
  month: string;
  revenue: number;
  forecast: number;
};

const data: RevenuePoint[] = [
  { month: "Jan", revenue: 120, forecast: 140 },
  { month: "Feb", revenue: 180, forecast: 190 },
];

const baseProps: ChartProps<RevenuePoint> = {
  data,
  xKey: "month",
  series: [
    { key: "revenue", label: "Revenue" },
    { key: "forecast", label: "Forecast", hidden: true },
  ],
  ariaLabel: "Revenue chart",
};

describe("Chart", () => {
  it("renders a loading state", () => {
    render(<Chart {...baseProps} loading />);

    expect(
      screen.getByRole("img", { name: "Revenue chart" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("responsive-container"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("No data available")).not.toBeInTheDocument();
  });

  it("renders an empty state when there is no data", () => {
    render(
      <Chart {...baseProps} data={[]} emptyState={<span>Nothing here</span>} />,
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(
      screen.queryByTestId("responsive-container"),
    ).not.toBeInTheDocument();
  });

  it("renders visible series and chart primitives", () => {
    render(<Chart {...baseProps} showGrid showLegend showTooltip />);

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("chart-grid")).toBeInTheDocument();
    expect(screen.getByTestId("chart-legend")).toBeInTheDocument();
    expect(screen.getByTestId("chart-tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("chart-x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("chart-y-axis")).toBeInTheDocument();
    expect(screen.getByText("line:Revenue")).toBeInTheDocument();
    expect(screen.queryByText("line:Forecast")).not.toBeInTheDocument();
  });

  it("renders a donut pie chart using the first visible series", () => {
    render(<Chart {...baseProps} variant="pie" pieVariant="donut" />);

    expect(screen.getByTestId("chart-pie")).toHaveTextContent(
      "pie:Revenue:56%",
    );
    expect(screen.getAllByTestId("chart-pie-cell")).toHaveLength(2);
  });

  it("renders a radar chart", () => {
    render(
      <Chart
        {...baseProps}
        variant="radar"
        series={[
          { key: "revenue", label: "Revenue", type: "radar" },
          { key: "forecast", label: "Forecast", type: "radar" },
        ]}
      />,
    );

    expect(screen.getByTestId("chart-polar-grid")).toBeInTheDocument();
    expect(screen.getByTestId("chart-polar-angle-axis")).toBeInTheDocument();
    expect(screen.getByTestId("chart-polar-radius-axis")).toBeInTheDocument();
    expect(screen.getByText("radar:Revenue")).toBeInTheDocument();
    expect(screen.getByText("radar:Forecast")).toBeInTheDocument();
  });

  it("infers radar series type from the chart variant", () => {
    render(
      <Chart
        {...baseProps}
        variant="radar"
        series={[
          { key: "revenue", label: "Revenue" },
          { key: "forecast", label: "Forecast" },
        ]}
      />,
    );

    expect(screen.getByText("radar:Revenue")).toBeInTheDocument();
    expect(screen.getByText("radar:Forecast")).toBeInTheDocument();
  });

  it("renders vertical bar charts and multiple value axes", () => {
    render(
      <Chart
        {...baseProps}
        variant="bar"
        cartesianLayout="vertical"
        yAxes={[
          { id: "revenue", orientation: "left" },
          { id: "forecast", orientation: "right" },
        ]}
        series={[
          { key: "revenue", label: "Revenue", type: "bar", yAxisId: "revenue" },
          {
            key: "forecast",
            label: "Forecast",
            type: "bar",
            yAxisId: "forecast",
          },
        ]}
      />,
    );

    expect(screen.getAllByTestId("chart-x-axis")).toHaveLength(1);
    expect(screen.getAllByTestId("chart-y-axis")).toHaveLength(1);
    expect(screen.getByText("bar:Revenue")).toBeInTheDocument();
    expect(screen.getByText("bar:Forecast")).toBeInTheDocument();
  });

  it("renders multiple cartesian value axes in horizontal layout", () => {
    render(
      <Chart
        {...baseProps}
        variant="bar"
        yAxes={[
          { id: "revenue", orientation: "left" },
          { id: "forecast", orientation: "right" },
        ]}
        series={[
          { key: "revenue", label: "Revenue", type: "bar", yAxisId: "revenue" },
          {
            key: "forecast",
            label: "Forecast",
            type: "line",
            yAxisId: "forecast",
          },
        ]}
      />,
    );

    expect(screen.getAllByTestId("chart-y-axis")).toHaveLength(2);
  });
});
