import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Field as BaseField } from '@base-ui/react/field';
import { cn } from '@/utils/cn';

export interface FieldRootProps extends ComponentPropsWithoutRef<typeof BaseField.Root> {
  className?: string;
}

const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>(({ className, ...props }, ref) => {
  return <BaseField.Root ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />;
});
FieldRoot.displayName = 'Field.Root';

export interface FieldLabelProps extends ComponentPropsWithoutRef<typeof BaseField.Label> {
  className?: string;
}

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(({ className, ...props }, ref) => {
  return (
    <BaseField.Label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  );
});
FieldLabel.displayName = 'Field.Label';

export interface FieldDescriptionProps extends ComponentPropsWithoutRef<
  typeof BaseField.Description
> {
  className?: string;
}

const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseField.Description
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  },
);
FieldDescription.displayName = 'Field.Description';

export interface FieldErrorProps extends ComponentPropsWithoutRef<typeof BaseField.Error> {
  className?: string;
}

const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(({ className, ...props }, ref) => {
  return (
    <BaseField.Error
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    />
  );
});
FieldError.displayName = 'Field.Error';

export const Field = Object.assign(
  {},
  {
    Root: FieldRoot,
    Label: FieldLabel,
    Description: FieldDescription,
    Error: FieldError,
  },
);
