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
    // vite-plugin-dts only serves the library build (it bundles dist/index.d.ts via
    // api-extractor). The Storybook build never emits dist/index.d.ts, so letting the
    // plugin run here makes api-extractor abort on a missing entry point.
    viteConfig.plugins = (viteConfig.plugins ?? [])
      .flat(Infinity)
      .filter((p) => !(p && typeof p === "object" && "name" in p && String(p.name).includes("dts")));
    return viteConfig;
  },
};

export default config;
