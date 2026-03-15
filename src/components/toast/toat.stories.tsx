import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components/molecules";
import { useArgs } from "storybook/internal/preview-api";

import { ToastProvider, ToastProviderProps, useToast } from "./hooks/useToast";
import { StandaloneToastProps, Toast } from "./toast";

type StoryType = StandaloneToastProps & ToastProviderProps;

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: {},
  args: {
    open: false,
    position: "top",
    variant: "default",
    duration: 3000,
    closeable: false,
    title: "Toast Title",
    description: "This is a toast notification.",
    actionText: "Action",
    label: "Notification",
    disablePortal: true,
    portalContainer: null,
    onOpenChange: () => {},
    onActionClick: () => {},
    maxVisible: 3,
  },
  argTypes: {
    open: {
      description: "Controls whether the toast is currently visible.",
      table: { defaultValue: { summary: "false" } },
    },
    position: {
      description: "Placement of the toast viewport on the screen.",
      control: { type: "radio" },
      options: [
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      table: {
        defaultValue: { summary: "top" },
        type: {
          summary:
            "top | bottom | top-left | top-right | bottom-left | bottom-right",
        },
      },
    },
    label: {
      description:
        "The aria-label for the toast viewport, used for accessibility purposes.",
      table: { defaultValue: { summary: "Notification" } },
    },
    variant: {
      description: "Semantic style used for the toast.",
      control: { type: "radio" },
      options: ["info", "default", "success", "warning", "error"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "info | default | success | warning | error" },
      },
    },
    duration: {
      description:
        "The duration (in milliseconds) before the toast auto-closes. If not provided, the toast will not auto-close.",
      table: { defaultValue: { summary: "undefined" } },
    },
    maxVisible: {
      description:
        "The maximum number of toasts visible at once. If the limit is exceeded, the oldest toast will be removed to make room for the new one.",
      table: { defaultValue: { summary: "3" }, category: "Provider Props" },
    },
    closeable: {
      description: "Whether the toast can be manually closed by the user.",
      table: { defaultValue: { summary: "true" } },
    },
    title: {
      description: "Main title shown in the toast content.",
      table: { defaultValue: { summary: "undefined" } },
    },
    description: {
      description: "Supporting message shown below the toast title.",
      table: { defaultValue: { summary: "This is a toast notification." } },
    },
    actionText: {
      description: "Optional label for the toast action button.",
      table: { defaultValue: { summary: "undefined" } },
    },
    disablePortal: {
      description:
        "Whether to disable React Portal for the toast viewport. If true, the viewport will be rendered in place instead of being portaled.",
      table: { defaultValue: { summary: "false" }, category: "Provider Props" },
    },
    portalContainer: {
      description:
        "The DOM element to render the toast viewport into when using React Portal. If not provided, it defaults to document.body.",
      table: { defaultValue: { summary: "null" }, category: "Provider Props" },
    },
  },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<StoryType>;

export const Primary: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<StandaloneToastProps>();
    return (
      <div style={{ height: 250 }}>
        <Button primary onClick={() => updateArgs({ open: true })}>
          Open me!
        </Button>
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
