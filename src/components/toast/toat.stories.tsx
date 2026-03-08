import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";

import { StandaloneToastProps, Toast } from "./toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {},
  args: {
    open: false,
    onOpenChange: () => {},
    position: "top",
    variant: "default",
    duration: 3000,
    title: "Toast Title",
    description: "This is a toast notification.",
    onActionClick: () => {},
    actionText: "Action",
  },
  argTypes: {
    position: {
      control: { type: "radio" },
      options: [
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      table: { defaultValue: { summary: "top" } },
    },
    variant: {
      control: { type: "radio" },
      options: ["info", "default", "success", "warning", "error"],
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<StandaloneToastProps>();
    return (
      <div style={{ height: 250 }}>
        <Toast {...args} onOpenChange={(open) => updateArgs({ open })} />
      </div>
    );
  },
};
