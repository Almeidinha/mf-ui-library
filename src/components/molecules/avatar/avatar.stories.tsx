import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { Avatar } from "./avatar";

type Size = "small" | "medium" | "large";

type AvatarStoryArgs = React.ComponentProps<typeof Avatar> & {
  size: Size;
};

const meta: Meta<AvatarStoryArgs> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

## How to use

\`\`\`javascript
import { Avatar } from './index'

<Avatar name="SOME-NAME-HERE" />
\`\`\`
## Good Practices
- You can send the 'imageLabel' propertie as and 'alt' propertie in order to set and alternative text to image
        `,
      },
    },
  },
  args: {
    name: "Some Full Name",
    size: "large",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png",
    imageLabel: "Some Full Name avatar",
    withLabel: true,
    className: "custom-avatar",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "small" },
      },
    },
  },
} satisfies Meta<AvatarStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: ({ ...args }) => {
    const sizeProp = { [args.size]: true } as const;
    return <Avatar {...args} {...sizeProp} />;
  },
};
