import { forwardRef, type MouseEventHandler, type ReactNode, type Ref } from "react";
import { cn } from "@/utils/cn";
import { type LinkRender } from "@/utils/link";
import { StatusBadge, type StatusTone } from "@/components/status-badge";

export interface EntityStatus {
  label: ReactNode;
  tone?: StatusTone;
}

export interface EntityMetric {
  label: ReactNode;
  /** Pre-formatted by the caller. */
  value: ReactNode;
}

export interface EntityCardModel {
  /** Short kind/type label (e.g. "API Resource"). */
  kind: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  version?: ReactNode;
  statuses?: EntityStatus[];
  metrics?: EntityMetric[];
}

export interface EntityCardProps extends EntityCardModel {
  className?: string;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Navigation target for the native `<a>` fallback. */
  href?: string;
  /** Link renderer (Next.js / TanStack Router) — takes precedence over `href`. No router dependency. */
  render?: LinkRender;
  /** Click handler; renders a `<button>` when there is no `href`/`render`. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Accessible name when the whole card is interactive (no default text). */
  ariaLabel?: string;
}

const surface =
  "ordu:block ordu:w-full ordu:text-left ordu:bg-card-bg ordu:text-card-fg ordu:border ordu:border-card-border ordu:rounded-[var(--ord-radius)] ordu:shadow-sm ordu:p-4";
const interactive =
  "ordu:cursor-pointer ordu:transition-colors ordu:hover:border-ring ordu:hover:bg-accent/30 ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring";

/**
 * A semantic card for a typed entity (kind, title, statuses, metrics). Renders as a
 * native `<a>` when `href` is set, a `<button>` when only `onClick` is set, or an
 * `<article>` otherwise. A caller `render` slot (a router `<Link>`) takes precedence,
 * keeping the library router-agnostic. Statuses reuse {@link StatusBadge}.
 */
const EntityCard = forwardRef<HTMLElement, EntityCardProps>(
  (
    {
      kind,
      title,
      subtitle,
      description,
      version,
      statuses,
      metrics,
      icon,
      href,
      render,
      onClick,
      ariaLabel,
      className,
    },
    ref,
  ) => {
    const body = (
      <>
        <div className="ordu:flex ordu:items-start ordu:gap-3">
          {icon && (
            <span className="ordu:mt-0.5 ordu:shrink-0 ordu:h-8 ordu:w-8 ordu:flex ordu:items-center ordu:justify-center ordu:rounded-lg ordu:border ordu:bg-muted ordu:text-muted-foreground ordu:[&>svg]:h-4 ordu:[&>svg]:w-4">
              {icon}
            </span>
          )}
          <div className="ordu:flex ordu:min-w-0 ordu:flex-col ordu:gap-0.5">
            <span className="ordu:text-[10px] ordu:font-semibold ordu:uppercase ordu:tracking-wide ordu:text-muted-foreground">
              {kind}
            </span>
            <div className="ordu:flex ordu:items-center ordu:gap-2">
              <span className="ordu:text-sm ordu:font-semibold ordu:leading-tight ordu:truncate ordu:text-foreground">
                {title}
              </span>
              {version && <span className="ordu:text-xs ordu:text-muted-foreground">{version}</span>}
            </div>
            {subtitle && <span className="ordu:text-xs ordu:text-muted-foreground ordu:truncate">{subtitle}</span>}
          </div>
        </div>
        {description && <p className="ordu:mt-2 ordu:text-xs ordu:text-muted-foreground ordu:m-0">{description}</p>}
        {statuses?.length ? (
          <div className="ordu:mt-3 ordu:flex ordu:flex-wrap ordu:gap-1.5">
            {statuses.map((s, i) => (
              <StatusBadge key={i} size="sm" tone={s.tone} label={s.label} />
            ))}
          </div>
        ) : null}
        {metrics?.length ? (
          <dl className="ordu:mt-3 ordu:grid ordu:grid-cols-2 ordu:gap-x-4 ordu:gap-y-1.5 ordu:m-0">
            {metrics.map((m, i) => (
              <div key={i} className="ordu:flex ordu:flex-col">
                <dt className="ordu:text-[10px] ordu:text-muted-foreground">{m.label}</dt>
                <dd className="ordu:text-sm ordu:font-medium ordu:m-0 ordu:text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </>
    );

    const cls = cn(surface, (render || href || onClick) && interactive, className);

    if (render) {
      return render({ className: cls, children: body });
    }
    if (href) {
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} aria-label={ariaLabel} className={cls}>
          {body}
        </a>
      );
    }
    if (onClick) {
      return (
        <button
          ref={ref as Ref<HTMLButtonElement>}
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className={cls}>
          {body}
        </button>
      );
    }
    return (
      <article ref={ref} aria-label={ariaLabel} className={cls}>
        {body}
      </article>
    );
  },
);
EntityCard.displayName = "EntityCard";

export { EntityCard };
