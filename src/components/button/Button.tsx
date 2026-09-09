import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "ordu:inline-flex ordu:items-center ordu:justify-center ordu:gap-2 ordu:whitespace-nowrap ordu:text-sm ordu:font-medium ordu:cursor-pointer ordu:transition-colors ordu:focus-visible:outline-none ordu:focus-visible:ring-1 ordu:focus-visible:ring-ring ordu:disabled:pointer-events-none ordu:disabled:opacity-50 ordu:[&_svg]:pointer-events-none ordu:[&_svg]:size-4 ordu:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "ordu:bg-button-primary-bg ordu:text-button-primary-fg ordu:shadow ordu:hover:bg-button-primary-bg-hover ordu:active:bg-button-primary-bg-active",
        destructive:
          "ordu:bg-button-destructive-bg ordu:text-button-destructive-fg ordu:shadow-sm ordu:hover:bg-button-destructive-bg-hover ordu:active:bg-button-destructive-bg-active",
        outline:
          "ordu:border ordu:border-button-outline-border ordu:bg-button-outline-bg ordu:shadow-sm ordu:hover:bg-button-outline-bg-hover ordu:hover:text-button-outline-fg-hover ordu:active:bg-button-outline-bg-hover/80",
        secondary:
          "ordu:bg-button-secondary-bg ordu:text-button-secondary-fg ordu:shadow-sm ordu:hover:bg-button-secondary-bg-hover ordu:active:bg-button-secondary-bg-active",
        ghost:
          "ordu:hover:bg-button-ghost-bg-hover ordu:hover:text-button-ghost-fg-hover ordu:active:bg-button-ghost-bg-hover/80",
        link: "ordu:text-button-link-fg ordu:underline-offset-4 ordu:hover:underline",
      },
      size: {
        sm: "ordu:h-8 ordu:rounded-md ordu:px-3 ordu:text-xs",
        default: "ordu:h-9 ordu:px-4 ordu:py-2 ordu:rounded-md",
        lg: "ordu:h-10 ordu:rounded-md ordu:px-8",
        icon: "ordu:h-9 ordu:w-9 ordu:rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
