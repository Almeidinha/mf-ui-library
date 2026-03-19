import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components/card/card";
import { DataTable, type DataTableColumn } from "components/data-table";
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

type TypographyRow = {
  id: string;
  preview: string;
  weight: string;
  size: string;
  lineHeight: string;
  spacing: string;
};

const rows: TypographyRow[] = [
  {
    id: "display-1",
    preview: "Display 1",
    weight: "Regular 400",
    size: "36px (2.25 rem)",
    lineHeight: "44px",
    spacing: "0px",
  },
  {
    id: "heading-1",
    preview: "Heading 1",
    weight: "SemiBold 600",
    size: "28px (1.75 rem)",
    lineHeight: "32px",
    spacing: "0px",
  },
  {
    id: "heading-2",
    preview: "Heading 2",
    weight: "SemiBold 600",
    size: "20px (1.25 rem)",
    lineHeight: "28px",
    spacing: "0px",
  },
  {
    id: "heading-3",
    preview: "Heading 3",
    weight: "SemiBold 600",
    size: "16px (1 rem)",
    lineHeight: "24px",
    spacing: "0px",
  },
  {
    id: "heading-4",
    preview: "Heading 4",
    weight: "SemiBold 600",
    size: "14px (0.875 rem)",
    lineHeight: "20px",
    spacing: "0px",
  },
  {
    id: "body-large-strong",
    preview: "Body Large/Strong",
    weight: "SemiBold 600",
    size: "18px (1.125 rem)",
    lineHeight: "28px",
    spacing: "0px",
  },
  {
    id: "body-large-default",
    preview: "Body Large/Default",
    weight: "Regular 400",
    size: "18px (1.125 rem)",
    lineHeight: "28px",
    spacing: "0px",
  },
  {
    id: "body-strong",
    preview: "Body/Strong",
    weight: "Medium 500",
    size: "14px (0.875 rem)",
    lineHeight: "20px",
    spacing: "0px",
  },
  {
    id: "body-default",
    preview: "Body/Default",
    weight: "Regular 400",
    size: "14px (0.875 rem)",
    lineHeight: "20px",
    spacing: "0px",
  },
  {
    id: "body-link",
    preview: "Body/Link",
    weight: "Regular 400",
    size: "14px (0.875 rem)",
    lineHeight: "16px",
    spacing: "0px",
  },
  {
    id: "caption",
    preview: "Caption",
    weight: "Regular 400",
    size: "13px (0.8125 rem)",
    lineHeight: "16px",
    spacing: "0px",
  },
  {
    id: "label-strong",
    preview: "Label/Strong",
    weight: "Medium 500",
    size: "14px (0.875 rem)",
    lineHeight: "20px",
    spacing: "0px",
  },
  {
    id: "label-default",
    preview: "Label/Default",
    weight: "Regular 400",
    size: "14px (0.875 rem)",
    lineHeight: "20px",
    spacing: "0px",
  },
  {
    id: "label-muted",
    preview: "Label/Muted",
    weight: "Regular 400",
    size: "13px (0.8125 rem)",
    lineHeight: "16px",
    spacing: "0px",
  },
];

function renderTypographyPreview(row: TypographyRow) {
  switch (row.id) {
    case "display-1":
      return <Display>{row.preview}</Display>;
    case "heading-1":
      return <Heading1>{row.preview}</Heading1>;
    case "heading-2":
      return <Heading2>{row.preview}</Heading2>;
    case "heading-3":
      return <Heading3>{row.preview}</Heading3>;
    case "heading-4":
      return <Heading4>{row.preview}</Heading4>;
    case "body-large-strong":
      return <BodyLarge strong>{row.preview}</BodyLarge>;
    case "body-large-default":
      return <BodyLarge>{row.preview}</BodyLarge>;
    case "body-strong":
      return <Body strong>{row.preview}</Body>;
    case "body-default":
      return <Body>{row.preview}</Body>;
    case "body-link":
      return <Link>{row.preview}</Link>;
    case "caption":
      return <Caption>{row.preview}</Caption>;
    case "label-strong":
      return <Label strong>{row.preview}</Label>;
    case "label-default":
      return <Label>{row.preview}</Label>;
    case "label-muted":
      return <Label muted>{row.preview}</Label>;
    default:
      return row.preview;
  }
}

const columns: DataTableColumn<TypographyRow>[] = [
  {
    field: "preview",
    headerName: "Typography System",
    renderCell: (row) => renderTypographyPreview(row),
  },
  {
    field: "weight",
    headerName: "Weight",
    fitContent: true,
  },
  {
    field: "size",
    headerName: "Size",
    fitContent: true,
  },
  {
    field: "lineHeight",
    headerName: "Line Height",
    fitContent: true,
  },
  {
    field: "spacing",
    headerName: "Spacing",
    fitContent: true,
  },
];

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
        <DataTable
          rows={rows}
          columns={columns}
          rowKey="id"
          paginated={false}
        />
      </Card>
    </div>
  ),
};
