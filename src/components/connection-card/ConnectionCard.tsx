import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
export interface ConnectionCardRootProps extends ComponentPropsWithoutRef<"div"> {
  selected?: boolean;
}

const ConnectionCardRoot = forwardRef<HTMLDivElement, ConnectionCardRootProps>(
  ({ className, selected, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground border border-border rounded-[var(--ord-radius)] shadow-sm p-4 cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent/30",
        selected && "border-primary bg-accent/20",
        className,
      )}
      {...props}
    />
  ),
);
ConnectionCardRoot.displayName = "ConnectionCard";

/* ----- Header ----- */
export type ConnectionCardHeaderProps = ComponentPropsWithoutRef<"div">;

const ConnectionCardHeader = forwardRef<HTMLDivElement, ConnectionCardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-between gap-2", className)} {...props} />
));
ConnectionCardHeader.displayName = "ConnectionCard.Header";

/* ----- Title ----- */
export type ConnectionCardTitleProps = ComponentPropsWithoutRef<"h3">;

const ConnectionCardTitle = forwardRef<HTMLHeadingElement, ConnectionCardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-sm font-semibold leading-tight", className)} {...props} />
));
ConnectionCardTitle.displayName = "ConnectionCard.Title";

/* ----- Description ----- */
export type ConnectionCardDescriptionProps = ComponentPropsWithoutRef<"p">;

const ConnectionCardDescription = forwardRef<HTMLParagraphElement, ConnectionCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-muted-foreground mt-1", className)} {...props} />
  ),
);
ConnectionCardDescription.displayName = "ConnectionCard.Description";

/* ----- Tags ----- */
export type ConnectionCardTagsProps = ComponentPropsWithoutRef<"div">;

const ConnectionCardTags = forwardRef<HTMLDivElement, ConnectionCardTagsProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-wrap gap-1.5 mt-2", className)} {...props} />
));
ConnectionCardTags.displayName = "ConnectionCard.Tags";

/* ----- Namespace Export ----- */
export const ConnectionCard = Object.assign(ConnectionCardRoot, {
  Header: ConnectionCardHeader,
  Title: ConnectionCardTitle,
  Description: ConnectionCardDescription,
  Tags: ConnectionCardTags,
});
