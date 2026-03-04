import { renderHook } from "@testing-library/react";
import { useFilteredRows } from "./useFilteredRows";

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

const MOCK_DATA: Data[] = [
  makeData("1", "Bob", "bob@bob.com", "fire school"),
  makeData("2", "Jill", "bob@bob.com", "water school"),
  makeData("3", "Jim", "bob@bob.com", "earth school"),
  makeData("4", "Bennet", "bob@bob.com", "wind school"),
  makeData("5", "Jaime", "bob@bob.com", "fire school"),
  makeData("6", "Bryant", "bob@bob.com", "water school"),
  makeData("7", "Julia", "bob@bob.com", "earth school"),
  makeData("8", "Beth", "bob@bob.com", "wind school"),
  makeData("9", "Justine", "bob@bob.com", "fire school"),
  makeData("10", "Bernard", "bob@bob.com", "water school"),
  makeData("11", "Joaquin", "bob@bob.com", "earth school"),
  makeData("12", "Bobette", "bob@bob.com", "wind school"),
];

describe("useFilteredRows", () => {
  it("should not fuzzy match across columns", () => {
    const data = MOCK_DATA.concat(makeData("13", "x", "y", "z"));

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: "xyz", mode: "fuzzy" }),
    );

    expect(result.current).toHaveLength(0);
  });

  it("should fuzzy match within a column", () => {
    const data = MOCK_DATA.concat(
      makeData("13", "Exlyzer", "xlzr@bob.com", "Magic School"),
    );

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: "xyz", mode: "fuzzy" }),
    );

    expect(result.current).toHaveLength(1);
  });

  it("should not fuzzy match when mode is exact", () => {
    const data = MOCK_DATA.concat(
      makeData("13", "Exlyzer", "xlzr@bob.com", "Magic School"),
    );

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: "xyz", mode: "exact" }),
    );

    expect(result.current).toHaveLength(0);
  });

  it("should find exact matches when mode is exact", () => {
    const data = MOCK_DATA.concat(
      makeData("13", "Exlyzer", "xlzr@bob.com", "Magic School"),
    );

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: "Exlyzer", mode: "exact" }),
    );

    expect(result.current).toHaveLength(1);
  });

  it("should find exact matches in any column, not just the first", () => {
    const data = MOCK_DATA.concat(
      makeData("13", "Exlyzer", "xlzr@bob.com", "Magic School"),
    );

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: "Magic School", mode: "exact" }),
    );

    expect(result.current).toHaveLength(1);
  });

  it("should ignore case when finding exact matches", () => {
    const data = MOCK_DATA.concat(
      makeData("13", "Exlyzer", "xlzr@bob.com", "Magic School"),
    );

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: "magic school", mode: "exact" }),
    );

    expect(result.current).toHaveLength(1);
  });

  it("should not filter if filter string is empty", () => {
    const data = MOCK_DATA;

    const { result } = renderHook(() => useFilteredRows(data, { fn: "" }));

    expect(result.current).toHaveLength(MOCK_DATA.length);
  });

  it("should not filter if filter string is nil", () => {
    const data = MOCK_DATA;

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: undefined }),
    );

    expect(result.current).toHaveLength(MOCK_DATA.length);
  });

  it("should filter by the given function", () => {
    const data = MOCK_DATA;

    const { result } = renderHook(() =>
      useFilteredRows(data, { fn: (el: Data) => /fire/i.test(el.school.name) }),
    );

    expect(result.current).toHaveLength(3);
  });
});
