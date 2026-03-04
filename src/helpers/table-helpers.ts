export type SortDirection = "ASC" | "DESC" | "NONE";

export function getNextSortDirection(direction: SortDirection): SortDirection {
  switch (direction) {
    case "NONE":
      return "ASC";
    case "ASC":
      return "DESC";
    case "DESC":
    default:
      return "NONE";
  }
}

export function compareValues(a: unknown, b: unknown) {
  if (a == null && b == null) {
    return 0;
  }
  if (a == null) {
    return 1;
  }
  if (b == null) {
    return -1;
  }

  if (typeof a === "number" && typeof b === "number") {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  return String(a as unknown).localeCompare(String(b as unknown), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function paginateRows<T>(
  rows: T[],
  pageIndex: number,
  pageSize: number,
) {
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePageIndex = Math.min(Math.max(0, pageIndex), pageCount - 1);
  const start = safePageIndex * pageSize;

  return {
    rows: rows.slice(start, start + pageSize),
    pageIndex: safePageIndex,
    pageCount,
  };
}
