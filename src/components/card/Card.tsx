import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

/* ----- Root ----- */
type CardRootProps = ComponentPropsWithoutRef<'div'>;

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-card text-card-foreground border border-border rounded-[var(--ord-radius)] shadow-sm',
      className,
    )}
    {...props}
  />
));
CardRoot.displayName = 'Card';

/* ----- Header ----- */
type CardHeaderProps = ComponentPropsWithoutRef<'div'>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'Card.Header';

/* ----- Title ----- */
type CardTitleProps = ComponentPropsWithoutRef<'h3'>;

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'Card.Title';

/* ----- Description ----- */
type CardDescriptionProps = ComponentPropsWithoutRef<'p'>;

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
);
CardDescription.displayName = 'Card.Description';

/* ----- Content ----- */
type CardContentProps = ComponentPropsWithoutRef<'div'>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'Card.Content';

/* ----- Footer ----- */
type CardFooterProps = ComponentPropsWithoutRef<'div'>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'Card.Footer';

/* ----- Namespace Export ----- */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
