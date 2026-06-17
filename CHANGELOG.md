# CHANGELOG

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) rules.

## [unreleased]

Initial open-source release of `@open-resource-discovery/ui-components`.

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
