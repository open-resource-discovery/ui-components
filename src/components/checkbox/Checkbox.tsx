import React, { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { cn } from '@/utils/cn';

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
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
  className?: string;
}

const CheckboxRoot = forwardRef<HTMLSpanElement, CheckboxProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BaseCheckbox.Root
        ref={ref}
        className={cn(
          'inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[checked]:text-primary-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </BaseCheckbox.Root>
    );
  },
);
CheckboxRoot.displayName = 'Checkbox.Root';

const CheckboxIndicator = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<typeof BaseCheckbox.Indicator> & { className?: string }
>(({ className, ...props }, ref) => {
  return (
    <BaseCheckbox.Indicator
      ref={ref}
      className={cn('flex items-center justify-center text-current', className)}
      {...props}
    >
      <CheckmarkIcon />
    </BaseCheckbox.Indicator>
  );
});
CheckboxIndicator.displayName = 'Checkbox.Indicator';

export const Checkbox = Object.assign(
  {},
  {
    Root: CheckboxRoot,
    Indicator: CheckboxIndicator,
  },
);
