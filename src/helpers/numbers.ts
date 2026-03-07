export type Hex = `#${string}`;

export function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) {
    return min;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.max(min, Math.min(max, n));
}

export function toHex(n: number, length: number): Hex {
  return `#${n.toString(16).padStart(length, "0").toUpperCase()}`;
}

export function concatHex(a: Hex, b: Hex): Hex {
  return `#${a.slice(1) + b.slice(1)}`;
}

export function getNumberBetweenMinMax(
  input: number,
  min: number,
  max: number,
): number {
  return Math.max(min, Math.min(max, input));
}
