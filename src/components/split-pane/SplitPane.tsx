import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "@/utils/cn";

type Orientation = "horizontal" | "vertical";

const OrientationContext = createContext<Orientation>("horizontal");

export type SplitPaneRootProps = ComponentPropsWithoutRef<"div"> & {
  orientation?: Orientation;
  autoSaveId?: string;
  children: ReactNode;
};

const Root = forwardRef<HTMLDivElement, SplitPaneRootProps>(
  ({ orientation = "horizontal", autoSaveId, children, className, style, ...props }, ref) => {
    return (
      <OrientationContext.Provider value={orientation}>
        <Group
          orientation={orientation}
          id={autoSaveId}
          className={cn("ordu:h-full ordu:overflow-hidden", className)}
          style={style}
          elementRef={ref}
          {...props}>
          {children}
        </Group>
      </OrientationContext.Provider>
    );
  },
);
Root.displayName = "SplitPane.Root";

export type SplitPanelProps = ComponentPropsWithoutRef<"div"> & {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  onCollapse?: () => void;
  onExpand?: () => void;
  children: ReactNode;
};

const PanelSlot = forwardRef<HTMLDivElement, SplitPanelProps>(
  (
    {
      defaultSize,
      minSize,
      maxSize,
      collapsible,
      collapsedSize,
      onCollapse,
      onExpand,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <Panel
        defaultSize={defaultSize}
        minSize={minSize}
        maxSize={maxSize}
        collapsible={collapsible}
        collapsedSize={collapsedSize}
        onResize={(size) => {
          if (collapsible && collapsedSize !== null && collapsedSize !== undefined) {
            const sizeNum = typeof size === "number" ? size : parseFloat(String(size));
            if (sizeNum <= collapsedSize) {
              onCollapse?.();
            } else {
              onExpand?.();
            }
          }
        }}
        className={cn("ordu:overflow-auto", className)}
        style={style}
        elementRef={ref}
        {...props}>
        {children}
      </Panel>
    );
  },
);
PanelSlot.displayName = "SplitPane.Panel";

export type SplitPaneHandleProps = ComponentPropsWithoutRef<"div"> & {
  showGrip?: boolean;
};

const Handle = forwardRef<HTMLDivElement, SplitPaneHandleProps>(({ showGrip = true, className, ...props }, ref) => {
  const orientation = useContext(OrientationContext);
  const isHorizontal = orientation === "horizontal";

  return (
    <Separator
      className={cn(
        "ordu:group ordu:relative ordu:flex ordu:items-center ordu:justify-center ordu:transition-colors",
        isHorizontal ? "ordu:w-2 ordu:hover:bg-border" : "ordu:h-2 ordu:hover:bg-border",
        "ordu:bg-border/50",
        className,
      )}
      elementRef={ref}
      {...props}>
      {showGrip && (
        <div
          className={cn(
            "ordu:absolute ordu:z-10 ordu:flex ordu:items-center ordu:justify-center ordu:rounded-sm ordu:bg-border ordu:opacity-0 ordu:transition-opacity ordu:group-hover:opacity-100",
            isHorizontal ? "ordu:h-8 ordu:w-4" : "ordu:h-4 ordu:w-8",
          )}>
          {isHorizontal ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ordu:text-muted-foreground">
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ordu:text-muted-foreground">
              <circle cx="12" cy="9" r="1" />
              <circle cx="5" cy="9" r="1" />
              <circle cx="19" cy="9" r="1" />
              <circle cx="12" cy="15" r="1" />
              <circle cx="5" cy="15" r="1" />
              <circle cx="19" cy="15" r="1" />
            </svg>
          )}
        </div>
      )}
    </Separator>
  );
});
Handle.displayName = "SplitPane.Handle";

export const SplitPane = Object.assign(Root, {
  Root,
  Panel: PanelSlot,
  Handle,
});
