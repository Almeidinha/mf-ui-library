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
    subdued: false,
  },
} satisfies Meta<DividerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    return (
      <Flex>
        <Divider {...args} />
      </Flex>
    );
  },
};
