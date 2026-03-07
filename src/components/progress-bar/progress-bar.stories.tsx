import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./progress-bar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {},
  args: {
    progress: 50,
    size: "small",
    pulse: false,
    "aria-label": "Progress bar example",
  },
  argTypes: {
    size: {
      table: {
        type: { summary: '"small" | "medium" | "large"' },
      },
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <ProgressBar {...args} />,
};
