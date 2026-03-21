import type { Meta, StoryObj } from "@storybook/react";
import { Body } from "components/typography";
import styled from "styled-components";

import { Skeleton, SkeletonProps } from "./skeleton";

const StoryLayout = styled.div`
  display: grid;
  min-height: 200px;
  min-width: 200px;
  gap: 24px;
  width: min(720px, 100%);
`;

const ShowcaseGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const Card = styled.div`
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
`;

const AvatarRow = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
  align-items: center;
`;

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Skeleton component renders placeholder shapes while content is loading.

---

## How to use

\`\`\`tsx
import { Skeleton } from "./index";

<Skeleton variant="text" width="100%" />
\`\`\`
        `,
      },
    },
  },
  args: {
    variant: "text",
    animation: "wave",
    width: "100%",
    height: undefined,
    className: undefined,
    style: undefined,
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["text", "circular", "rectangular", "rounded"],
      description: "Determines the placeholder shape.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "text" },
      },
    },
    animation: {
      control: { type: "radio" },
      options: ["wave", "pulse", false],
      description: "Controls the loading animation, or disables it.",
      table: {
        category: "Motion",
        defaultValue: { summary: "wave" },
      },
    },
    width: {
      control: "text",
      description: "Explicit width for the skeleton.",
      table: {
        category: "Layout",
        defaultValue: { summary: "100% for text" },
      },
    },
    height: {
      control: "text",
      description: "Explicit height for the skeleton.",
      table: {
        category: "Layout",
        defaultValue: { summary: "1em for text" },
      },
    },
    className: {
      control: false,
      table: { disable: true },
    },
    style: {
      control: false,
      table: { disable: true },
    },
  },
} satisfies Meta<SkeletonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: function Render(args) {
    return (
      <StoryLayout>
        <Body>
          Use skeleton placeholders to preserve layout rhythm while data is
          loading.
        </Body>
        <Skeleton {...args} />
      </StoryLayout>
    );
  },
};

export const Variants: Story = {
  args: {
    animation: "wave",
  },
  render: function Render(args) {
    return (
      <ShowcaseGrid>
        <Card>
          <Body>Text</Body>
          <Skeleton {...args} variant="text" width="100%" />
          <Skeleton {...args} variant="text" width="72%" />
        </Card>
        <Card>
          <Body>Rectangular</Body>
          <Skeleton {...args} variant="rectangular" width="100%" height={96} />
        </Card>
        <Card>
          <Body>Rounded</Body>
          <Skeleton {...args} variant="rounded" width="100%" height={96} />
        </Card>
        <Card>
          <Body>Circular</Body>
          <Skeleton {...args} variant="circular" width={72} height={72} />
        </Card>
      </ShowcaseGrid>
    );
  },
};

export const ContentPreview: Story = {
  args: {
    animation: "pulse",
  },
  render: function Render(args) {
    return (
      <Card>
        <AvatarRow>
          <Skeleton {...args} variant="circular" width={48} height={48} />
          <div>
            <Skeleton {...args} variant="text" width="42%" />
            <Skeleton {...args} variant="text" width="68%" />
          </div>
        </AvatarRow>
        <Skeleton {...args} variant="rounded" width="100%" height={140} />
        <Skeleton {...args} variant="text" width="95%" />
        <Skeleton {...args} variant="text" width="88%" />
        <Skeleton {...args} variant="text" width="54%" />
      </Card>
    );
  },
};
