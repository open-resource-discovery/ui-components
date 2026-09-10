# Consumer styling migration — step-by-step

_Companion to [host-css-and-styling-refactor.md](./host-css-and-styling-refactor.md). Written after migrating `overlay-editor`; use it to migrate `a2a-editor`, `mcp-server-card-ui`, and other ORD consumers._

## Why

`ui-components` now ships one self-isolating styling island: a `.ord-ui`-scoped reset
(`src/styles/reset.css`), unlayered `ordu:`-prefixed utilities, tokens under `.ord-ui`
(not `:root`), namespaced `--ordu-tw-*` internals, `ord-*` keyframes, and a
`className`-preserving `cn()`. So the reset/scoping each consumer hand-rolled to *repair
ORD components* is now redundant. Keep only what isolates the **consumer's own** CSS.

## Precondition — the gate for removing the local preflight

Confirm the project's own rendered markup lives **inside `.ord-ui`**. In `overlay-editor`
the root element is `cn("ord-ui", "<x>-root", …)` — same element. If `.a2a-root` /
`.mcp-root` also carry `.ord-ui` (or are wrapped in `<ThemeRoot>`), the library reset
covers their elements and the local preflight is safe to delete. If some markup renders
*outside* `.ord-ui`, keep a reset for those elements.

Notation below: `.<x>-root` and `.<x>-card-view` are the project's scope classes
(`.a2a-root`/`.a2a-card-view`, `.mcp-root`/`.mcp-card-view`, …).

## Change 1 — Delete the duplicated scoped preflight

In the library CSS entry (e.g. `src/lib/styles.css`), remove the hand-written Tailwind
preflight block: the `.<x>-root :where(*)` box-sizing/border/margin/padding reset plus the
`hr / abbr / h1-h6 / a / b,strong / code,kbd / small / sub,sup / table / summary /
ol,ul,menu / img,svg / button,input,textarea / ::placeholder / [hidden]` element resets.
It is a copy of the library's `reset.css`.

Keep:

- The Tailwind entry imports — `@import "tailwindcss/theme.css" layer(theme)`, the
  **unlayered** `@import "tailwindcss/utilities.css"`, and `@source`. The consumer still
  needs its own utilities generated and unlayered.
- Any `:where(.<x>-card-view)` sizing rule, focus-ring rules, and all `.<x>-*` layout CSS.

If the project injects a runtime copy of its styles (e.g. a `styles.ts` template string),
check whether that copy even contains the preflight — `overlay-editor`'s did not, so no
edit was needed there. Verify against its sync test if one exists.

Update any header comment that claims the project "ships a scoped `.<x>-root` reset."

## Change 2 — Delete the host-CSS (Infima) neutralizer in the site chrome

If the project has a Docusaurus/site CSS (e.g. `website/src/css/custom.css`), remove the
`:where(.ord-ui) p, h1-h6, ul, ol, … { margin: inherit }` + heading `font-size: inherit`
block. The library's `.ord-ui :where(*)` reset (specificity `(0,1,0)`) now beats Infima's
`(0,0,1)` element rules outright, and it is loaded globally via the site's
`@open-resource-discovery/ui-components/styles` client module.

Keep everything that is not ORD-repair: `@theme` / `@custom-variant`, `--ifm-*` palette,
app token definitions, scrollbar / SplitPane theming, navbar / search / footer chrome.

## Change 3 (subtle, important) — Fix the standalone transform so it stops leaking the reset onto the chrome

This is the bug behind "search input / cards lost their borders." The standalone bundle is
injected **globally** on the page and carries the library's `.ord-ui :where(*){border-width:0}`
reset. If the transform treats bare `.ord-ui` as "already scoped," that reset stays global
and zeroes borders on the site chrome (also `.ord-ui`, but *not* inside `.<x>-card-view`);
the card-scoped `ordu:` border utilities can't re-add them. `!important` overrides (e.g. a
`border-b!` divider) survive; plain component borders do not.

In `vite.standalone.config.ts` (or equivalent):

- Remove `.ord-ui` from `alreadyScoped()` → `.ord-ui` reset/token rules get prefixed to
  `.<x>-card-view .ord-ui`, confining them to the rendered card.
- Remove `.ord-ui` from the `findUnscopedSelectors()` allow-list, so this leak class is
  caught going forward.
- Change `TOKEN_SCOPE` from `:is(.<x>-card-view, .ord-ui)` to just `.<x>-card-view`, so
  remapped `:root`/`:host` theme vars land on the card root, not globally on `.ord-ui`.
- Keep `.<x>-root` / `.<x>-card-view` in `alreadyScoped` — those classes only exist inside
  the card, so they do not leak.

## Change 4 (only if consuming `file:../ui-components`) — Fix duplicate React in tests

A `file:` symlink to a ui-components dev checkout exposes *its* `node_modules/react` and
`@base-ui/*`, so tests that render a hook-using ORD component crash with
`Cannot read properties of null (reading 'useState' / 'useMemo' / 'useRef')`. In
`vitest.config.ts`:

```ts
resolve: { dedupe: ["react", "react-dom", "react/jsx-runtime"] },
test: { server: { deps: { inline: [/@open-resource-discovery\/ui-components/, /@base-ui\//] } } },
```

`dedupe` fixes ui-components' own `import "react"`; `inline` routes `@base-ui`'s react import
through the resolver (vitest SSR-externalizes it otherwise). This is only a symptom of the
temporary local link — the proper long-term fix is to consume the **published version**
(or an `npm pack` tarball, whose `files: ["dist"]` excludes react/node_modules), which
dedupes react naturally. Leaving `dedupe` in is harmless.

## Do NOT remove (applies to every consumer)

- The standalone transform itself (`scopeToCardView` + leak gate) — still needed to isolate
  the project's **own** `.<x>-*` layout CSS and generated utilities in a bundle embedded in
  arbitrary host pages.
- `!important` utility overrides in chrome components (e.g. `p-2!`, `pl-8!`) — they guard
  **CSS load-order** between the site's utilities and the ui-components stylesheet, not
  layering. Only removable after guaranteeing the site CSS loads after the package stylesheet.
- Manual `.ord-ui` / `.dark` wrappers + local theme store, and all Docusaurus chrome theming.

## Verify (per project)

1. `npm run build:lib && npm run build:standalone` (or the project's build) — the leak gate
   must print **0 leaks**.
2. Inspect the built standalone CSS: the reset should be `.<x>-card-view .ord-ui …`, with
   **no** bare global `.ord-ui` reset or token block.
3. `npm run check` (typecheck + lint + test). If it is a `file:` link, apply Change 4.
4. Run the site: rendered card unchanged; **chrome Input/Card borders present**; heading
   sizes/margins not bleeding; docs/home pages still fully Infima-styled; light/dark track.
