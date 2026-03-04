import { renderHook } from "@testing-library/react";
import { useSortedRows } from "./useSortedRows";

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
  makeData("7", "Julia", "jill@bob.com", "earth school"),
  makeData("8", "Beth", "jill@bob.com", "wind school"),
  makeData("9", "Justine", "jill@bob.com", "fire school"),
  makeData("10", "Bernard", "jill@bob.com", "water school"),
  makeData("11", "Joaquin", "jill@bob.com", "earth school"),
  makeData("12", "Bobette", "jill@bob.com", "wind school"),
];

describe("useFilteredRows", () => {
  it("should sort by the given getter", () => {
    const { result } = renderHook(() =>
      useSortedRows(MOCK_DATA, [
        { direction: "ASC", getter: (el) => el.user.name },
      ]),
    );

    const SORTED: Data[] = [
      makeData("4", "Bennet", "bob@bob.com", "wind school"),
      makeData("10", "Bernard", "jill@bob.com", "water school"),
      makeData("8", "Beth", "jill@bob.com", "wind school"),
      makeData("1", "Bob", "bob@bob.com", "fire school"),
      makeData("12", "Bobette", "jill@bob.com", "wind school"),
      makeData("6", "Bryant", "bob@bob.com", "water school"),
      makeData("5", "Jaime", "bob@bob.com", "fire school"),
      makeData("2", "Jill", "bob@bob.com", "water school"),
      makeData("3", "Jim", "bob@bob.com", "earth school"),
      makeData("11", "Joaquin", "jill@bob.com", "earth school"),
      makeData("7", "Julia", "jill@bob.com", "earth school"),
      makeData("9", "Justine", "jill@bob.com", "fire school"),
    ];

    expect(result.current).toEqual(SORTED);
  });

  it("should sort by multiple getters when there is a type", () => {
    const { result } = renderHook(() =>
      useSortedRows(MOCK_DATA, [
        { direction: "ASC", getter: (el) => el.user.name },
        { direction: "ASC", getter: (el) => el.school.name },
        { direction: "ASC", getter: (el) => el.user.email },
      ]),
    );

    /** it sorts first by name, then by school, then by email... so all
     * the emails will be grouped, then all the schools, then names
     */
    const SORTED: Data[] = [
      makeData("3", "Jim", "bob@bob.com", "earth school"),
      makeData("1", "Bob", "bob@bob.com", "fire school"),
      makeData("5", "Jaime", "bob@bob.com", "fire school"),
      makeData("6", "Bryant", "bob@bob.com", "water school"),
      makeData("2", "Jill", "bob@bob.com", "water school"),
      makeData("4", "Bennet", "bob@bob.com", "wind school"),
      makeData("11", "Joaquin", "jill@bob.com", "earth school"),
      makeData("7", "Julia", "jill@bob.com", "earth school"),
      makeData("9", "Justine", "jill@bob.com", "fire school"),
      makeData("10", "Bernard", "jill@bob.com", "water school"),
      makeData("8", "Beth", "jill@bob.com", "wind school"),
      makeData("12", "Bobette", "jill@bob.com", "wind school"),
    ];

    expect(result.current).toEqual(SORTED);
  });
});
