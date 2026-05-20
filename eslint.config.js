// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { withCustomConfig } from "@sap/eslint-config";

export default withCustomConfig([
  {
    ignores: ["dist/", "node_modules/", "storybook-static/", "stories/"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [".storybook/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}", "*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/prefer-readonly": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
    },
  },
]);
