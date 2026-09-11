import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export type StatusTone = "neutral" | "info" | "success" | "warning" | "critical";

const statusBadgeVariants = cva(
  "ordu:inline-flex ordu:items-center ordu:gap-1.5 ordu:rounded-full ordu:font-medium ordu:transition-colors ordu:focus:outline-none ordu:focus:ring-2 ordu:focus:ring-ring ordu:focus:ring-offset-2",
  {
    variants: {
      tone: {
        neutral: "ordu:bg-statusbadge-neutral-bg ordu:text-statusbadge-neutral-fg",
        info: "ordu:bg-statusbadge-info-bg ordu:text-statusbadge-info-fg",
        success: "ordu:bg-statusbadge-success-bg ordu:text-statusbadge-success-fg",
        warning: "ordu:bg-statusbadge-warning-bg ordu:text-statusbadge-warning-fg",
        critical: "ordu:bg-statusbadge-critical-bg ordu:text-statusbadge-critical-fg",
      },
      size: {
        sm: "ordu:px-2 ordu:py-0.5 ordu:text-[10px]",
        default: "ordu:px-2.5 ordu:py-0.5 ordu:text-xs",
      },
    },
    defaultVariants: { tone: "neutral", size: "default" },
  },
);

const dotVariants = cva("ordu:h-1.5 ordu:w-1.5 ordu:shrink-0 ordu:rounded-full", {
  variants: {
    tone: {
      neutral: "ordu:bg-statusbadge-neutral-dot",
      info: "ordu:bg-statusbadge-info-dot",
      success: "ordu:bg-statusbadge-success-dot",
      warning: "ordu:bg-statusbadge-warning-dot",
      critical: "ordu:bg-statusbadge-critical-dot",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">, VariantProps<typeof statusBadgeVariants> {
  /** Visible, caller-provided label. The component ships no default text. */
  label: ReactNode;
  /** Show the leading tone dot. Ignored when `icon` is provided. */
  dot?: boolean;
  /** Custom leading icon slot; replaces the dot. */
  icon?: ReactNode;
}

/**
 * A soft, tonal status label with an optional leading dot or icon.
 *
 * Tones are neutral presentation values (`neutral | info | success | warning | critical`);
 * callers map their own domain states onto them. For the solid, filled look use
 * {@link Badge} with {@link toneToBadgeVariant}.
 */
const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, tone, size, label, dot = true, icon, ...props }, ref) => (
    <span ref={ref} className={cn(statusBadgeVariants({ tone, size, className }))} {...props}>
      {icon ? (
        <span className="ordu:inline-flex ordu:h-3 ordu:w-3 ordu:shrink-0 ordu:items-center ordu:justify-center ordu:[&>svg]:h-full ordu:[&>svg]:w-full">
          {icon}
        </span>
      ) : (
        dot && <span aria-hidden="true" className={cn(dotVariants({ tone }))} />
      )}
      <span>{label}</span>
    </span>
  ),
);
StatusBadge.displayName = "StatusBadge";

/**
 * Maps a {@link StatusTone} to the nearest solid {@link Badge} `variant`, for callers
 * that want the filled Badge look instead of the soft StatusBadge tone.
 */
export const toneToBadgeVariant = {
  neutral: "secondary",
  info: "highlight",
  success: "success",
  warning: "warning",
  critical: "destructive",
} as const;

export { StatusBadge, statusBadgeVariants };
