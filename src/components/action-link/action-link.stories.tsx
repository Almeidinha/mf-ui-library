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
      table: {
        type: { summary: "ReactNode" },
      },
    },
    newTab: {
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    href: {
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    onClick: {
      table: {
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: "false" },
      },
    },
    subtle: {
      table: {
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
