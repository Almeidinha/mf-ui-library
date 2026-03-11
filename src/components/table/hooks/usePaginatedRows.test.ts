import { faker } from "@faker-js/faker";
import { renderHook } from "@testing-library/react";

import { usePaginatedRows } from "./usePaginatedRows";

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
  status: "Active",
  school: {
    name: schoolName,
    country: "Canada",
  },
  course: {
    name: "General English",
  },
});

const MOCK_DATA: Data[] = [];

for (let i = 0; i < 1000; i++) {
  MOCK_DATA.push(
    makeData(
      i.toString(),
      faker.person.fullName(),
      faker.internet.email(),
      faker.company.name(),
    ),
  );
}

describe("useFilteredRows", () => {
  it("should return rows equal to pageSize if there are enough", () => {
    const { result } = renderHook(() =>
      usePaginatedRows(MOCK_DATA, { pageIndex: 0, pageSize: 5 }),
    );

    expect(result.current.rows).toHaveLength(5);
  });

  it("should return less than pageSize if pageSize is too big", () => {
    const { result } = renderHook(() =>
      usePaginatedRows(MOCK_DATA, { pageIndex: 0, pageSize: 5000 }),
    );

    expect(result.current.rows).toHaveLength(1000);
  });

  it("should return results from the requested page", () => {
    const { result } = renderHook(() =>
      usePaginatedRows(MOCK_DATA, { pageIndex: 1, pageSize: 5 }),
    );

    expect(result.current.rows[0]).toEqual(MOCK_DATA[5]);
  });

  it("the last page should have a fewer results if total is not divisible evenly into page size", () => {
    const { result } = renderHook(() =>
      usePaginatedRows(MOCK_DATA, { pageIndex: 4, pageSize: 333 }),
    );

    expect(result.current.rows).toHaveLength(1);
  });

  it("should return the last possible page if you request a page that does not exist", () => {
    const { result } = renderHook(() =>
      usePaginatedRows(MOCK_DATA, { pageIndex: 5, pageSize: 333 }),
    );

    expect(result.current.pagination.pageIndex).toBe(3);
    expect(result.current.rows).toHaveLength(1);
  });

  it("should return the count of the number of pages", () => {
    const { result } = renderHook(() =>
      usePaginatedRows(MOCK_DATA, { pageIndex: 0, pageSize: 333 }),
    );

    expect(result.current.pagination.pageCount).toBe(4);
  });
});
