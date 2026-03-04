import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "components/layout";
import { Button } from "components/molecules";
import { BodyLarge } from "components/typography";
import { Gap } from "foundation/spacing";
import React from "react";

import { Spinner } from "./spinner";

type Size = "small" | "medium" | "large";

type SpinStoryArgs = React.ComponentProps<typeof Spinner> & {
  size?: Size;
};

const meta: Meta<SpinStoryArgs> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Spinners are used to notify users that their action is being processed.

## How to Use

\`\`\`tsx
import { Spinner } from './index'

<Spinner />
\`\`\`

\`\`\`
        `,
      },
    },
  },
  args: {
    size: "medium",
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<SpinStoryArgs>;

export default meta;
type Story = StoryObj<SpinStoryArgs>;

export const Docs: Story = {
  parameters: {
    previewTabs: { canvas: { hidden: true } },
  },
  render: ({ ...args }) => {
    const size = args.size ? { [args.size]: true } : {};
    return (
      <Flex style={{ height: 50, alignItems: "center" }}>
        <Spinner {...args} {...size} />
      </Flex>
    );
  },
};

export const SpinnerCodeExample: Story = {
  render: () => (
    <Flex column gap={Gap.m}>
      <BodyLarge>
        When rendering the spinner on a primary or critical surface, use
        onPrimary or onCritical.
      </BodyLarge>
      <Button primary>
        <Spinner onPrimary />
      </Button>
      <Button destructive primary>
        <Spinner onCritical />
      </Button>
      <Button destructive>
        <Spinner onCritical />
      </Button>
    </Flex>
  ),
  parameters: {
    docs: { disable: true },
  },
};
