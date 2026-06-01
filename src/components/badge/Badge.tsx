import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-badge-default-bg text-badge-default-fg",
        secondary: "bg-badge-secondary-bg text-badge-secondary-fg",
        destructive: "bg-badge-destructive-bg text-badge-destructive-fg",
        outline: "border border-badge-outline-border text-badge-outline-fg",
        success: "bg-badge-success-bg text-badge-success-fg",
        warning: "bg-badge-warning-bg text-badge-warning-fg",
        highlight: "bg-badge-highlight-bg text-badge-highlight-fg border border-badge-highlight-border",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, size, ...props }, ref) => {
  return <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />;
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };
