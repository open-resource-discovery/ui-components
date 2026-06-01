---
name: ord-ui
description: Use when working with `@open-resource-discovery/ui-components` — building UI with its Button, Input, Card, Tabs, Combobox, etc., or theming it via the two-layer `.ord-ui` token system (semantic `--ord-*` plus per-component `--ord-<component>-*` overrides). Covers imports, the ThemeRoot wrapper, runtime overrides via `<ThemeRoot style={…}>`, and dark-mode setup.
---

# @open-resource-discovery/ui-components

A React component library built on Base UI (`@base-ui/react`) with Tailwind v4 theming. Components are unstyled-by-default primitives wrapped with token-driven Tailwind utilities.

## Install

```bash
npm install @open-resource-discovery/ui-components
```

Peer deps: `react@^18 || ^19`, `react-dom@^18 || ^19`. Optional peers: `shiki` (for `CodeBlock`), `@monaco-editor/react` (for `CodeEditor`).

## Set up

Two things are required at the app root:

```tsx
import "@open-resource-discovery/ui-components/styles";
import { ThemeRoot } from "@open-resource-discovery/ui-components";

export default function App() {
  return (
    <ThemeRoot defaultTheme="system">
      <YourApp />
    </ThemeRoot>
  );
}
```

`ThemeRoot` renders a `<div class="ord-ui">` that scopes the component styles. Without it, components render without theme tokens. `defaultTheme` accepts `'light' | 'dark' | 'system'`.

## Imports

Every component is a named export from the package root — never deep-import:

```tsx
import { Button, Card, Tabs, Tooltip } from "@open-resource-discovery/ui-components";
```

## Composition

Most components follow Base UI's compound-part API: `Component.Root`, `Component.Trigger`, `Component.Popup`, etc. Convenience wrappers exist for the common-shape cases:

- `SimpleSelect` instead of `Select.Root + Select.Trigger + Select.Popup + …`
- `SimpleCombobox` instead of the full Combobox tree
- `SimpleCard` instead of `Card.Root + Card.Header + Card.Title + …`

Reach for the `Simple*` form first; drop to compound parts only when you need extra slots or custom layout.

## Theming

Theming is a **two-layer token system**:

1. **Semantic layer** — `--ord-background`, `--ord-foreground`, `--ord-primary`, `--ord-secondary`, `--ord-muted`, `--ord-accent`, `--ord-destructive`, `--ord-success`, `--ord-warning`, `--ord-border`, `--ord-ring`, `--ord-card`, `--ord-popover`, plus the `-foreground` pair for each. Override these for a global palette change — every component cascades automatically.

2. **Per-component layer** — `--ord-<component>-<role>[-<state>]`, defaulting to the semantic source via `var(--ord-…)`. Override these to retheme one component without touching the rest.

Per-component tokens currently exist for: **Card, Button, Badge, Input, Tabs, Tooltip, Dialog, Sheet, Combobox, Select, Switch, Checkbox, Progress, Spinner, Avatar**. Examples:

```css
.ord-ui {
  /* Global palette swap — affects everything */
  --ord-primary: oklch(0.55 0.2 260);
  --ord-radius: 0.75rem;

  /* Targeted overrides — only the named slot */
  --ord-button-primary-bg-hover: color-mix(in oklab, var(--ord-primary) 85%, white);
  --ord-tooltip-bg: #dc2626;
  --ord-dialog-backdrop: rgb(59 130 246 / 0.5);
  --ord-switch-track-on: #22c55e;
  --ord-progress-indicator: var(--ord-success);
}
```

Each per-component token defaults to a sensible semantic var, so overriding only the global layer still propagates everywhere. Reach for the per-component layer only when one component needs to look different from its semantic siblings.

Tailwind aliases — `bg-primary`, `text-foreground`, `border-border`, plus per-component utilities like `bg-button-primary-bg`, `bg-tooltip-bg`, `text-dialog-description-fg`, `border-card-border` — resolve via the `@theme inline` block in the library's CSS, so consumer Tailwind classes Just Work as long as the consumer has Tailwind v4 set up.

### Applying overrides at runtime

`ThemeRoot` accepts a `style` prop that lands directly on the `.ord-ui` element. Use it to inject CSS variables from app state (e.g. a theme picker):

```tsx
<ThemeRoot defaultTheme={mode} style={{ "--ord-primary": brand, "--ord-radius": `${radius}px` } as CSSProperties}>
  <App />
</ThemeRoot>
```

This is the only correct place for runtime overrides — putting the `style` on a child `<div>` breaks portaled components (Dialog, Sheet, Tooltip, Combobox, Select popups) because they portal back up to `.ord-ui` and would no longer inherit the variables.

### Live theme editor

Storybook ships a `Compositions/Theme Editor` story that surfaces both layers — global tokens plus per-component overrides for the 15 components above — and emits the resulting CSS to paste into a consumer app.

## Component reference

Live, interactive docs: <https://open-resource-discovery.github.io/ui-components/>

When asked to use a component, link the user to its Storybook page rather than guessing the API.

## When to use this skill

Use whenever the user mentions:

- `@open-resource-discovery/ui-components` or "ord-ui" or "ord components"
- Any of the components by name (Button, Input, Combobox, Tabs, Tooltip, Avatar, Card, etc.) **in the context of this library**
- `.ord-ui` CSS class or `--ord-*` design tokens (semantic or per-component, e.g. `--ord-button-*`, `--ord-tooltip-*`)
- `ThemeRoot` / `useTheme` from this library
- The Theme Editor composition or any per-component theming question

Don't fire on generic "build a button" — only when the request is rooted in this library.
