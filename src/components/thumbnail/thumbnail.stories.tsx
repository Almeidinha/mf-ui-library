import type { Meta, StoryObj } from "@storybook/react";

import { Thumbnail } from "./thumbnail";

const meta = {
  title: "Components/Thumbnail",
  component: Thumbnail,
  parameters: {
    layout: "centered",
  },
  args: {
    imageUrl: "https://www.svgrepo.com/show/425238/users-avatar.svg",
    size: "medium",
    imageLabel: "Thumbnail Image",
    fallbackUrl: "",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      table: { defaultValue: { summary: "medium" } },
    },
    fallbackUrl: {
      description:
        "URL of the fallback image to display if the main image fails to load.",
      table: { defaultValue: { summary: "undefined" } },
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    return <Thumbnail {...args} />;
  },
};
