import { faker } from "@faker-js/faker/locale/pt_BR";
import type { Meta, StoryObj } from "@storybook/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortDirection,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "components/badge";
import { IconMinor } from "components/icon/icon";
import { InputField } from "components/input-field";
import { Flex, SpaceBetween } from "components/layout";
import { Pagination } from "components/pagination";
import { Body, Label } from "components/typography";
import { FC } from "helpers/generic-types";
import { Nothing } from "helpers/nothing";
import { isDefined, toArray } from "helpers/safe-navigation";
import { getNextSortDirection } from "helpers/table-helpers";
import { useState } from "react";
import styled from "styled-components";

import {
  IPagination,
  ISort,
  useFilteredRows,
  usePaginatedRows,
  useSortedRows,
  useTable,
} from "./hooks";
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./table";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    children: {
      description:
        "Table markup composed from TableHead, TableBody, TableRow, and cell subcomponents.",
      table: {
        category: "Composition",
        defaultValue: { summary: "undefined" },
      },
      control: false,
    },
    className: {
      description: "Optional class name applied to the table root.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "undefined" },
      },
    },
    style: {
      description: "Inline styles applied to the table root.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "undefined" },
      },
      control: false,
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  render: () => {
    return (
      <Flex style={{ padding: "44px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>School</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_DATA.slice(0, 5).map((row) => (
              <TableRow key={row.id}>
                <TableBodyCell>{row.user.name}</TableBodyCell>
                <TableBodyCell>{row.user.email}</TableBodyCell>
                <TableBodyCell>{row.school.name}</TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    );
  },
};

export const SpecialCellExample: Story = {
  render: function Render() {
    const [data, setData] = useState<Data[]>(MOCK_DATA.slice(0, 5));
    const [selected, setSelected] = useState<Data[]>([]);

    const handleDeleteClick = (row: Data) => {
      console.log("handleClick", row);
      const index = data.findIndex((el) => el.id === row.id);

      if (index >= 0) {
        setData([...data.slice(0, index), ...data.slice(index + 1)]);
      }
    };

    const handleSelectClick = (row: Data) => {
      const index = selected.findIndex((el) => el.id === row.id);

      if (index < 0) {
        setSelected(selected.concat([row]));
      } else {
        setSelected([
          ...selected.slice(0, index),
          ...selected.slice(index + 1),
        ]);
      }
    };

    const allSelected = selected.length === data.length;

    const handleClick = () => {
      setSelected(allSelected ? [] : data);
    };

    return (
      <Flex column>
        <div>
          Selected: {selected.map((row: Data) => row.user.name).join(", ")}
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell.Select
                checked={
                  allSelected ? true : selected.length > 0 ? undefined : false
                }
                onClick={handleClick}
              />
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>School</TableHeaderCell>
              <TableHeaderCell.Actions />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Data) => {
              const isSelected = isDefined(
                selected.find((el) => row.id === el.id),
              );

              return (
                <TableRow key={row.id} selected={isSelected}>
                  <TableBodyCell.Select
                    selected={isSelected}
                    onChange={() => handleSelectClick(row)}
                  />
                  <TableBodyCell>{row.user.name}</TableBodyCell>
                  <TableBodyCell>{row.user.email}</TableBodyCell>
                  <TableBodyCell>{row.school.name}</TableBodyCell>
                  <TableBodyCell.Actions>
                    <TableBodyCell.Action
                      onClick={() => handleDeleteClick(row)}
                    >
                      <IconMinor.TrashCan />
                      <Label strong>Delete</Label>
                    </TableBodyCell.Action>
                  </TableBodyCell.Actions>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Flex>
    );
  },
};

export const CustomHookExample: Story = {
  render: function Render() {
    const { rows, pagination, sortBy, filterBy, getSort, goto } = useTable({
      data: MOCK_DATA,
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
    });

    const sortByUser = () =>
      sortBy({
        id: "user",
        getter: (el) => el.user.name.toLocaleLowerCase(),
      });

    const sortBySchool = () =>
      sortBy({
        id: "school",
        getter: (el) => el.school.name.toLocaleLowerCase(),
      });

    return (
      <Flex column style={{ padding: "44px" }}>
        <ActionsWrapper>
          <InputField
            placeholder="Search"
            onChange={(e) => filterBy(e.target.value)}
          >
            <InputField.Icon>
              <IconMinor.MagnifyingGlass />
            </InputField.Icon>
          </InputField>
          <Pagination
            page={pagination.pageIndex + 1}
            totalPages={pagination.pageCount}
            onChange={(index) => goto(index - 1)}
          />
        </ActionsWrapper>
        <Table style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell onClick={sortByUser} sort={getSort("user")}>
                User
              </TableHeaderCell>
              <TableHeaderCell style={{ width: 65 }}>Status</TableHeaderCell>
              <TableHeaderCell onClick={sortBySchool} sort={getSort("school")}>
                School
              </TableHeaderCell>
              <TableHeaderCell style={{ width: 120 }}>Body</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, user, status, school, course }) => (
              <TableRow key={id}>
                <TableBodyCell>
                  <UserCell {...user} />
                </TableBodyCell>
                <TableBodyCell fitContent>
                  <Badge success={status === "Active"}>{status}</Badge>
                </TableBodyCell>
                <TableBodyCell>
                  <SchoolCell {...school} />
                </TableBodyCell>
                <TableBodyCell>
                  <Body>{course.name}</Body>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    );
  },
};

export const ControlledCustomHookExample: Story = {
  render: function Render() {
    const [filter, setFilter] = useState("");

    const [pagination, setPagination] = useState<IPagination>({
      pageIndex: 0,
      pageSize: 5,
    });

    const [sort, setSort] = useState<ISort<Data> & { column: string }>();

    const sorted = useSortedRows(MOCK_DATA, toArray(sort));
    const filtered = useFilteredRows(sorted, { fn: filter, mode: "exact" });
    const {
      rows,
      pagination: { pageIndex, pageCount },
    } = usePaginatedRows(filtered, pagination);

    const sortBy = (column: "user" | "school", getter: ISort<Data>["getter"]) =>
      setSort({
        column,
        direction: sort?.direction
          ? getNextSortDirection(sort.direction)
          : "DESC",
        getter,
      });

    const sortByUser = () =>
      sortBy("user", (el) => el.user.name.toLocaleLowerCase());
    const sortBySchool = () =>
      sortBy("school", (el) => el.school.name.toLocaleLowerCase());
    return (
      <Flex column>
        <ActionsWrapper>
          <InputField
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          >
            <InputField.Icon>
              <IconMinor.MagnifyingGlass />
            </InputField.Icon>
          </InputField>
          <Pagination
            page={pageIndex + 1}
            totalPages={pageCount}
            onChange={(page) =>
              setPagination({ ...pagination, pageIndex: page - 1 })
            }
          />
        </ActionsWrapper>

        <Table style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell
                onClick={sortByUser}
                sort={sort?.column === "user" ? sort?.direction : "NONE"}
              >
                User
              </TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell
                onClick={sortBySchool}
                sort={sort?.column === "school" ? sort?.direction : "NONE"}
              >
                School
              </TableHeaderCell>
              <TableHeaderCell>Body</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, user, status, school, course }) => (
              <TableRow key={id}>
                <TableBodyCell>
                  <UserCell {...user} />
                </TableBodyCell>
                <TableBodyCell fitContent>
                  <Badge success={status === "Active"}>{status}</Badge>
                </TableBodyCell>
                <TableBodyCell>
                  <SchoolCell {...school} />
                </TableBodyCell>
                <TableBodyCell>
                  <Body>{course.name}</Body>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    );
  },
};

export const TanstackReactTableExample: Story = {
  render: function Render() {
    const table = useReactTable({
      data: MOCK_DATA.slice(0, 5),
      columns: tanCols,
      getCoreRowModel: getCoreRowModel(),
    });
    return (
      <Flex column>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell key={header.id}>
                    {header.isPlaceholder ? (
                      <Nothing />
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const fitContent = cell.column.id === "status";

                  return (
                    <TableBodyCell key={cell.id} fitContent={fitContent}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableBodyCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    );
  },
};

export const TanstackReactTableDecoratedExample: Story = {
  render: function Render() {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
      data: MOCK_DATA,
      columns: tanCols,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        sorting,
        pagination: {
          pageSize: 3,
        },
      },
    });

    function toSort(
      isSorted: false | SortDirection,
    ): "ASC" | "DESC" | undefined {
      if (isSorted === false) {
        return undefined;
      }

      switch (isSorted) {
        case "asc":
          return "ASC";
        case "desc":
          return "DESC";
        default:
          return undefined;
      }
    }

    return (
      <Flex column>
        <ActionsWrapper>
          <InputField placeholder="Search">
            <InputField.Icon>
              <IconMinor.MagnifyingGlass />
            </InputField.Icon>
          </InputField>
          <Pagination
            page={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onChange={(index) => table.setPageIndex(index - 1)}
          />
        </ActionsWrapper>
        <Table style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHeaderCell
                      key={header.id}
                      isPlaceholder={header.isPlaceholder}
                      sort={toSort(header.column.getIsSorted())}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const fitContent = cell.column.id === "status";

                  return (
                    <TableBodyCell key={cell.id} fitContent={fitContent}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableBodyCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    );
  },
};

const MOCK_DATA: Data[] = [];

type Data = {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  status: string;
  school: {
    name: string;
    country: string;
  };
  course: {
    name: string;
  };
};

const columnHelper = createColumnHelper<Data>();

const tanCols = [
  columnHelper.accessor("user", {
    cell: (info) => <UserCell {...info.getValue()} />,
    header: "User",
  }),
  columnHelper.accessor("status", {
    cell: (info) => (
      <Badge success={info.getValue() === "Active"}>{info.getValue()}</Badge>
    ),
    header: "Status",
    enableSorting: false,
  }),
  columnHelper.accessor("school", {
    cell: (info) => <SchoolCell {...info.getValue()} />,
    header: "School",
    enableSorting: false,
  }),
  columnHelper.accessor("course", {
    cell: (info) => <Body strong>{info.getValue().name}</Body>,
    header: "Course",
    enableSorting: false,
  }),
];

const makeData = (
  id: string,
  name: string,
  email: string,
  schoolName: string,
): Data => ({
  id,
  user: {
    id: "10",
    name,
    email,
  },
  status: Math.random() < 0.5 ? "Active" : "Inactive",
  school: {
    name: schoolName,
    country: "Canada",
  },
  course: {
    name: "General English",
  },
});

for (let i = 0; i < 10000; i++) {
  MOCK_DATA.push(
    makeData(
      i.toString(),
      faker.person.fullName(),
      faker.internet.email(),
      faker.company.name(),
    ),
  );
}

const ActionsWrapper = styled(SpaceBetween)`
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: navajowhite;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;

const UserCell: FC<{ name: string; email: string }> = function UserCell({
  name,
  email,
}) {
  return (
    <>
      <Body strong>{name}</Body>
      <Body subdued>{email}</Body>
    </>
  );
};

const SchoolCell: FC<{ name: string; country: string }> = function SchoolCell({
  name,
  country,
}) {
  return (
    <>
      <Body strong>{name}</Body>
      <Body subdued>{country}</Body>
    </>
  );
};
