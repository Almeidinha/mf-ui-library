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
    content: {
      description: "Text or content rendered inside the tooltip bubble.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "Tooltip content",
        },
      },
    },
    children: {
      description:
        "Trigger element or text that reveals the tooltip on hover or focus.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "Hover me",
        },
      },
    },
    width: {
      description: "Optional fixed width for the tooltip bubble.",
      control: "number",
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    position: {
      description:
        "Preferred placement of the tooltip relative to its trigger.",
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
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "top",
        },
      },
    },
    className: {
      description: "Optional class name applied to the tooltip wrapper.",
      table: {
        category: "Appearance",
        defaultValue: {
          summary: '""',
        },
      },
    },
    style: {
      description: "Inline styles applied to the tooltip wrapper.",
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "{}",
        },
      },
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
