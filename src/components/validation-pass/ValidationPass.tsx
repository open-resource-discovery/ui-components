import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export interface ValidationPassProps extends ComponentPropsWithoutRef<"div"> {
  title?: string;
  suffix?: string;
}

export const ValidationPass = forwardRef<HTMLDivElement, ValidationPassProps>(
  ({ title = "All checks passed", suffix, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-center justify-center gap-4", className)} {...props}>
        <svg
          className="validation-pass-checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          aria-hidden="true">
          <circle className="validation-pass-circle" cx="26" cy="26" r="25" fill="none" />
          <path className="validation-pass-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <p className="text-lg">
          <span className="font-bold text-foreground">{title}</span>
          {suffix && <span className="font-normal text-muted-foreground">{suffix}</span>}
        </p>
      </div>
    );
  },
);
ValidationPass.displayName = "ValidationPass";
