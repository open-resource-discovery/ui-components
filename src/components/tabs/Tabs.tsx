import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
type TabsRootProps = ComponentPropsWithoutRef<typeof BaseTabs.Root>;

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(({ className, ...props }, ref) => (
  <BaseTabs.Root ref={ref} className={cn("ordu:w-full", className)} {...props} />
));
TabsRoot.displayName = "Tabs.Root";

/* ----- List ----- */
type TabsListProps = ComponentPropsWithoutRef<typeof BaseTabs.List>;

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      "ordu:inline-flex ordu:h-9 ordu:w-full ordu:items-center ordu:justify-start ordu:rounded-lg ordu:p-[3px] ordu:text-tabs-fg ordu:gap-1 ordu:overflow-x-auto ordu:[&::-webkit-scrollbar]:hidden ordu:[-ms-overflow-style:none] ordu:[scrollbar-width:none]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "Tabs.List";

/* ----- Tab ----- */
type TabsTabProps = ComponentPropsWithoutRef<typeof BaseTabs.Tab>;

const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(({ className, ...props }, ref) => (
  <BaseTabs.Tab
    ref={ref}
    className={cn(
      "ordu:inline-flex ordu:items-center ordu:justify-center ordu:gap-1.5 ordu:whitespace-nowrap ordu:rounded-md ordu:px-2.5 ordu:py-1.5 ordu:text-sm ordu:font-medium ordu:cursor-pointer ordu:transition-[color,box-shadow] ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:pointer-events-none ordu:disabled:opacity-50 ordu:text-tabs-fg ordu:hover:text-tabs-active-fg ordu:data-[active]:bg-tabs-active-bg ordu:data-[active]:text-tabs-active-fg ordu:data-[active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTab.displayName = "Tabs.Tab";

/* ----- Panel ----- */
type TabsPanelProps = ComponentPropsWithoutRef<typeof BaseTabs.Panel>;

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(({ className, ...props }, ref) => (
  <BaseTabs.Panel
    ref={ref}
    className={cn(
      "ordu:mt-2 ordu:ring-offset-background ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsPanel.displayName = "Tabs.Panel";

/* ----- Indicator ----- */
type TabsIndicatorProps = ComponentPropsWithoutRef<typeof BaseTabs.Indicator>;

const TabsIndicator = forwardRef<HTMLSpanElement, TabsIndicatorProps>(({ className, ...props }, ref) => (
  <BaseTabs.Indicator
    ref={ref}
    className={cn(
      "ordu:absolute ordu:bottom-0 ordu:h-0.5 ordu:bg-tabs-indicator ordu:transition-all ordu:duration-200",
      className,
    )}
    {...props}
  />
));
TabsIndicator.displayName = "Tabs.Indicator";

/* ----- Namespace Export ----- */
export const Tabs = Object.assign(
  {},
  {
    Root: TabsRoot,
    List: TabsList,
    Tab: TabsTab,
    Panel: TabsPanel,
    Indicator: TabsIndicator,
  },
);

export type { TabsRootProps, TabsListProps, TabsTabProps, TabsPanelProps, TabsIndicatorProps };
