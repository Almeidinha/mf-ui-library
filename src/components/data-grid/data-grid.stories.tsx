import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Meta, StoryObj } from "@storybook/react";
import { IconMinor } from "components/icon";
import { Box, Flex } from "components/layout";
import { Label } from "components/typography";
import { Gap } from "foundation/spacing";

import { DataGrid } from "./data-grid";
import type { DataGridColumn, DataGridGroupValue } from "./types";

type PersonRow = {
  id: number;
  firstName: string | null;
  lastName: string;
  age: number | null;
  role?: "user" | "admin" | "owner";
  isActive?: boolean;
  city?: string;
  state?: string;
  country?: string;
  company?: string;
  birth?: string;
};

type SpanStoryRow = {
  id: number;
  region: string;
  team: string;
  metric: string;
  note: string;
};

type RowSpanStoryRow = {
  id: number;
  portfolio: string;
  squad: string;
  owner: string;
  stage: string;
  revenue: string;
};

type ColumnSpanStoryRow = {
  id: number;
  quarter: string;
  lineItem: string;
  value: string;
  change: string;
  note: string;
};

type ResponsiveSizingStoryRow = {
  id: number;
  code: string;
  summary: string;
  owner: string;
  notes: string;
};

type OverflowStoryRow = {
  id: number;
  ellipsis: string;
  wrap: string;
  visible: string;
};

function getForwardRunLength<T>(
  rows: T[],
  rowIndex: number,
  matches: (currentRow: T, nextRow: T) => boolean,
) {
  const currentRow = rows[rowIndex];

  if (!currentRow) {
    return 1;
  }

  return rows.slice(rowIndex + 1).reduce((span, nextRow) => {
    if (!matches(currentRow, nextRow)) {
      return span;
    }

    return span + 1;
  }, 1);
}

const Data = ["rows", "columns", "rowKey", "storageKey"];
const Layout = [
  "cellSelection",
  "layoutMode",
  "tableWidth",
  "minTableWidth",
  "maxTableHeight",
  "striped",
  "showCellBorders",
  "showActionColumns",
];
const Pagination = ["paginated", "defaultPageSize", "pageSizeOptions"];
const Search = ["searchable", "searchPlaceholder", "searchDebounce"];
const EmptyState = ["emptyMessage"];
const Selection = ["checkboxSelection", "selectedRows", "onSelectedRowsChange"];
const Sorting = ["sortField", "sortDirection", "onSortChange"];
const ColumnVisibility = [
  "manageColumns",
  "columnVisibility",
  "defaultColumnVisibility",
  "onColumnVisibilityChange",
];
const ColumnManager = ["manageColumns", "mode", "showBackdrop"];
const Pinning = [
  "pinnedColumns",
  "defaultPinnedColumns",
  "onPinnedColumnsChange",
];
const ColumnOrder = [
  "columnOrder",
  "defaultColumnOrder",
  "onColumnOrderChange",
];
const Grouping = ["columnGroups", "rowGrouping"];

const getPersonRows = (): PersonRow[] => {
  return Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 80 }),
    role: faker.helpers.arrayElement(["user", "admin", "owner"]),
    isActive: faker.datatype.boolean(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    company: faker.company.name(),
    birth: faker.date.birthdate().toISOString().split("T")[0],
  }));
};

const personRows = getPersonRows();

const columnGroupingColumnOrder = [
  "firstName",
  "lastName",
  "fullName",
  "id",
  "role",
  "birth",
  "age",
  "city",
  "state",
  "country",
  "company",
];

const columnAndRowGroupingColumnOrder = [
  "firstName",
  "lastName",
  "fullName",
  "id",
  "role",
  "city",
  "state",
  "country",
  "age",
  "company",
  "birth",
];

const columns: DataGridColumn<PersonRow>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    sortable: true,
  },
  {
    field: "firstName",
    headerName: "First name",
    sortable: true,
    fitContent: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    sortable: true,
    fitContent: true,
  },
  {
    field: "age",
    headerName: "Age",
    width: 70,
    sortable: true,
    align: "right",
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    fitContent: true,
    valueGetter: (_, row) =>
      `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
  },
  {
    field: "role",
    headerName: "Role",
    sortable: true,
    fitContent: true,
  },
  {
    field: "city",
    headerName: "City",
    sortable: true,
    fitContent: true,
  },
  {
    field: "state",
    headerName: "State",
    sortable: true,
    fitContent: true,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: true,
    fitContent: true,
  },
  {
    field: "company",
    headerName: "Company",
    sortable: true,
    fitContent: true,
  },
  {
    field: "birth",
    headerName: "Birth",
    sortable: true,
    width: 100,
  },
  {
    field: "actions",
    type: "actions",
    width: 50,
    align: "center",
    getActions: (row: PersonRow) => [
      {
        key: "edit",
        label: "Edit",
        icon: IconMinor.Pen,
        onClick: () => console.log("Edit action clicked"),
      },
      {
        key: "delete",
        label: "Delete",
        icon: IconMinor.TrashCan,
        destructive: true,
        disabled: row.role === "owner",
        onClick: () => console.log("Delete action clicked"),
      },
      {
        key: "impersonate",
        label: "Impersonate",
        hidden: (r: PersonRow) => !r.isActive,
        onClick: () => console.log("Impersonate action clicked"),
      },
    ],
  },
];

const spanStoryRows: SpanStoryRow[] = [
  {
    id: 1,
    region: "North America",
    team: "Core",
    metric: "Revenue",
    note: "$120k",
  },
  {
    id: 2,
    region: "North America",
    team: "Core",
    metric: "Summary: Core",
    note: "2 active deals",
  },
  {
    id: 3,
    region: "Europe",
    team: "Platform",
    metric: "Revenue",
    note: "$95k",
  },
  {
    id: 4,
    region: "Europe",
    team: "Platform",
    metric: "Summary: Platform",
    note: "1 expansion in review",
  },
];

const spanColumns: DataGridColumn<SpanStoryRow>[] = [
  {
    field: "team",
    headerName: "Team",
    fitContent: true,
    rowSpan: ({ row, rowIndex, rows }) => {
      const nextRow = rows[rowIndex + 1];

      return nextRow && nextRow.team === row.team ? 2 : undefined;
    },
  },
  {
    field: "metric",
    headerName: "Metric",
    colSpan: ({ row }) => (row.metric.startsWith("Summary") ? 2 : undefined),
    renderCell: (row, value) =>
      row.metric.startsWith("Summary") ? <Label strong>{value}</Label> : value,
  },
  {
    field: "note",
    headerName: "Note",
  },
];

const rowSpanStoryRows: RowSpanStoryRow[] = [
  {
    id: 1,
    portfolio: "Platform",
    squad: "Identity",
    owner: "Marina",
    stage: "Discovery",
    revenue: "$140k",
  },
  {
    id: 2,
    portfolio: "Platform",
    squad: "Identity",
    owner: "Marina",
    stage: "Implementation",
    revenue: "$190k",
  },
  {
    id: 3,
    portfolio: "Platform",
    squad: "Billing",
    owner: "Joao",
    stage: "Rollout",
    revenue: "$95k",
  },
  {
    id: 4,
    portfolio: "Growth",
    squad: "Checkout",
    owner: "Nina",
    stage: "Discovery",
    revenue: "$220k",
  },
  {
    id: 5,
    portfolio: "Growth",
    squad: "Checkout",
    owner: "Nina",
    stage: "Experiment",
    revenue: "$245k",
  },
  {
    id: 6,
    portfolio: "Growth",
    squad: "Activation",
    owner: "Leo",
    stage: "Rollout",
    revenue: "$130k",
  },
];

const rowSpanColumns: DataGridColumn<RowSpanStoryRow>[] = [
  {
    field: "portfolio",
    headerName: "Portfolio",
    fitContent: true,
    rowSpan: ({ row, rowIndex, rows }) => {
      const previousRow = rows[rowIndex - 1];

      if (previousRow?.portfolio === row.portfolio) {
        return 1;
      }

      return getForwardRunLength(
        rows,
        rowIndex,
        (currentRow, nextRow) => currentRow.portfolio === nextRow.portfolio,
      );
    },
  },
  {
    field: "squad",
    headerName: "Squad",
    fitContent: true,
    rowSpan: ({ row, rowIndex, rows }) => {
      const previousRow = rows[rowIndex - 1];

      if (previousRow?.squad === row.squad) {
        return 1;
      }

      return getForwardRunLength(
        rows,
        rowIndex,
        (currentRow, nextRow) => currentRow.squad === nextRow.squad,
      );
    },
  },
  {
    field: "owner",
    headerName: "Owner",
    fitContent: true,
  },
  {
    field: "stage",
    headerName: "Stage",
  },
  {
    field: "revenue",
    headerName: "Revenue",
    align: "right",
    fitContent: true,
  },
];

const columnSpanStoryRows: ColumnSpanStoryRow[] = [
  {
    id: 1,
    quarter: "Q1",
    lineItem: "New revenue",
    value: "$340k",
    change: "+12%",
    note: "Strong enterprise close rate",
  },
  {
    id: 2,
    quarter: "Q1",
    lineItem: "Summary: Q1 momentum",
    value: "Focused expansion in core accounts",
    change: "",
    note: "",
  },
  {
    id: 3,
    quarter: "Q2",
    lineItem: "New revenue",
    value: "$410k",
    change: "+18%",
    note: "Mid-market pipeline expanded",
  },
  {
    id: 4,
    quarter: "Q2",
    lineItem: "Summary: Q2 momentum",
    value: "Upsell motion stabilized after launch",
    change: "",
    note: "",
  },
];

const columnSpanColumns: DataGridColumn<ColumnSpanStoryRow>[] = [
  {
    field: "quarter",
    headerName: "Quarter",
    fitContent: true,
  },
  {
    field: "lineItem",
    headerName: "Line item",
    fitContent: true,
    colSpan: ({ row }) => (row.lineItem.startsWith("Summary:") ? 4 : 1),
    renderCell: (row, value) =>
      row.lineItem.startsWith("Summary:") ? (
        <Label strong>{value}</Label>
      ) : (
        value
      ),
  },
  {
    field: "value",
    headerName: "Value",
  },
  {
    field: "change",
    headerName: "Change",
    fitContent: true,
    align: "right",
  },
  {
    field: "note",
    headerName: "Note",
  },
];

const responsiveSizingRows: ResponsiveSizingStoryRow[] = [
  {
    id: 1,
    code: "PLT-142",
    summary: "Identity provider migration",
    owner: "Marina",
    notes: "Widthless summary column should absorb available space.",
  },
  {
    id: 2,
    code: "GRO-088",
    summary: "Experiment rollout for checkout copy",
    owner: "Leo",
    notes: "Explicit widths stay fixed while the notes column can grow.",
  },
  {
    id: 3,
    code: "OPS-231",
    summary: "Support queue automation",
    owner: "Nina",
    notes: "fullWidth uses the provided width as the minimum track size.",
  },
];

const responsiveSizingColumns: DataGridColumn<ResponsiveSizingStoryRow>[] = [
  {
    field: "code",
    headerName: "Code",
    width: 110,
    sortable: true,
  },
  {
    field: "summary",
    headerName: "Summary",
    sortable: true,
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 120,
    sortable: true,
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 260,
    fullWidth: true,
  },
];

const overflowRows: OverflowStoryRow[] = [
  {
    id: 1,
    ellipsis:
      "Default ellipsis keeps dense tabular content compact while still hinting that more text exists.",
    wrap: "Wrap mode allows richer descriptive content to grow the row height instead of clipping.",
    visible:
      "Visible overflow leaves the content un-clipped, which is useful for specialized custom cells.",
  },
];

const overflowColumns: DataGridColumn<OverflowStoryRow>[] = [
  {
    field: "ellipsis",
    headerName: "Ellipsis",
    width: 180,
  },
  {
    field: "wrap",
    headerName: "Wrap",
    width: 180,
    overflow: "wrap",
  },
  {
    field: "visible",
    headerName: "Visible",
    width: 180,
    overflow: "visible",
  },
];

const meta = {
  title: "Components/DataGrid",
  component: DataGrid,
  parameters: {
    layout: "centered",
  },
  args: {
    rows: [],
    columns: [],
    showCellBorders: false,
    cellSelection: false,
    striped: true,
    showActionColumns: true,
    columnGroups: undefined,
    rowGrouping: undefined,
    rowKey: "id",
    layoutMode: "responsive",
    tableWidth: undefined,
    minTableWidth: undefined,
    maxTableHeight: 400,
    paginated: false,
    searchPlaceholder: "Search...",
    emptyMessage: "No rows found...",
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 25],
    searchable: false,
    checkboxSelection: false,
    selectedRows: undefined,
    sortField: undefined,
    sortDirection: undefined,
    columnVisibility: undefined,
    defaultColumnVisibility: {
      city: false,
      state: false,
      country: false,
      company: false,
    },
    manageColumns: false,
    columnOrder: undefined,
    defaultColumnOrder: undefined,
    pinnedColumns: undefined,
    defaultPinnedColumns: { left: ["id", "firstName"], right: [] },
    mode: "portal",
    showBackdrop: false,
  },
  argTypes: {
    sortField: {
      description:
        "Controlled field used for sorting. Pair with `sortDirection` and `onSortChange`.",
      control: { type: "select" },
      options: ["id", "firstName", "lastName", "age", "fullName"],
      table: {
        category: "Sorting",
        defaultValue: { summary: "undefined" },
      },
    },
    rows: {
      description: "Grid row data rendered by the component.",
      control: false,
      table: {
        category: "Data",
        defaultValue: { summary: "[]" },
      },
    },
    storageKey: {
      description:
        "Unique key used to persist user preferences in local storage. When set, column visibility, column order, and pinned columns are saved and loaded automatically.",
      control: "text",
      table: {
        category: "Data",
        defaultValue: { summary: "undefined" },
      },
    },
    columns: {
      description:
        "Column definitions describing headers, sizing, sorting, custom cell rendering, and optional body-cell merging via `rowSpan` and `colSpan`.",
      control: false,
      table: {
        category: "Data",
        defaultValue: { summary: "[]" },
      },
    },
    columnGroups: {
      description:
        "Optional nested header groups. Groups are matched by field and rendered across one or more extra header rows.",
      control: false,
      table: {
        category: "Grouping",
        defaultValue: { summary: "undefined" },
      },
    },
    rowGrouping: {
      description:
        "Optional row grouping configuration. Groups visible rows by one or more fields, can render custom section headers, and can collapse sections.",
      control: false,
      table: {
        category: "Grouping",
        defaultValue: { summary: "undefined" },
      },
    },
    rowKey: {
      description: "Field used as the unique key for each row.",
      table: {
        category: "Data",
        defaultValue: { summary: "id" },
      },
    },
    layoutMode: {
      description:
        "When responsive, the grid stretches to the container width. When fixed, it honors explicit sizing.",
      control: { type: "radio" },
      options: ["responsive", "fixed"],
      table: {
        category: "Layout",
        defaultValue: { summary: "responsive" },
      },
    },
    showCellBorders: {
      description:
        "Shows borders around individual cells for clearer separation.",
      control: "boolean",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    cellSelection: {
      description:
        "Enables selection of individual cells. When true, clicking a cell selects it and highlights the corresponding row and column headers.",
      control: "boolean",
      table: {
        category: "Layout",
        defaultValue: { summary: "false" },
      },
    },
    striped: {
      description:
        "Applies alternating background colors to rows for readability.",
      control: "boolean",
      table: {
        category: "Layout",
        defaultValue: { summary: "true" },
      },
    },
    showActionColumns: {
      description:
        "Renders action columns when present. Disable it to skip action-column processing entirely.",
      control: "boolean",
      table: {
        category: "Layout",
        defaultValue: { summary: "true" },
      },
    },
    tableWidth: {
      control: "text",
      table: { category: "Layout", defaultValue: { summary: "undefined" } },
    },
    minTableWidth: {
      control: "text",
      table: { category: "Layout", defaultValue: { summary: "undefined" } },
    },
    maxTableHeight: {
      control: "text",
      table: {
        category: "Layout",
        defaultValue: { summary: "max-content" },
      },
    },
    paginated: {
      table: { category: "Pagination", defaultValue: { summary: "true" } },
    },
    defaultPageSize: {
      table: { category: "Pagination", defaultValue: { summary: "5" } },
    },
    pageSizeOptions: {
      table: {
        category: "Pagination",
        defaultValue: { summary: "[5, 10, 25]" },
      },
    },
    searchable: {
      table: { category: "Search", defaultValue: { summary: "true" } },
    },
    searchPlaceholder: {
      table: { category: "Search", defaultValue: { summary: "Search..." } },
    },
    searchDebounce: {
      table: { category: "Search", defaultValue: { summary: "250" } },
    },
    emptyMessage: {
      table: {
        category: "Empty state",
        defaultValue: { summary: "No rows found..." },
      },
    },
    checkboxSelection: {
      table: { category: "Selection", defaultValue: { summary: "true" } },
    },
    selectedRows: {
      control: { type: "object" },
      table: { category: "Selection", defaultValue: { summary: "undefined" } },
    },
    onSelectedRowsChange: {
      control: false,
      table: { category: "Selection", defaultValue: { summary: "undefined" } },
    },
    sortDirection: {
      control: { type: "select" },
      options: ["NONE", "ASC", "DESC"],
      table: { category: "Sorting", defaultValue: { summary: "undefined" } },
    },
    onSortChange: {
      control: false,
      table: { category: "Sorting", defaultValue: { summary: "undefined" } },
    },
    columnVisibility: {
      control: { type: "object" },
      table: {
        category: "Column visibility",
        defaultValue: { summary: "undefined" },
      },
    },
    defaultColumnVisibility: {
      control: { type: "object" },
      table: {
        category: "Column visibility",
        defaultValue: { summary: "undefined" },
      },
    },
    onColumnVisibilityChange: {
      control: false,
      table: {
        category: "Column visibility",
        defaultValue: { summary: "undefined" },
      },
    },
    manageColumns: {
      control: "boolean",
      table: {
        category: "Column manager",
        defaultValue: { summary: "false" },
      },
    },
    columnOrder: {
      control: { type: "object" },
      table: {
        category: "Column order",
        defaultValue: { summary: "undefined" },
      },
    },
    defaultColumnOrder: {
      control: { type: "object" },
      table: {
        category: "Column order",
        defaultValue: { summary: "undefined" },
      },
    },
    onColumnOrderChange: {
      control: false,
      table: {
        category: "Column order",
        defaultValue: { summary: "undefined" },
      },
    },
    pinnedColumns: {
      control: { type: "object" },
      table: { category: "Pinning", defaultValue: { summary: "undefined" } },
    },
    defaultPinnedColumns: {
      control: { type: "object" },
      table: { category: "Pinning", defaultValue: { summary: "undefined" } },
    },
    onPinnedColumnsChange: {
      control: false,
      table: { category: "Pinning", defaultValue: { summary: "undefined" } },
    },
    showBackdrop: {
      control: "boolean",
      table: {
        category: "Column manager",
        defaultValue: { summary: "false" },
      },
    },
    mode: {
      control: { type: "radio" },
      options: ["portal", "inline"],
      table: {
        category: "Column manager",
        defaultValue: { summary: "portal" },
      },
    },
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    mode: "inline",
    showBackdrop: true,
    maxTableHeight: "500px",
    defaultPinnedColumns: undefined,
    showActionColumns: false,
  },
  render: (args) => {
    return (
      <Box>
        <DataGrid
          {...args}
          key={args.layoutMode === "responsive" ? "responsive" : "fixed"}
          rows={personRows}
          columns={columns}
          rowKey="id"
        />
      </Box>
    );
  },
};

export const FixedWidth: Story = {
  args: {
    mode: "inline",
    layoutMode: "fixed",
    tableWidth: "800px",
    minTableWidth: "800px",
    showBackdrop: true,
    defaultColumnVisibility: undefined,
    defaultPinnedColumns: undefined,
    maxTableHeight: "500px",
  },
  parameters: {
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...ColumnManager,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid
          key={args.layoutMode === "responsive" ? "responsive" : "fixed"}
          {...args}
          rows={personRows}
          columns={columns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const ResponsiveColumnSizing: Story = {
  args: {
    layoutMode: "responsive",
    showCellBorders: true,
    striped: false,
    tableWidth: undefined,
    minTableWidth: "720px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "In responsive mode, columns with `width` stay fixed. Columns without `width` expand to fill remaining space. Columns with `fullWidth: true` also expand, using their declared width as the minimum size.",
      },
    },
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...ColumnManager,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex style={{ width: "100%", minWidth: 0, maxWidth: "960px" }}>
        <DataGrid
          {...args}
          rows={responsiveSizingRows}
          columns={responsiveSizingColumns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const OverflowModes: Story = {
  args: {
    layoutMode: "responsive",
    striped: false,
    showCellBorders: true,
    minTableWidth: "720px",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Columns default to `overflow: "ellipsis"`. Use `overflow: "wrap"` for multi-line content or `overflow: "visible"` for custom cells that should not clip.',
      },
    },
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...ColumnManager,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex style={{ width: "100%", minWidth: 0, maxWidth: "920px" }}>
        <DataGrid
          {...args}
          rows={overflowRows}
          columns={overflowColumns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const RowSpanComplex: Story = {
  args: {
    rowGrouping: {
      field: "portfolio",
    },
    striped: false,
    showCellBorders: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows stacked body-cell merging with multiple row-span columns. The portfolio and squad cells merge downward, while the row grouping boundary prevents spans from crossing into the next portfolio section.",
      },
    },
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...ColumnManager,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid
          {...args}
          rows={rowSpanStoryRows}
          columns={rowSpanColumns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const ColumnSpanComplex: Story = {
  args: {
    rowGrouping: {
      field: "quarter",
    },
    striped: false,
    showCellBorders: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows summary rows that merge horizontally across adjacent body cells. The line-item column expands across the remaining detail columns inside each quarter section.",
      },
    },
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...ColumnManager,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid
          {...args}
          rows={columnSpanStoryRows}
          columns={columnSpanColumns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const CellSpans: Story = {
  args: {
    rowGrouping: {
      field: "region",
    },
    striped: false,
    showCellBorders: true,
  },
  parameters: {
    controls: {
      exclude: [
        ...Layout,
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...ColumnManager,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid
          {...args}
          rows={spanStoryRows}
          columns={spanColumns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const ColumnGrouping: Story = {
  args: {
    checkboxSelection: true,
    striped: false,
    showCellBorders: true,
    showActionColumns: false,
    defaultPinnedColumns: undefined,
    defaultColumnOrder: columnGroupingColumnOrder,
    defaultColumnVisibility: {
      age: false,
      city: false,
      state: false,
      country: false,
    },
    columnGroups: [
      {
        key: "identity",
        headerName: "Identity",
        children: [
          {
            key: "person",
            headerName: "Person",
            fields: ["firstName", "lastName", "fullName"],
          },
          {
            key: "account",
            headerName: "Account",
            fields: ["id", "role"],
          },
        ],
      },
      {
        key: "details",
        headerName: "Details",
        children: [
          {
            key: "location",
            headerName: "Location",
            fields: ["city", "state", "country"],
          },
          {
            key: "work",
            headerName: "Work",
            fields: ["company", "birth"],
          },
        ],
      },
    ],
  },
  parameters: {
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...ColumnManager,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid {...args} rows={personRows} columns={columns} rowKey="id" />
      </Flex>
    );
  },
};

export const RowGrouping: Story = {
  args: {
    striped: false,
    showCellBorders: true,
    defaultPinnedColumns: undefined,
    rowGrouping: {
      fields: ["country", "state"],
      collapsible: true,
      renderGroupHeader: (
        value: DataGridGroupValue,
        rows: Record<string, unknown>[],
        collapsed: boolean,
        depth: number,
        path: DataGridGroupValue[],
      ) => (
        <Flex justify="space-between" align="center" gap={Gap.m}>
          <Label strong>{`${"  ".repeat(depth)}${value ?? "Ungrouped"}`}</Label>
          <Label muted>
            {collapsed
              ? "Collapsed"
              : `${rows.length} rows in ${path.join(" / ")}`}
          </Label>
        </Flex>
      ),
    },
  },
  parameters: {
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...ColumnManager,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid {...args} rows={personRows} columns={columns} rowKey="id" />
      </Flex>
    );
  },
};

export const ColumnAndRowGrouping: Story = {
  args: {
    striped: false,
    showCellBorders: true,
    showActionColumns: false,
    defaultColumnOrder: columnAndRowGroupingColumnOrder,
    defaultColumnVisibility: {
      age: false,
      company: false,
      birth: false,
    },
    defaultPinnedColumns: undefined,
    columnGroups: [
      {
        key: "identity",
        headerName: "Identity",
        children: [
          {
            key: "person",
            headerName: "Person",
            fields: ["firstName", "lastName", "fullName"],
          },
          {
            key: "account",
            headerName: "Account",
            fields: ["id", "role"],
          },
        ],
      },
      {
        key: "location",
        headerName: "Location",
        fields: ["city", "state", "country"],
      },
    ],
    rowGrouping: {
      fields: ["country", "state", "city"],
      collapsible: true,
      defaultCollapsed: true,
      renderGroupHeader: (
        value: DataGridGroupValue,
        rows: Record<string, unknown>[],
        collapsed: boolean,
        depth: number,
      ) => (
        <Flex justify="space-between" align="center">
          <Label strong>{`${"  ".repeat(depth)}${value ?? "Ungrouped"}`}</Label>
          <Label muted>
            {collapsed ? "Click to expand" : `${rows.length} people`}
          </Label>
        </Flex>
      ),
    },
  },
  parameters: {
    controls: {
      exclude: [
        ...Data,
        ...Pagination,
        ...Search,
        ...EmptyState,
        ...Selection,
        ...Sorting,
        ...ColumnVisibility,
        ...Pinning,
        ...ColumnOrder,
        ...Pinning,
        ...ColumnManager,
        ...Grouping,
      ],
    },
  },
  render: (args) => {
    return (
      <Flex>
        <DataGrid {...args} rows={personRows} columns={columns} rowKey="id" />
      </Flex>
    );
  },
};
