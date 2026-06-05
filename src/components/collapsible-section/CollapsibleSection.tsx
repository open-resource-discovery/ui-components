import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
export interface CollapsibleSectionRootProps extends ComponentPropsWithoutRef<typeof Collapsible.Root> {
  className?: string;
  bordered?: boolean;
}

function CollapsibleSectionRoot({ className, bordered, ...props }: CollapsibleSectionRootProps): React.JSX.Element {
  return (
    <Collapsible.Root
      className={cn(
        "flex flex-col py-1",
        bordered && "rounded-lg border bg-card-bg p-2",
        !bordered && "border-b last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}
CollapsibleSectionRoot.displayName = "CollapsibleSection.Root";

/* ----- Trigger ----- */
export interface CollapsibleSectionTriggerProps extends ComponentPropsWithoutRef<typeof Collapsible.Trigger> {
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  badges?: ReactNode;
  description?: string;
}

const CollapsibleSectionTrigger = forwardRef<HTMLButtonElement, CollapsibleSectionTriggerProps>(
  ({ className, children, icon, badges, description, ...props }, ref) => (
    <Collapsible.Trigger
      ref={ref}
      className={cn(
        "group flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-full",
        className,
      )}
      {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3 shrink-0 transition-transform data-[panel-open]:rotate-90">
        <polyline points="9 18 15 12 9 6" />
      </svg>
      {icon && <span className="shrink-0 h-4 w-4 [&>svg]:h-full [&>svg]:w-full">{icon}</span>}
      <span className="flex-1 truncate text-left">{children}</span>
      {badges && <div className="flex items-center gap-1.5 shrink-0">{badges}</div>}
      {description && (
        <span className="basis-full pl-[18px] text-xs font-normal text-muted-foreground truncate text-left group-data-[panel-open]:hidden">
          {description}
        </span>
      )}
    </Collapsible.Trigger>
  ),
);
CollapsibleSectionTrigger.displayName = "CollapsibleSection.Trigger";

/* ----- Content ----- */
export interface CollapsibleSectionContentProps extends ComponentPropsWithoutRef<typeof Collapsible.Panel> {
  className?: string;
}

const CollapsibleSectionContent = forwardRef<HTMLDivElement, CollapsibleSectionContentProps>(
  ({ className, ...props }, ref) => <Collapsible.Panel ref={ref} className={cn("mt-1.5", className)} {...props} />,
);
CollapsibleSectionContent.displayName = "CollapsibleSection.Content";

/* ----- Namespace Export ----- */
export const CollapsibleSection = Object.assign(
  {},
  {
    Root: CollapsibleSectionRoot,
    Trigger: CollapsibleSectionTrigger,
    Content: CollapsibleSectionContent,
  },
);
