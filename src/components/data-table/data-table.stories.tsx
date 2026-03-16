import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Meta, StoryObj } from "@storybook/react";
import { IconMinor } from "components/icon";
import { Flex } from "components/layout";

import { DataTable } from "./data-table";
import { DataTableColumn } from "./types";

type PersonRow = {
  id: number;
  firstName: string | null;
  lastName: string;
  age: number | null;
  role?: "user" | "admin" | "owner";
  isActive?: boolean;
};

const getPersonRows = (): PersonRow[] => {
  return Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 80 }),
    role: faker.helpers.arrayElement(["user", "admin", "owner"]),
    isActive: faker.datatype.boolean(),
  }));
};

const columns: DataTableColumn<PersonRow>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    fitContent: true,
    sortable: true,
  },
  { field: "firstName", headerName: "First name", sortable: true },
  { field: "lastName", headerName: "Last name", sortable: true },
  {
    field: "age",
    headerName: "Age",
    sortable: true,
    fitContent: true,
    align: "right",
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    valueGetter: (_, row) =>
      `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
  },
  {
    field: "actions",
    type: "actions",
    width: 50,
    headerName: "",
    align: "center",
    fitContent: true,
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

const meta = {
  title: "Components/DataTable",
  component: DataTable,

  args: {
    rows: [],
    columns: [],
    rowKey: "id",
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
    defaultColumnVisibility: undefined,
    columnOrder: undefined,
    defaultColumnOrder: undefined,
    pinnedColumns: undefined,
    defaultPinnedColumns: undefined,
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
        "Column definitions describing headers, sizing, sorting, and custom cell rendering.",
      control: false,
      table: {
        category: "Data",
        defaultValue: { summary: "[]" },
      },
    },
    rowKey: {
      description: "Field used as the unique key for each row.",
      table: {
        category: "Data",
        defaultValue: { summary: "id" },
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
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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
