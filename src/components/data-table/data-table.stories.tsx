import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Meta, StoryObj } from "@storybook/react";
import { IconMinor } from "components/icon";

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
  parameters: {
    layout: "centered",
  },
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
    sortField: undefined,
    sortDirection: undefined,
  },
  argTypes: {
    sortField: {
      control: { type: "select" },
      options: ["id", "firstName", "lastName", "age", "fullName"],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    sortDirection: {
      control: { type: "select" },
      options: ["NONE", "ASC", "DESC"],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    emptyMessage: { table: { defaultValue: { summary: "No rows found." } } },
    searchDebounce: { table: { defaultValue: { summary: "250" } } },
    checkboxSelection: { table: { defaultValue: { summary: "false" } } },
    searchable: { table: { defaultValue: { summary: "false" } } },
    pageSizeOptions: {
      table: { defaultValue: { summary: "[5, 10, 25, 50]" } },
    },
    defaultPageSize: { table: { defaultValue: { summary: "10" } } },
    paginated: { table: { defaultValue: { summary: "false" } } },
    searchPlaceholder: { table: { defaultValue: { summary: "Search..." } } },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  loaders: [() => ({ rows: getPersonRows() })],
  render: (args, { loaded: { rows } }) => {
    return (
      <DataTable
        {...args}
        rows={rows as PersonRow[]}
        columns={columns}
        rowKey="id"
      />
    );
  },
};
