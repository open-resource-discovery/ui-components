import { forwardRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants, type ButtonProps } from "@/components/button";
import { type LinkRender } from "@/utils/link";

export interface LinkButtonProps extends Pick<ButtonProps, "variant" | "size"> {
  /** Navigation target for the native `<a>` fallback. Ignored when `render` is provided. */
  href?: string;
  /** Caller-supplied link renderer (Next.js / TanStack Router — no router dependency here). */
  render?: LinkRender;
  /** Accessible name for the link (icon-only, no visible text). */
  label?: string;
  /** Override the icon (defaults to a chain/link glyph). */
  icon?: ReactNode;
  className?: string;
}

const LinkIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

/**
 * An icon-only link styled like an icon button (shared `buttonVariants` surface). It navigates —
 * it does not copy. Provide a `render` to wire a router's `<Link>`, or an `href` for a native `<a>`
 * fallback. Defaults to the `ghost`/`icon` look and a chain glyph.
 */
const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ href, render, label, icon = LinkIcon, variant = "ghost", size = "icon", className }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    if (render) {
      return render({ "className": classes, "children": icon, "aria-label": label });
    }
    return (
      <a ref={ref} href={href} aria-label={label} className={classes}>
        {icon}
      </a>
    );
  },
);
LinkButton.displayName = "LinkButton";

export { LinkButton };
