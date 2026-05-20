import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeRoot } from "../src/theme/ThemeRoot";
import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: "Light", value: "#ffffff" },
        dark: { name: "Dark", value: "#0a0a0a" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Styleguide", "Theme", "*"],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "light" },
  },
  decorators: [
    (Story, context): React.JSX.Element => {
      const value = context.globals?.backgrounds?.value ?? "light";
      const isDark = value === "dark";
      return (
        <ThemeRoot defaultTheme={isDark ? "dark" : "light"}>
          <Story />
        </ThemeRoot>
      );
    },
  ],
};

export default preview;
