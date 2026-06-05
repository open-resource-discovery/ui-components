# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@open-resource-discovery/ui-components` — A React component library built on [`@base-ui/react`](https://base-ui.com/) with Tailwind v4 theming. Provides 35 components for use in the ORD frontend projects (`a2a-editor`, `mcp-server-card-ui`, `metadata-renderer`).

The `ord-ui` Claude Code skill is available at `.claude/skills/ord-ui/SKILL.md` — it includes setup instructions, import patterns, and theming reference. **Invoke `/ord-ui` before working on component code.**

Interactive Storybook docs: <https://open-resource-discovery.github.io/ui-components/>

## Commands

```bash
# Development
npm run dev              # Vite dev server
npm run storybook        # Storybook at localhost:6006

# Building
npm run build            # Vite lib build to dist/ (ESM + CJS + types)
npm run build-storybook  # Static Storybook build

# Testing
npm test                 # Vitest unit tests (run once)
npm run test:watch       # Vitest in watch mode
npm run typecheck        # TypeScript strict check only

# Code quality
npm run format           # Prettier + ESLint auto-fix
```

### Running a single test

```bash
npx vitest run src/components/button/button.test.ts
```

## Architecture

### Theme system

`ThemeRoot` (in `src/theme/ThemeRoot.tsx`) wraps the app and renders a `<div class="ord-ui">` that scopes all CSS custom properties. It accepts `defaultTheme?: 'light' | 'dark' | 'system'` and persists the choice to `localStorage`. Dark mode applies `.dark` to the wrapper; all `--ord-*` tokens have dark variants in `src/theme/tokens.css` under `.ord-ui.dark`.

The `useTheme()` hook (in `src/theme/useTheme.ts`) returns `{ theme, resolvedTheme, setTheme }`.

Tailwind v4 aliases are set up in `src/styles/base.css` via `@theme inline` so that `bg-primary`, `text-foreground`, etc. resolve to `--ord-*` tokens.

### Component patterns

- **Compound components**: Most follow Base UI's `.Root`, `.Trigger`, `.Popup`, `.Item` naming convention
- **Simple\* wrappers**: `SimpleSelect`, `SimpleCombobox`, `SimpleCard`, `SimpleDialog`, `SimpleSheet` — cover 80% of use cases; prefer these before reaching for compound parts
- **Variants via CVA**: `Button` and `Badge` use `class-variance-authority`; export `buttonVariants`/`badgeVariants` for reuse
- **`cn()` utility** in `src/utils/cn.ts`: wraps `clsx` + `tailwind-merge`; use in every component

### Portal management

`ThemeRoot` provides `PortalContainerContext`. Dialog, Sheet, and Tooltip read this context to portal their overlays inside `.ord-ui`, ensuring z-index and theming behave correctly when the library is embedded in host pages.

### Build output

Vite lib build produces:
- `dist/ui-components.js` — ESM
- `dist/ui-components.cjs` — CJS
- `dist/index.d.ts` — bundled type declarations (via `vite-plugin-dts`)
- `dist/ui-components.css` — single CSS bundle (CSS code splitting is disabled)

All `@base-ui/react`, `shiki`, `@monaco-editor/react`, and `react-resizable-panels` dependencies are externalized — consumers resolve them.

### Optional peer dependencies

`CodeBlock` requires `shiki@^1-4`. `CodeEditor` requires `@monaco-editor/react@^4.0.0`. Both are optional — components that depend on them only render correctly when those peers are installed by the consumer.

## Adding or modifying components

1. Create a directory under `src/components/<component-name>/`
2. Export everything from `src/index.ts`
3. Add a story in `stories/<ComponentName>.stories.tsx`
4. Wrap Base UI primitives, apply Tailwind utilities via `cn()`, and scope dark mode with `data-[open]`/`data-[closed]` attributes where needed

## Path aliases

`@/` → `src/` (configured in `vite.config.ts` and `tsconfig.json`).
