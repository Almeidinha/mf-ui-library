import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";

import { Divider, DividerProps } from "./divider";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
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
      <Flex style={{ width: "50vh" }}>
        <Divider {...args} />
      </Flex>
    );
  },
};
