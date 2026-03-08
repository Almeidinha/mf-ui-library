import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components/molecules";
import { useArgs } from "storybook/internal/preview-api";

import { ToastProvider, useToast } from "./hooks/useToast";
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
    label: "Notification",
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
    label: {
      description:
        "The aria-label for the toast viewport, used for accessibility purposes.",
      table: { defaultValue: { summary: "Notification" } },
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

export const ToastProviderExample: Story = {
  decorators: [
    (Story, context) => (
      <ToastProvider maxVisible={3} {...context.args}>
        <Story />
      </ToastProvider>
    ),
  ],
  render: function Render(args) {
    const ToastStoryContent = () => {
      const { showToast } = useToast();

      return (
        <div style={{ height: 250 }}>
          <Button
            primary
            onClick={() => {
              showToast({
                ...args,
              });
            }}
          >
            Open me!
          </Button>
        </div>
      );
    };

    return <ToastStoryContent />;
  },
  argTypes: {
    open: { control: false, table: { disable: true } },
    onOpenChange: { control: false, table: { disable: true } },
    onActionClick: { control: false, table: { disable: true } },
  },
};
