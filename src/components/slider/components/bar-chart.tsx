import { Surface } from "foundation/colors";
import { FC } from "helpers/generic-types";
import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface IProps {
  data: readonly number[];
  highlight: readonly number[];
  domain: readonly [number, number];
}

type BaseChartDatum = {
  value: number;
  occurrences: number;
};

const getBaseChartData = (data: readonly number[]): BaseChartDatum[] => {
  const occurrences = new Map<number, number>();

  for (const value of data) {
    occurrences.set(value, (occurrences.get(value) ?? 0) + 1);
  }

  return Array.from(occurrences.entries())
    .map(([value, count]) => ({ value, occurrences: count }))
    .sort((a, b) => a.value - b.value);
};

export const BarChartComponent: FC<IProps> = ({ data, highlight }) => {
  const baseData = useMemo(() => {
    return getBaseChartData(data);
  }, [data]);

  const chartData = useMemo(() => {
    const [highlightMin, highlightMax] = highlight;

    return baseData.map((datum) => {
      return {
        ...datum,
        fill:
          datum.value >= highlightMin && datum.value <= highlightMax
            ? Surface.Selected.Hover
            : Surface.Neutral.Subdued,
      };
    });
  }, [baseData, highlight]);

  return (
    <ResponsiveContainer height="100%" width="100%">
      <BarChart
        data={chartData}
        margin={{ top: 0, right: 1, bottom: 0, left: 1 }}
        barCategoryGap="5%"
      >
        <Bar dataKey="occurrences" />
      </BarChart>
    </ResponsiveContainer>
  );
};
