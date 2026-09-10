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
      "ordu:fixed ordu:inset-0 ordu:z-50 ordu:bg-sheet-backdrop ordu:data-[open]:animate-ord-fade-in ordu:data-[closed]:animate-ord-fade-out",
      className,
    )}
    {...props}
  />
));
SheetBackdrop.displayName = "Sheet.Backdrop";

/* ----- Popup ----- */
const sheetPopupVariants = cva(
  "ordu:fixed ordu:z-50 ordu:bg-sheet-bg ordu:text-sheet-fg ordu:shadow-lg ordu:outline-none ordu:flex ordu:flex-col ordu:gap-4 ordu:p-6",
  {
    variants: {
      side: {
        top: "ordu:inset-x-0 ordu:top-0 ordu:border-b ordu:border-sheet-border ordu:w-full ordu:data-[open]:animate-ord-slide-in-from-top ordu:data-[closed]:animate-ord-slide-out-to-top",
        bottom:
          "ordu:inset-x-0 ordu:bottom-0 ordu:border-t ordu:border-sheet-border ordu:w-full ordu:data-[open]:animate-ord-slide-in-from-bottom ordu:data-[closed]:animate-ord-slide-out-to-bottom",
        left: "ordu:inset-y-0 ordu:left-0 ordu:border-r ordu:border-sheet-border ordu:h-full ordu:w-3/4 ordu:sm:max-w-sm ordu:data-[open]:animate-ord-slide-in-from-left ordu:data-[closed]:animate-ord-slide-out-to-left",
        right:
          "ordu:inset-y-0 ordu:right-0 ordu:border-l ordu:border-sheet-border ordu:h-full ordu:w-3/4 ordu:sm:max-w-sm ordu:data-[open]:animate-ord-slide-in-from-right ordu:data-[closed]:animate-ord-slide-out-to-right",
      },
    },
    defaultVariants: { side: "right" },
  },
);

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
    className={cn("ordu:text-lg ordu:font-semibold ordu:leading-none ordu:tracking-tight", className)}
    {...props}
  />
));
SheetTitle.displayName = "Sheet.Title";

/* ----- Description ----- */
type SheetDescriptionProps = ComponentPropsWithoutRef<typeof BaseDialog.Description>;

const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn("ordu:mt-1.5 ordu:text-sm ordu:text-sheet-description-fg", className)}
    {...props}
  />
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
