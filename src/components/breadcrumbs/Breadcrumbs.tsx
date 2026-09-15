import { forwardRef, Fragment, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { type LinkRender } from "@/utils/link";

export interface BreadcrumbItem {
  label: ReactNode;
  /** Navigation target for the native `<a>` fallback. Ignored when a renderer is provided. */
  href?: string;
  /** Per-item link renderer; overrides the component-level `linkRender`. */
  render?: LinkRender;
}

export interface BreadcrumbsProps extends Omit<ComponentPropsWithoutRef<"nav">, "children"> {
  items: BreadcrumbItem[];
  /** Accessible name for the `<nav>` landmark. Required and caller-provided (no default text). */
  label: string;
  /** Separator rendered between items. Defaults to a chevron. */
  separator?: ReactNode;
  /** Default link renderer for items without their own `render`. */
  linkRender?: LinkRender;
  /** Collapse to the first item + the last `maxItems - 1` when the trail is longer. 0/undefined disables. */
  maxItems?: number;
  /** Accessible label for the collapsed-items ellipsis. */
  collapseLabel?: string;
}

const DefaultSeparator = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

type CollapsedEntry = { it: BreadcrumbItem } | { ellipsis: true };

function collapse(items: BreadcrumbItem[], maxItems?: number): CollapsedEntry[] {
  if (!maxItems || items.length <= maxItems) return items.map((it) => ({ it }));
  const head = items[0];
  const tail = items.slice(items.length - (maxItems - 1));
  return [{ it: head }, { ellipsis: true }, ...tail.map((it) => ({ it }))];
}

const linkClass =
  "ordu:rounded ordu:transition-colors ordu:hover:text-foreground ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring";

/**
 * A semantic, responsive breadcrumb trail (`<nav>` → `<ol>`). The last item is rendered as the
 * current page (`aria-current="page"`, non-navigational). Link items render through a caller-supplied
 * {@link LinkRender} (Next.js / TanStack Router — no router dependency here) or a native `<a href>`.
 */
const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, label, separator = DefaultSeparator, linkRender, maxItems, collapseLabel, className, ...props }, ref) => {
    const rendered = collapse(items, maxItems);
    return (
      <nav ref={ref} aria-label={label} className={cn("ordu:w-full", className)} {...props}>
        <ol className="ordu:flex ordu:flex-wrap ordu:items-center ordu:gap-1.5 ordu:m-0 ordu:p-0 ordu:list-none ordu:text-sm ordu:text-muted-foreground">
          {rendered.map((entry, i) => {
            const isLast = i === rendered.length - 1;
            const sep = !isLast && (
              <li aria-hidden="true" className="ordu:flex ordu:items-center ordu:text-muted-foreground">
                {separator}
              </li>
            );

            if ("ellipsis" in entry) {
              return (
                <Fragment key={`ellipsis-${i}`}>
                  <li className="ordu:flex ordu:items-center">
                    <span aria-label={collapseLabel}>{"…"}</span>
                  </li>
                  {sep}
                </Fragment>
              );
            }

            const { it } = entry;
            const doRender = it.render ?? linkRender;
            let node: ReactNode;
            if (isLast) {
              node = (
                <span aria-current="page" className="ordu:font-medium ordu:text-foreground">
                  {it.label}
                </span>
              );
            } else if (doRender) {
              node = doRender({ className: linkClass, children: it.label });
            } else if (it.href) {
              node = (
                <a href={it.href} className={linkClass}>
                  {it.label}
                </a>
              );
            } else {
              node = <span>{it.label}</span>;
            }

            return (
              <Fragment key={i}>
                <li className="ordu:flex ordu:items-center ordu:min-w-0 ordu:truncate">{node}</li>
                {sep}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
