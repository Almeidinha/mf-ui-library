import type { Meta, StoryObj } from "@storybook/react";
import { Body, Caption, Heading3, Label } from "components/typography";
import { Gap, Margin, Padding } from "foundation/spacing";
import styled from "styled-components";

import { Flex, gridLayoutGenerator, leftRightLayoutGenerator } from "./index";

const { Grid, Cell } = gridLayoutGenerator();
const { Layout } = leftRightLayoutGenerator();

const Page = styled.div`
  display: grid;
  gap: ${Margin.xl};
  padding: ${Padding.l};
  max-width: 1100px;
`;

const Section = styled.section`
  display: grid;
  gap: ${Margin.m};
`;

const Description = styled.p`
  margin: 0;
  max-width: 760px;
  color: #6b7280;
`;

const CodeBlock = styled.pre`
  margin: 0;
  padding: ${Padding.m};
  border-radius: 8px;
  background: #f3f4f6;
  overflow-x: auto;
  white-space: pre-wrap;
`;

const DemoSurface = styled.div`
  padding: ${Padding.m};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
`;

const ExampleGrid = styled.div`
  display: grid;
  gap: ${Margin.m};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const PropTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: ${Padding.s};
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: ${Padding.s};
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;

  &:last-child {
    border-bottom: 0;
  }
`;

const DemoBox = styled.div`
  min-height: 44px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${Padding.s};
  border-radius: 6px;
  background: #dbeafe;
  color: #1e3a8a;
  font-size: 14px;
  font-weight: 600;
`;

const GridCellBox = styled(DemoBox)`
  min-width: max-content;
  min-height: 56px;
  background: #dcfce7;
  color: #166534;
`;

const LeftRightBox = styled.div`
  padding: ${Padding.s};
  border-radius: 6px;
  background: #ede9fe;
  color: #5b21b6;
`;

const flexCode = `import { Flex } from "./index";

<Flex column align="center" gap={Gap.m}>
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</Flex>`;

const alignmentCode = `import { Flex } from "./index";

<Flex justify="space-between" align="center" gap={Gap.s}>
  <div>Label</div>
  <div>Value</div>
</Flex>`;

const gridCode = `import { Grid, Cell } from "./index";

<Grid columns={12} columnGutter={24} rowGutter={24}>
  <Cell colSpan={6}>Main content</Cell>
  <Cell colSpan={6}>Sidebar</Cell>
  <Cell colSpan={4} rowSpan={2}>Summary</Cell>
  <Cell colSpan={8}>Body</Cell>
</Grid>`;

const generatedGridCode = `import { gridLayoutGenerator } from "./index";

const { Grid, Cell } = gridLayoutGenerator({
  columns: 8,
  columnGutter: 16,
  rowGutter: 16,
});`;

const leftRightCode = `import { leftRightLayoutGenerator } from "./index";

const { Layout } = leftRightLayoutGenerator({
  columns: 12,
  columnGutter: 24,
  rowGutter: 0,
});

<Layout>
  <Layout.Left>
    <Layout.HeadingText>Heading</Layout.HeadingText>
    <Layout.HelpText>Supporting copy</Layout.HelpText>
  </Layout.Left>
  <Layout.Right>
    <div>Right column content</div>
  </Layout.Right>
</Layout>`;

function PropsTable({
  rows,
}: {
  rows: Array<{
    name: string;
    type: string;
    description: string;
    defaultValue?: string;
  }>;
}) {
  return (
    <PropTable>
      <thead>
        <tr>
          <Th>Prop</Th>
          <Th>Type</Th>
          <Th>Description</Th>
          <Th>Default</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <Td>
              <Label>{row.name}</Label>
            </Td>
            <Td>
              <Caption>{row.type}</Caption>
            </Td>
            <Td>
              <Body>{row.description}</Body>
            </Td>
            <Td>
              <Caption>{row.defaultValue ?? "-"}</Caption>
            </Td>
          </tr>
        ))}
      </tbody>
    </PropTable>
  );
}

const meta = {
  title: "Foundations/Layout",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
Layout helpers provide a small set of primitives for building horizontal, vertical, and grid-based arrangements.

This page documents the available layout components and generators, with examples for every supported prop surface.
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
      <Section>
        <Heading3>Flex</Heading3>
        <Description>
          <code>Flex</code> is the base layout primitive for one-dimensional
          alignment. Use it for rows, columns, centered groups, and simple gaps.
        </Description>
        <PropsTable
          rows={[
            {
              name: "column",
              type: "boolean",
              description: "Changes the flex direction from row to column.",
              defaultValue: "false",
            },
            {
              name: "align",
              type: '"flex-start" | "center" | "flex-end"',
              description: "Controls cross-axis alignment with align-items.",
              defaultValue: "undefined",
            },
            {
              name: "justify",
              type: '"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"',
              description:
                "Controls main-axis distribution with justify-content.",
              defaultValue: "undefined",
            },
            {
              name: "gap",
              type: "SPACING",
              description:
                "Applies the CSS gap property using the spacing tokens from the design system.",
              defaultValue: "undefined",
            },
            {
              name: "component",
              type: "React.ElementType",
              description:
                "Changes the rendered HTML element while preserving the Flex behavior.",
              defaultValue: '"div"',
            },
          ]}
        />
        <ExampleGrid>
          <DemoSurface>
            <Label>Row direction</Label>
            <Flex gap={Gap.s}>
              <DemoBox>One</DemoBox>
              <DemoBox>Two</DemoBox>
              <DemoBox>Three</DemoBox>
            </Flex>
          </DemoSurface>
          <DemoSurface>
            <Label>column + gap</Label>
            <Flex column gap={Gap.s}>
              <DemoBox>One</DemoBox>
              <DemoBox>Two</DemoBox>
              <DemoBox>Three</DemoBox>
            </Flex>
          </DemoSurface>
          <DemoSurface>
            <Label>align</Label>
            <Flex align="center" gap={Gap.s} style={{ minHeight: 72 }}>
              <DemoBox>Centered</DemoBox>
              <DemoBox>Items</DemoBox>
            </Flex>
          </DemoSurface>
          <DemoSurface>
            <Label>justify</Label>
            <Flex justify="space-between" align="center" gap={Gap.s}>
              <DemoBox>Left</DemoBox>
              <DemoBox>Right</DemoBox>
            </Flex>
          </DemoSurface>
        </ExampleGrid>
        <CodeBlock>{flexCode}</CodeBlock>
      </Section>

      <Section>
        <Heading3>Alignment Examples</Heading3>
        <Description>
          The old layout helper variants now map directly to <code>Flex</code>
          props. Use <code>justify</code> and <code>align</code> on the base
          component instead of reaching for separate wrappers.
        </Description>
        <PropsTable
          rows={[
            {
              name: 'justify="space-between"',
              type: "Flex usage",
              description:
                "Replaces the old SpaceBetween helper for distributing items across the row.",
            },
            {
              name: 'justify="space-around"',
              type: "Flex usage",
              description:
                "Replaces the old SpaceAround helper while keeping the same visual intent.",
            },
            {
              name: 'align="center" + justify="space-around"',
              type: "Flex usage",
              description:
                "Replaces the old Center helper when you want centered cross-axis alignment plus distributed items.",
            },
          ]}
        />
        <ExampleGrid>
          <DemoSurface>
            <Label>space-between</Label>
            <Flex justify="space-between" align="center">
              <DemoBox>Left</DemoBox>
              <DemoBox>Right</DemoBox>
            </Flex>
          </DemoSurface>
          <DemoSurface>
            <Label>space-around</Label>
            <Flex justify="space-around">
              <DemoBox>A</DemoBox>
              <DemoBox>B</DemoBox>
              <DemoBox>C</DemoBox>
            </Flex>
          </DemoSurface>
          <DemoSurface>
            <Label>aligned + distributed</Label>
            <Flex align="center" justify="space-around">
              <DemoBox>Centered</DemoBox>
              <DemoBox>Layout</DemoBox>
            </Flex>
          </DemoSurface>
        </ExampleGrid>
        <CodeBlock>{alignmentCode}</CodeBlock>
      </Section>

      <Section>
        <Heading3>Grid And Cell</Heading3>
        <Description>
          <code>Grid</code> creates a CSS grid with configurable columns, rows,
          and gutters. <code>Cell</code> controls span and start positions.
        </Description>
        <PropsTable
          rows={[
            {
              name: "columns",
              type: "number",
              description:
                "Number of generated grid columns. Values are clamped to at least 1.",
              defaultValue: "12",
            },
            {
              name: "rows",
              type: "number",
              description:
                "Optional number of generated grid rows. If omitted, rows size automatically.",
              defaultValue: "undefined",
            },
            {
              name: "columnGutter",
              type: "number",
              description: "Horizontal gap between columns in pixels.",
              defaultValue: "24",
            },
            {
              name: "rowGutter",
              type: "number",
              description: "Vertical gap between rows in pixels.",
              defaultValue: "24",
            },
            {
              name: "colSpan",
              type: "number",
              description: "Makes a cell span multiple columns.",
              defaultValue: "undefined",
            },
            {
              name: "rowSpan",
              type: "number",
              description: "Makes a cell span multiple rows.",
              defaultValue: "undefined",
            },
            {
              name: "colStart",
              type: "number",
              description: "Sets the starting grid column for a cell.",
              defaultValue: "undefined",
            },
            {
              name: "rowStart",
              type: "number",
              description: "Sets the starting grid row for a cell.",
              defaultValue: "undefined",
            },
          ]}
        />
        <DemoSurface>
          <Grid columns={12} columnGutter={16} rowGutter={16}>
            <Cell colSpan={6}>
              <GridCellBox>colSpan 6</GridCellBox>
            </Cell>
            <Cell colSpan={6}>
              <GridCellBox>colSpan 6</GridCellBox>
            </Cell>
            <Cell colSpan={4} rowSpan={2}>
              <GridCellBox>rowSpan 2</GridCellBox>
            </Cell>
            <Cell colSpan={8}>
              <GridCellBox>colSpan 8</GridCellBox>
            </Cell>
            <Cell colSpan={4} colStart={9}>
              <GridCellBox>colStart 9</GridCellBox>
            </Cell>
          </Grid>
        </DemoSurface>
        <CodeBlock>{gridCode}</CodeBlock>
      </Section>

      <Section>
        <Heading3>Grid Generator</Heading3>
        <Description>
          <code>gridLayoutGenerator</code> creates a preconfigured grid API so
          you can reuse default column and gutter values across views.
        </Description>
        <CodeBlock>{generatedGridCode}</CodeBlock>
      </Section>

      <Section>
        <Heading3>Left Right Layout</Heading3>
        <Description>
          <code>leftRightLayoutGenerator</code> returns a composed two-column
          layout with named slots for left and right content.
        </Description>
        <PropsTable
          rows={[
            {
              name: "columns",
              type: "number",
              description:
                "Total number of layout columns in the generated grid.",
              defaultValue: "12",
            },
            {
              name: "columnGutter",
              type: "number",
              description:
                "Horizontal spacing between the left and right areas.",
              defaultValue: "24",
            },
            {
              name: "rowGutter",
              type: "number",
              description: "Vertical spacing between rows in the layout.",
              defaultValue: "0",
            },
          ]}
        />
        <DemoSurface>
          <Layout>
            <Layout.Left>
              <LeftRightBox>
                <Layout.HeadingText>Left slot</Layout.HeadingText>
                <Layout.HelpText>
                  Use for headings and support text.
                </Layout.HelpText>
              </LeftRightBox>
            </Layout.Left>
            <Layout.Right>
              <LeftRightBox>
                <Layout.BodyText>
                  Right slot content can hold form controls, cards, or detail
                  views.
                </Layout.BodyText>
              </LeftRightBox>
            </Layout.Right>
          </Layout>
        </DemoSurface>
        <CodeBlock>{leftRightCode}</CodeBlock>
      </Section>
    </Page>
  ),
};
