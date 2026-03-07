import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { RangeSlider, RangeSliderProps } from "./range-slider";

const prices: number[] = [];
for (let i = 0; i < 500; i++) {
  prices.push(Math.floor(Math.random() * 50) + 1);
}

const meta = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  parameters: {},
  args: {
    min: 0,
    max: 100,
    values: [0, 100],
    prefix: "",
    graphHeight: 100,
    editable: false,
    data: undefined,
    maxLabel: "Max",
    minLabel: "Min",
    onChange: undefined,
    onKeyUp: undefined,
  },
  argTypes: {},
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<RangeSliderProps>();

    return (
      <RangeSlider {...args} onChange={(values) => updateArgs({ values })} />
    );
  },
};

export const withGraph: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<RangeSliderProps>();

    return (
      <RangeSlider
        {...args}
        data={prices}
        onChange={(values) => updateArgs({ values })}
      />
    );
  },
};
