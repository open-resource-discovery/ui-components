import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-button-primary-bg text-button-primary-fg shadow hover:bg-button-primary-bg-hover active:bg-button-primary-bg-active",
        destructive:
          "bg-button-destructive-bg text-button-destructive-fg shadow-sm hover:bg-button-destructive-bg-hover active:bg-button-destructive-bg-active",
        outline:
          "border border-button-outline-border bg-button-outline-bg shadow-sm hover:bg-button-outline-bg-hover hover:text-button-outline-fg-hover active:bg-button-outline-bg-hover/80",
        secondary:
          "bg-button-secondary-bg text-button-secondary-fg shadow-sm hover:bg-button-secondary-bg-hover active:bg-button-secondary-bg-active",
        ghost: "hover:bg-button-ghost-bg-hover hover:text-button-ghost-fg-hover active:bg-button-ghost-bg-hover/80",
        link: "text-button-link-fg underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-9 px-4 py-2 rounded-md",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 rounded-full",
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
