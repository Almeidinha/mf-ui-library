import { Breakpoint, breakpoints } from "foundation/breakpoints";
import React from "react";
import styled from "styled-components";

const BREAKPOINT_KEYS = new Set<Breakpoint>(breakpoints.keys);
const UNIT_LESS_PROPERTIES = new Set([
  "flex",
  "flex-grow",
  "flex-shrink",
  "font-weight",
  "line-height",
  "opacity",
  "order",
  "orphans",
  "widows",
  "z-index",
  "zoom",
]);
const SPACING_PROPERTIES = new Set([
  "bottom",
  "column-gap",
  "gap",
  "inset",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "left",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "right",
  "row-gap",
  "top",
]);
const SIZING_PROPERTIES = new Set([
  "border-bottom-width",
  "border-left-width",
  "border-right-width",
  "border-top-width",
  "border-width",
  "font-size",
  "height",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "outline-offset",
  "outline-width",
  "width",
]);
const SHADOW_LEVELS = [
  "none",
  "0px 1px 2px rgba(0, 0, 0, 0.05)",
  "0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.04)",
  "0px 2px 10px rgba(0, 0, 0, 0.1)",
  "0px 4px 12px rgba(0, 0, 0, 0.12)",
  "0px 6px 16px rgba(0, 0, 0, 0.14)",
  "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "0px 12px 20px rgba(0, 0, 0, 0.14)",
  "0px 14px 24px rgba(0, 0, 0, 0.16)",
  "0px 16px 28px rgba(0, 0, 0, 0.18)",
  "0px 18px 30px rgba(0, 0, 0, 0.18)",
  "0px 20px 32px rgba(0, 0, 0, 0.2)",
  "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "0px 22px 36px rgba(0, 0, 0, 0.2)",
  "0px 24px 40px rgba(0, 0, 0, 0.2)",
  "0px 26px 42px rgba(0, 0, 0, 0.22)",
  "0px 28px 44px rgba(0, 0, 0, 0.22)",
  "0px 30px 46px rgba(0, 0, 0, 0.24)",
  "0px 32px 48px rgba(0, 0, 0, 0.24)",
  "0px 34px 50px rgba(0, 0, 0, 0.24)",
  "0px 36px 52px rgba(0, 0, 0, 0.24)",
  "0px 38px 54px rgba(0, 0, 0, 0.24)",
  "0px 40px 56px rgba(0, 0, 0, 0.25)",
  "0px 42px 58px rgba(0, 0, 0, 0.25)",
  "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
] as const;

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

type SxScalar = number | string;
type SxEntry = false | null | SxObject | undefined;

export type SxObject = {
  [key: string]:
    | SxObject
    | SxScalar
    | null
    | undefined
    | Partial<Record<Breakpoint, SxObject | SxScalar | null | undefined>>;
};

export type SxProps = SxEntry[] | SxObject;

export type LayoutPrimitiveProps = {
  component?: React.ElementType;
  sx?: SxProps;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function camelToKebabCase(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function isBreakpointKey(value: string): value is Breakpoint {
  return BREAKPOINT_KEYS.has(value as Breakpoint);
}

function isSelectorKey(value: string) {
  return (
    value.startsWith("&") ||
    value.startsWith(":") ||
    value.startsWith("@") ||
    value.startsWith("[") ||
    value.startsWith(">") ||
    value.startsWith(".")
  );
}

function isResponsiveValueObject(value: Record<string, unknown>) {
  const keys = Object.keys(value);

  return keys.length > 0 && keys.every(isBreakpointKey);
}

function toSpacing(value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  if (value === 0) {
    return "0";
  }

  return `${value * 8}px`;
}

function toSizing(value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  if (value === 0) {
    return "0";
  }

  if (value > 0 && value <= 1) {
    return `${value * 100}%`;
  }

  return `${value}px`;
}

function toBorderRadius(value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  if (value === 0) {
    return "0";
  }

  return `${value * 4}px`;
}

function toShadow(value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  const index = Math.max(
    0,
    Math.min(Math.round(value), SHADOW_LEVELS.length - 1),
  );
  return SHADOW_LEVELS[index];
}

function toGenericCssValue(property: string, value: number | string) {
  if (typeof value === "string") {
    return value;
  }

  if (value === 0) {
    return "0";
  }

  if (SPACING_PROPERTIES.has(property)) {
    return toSpacing(value);
  }

  if (SIZING_PROPERTIES.has(property)) {
    return toSizing(value);
  }

  if (property === "border-radius") {
    return toBorderRadius(value);
  }

  if (property === "box-shadow") {
    return toShadow(value);
  }

  if (UNIT_LESS_PROPERTIES.has(property)) {
    return String(value);
  }

  return `${value}px`;
}

function getPropertyAliases(property: string) {
  switch (property) {
    case "bgcolor":
      return ["background-color"];
    case "m":
      return ["margin"];
    case "mt":
      return ["margin-top"];
    case "mr":
      return ["margin-right"];
    case "mb":
      return ["margin-bottom"];
    case "ml":
      return ["margin-left"];
    case "mx":
      return ["margin-left", "margin-right"];
    case "my":
      return ["margin-top", "margin-bottom"];
    case "p":
      return ["padding"];
    case "pt":
      return ["padding-top"];
    case "pr":
      return ["padding-right"];
    case "pb":
      return ["padding-bottom"];
    case "pl":
      return ["padding-left"];
    case "px":
      return ["padding-left", "padding-right"];
    case "py":
      return ["padding-top", "padding-bottom"];
    default:
      return [camelToKebabCase(property)];
  }
}

function renderDeclaration(property: string, value: number | string): string {
  return getPropertyAliases(property)
    .map((alias) => `${alias}: ${toGenericCssValue(alias, value)};`)
    .join("\n");
}

function renderResponsiveDeclaration(
  property: string,
  value: Partial<Record<Breakpoint, SxObject | SxScalar | null | undefined>>,
): string {
  return breakpoints.keys
    .map((breakpoint): string => {
      const breakpointValue = value[breakpoint];

      if (breakpointValue == null) {
        return "";
      }

      if (
        typeof breakpointValue !== "string" &&
        typeof breakpointValue !== "number"
      ) {
        return `${breakpoints.up(breakpoint)} { ${renderStyleObject(breakpointValue)} }`;
      }

      return `${breakpoints.up(breakpoint)} { ${renderDeclaration(property, breakpointValue)} }`;
    })
    .join("\n");
}

function renderStyleObject(styleObject: SxObject): string {
  return Object.entries(styleObject)
    .map(([key, rawValue]): string => {
      if (rawValue == null) {
        return "";
      }

      if (isBreakpointKey(key) && isPlainObject(rawValue)) {
        return `${breakpoints.up(key)} { ${renderStyleObject(rawValue as SxObject)} }`;
      }

      if (isSelectorKey(key) && isPlainObject(rawValue)) {
        return `${key} { ${renderStyleObject(rawValue as SxObject)} }`;
      }

      if (isPlainObject(rawValue) && isResponsiveValueObject(rawValue)) {
        return renderResponsiveDeclaration(
          key,
          rawValue as Partial<
            Record<Breakpoint, SxObject | SxScalar | null | undefined>
          >,
        );
      }

      if (isPlainObject(rawValue)) {
        return `${key} { ${renderStyleObject(rawValue as SxObject)} }`;
      }

      return renderDeclaration(key, rawValue);
    })
    .filter(Boolean)
    .join("\n");
}

export function renderSx(sx?: SxProps) {
  if (!sx) {
    return "";
  }

  const styles = Array.isArray(sx) ? sx : [sx];

  return styles
    .filter((entry): entry is SxObject => Boolean(entry))
    .map((entry) => renderStyleObject(entry))
    .join("\n");
}

export function mergeSx(base: SxObject, sx?: SxProps): SxProps {
  if (!sx) {
    return [base];
  }

  return Array.isArray(sx) ? [base, ...sx] : [base, sx];
}

export const SystemRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$sx",
})<{ $sx?: SxProps }>`
  ${({ $sx }) => renderSx($sx)}
`;
