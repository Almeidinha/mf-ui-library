import {
  Controls,
  Description,
  Primary,
  Title,
} from "@storybook/addon-docs/blocks";
import type { Preview } from "@storybook/react-vite";
import { createElement, Fragment } from "react";

const preview: Preview = {
  tags: ["autodocs"],
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
