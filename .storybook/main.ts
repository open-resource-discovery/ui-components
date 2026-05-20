import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (viteConfig) => {
    if (process.env.NODE_ENV === "production") {
      viteConfig.base = process.env.STORYBOOK_BASE_URL ?? "/ui-components/";
    }
    return viteConfig;
  },
};

export default config;
