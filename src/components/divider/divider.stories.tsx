import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";

import { Divider, DividerProps } from "./divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: `
---

## How to use

\`\`\`javascript
import { Divider } from './index'

<Divider />
\`\`\`

        `,
      },
    },
  },
  args: {
    muted: false,
    direction: "horizontal",
    width: undefined,
    height: undefined,
  },
  argTypes: {
    muted: {
      description:
        "Renders the divider with a softer, less prominent treatment.",
      table: {
        category: "Appearance",
        defaultValue: {
          summary: "false",
        },
      },
    },
    direction: {
      description: "Controls whether the divider is rendered horizontally or vertically.",
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: {
        category: "Layout",
        defaultValue: {
          summary: "horizontal",
        },
      },
    },
    width: {
      description:
        "Optional explicit width. Defaults to full width for horizontal dividers and 1px for vertical ones.",
      table: {
        category: "Layout",
      },
    },
    height: {
      description:
        "Optional explicit height. Defaults to 1px for horizontal dividers and stretch for vertical ones.",
      table: {
        category: "Layout",
      },
    },
  },
} satisfies Meta<DividerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    return (
      <Flex
        style={
          args.direction === "vertical"
            ? { height: 120, alignItems: "stretch" }
            : { width: "100%" }
        }
      >
        <Divider {...args} />
      </Flex>
    );
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
  render: function Render(args) {
    return (
      <Flex style={{ height: 120, alignItems: "stretch" }}>
        <Divider {...args} />
      </Flex>
    );
  },
};

export const VerticalCustomSize: Story = {
  args: {
    direction: "vertical",
    height: 48,
    width: 2,
  },
  render: function Render(args) {
    return (
      <Flex style={{ height: 120, alignItems: "center" }}>
        <Divider {...args} />
      </Flex>
    );
  },
};
