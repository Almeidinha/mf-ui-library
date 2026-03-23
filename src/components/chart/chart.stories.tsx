import type { Meta, StoryObj } from "@storybook/react";

import { Chart } from "./chart";

type RevenuePoint = {
  month: string;
  revenue: number;
  forecast: number;
  target: number;
};

const data: RevenuePoint[] = [
  { month: "Jan", revenue: 120, forecast: 132, target: 140 },
  { month: "Feb", revenue: 176, forecast: 168, target: 180 },
  { month: "Mar", revenue: 164, forecast: 171, target: 175 },
  { month: "Apr", revenue: 208, forecast: 196, target: 210 },
  { month: "May", revenue: 232, forecast: 220, target: 230 },
  { month: "Jun", revenue: 218, forecast: 226, target: 240 },
];

const meta = {
  title: "Components/Chart",
  component: Chart,
  args: {
    data,
    xKey: "month",
    ariaLabel: "Revenue trend",
    height: 320,
    variant: "line",
    pieVariant: "pie",
    cartesianLayout: "horizontal",
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    xAxisLabel: "Month",
    yAxisLabel: "Revenue",
    series: [
      { key: "revenue", label: "Revenue", color: "#2563EB" },
      {
        key: "forecast",
        label: "Forecast",
        color: "#10B981",
        dashed: true,
      },
    ],
  },
  argTypes: {
    data: { control: false, table: { category: "Data" } },
    series: { control: false, table: { category: "Data" } },
    xKey: { control: false, table: { category: "Data" } },
    variant: {
      control: { type: "radio" },
      options: ["line", "bar", "area", "composed", "pie", "radar"],
      table: { category: "Appearance" },
    },
    pieVariant: {
      control: { type: "radio" },
      options: ["pie", "donut"],
      table: { category: "Appearance" },
    },
    cartesianLayout: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      table: { category: "Layout" },
    },
    height: {
      control: { type: "number", min: 180, max: 640, step: 20 },
      table: { category: "Layout" },
    },
    yAxes: { control: false, table: { category: "Layout" } },
    pieInnerRadius: { table: { category: "Appearance" } },
    pieOuterRadius: { table: { category: "Appearance" } },
    pieShowLabels: { table: { category: "Appearance" } },
    showGrid: { table: { category: "Behavior" } },
    showLegend: { table: { category: "Behavior" } },
    showTooltip: { table: { category: "Behavior" } },
    loading: { table: { category: "State" } },
    empty: { table: { category: "State" } },
    xAxisLabel: { table: { category: "Labels" } },
    yAxisLabel: { table: { category: "Labels" } },
    ariaLabel: { table: { category: "Accessibility" } },
    className: { table: { disable: true } },
    formatXAxis: { table: { disable: true } },
    formatYAxis: { table: { disable: true } },
    formatTooltipValue: { table: { disable: true } },
    formatTooltipLabel: { table: { disable: true } },
    emptyState: { table: { disable: true } },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Bar: Story = {
  args: {
    variant: "bar",
    series: [
      { key: "revenue", label: "Revenue", color: "#2563EB" },
      { key: "target", label: "Target", color: "#F97316" },
    ],
  },
};

export const VerticalBar: Story = {
  args: {
    variant: "bar",
    cartesianLayout: "vertical",
    series: [
      { key: "revenue", label: "Revenue", color: "#2563EB" },
      { key: "target", label: "Target", color: "#F97316" },
    ],
  },
};

export const StackedBar: Story = {
  args: {
    variant: "bar",
    series: [
      { key: "revenue", label: "Revenue", color: "#2563EB", stackId: "totals" },
      {
        key: "forecast",
        label: "Forecast",
        color: "#10B981",
        stackId: "totals",
      },
    ],
  },
};

export const MultiAxis: Story = {
  args: {
    variant: "composed",
    yAxes: [
      { id: "revenue", orientation: "left", label: "Revenue" },
      { id: "forecast", orientation: "right", label: "Forecast" },
    ],
    series: [
      {
        key: "revenue",
        label: "Revenue",
        type: "bar",
        color: "#2563EB",
        yAxisId: "revenue",
      },
      {
        key: "forecast",
        label: "Forecast",
        type: "line",
        color: "#10B981",
        yAxisId: "forecast",
      },
    ],
  },
};

export const Composed: Story = {
  args: {
    variant: "composed",
    series: [
      { key: "revenue", label: "Revenue", type: "bar", color: "#2563EB" },
      {
        key: "forecast",
        label: "Forecast",
        type: "line",
        color: "#10B981",
        dashed: true,
      },
      { key: "target", label: "Target", type: "area", color: "#F97316" },
    ],
  },
};

export const Pie: Story = {
  args: {
    variant: "pie",
    pieVariant: "pie",
    xAxisLabel: undefined,
    yAxisLabel: undefined,
    series: [{ key: "revenue", label: "Revenue" }],
  },
};

export const Donut: Story = {
  args: {
    variant: "pie",
    pieVariant: "donut",
    pieShowLabels: true,
    xAxisLabel: undefined,
    yAxisLabel: undefined,
    series: [{ key: "revenue", label: "Revenue" }],
  },
};

export const Radar: Story = {
  args: {
    variant: "radar",
    series: [
      { key: "revenue", label: "Revenue", type: "radar", color: "#2563EB" },
      { key: "forecast", label: "Forecast", type: "radar", color: "#10B981" },
    ],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    empty: true,
  },
};
