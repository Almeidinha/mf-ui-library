import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        tsconfigPaths(), // <-- Automatically uses tsconfig.json paths
      ],
      resolve: {
        alias: [
          { find: "@components", replacement: "/src/components" },
          { find: "@helpers", replacement: "/src/helpers" },
          { find: "@foundations", replacement: "/src/foundation" },
          { find: "@stories", replacement: "/src/stories/helpers" },
        ],
      },
    };
  },
};

export default config;
