import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export type TrendDirection = "up" | "down" | "flat";
export type TrendTone = "success" | "critical" | "neutral";

export interface MetricTrend {
  direction: TrendDirection;
  /** Pre-formatted by the caller (e.g. "+12.5%"). No ambient number/locale formatting here. */
  value: ReactNode;
  /** Overrides the direction-derived tone (up→success, down→critical, flat→neutral). */
  tone?: TrendTone;
  /** Accessible description of the trend (no default text). */
  label?: string;
}

export interface MetricCardProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Metric name. */
  label: ReactNode;
  /** Pre-formatted metric value (caller owns locale/number formatting). */
  value: ReactNode;
  /** Supplementary context shown beside the trend. */
  detail?: ReactNode;
  trend?: MetricTrend;
  /** Optional icon shown in the top-right corner. */
  icon?: ReactNode;
}

const toneClass: Record<TrendTone, string> = {
  success: "ordu:text-success",
  critical: "ordu:text-destructive",
  neutral: "ordu:text-muted-foreground",
};
const defaultTone: Record<TrendDirection, TrendTone> = { up: "success", down: "critical", flat: "neutral" };
const arrowPath: Record<TrendDirection, string> = {
  up: "m5 15 7-7 7 7",
  down: "m5 9 7 7 7-7",
  flat: "M5 12h14",
};

/**
 * A KPI tile presenting a label, value, optional detail, and an optional trend indicator.
 * Reuses the Card surface. The caller pre-formats `value` and `trend.value`; the component
 * performs no locale/number formatting.
 */
const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, detail, trend, icon, className, ...props }, ref) => {
    const tone = trend ? (trend.tone ?? defaultTone[trend.direction]) : "neutral";
    return (
      <div
        ref={ref}
        className={cn(
          "ordu:bg-card-bg ordu:text-card-fg ordu:border ordu:border-card-border ordu:rounded-[var(--ord-radius)] ordu:shadow-sm ordu:p-4 ordu:flex ordu:flex-col ordu:gap-1.5",
          className,
        )}
        {...props}>
        <div className="ordu:flex ordu:items-start ordu:justify-between ordu:gap-2">
          <span className="ordu:text-xs ordu:font-medium ordu:text-muted-foreground">{label}</span>
          {icon && (
            <span className="ordu:shrink-0 ordu:h-4 ordu:w-4 ordu:text-muted-foreground ordu:[&>svg]:h-full ordu:[&>svg]:w-full">
              {icon}
            </span>
          )}
        </div>
        <span className="ordu:text-2xl ordu:font-semibold ordu:leading-none ordu:tracking-tight ordu:text-foreground">
          {value}
        </span>
        {(detail || trend) && (
          <div className="ordu:flex ordu:items-center ordu:gap-2 ordu:text-xs">
            {trend && (
              <span
                className={cn("ordu:inline-flex ordu:items-center ordu:gap-0.5 ordu:font-medium", toneClass[tone])}
                aria-label={trend.label}>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d={arrowPath[trend.direction]} />
                </svg>
                {trend.value}
              </span>
            )}
            {detail && <span className="ordu:text-muted-foreground">{detail}</span>}
          </div>
        )}
      </div>
    );
  },
);
MetricCard.displayName = "MetricCard";

export { MetricCard };
