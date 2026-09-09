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
      "ordu:flex ordu:h-10 ordu:w-full ordu:rounded-[var(--ord-radius)] ordu:border ordu:border-input-border ordu:bg-input-bg ordu:px-3 ordu:py-2 ordu:text-sm ordu:text-input-fg ordu:ring-offset-background ordu:placeholder:text-input-placeholder ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50",
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
  <BaseCombobox.Positioner ref={ref} align="start" className={cn("ordu:outline-none", className)} {...props} />
));
ComboboxPositioner.displayName = "Combobox.Positioner";

/* ----- Popup ----- */
type ComboboxPopupProps = ComponentPropsWithoutRef<typeof BaseCombobox.Popup>;

const ComboboxPopup = forwardRef<HTMLDivElement, ComboboxPopupProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Popup
    ref={ref}
    className={cn(
      "ordu:bg-combobox-popup-bg ordu:text-combobox-popup-fg ordu:border ordu:border-combobox-popup-border ordu:rounded-[var(--ord-radius)] ordu:shadow-md ordu:p-1 ordu:overflow-hidden ordu:min-w-[var(--anchor-width)]",
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
      "ordu:relative ordu:flex ordu:w-full ordu:cursor-pointer ordu:select-none ordu:items-center ordu:rounded-sm ordu:pl-8 ordu:pr-2 ordu:py-1.5 ordu:text-sm ordu:outline-none ordu:data-[highlighted]:bg-combobox-item-bg-hover ordu:data-[highlighted]:text-combobox-item-fg-hover ordu:data-[selected]:bg-combobox-item-bg-hover ordu:data-[selected]:text-combobox-item-fg-hover ordu:data-[disabled]:pointer-events-none ordu:data-[disabled]:opacity-50",
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
    </BaseCombobox.ItemIndicator>
  ),
);
ComboboxItemIndicator.displayName = "Combobox.ItemIndicator";

/* ----- Empty ----- */
type ComboboxEmptyProps = ComponentPropsWithoutRef<typeof BaseCombobox.Empty>;

const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Empty
    ref={ref}
    className={cn("ordu:px-2 ordu:py-4 ordu:text-center ordu:text-sm ordu:text-muted-foreground", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "Combobox.Empty";

/* ----- Group ----- */
type ComboboxGroupProps = ComponentPropsWithoutRef<typeof BaseCombobox.Group>;

const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(({ className, ...props }, ref) => (
  <BaseCombobox.Group ref={ref} className={cn("ordu:p-1", className)} {...props} />
));
ComboboxGroup.displayName = "Combobox.Group";

/* ----- GroupLabel ----- */
type ComboboxGroupLabelProps = ComponentPropsWithoutRef<typeof BaseCombobox.GroupLabel>;

const ComboboxGroupLabel = forwardRef<HTMLDivElement, ComboboxGroupLabelProps>(({ className, ...props }, ref) => (
  <BaseCombobox.GroupLabel
    ref={ref}
    className={cn("ordu:px-2 ordu:py-1.5 ordu:text-xs ordu:font-semibold ordu:text-muted-foreground", className)}
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
