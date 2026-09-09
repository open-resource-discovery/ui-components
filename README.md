# UI Components

A general-purpose React UI component library with accessible, themeable components.

📖 **[Browse the components on Storybook](https://open-resource-discovery.github.io/ui-components/)**

> AI-agent-friendly project map: [`llms.txt`](./llms.txt).

## Installation

```bash
npm install @open-resource-discovery/ui-components
```

## Quick Start

```tsx
import { ThemeRoot, Button, Card } from "@open-resource-discovery/ui-components";
import "@open-resource-discovery/ui-components/styles";

function App() {
  return (
    <ThemeRoot>
      <Card>
        <Button>Click me</Button>
      </Card>
    </ThemeRoot>
  );
}
```

Wrap your application with `<ThemeRoot>` to provide theming context and CSS variables to all components.

## Styling and host isolation

The package stylesheet includes all default component styles. Consumers do not need Tailwind, a reset, or any other CSS for components to render correctly. Internal utilities are namespaced and the reset and tokens are scoped to `.ord-ui`, so ordinary host styles such as Docusaurus/Infima element rules and generic `.flex`, `.hidden`, or `.container` classes do not affect component internals or leak back into the host page.

Import the library stylesheet once, before your application's stylesheet:

```tsx
import "@open-resource-discovery/ui-components/styles";
import "./app.css";
```

Use ordinary, unprefixed classes for local overrides:

```tsx
<Button className="h-12 rounded-full px-8">Large action</Button>
```

`ordu:` is a private namespace for the library's defaults and must not be used by consumers. The component merge helper removes directly conflicting internal defaults when an ordinary consumer utility is supplied.

Because the component defaults must be unlayered to beat unlayered host CSS, Tailwind consumers must also emit their override utilities unlayered and load them after the package stylesheet. Use this instead of Tailwind's standard layered import in the consuming CSS entry:

```css
@import "tailwindcss/theme.css" theme(reference);
@import "tailwindcss/utilities.css";

@source "./";
```

Keep any consumer `@theme` declarations alongside this entry. A plain CSS class loaded after the package works too. If changing the Tailwind entry is not possible, Tailwind's important modifier (for example `px-8!`) is the fallback. Arbitrary host `!important` rules are outside the isolation guarantee.

## Theming

Components are styled using CSS custom properties. Override them to match your brand:

```css
.ord-ui {
  --ord-primary: #6366f1;
  --ord-primary-foreground: #ffffff;
  --ord-radius: 0.75rem;
  --ord-border: #e2e8f0;
}
```

Available tokens include `--ord-background`, `--ord-foreground`, `--ord-primary`, `--ord-secondary`, `--ord-muted`, `--ord-accent`, `--ord-destructive`, `--ord-success`, `--ord-warning`, `--ord-border`, `--ord-ring`, `--ord-card`, `--ord-popover`, and their `-foreground` variants.

For runtime themes, set tokens directly on `ThemeRoot` so portaled components inherit them too:

```tsx
<ThemeRoot style={{ "--ord-primary": brandColor } as React.CSSProperties}>
  <App />
</ThemeRoot>
```

## Dark Mode

Use the `useTheme` hook to toggle between light and dark modes:

```tsx
import { useTheme } from "@open-resource-discovery/ui-components";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle theme</button>;
}
```

The `ThemeRoot` component accepts a `defaultTheme` prop (`'light'`, `'dark'`, or `'system'`). When set to `'system'`, the library automatically follows the user's OS preference.

## Components

### Layout & Structure

- **Card** - Container with header, content, and footer sections
- **Separator** - Visual divider between content sections
- **ScrollArea** - Custom scrollbar container

### Forms & Inputs

- **Button** - Primary action trigger with variants and sizes
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **PasswordInput** - Input with show/hide password toggle
- **NumberField** - Numeric input with increment/decrement
- **Checkbox** - Single checkbox control
- **CheckboxGroup** - Group of related checkboxes
- **Radio** - Single radio option
- **RadioGroup** - Group of mutually exclusive radio options
- **Select** - Dropdown selection
- **Combobox** - Searchable dropdown selection
- **Switch** - Toggle control
- **Slider** - Range selection control
- **Field** - Form field wrapper with label, description, and error

### Feedback & Status

- **Badge** - Small status indicator label
- **Spinner** - Loading spinner animation
- **Skeleton** - Placeholder loading state
- **Progress** - Determinate progress bar
- **Meter** - Value within a known range
- **Toast** - Temporary notification message

### Overlays & Disclosure

- **Dialog** - Modal dialog window
- **Drawer** - Slide-in panel overlay
- **Popover** - Floating content panel
- **Tooltip** - Contextual hover information
- **Accordion** - Expandable content sections
- **Collapsible** - Single expandable section
- **Tabs** - Tabbed content panels

### Data Display

- **Avatar** - User profile image or initials
- **CodeBlock** - Syntax-highlighted code display

### Theming

- **ThemeRoot** - Theme provider wrapper component
- **useTheme** - Hook for programmatic theme control

## Storybook

The latest published Storybook is at [open-resource-discovery.github.io/ui-components](https://open-resource-discovery.github.io/ui-components/).

To run it locally:

```bash
npm run storybook
```

## License

[Apache-2.0](./LICENSE)
