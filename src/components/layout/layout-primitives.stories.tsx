import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "components/divider";
import { Label } from "components/typography";
import type { ComponentProps } from "react";
import styled from "styled-components";

import { Box, Container, Paper, Stack } from "./index";

type StackDirection = "column" | "column-reverse" | "row" | "row-reverse";

type StackStoryArgs = Omit<
  ComponentProps<typeof Stack>,
  "children" | "direction" | "divider" | "spacing"
> & {
  direction: StackDirection;
  showDivider: boolean;
  spacing: number;
};

const defaultStackPlaygroundArgs: StackStoryArgs = {
  direction: "column",
  spacing: 2,
  showDivider: true,
  useFlexGap: false,
};

const Page = styled.div`
  display: grid;
  gap: 24px;
  width: min(1100px, 100%);
`;

const Surface = styled.div`
  border: 1px dashed #d0d7de;
  padding: 24px;
  background: #f8fafc;
`;

const DemoBlock = styled.div`
  min-width: max-content;
  min-height: 56px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 600;
`;

const StackPlaygroundItem = styled(DemoBlock)<{ $isHorizontal: boolean }>`
  width: ${({ $isHorizontal }) => ($isHorizontal ? "auto" : "100%")};
  min-width: ${({ $isHorizontal }) => ($isHorizontal ? "140px" : "0")};
  flex: ${({ $isHorizontal }) => ($isHorizontal ? "0 0 auto" : "1 1 100%")};
`;

const ContainerFrame = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #eff6ff 0%, #f8fafc 100%);
  border: 1px solid #dbeafe;
`;

const StackStoryDivider = styled.div<{ $direction: StackDirection }>`
  flex: 0 0 auto;
  align-self: stretch;
  width: ${({ $direction }) => ($direction.startsWith("row") ? "1px" : "100%")};
  min-width: ${({ $direction }) =>
    $direction.startsWith("row") ? "1px" : "auto"};
  height: ${({ $direction }) =>
    $direction.startsWith("row") ? "auto" : "1px"};
  background: #d0d7de;
`;

function StackPlaygroundPreview({
  direction,
  showDivider,
  spacing,
  ...args
}: StackStoryArgs) {
  const isHorizontal = direction.startsWith("row");

  return (
    <Surface>
      <Stack
        {...args}
        direction={direction}
        spacing={spacing}
        divider={
          showDivider ? <StackStoryDivider $direction={direction} /> : undefined
        }
        sx={{
          justifyContent: isHorizontal ? "center" : "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <StackPlaygroundItem $isHorizontal={isHorizontal}>
          Item 1
        </StackPlaygroundItem>
        <StackPlaygroundItem $isHorizontal={isHorizontal}>
          Item 2
        </StackPlaygroundItem>
        <StackPlaygroundItem $isHorizontal={isHorizontal}>
          Item 3
        </StackPlaygroundItem>
      </Stack>
    </Surface>
  );
}

const meta: Meta<StackStoryArgs> = {
  title: "Foundations/Layout Primitives",
  component: StackPlaygroundPreview,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
MUI-like layout primitives implemented for this library's token system.

- Box: polymorphic generic container with \`component\` and \`sx\`
- Container: centered horizontal layout wrapper with \`maxWidth\`, \`fixed\`, and \`disableGutters\`
- Paper: elevated or outlined surface with \`elevation\`, \`variant\`, and \`square\`
- Stack: one-dimensional layout helper with \`direction\`, \`spacing\`, and \`divider\`
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<StackStoryArgs>;

export const Docs: Story = {
  render: () => (
    <Page>
      <section>
        <Label>Box</Label>
        <Surface>
          <Box
            component="section"
            sx={{
              p: 2,
              border: "1px solid #93c5fd",
              borderRadius: 2,
              bgcolor: "#eff6ff",
            }}
          >
            <DemoBlock>Section Box</DemoBlock>
          </Box>
        </Surface>
      </section>

      <section>
        <Label>Container</Label>
        <ContainerFrame>
          <Container maxWidth="md" sx={{ py: 3 }}>
            <DemoBlock>Centered content with md max width</DemoBlock>
          </Container>
        </ContainerFrame>
      </section>

      <section>
        <Label>Paper</Label>
        <Stack direction="row" spacing={2}>
          <Paper sx={{ p: 2, minWidth: 180 }}>Default elevation</Paper>
          <Paper elevation={6} sx={{ p: 2, minWidth: 180 }}>
            Elevated surface
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, minWidth: 180 }}>
            Outlined surface
          </Paper>
        </Stack>
      </section>

      <section>
        <Label>Stack</Label>
        <Surface>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 3 }}
            divider={<Divider />}
            sx={{ alignItems: "stretch" }}
          >
            <DemoBlock>Item 1</DemoBlock>
            <DemoBlock>Item 2</DemoBlock>
            <DemoBlock>Item 3</DemoBlock>
          </Stack>
        </Surface>
      </section>
    </Page>
  ),
};

export const StackPlayground: Story = {
  args: defaultStackPlaygroundArgs,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["column", "column-reverse", "row", "row-reverse"],
      description: "Changes the stacking axis and item order.",
    },
    spacing: {
      control: { type: "number" },
      description:
        "Applies Stack spacing using the same 8px scale used by the layout system.",
    },
    showDivider: {
      control: { type: "boolean" },
      description: "Toggles a visual divider between each item.",
    },
    useFlexGap: {
      control: { type: "boolean" },
      description:
        "Exposes the Stack prop even though spacing uses native gap.",
    },
    children: { control: false, table: { disable: true } },
    divider: { control: false, table: { disable: true } },
    component: { control: false, table: { disable: true } },
    sx: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <StackPlaygroundPreview {...defaultStackPlaygroundArgs} {...args} />
  ),
};
