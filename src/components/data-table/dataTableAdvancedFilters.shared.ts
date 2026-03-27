import type { ReactNode } from "react";

import type {
  DataTableAdvancedFilter,
  DataTableAdvancedFilterConnector,
  DataTableAdvancedFilterOperator,
  DataTableRegularColumn,
} from "./types";

export const DATA_TABLE_ADVANCED_FILTER_OPERATOR_OPTIONS: Array<{
  value: DataTableAdvancedFilterOperator;
  label: string;
}> = [
  { value: "contains", label: "Contains" },
  { value: "notContains", label: "Does not contain" },
  { value: "equals", label: "Equals" },
  { value: "notEquals", label: "Does not equal" },
  { value: "startsWith", label: "Starts with" },
  { value: "endsWith", label: "Ends with" },
  { value: "isEmpty", label: "Is empty" },
  { value: "isNotEmpty", label: "Is not empty" },
];

export const DATA_TABLE_ADVANCED_FILTER_CONNECTOR_OPTIONS: Array<{
  value: DataTableAdvancedFilterConnector;
  label: string;
}> = [
  { value: "and", label: "And" },
  { value: "or", label: "Or" },
];

export const isAdvancedFilterValueRequired = (
  operator: DataTableAdvancedFilterOperator,
) => {
  return operator !== "isEmpty" && operator !== "isNotEmpty";
};

export const normalizeAdvancedFilterValue = (value: ReactNode) => {
  if (value == null) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value).toLowerCase();
  }

  return "";
};

export const getAdvancedFilterColumnLabel = <T extends Record<string, unknown>>(
  column: DataTableRegularColumn<T>,
) => {
  if (typeof column.headerName === "string") {
    return column.headerName;
  }

  return String(column.field);
};

export const isAdvancedFilterComplete = (
  filter: DataTableAdvancedFilter,
  availableFields: Set<string>,
) => {
  if (!availableFields.has(filter.field)) {
    return false;
  }

  if (!isAdvancedFilterValueRequired(filter.operator)) {
    return true;
  }

  return filter.value.trim().length > 0;
};

export const matchesAdvancedFilterValue = (
  source: string,
  operator: DataTableAdvancedFilterOperator,
  query: string,
) => {
  switch (operator) {
    case "contains":
      return source.includes(query);
    case "notContains":
      return !source.includes(query);
    case "equals":
      return source === query;
    case "notEquals":
      return source !== query;
    case "startsWith":
      return source.startsWith(query);
    case "endsWith":
      return source.endsWith(query);
    case "isEmpty":
      return source.length === 0;
    case "isNotEmpty":
      return source.length > 0;
    default:
      return true;
  }
};
