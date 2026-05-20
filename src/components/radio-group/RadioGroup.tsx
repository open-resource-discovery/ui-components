import React, { type ComponentPropsWithoutRef } from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cn } from '@/utils/cn';

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof BaseRadioGroup> {
  className?: string;
}

function RadioGroup({ className, ...props }: RadioGroupProps): React.JSX.Element {
  return <BaseRadioGroup className={cn('flex flex-col gap-2', className)} {...props} />;
}
RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
