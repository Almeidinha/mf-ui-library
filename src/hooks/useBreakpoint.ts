import { type Breakpoint, breakpoints } from "foundation/breakpoints";

import { useMediaQuery } from "./useMediaQuery";

export function useBreakpointUp(
  breakpoint: Breakpoint,
  defaultMatches?: boolean,
): boolean {
  return useMediaQuery(breakpoints.up(breakpoint), { defaultMatches });
}

export function useBreakpointDown(
  breakpoint: Breakpoint,
  defaultMatches?: boolean,
): boolean {
  return useMediaQuery(breakpoints.down(breakpoint), { defaultMatches });
}

export function useBreakpointBetween(
  start: Breakpoint,
  end: Breakpoint,
  defaultMatches?: boolean,
): boolean {
  return useMediaQuery(breakpoints.between(start, end), { defaultMatches });
}

export function useBreakpointOnly(
  breakpoint: Breakpoint,
  defaultMatches?: boolean,
): boolean {
  return useMediaQuery(breakpoints.only(breakpoint), { defaultMatches });
}
