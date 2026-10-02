import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants, type ButtonProps } from "@/components/button";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">, Pick<ButtonProps, "variant" | "size"> {
  /** Icon shown by default. */
  icon: ReactNode;
  /** Second icon; shown in place of `icon` while `active` is true. */
  activeIcon?: ReactNode;
  /** Toggles to `activeIcon`. Owned by the consumer — this primitive holds no state. */
  active?: boolean;
  /** Optional trailing content (a text label, or an `aria-live` status region). */
  children?: ReactNode;
  /** Accessible name for the button (icon-only buttons have no visible text). */
  label?: string;
}

/**
 * A minimal icon-only button surface: renders one of two icons (toggled by `active`) inside the
 * shared `buttonVariants` styling, and forwards the native `onClick` callback. It holds no state and
 * knows nothing about clipboards or links — richer behaviour is layered on by composing it (see
 * `CopyButton`). Defaults to the `ghost`/`icon` look.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, activeIcon, active = false, children, label, variant = "ghost", size = "icon", className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}>
        {active && activeIcon ? activeIcon : icon}
        {children}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton };
