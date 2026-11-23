import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type React from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof BaseRadioGroup> {
  className?: string;
}

function RadioGroup({ className, ...props }: RadioGroupProps): React.JSX.Element {
  return <BaseRadioGroup className={cn("ordu:flex ordu:flex-col ordu:gap-2", className)} {...props} />;
}
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
