import { type Breakpoints, breakpoints } from "foundation/breakpoints";
import {
  BLACK,
  BLUE,
  CYAN,
  GRAY,
  GREEN,
  ORANGE,
  RED,
  VIOLET,
  WHITE,
} from "foundation/colors/base-palette";
import { clamp, concatHex, type Hex, toHex } from "helpers";
import {
  createElement,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";

type ThemeMode = "light" | "dark";

interface NestedTokens {
  [key: string]: string | NestedTokens;
}

type SemanticColors = {
  Background: {
    Default: string;
    White: string;
    Muted: string;
    Inverse: string;
    Overlay: string;
  };
  Surface: {
    Default: {
      Default: string;
      Muted: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Inverse: string;
    };
    Selected: {
      Soft: string;
      Muted: string;
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
    };
    Critical: {
      Soft: string;
      Default: string;
      Muted: string;
      Hover: string;
      Pressed: string;
      Active: string;
    };
    Warning: {
      Soft: string;
      Hover: string;
      Default: string;
      Pressed: string;
      Muted: string;
      Active: string;
    };
    Success: {
      Soft: string;
      Hover: string;
      Default: string;
      Pressed: string;
      Muted: string;
      Active: string;
    };
    Highlight: {
      Soft: string;
      Hover: string;
      Default: string;
      Pressed: string;
      Muted: string;
      Active: string;
    };
    Neutral: {
      Soft: string;
      Default: string;
      Muted: string;
      Hover: string;
      Pressed: string;
      Active: string;
    };
    Violet: {
      Soft: string;
      Hover: string;
      Default: string;
      Pressed: string;
      Muted: string;
      Active: string;
    };
    Cyan: {
      Soft: string;
      Hover: string;
      Default: string;
      Pressed: string;
      Muted: string;
      Active: string;
    };
  };
  Borders: {
    Default: {
      Default: string;
      Muted: string;
      Soft: string;
      Dark: string;
      Active: string;
    };
    Critical: {
      Soft: string;
      Default: string;
      Muted: string;
      Active: string;
    };
    Warning: {
      Soft: string;
      Default: string;
      Muted: string;
      Active: string;
    };
    Success: {
      Soft: string;
      Default: string;
      Dark: string;
      Muted: string;
      Active: string;
    };
    Highlight: {
      Soft: string;
      Default: string;
      Muted: string;
      Active: string;
    };
    Neutral: {
      Soft: string;
      Default: string;
      Muted: string;
      Active: string;
    };
    Violet: {
      Soft: string;
      Default: string;
      Muted: string;
      Active: string;
    };
    Cyan: {
      Soft: string;
      Default: string;
      Muted: string;
      Active: string;
    };
  };
  Focus: {
    Default: string;
    Critical: string;
  };
  Text: {
    Default: string;
    Neutral: string;
    Muted: string;
    Soft: string;
    Disabled: string;
    Critical: string;
    Warning: string;
    Success: string;
    Active: string;
    Highlight: string;
    Violet: string;
    Cyan: string;
    OnPrimary: string;
    OnCritical: string;
    OnInverse: string;
  };
  Icons: {
    Default: string;
    Muted: string;
    Hover: string;
    Pressed: string;
    Disabled: string;
    Critical: string;
    Warning: string;
    Success: string;
    Highlight: string;
    OnPrimary: string;
    OnCritical: string;
    OnInverse: string;
  };
  Interactive: {
    Default: {
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Disabled: string;
    };
    Subtle: {
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Disabled: string;
    };
  };
  Actions: {
    Primary: {
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Disabled: string;
    };
    Secondary: {
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Disabled: string;
    };
    Critical: {
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Disabled: string;
    };
    SecondaryCritical: {
      Default: string;
      Hover: string;
      Pressed: string;
      Active: string;
      Disabled: string;
    };
  };
};

type ThemeShadows = {
  shadowSm: string;
  shadow: string;
  shadowMd: string;
  shadowLg: string;
  shadowXl: string;
  shadow2Xl: string;
  shadowInner: string;
};

type ThemePrimitives = {
  background: string;
  foreground: string;
};

export type MfUITheme = {
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
  };
  breakpoints: Breakpoints;
  semanticColors: SemanticColors;
  shadows: ThemeShadows;
  primitives: ThemePrimitives;
};

export type MfUIBreakpoints = Breakpoints;
export type MfUIThemeMode = ThemeMode;

function addOpacity(hex: Hex, opacity: number): Hex {
  const opacityHex = toHex(clamp(Math.floor(0xff * opacity), 0, 0xff), 2);
  return concatHex(hex, opacityHex);
}

const lightDisabledGray = addOpacity(GRAY[800], 0.06);
const lightPressedGray = addOpacity(GRAY[800], 0.12);

const lightSemanticColors: SemanticColors = {
  Background: {
    Default: GRAY[100],
    White: WHITE,
    Muted: GRAY[50],
    Inverse: GRAY[900],
    Overlay: addOpacity(GRAY[800], 0.6),
  },
  Surface: {
    Default: {
      Default: WHITE,
      Muted: GRAY[50],
      Hover: GRAY[100],
      Pressed: GRAY[200],
      Active: GRAY[200],
      Inverse: GRAY[800],
    },
    Selected: {
      Soft: BLUE[50],
      Muted: BLUE[50],
      Default: BLUE[50],
      Hover: BLUE[100],
      Pressed: BLUE[200],
      Active: BLUE[500],
    },
    Critical: {
      Soft: RED[50],
      Default: RED[200],
      Muted: RED[50],
      Hover: RED[50],
      Pressed: RED[100],
      Active: RED[300],
    },
    Warning: {
      Soft: ORANGE[50],
      Hover: ORANGE[100],
      Default: ORANGE[200],
      Pressed: ORANGE[300],
      Muted: ORANGE[50],
      Active: ORANGE[500],
    },
    Success: {
      Soft: GREEN[50],
      Hover: GREEN[100],
      Default: GREEN[200],
      Pressed: GREEN[300],
      Muted: GREEN[50],
      Active: GREEN[500],
    },
    Highlight: {
      Soft: BLUE[50],
      Hover: BLUE[100],
      Default: BLUE[200],
      Pressed: BLUE[300],
      Muted: BLUE[50],
      Active: BLUE[500],
    },
    Neutral: {
      Soft: GRAY[50],
      Default: GRAY[200],
      Muted: GRAY[100],
      Hover: GRAY[300],
      Pressed: GRAY[400],
      Active: GRAY[500],
    },
    Violet: {
      Soft: VIOLET[50],
      Hover: VIOLET[100],
      Default: VIOLET[200],
      Pressed: VIOLET[300],
      Muted: VIOLET[50],
      Active: VIOLET[600],
    },
    Cyan: {
      Soft: CYAN[50],
      Hover: CYAN[100],
      Default: CYAN[200],
      Pressed: CYAN[300],
      Muted: CYAN[50],
      Active: CYAN[600],
    },
  },
  Borders: {
    Default: {
      Default: GRAY[300],
      Muted: GRAY[200],
      Soft: WHITE,
      Dark: GRAY[400],
      Active: GRAY[500],
    },
    Critical: {
      Soft: RED[50],
      Default: RED[600],
      Muted: RED[300],
      Active: RED[700],
    },
    Warning: {
      Soft: ORANGE[50],
      Default: ORANGE[300],
      Muted: ORANGE[300],
      Active: ORANGE[500],
    },
    Success: {
      Soft: GREEN[50],
      Default: GREEN[200],
      Dark: GREEN[300],
      Muted: GREEN[50],
      Active: GREEN[500],
    },
    Highlight: {
      Soft: BLUE[50],
      Default: BLUE[200],
      Muted: BLUE[50],
      Active: BLUE[500],
    },
    Neutral: {
      Soft: GRAY[50],
      Default: GRAY[300],
      Muted: GRAY[100],
      Active: GRAY[500],
    },
    Violet: {
      Soft: VIOLET[50],
      Default: VIOLET[200],
      Muted: VIOLET[50],
      Active: VIOLET[500],
    },
    Cyan: {
      Soft: CYAN[50],
      Default: CYAN[200],
      Muted: CYAN[50],
      Active: CYAN[500],
    },
  },
  Focus: {
    Default: BLUE[400],
    Critical: RED[400],
  },
  Text: {
    Default: GRAY[800],
    Neutral: GRAY[700],
    Muted: GRAY[500],
    Soft: GRAY[400],
    Disabled: GRAY[500],
    Critical: RED[600],
    Warning: ORANGE[700],
    Success: GREEN[600],
    Active: BLUE[600],
    Highlight: BLUE[600],
    Violet: VIOLET[700],
    Cyan: CYAN[700],
    OnPrimary: WHITE,
    OnCritical: WHITE,
    OnInverse: WHITE,
  },
  Icons: {
    Default: GRAY[500],
    Muted: GRAY[400],
    Hover: GRAY[800],
    Pressed: GRAY[600],
    Disabled: GRAY[400],
    Critical: RED[600],
    Warning: ORANGE[500],
    Success: GREEN[600],
    Highlight: BLUE[600],
    OnPrimary: WHITE,
    OnCritical: WHITE,
    OnInverse: WHITE,
  },
  Interactive: {
    Default: {
      Default: BLUE[600],
      Hover: BLUE[800],
      Pressed: BLUE[800],
      Active: BLUE[900],
      Disabled: GRAY[400],
    },
    Subtle: {
      Default: GRAY[800],
      Hover: GRAY[800],
      Pressed: GRAY[800],
      Active: GRAY[900],
      Disabled: GRAY[400],
    },
  },
  Actions: {
    Primary: {
      Default: BLUE[600],
      Hover: BLUE[700],
      Pressed: BLUE[800],
      Active: BLUE[900],
      Disabled: lightDisabledGray,
    },
    Secondary: {
      Default: WHITE,
      Hover: lightDisabledGray,
      Pressed: lightPressedGray,
      Active: GRAY[500],
      Disabled: lightDisabledGray,
    },
    Critical: {
      Default: RED[600],
      Hover: RED[700],
      Pressed: RED[800],
      Active: RED[900],
      Disabled: lightDisabledGray,
    },
    SecondaryCritical: {
      Default: WHITE,
      Hover: RED[700],
      Pressed: RED[800],
      Active: RED[900],
      Disabled: lightDisabledGray,
    },
  },
};

const darkDisabledGray = addOpacity(WHITE, 0.08);
const darkPressedGray = addOpacity(WHITE, 0.14);

const darkSemanticColors: SemanticColors = {
  Background: {
    Default: "#0B1220",
    White: WHITE,
    Muted: "#111827",
    Inverse: "#F9FAFB",
    Overlay: addOpacity(BLACK, 0.72),
  },
  Surface: {
    Default: {
      Default: "#111827",
      Muted: "#1F2937",
      Hover: "#273244",
      Pressed: "#334155",
      Active: "#334155",
      Inverse: "#F9FAFB",
    },
    Selected: {
      Soft: "#102A56",
      Muted: "#102A56",
      Default: "#183A76",
      Hover: "#1D4E96",
      Pressed: "#2563EB",
      Active: BLUE[400],
    },
    Critical: {
      Soft: "#3F161A",
      Default: "#5D1F24",
      Muted: "#3F161A",
      Hover: "#6B2128",
      Pressed: "#7F1D1D",
      Active: RED[400],
    },
    Warning: {
      Soft: "#42210C",
      Hover: "#5A2D0F",
      Default: "#6B3A13",
      Pressed: "#7C2D12",
      Muted: "#42210C",
      Active: ORANGE[400],
    },
    Success: {
      Soft: "#0B2F25",
      Hover: "#0E3C2F",
      Default: "#125040",
      Pressed: "#065F46",
      Muted: "#0B2F25",
      Active: GREEN[400],
    },
    Highlight: {
      Soft: "#102A56",
      Hover: "#1D4E96",
      Default: "#183A76",
      Pressed: "#2563EB",
      Muted: "#102A56",
      Active: BLUE[400],
    },
    Neutral: {
      Soft: "#1F2937",
      Default: "#273244",
      Muted: "#1F2937",
      Hover: "#334155",
      Pressed: "#46505D",
      Active: GRAY[400],
    },
    Violet: {
      Soft: "#26164A",
      Hover: "#3A2370",
      Default: "#4C1D95",
      Pressed: "#5B21B6",
      Muted: "#26164A",
      Active: VIOLET[400],
    },
    Cyan: {
      Soft: "#0B2A33",
      Hover: "#0E3C4B",
      Default: "#155E75",
      Pressed: "#0E7490",
      Muted: "#0B2A33",
      Active: CYAN[400],
    },
  },
  Borders: {
    Default: {
      Default: "#334155",
      Muted: "#273244",
      Soft: "#1F2937",
      Dark: "#46505D",
      Active: "#6B7280",
    },
    Critical: {
      Soft: "#3F161A",
      Default: RED[400],
      Muted: "#7F1D1D",
      Active: RED[300],
    },
    Warning: {
      Soft: "#42210C",
      Default: ORANGE[400],
      Muted: "#7C2D12",
      Active: ORANGE[300],
    },
    Success: {
      Soft: "#0B2F25",
      Default: GREEN[400],
      Dark: GREEN[500],
      Muted: "#065F46",
      Active: GREEN[300],
    },
    Highlight: {
      Soft: "#102A56",
      Default: BLUE[400],
      Muted: "#1D4ED8",
      Active: BLUE[300],
    },
    Neutral: {
      Soft: "#1F2937",
      Default: "#46505D",
      Muted: "#273244",
      Active: "#CBD5E1",
    },
    Violet: {
      Soft: "#26164A",
      Default: VIOLET[400],
      Muted: "#3A2370",
      Active: VIOLET[300],
    },
    Cyan: {
      Soft: "#0B2A33",
      Default: CYAN[400],
      Muted: "#0E3C4B",
      Active: CYAN[300],
    },
  },
  Focus: {
    Default: BLUE[300],
    Critical: RED[300],
  },
  Text: {
    Default: "#F3F4F6",
    Neutral: "#E5E7EB",
    Muted: "#CBD5E1",
    Soft: "#94A3B8",
    Disabled: "#64748B",
    Critical: RED[300],
    Warning: ORANGE[300],
    Success: GREEN[300],
    Active: BLUE[300],
    Highlight: BLUE[300],
    Violet: VIOLET[300],
    Cyan: CYAN[300],
    OnPrimary: WHITE,
    OnCritical: WHITE,
    OnInverse: "#111827",
  },
  Icons: {
    Default: "#CBD5E1",
    Muted: "#94A3B8",
    Hover: "#F9FAFB",
    Pressed: "#E5E7EB",
    Disabled: "#64748B",
    Critical: RED[300],
    Warning: ORANGE[300],
    Success: GREEN[300],
    Highlight: BLUE[300],
    OnPrimary: WHITE,
    OnCritical: WHITE,
    OnInverse: "#111827",
  },
  Interactive: {
    Default: {
      Default: BLUE[400],
      Hover: BLUE[300],
      Pressed: BLUE[200],
      Active: BLUE[100],
      Disabled: "#64748B",
    },
    Subtle: {
      Default: "#E5E7EB",
      Hover: "#F9FAFB",
      Pressed: "#CBD5E1",
      Active: WHITE,
      Disabled: "#64748B",
    },
  },
  Actions: {
    Primary: {
      Default: BLUE[500],
      Hover: BLUE[400],
      Pressed: BLUE[300],
      Active: BLUE[200],
      Disabled: darkDisabledGray,
    },
    Secondary: {
      Default: "#1F2937",
      Hover: "#273244",
      Pressed: darkPressedGray,
      Active: "#46505D",
      Disabled: darkDisabledGray,
    },
    Critical: {
      Default: RED[500],
      Hover: RED[400],
      Pressed: RED[300],
      Active: RED[200],
      Disabled: darkDisabledGray,
    },
    SecondaryCritical: {
      Default: "#1F2937",
      Hover: "#6B2128",
      Pressed: "#7F1D1D",
      Active: RED[400],
      Disabled: darkDisabledGray,
    },
  },
};

const lightShadows: ThemeShadows = {
  shadowSm: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  shadow:
    "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
  shadowMd: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  shadowLg:
    "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
  shadowXl:
    "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
  shadow2Xl: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
  shadowInner: "inset 0px 2px 4px rgba(0, 0, 0, 0.06)",
};

const darkShadows: ThemeShadows = {
  shadowSm: "0px 1px 2px rgba(0, 0, 0, 0.28)",
  shadow:
    "0px 1px 3px rgba(0, 0, 0, 0.36), 0px 1px 2px rgba(0, 0, 0, 0.24)",
  shadowMd: "0px 2px 12px rgba(0, 0, 0, 0.36)",
  shadowLg:
    "0px 12px 20px -4px rgba(0, 0, 0, 0.38), 0px 6px 10px -4px rgba(0, 0, 0, 0.24)",
  shadowXl:
    "0px 20px 28px -6px rgba(0, 0, 0, 0.42), 0px 10px 12px -6px rgba(0, 0, 0, 0.3)",
  shadow2Xl: "0px 28px 56px -14px rgba(0, 0, 0, 0.52)",
  shadowInner: "inset 0px 2px 4px rgba(0, 0, 0, 0.24)",
};

function createTheme(mode: ThemeMode): MfUITheme {
  const isDark = mode === "dark";

  return {
    mode,
    colors: {
      primary: isDark ? BLUE[400] : "#0070f3",
      secondary: isDark ? BLUE[300] : "#7928ca",
    },
    breakpoints,
    semanticColors: isDark ? darkSemanticColors : lightSemanticColors,
    shadows: isDark ? darkShadows : lightShadows,
    primitives: {
      background: isDark ? "#0B1220" : GRAY[100],
      foreground: isDark ? "#F3F4F6" : GRAY[800],
    },
  };
}

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
export const theme = lightTheme;

function toCssVariableName(path: string[]): string {
  return `--mfui-${path.join("-")}`.toLowerCase();
}

function flattenThemeTokens(
  tokens: NestedTokens,
  path: string[] = [],
): Array<[string, string]> {
  const tokenEntries = Object.entries(tokens);

  return tokenEntries.flatMap(([key, value]) => {
    const nextPath = [...path, key];

    if (typeof value === "string") {
      return [[toCssVariableName(nextPath), value]];
    }

    return flattenThemeTokens(value, nextPath);
  });
}

function serializeThemeVariables(themeValue: MfUITheme): string {
  const colorVariables = flattenThemeTokens(themeValue.semanticColors as NestedTokens, [
    "color",
  ]);
  const shadowVariables = Object.entries(themeValue.shadows).map(([key, value]) => [
    toCssVariableName(["shadow", key]),
    value,
  ]);
  const primitiveVariables = Object.entries(themeValue.primitives).map(
    ([key, value]) => [toCssVariableName(["primitive", key]), value],
  );
  const coreVariables: Array<[string, string]> = [
    [toCssVariableName(["mode"]), themeValue.mode],
    [toCssVariableName(["color", "primary"]), themeValue.colors.primary],
    [toCssVariableName(["color", "secondary"]), themeValue.colors.secondary],
  ];

  return [...colorVariables, ...shadowVariables, ...primitiveVariables, ...coreVariables]
    .map(([name, value]) => `${name}: ${value};`)
    .join("\n");
}

const ThemeVariables = createGlobalStyle`
  :root {
    ${({ theme: activeTheme }) => serializeThemeVariables(activeTheme)}
    color-scheme: ${({ theme: activeTheme }) => activeTheme.mode};
  }
`;

type MfUIThemeProviderProps = PropsWithChildren<{
  theme?: MfUITheme;
}>;

export function ThemeProvider({
  children,
  theme: activeTheme = lightTheme,
}: MfUIThemeProviderProps): ReactElement {
  return createElement(
    StyledThemeProvider,
    { theme: activeTheme },
    createElement(ThemeVariables),
    children,
  );
}

export function resolveTheme(mode: ThemeMode = "light"): MfUITheme {
  return mode === "dark" ? darkTheme : lightTheme;
}

export function withThemeProvider(
  children: ReactNode,
  activeTheme: MfUITheme = lightTheme,
): ReactElement {
  return createElement(ThemeProvider, { theme: activeTheme }, children);
}
