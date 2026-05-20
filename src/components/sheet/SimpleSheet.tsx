import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Sheet } from "./Sheet";

export interface SimpleSheetProps extends Omit<ComponentPropsWithoutRef<"div">, "title" | "children"> {
  trigger?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showClose?: boolean;
}

export const SimpleSheet = forwardRef<HTMLDivElement, SimpleSheetProps>(
  (
    {
      trigger,
      title,
      description,
      children,
      footer,
      side = "right",
      open,
      defaultOpen,
      onOpenChange,
      showClose = true,
      ...rest
    },
    ref,
  ): React.JSX.Element => {
    return (
      <Sheet.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        {trigger !== null && <Sheet.Trigger render={trigger as React.ReactElement} />}
        <Sheet.Portal>
          <Sheet.Backdrop />
          <Sheet.Popup ref={ref} side={side} {...rest}>
            {(title !== null || description !== null) && (
              <div>
                {title !== null && <Sheet.Title>{title}</Sheet.Title>}
                {description !== null && <Sheet.Description>{description}</Sheet.Description>}
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-1 -mx-1">{children}</div>
            {footer !== null && <div className="flex justify-end gap-2">{footer}</div>}
            {showClose && (
              <Sheet.Close
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
              </Sheet.Close>
            )}
          </Sheet.Popup>
        </Sheet.Portal>
      </Sheet.Root>
    );
  },
);
SimpleSheet.displayName = "SimpleSheet";
