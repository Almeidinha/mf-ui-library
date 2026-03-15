export const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 768,
  lg: 1040,
  xl: 1440,
} as const;

export type Breakpoint = keyof typeof breakpointValues;
export type BreakpointValues = typeof breakpointValues;
const breakpointStep = 5;

function getBreakpointValue(
  values: BreakpointValues,
  breakpoint: Breakpoint | number,
) {
  return typeof breakpoint === "number" ? breakpoint : values[breakpoint];
}

export function createBreakpoints(values: BreakpointValues = breakpointValues) {
  const keys = Object.keys(values) as Breakpoint[];

  const up = (breakpoint: Breakpoint | number) =>
    `@media (min-width:${getBreakpointValue(values, breakpoint)}px)`;

  const down = (breakpoint: Breakpoint | number) =>
    `@media (max-width:${getBreakpointValue(values, breakpoint) - breakpointStep / 100}px)`;

  const between = (start: Breakpoint | number, end: Breakpoint | number) =>
    `@media (min-width:${getBreakpointValue(values, start)}px) and (max-width:${getBreakpointValue(values, end) - breakpointStep / 100}px)`;

  const only = (breakpoint: Breakpoint) => {
    const currentIndex = keys.indexOf(breakpoint);
    const nextBreakpoint = keys[currentIndex + 1];

    if (!nextBreakpoint) {
      return up(breakpoint);
    }

    return between(breakpoint, nextBreakpoint);
  };

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
  };
}

export const breakpoints = createBreakpoints();

export type Breakpoints = typeof breakpoints;
