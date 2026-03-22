import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { DataTable } from "./data-table";
import type { DataTableColumn } from "./types";

type TestRow = {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
};

const rows: TestRow[] = [
  {
    id: 1,
    name: "Alice",
    country: "Brazil",
    state: "Sao Paulo",
    city: "Sao Paulo",
  },
  {
    id: 2,
    name: "Bruno",
    country: "Brazil",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
  },
  {
    id: 3,
    name: "Carla",
    country: "United States",
    state: "California",
    city: "San Francisco",
  },
];

const columns: DataTableColumn<TestRow>[] = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "country",
    headerName: "Country",
  },
  {
    field: "state",
    headerName: "State",
  },
  {
    field: "city",
    headerName: "City",
  },
];

describe("DataTable grouping", () => {
  it("renders nested column group headers", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        columnGroups={[
          {
            key: "identity",
            headerName: "Identity",
            children: [
              {
                key: "person",
                headerName: "Person",
                fields: ["name"],
              },
            ],
          },
          {
            key: "geography",
            headerName: "Geography",
            children: [
              {
                key: "region",
                headerName: "Region",
                fields: ["country", "state"],
              },
              {
                key: "city-group",
                headerName: "City Group",
                fields: ["city"],
              },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText("Identity")).toBeInTheDocument();
    expect(screen.getByText("Person")).toBeInTheDocument();
    expect(screen.getByText("Geography")).toBeInTheDocument();
    expect(screen.getByText("Region")).toBeInTheDocument();
    expect(screen.getByText("City Group")).toBeInTheDocument();
  });

  it("collapses recursive row groups", async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        rowGrouping={{
          fields: ["country", "state"],
          collapsible: true,
        }}
      />,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bruno")).toBeInTheDocument();
    expect(screen.getByText("Carla")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Brazil" }));

    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.queryByText("Bruno")).not.toBeInTheDocument();
    expect(screen.getByText("Carla")).toBeInTheDocument();
  });

  it("selects only expanded rows when using header checkbox", async () => {
    const user = userEvent.setup();

    function ControlledTable() {
      const [selectedRows, setSelectedRows] = React.useState<React.Key[]>([]);

      return (
        <>
          <div data-testid="selected-count">{selectedRows.length}</div>
          <DataTable
            rows={rows}
            columns={columns}
            rowKey="id"
            paginated={false}
            searchable={false}
            checkboxSelection
            selectedRows={selectedRows}
            onSelectedRowsChange={(keys) => setSelectedRows(keys)}
            rowGrouping={{
              fields: ["country", "state"],
              collapsible: true,
              defaultCollapsed: true,
            }}
          />
        </>
      );
    }

    render(<ControlledTable />);

    await user.click(screen.getByRole("button", { name: "Brazil" }));
    await user.click(screen.getByRole("button", { name: "Sao Paulo" }));

    await user.click(screen.getAllByRole("checkbox")[0]);

    expect(screen.getByTestId("selected-count")).toHaveTextContent("1");

    await user.click(screen.getByRole("button", { name: "Rio de Janeiro" }));

    expect(screen.getByTestId("selected-count")).toHaveTextContent("1");

    const brunoRow = screen.getByText("Bruno").closest("tr");

    expect(brunoRow).not.toBeNull();
    expect(
      within(brunoRow as HTMLTableRowElement).getByRole("checkbox"),
    ).not.toBeChecked();
  });
});
