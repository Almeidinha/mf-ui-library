import type { Meta, StoryObj } from "@storybook/react";
import { CardFrame } from "components/shared-styled-components";
import { Body } from "components/typography";
import { useArgs } from "storybook/internal/preview-api";

import { Tabs, TabsProps } from "./tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  args: {
    secondary: false,
    selected: 0,
    activationMode: "auto",
    onChange: undefined,
    idPrefix: "tabs",
  },
  argTypes: {
    idPrefix: {
      description: "Prefix for the generated ids for tabs and panels.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "tabs" },
      },
    },
    secondary: {
      table: {
        defaultValue: { summary: "false" },
      },
    },
    selected: {
      table: { defaultValue: { summary: "0" } },
    },
    onChange: {
      description:
        "Callback when the selected tab changes. Receives the new index.",
      table: {
        type: { summary: "(index: number) => void)" },
      },
    },
    activationMode: {
      description:
        "Whether focusing a tab also activates it, or if activation requires an explicit action (Enter or Space).",
      control: { type: "radio" },
      options: ["auto", "manual"],
      table: {
        defaultValue: { summary: "auto" },
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    const [{ selected }, updateArgs] = useArgs<TabsProps>();
    return (
      <CardFrame
        style={{ padding: 8, flexDirection: "column", gap: 16, width: 350 }}
      >
        <Tabs
          {...args}
          selected={selected}
          onChange={(index) => updateArgs({ selected: index })}
        >
          <Tabs.TabList>
            <Tabs.Tab>Tab 1</Tabs.Tab>
            <Tabs.Tab>Tab 2</Tabs.Tab>
            <Tabs.Tab disabled>Tab 3</Tabs.Tab>
            <Tabs.Tab>Tab 4</Tabs.Tab>
          </Tabs.TabList>
          <Tabs.Content>
            <Body>Content 1</Body>
          </Tabs.Content>
          <Tabs.Content>
            <Body>Content 2</Body>
          </Tabs.Content>
          <Tabs.Content>
            <Body>Content 3</Body>
          </Tabs.Content>
          <Tabs.Content>
            <Body>Content 4</Body>
          </Tabs.Content>
        </Tabs>
      </CardFrame>
    );
  },
};
