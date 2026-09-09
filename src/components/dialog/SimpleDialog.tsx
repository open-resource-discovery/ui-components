import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Dialog } from "./Dialog";

export interface SimpleDialogProps extends Omit<ComponentPropsWithoutRef<"div">, "title" | "children"> {
  trigger?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showClose?: boolean;
}

export const SimpleDialog = forwardRef<HTMLDivElement, SimpleDialogProps>(
  (
    { trigger, title, description, children, footer, open, defaultOpen, onOpenChange, showClose = true, ...rest },
    ref,
  ): React.JSX.Element => {
    return (
      <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {trigger !== null && <Dialog.Trigger render={trigger as React.ReactElement} />}
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup ref={ref} {...rest}>
            {(title !== null || description !== null) && (
              <div className="ordu:mb-4">
                {title !== null && <Dialog.Title>{title}</Dialog.Title>}
                {description !== null && <Dialog.Description>{description}</Dialog.Description>}
              </div>
            )}
            {children}
            {footer !== null && <div className="ordu:mt-6 ordu:flex ordu:justify-end ordu:gap-2">{footer}</div>}
            {showClose && (
              <Dialog.Close
                aria-label="Close"
                className="ordu:absolute ordu:right-4 ordu:top-4 ordu:inline-flex ordu:h-6 ordu:w-6 ordu:items-center ordu:justify-center ordu:rounded-sm ordu:text-muted-foreground ordu:opacity-70 ordu:transition-opacity ordu:hover:opacity-100 ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring">
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Dialog.Close>
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);
SimpleDialog.displayName = "SimpleDialog";
