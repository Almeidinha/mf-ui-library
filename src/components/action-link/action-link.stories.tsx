import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "components/icon";
import { Flex } from "components/layout";
import { Gap } from "foundation/spacing";

import { ActionLink } from "./action-link";

const meta = {
  title: "Components/ActionLink",
  component: ActionLink,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Click me",
    href: "https://www.example.com",
    newTab: false,
    subtle: false,
    disabled: false,
  },
  argTypes: {
    children: {
      description: "Content rendered inside the action link.",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
        defaultValue: { summary: "Click me" },
      },
    },
    newTab: {
      description: "Opens the link in a new browser tab when true.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "undefined" },
      },
    },
    href: {
      description: "Destination URL for the link.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "https://www.example.com" },
      },
    },
    onClick: {
      description: "Called when the link is activated.",
      table: {
        category: "Events",
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Disables the link and prevents navigation.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
    subtle: {
      description:
        "Renders the action link with a lower-emphasis visual style.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof ActionLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: function Render(args) {
    return <ActionLink {...args} />;
  },
};

export const Primary: Story = {
  render: function Render(args) {
    return <ActionLink {...args} />;
  },
  args: {
    children: (
      <Flex gap={Gap.xs}>
        Visit Example.com <Icon.CircleInfo />
      </Flex>
    ),
    href: "https://www.example.com",
  },
};
