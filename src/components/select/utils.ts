import { is, isDefined, isEmpty } from "@helpers";

import {
  IOption,
  IPosition,
  labelPositionType,
  menuPositionType,
  OptionItemState,
} from "./types";

function stableStringify(value: unknown): string {
  const seen = new WeakSet<object>();

  const hasToJSON = (v: object): v is { toJSON: () => unknown } => {
    return "toJSON" in v && typeof (v as { toJSON?: unknown }).toJSON === "function";
  };

  const normalize = (v: unknown): unknown => {
    if (v === null || v === undefined) {
      return v;
    }

    const t = typeof v;
    if (t === "string" || t === "number" || t === "boolean") {
      return v;
    }

    if (t === "bigint") {
      const bigintValue = v as bigint;
      return `${bigintValue.toString()}n`;
    }

    if (t === "symbol") {
      const symbolValue = v as symbol;
      return symbolValue.description
        ? `Symbol(${symbolValue.description})`
        : "Symbol()";
    }

    if (t === "function") {
      return "[Function]";
    }

    if (t !== "object") {
      return undefined;
    }

    if (v instanceof Date) {
      return { __type: "Date", value: v.getTime() };
    }

    if (hasToJSON(v)) {
      return normalize(v.toJSON());
    }

    if (seen.has(v)) {
      return { __type: "Circular" };
    }
    seen.add(v);

    if (Array.isArray(v)) {
      return v.map(normalize);
    }

    if (v instanceof Map) {
      const entries = Array.from(v.entries()).map(([k, val]) => [
        normalize(k),
        normalize(val),
      ]);

      entries.sort((a, b) =>
        JSON.stringify(a[0]).localeCompare(JSON.stringify(b[0])),
      );

      return { __type: "Map", value: entries };
    }

    if (v instanceof Set) {
      const values = Array.from(v.values()).map(normalize);
      values.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
      return { __type: "Set", value: values };
    }

    const record = v as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    const out: Record<string, unknown> = {};
    for (const k of keys) {
      out[k] = normalize(record[k]);
    }
    return out;
  };

  return JSON.stringify(normalize(value)) ?? "undefined";
}

export const defaultGetOptionKey = (value: unknown): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  return stableStringify(value);
};

export function equalByKey<T>(a: T, b: T, getKey: (v: T) => string): boolean {
  return getKey(a) === getKey(b);
}

export function getValueOptions<T>(
  options: IOption<T>[],
  value: T | T[] | undefined,
  multi: boolean | undefined,
  multiLevel: boolean | undefined,
  getKey: (v: T) => string,
): IOption<T>[] {
  const safeOptions = options ?? [];

  if (is(multiLevel)) {
    return getValueMultiLevelOptions(safeOptions, value, multi, getKey);
  }

  const byKey = new Map<string, IOption<T>>();
  for (const opt of safeOptions) {
    byKey.set(getKey(opt.value), opt);
  }

  if (is(multi) && Array.isArray(value)) {
    return value
      .map((v) => byKey.get(getKey(v)))
      .filter(Boolean) as IOption<T>[];
  }

  if (!Array.isArray(value) && value !== undefined && value !== null) {
    const match = byKey.get(getKey(value));
    return match ? [match] : [];
  }

  return [];
}

function flattenOptionsDeep<T>(options: IOption<T>[]): IOption<T>[] {
  const out: IOption<T>[] = [];
  const visit = (opts: IOption<T>[]) => {
    for (const opt of opts) {
      out.push(opt);
      if (Array.isArray(opt.options) && opt.options.length > 0) {
        visit(opt.options);
      }
    }
  };
  visit(options ?? []);
  return out;
}

function getValueMultiLevelOptions<T>(
  options: IOption<T>[],
  value: T | T[] | undefined,
  multi: boolean | undefined,
  getKey: (v: T) => string,
): IOption<T>[] {
  const flat = flattenOptionsDeep(options ?? []);

  const byKey = new Map<string, IOption<T>>();
  for (const opt of flat) {
    byKey.set(getKey(opt.value), opt);
  }

  if (is(multi) && Array.isArray(value)) {
    return value
      .map((v) => byKey.get(getKey(v)))
      .filter(Boolean) as IOption<T>[];
  }

  if (!Array.isArray(value) && value !== undefined && value !== null) {
    const match = byKey.get(getKey(value));
    return match ? [match] : [];
  }

  return [];
}

export const keys = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ENTER: "Enter",
  TAB: "Tab",
  ESC: "Escape",
  BACKSPACE: "Backspace",
  SPACE: " ",
};

export function toKey(value: unknown): string | number {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return stableStringify(value);
}

export const topPosition = ({
  menuPosition,
  menuHeight,
  label,
  labelPosition,
}: IPosition) => {
  if (
    menuPosition === menuPositionType.TOP &&
    isDefined(menuHeight) &&
    typeof menuHeight === "number"
  ) {
    return `${-(
      menuHeight +
      (isDefined(label) &&
      !isEmpty(label) &&
      labelPosition === labelPositionType.TOP
        ? 60
        : 42)
    )}px`;
  }
  return "4px";
};

export const getOptionState = (
  active?: boolean,
  selected?: boolean,
): OptionItemState => (active ? "active" : selected ? "selected" : "default");
