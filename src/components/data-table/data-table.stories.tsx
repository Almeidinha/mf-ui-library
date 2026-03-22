import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Meta, StoryObj } from "@storybook/react";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";
import { Label } from "components/typography";

import { DataTable } from "./data-table";
import type { DataTableColumn, DataTableGroupValue } from "./types";

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

const getPersonRows = (): PersonRow[] => {
  return Array.from({ length: 500 }, (_, i) => ({
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

const columns: DataTableColumn<PersonRow>[] = [
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

const spanColumns: DataTableColumn<SpanStoryRow>[] = [
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

const rowSpanColumns: DataTableColumn<RowSpanStoryRow>[] = [
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

const columnSpanColumns: DataTableColumn<ColumnSpanStoryRow>[] = [
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

const meta = {
  title: "Components/DataTable",
  component: DataTable,

  args: {
    rows: [],
    columns: [],
    columnGroups: undefined,
    rowGrouping: undefined,
    rowKey: "id",
    layoutMode: "responsive",
    tableWidth: undefined,
    minTableWidth: undefined,
    maxTableHeight: "max-content",
    paginated: true,
    searchPlaceholder: "Search...",
    emptyMessage: "No rows found...",
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 25],
    searchable: true,
    checkboxSelection: true,
    selectedRows: undefined,
    sortField: undefined,
    sortDirection: undefined,
    columnVisibility: undefined,
    defaultColumnVisibility: {
      role: false,
      city: false,
      state: false,
      country: false,
      company: false,
    },
    manageColumns: true,
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
      description: "Table row data rendered by the component.",
      control: false,
      table: {
        category: "Data",
        defaultValue: { summary: "[]" },
      },
    },
    columns: {
      description:
        "Column definitions describing headers, sizing, sorting, custom cell rendering, and optional body-cell merging via `rowSpan` and `colSpan`. Spans are computed only when a visible regular column defines one of those props, and they stop at row-group boundaries.",
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
        "When responsive, the table stretches to the container width and uses automatic layout. When fixed, it honors explicit table sizing.",
      control: { type: "radio" },
      options: ["responsive", "fixed"],
      table: {
        category: "Layout",
        defaultValue: { summary: "responsive" },
      },
    },
    tableWidth: {
      description:
        "Explicit table width used when `responsive` is disabled. Accepts a number in pixels or any valid CSS width string.",
      control: "text",
      table: {
        category: "Layout",
        defaultValue: { summary: "undefined" },
      },
    },
    minTableWidth: {
      description:
        "Minimum table width used when `responsive` is disabled. Useful for forcing horizontal scrolling while preserving column sizing.",
      control: "text",
      table: {
        category: "Layout",
        defaultValue: { summary: "undefined" },
      },
    },
    maxTableHeight: {
      description:
        "Maximum table height before vertical scrolling is applied. Accepts a number in pixels or any valid CSS height string.",
      control: "text",
      table: {
        category: "Layout",
        defaultValue: { summary: "max-content" },
      },
    },
    paginated: {
      description:
        "Shows pagination controls and slices the visible rows by page.",
      table: {
        category: "Pagination",
        defaultValue: { summary: "true" },
      },
    },
    defaultPageSize: {
      description: "Initial number of rows shown per page.",
      table: {
        category: "Pagination",
        defaultValue: { summary: "5" },
      },
    },
    pageSizeOptions: {
      description: "Available page size values shown in the paginator.",
      table: {
        category: "Pagination",
        defaultValue: { summary: "[5, 10, 25]" },
      },
    },
    searchable: {
      description: "Adds a search field that filters visible rows.",
      table: {
        category: "Search",
        defaultValue: { summary: "true" },
      },
    },
    searchPlaceholder: {
      description: "Placeholder text shown in the search input.",
      table: {
        category: "Search",
        defaultValue: { summary: "Search..." },
      },
    },
    searchDebounce: {
      description:
        "Debounce delay in milliseconds applied to search input updates.",
      table: {
        category: "Search",
        defaultValue: { summary: "250" },
      },
    },
    emptyMessage: {
      description: "Message shown when there are no rows to display.",
      table: {
        category: "Empty state",
        defaultValue: { summary: "No rows found..." },
      },
    },
    checkboxSelection: {
      description:
        "Adds row selection checkboxes and a select-all header checkbox.",
      table: {
        category: "Selection",
        defaultValue: { summary: "true" },
      },
    },
    selectedRows: {
      description:
        "Controlled list of selected row keys. Use with `onSelectedRowsChange` to manage selection externally.",
      control: { type: "object" },
      table: {
        category: "Selection",
        defaultValue: { summary: "undefined" },
      },
    },
    onSelectedRowsChange: {
      description:
        "Called with the selected row keys and the selected row objects whenever selection changes.",
      control: false,
      table: {
        category: "Selection",
        defaultValue: { summary: "undefined" },
      },
    },
    sortDirection: {
      description: "Initial sort direction used with `sortField`.",
      control: { type: "select" },
      options: ["NONE", "ASC", "DESC"],
      table: {
        category: "Sorting",
        defaultValue: { summary: "undefined" },
      },
    },
    onSortChange: {
      description:
        "Called when sorting changes, with the next sort field and direction.",
      control: false,
      table: {
        category: "Sorting",
        defaultValue: { summary: "undefined" },
      },
    },
    columnVisibility: {
      description:
        "Controlled visibility map keyed by column field. `false` hides a column.",
      control: { type: "object" },
      table: {
        category: "Column visibility",
        defaultValue: { summary: "undefined" },
      },
    },
    defaultColumnVisibility: {
      description:
        "Initial visibility map when column visibility is uncontrolled.",
      control: { type: "object" },
      table: {
        category: "Column visibility",
        defaultValue: { summary: "undefined" },
      },
    },
    onColumnVisibilityChange: {
      description:
        "Called whenever column visibility changes through the column manager.",
      control: false,
      table: {
        category: "Column visibility",
        defaultValue: { summary: "undefined" },
      },
    },
    manageColumns: {
      description:
        "Shows a column management button in the header that allows toggling column visibility, changing column order, and pinning columns.",
      control: "boolean",
      table: {
        category: "Column manager",
        defaultValue: { summary: "false" },
      },
    },
    columnOrder: {
      description:
        "Controlled array describing the rendered column order by field id.",
      control: { type: "object" },
      table: {
        category: "Column order",
        defaultValue: { summary: "undefined" },
      },
    },
    defaultColumnOrder: {
      description: "Initial column order when ordering is uncontrolled.",
      control: { type: "object" },
      table: {
        category: "Column order",
        defaultValue: { summary: "undefined" },
      },
    },
    onColumnOrderChange: {
      description:
        "Called with the next ordered list of column field ids when the order changes.",
      control: false,
      table: {
        category: "Column order",
        defaultValue: { summary: "undefined" },
      },
    },
    pinnedColumns: {
      description:
        "Controlled pinned column configuration with `left` and `right` field arrays.",
      control: { type: "object" },
      table: {
        category: "Pinning",
        defaultValue: { summary: "undefined" },
      },
    },
    defaultPinnedColumns: {
      description:
        "Initial pinned column configuration when pinning is uncontrolled.",
      control: { type: "object" },
      table: {
        category: "Pinning",
        defaultValue: { summary: "undefined" },
      },
    },
    onPinnedColumnsChange: {
      description: "Called whenever the pinned column configuration changes.",
      control: false,
      table: {
        category: "Pinning",
        defaultValue: { summary: "undefined" },
      },
    },
    showBackdrop: {
      description:
        "Shows a backdrop overlay when the column manager is open to focus attention.",
      control: "boolean",
      table: {
        category: "Column manager",
        defaultValue: { summary: "false" },
      },
    },
    mode: {
      description:
        "Determines how the column manager is rendered. `portal` renders in a React portal, while `inline` renders within the table container.",
      control: { type: "radio" },
      options: ["portal", "inline"],
      table: {
        category: "Column manager",
        defaultValue: { summary: "portal" },
      },
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    mode: "inline",
    showBackdrop: true,
    maxTableHeight: "500px",
  },

  loaders: [() => ({ rows: getPersonRows() })],

  render: (args, { loaded: { rows } }) => {
    return (
      <Flex>
        <DataTable
          {...args}
          key={args.layoutMode === "responsive" ? "responsive" : "fixed"}
          rows={rows as PersonRow[]}
          columns={columns}
          rowKey="id"
        />
      </Flex>
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
    defaultColumnVisibility: {
      role: false,
      city: false,
      state: false,
    },
    maxTableHeight: "500px",
  },

  loaders: [() => ({ rows: getPersonRows() })],

  render: (args, { loaded: { rows } }) => {
    return (
      <Flex>
        <DataTable
          key={args.layoutMode === "responsive" ? "responsive" : "fixed"}
          {...args}
          rows={rows as PersonRow[]}
          columns={columns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const RowSpanComplex: Story = {
  args: {
    manageColumns: false,
    checkboxSelection: false,
    searchable: false,
    paginated: false,
    rowGrouping: {
      field: "portfolio",
    },
  },

  parameters: {
    docs: {
      description: {
        story:
          "Shows stacked body-cell merging with multiple row-span columns. The portfolio and squad cells merge downward, while the row grouping boundary prevents spans from crossing into the next portfolio section.",
      },
    },
  },

  render: (args) => {
    return (
      <Flex>
        <DataTable
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
    manageColumns: false,
    checkboxSelection: false,
    searchable: false,
    paginated: false,
    rowGrouping: {
      field: "quarter",
    },
  },

  parameters: {
    docs: {
      description: {
        story:
          "Shows summary rows that merge horizontally across adjacent body cells. The line-item column expands across the remaining detail columns inside each quarter section.",
      },
    },
  },

  render: (args) => {
    return (
      <Flex>
        <DataTable
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
    manageColumns: false,
    checkboxSelection: false,
    searchable: false,
    paginated: false,
    rowGrouping: {
      field: "region",
    },
  },

  render: (args) => {
    return (
      <Flex>
        <DataTable
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
    manageColumns: false,
    checkboxSelection: true,
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

  loaders: [() => ({ rows: getPersonRows() })],

  render: (args, { loaded: { rows } }) => {
    return (
      <Flex>
        <DataTable
          {...args}
          rows={rows as PersonRow[]}
          columns={columns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const RowGrouping: Story = {
  args: {
    manageColumns: false,
    rowGrouping: {
      fields: ["country", "state"],
      collapsible: true,
      renderGroupHeader: (
        value: DataTableGroupValue,
        rows: Record<string, unknown>[],
        collapsed: boolean,
        depth: number,
        path: DataTableGroupValue[],
      ) => (
        <Flex justify="space-between" align="center">
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

  loaders: [() => ({ rows: getPersonRows() })],

  render: (args, { loaded: { rows } }) => {
    return (
      <Flex>
        <DataTable
          {...args}
          rows={rows as PersonRow[]}
          columns={columns}
          rowKey="id"
        />
      </Flex>
    );
  },
};

export const ColumnAndRowGrouping: Story = {
  args: {
    manageColumns: false,
    checkboxSelection: true,
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
        value: DataTableGroupValue,
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

  loaders: [() => ({ rows: getPersonRows() })],

  render: (args, { loaded: { rows } }) => {
    return (
      <Flex>
        <DataTable
          {...args}
          rows={rows as PersonRow[]}
          columns={columns}
          rowKey="id"
        />
      </Flex>
    );
  },
};
