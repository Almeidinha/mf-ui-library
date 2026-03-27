import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import React from "react";
import { vi } from "vitest";

import { DataGrid } from "./data-grid";
import type { DataGridColumn } from "./types";

type TestRow = {
  id: number;
  name: string;
  country: string;
  state: string;
  city: string;
};

type SpanRow = {
  id: number;
  region: string;
  team: string;
  metric: string;
  note: string;
};

const rows: TestRow[] = [
  {
    id: 2,
    name: "Bruno",
    country: "Brazil",
    state: "Rio de Janeiro",
    city: "Rio de Janeiro",
  },
  {
    id: 1,
    name: "Alice",
    country: "Brazil",
    state: "Sao Paulo",
    city: "Sao Paulo",
  },
  {
    id: 3,
    name: "Carla",
    country: "United States",
    state: "California",
    city: "San Francisco",
  },
];

const columns: DataGridColumn<TestRow>[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: true,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: true,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    getActions: (row) => [
      {
        key: `view-${row.id}`,
        label: `View ${row.name}`,
        onClick: vi.fn(),
      },
    ],
  },
];

const groupedColumns: DataGridColumn<TestRow>[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: true,
  },
  {
    field: "country",
    headerName: "Country",
    sortable: true,
  },
  {
    field: "state",
    headerName: "State",
    sortable: true,
  },
  {
    field: "city",
    headerName: "City",
    sortable: true,
  },
];

const spanColumns: DataGridColumn<SpanRow>[] = [
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
    team: "Platform",
    metric: "Revenue",
    note: "$90k",
  },
  {
    id: 4,
    region: "South",
    team: "Platform",
    metric: "Summary: Platform",
    note: "1 renewal",
  },
];

function getCellByText(text: string) {
  const element = screen.getByText(text);
  const cell = element.closest('[role="gridcell"], [role="columnheader"]');

  expect(cell).not.toBeNull();

  return cell as HTMLDivElement;
}

function getGridHeader() {
  const [header] = screen.getAllByRole("rowgroup");

  return header as HTMLDivElement;
}

describe("DataGrid accessibility", () => {
  it("keeps explicit column widths fixed in responsive mode when another column can grow", () => {
    render(
      <DataGrid
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

    const styles = getComputedStyle(getGridHeader());

    expect(styles.gridTemplateColumns).toContain("120px");
    expect(styles.gridTemplateColumns).toContain("140px");
    expect(styles.gridTemplateColumns).toContain("minmax(160px, 1fr)");
    expect(styles.gridTemplateColumns).not.toContain("minmax(120px, 1fr)");
    expect(styles.gridTemplateColumns).not.toContain("minmax(140px, 1fr)");
  });

  it("allows a fullWidth column to absorb remaining space even with an explicit width", () => {
    render(
      <DataGrid
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

    const styles = getComputedStyle(getGridHeader());

    expect(styles.gridTemplateColumns).toContain("120px");
    expect(styles.gridTemplateColumns).toContain("140px");
    expect(styles.gridTemplateColumns).toContain("minmax(220px, 1fr)");
  });

  it("shows ellipsis styling for overflowing responsive cell content", () => {
    render(
      <DataGrid
        rows={[
          {
            id: 1,
            name: "Alpha",
            country:
              "This is a very long cell value that should truncate with an ellipsis in the responsive grid",
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
            width: 160,
          },
        ]}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const cell = getCellByText(
      "This is a very long cell value that should truncate with an ellipsis in the responsive grid",
    );
    const content = cell.firstElementChild as HTMLElement | null;

    expect(content).not.toBeNull();

    const styles = getComputedStyle(content as HTMLElement);

    expect(styles.overflow).toBe("hidden");
    expect(styles.textOverflow).toBe("ellipsis");
    expect(styles.whiteSpace).toBe("nowrap");
  });

  it("supports wrapped cell overflow when configured at column level", () => {
    render(
      <DataGrid
        rows={[
          {
            id: 1,
            name: "Alpha",
            country:
              "This is a very long cell value that should wrap instead of truncating when configured at the column level.",
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
            width: 160,
            overflow: "wrap",
          },
        ]}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const cell = getCellByText(
      "This is a very long cell value that should wrap instead of truncating when configured at the column level.",
    );
    const content = cell.firstElementChild as HTMLElement | null;

    expect(content).not.toBeNull();

    const styles = getComputedStyle(content as HTMLElement);

    expect(styles.overflow).toBe("visible");
    expect(styles.textOverflow).toBe("clip");
    expect(styles.whiteSpace).toBe("normal");
  });

  it("does not have accessibility violations in an interactive grouped state", async () => {
    const { container } = render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        checkboxSelection
        rowGrouping={{
          fields: ["country", "state"],
          collapsible: true,
        }}
      />,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("reflects controlled selection with aria-selected and aria-multiselectable", () => {
    render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        checkboxSelection
        selectedRows={[1, 3]}
      />,
    );

    const grid = screen.getByRole("grid", { name: "Data grid" });
    const aliceNameCell = getCellByText("Alice");
    const aliceCountryCell = screen
      .getAllByText("Brazil")[1]
      ?.closest('[role="gridcell"]');
    const carlaNameCell = getCellByText("Carla");
    const brunoNameCell = getCellByText("Bruno");

    expect(aliceCountryCell).not.toBeNull();
    expect(grid).toHaveAttribute("aria-multiselectable", "true");
    expect(aliceNameCell).toHaveAttribute("aria-selected", "true");
    expect(aliceCountryCell).toHaveAttribute("aria-selected", "true");
    expect(carlaNameCell).toHaveAttribute("aria-selected", "true");
    expect(brunoNameCell).not.toHaveAttribute("aria-selected");
  });

  it("omits aria-multiselectable when checkbox selection is disabled", () => {
    render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const grid = screen.getByRole("grid", { name: "Data grid" });

    expect(grid).not.toHaveAttribute("aria-multiselectable");
  });

  it("keeps inner controls tabbable when cell selection is disabled", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        checkboxSelection
      />,
    );

    await user.tab();
    expect(
      screen.getByRole("checkbox", { name: "Select all visible rows" }),
    ).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: "Name" })).toHaveFocus();
  });

  it("does not have accessibility violations with grouped headers and pinned columns", async () => {
    let container: HTMLElement | undefined;

    act(() => {
      ({ container } = render(
        <DataGrid
          rows={rows}
          columns={groupedColumns}
          rowKey="id"
          paginated={false}
          searchable={false}
          showCellBorders
          columnGroups={[
            {
              key: "identity",
              headerName: "Identity",
              fields: ["name"],
            },
            {
              key: "geography",
              headerName: "Geography",
              fields: ["country", "state", "city"],
            },
          ]}
          pinnedColumns={{ left: ["name"], right: ["city"] }}
        />,
      ));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("columnheader", { name: "Identity" }),
      ).toBeInTheDocument();
    });

    const results = await axe(container!);

    expect(results).toHaveNoViolations();
  });

  it("exposes grid semantics and span metadata", () => {
    render(
      <DataGrid
        rows={spanRows}
        columns={spanColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    const grid = screen.getByRole("grid", { name: "Data grid" });
    const summaryCell = getCellByText("Summary: Core");
    const teamCell = getCellByText("Core");

    expect(grid).toHaveAttribute("aria-colcount", "3");
    expect(grid).toHaveAttribute("aria-rowcount", "5");
    expect(summaryCell).toHaveAttribute("aria-colspan", "2");
    expect(teamCell).toHaveAttribute("aria-rowspan", "2");
  });

  it("supports header controls and keyboard body-cell selection", async () => {
    const user = userEvent.setup();

    function ControlledGrid() {
      const [selectedRows, setSelectedRows] = React.useState<React.Key[]>([]);

      return (
        <>
          <div data-testid="selected-count">{selectedRows.length}</div>
          <DataGrid
            rows={rows}
            columns={columns}
            rowKey="id"
            paginated={false}
            searchable={false}
            checkboxSelection
            cellSelection
            selectedRows={selectedRows}
            onSelectedRowsChange={(keys) => setSelectedRows(keys)}
          />
        </>
      );
    }

    render(<ControlledGrid />);

    await user.tab();

    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: "Select all visible rows",
    });

    expect(selectAllCheckbox).toHaveFocus();

    await user.click(selectAllCheckbox);
    expect(screen.getByTestId("selected-count")).toHaveTextContent("3");

    await user.tab();
    await user.tab();
    await user.tab();

    await waitFor(() => {
      expect(screen.getAllByRole("gridcell")[0]).toHaveFocus();
    });

    await user.keyboard("{Space}");
    expect(screen.getByTestId("selected-count")).toHaveTextContent("2");
  });

  it("supports keyboard sorting from column headers", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        cellSelection
      />,
    );

    await user.tab();

    const nameHeaderButton = screen.getByRole("button", { name: "Name" });

    expect(nameHeaderButton).toHaveFocus();

    await user.keyboard("{Enter}");

    const bodyCells = screen.getAllByRole("gridcell");

    expect(bodyCells[0]).toHaveTextContent("Alice");
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("sorts when clicking anywhere on a sortable header cell", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
      />,
    );

    await user.click(screen.getByRole("columnheader", { name: "Name" }));

    expect(screen.getAllByRole("gridcell")[0]).toHaveTextContent("Alice");
    expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("sorts grouped leaf headers when clicking the full header cell", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={groupedColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
        columnGroups={[
          {
            key: "identity",
            headerName: "Identity",
            fields: ["name"],
          },
          {
            key: "geography",
            headerName: "Geography",
            fields: ["country", "state", "city"],
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("columnheader", { name: "Country" }));

    expect(screen.getAllByRole("gridcell")[1]).toHaveTextContent("Brazil");
    expect(
      screen.getByRole("columnheader", { name: "Country" }),
    ).toHaveAttribute("aria-sort", "ascending");
  });

  it("supports keyboard opening row actions", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={columns}
        rowKey="id"
        paginated={false}
        searchable={false}
        cellSelection
      />,
    );

    await user.tab();
    await user.tab();
    await user.tab();

    await waitFor(() => {
      expect(screen.getAllByRole("gridcell")[0]).toHaveFocus();
    });

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(screen.getAllByRole("gridcell")[1]).toHaveFocus();
    });

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(screen.getAllByRole("gridcell")[2]).toHaveFocus();
    });

    await user.keyboard("{Enter}");

    expect(
      await screen.findByRole("menuitem", { name: "View Bruno" }),
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation across body cells with grouped headers and pinned columns", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={groupedColumns}
        rowKey="id"
        paginated={false}
        searchable={false}
        cellSelection
        columnGroups={[
          {
            key: "identity",
            headerName: "Identity",
            fields: ["name"],
          },
          {
            key: "geography",
            headerName: "Geography",
            fields: ["country", "state", "city"],
          },
        ]}
        pinnedColumns={{ left: ["name"], right: ["city"] }}
      />,
    );

    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();

    const brunoNameCell = document.getElementById("data-grid-cell-2-name");
    const brunoCountryCell = document.getElementById("data-grid-cell-2-country");
    const brunoStateCell = document.getElementById("data-grid-cell-2-state");
    const brunoCityCell = document.getElementById("data-grid-cell-2-city");

    expect(brunoNameCell).not.toBeNull();
    expect(brunoCountryCell).not.toBeNull();
    expect(brunoStateCell).not.toBeNull();
    expect(brunoCityCell).not.toBeNull();
    expect(brunoNameCell).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(brunoCountryCell).toHaveFocus();
    });

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(brunoStateCell).toHaveFocus();
    });

    await user.keyboard("{ArrowRight}");
    await waitFor(() => {
      expect(brunoCityCell).toHaveFocus();
    });
  });

  it("supports keyboard expanding and collapsing grouped rows", async () => {
    const user = userEvent.setup();

    render(
      <DataGrid
        rows={rows}
        columns={columns.slice(0, 2)}
        rowKey="id"
        paginated={false}
        searchable={false}
        cellSelection
        rowGrouping={{
          fields: ["country", "state"],
          collapsible: true,
          defaultCollapsed: true,
        }}
      />,
    );

    await user.tab();
    await user.tab();
    await user.tab();

    const brazilGroup = getCellByText("Brazil");

    await waitFor(() => {
      expect(brazilGroup).toHaveFocus();
    });
    expect(brazilGroup).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();

    await user.keyboard("{ArrowRight}");

    expect(brazilGroup).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Rio de Janeiro")).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");
    await waitFor(() => {
      expect(getCellByText("Rio de Janeiro")).toHaveFocus();
    });

    await user.keyboard("{ArrowDown}");

    const saoPauloGroup = getCellByText("Sao Paulo");

    await waitFor(() => {
      expect(saoPauloGroup).toHaveFocus();
    });

    await user.keyboard("{ArrowRight}");

    expect(saoPauloGroup).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Alice")).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");

    expect(saoPauloGroup).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();

    await user.keyboard("{ArrowUp}");
    await waitFor(() => {
      expect(getCellByText("Rio de Janeiro")).toHaveFocus();
    });

    await user.keyboard("{ArrowUp}");
    await waitFor(() => {
      expect(brazilGroup).toHaveFocus();
    });

    await user.keyboard("{ArrowLeft}");

    expect(brazilGroup).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Sao Paulo")).not.toBeInTheDocument();
  });
});
