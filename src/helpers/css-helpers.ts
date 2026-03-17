export function toCssSize(value?: number | string, fallback?: string) {
  if (typeof value === "number") {
    return `${value}px`;
  }

  if (typeof value === "string") {
    return value;
  }

  return fallback;
}
