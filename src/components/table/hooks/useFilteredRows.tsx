import { isEmpty, isNil, isObject, isString } from "@helpers";
import { useMemo } from "react";

export interface IFilter<D> {
  fn?: string | ((el: D) => boolean);
  mode?: "fuzzy" | "exact";
}

export function useFilteredRows<D>(data: D[], state: IFilter<D>): D[] {
  // first memoize the data in fuzzy filterable form
  // ie turn each object into a flat array of strings
  const filterableData = useMemo(() => {
    return data.map((el) => {
      return flatValues(el);
    });
  }, [data]);

  const filter = state.fn;

  if (isNil(filter)) {
    return data;
  }

  if (isString(filter)) {
    if (isEmpty(filter)) {
      return data;
    }

    const match = state.mode === "fuzzy" ? fuzzyMatch : exactMatch;

    return data.filter((_, index) =>
      filterableData[index].some((el) => match(el, filter)),
    );
  }

  return data.filter(filter);
}

// exact match up to case
function exactMatch(str: string, pattern: string) {
  return new RegExp(pattern, "i").test(str);
}

/** @see https://codereview.stackexchange.com/a/23905 */
function fuzzyMatch(str: string, pattern: string) {
  pattern = pattern.split("").reduce(function (a, b) {
    return a + "[^" + b + "]*" + b;
  });

  return new RegExp(pattern).test(str);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flatValues(obj: any): string[] {
  return Object.keys(obj).flatMap((key) => {
    const value = obj[key];

    if (isObject(value)) {
      return flatValues(value);
    }

    return [value.toString()];
  });
}
