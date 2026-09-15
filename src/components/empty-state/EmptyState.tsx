import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface EmptyStateProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Optional leading icon, rendered inside a bordered bubble. */
  icon?: ReactNode;
  /** Primary message. Caller-provided (no default text). */
  title?: ReactNode;
  /** Secondary explanatory text. */
  description?: ReactNode;
  /** Action slot (e.g. one or more `Button`s). */
  actions?: ReactNode;
}

/**
 * A neutral shell for empty, no-results, and error-adjacent states. Every slot is
 * caller-supplied and renders only when provided; the component ships no default text.
 */
const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, actions, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ordu:flex ordu:flex-col ordu:items-center ordu:justify-center ordu:gap-2 ordu:text-center ordu:px-6 ordu:py-10",
        className,
      )}
      {...props}>
      {icon && (
        <div className="ordu:mb-1 ordu:flex ordu:h-10 ordu:w-10 ordu:shrink-0 ordu:items-center ordu:justify-center ordu:rounded-lg ordu:border ordu:bg-muted ordu:text-muted-foreground ordu:[&>svg]:h-5 ordu:[&>svg]:w-5">
          {icon}
        </div>
      )}
      {title && <p className="ordu:text-sm ordu:font-medium ordu:text-foreground ordu:m-0">{title}</p>}
      {description && <p className="ordu:max-w-sm ordu:text-sm ordu:text-muted-foreground ordu:m-0">{description}</p>}
      {actions && (
        <div className="ordu:mt-2 ordu:flex ordu:flex-wrap ordu:items-center ordu:justify-center ordu:gap-2">
          {actions}
        </div>
      )}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
