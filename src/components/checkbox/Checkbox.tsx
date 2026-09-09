import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "@/utils/cn";

const CheckmarkIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  className?: string;
}

const CheckboxRoot = forwardRef<HTMLSpanElement, CheckboxProps>(({ className, children, ...props }, ref) => {
  return (
    <BaseCheckbox.Root
      ref={ref}
      className={cn(
        "ordu:inline-flex ordu:h-4 ordu:w-4 ordu:shrink-0 ordu:cursor-pointer ordu:items-center ordu:justify-center ordu:rounded-sm ordu:border ordu:border-checkbox-border ordu:ring-offset-background ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50 ordu:data-[checked]:bg-checkbox-bg-checked ordu:data-[checked]:text-checkbox-fg-checked",
        className,
      )}
      {...props}>
      {children}
    </BaseCheckbox.Root>
  );
});
CheckboxRoot.displayName = "Checkbox.Root";

const CheckboxIndicator = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof BaseCheckbox.Indicator> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <BaseCheckbox.Indicator
      ref={ref}
      className={cn("ordu:flex ordu:items-center ordu:justify-center ordu:text-current", className)}
      {...props}>
      <CheckmarkIcon />
    </BaseCheckbox.Indicator>
  );
});
CheckboxIndicator.displayName = "Checkbox.Indicator";

export const Checkbox = Object.assign(
  {},
  {
    Root: CheckboxRoot,
    Indicator: CheckboxIndicator,
  },
);
