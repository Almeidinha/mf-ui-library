import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { Slider, SliderProps } from "./slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {},
  args: {
    min: 10,
    max: 100,
    value: 50,
    prefix: "$",
    onChange: undefined,
    editable: false,
    onKeyUp: undefined,
  },
  argTypes: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<SliderProps>();

    return <Slider {...args} onChange={(value) => updateArgs({ value })} />;
  },
};
