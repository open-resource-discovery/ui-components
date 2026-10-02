import { forwardRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants, type ButtonProps } from "@/components/button";
import { type LinkRender } from "@/utils/link";

export interface ExternalLinkButtonProps extends Pick<ButtonProps, "variant" | "size"> {
  /** Navigation target for the native `<a>` fallback. Ignored when `render` is provided. */
  href?: string;
  /** Caller-supplied link renderer. Receives `target`/`rel` so it opens in a new tab too. */
  render?: LinkRender;
  /** Accessible name for the link (icon-only, no visible text). */
  label?: string;
  /** Override the icon (defaults to a square-with-arrow glyph). */
  icon?: ReactNode;
  className?: string;
}

const ExternalLinkIcon = (
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
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
  </svg>
);

/**
 * An icon-only link that opens its target in a new tab, styled like an icon button (shared
 * `buttonVariants` surface). Provide a `render` to wire a router's `<Link>` (it receives
 * `target`/`rel`), or an `href` for a native `<a target="_blank">` fallback. Defaults to the
 * `ghost`/`icon` look and a square-with-arrow glyph.
 */
const ExternalLinkButton = forwardRef<HTMLAnchorElement, ExternalLinkButtonProps>(
  ({ href, render, label, icon = ExternalLinkIcon, variant = "ghost", size = "icon", className }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    if (render) {
      return render({
        "className": classes,
        "children": icon,
        "aria-label": label,
        "target": "_blank",
        "rel": "noopener noreferrer",
      });
    }
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={classes}>
        {icon}
      </a>
    );
  },
);
ExternalLinkButton.displayName = "ExternalLinkButton";

export { ExternalLinkButton };
