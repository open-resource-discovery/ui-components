import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/utils/cn";
import { usePortalContainer } from "@/theme/ThemeRoot";

/* ----- Root ----- */
type DialogRootProps = ComponentPropsWithoutRef<typeof BaseDialog.Root>;

function DialogRoot(props: DialogRootProps): React.JSX.Element {
  return <BaseDialog.Root {...props} />;
}
DialogRoot.displayName = "Dialog.Root";

/* ----- Trigger ----- */
type DialogTriggerProps = ComponentPropsWithoutRef<typeof BaseDialog.Trigger>;

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({ className, ...props }, ref) => (
  <BaseDialog.Trigger ref={ref} className={cn("", className)} {...props} />
));
DialogTrigger.displayName = "Dialog.Trigger";

/* ----- Portal ----- */
type DialogPortalProps = ComponentPropsWithoutRef<typeof BaseDialog.Portal>;

function DialogPortal(props: DialogPortalProps): React.JSX.Element {
  const container = usePortalContainer();
  return <BaseDialog.Portal container={container} {...props} />;
}
DialogPortal.displayName = "Dialog.Portal";

/* ----- Backdrop ----- */
type DialogBackdropProps = ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>;

const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      "ordu:fixed ordu:inset-0 ordu:z-50 ordu:bg-dialog-backdrop ordu:data-[open]:animate-ord-fade-in ordu:data-[closed]:animate-ord-fade-out",
      className,
    )}
    {...props}
  />
));
DialogBackdrop.displayName = "Dialog.Backdrop";

/* ----- Popup ----- */
type DialogPopupProps = ComponentPropsWithoutRef<typeof BaseDialog.Popup>;

const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(({ className, ...props }, ref) => (
  <BaseDialog.Popup
    ref={ref}
    className={cn(
      "ordu:fixed ordu:left-1/2 ordu:top-1/2 ordu:z-50 ordu:-translate-x-1/2 ordu:-translate-y-1/2 ordu:w-full ordu:max-w-lg ordu:rounded-[var(--ord-radius)] ordu:border ordu:border-dialog-border ordu:bg-dialog-bg ordu:text-dialog-fg ordu:p-6 ordu:shadow-lg ordu:outline-none ordu:data-[open]:animate-ord-dialog-in ordu:data-[closed]:animate-ord-dialog-out",
      className,
    )}
    {...props}
  />
));
DialogPopup.displayName = "Dialog.Popup";

/* ----- Title ----- */
type DialogTitleProps = ComponentPropsWithoutRef<typeof BaseDialog.Title>;

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn("ordu:text-lg ordu:font-semibold ordu:leading-none ordu:tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "Dialog.Title";

/* ----- Description ----- */
type DialogDescriptionProps = ComponentPropsWithoutRef<typeof BaseDialog.Description>;

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn("ordu:mt-1.5 ordu:text-sm ordu:text-dialog-description-fg", className)}
    {...props}
  />
));
DialogDescription.displayName = "Dialog.Description";

/* ----- Close ----- */
type DialogCloseProps = ComponentPropsWithoutRef<typeof BaseDialog.Close>;

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(({ className, ...props }, ref) => (
  <BaseDialog.Close ref={ref} className={cn("", className)} {...props} />
));
DialogClose.displayName = "Dialog.Close";

/* ----- Namespace Export ----- */
export const Dialog = Object.assign(
  {},
  {
    Root: DialogRoot,
    Trigger: DialogTrigger,
    Portal: DialogPortal,
    Backdrop: DialogBackdrop,
    Popup: DialogPopup,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
  },
);

export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogBackdropProps,
  DialogPopupProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
};
