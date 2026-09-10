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
        "ordu:flex ordu:flex-col ordu:py-1",
        bordered && "ordu:rounded-lg ordu:border ordu:bg-card-bg ordu:p-2",
        !bordered && "ordu:border-b ordu:data-[open]:border-b-0 ordu:last:border-b-0",
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
        "ordu:group ordu:flex ordu:flex-wrap ordu:items-center ordu:gap-1.5 ordu:text-sm ordu:font-medium ordu:text-muted-foreground ordu:hover:text-foreground ordu:transition-colors ordu:cursor-pointer ordu:w-full",
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
        className="ordu:h-3 ordu:w-3 ordu:shrink-0 ordu:transition-transform ordu:group-data-[panel-open]:rotate-90">
        <polyline points="9 18 15 12 9 6" />
      </svg>
      {icon && <span className="ordu:shrink-0 ordu:h-4 ordu:w-4 ordu:[&>svg]:h-full ordu:[&>svg]:w-full">{icon}</span>}
      <span className="ordu:flex-1 ordu:truncate ordu:text-left">{children}</span>
      {badges && <div className="ordu:flex ordu:items-center ordu:gap-1.5">{badges}</div>}
      {description && (
        <span className="ordu:basis-full ordu:pl-[18px] ordu:text-xs ordu:font-normal ordu:text-muted-foreground ordu:truncate ordu:text-left ordu:group-data-[panel-open]:hidden">
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
  ({ className, ...props }, ref) => <Collapsible.Panel ref={ref} className={cn("ordu:mt-1.5", className)} {...props} />,
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
