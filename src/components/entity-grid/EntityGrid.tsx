import { type CSSProperties, type ComponentPropsWithoutRef, type ReactElement, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface EntityGridProps<T> extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  items: T[];
  /** Renders each item. Alternative to passing pre-rendered `children`. */
  renderItem?: (item: T, index: number) => ReactNode;
  /** Pre-rendered items, used when `renderItem` is not supplied. */
  children?: ReactNode;
  /** Header slot receiving the item count. Caller formats the number/label (no default text). */
  renderCount?: (count: number) => ReactNode;
  /** Rendered when `items` is empty. Pass an `<EmptyState />` (or any node). */
  empty?: ReactNode;
  /** Minimum column width for the responsive auto-fill grid. Default "16rem". */
  minColumnWidth?: string;
}

/**
 * A responsive collection of entity cards with an optional count header and empty state.
 * Generic over the item type. When `items` is empty it renders the caller-provided `empty`
 * node (typically an `EmptyState`); otherwise it lays items out in an auto-filling grid
 * with `role="list"` semantics.
 */
export function EntityGrid<T>({
  items,
  renderItem,
  children,
  renderCount,
  empty,
  minColumnWidth = "16rem",
  className,
  style,
  ...props
}: EntityGridProps<T>): ReactElement {
  const header = renderCount ? (
    <div className="ordu:mb-3 ordu:text-sm ordu:text-muted-foreground">{renderCount(items.length)}</div>
  ) : null;

  if (items.length === 0) {
    return (
      <div className={cn(className)} style={style} {...props}>
        {header}
        {empty}
      </div>
    );
  }

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`,
    ...style,
  };

  return (
    <div className={cn(className)} {...props}>
      {header}
      <div role="list" className="ordu:grid ordu:gap-4" style={gridStyle}>
        {renderItem
          ? items.map((item, index) => (
              <div role="listitem" key={index}>
                {renderItem(item, index)}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}
EntityGrid.displayName = "EntityGrid";
