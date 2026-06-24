# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) rules.

## [unreleased]

## [[0.1.3](https://github.com/open-resource-discovery/ui-components/releases/tag/v0.1.3)] - 2026-06-24

### Fixed

- In `Card.Header` and `CollapsibleSection` badges row collapses in two or more lines instead of be hidden in narrow screens
- `--ord-accent-foreground` color in both dark and light themes is changed to be readable on `--ord-primary` background
- `usePortalContainer` now falls back to `document.querySelector(".ord-ui")` when no `PortalContainerContext` provider is present, so portal components (`Select`, `SimpleSelect`, `Sheet`, `Dialog`, `Combobox`, `Tooltip`) work correctly when the library is embedded inside a host app that has its own `ThemeRoot`-equivalent (e.g. `a2a-editor`, `mcp-server-card-ui`) without requiring any additional context wiring.

## [[0.1.2](https://github.com/open-resource-discovery/ui-components/releases/tag/v0.1.2)] - 2026-03-22

### Fixed

- Switch Tailwind import back to `@import "tailwindcss"` and add `utilities` to the explicit `@layer` order declaration (`theme, base, components, utilities`) so the full Tailwind layer stack is correctly registered in Storybook.

## [[0.1.1](https://github.com/open-resource-discovery/ui-components/releases/tag/v0.1.1)] - 2026-03-18

Initial open-source release of `@open-resource-discovery/ui-components`.

### Changed

- Replace `bg-card` with `bg-card-bg` across `CollapsibleSection`, `ConnectionCard`, `HttpLogEntry`, `InfoCard`, and `SectionCard` so background color correctly resolves from the `--ord-card-bg` token rather than the raw `--ord-card` color value.
- Switch Tailwind import from `@import "tailwindcss"` to explicit `@import "tailwindcss/theme.css" layer(theme)` + `@import "tailwindcss/utilities.css" layer(utilities)`, removing the preflight reset so the library can be embedded in host pages (e.g. metadata-renderer) without requiring the `@tailwindcss/vite` plugin.
- Add `--ord-code-bg` and `--ord-code-fg` tokens (derived from muted) and wire them as `--color-code` / `--color-code-foreground` Tailwind colors.
- Update `CodeBlock` to use `bg-code` and `text-code-foreground` classes instead of `bg-muted` / `text-muted-foreground`.
- Add `<code>` element styling inside `.ord-ui` using the new code tokens.
- Improve `CollapsibleSection`, `InfoCard`, and `SectionCard` appearance (spacing, borders, typography).
- Fix issue with broken styles in the storybook and a2a-editor heading

### Added

- React component library built on Base UI (`@base-ui/react`) and Tailwind v4, distributed via `@open-resource-discovery/ui-components`.
- `ThemeRoot` wrapper that scopes `.ord-ui`, exposes design tokens, and switches light / dark / system mode via `useTheme`.
- Component set:
  - **Forms & input** — Button, Input, Textarea, PasswordInput, Checkbox, Switch, Combobox / SimpleCombobox, Select / SimpleSelect, Field, RadioGroup
  - **Layout** — Card / SimpleCard, Tabs, Separator, ScrollArea, SplitPane, CollapsibleSection, SectionCard, Sheet, Dialog
  - **Feedback & display** — Badge, Tooltip, Avatar, Progress, Spinner
  - **Code & content** — CodeBlock (Shiki-powered), CodeEditor (Monaco-powered), MarkdownText, HttpLogEntry
  - **Chat** — ChatMessage, ChatInput, TypingIndicator
  - **Composite** — ConnectionCard, InfoCard
- Semantic CSS-variable theme on `.ord-ui` covering surface, brand, state, and border tokens with `.ord-ui.dark` overrides.
- Storybook docs site published to GitHub Pages with PR preview workflow.
- CI workflow with typecheck, lint, unit tests (vitest), and Storybook build.
- Apache-2.0 license and REUSE compliance.
