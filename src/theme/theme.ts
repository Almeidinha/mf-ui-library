import { type Breakpoints, breakpoints } from "foundation/breakpoints";

export const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#7928ca",
  },
  breakpoints,
};

export { ThemeProvider } from "styled-components";
export type MfUITheme = typeof theme;
export type MfUIBreakpoints = Breakpoints;
