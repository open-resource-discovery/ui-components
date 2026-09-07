# Host-CSS bleed & styling — findings and refactor notes

_Written 2026-09-07. Context for a future refactor of `@open-resource-discovery/ui-components` to simplify styling, especially when embedded in host pages (Docusaurus/Infima)._

## The core problem

`ui-components` is Tailwind v4. Its preflight lives in `@layer base` and its utilities in `@layer utilities`. **In the CSS cascade, an author _unlayered_ declaration beats _any_ `@layer` declaration regardless of specificity.** Docusaurus's **Infima** ships unlayered global element rules:

- `p { margin: 0 0 var(--ifm-paragraph-margin-bottom) }`
- `h1..h6 { margin; color; font-family; font-weight; line-height }` + per-tag `h* { font-size }`
- `ul/ol { … }`, `table { display: block }`, and a global `.container` (page layout)

So when ui-components is embedded on a Docusaurus page, **Infima beats all of ui-components' (and the host site's) layered Tailwind styles** — element margins and heading sizes bleed into the components. Consumers' own margin/size utilities (`mb-1`, `text-sm`, …) also lose, because they're layered too.

**The only thing that beats unlayered Infima is _unlayered_ CSS.** Everything below follows from that.

## How the ORD ecosystem currently copes (consumer-side workarounds)

None of this lives in `ui-components` today — every consumer reinvents it:

- **a2a-editor** and **mcp-server-card-ui**: each ships a `.<root> :where(*)` scoped preflight (`.a2a-root` / `.mcp-root`) and a **standalone build** that post-processes CSS to (1) strip `@layer` wrappers so rules compete unlayered, and (2) scope/confine them so nothing leaks to the host. They're Tailwind projects themselves.
- **overlay-editor**: was missing all of this; this session added it (below).
- **metadata-renderer**: still has the latent bug — relies on `@layer`, which structurally loses to Infima.

Key cascade facts the workarounds exploit:
- `.ord-ui :where(el)` = specificity `(0,1,0)` → beats Infima's bare-element `(0,0,1)`, while `:where()` keeps the element list at 0 so utilities can still override.
- After stripping `@layer`, source order + specificity decide everything. Preflight is emitted before utilities, so utilities win over the preflight; both beat Infima.

## What changed this session (all in `overlay-editor`, none in `ui-components`)

Goal reached: **playground = ORD-styled (beats Infima); home + docs = Infima; Monaco untouched.**

**Rendered overlay (right panel, `.overlay-card-view`)** — a standalone bundle:
- `src/lib/standalone.ts` — IIFE entry exposing `window.OverlayPlayground.init/update/setTheme/destroy`.
- `vite.standalone.config.ts` — bundles ui-components CSS + overlay CSS, then in `closeBundle`:
  - `stripCssLayers` — unwrap `@layer` so it beats Infima; re-scope loose `:where(.util)` + `@supports` block.
  - `scopeToCardView` — prefix every rule with `.overlay-card-view` (specificity `(0,2,0)`), and move `:root`/`:host` token blocks onto `:is(.overlay-card-view, .ord-ui)` so they don't override the site's global `:root`. Confines everything to the rendered card → no leak to home/docs, and no `.container`/`.bg-primary`/`--radius` global collisions.
  - (`stripBarePreflightRules` existed but was **removed** — `scopeToCardView` already confines bare preflight, so it was redundant.)
- `src/lib/styles.css` — an unlayered `.overlay-root :where(*)` scoped preflight (box-sizing, **border longhands** — never the `border` shorthand, which resets `border-color` to `currentcolor` → black borders — margin, padding).
- `scripts/copy-standalone-to-website.mjs` + `package.json` scripts (`build:standalone`, `copy:website-standalone`, `prepare:website-assets`) + `.gitignore` entries.
- `website/src/components/Playground/renderer.tsx` — injects the stripped/scoped standalone `<link>`+`<script>` and calls `window.OverlayPlayground.init(...)` instead of importing the lib ESM (keeps the stripped CSS out of webpack's layering).

**Playground chrome (left panel — website's own React using ui-components)**:
- `website/src/css/custom.css` — an unlayered, `.ord-ui`-scoped element reset at specificity `(0,0,1)` (`:where(.ord-ui) el`): neutralizes Infima's margins + oversized heading `font-size` inside the playground, while any Tailwind utility `(0,1,0)` still overrides it. Scoped to `.ord-ui` so home/docs stay Infima.

**Tailwind added to overlay-editor** (it wasn't a Tailwind project — that's why `HeroBlock`'s `pb-2` silently did nothing: no build scanned overlay's own `src/lib`, so its utilities were never generated; only classes ui-components happened to generate worked):
- Installed `tailwindcss` + `@tailwindcss/vite` 4.3.3.
- Added `tailwindcss()` to `vite.config.lib.ts` and `vite.standalone.config.ts`.
- Made `src/lib/styles.css` a Tailwind entry (`@import "tailwindcss/theme.css"` + `utilities.css`, preflight skipped, `@source "./"` to scan `src/lib`), mirroring a2a-editor.
- Result: overlay's own utilities are generated → flow through strip/scope → e.g. `.overlay-card-view .pb-2` (ordered after `.p-6`, so it correctly overrides).

## Regressions hit along the way (the adversarial checklist for any future change)

- **R1 — unscoped utility leak:** a stripped-but-unscoped bundle shipped global `.bg-primary{var(--ord-primary)}`, `.container`, `.hidden`. Its persisted `<link>` (Docusaurus SPA) overrode the site globally → homepage button `bg-primary` resolved to undefined `--ord-primary`; `.container` shrank the docs page. → Fix: scope everything.
- **R2 — global `:root` token override:** stripped `:root{--radius:var(--ord-radius)}` overrode the site's `:root{--radius}` on every page; `--ord-radius` undefined outside `.ord-ui` → homepage `rounded-md` collapsed to 0. → Fix: move `:root`/`:host` token blocks onto the scoped selector.
- **R3 — border shorthand:** preflight `border: 0 solid` reset `border-color` to `currentcolor`, blackening card/code-block borders. → Fix: `border-width`/`border-style` longhands only.
- **R4 — specificity vs host-Tailwind interplay:** scoping ui-components utilities at `(0,2,0)` made `.p-6` beat the website's `.pb-0` `(0,1,0)` on chrome cards → overrides silently failed. → Fix: scope the rendered overlay to `.overlay-card-view` only (not `.ord-ui`), so the standalone never touches website chrome.
- **Docusaurus `.container` collision:** unlayering the _website's_ own Tailwind (to make chrome utilities beat Infima) also unlayered Tailwind's `.container` (the Footer uses `className="container"`), which collided with Docusaurus/Infima's own `.container` page layout → risked breaking home/docs. Guarding every host-class collision is fragile whack-a-mole; abandoned in favor of the scoped preflight for the chrome.
- **Two surfaces are different:** the _rendered overlay_ (overlay-lib code, `.overlay-card-view`) and the _playground chrome_ (website code, `.ord-ui` only) need separate handling; a single scope can't serve both without the R4 conflict.

## Environment gotcha
All `npm run` commands broke mid-session with `--min-release-age cannot be provided when using --before` — the user's `~/.npmrc` had `before=…` conflicting with npm's `min-release-age`. Worked around by invoking `node …/docusaurus.mjs` / `vite` directly; user later fixed `~/.npmrc`.

## Recommendations for the future `ui-components` refactor (simplify styling)

The recurring pain is that **every consumer independently reinvents "make it beat host CSS without leaking."** Consider moving that into `ui-components` itself:

1. **Ship a self-contained, `.ord-ui`-scoped, unlayered CSS artifact** (in addition to / instead of the current layered bundle) so any consumer can drop it into any host (Docusaurus, plain app) and get correct behavior with no per-consumer strip pipeline. Candidate: a `dist/ui-components.scoped.css` where preflight + utilities are `.ord-ui :where(…)`-scoped and unlayered.
2. **Own the scoped preflight in `ui-components`** (`.ord-ui :where(*)` element reset) rather than making each consumer write `.a2a-root`/`.mcp-root`/`.overlay-root` copies. Use border longhands (see R3).
3. **Keep design tokens off the global `:root`** — define them only on `.ord-ui` (already mostly true) so embedding never overrides host tokens like `--radius` (see R2).
4. **Avoid emitting host-colliding generic class names** (`.container`, `.row`, `.col`, `.hidden`) unscoped, or scope all utilities under `.ord-ui` (see R1 / `.container` collision). A Tailwind `important`/prefix strategy or a build-time scope pass could enforce this.
5. **Document the embedding contract**: layered CSS loses to unlayered host globals; provide the one supported "island" stylesheet + a short Docusaurus/Infima guide, so consumers stop hand-rolling strip/scope steps.
6. **Consider whether `@layer` is worth it at all for the shipped bundle** given it structurally loses to unlayered host CSS; an unlayered-but-scoped island may be simpler for everyone.
7. If tokens like `Card.Title { mb-1 }` / `Card.Description { m-0 }` are meant to be defaults, note they only take effect once the CSS is unlayered/scoped in the consumer — so they belong to the "island" story above.

Reference implementations to study: `a2a-editor/src/lib/styles.css` + `vite.standalone.config.ts` (the mature version of the strip/scope pattern), and this session's `overlay-editor` equivalents.
