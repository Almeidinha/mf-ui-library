import { paginateRows } from "@helpers";

export interface IPagination {
  pageIndex: number;
  pageSize: number;
}

export function usePaginatedRows<D>(data: D[], pagination: IPagination) {
  const result = paginateRows(data, pagination.pageIndex, pagination.pageSize);

  return {
    rows: result.rows,
    pagination: {
      ...pagination,
      pageIndex: result.pageIndex,
      pageCount: result.pageCount,
    },
  };
}
