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
        "ordu:bg-card-bg ordu:text-card-foreground ordu:border ordu:border-border ordu:rounded-[var(--ord-radius)] ordu:shadow-sm ordu:p-4 ordu:cursor-pointer ordu:transition-colors ordu:hover:border-primary/50 ordu:hover:bg-accent/30",
        selected && "ordu:border-primary ordu:bg-accent/20",
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
  <div ref={ref} className={cn("ordu:flex ordu:items-center ordu:justify-between ordu:gap-2", className)} {...props} />
));
ConnectionCardHeader.displayName = "ConnectionCard.Header";

/* ----- Title ----- */
export type ConnectionCardTitleProps = ComponentPropsWithoutRef<"h3">;

const ConnectionCardTitle = forwardRef<HTMLHeadingElement, ConnectionCardTitleProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("ordu:text-sm ordu:font-semibold ordu:leading-tight", className)} {...props} />
));
ConnectionCardTitle.displayName = "ConnectionCard.Title";

/* ----- Description ----- */
export type ConnectionCardDescriptionProps = ComponentPropsWithoutRef<"p">;

const ConnectionCardDescription = forwardRef<HTMLParagraphElement, ConnectionCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("ordu:text-xs ordu:text-muted-foreground ordu:mt-1", className)} {...props} />
  ),
);
ConnectionCardDescription.displayName = "ConnectionCard.Description";

/* ----- Tags ----- */
export type ConnectionCardTagsProps = ComponentPropsWithoutRef<"div">;

const ConnectionCardTags = forwardRef<HTMLDivElement, ConnectionCardTagsProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:flex ordu:flex-wrap ordu:gap-1.5 ordu:mt-2", className)} {...props} />
));
ConnectionCardTags.displayName = "ConnectionCard.Tags";

/* ----- Namespace Export ----- */
export const ConnectionCard = Object.assign(ConnectionCardRoot, {
  Header: ConnectionCardHeader,
  Title: ConnectionCardTitle,
  Description: ConnectionCardDescription,
  Tags: ConnectionCardTags,
});
