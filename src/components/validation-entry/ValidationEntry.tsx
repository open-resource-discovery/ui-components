import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export type ValidationStatus = "pass" | "fail" | "warning";

export interface ValidationEntryProps extends ComponentPropsWithoutRef<"div"> {
  status: ValidationStatus;
  rule: string;
  message: string;
  path?: string;
}

const statusConfig = {
  pass: {
    borderColor: "var(--ord-success)",
    iconClass: "ordu:text-success",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ordu:h-4 ordu:w-4">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  warning: {
    borderColor: "var(--ord-warning)",
    iconClass: "ordu:text-warning",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ordu:h-4 ordu:w-4">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  fail: {
    borderColor: "var(--ord-destructive)",
    iconClass: "ordu:text-destructive",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ordu:h-4 ordu:w-4">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
};

export const ValidationEntry = forwardRef<HTMLDivElement, ValidationEntryProps>(
  ({ status, rule, message, path, className, style, ...props }, ref) => {
    const config = statusConfig[status];

    return (
      <div
        ref={ref}
        className={cn(
          "ordu:rounded-md ordu:border ordu:border-l-4 ordu:p-3 ordu:transition-all ordu:duration-150 ordu:hover:shadow-sm ordu:hover:translate-x-0.5",
          className,
        )}
        style={{ borderLeftColor: config.borderColor, ...style }}
        {...props}>
        <div className="ordu:flex ordu:items-start ordu:gap-2">
          <span className={cn("ordu:mt-0.5 ordu:shrink-0", config.iconClass)}>{config.icon}</span>
          <div className="ordu:flex-1 ordu:min-w-0 ordu:space-y-1">
            <div className="ordu:flex ordu:items-center ordu:gap-2 ordu:flex-wrap">
              <span className="ordu:font-medium ordu:text-sm">{rule}</span>
              {path && <code className="ordu:text-xs ordu:bg-muted ordu:px-1 ordu:rounded">{path}</code>}
            </div>
            <p className="ordu:text-sm ordu:text-muted-foreground">{message}</p>
          </div>
        </div>
      </div>
    );
  },
);
ValidationEntry.displayName = "ValidationEntry";
