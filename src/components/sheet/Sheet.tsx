import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/theme/ThemeRoot";

/* ----- Root ----- */
type SheetRootProps = ComponentPropsWithoutRef<typeof BaseDialog.Root>;

function SheetRoot(props: SheetRootProps): React.JSX.Element {
  return <BaseDialog.Root {...props} />;
}
SheetRoot.displayName = "Sheet.Root";

/* ----- Trigger ----- */
type SheetTriggerProps = ComponentPropsWithoutRef<typeof BaseDialog.Trigger>;

const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(({ className, ...props }, ref) => (
  <BaseDialog.Trigger ref={ref} className={cn("", className)} {...props} />
));
SheetTrigger.displayName = "Sheet.Trigger";

/* ----- Portal ----- */
type SheetPortalProps = ComponentPropsWithoutRef<typeof BaseDialog.Portal>;

function SheetPortal(props: SheetPortalProps): React.JSX.Element {
  const container = usePortalContainer();
  return <BaseDialog.Portal container={container} {...props} />;
}
SheetPortal.displayName = "Sheet.Portal";

/* ----- Backdrop ----- */
type SheetBackdropProps = ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>;

const SheetBackdrop = forwardRef<HTMLDivElement, SheetBackdropProps>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-sheet-backdrop data-[open]:animate-ord-fade-in data-[closed]:animate-ord-fade-out",
      className,
    )}
    {...props}
  />
));
SheetBackdrop.displayName = "Sheet.Backdrop";

/* ----- Popup ----- */
const sheetPopupVariants = cva("fixed z-50 bg-sheet-bg text-sheet-fg shadow-lg outline-none flex flex-col gap-4 p-6", {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b border-sheet-border w-full data-[open]:animate-ord-slide-in-from-top data-[closed]:animate-ord-slide-out-to-top",
      bottom:
        "inset-x-0 bottom-0 border-t border-sheet-border w-full data-[open]:animate-ord-slide-in-from-bottom data-[closed]:animate-ord-slide-out-to-bottom",
      left: "inset-y-0 left-0 border-r border-sheet-border h-full w-3/4 sm:max-w-sm data-[open]:animate-ord-slide-in-from-left data-[closed]:animate-ord-slide-out-to-left",
      right:
        "inset-y-0 right-0 border-l border-sheet-border h-full w-3/4 sm:max-w-sm data-[open]:animate-ord-slide-in-from-right data-[closed]:animate-ord-slide-out-to-right",
    },
  },
  defaultVariants: { side: "right" },
});

type SheetPopupProps = ComponentPropsWithoutRef<typeof BaseDialog.Popup> & VariantProps<typeof sheetPopupVariants>;

const SheetPopup = forwardRef<HTMLDivElement, SheetPopupProps>(({ className, side, ...props }, ref) => (
  <BaseDialog.Popup ref={ref} className={cn(sheetPopupVariants({ side, className }))} {...props} />
));
SheetPopup.displayName = "Sheet.Popup";

/* ----- Title ----- */
type SheetTitleProps = ComponentPropsWithoutRef<typeof BaseDialog.Title>;

const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
SheetTitle.displayName = "Sheet.Title";

/* ----- Description ----- */
type SheetDescriptionProps = ComponentPropsWithoutRef<typeof BaseDialog.Description>;

const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(({ className, ...props }, ref) => (
  <BaseDialog.Description ref={ref} className={cn("mt-1.5 text-sm text-sheet-description-fg", className)} {...props} />
));
SheetDescription.displayName = "Sheet.Description";

/* ----- Close ----- */
type SheetCloseProps = ComponentPropsWithoutRef<typeof BaseDialog.Close>;

const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(({ className, ...props }, ref) => (
  <BaseDialog.Close ref={ref} className={cn("", className)} {...props} />
));
SheetClose.displayName = "Sheet.Close";

/* ----- Namespace Export ----- */
export const Sheet = Object.assign(
  {},
  {
    Root: SheetRoot,
    Trigger: SheetTrigger,
    Portal: SheetPortal,
    Backdrop: SheetBackdrop,
    Popup: SheetPopup,
    Title: SheetTitle,
    Description: SheetDescription,
    Close: SheetClose,
  },
);

export { sheetPopupVariants };

export type {
  SheetRootProps,
  SheetTriggerProps,
  SheetPortalProps,
  SheetBackdropProps,
  SheetPopupProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
};
