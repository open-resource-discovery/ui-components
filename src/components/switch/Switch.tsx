import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
type SwitchRootProps = ComponentPropsWithoutRef<typeof BaseSwitch.Root>;

const SwitchRoot = forwardRef<HTMLButtonElement, SwitchRootProps>(({ className, children, ...props }, ref) => (
  <BaseSwitch.Root
    ref={ref}
    className={cn(
      "ordu:peer ordu:inline-flex ordu:h-5 ordu:w-9 ordu:shrink-0 ordu:cursor-pointer ordu:items-center ordu:rounded-full ordu:border-2 ordu:border-transparent ordu:transition-colors ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50 ordu:data-[checked]:bg-switch-track-on ordu:data-[unchecked]:bg-switch-track-off",
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
      "ordu:pointer-events-none ordu:block ordu:h-4 ordu:w-4 ordu:rounded-full ordu:bg-switch-thumb ordu:shadow-lg ordu:ring-0 ordu:transition-transform ordu:data-[checked]:translate-x-4 ordu:data-[unchecked]:translate-x-0",
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
