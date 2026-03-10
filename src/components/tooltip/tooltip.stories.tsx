import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  args: {
    position: "top",
    content: "Tooltip content",
    width: undefined,
    children: "Hover me",
    style: {},
    className: "",
  },
  argTypes: {
    width: { control: "number" },
    position: {
      control: { type: "radio" },
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "left",
        "right",
      ],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    return <Tooltip {...args} />;
  },
};
