import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/theme/ThemeRoot";

/* ----- Provider ----- */
type TooltipProviderProps = ComponentPropsWithoutRef<typeof BaseTooltip.Provider>;

function TooltipProvider(props: TooltipProviderProps): React.JSX.Element {
  return <BaseTooltip.Provider {...props} />;
}
TooltipProvider.displayName = "Tooltip.Provider";

/* ----- Root ----- */
type TooltipRootProps = ComponentPropsWithoutRef<typeof BaseTooltip.Root>;

function TooltipRoot(props: TooltipRootProps): React.JSX.Element {
  return <BaseTooltip.Root {...props} />;
}
TooltipRoot.displayName = "Tooltip.Root";

/* ----- Trigger ----- */
type TooltipTriggerProps = ComponentPropsWithoutRef<typeof BaseTooltip.Trigger>;

const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(({ className, ...props }, ref) => (
  <BaseTooltip.Trigger ref={ref} className={cn("", className)} {...props} />
));
TooltipTrigger.displayName = "Tooltip.Trigger";

/* ----- Portal ----- */
type TooltipPortalProps = ComponentPropsWithoutRef<typeof BaseTooltip.Portal>;

function TooltipPortal(props: TooltipPortalProps): React.JSX.Element {
  const container = usePortalContainer();
  return <BaseTooltip.Portal container={container} {...props} />;
}
TooltipPortal.displayName = "Tooltip.Portal";

/* ----- Positioner ----- */
type TooltipPositionerProps = ComponentPropsWithoutRef<typeof BaseTooltip.Positioner>;

const TooltipPositioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(({ className, ...props }, ref) => (
  <BaseTooltip.Positioner ref={ref} className={cn("outline-none", className)} {...props} />
));
TooltipPositioner.displayName = "Tooltip.Positioner";

/* ----- Popup ----- */
type TooltipPopupProps = ComponentPropsWithoutRef<typeof BaseTooltip.Popup>;

const TooltipPopup = forwardRef<HTMLDivElement, TooltipPopupProps>(({ className, ...props }, ref) => (
  <BaseTooltip.Popup
    ref={ref}
    className={cn(
      "z-50 bg-foreground text-background px-2 py-1 text-xs rounded-[var(--ord-radius)] shadow-md data-[open]:animate-in data-[open]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
TooltipPopup.displayName = "Tooltip.Popup";

/* ----- Arrow ----- */
type TooltipArrowProps = ComponentPropsWithoutRef<typeof BaseTooltip.Arrow>;

const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(({ className, ...props }, ref) => (
  <BaseTooltip.Arrow ref={ref} className={cn("fill-foreground", className)} {...props} />
));
TooltipArrow.displayName = "Tooltip.Arrow";

/* ----- Namespace Export ----- */
export const Tooltip = Object.assign(
  {},
  {
    Provider: TooltipProvider,
    Root: TooltipRoot,
    Trigger: TooltipTrigger,
    Portal: TooltipPortal,
    Positioner: TooltipPositioner,
    Popup: TooltipPopup,
    Arrow: TooltipArrow,
  },
);

export type {
  TooltipProviderProps,
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipPositionerProps,
  TooltipPopupProps,
  TooltipArrowProps,
};
