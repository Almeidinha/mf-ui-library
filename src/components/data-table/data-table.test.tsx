import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";

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

type SpanRow = {
  id: number;
  region: string;
  team: string;
  metric: string;
  note: string;
};

const spanColumns: DataTableColumn<SpanRow>[] = [
  {
    field: "team",
    headerName: "Team",
    rowSpan: ({ row, rowIndex, rows }) => {
      const nextRow = rows[rowIndex + 1];

      return nextRow && nextRow.team === row.team ? 2 : undefined;
    },
  },
  {
    field: "metric",
    headerName: "Metric",
    colSpan: ({ row }) => (row.metric.startsWith("Summary") ? 2 : undefined),
  },
  {
    field: "note",
    headerName: "Note",
  },
];

const spanRows: SpanRow[] = [
  {
    id: 1,
    region: "North",
    team: "Core",
    metric: "Revenue",
    note: "$120k",
  },
  {
    id: 2,
    region: "North",
    team: "Core",
    metric: "Summary: Core",
    note: "2 active deals",
  },
  {
    id: 3,
    region: "South",
    team: "Core",
    metric: "Revenue",
    note: "$90k",
  },
  {
    id: 4,
    region: "South",
    team: "Core",
    metric: "Summary: Core",
    note: "1 renewal",
  },
];

async function chooseSelectOption(
  user: ReturnType<typeof userEvent.setup>,
  controlName: string,
  optionText: string,
) {
  const combobox = screen.getByRole("combobox", { name: controlName });
  const trigger = combobox.querySelector('[data-role="value"]');

  expect(trigger).not.toBeNull();

  await user.click(trigger as HTMLElement);

  await waitFor(() => {
    expect(document.querySelector(".select-menu")).not.toBeNull();
  });

  const menu = document.querySelector(".select-menu") as HTMLElement;
  const option = within(menu).getByText(optionText).closest('[data-role="option"]');

  expect(option).not.toBeNull();

  fireEvent.click(option as HTMLElement);
}

describe("DataTable grouping", () => {
  it("supports visible cell overflow when configured at column level", () => {
    render(
      <DataTable
        rows={[
          {
            id: 1,
            name: "Alice",
            country:
              "This is a very long cell value that should remain visible without ellipsis when configured.",
            state: "Sao Paulo",
            city: "Sao Paulo",
          },
        ]}
        columns={[
          {
            field: "name",
            headerName: "Name",
            width: 120,
          },
          {
            field: "country",
            headerName: "Country",
            overflow: "visible",
          },
        ]}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const cell = screen
      .getByText(
        "This is a very long cell value that should remain visible without ellipsis when configured.",
      )
      .closest("td");

    expect(cell).not.toBeNull();
    expect(cell).toHaveStyle({
      overflow: "visible",
      textOverflow: "clip",
      whiteSpace: "nowrap",
    });
  });

  it("keeps explicit widths fixed in responsive mode while widthless and fullWidth columns stay flexible", () => {
    const { container } = render(
      <DataTable
        rows={rows}
        columns={[
          {
            field: "name",
            headerName: "Name",
            width: 120,
          },
          {
            field: "country",
            headerName: "Country",
          },
          {
            field: "state",
            headerName: "State",
            width: 220,
            fullWidth: true,
          },
          {
            field: "city",
            headerName: "City",
            width: 140,
          },
        ]}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const cols = Array.from(container.querySelectorAll("colgroup col"));

    expect(cols).toHaveLength(4);
    expect(cols[0]).toHaveStyle({ width: "120px", minWidth: "120px" });
    expect(cols[1]).toHaveStyle({ width: "auto", minWidth: "160px" });
    expect(cols[2]).toHaveStyle({ width: "auto", minWidth: "220px" });
    expect(cols[3]).toHaveStyle({ width: "140px", minWidth: "140px" });
  });

  it("supports advanced filters with add, connector, and remove actions", async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable
        searchDebounce={0}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Advanced filters" }),
    );

    await chooseSelectOption(user, "Filter 1 column", "Name");
    await chooseSelectOption(user, "Filter 1 operator", "Contains");
    await user.type(screen.getByLabelText("Filter 1 value"), "ali");

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bruno")).not.toBeInTheDocument();
    expect(screen.queryByText("Carla")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add filter" }));
    await chooseSelectOption(user, "Filter 2 connector", "Or");
    await chooseSelectOption(user, "Filter 2 column", "Country");
    await chooseSelectOption(user, "Filter 2 operator", "Contains");
    await user.type(screen.getByLabelText("Filter 2 value"), "united");

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Carla")).toBeInTheDocument();
    expect(screen.queryByText("Bruno")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Remove filter 1" }));

    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.getByText("Carla")).toBeInTheDocument();
  });

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

  it("toggles all visible rows off when clicking the header checkbox twice", async () => {
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
          />
        </>
      );
    }

    render(<ControlledTable />);

    const headerCheckbox = screen.getAllByRole("checkbox")[0];

    await user.click(headerCheckbox);
    expect(screen.getByTestId("selected-count")).toHaveTextContent("3");

    await user.click(headerCheckbox);
    expect(screen.getByTestId("selected-count")).toHaveTextContent("0");
  });
});

describe("DataTable action columns", () => {
  it("skips action-column processing when disabled", () => {
    const getActions = vi.fn((row: TestRow) => [
      {
        key: `view-${row.id}`,
        label: "View",
        onClick: vi.fn(),
      },
    ]);

    render(
      <DataTable
        rows={rows}
        columns={[
          ...columns,
          {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            getActions,
          },
        ]}
        rowKey="id"
        paginated={false}
        searchable={false}
        showActionColumns={false}
      />,
    );

    expect(screen.queryByText("Actions")).not.toBeInTheDocument();
    expect(getActions).not.toHaveBeenCalled();
  });
});

describe("DataTable row striping", () => {
  it("keeps row striping enabled by default", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const aliceRow = screen.getByText("Alice").closest("tr");
    const brunoRow = screen.getByText("Bruno").closest("tr");

    expect(aliceRow).not.toBeNull();
    expect(brunoRow).not.toBeNull();
    expect(
      getComputedStyle(aliceRow as HTMLTableRowElement).backgroundColor,
    ).toBe("rgb(255, 255, 255)");
    expect(
      getComputedStyle(brunoRow as HTMLTableRowElement).backgroundColor,
    ).toBe("rgb(249, 250, 251)");
  });

  it("can disable row striping", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        striped={false}
      />,
    );

    const aliceRow = screen.getByText("Alice").closest("tr");
    const brunoRow = screen.getByText("Bruno").closest("tr");

    expect(aliceRow).not.toBeNull();
    expect(brunoRow).not.toBeNull();
    expect(
      getComputedStyle(aliceRow as HTMLTableRowElement).backgroundColor,
    ).toBe("rgb(255, 255, 255)");
    expect(
      getComputedStyle(brunoRow as HTMLTableRowElement).backgroundColor,
    ).toBe("rgb(255, 255, 255)");
  });
});

describe("DataTable cell spans", () => {
  it("keeps cell borders disabled by default", () => {
    render(
      <DataTable
        rows={spanRows}
        columns={spanColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const revenueCell = screen.getAllByText("Revenue")[0]?.closest("td");

    expect(revenueCell).not.toBeNull();

    const styles = getComputedStyle(revenueCell as HTMLTableCellElement);

    expect(styles.borderRightWidth).toBe("");
    expect(styles.borderBottomWidth).toBe("");
  });

  it("can render cell borders for spanned layouts", () => {
    render(
      <DataTable
        rows={spanRows}
        columns={spanColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
        showCellBorders
      />,
    );

    const revenueCell = screen.getAllByText("Revenue")[0]?.closest("td");
    const noteCell = screen.getByText("$120k").closest("td");

    expect(revenueCell).not.toBeNull();
    expect(noteCell).not.toBeNull();

    const revenueStyles = getComputedStyle(revenueCell as HTMLTableCellElement);
    const noteStyles = getComputedStyle(noteCell as HTMLTableCellElement);

    expect(revenueStyles.borderRightWidth).toBe("1px");
    expect(revenueStyles.borderRightStyle).toBe("solid");
    expect(revenueStyles.borderRightColor).toBe("rgb(229, 231, 235)");
    expect(revenueStyles.borderBottomWidth).toBe("1px");
    expect(revenueStyles.borderBottomStyle).toBe("solid");
    expect(revenueStyles.borderBottomColor).toBe("rgb(229, 231, 235)");

    expect(noteStyles.borderRightStyle).toBe("none");
    expect(noteStyles.borderBottomWidth).toBe("1px");
    expect(noteStyles.borderBottomStyle).toBe("solid");
    expect(noteStyles.borderBottomColor).toBe("rgb(229, 231, 235)");
  });

  it("uses only horizontal cell borders when columns are pinned", () => {
    render(
      <DataTable
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        showCellBorders
        pinnedColumns={{ left: ["name"], right: ["city"] }}
      />,
    );

    const nameHeader = screen.getByText("Name").closest("th");
    const countryHeader = screen.getByText("Country").closest("th");
    const cityHeader = screen.getByText("City").closest("th");
    const countryCell = screen.getAllByText("Brazil")[0]?.closest("td");

    expect(nameHeader).not.toBeNull();
    expect(countryHeader).not.toBeNull();
    expect(cityHeader).not.toBeNull();
    expect(countryCell).not.toBeNull();

    const nameHeaderStyles = getComputedStyle(
      nameHeader as HTMLTableCellElement,
    );
    const countryHeaderStyles = getComputedStyle(
      countryHeader as HTMLTableCellElement,
    );
    const cityHeaderStyles = getComputedStyle(
      cityHeader as HTMLTableCellElement,
    );
    const countryCellStyles = getComputedStyle(
      countryCell as HTMLTableCellElement,
    );

    expect(nameHeaderStyles.borderRightWidth).toBe("1px");
    expect(nameHeaderStyles.borderRightStyle).toBe("solid");
    expect(countryHeaderStyles.borderRightWidth).toBe("");
    expect(cityHeaderStyles.borderLeftWidth).toBe("1px");
    expect(cityHeaderStyles.borderLeftStyle).toBe("solid");

    expect(countryCellStyles.borderRightWidth).toBe("");
    expect(countryCellStyles.borderBottomWidth).toBe("1px");
    expect(countryCellStyles.borderBottomStyle).toBe("solid");
    expect(countryCellStyles.borderBottomColor).toBe("rgb(229, 231, 235)");
  });

  it("renders column spans without affecting the default row path", () => {
    render(
      <DataTable
        rows={spanRows}
        columns={spanColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const summaryCell = screen.getAllByText("Summary: Core")[0]?.closest("td");

    expect(summaryCell).not.toBeNull();
    expect(summaryCell).toHaveAttribute("colspan", "2");
    expect(screen.queryByText("2 active deals")).not.toBeInTheDocument();
  });

  it("renders row spans for consecutive rows inside the same section", () => {
    render(
      <DataTable
        rows={spanRows}
        columns={spanColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const teamCells = screen
      .getAllByText("Core")
      .map((element) => element.closest("td"));

    expect(teamCells).toHaveLength(2);
    expect(teamCells[0]).toHaveAttribute("rowspan", "2");
    expect(teamCells[1]).toHaveAttribute("rowspan", "2");
  });

  it("stops row spans at row-group boundaries", () => {
    render(
      <DataTable
        rows={spanRows}
        columns={spanColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
        rowGrouping={{
          field: "region",
        }}
      />,
    );

    const teamCells = screen
      .getAllByText("Core")
      .map((element) => element.closest("td"));

    expect(teamCells).toHaveLength(2);
    expect(teamCells[0]).toHaveAttribute("rowspan", "2");
    expect(teamCells[1]).toHaveAttribute("rowspan", "2");
  });
});
