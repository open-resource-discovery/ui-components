import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
type SwitchRootProps = ComponentPropsWithoutRef<typeof BaseSwitch.Root>;

const SwitchRoot = forwardRef<HTMLButtonElement, SwitchRootProps>(({ className, children, ...props }, ref) => (
  <BaseSwitch.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-switch-track-on data-[unchecked]:bg-switch-track-off",
      className,
    )}
    {...props}>
    {children}
  </BaseSwitch.Root>
));
SwitchRoot.displayName = "Switch.Root";

/* ----- Thumb ----- */
type SwitchThumbProps = ComponentPropsWithoutRef<typeof BaseSwitch.Thumb>;

const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(({ className, ...props }, ref) => (
  <BaseSwitch.Thumb
    ref={ref}
    className={cn(
      "pointer-events-none block h-4 w-4 rounded-full bg-switch-thumb shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 data-[unchecked]:translate-x-0",
      className,
    )}
    {...props}
  />
));
SwitchThumb.displayName = "Switch.Thumb";

/* ----- Namespace Export ----- */
export const Switch = Object.assign(
  {},
  {
    Root: SwitchRoot,
    Thumb: SwitchThumb,
  },
);

export type { SwitchRootProps, SwitchThumbProps };
