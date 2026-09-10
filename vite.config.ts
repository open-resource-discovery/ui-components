import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

function namespaceTailwindInternals(): Plugin {
  return {
    name: "namespace-tailwind-internals",
    writeBundle(options, bundle): void {
      for (const asset of Object.values(bundle)) {
        if (asset.type !== "asset" || !asset.fileName.endsWith(".css")) continue;

        const outputDirectory = options.dir ?? dirname(options.file ?? "");
        const cssPath = resolve(outputDirectory, asset.fileName);
        const css = readFileSync(cssPath, "utf8");
        writeFileSync(cssPath, css.replaceAll("--tw-", "--ordu-tw-"));
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    namespaceTailwindInternals(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      bundleTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UIComponents",
      formats: ["es", "cjs"],
      fileName: (format) => `ui-components.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@base-ui\/react/,
        /^shiki/,
        /^react-resizable-panels/,
        /^@monaco-editor\/react/,
        /^monaco-editor/,
      ],
      output: {
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
  },
});
