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
      "ordu:flex ordu:h-10 ordu:w-full ordu:items-center ordu:justify-between ordu:rounded-[var(--ord-radius)] ordu:border ordu:border-select-trigger-border ordu:bg-select-trigger-bg ordu:px-3 ordu:py-2 ordu:text-sm ordu:text-select-trigger-fg ordu:ring-offset-background ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
SelectTrigger.displayName = "Select.Trigger";

/* ----- Value ----- */
type SelectValueProps = ComponentPropsWithoutRef<typeof BaseSelect.Value>;

const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(({ className, ...props }, ref) => (
  <BaseSelect.Value ref={ref} className={cn("ordu:text-sm ordu:truncate", className)} {...props} />
));
SelectValue.displayName = "Select.Value";

/* ----- Icon ----- */
type SelectIconProps = ComponentPropsWithoutRef<typeof BaseSelect.Icon>;

const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(({ className, children, ...props }, ref) => (
  <BaseSelect.Icon ref={ref} className={cn("ordu:flex ordu:shrink-0 ordu:text-muted-foreground", className)} {...props}>
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
    className={cn("ordu:outline-none ordu:z-50", className)}
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
      "ordu:bg-select-popup-bg ordu:text-select-popup-fg ordu:border ordu:border-select-popup-border ordu:rounded-[var(--ord-radius)] ordu:shadow-md ordu:p-1 ordu:overflow-hidden ordu:min-w-[var(--anchor-width)]",
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
      "ordu:relative ordu:flex ordu:w-full ordu:cursor-pointer ordu:select-none ordu:items-center ordu:rounded-sm ordu:pl-8 ordu:pr-2 ordu:py-1.5 ordu:text-sm ordu:outline-none ordu:data-[highlighted]:bg-select-item-bg-hover ordu:data-[highlighted]:text-select-item-fg-hover ordu:data-[disabled]:pointer-events-none ordu:data-[disabled]:opacity-50",
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
      className={cn(
        "ordu:absolute ordu:left-2 ordu:flex ordu:h-3.5 ordu:w-3.5 ordu:items-center ordu:justify-center",
        className,
      )}
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
  <BaseSelect.Group ref={ref} className={cn("ordu:p-1", className)} {...props} />
));
SelectGroup.displayName = "Select.Group";

/* ----- GroupLabel ----- */
type SelectGroupLabelProps = ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>;

const SelectGroupLabel = forwardRef<HTMLDivElement, SelectGroupLabelProps>(({ className, ...props }, ref) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cn("ordu:px-2 ordu:py-1.5 ordu:text-xs ordu:font-semibold ordu:text-muted-foreground", className)}
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
      className={cn("ordu:flex ordu:items-center ordu:justify-center ordu:py-1 ordu:text-muted-foreground", className)}
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
      className={cn("ordu:flex ordu:items-center ordu:justify-center ordu:py-1 ordu:text-muted-foreground", className)}
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
