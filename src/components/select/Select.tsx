import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/theme/ThemeRoot";

/* ----- Root ----- */
type SelectRootProps = ComponentPropsWithoutRef<typeof BaseSelect.Root>;

function SelectRoot(props: SelectRootProps): React.JSX.Element {
  return <BaseSelect.Root {...props} />;
}
SelectRoot.displayName = "Select.Root";

/* ----- Trigger ----- */
type SelectTriggerProps = ComponentPropsWithoutRef<typeof BaseSelect.Trigger>;

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(({ className, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-[var(--ord-radius)] border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
SelectTrigger.displayName = "Select.Trigger";

/* ----- Value ----- */
type SelectValueProps = ComponentPropsWithoutRef<typeof BaseSelect.Value>;

const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(({ className, ...props }, ref) => (
  <BaseSelect.Value ref={ref} className={cn("text-sm truncate", className)} {...props} />
));
SelectValue.displayName = "Select.Value";

/* ----- Icon ----- */
type SelectIconProps = ComponentPropsWithoutRef<typeof BaseSelect.Icon>;

const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(({ className, children, ...props }, ref) => (
  <BaseSelect.Icon ref={ref} className={cn("flex shrink-0 text-muted-foreground", className)} {...props}>
    {children ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    )}
  </BaseSelect.Icon>
));
SelectIcon.displayName = "Select.Icon";

/* ----- Portal ----- */
type SelectPortalProps = ComponentPropsWithoutRef<typeof BaseSelect.Portal>;

function SelectPortal(props: SelectPortalProps): React.JSX.Element {
  const container = usePortalContainer();
  return <BaseSelect.Portal container={container} {...props} />;
}
SelectPortal.displayName = "Select.Portal";

/* ----- Positioner ----- */
type SelectPositionerProps = ComponentPropsWithoutRef<typeof BaseSelect.Positioner>;

const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>(({ className, ...props }, ref) => (
  <BaseSelect.Positioner
    ref={ref}
    side="bottom"
    align="start"
    sideOffset={4}
    className={cn("outline-none z-50", className)}
    {...props}
  />
));
SelectPositioner.displayName = "Select.Positioner";

/* ----- Popup ----- */
type SelectPopupProps = ComponentPropsWithoutRef<typeof BaseSelect.Popup>;

const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(({ className, ...props }, ref) => (
  <BaseSelect.Popup
    ref={ref}
    className={cn(
      "bg-popover text-popover-foreground border border-border rounded-[var(--ord-radius)] shadow-md p-1 overflow-hidden min-w-[var(--anchor-width)]",
      className,
    )}
    {...props}
  />
));
SelectPopup.displayName = "Select.Popup";

/* ----- Item ----- */
type SelectItemProps = ComponentPropsWithoutRef<typeof BaseSelect.Item>;

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ className, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
SelectItem.displayName = "Select.Item";

/* ----- ItemIndicator ----- */
type SelectItemIndicatorProps = ComponentPropsWithoutRef<typeof BaseSelect.ItemIndicator>;

const SelectItemIndicator = forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.ItemIndicator
      ref={ref}
      className={cn("absolute left-2 flex h-3.5 w-3.5 items-center justify-center", className)}
      {...props}>
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </BaseSelect.ItemIndicator>
  ),
);
SelectItemIndicator.displayName = "Select.ItemIndicator";

/* ----- ItemText ----- */
type SelectItemTextProps = ComponentPropsWithoutRef<typeof BaseSelect.ItemText>;

const SelectItemText = forwardRef<HTMLDivElement, SelectItemTextProps>((props, ref) => (
  <BaseSelect.ItemText ref={ref} {...props} />
));
SelectItemText.displayName = "Select.ItemText";

/* ----- Group ----- */
type SelectGroupProps = ComponentPropsWithoutRef<typeof BaseSelect.Group>;

const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(({ className, ...props }, ref) => (
  <BaseSelect.Group ref={ref} className={cn("p-1", className)} {...props} />
));
SelectGroup.displayName = "Select.Group";

/* ----- GroupLabel ----- */
type SelectGroupLabelProps = ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>;

const SelectGroupLabel = forwardRef<HTMLDivElement, SelectGroupLabelProps>(({ className, ...props }, ref) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
    {...props}
  />
));
SelectGroupLabel.displayName = "Select.GroupLabel";

/* ----- ScrollUpArrow ----- */
type SelectScrollUpArrowProps = ComponentPropsWithoutRef<typeof BaseSelect.ScrollUpArrow>;

const SelectScrollUpArrow = forwardRef<HTMLDivElement, SelectScrollUpArrowProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.ScrollUpArrow
      ref={ref}
      className={cn("flex items-center justify-center py-1 text-muted-foreground", className)}
      {...props}>
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="m18 15-6-6-6 6" />
        </svg>
      )}
    </BaseSelect.ScrollUpArrow>
  ),
);
SelectScrollUpArrow.displayName = "Select.ScrollUpArrow";

/* ----- ScrollDownArrow ----- */
type SelectScrollDownArrowProps = ComponentPropsWithoutRef<typeof BaseSelect.ScrollDownArrow>;

const SelectScrollDownArrow = forwardRef<HTMLDivElement, SelectScrollDownArrowProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.ScrollDownArrow
      ref={ref}
      className={cn("flex items-center justify-center py-1 text-muted-foreground", className)}
      {...props}>
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </BaseSelect.ScrollDownArrow>
  ),
);
SelectScrollDownArrow.displayName = "Select.ScrollDownArrow";

/* ----- Namespace Export ----- */
export const Select = Object.assign(
  {},
  {
    Root: SelectRoot,
    Trigger: SelectTrigger,
    Value: SelectValue,
    Icon: SelectIcon,
    Portal: SelectPortal,
    Positioner: SelectPositioner,
    Popup: SelectPopup,
    Item: SelectItem,
    ItemIndicator: SelectItemIndicator,
    ItemText: SelectItemText,
    Group: SelectGroup,
    GroupLabel: SelectGroupLabel,
    ScrollUpArrow: SelectScrollUpArrow,
    ScrollDownArrow: SelectScrollDownArrow,
  },
);

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectPopupProps,
  SelectItemProps,
  SelectItemIndicatorProps,
  SelectItemTextProps,
  SelectGroupProps,
  SelectGroupLabelProps,
  SelectScrollUpArrowProps,
  SelectScrollDownArrowProps,
};
