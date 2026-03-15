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
    fallbackUrl: "https://www.svgrepo.com/show/425244/users-avatar.svg",
  },
  argTypes: {
    imageUrl: {
      description: "Primary image URL rendered by the thumbnail.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "https://www.svgrepo.com/show/425238/users-avatar.svg",
        },
      },
    },
    size: {
      description: "Sets the rendered thumbnail size.",
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "medium" },
      },
    },
    imageLabel: {
      description: "Accessible label used for the rendered image.",
      table: {
        category: "Accessibility",
        defaultValue: { summary: "Thumbnail Image" },
      },
    },
    fallbackUrl: {
      description:
        "URL of the fallback image to display if the main image fails to load.",
      table: {
        category: "Content",
        defaultValue: {
          summary: "https://www.svgrepo.com/show/425244/users-avatar.svg",
        },
      },
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
