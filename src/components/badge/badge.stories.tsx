import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import styled from "styled-components";

import { Badge } from "./badge";

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;

type Variant = "neutral" | "info" | "success" | "warning" | "critical";

type BadgeStoryArgs = React.ComponentProps<typeof Badge> & {
  variant: Variant;
};

const meta: Meta<BadgeStoryArgs> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
This is an atom.

---

## How to use

\`\`\`tsx
import { Badge } from './index'

<Badge>Contents</Badge>
\`\`\`

---

### API

| Name        | Type      | Description                |
| ----------- | --------- | -------------------------- |
|  neutral?   |  boolean  | renders the neutral badge  |
|  info?      |  boolean  | renders the info badge     |
|  warning?   |  boolean  | renders the warning badge  |
|  success?   |  boolean  | renders the success badge  |
|  critical?  |  boolean  | renders the critical badge |
        `,
      },
    },
  },
  args: { children: "Badge", variant: "neutral" },
  argTypes: {
    children: {
      description: "Text content rendered inside the badge.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "Badge",
        },
      },
    },
    variant: {
      description: "Selects the semantic badge style used for this preview.",
      control: { type: "select" },
      options: ["neutral", "info", "success", "warning", "critical"],
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "neutral",
        },
      },
    },
  },
} satisfies Meta<BadgeStoryArgs>;

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Docs: Story = {
  parameters: {
    previewTabs: { canvas: { hidden: true } },
  },
  render: ({ ...args }) => (
    <Badge {...args} {...{ [args.variant]: true }}>
      {args.children}
    </Badge>
  ),
};

export const TypeVariant: Story = {
  render: () => (
    <Wrapper>
      <Badge neutral>Neutral</Badge>
      <Badge info>Info</Badge>
      <Badge success>Success</Badge>
      <Badge warning>Warning</Badge>
      <Badge critical>Critical</Badge>
    </Wrapper>
  ),
  parameters: {
    docs: { disable: true },
    controls: { disable: true },
  },
};
