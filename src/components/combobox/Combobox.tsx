import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/theme/ThemeRoot";

/* ----- Root ----- */
type ComboboxRootProps = ComponentPropsWithoutRef<typeof BaseCombobox.Root>;

function ComboboxRoot(props: ComboboxRootProps): React.JSX.Element {
  return <BaseCombobox.Root {...props} />;
}
ComboboxRoot.displayName = "Combobox.Root";

/* ----- Input ----- */
type ComboboxInputProps = ComponentPropsWithoutRef<typeof BaseCombobox.Input>;

const ComboboxInput = forwardRef<HTMLInputElement, ComboboxInputProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-[var(--ord-radius)] border border-input-border bg-input-bg px-3 py-2 text-sm text-input-fg ring-offset-background placeholder:text-input-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ComboboxInput.displayName = "Combobox.Input";

/* ----- Portal ----- */
type ComboboxPortalProps = ComponentPropsWithoutRef<typeof BaseCombobox.Portal>;

function ComboboxPortal(props: ComboboxPortalProps): React.JSX.Element {
  const container = usePortalContainer();
  return <BaseCombobox.Portal container={container} {...props} />;
}
ComboboxPortal.displayName = "Combobox.Portal";

/* ----- Positioner ----- */
type ComboboxPositionerProps = ComponentPropsWithoutRef<typeof BaseCombobox.Positioner>;

const ComboboxPositioner = forwardRef<HTMLDivElement, ComboboxPositionerProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Positioner ref={ref} align="start" className={cn("outline-none", className)} {...props} />
));
ComboboxPositioner.displayName = "Combobox.Positioner";

/* ----- Popup ----- */
type ComboboxPopupProps = ComponentPropsWithoutRef<typeof BaseCombobox.Popup>;

const ComboboxPopup = forwardRef<HTMLDivElement, ComboboxPopupProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Popup
    ref={ref}
    className={cn(
      "bg-combobox-popup-bg text-combobox-popup-fg border border-combobox-popup-border rounded-[var(--ord-radius)] shadow-md p-1 overflow-hidden min-w-[var(--anchor-width)]",
      className,
    )}
    {...props}
  />
));
ComboboxPopup.displayName = "Combobox.Popup";

/* ----- Item ----- */
type ComboboxItemProps = ComponentPropsWithoutRef<typeof BaseCombobox.Item>;

const ComboboxItem = forwardRef<HTMLDivElement, ComboboxItemProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none data-[highlighted]:bg-combobox-item-bg-hover data-[highlighted]:text-combobox-item-fg-hover data-[selected]:bg-combobox-item-bg-hover data-[selected]:text-combobox-item-fg-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
));
ComboboxItem.displayName = "Combobox.Item";

/* ----- ItemIndicator ----- */
type ComboboxItemIndicatorProps = ComponentPropsWithoutRef<typeof BaseCombobox.ItemIndicator>;

const ComboboxItemIndicator = forwardRef<HTMLSpanElement, ComboboxItemIndicatorProps>(
  ({ className, children, ...props }, ref) => (
    <BaseCombobox.ItemIndicator
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
    </BaseCombobox.ItemIndicator>
  ),
);
ComboboxItemIndicator.displayName = "Combobox.ItemIndicator";

/* ----- Empty ----- */
type ComboboxEmptyProps = ComponentPropsWithoutRef<typeof BaseCombobox.Empty>;

const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Empty
    ref={ref}
    className={cn("px-2 py-4 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "Combobox.Empty";

/* ----- Group ----- */
type ComboboxGroupProps = ComponentPropsWithoutRef<typeof BaseCombobox.Group>;

const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Group ref={ref} className={cn("p-1", className)} {...props} />
));
ComboboxGroup.displayName = "Combobox.Group";

/* ----- GroupLabel ----- */
type ComboboxGroupLabelProps = ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>;

const ComboboxGroupLabel = forwardRef<HTMLDivElement, ComboboxGroupLabelProps>(({ className, ...props }, ref) => (
  <BaseCombobox.GroupLabel
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
    {...props}
  />
));
ComboboxGroupLabel.displayName = "Combobox.GroupLabel";

/* ----- Namespace Export ----- */
export const Combobox = Object.assign(
  {},
  {
    Root: ComboboxRoot,
    Input: ComboboxInput,
    Portal: ComboboxPortal,
    Positioner: ComboboxPositioner,
    Popup: ComboboxPopup,
    Item: ComboboxItem,
    ItemIndicator: ComboboxItemIndicator,
    Empty: ComboboxEmpty,
    Group: ComboboxGroup,
    GroupLabel: ComboboxGroupLabel,
  },
);

export type {
  ComboboxRootProps,
  ComboboxInputProps,
  ComboboxPortalProps,
  ComboboxPositionerProps,
  ComboboxPopupProps,
  ComboboxItemProps,
  ComboboxItemIndicatorProps,
  ComboboxEmptyProps,
  ComboboxGroupProps,
  ComboboxGroupLabelProps,
};
