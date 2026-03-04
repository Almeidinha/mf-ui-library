import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "components/badge";
import { Card } from "components/card";
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "components/table";
import { Label } from "components/typography/typography";
import styled from "styled-components";

const ScaleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ScaleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Multiplier = styled.span`
  color: #9ca3af;
`;

const Bar = styled.div<{ width: number }>`
  height: 20px;
  width: ${({ width }) => width}px;
  background: #3b82f6;
  border-radius: 2px;
`;

const Description = styled.p`
  margin: 0 0 32px;
  color: #6b7280;
  max-width: 720px;
`;

const BASE = 8;

const spacingScale = [
  2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 768,
];

const meta = {
  title: "Foundations/Spacing",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
## How to use

\`\`\`ts
import SPACING from './spacing'

//get the token value
SPACING.['YOUR-VALUE-HERE']
\`\`\`

## When to use

You can set this values from this props:

- width
- heigth
- margin
- padding

        `,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <h1>Spacing System</h1>

      <Card heading="8 pixel base unit">
        <Description>
          All spacing for components and typography is built around a base unit
          of 8 pixels. This base unit determines the spacing scale and ensures
          visual consistency across products.
        </Description>
        <ScaleList>
          {spacingScale.map((value) => (
            <ScaleRow key={value}>
              <Label style={{ minWidth: "100px" }}>
                {value}px <Multiplier>(8 × {value / BASE})</Multiplier>
              </Label>
              <Bar width={value} />
            </ScaleRow>
          ))}
        </ScaleList>
      </Card>

      <h2>List of Values</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size2</Badge>
            </TableBodyCell>
            <TableBodyCell>2px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size4</Badge>
            </TableBodyCell>
            <TableBodyCell>4px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size8</Badge>
            </TableBodyCell>
            <TableBodyCell>8px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size12</Badge>
            </TableBodyCell>
            <TableBodyCell>12px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size16</Badge>
            </TableBodyCell>
            <TableBodyCell>16px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size24</Badge>
            </TableBodyCell>
            <TableBodyCell>24px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size32</Badge>
            </TableBodyCell>
            <TableBodyCell>32px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size64</Badge>
            </TableBodyCell>
            <TableBodyCell>64px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size96</Badge>
            </TableBodyCell>
            <TableBodyCell>96px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size128</Badge>
            </TableBodyCell>
            <TableBodyCell>128px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size192</Badge>
            </TableBodyCell>
            <TableBodyCell>192px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size256</Badge>
            </TableBodyCell>
            <TableBodyCell>256px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size384</Badge>
            </TableBodyCell>
            <TableBodyCell>384px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size512</Badge>
            </TableBodyCell>
            <TableBodyCell>512px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size640</Badge>
            </TableBodyCell>
            <TableBodyCell>640px</TableBodyCell>
          </TableRow>
          <TableRow>
            <TableBodyCell>
              <Badge neutral>Size768</Badge>
            </TableBodyCell>
            <TableBodyCell>768px</TableBodyCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
