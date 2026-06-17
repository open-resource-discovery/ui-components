# Changelog

## [0.1.1]

### Changed
- Replace `bg-card` with `bg-card-bg` across `CollapsibleSection`, `ConnectionCard`, `HttpLogEntry`, `InfoCard`, and `SectionCard` so background color correctly resolves from the `--ord-card-bg` token rather than the raw `--ord-card` color value.
- Switch Tailwind import from `@import "tailwindcss"` to explicit `@import "tailwindcss/theme.css" layer(theme)` + `@import "tailwindcss/utilities.css" layer(utilities)`, removing the preflight reset so the library can be embedded in host pages (e.g. metadata-renderer) without requiring the `@tailwindcss/vite` plugin.
- Add `--ord-code-bg` and `--ord-code-fg` tokens (derived from muted) and wire them as `--color-code` / `--color-code-foreground` Tailwind colors.
- Update `CodeBlock` to use `bg-code` and `text-code-foreground` classes instead of `bg-muted` / `text-muted-foreground`.
- Add `<code>` element styling inside `.ord-ui` using the new code tokens.
- Improve `CollapsibleSection`, `InfoCard`, and `SectionCard` appearance (spacing, borders, typography).
