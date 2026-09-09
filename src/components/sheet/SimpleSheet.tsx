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
            <div className="ordu:flex-1 ordu:overflow-y-auto ordu:px-1 ordu:-mx-1">{children}</div>
            {footer !== null && <div className="ordu:flex ordu:justify-end ordu:gap-2">{footer}</div>}
            {showClose && (
              <Sheet.Close
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
              </Sheet.Close>
            )}
          </Sheet.Popup>
        </Sheet.Portal>
      </Sheet.Root>
    );
  },
);
SimpleSheet.displayName = "SimpleSheet";
