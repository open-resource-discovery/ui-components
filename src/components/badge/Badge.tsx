import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "ordu:inline-flex ordu:items-center ordu:rounded-full ordu:font-semibold ordu:transition-colors ordu:focus:outline-none ordu:focus:ring-2 ordu:focus:ring-ring ordu:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "ordu:bg-badge-default-bg ordu:text-badge-default-fg",
        secondary: "ordu:bg-badge-secondary-bg ordu:text-badge-secondary-fg",
        destructive: "ordu:bg-badge-destructive-bg ordu:text-badge-destructive-fg",
        outline: "ordu:border ordu:border-badge-outline-border ordu:text-badge-outline-fg",
        success: "ordu:bg-badge-success-bg ordu:text-badge-success-fg",
        warning: "ordu:bg-badge-warning-bg ordu:text-badge-warning-fg",
        highlight:
          "ordu:bg-badge-highlight-bg ordu:text-badge-highlight-fg ordu:border ordu:border-badge-highlight-border",
      },
      size: {
        sm: "ordu:px-2 ordu:py-0.5 ordu:text-[10px]",
        default: "ordu:px-2.5 ordu:py-0.5 ordu:text-xs",
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
