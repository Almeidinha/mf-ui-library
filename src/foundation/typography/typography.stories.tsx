import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card/card";
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "components/table";
import {
  Body,
  BodyLarge,
  Caption,
  Display,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Label,
  Link,
} from "components/typography/typography";

const meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    viewMode: "docs",
    previewTabs: {
      canvas: { hidden: true },
    },
    docs: {
      description: {
        component: `
## Typography System
The Typography System is a collection of ready-made text styles that keep our products looking consistent.
Each style is created for a specific purpose, like headings, body text, captions, and more.
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
      <h1>Typography System</h1>

      <Card heading="Desktop Typography">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Typography System</TableHeaderCell>
              <TableHeaderCell>Weight</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Line Height</TableHeaderCell>
              <TableHeaderCell>Spacing</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableBodyCell>
                <Display>Display 1</Display>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>36px (2.25 rem)</TableBodyCell>
              <TableBodyCell>44px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Heading1>Heading 1</Heading1>
              </TableBodyCell>
              <TableBodyCell> SemiBold 600</TableBodyCell>
              <TableBodyCell>28px (1.75 rem)</TableBodyCell>
              <TableBodyCell>32px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Heading2>Heading 2</Heading2>
              </TableBodyCell>
              <TableBodyCell> SemiBold 600</TableBodyCell>
              <TableBodyCell>20px (1.25 rem)</TableBodyCell>
              <TableBodyCell>28px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Heading3>Heading 3</Heading3>
              </TableBodyCell>
              <TableBodyCell> SemiBold 600</TableBodyCell>
              <TableBodyCell>16px (1 rem)</TableBodyCell>
              <TableBodyCell>24px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Heading4>Heading 4</Heading4>
              </TableBodyCell>
              <TableBodyCell> SemiBold 600</TableBodyCell>
              <TableBodyCell>14px (0.875 rem)</TableBodyCell>
              <TableBodyCell>20px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <BodyLarge strong>Body Large/Strong</BodyLarge>
              </TableBodyCell>
              <TableBodyCell> SemiBold 600</TableBodyCell>
              <TableBodyCell>18px (1.125 rem)</TableBodyCell>
              <TableBodyCell>28px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <BodyLarge>Body Large/Default</BodyLarge>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>18px (1.125 rem)</TableBodyCell>
              <TableBodyCell>28px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Body strong>Body/Strong</Body>
              </TableBodyCell>
              <TableBodyCell> Medium 500</TableBodyCell>
              <TableBodyCell>14px (0.875 rem)</TableBodyCell>
              <TableBodyCell>20px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Body>Body/Default</Body>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>14px (0.875 rem)</TableBodyCell>
              <TableBodyCell>20px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Link>Body/Link</Link>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>14px (0.875 rem)</TableBodyCell>
              <TableBodyCell>16px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Caption>Caption</Caption>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>13px (0.8125 rem)</TableBodyCell>
              <TableBodyCell>16px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Label strong>Label/Strong</Label>
              </TableBodyCell>
              <TableBodyCell> Medium 500</TableBodyCell>
              <TableBodyCell>14px (0.875 rem)</TableBodyCell>
              <TableBodyCell>20px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Label>Label/Default</Label>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>14px (0.875 rem)</TableBodyCell>
              <TableBodyCell>20px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
            <TableRow>
              <TableBodyCell>
                <Label subdued>Label/Subdued</Label>
              </TableBodyCell>
              <TableBodyCell> Regular 400</TableBodyCell>
              <TableBodyCell>13px (0.8125 rem)</TableBodyCell>
              <TableBodyCell>16px</TableBodyCell>
              <TableBodyCell>0px</TableBodyCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  ),
};
