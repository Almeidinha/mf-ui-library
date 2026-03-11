import { isDefined } from "helpers/safe-navigation";
import { getNextSortDirection } from "helpers/table-helpers";
import { useReducer } from "react";

import { IFilter, useFilteredRows } from "./useFilteredRows";
import { IPagination, usePaginatedRows } from "./usePaginatedRows";
import { ISort, SortGetter, useSortedRows } from "./useSortedRows";

export interface IUseTableProps<D> {
  data: D[];
  initialState: IInitialTableState<D>;
}

export interface IUseTableResult<D> {
  rows: D[];
  allRows: D[];
  goto: (pageIndex: number) => void;
  sortBy: (sort: { id: string; getter: SortGetter<D> }) => void;
  getSort: (id: string) => "ASC" | "DESC" | "NONE";
  filterBy: (filter: string | ((el: D) => boolean)) => void;
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
}

export function useTable<D>(props: IUseTableProps<D>): IUseTableResult<D> {
  const [state, dispatch] = useReducer(reducer<D>, props.initialState, init<D>);

  const filteredRows = useFilteredRows(props.data, state.filter);
  const sortedRows = useSortedRows(filteredRows, state.sort);
  const { rows, pagination } = usePaginatedRows(sortedRows, state.pagination);

  return {
    rows,
    allRows: props.data,
    goto: (change) => dispatch({ type: "goto", payload: change }),
    sortBy: (sort: { id: string; getter: SortGetter<D> }) =>
      dispatch({ type: "sort", payload: sort }),
    getSort: (id: string) => {
      const sort = state.sort.find(
        (el: ISort<D> & { id: string }) => el.id === id,
      );

      return isDefined(sort) ? sort?.direction : "NONE";
    },
    filterBy: (filter: string | ((el: D) => boolean)) =>
      dispatch({ type: "filter", payload: filter }),
    pagination,
  };
}

export interface ITableState<D> {
  pagination: IPagination;
  filter: IFilter<D>;
  sort: (ISort<D> & { id: string })[];
}

interface IInitialTableState<D> {
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  filter?: {
    fn: string | ((el: D) => boolean);
    mode: "fuzzy" | "exact";
  };
  // index, getter
  sort?: {
    id: string;
    getter: SortGetter<D>;
    direction: "ASC" | "DESC";
  }[];
}

type TableAction<D> =
  | {
      type: "goto";
      payload: number;
    }
  | {
      type: "sort";
      payload: {
        id: string;
        getter: SortGetter<D>;
      };
    }
  | {
      type: "filter";
      payload: string | ((el: D) => boolean);
    };

function reducer<D>(
  state: ITableState<D>,
  action: TableAction<D>,
): ITableState<D> {
  switch (action.type) {
    case "goto": {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageIndex: action.payload,
        },
      };
    }
    case "filter": {
      return {
        ...state,
        filter: {
          ...state.filter,
          fn: action.payload,
        },
      };
    }
    case "sort": {
      const nextSort = action.payload;
      const index = state.sort.findIndex((el) => el.id === nextSort.id);

      if (index < 0) {
        // create the sort
        // the newest sorts are added to the start
        // so that you filter progressively
        const next = [
          { ...nextSort, direction: "DESC" as "ASC" | "DESC" | "NONE" },
        ].concat(state.sort);

        return {
          ...state,
          sort: next,
        };
      }

      const existingSort = state.sort[index];
      const direction = getNextSortDirection(existingSort.direction);

      if (direction === "NONE") {
        // remove the sort
        return {
          ...state,
          sort: [...state.sort.slice(0, index), ...state.sort.slice(index + 1)],
        };
      }

      // replace the old sort with the new one
      return {
        ...state,
        sort: [
          ...state.sort.slice(0, index),
          { ...nextSort, direction },
          ...state.sort.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
}

const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 10,
};

function init<D>(initial: IInitialTableState<D>): ITableState<D> {
  return {
    pagination: {
      ...DEFAULT_PAGINATION,
      ...initial.pagination,
    },
    filter: {
      mode: "exact",
    },
    sort: [],
    ...initial,
  };
}
