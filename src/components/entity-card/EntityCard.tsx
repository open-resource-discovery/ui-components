import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode, type Ref } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { type LinkRender } from "@/utils/link";
import { StatusBadge, type StatusTone } from "@/components/status-badge";

export interface EntityStatus {
  label: ReactNode;
  tone?: StatusTone;
  /** Leading icon for the badge; replaces the tone dot. Forwarded to {@link StatusBadge}. */
  icon?: ReactNode;
  /** Show the leading tone dot (default true; ignored when `icon` is set). */
  dot?: boolean;
  /** Per-badge class override, e.g. an app's custom color pill. */
  className?: string;
}

export interface EntityMetric {
  label: ReactNode;
  /** Pre-formatted by the caller. */
  value: ReactNode;
}

export type EntityCardSize = "sm" | "md";

export interface EntityCardModel {
  /** Short kind/type label (e.g. "API Resource"). Optional; renders a subdued eyebrow when set. */
  kind?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  version?: ReactNode;
  statuses?: EntityStatus[];
  metrics?: EntityMetric[];
}

const cardVariants = cva(
  "ordu:relative ordu:block ordu:w-full ordu:text-left ordu:bg-entitycard-bg ordu:text-entitycard-fg " +
    "ordu:border ordu:border-entitycard-border ordu:rounded-[var(--ord-entitycard-radius)]",
  {
    variants: {
      size: {
        md: "ordu:p-[var(--ord-entitycard-padding)]",
        sm: "ordu:p-4",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export interface EntityCardProps
  extends
    EntityCardModel,
    Omit<HTMLAttributes<HTMLElement>, "title" | "onClick" | "color">,
    VariantProps<typeof cardVariants> {
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Tint classes for the icon square (e.g. "bg-sky-100 text-sky-600"); overrides the neutral default. */
  iconClassName?: string;
  /** How metrics render: inline count chips (default) or a two-column definition list. */
  metricsVariant?: "chips" | "grid";
  /** Header trailing affordance, pinned to the right (e.g. a chevron). */
  action?: ReactNode;
  /** Free-form tag row rendered after `statuses` (for app-specific pills the tones can't express). */
  pills?: ReactNode;
  /** Footer content on the left (e.g. version · owner, or an id + copy button). */
  footer?: ReactNode;
  /** Footer content pinned to the right (e.g. an "Explore ›" affordance). */
  footerAction?: ReactNode;
  /** Draw the top divider above the footer (default true). */
  footerDivider?: boolean;
  /** Dim the card and disable pointer interaction. */
  disabled?: boolean;
  /** Navigation target for the native `<a>` fallback. */
  href?: string;
  /** Link renderer (Next.js / TanStack Router) — takes precedence over `href`. No router dependency. */
  render?: LinkRender;
  /** Click handler; renders a `<button>` when there is no `href`/`render`. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Accessible name when the whole card is interactive (no default text). */
  ariaLabel?: string;
}

const interactive =
  "ordu:cursor-pointer ordu:transition-[box-shadow,border-color] ordu:hover:border-entitycard-hover-border " +
  "ordu:hover:shadow-[var(--ord-entitycard-hover-shadow)] ordu:focus-visible:outline-none " +
  "ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring";

/**
 * A semantic card for a typed entity (title, subtitle, statuses, metrics, footer). Its default
 * look matches the Equilibrium prototype card; slots (`icon`/`iconClassName`, `action`, `pills`,
 * `footer`/`footerAction`) plus the `--ord-entitycard-*` token layer let callers retheme it or bend
 * it to another app's card (e.g. Explorer). Renders as a native `<a>` when `href` is set, a
 * `<button>` when only `onClick` is set, or an `<article>` otherwise; a caller `render` slot (a
 * router `<Link>`) takes precedence, keeping the library router-agnostic. Statuses reuse
 * {@link StatusBadge}.
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
      size = "md",
      icon,
      iconClassName,
      metricsVariant = "chips",
      action,
      pills,
      footer,
      footerAction,
      footerDivider = true,
      disabled = false,
      href,
      render,
      onClick,
      ariaLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const isSm = size === "sm";
    const iconBox = cn(
      "ordu:mt-0.5 ordu:shrink-0 ordu:flex ordu:items-center ordu:justify-center ordu:[&>svg]:h-4 ordu:[&>svg]:w-4",
      isSm ? "ordu:h-[34px] ordu:w-[34px] ordu:rounded-[9px]" : "ordu:h-9 ordu:w-9 ordu:rounded-[10px]",
      iconClassName ?? "ordu:border ordu:bg-entitycard-icon-bg ordu:text-entitycard-icon-fg",
    );
    const titleClass = cn(
      "ordu:font-semibold ordu:leading-tight ordu:truncate ordu:text-entitycard-title-fg",
      isSm ? "ordu:text-[14.5px]" : "ordu:text-[18px]",
    );

    const renderStatus = (s: EntityStatus, key: number): ReactNode => (
      <StatusBadge
        key={key}
        size="sm"
        tone={s.tone}
        label={s.label}
        icon={s.icon}
        dot={s.dot}
        className={s.className}
      />
    );
    // First two statuses pin to the top-right corner; the rest drop below the subtitle with the pills.
    const cornerStatuses = statuses?.slice(0, 2) ?? [];
    const restStatuses = statuses?.slice(2) ?? [];

    const body = (
      <>
        <div className="ordu:flex ordu:items-start ordu:gap-3">
          {icon && <span className={iconBox}>{icon}</span>}
          <div className="ordu:flex ordu:min-w-0 ordu:flex-col ordu:gap-0.5 ordu:w-full">
            {kind && (
              <span className="ordu:text-[10px] ordu:font-semibold ordu:uppercase ordu:tracking-wide ordu:text-entitycard-subtitle-fg">
                {kind}
              </span>
            )}
            <div className="ordu:flex ordu:min-w-0 ordu:items-baseline">
              <span className={titleClass}>{title}</span>
              {version && <span className="ordu:text-xs ordu:text-entitycard-subtitle-fg ordu:px-1.5">{version}</span>}
            </div>
            {subtitle && (
              <span className="ordu:text-xs ordu:text-entitycard-subtitle-fg ordu:truncate">{subtitle}</span>
            )}
          </div>
          {cornerStatuses.length ? (
            <div className="ordu:flex ordu:shrink-0 ordu:items-center ordu:gap-1.5">
              {cornerStatuses.map((s, i) => renderStatus(s, i))}
            </div>
          ) : null}
          {action && (
            <span className="ordu:ml-auto ordu:shrink-0 ordu:text-entitycard-action-fg ordu:[&>svg]:h-4 ordu:[&>svg]:w-4">
              {action}
            </span>
          )}
        </div>
        {description && (
          <p
            className={cn(
              "ordu:mt-2.5 ordu:m-0 ordu:text-entitycard-description-fg",
              isSm ? "ordu:text-xs ordu:leading-normal" : "ordu:text-[13.5px] ordu:leading-relaxed",
            )}>
            {description}
          </p>
        )}
        {restStatuses.length || pills ? (
          <div className="ordu:mt-2.5 ordu:flex ordu:flex-wrap ordu:items-center ordu:gap-1.5">
            {restStatuses.map((s, i) => renderStatus(s, i))}
            {pills}
          </div>
        ) : null}

        {metrics?.length ? (
          metricsVariant === "grid" ? (
            <dl className="ordu:mt-3 ordu:grid ordu:grid-cols-2 ordu:gap-x-4 ordu:gap-y-1.5 ordu:m-0">
              {metrics.map((m, i) => (
                <div key={i} className="ordu:flex ordu:flex-col">
                  <dt className="ordu:text-[10px] ordu:text-entitycard-subtitle-fg">{m.label}</dt>
                  <dd className="ordu:text-sm ordu:font-medium ordu:m-0 ordu:text-entitycard-title-fg">{m.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="ordu:mt-3 ordu:flex ordu:flex-wrap ordu:gap-1.5">
              {metrics.map((m, i) => (
                <span
                  key={i}
                  className="ordu:inline-flex ordu:items-center ordu:gap-1 ordu:rounded-md ordu:bg-entitycard-chip-bg ordu:px-2 ordu:py-1 ordu:text-[11.5px] ordu:text-entitycard-chip-fg">
                  <b className="ordu:font-bold ordu:text-entitycard-chip-value-fg">{m.value}</b>
                  {m.label}
                </span>
              ))}
            </div>
          )
        ) : null}
        {footer || footerAction ? (
          <div
            className={cn(
              "ordu:mt-4 ordu:flex ordu:items-center ordu:gap-2 ordu:pt-3.5 ordu:text-xs ordu:text-entitycard-subtitle-fg",
              footerDivider && "ordu:border-t ordu:border-entitycard-divider",
            )}>
            {footer}
            {footerAction && (
              <span className="ordu:ml-auto ordu:inline-flex ordu:items-center ordu:gap-1 ordu:font-semibold ordu:text-entitycard-explore-fg">
                {footerAction}
              </span>
            )}
          </div>
        ) : null}
      </>
    );

    const cls = cn(
      cardVariants({ size }),
      (render || href || onClick) && interactive,
      disabled && "ordu:opacity-50 ordu:pointer-events-none",
      className,
    );

    if (render) {
      return render({
        "className": cls,
        "children": body,
        "aria-label": ariaLabel,
        "aria-disabled": disabled || undefined,
        ...props,
      });
    }
    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          aria-label={ariaLabel}
          aria-disabled={disabled || undefined}
          className={cls}
          {...props}>
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
          disabled={disabled}
          aria-label={ariaLabel}
          className={cls}
          {...props}>
          {body}
        </button>
      );
    }
    return (
      <article ref={ref} aria-label={ariaLabel} aria-disabled={disabled || undefined} className={cls} {...props}>
        {body}
      </article>
    );
  },
);
EntityCard.displayName = "EntityCard";

export { EntityCard };
