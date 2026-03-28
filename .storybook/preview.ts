import {
  Controls,
  Description,
  Primary,
  Title,
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import { createElement, Fragment } from "react";

import { ThemeProvider, resolveTheme } from "../src/theme/theme";

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    themeMode: {
      name: "Theme",
      description: "Global theme mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) =>
      createElement(
        ThemeProvider,
        { theme: resolveTheme(context.globals.themeMode) },
        createElement(
          "div",
          {
            style: {
              minHeight: "100vh",
              padding: 16,
              background:
                context.globals.themeMode === "dark" ? "#0B1220" : "#F9FAFB",
            },
          },
          createElement(Story),
        ),
      ),
  ],
  parameters: {
    docs: {
      codePanel: true,
      page: () =>
        createElement(
          Fragment,
          null,
          createElement(Title),
          createElement(Description),
          createElement(Primary),
          createElement(Controls),
        ),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
