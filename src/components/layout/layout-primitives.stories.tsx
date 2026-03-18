import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "components/divider";
import { Label } from "components/typography";
import styled from "styled-components";

import { Box, Container, Paper, Stack } from "./index";

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
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 600;
`;

const ContainerFrame = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #eff6ff 0%, #f8fafc 100%);
  border: 1px solid #dbeafe;
`;

const meta = {
  title: "Components/Layout Primitives",
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
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

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
