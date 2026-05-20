import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { cn } from '@/utils/cn';

/* ----- Separator ----- */
type SeparatorProps = ComponentPropsWithoutRef<typeof BaseSeparator>;

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = 'Separator';

export { Separator };
export type { SeparatorProps };
