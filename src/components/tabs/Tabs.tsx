import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
type TabsRootProps = ComponentPropsWithoutRef<typeof BaseTabs.Root>;

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(({ className, ...props }, ref) => (
  <BaseTabs.Root ref={ref} className={cn("w-full", className)} {...props} />
));
TabsRoot.displayName = "Tabs.Root";

/* ----- List ----- */
type TabsListProps = ComponentPropsWithoutRef<typeof BaseTabs.List>;

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      "inline-flex h-9 w-full items-center justify-start rounded-lg p-[3px] text-tabs-fg gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
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
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium cursor-pointer transition-[color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-tabs-fg hover:text-tabs-active-fg data-[active]:bg-tabs-active-bg data-[active]:text-tabs-active-fg data-[active]:shadow-sm",
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
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
    className={cn("absolute bottom-0 h-0.5 bg-tabs-indicator transition-all duration-200", className)}
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
