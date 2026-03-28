import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { DataTableColumn } from "./types";
import { useDataTable } from "./useDataTable";

type Row = {
  id: number;
  name: string;
  role: string;
};

const columns: DataTableColumn<Row>[] = [
  {
    field: "name",
    headerName: "Name",
    searchable: true,
    sortable: true,
  },
  {
    field: "role",
    headerName: "Role",
    searchable: true,
    sortable: true,
  },
];

describe("useDataTable server data", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches rows from the data source and exposes loading state", async () => {
    const dataSource = {
      getRows: vi.fn().mockResolvedValue({
        rows: [{ id: 1, name: "Marli", role: "admin" }],
        totalRows: 42,
      }),
    };

    const { result } = renderHook(() =>
      useDataTable<Row>({
        rows: [],
        columns,
        rowKey: "id",
        paginated: true,
        searchable: true,
        dataSource,
      }),
    );

    await waitFor(() => {
      expect(dataSource.getRows).toHaveBeenCalledTimes(1);
      expect(result.current.loading).toBe(false);
      expect(result.current.totalRows).toBe(42);
      expect(result.current.visibleRows).toEqual([
        { id: 1, name: "Marli", role: "admin" },
      ]);
    });
  });

  it("uses the default cache when revisiting the same page", async () => {
    const dataSource = {
      getRows: vi
        .fn()
        .mockImplementation(({ page }: { page: number }) =>
          Promise.resolve({
            rows: [{ id: page + 1, name: `Page ${page}`, role: "user" }],
            totalRows: 8,
          }),
        ),
    };

    const { result } = renderHook(() =>
      useDataTable<Row>({
        rows: [],
        columns,
        rowKey: "id",
        paginated: true,
        dataSource,
      }),
    );

    await waitFor(() => {
      expect(dataSource.getRows).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.setPage(1);
    });

    await waitFor(() => {
      expect(dataSource.getRows).toHaveBeenCalledTimes(2);
      expect(result.current.visibleRows[0]?.name).toBe("Page 1");
    });

    act(() => {
      result.current.setPage(0);
    });

    await waitFor(() => {
      expect(result.current.visibleRows[0]?.name).toBe("Page 0");
    });

    expect(dataSource.getRows).toHaveBeenCalledTimes(2);
  });

  it("sends server-side search, filters, and sorting params", async () => {
    const dataSource = {
      getRows: vi.fn().mockResolvedValue({
        rows: [{ id: 1, name: "Marli", role: "admin" }],
        totalRows: 1,
      }),
    };

    const { result } = renderHook(() =>
      useDataTable<Row>({
        rows: [],
        columns,
        rowKey: "id",
        paginated: true,
        searchable: true,
        searchDebounce: 0,
        dataSource,
      }),
    );

    await waitFor(() => {
      expect(dataSource.getRows).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.setPage(2);
    });

    await waitFor(() => {
      expect(dataSource.getRows).toHaveBeenLastCalledWith(
        expect.objectContaining({ page: 2 }),
      );
    });

    act(() => {
      result.current.setAdvancedFilters([
        {
          id: "filter-1",
          field: "role",
          operator: "equals",
          value: "admin",
          connector: "and",
        },
      ]);
      result.current.setSearch("mar");
      result.current.toggleSort("name", true);
    });

    await waitFor(() => {
      expect(dataSource.getRows).toHaveBeenLastCalledWith(
        expect.objectContaining({
          page: 0,
          sortField: "name",
          sortDirection: "ASC",
          search: "mar",
          filters: [
            {
              field: "role",
              operator: "equals",
              value: "admin",
              connector: "and",
            },
          ],
        }),
      );
    });
  });
});
