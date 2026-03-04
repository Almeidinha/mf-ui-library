import { compareValues } from "@helpers";

type SortableValue = string | number | boolean | null | undefined | Date;
export type SortGetter<D> = (row: D) => SortableValue;

export interface ISort<D> {
  direction: "ASC" | "DESC" | "NONE";
  getter: SortGetter<D>;
}

export function useSortedRows<D>(data: D[], sort: ISort<D>[]) {
  return sort.reduce((acc, el) => {
    const next = ([] as D[]).concat(acc);

    next.sort((a: D, b: D) => {
      const result = compareValues(el.getter(a), el.getter(b));

      switch (el.direction) {
        case "ASC":
          return result;
        case "DESC":
          return -result;
        default:
          return 0;
      }
    });

    return next;
  }, data);
}
