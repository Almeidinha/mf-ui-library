export function toCssSize(
  value?: number | string,
  fallback?: number | string,
): string {
  if (typeof value === "number") {
    return `${value}px`;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof fallback === "number") {
    return `${fallback}px`;
  }

  return typeof fallback === "string" ? fallback : "auto";
}
