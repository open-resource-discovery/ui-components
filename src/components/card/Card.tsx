import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
type CardRootProps = ComponentPropsWithoutRef<"div">;

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ordu:bg-card-bg ordu:text-card-fg ordu:border ordu:border-card-border ordu:rounded-[var(--ord-radius)] ordu:shadow-sm",
      className,
    )}
    {...props}
  />
));
CardRoot.displayName = "Card";

/* ----- Header ----- */
type CardHeaderProps = ComponentPropsWithoutRef<"div">;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:flex ordu:flex-col ordu:space-y-1.5 ordu:p-6 ordu:pb-2", className)} {...props} />
));
CardHeader.displayName = "Card.Header";

/* ----- Title ----- */
type CardTitleProps = ComponentPropsWithoutRef<"h3">;

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("ordu:text-2xl ordu:font-semibold ordu:leading-none ordu:tracking-tight ordu:mb-1", className)}
    {...props}
  />
));
CardTitle.displayName = "Card.Title";

/* ----- Description ----- */
type CardDescriptionProps = ComponentPropsWithoutRef<"p">;

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("ordu:text-sm ordu:text-muted-foreground ordu:m-0", className)} {...props} />
));
CardDescription.displayName = "Card.Description";

/* ----- Content ----- */
type CardContentProps = ComponentPropsWithoutRef<"div">;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:p-6 ordu:pt-0", className)} {...props} />
));
CardContent.displayName = "Card.Content";

/* ----- Footer ----- */
type CardFooterProps = ComponentPropsWithoutRef<"div">;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:flex ordu:items-center ordu:p-6 ordu:pt-0", className)} {...props} />
));
CardFooter.displayName = "Card.Footer";

/* ----- Namespace Export ----- */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export type { CardRootProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps };
