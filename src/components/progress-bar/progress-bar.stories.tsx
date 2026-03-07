import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./progress-bar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    docs: {
      description: {
        component: `
The Progress Bar visually communicates the completion status of a task or process.
It indicates how much progress has been made and how much remains until completion.

Use the size option to adjust the visual weight of the progress bar when different levels of emphasis or layout density are required.
---

## How to use

\`\`\`tsx
import { ProgressBar } from './index'

<ProgressBar
  progress={40}
>
  <Body>Modal text</Body>
</ProgressBar>
\`\`\`

---
        `,
      },
    },
  },
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
