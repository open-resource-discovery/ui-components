import { type ReactElement, type ReactNode } from "react";

/**
 * Props a component hands to a caller-supplied link renderer.
 *
 * The library never imports a router. Components that can render as a link
 * (e.g. Breadcrumbs, EntityCard) accept a {@link LinkRender} function and call
 * it with these props; the caller owns the element and wires the router-specific
 * navigation prop (`href` for Next.js `<Link>`, `to` for TanStack Router `<Link>`).
 */
export interface LinkRenderProps {
  /** Class names the component computed for the link surface. Spread onto the element. */
  "className": string;
  /** The link's visible content. */
  "children": ReactNode;
  /** Set on the current item so assistive tech can announce it. */
  "aria-current"?: "page";
}

/**
 * Caller-supplied link renderer.
 *
 * @example Next.js
 * ```tsx
 * linkRender={(props) => <Link href={item.href!} {...props} />}
 * ```
 * @example TanStack Router
 * ```tsx
 * linkRender={(props) => <Link to={item.href!} {...props} />}
 * ```
 */
export type LinkRender = (props: LinkRenderProps) => ReactElement;
