export type ColorPalette = {
  [key in string]: string;
};

export const WHITE = "#FFFFFF" as const;
export const BLACK = "#000000" as const;

export const GRAY = {
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#46505D",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
} as const;

export const BLUE = {
  50: "#F0F6FF",
  100: "#DBEAFE",
  200: "#BFDBFE",
  300: "#93C5FD",
  400: "#60A5FA",
  500: "#3B82F6",
  600: "#2563EB",
  700: "#1D4ED8",
  800: "#1E40AF",
  900: "#1E3A8A",
} as const;

export const VIOLET = {
  50: "#F5F3FF",
  100: "#EDE9FE",
  200: "#DDD6FE",
  300: "#C4B5FD",
  400: "#A78BFA",
  500: "#8B5CF6",
  600: "#7C3AED",
  700: "#6D28D9",
  800: "#5B21B6",
  900: "#4C1D95",
} as const;

export const CYAN = {
  50: "#ECFEFF",
  100: "#CFFAFE",
  200: "#A5F3FC",
  300: "#67E8F9",
  400: "#22D3EE",
  500: "#06B6D4",
  600: "#0891B2",
  700: "#0E7490",
  800: "#155E75",
  900: "#164E63",
} as const;

export const GREEN = {
  50: "#F1FEF8",
  100: "#D1FAE5",
  200: "#A7F3D0",
  300: "#6EE7B7",
  400: "#34D399",
  500: "#10B981",
  600: "#059669",
  700: "#047857",
  800: "#065F46",
  900: "#064E3B",
} as const;

export const ORANGE = {
  50: "#FFFAF5",
  100: "#FFEDD5",
  200: "#FED7AA",
  300: "#FDBA74",
  400: "#FB923C",
  500: "#F97316",
  600: "#EA580C",
  700: "#C2410C",
  800: "#9A3412",
  900: "#7C2D12",
} as const;

export const RED = {
  50: "#FEF6F6",
  100: "#FEE2E2",
  200: "#FECACA",
  300: "#FCA5A5", // @TODO we should update the current structure with the figma updates
  400: "#F87171",
  500: "#EF4444",
  600: "#DC2626",
  700: "#B91C1C",
  800: "#991B1B",
  900: "#7F1D1D",
} as const;

export const SHADES = {
  White: WHITE,
  Black: BLACK,
} as const;

export const BRAND = {
  Brand: "#0792D4",
} as const;

type ValuesOf<T> = T[keyof T];

export type COLOR =
  | ValuesOf<typeof BRAND>
  | ValuesOf<typeof BLUE>
  | ValuesOf<typeof CYAN>
  | ValuesOf<typeof SHADES>
  | ValuesOf<typeof RED>
  | ValuesOf<typeof ORANGE>
  | ValuesOf<typeof VIOLET>
  | ValuesOf<typeof GREEN>
  | ValuesOf<typeof GRAY>;
