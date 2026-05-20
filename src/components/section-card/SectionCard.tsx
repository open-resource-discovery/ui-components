import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type SectionCardRootProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
};

const Root = forwardRef<HTMLDivElement, SectionCardRootProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Root.displayName = 'SectionCard.Root';

export type SectionCardHeaderProps = ComponentPropsWithoutRef<'div'> & {
  icon?: ReactNode;
  title: string;
  badges?: ReactNode;
};

const Header = forwardRef<HTMLDivElement, SectionCardHeaderProps>(
  ({ icon, title, badges, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 px-4 py-3', className)} {...props}>
      {icon && (
        <span className="shrink-0 h-4 w-4 text-muted-foreground [&>svg]:h-full [&>svg]:w-full">
          {icon}
        </span>
      )}
      <span className="text-sm font-medium flex-1">{title}</span>
      {badges && <div className="flex items-center gap-1.5 shrink-0">{badges}</div>}
    </div>
  ),
);
Header.displayName = 'SectionCard.Header';

export type SectionCardContentProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
};

const Content = forwardRef<HTMLDivElement, SectionCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('px-4 pb-4 pt-0', className)} {...props}>
      {children}
    </div>
  ),
);
Content.displayName = 'SectionCard.Content';

export const SectionCard = Object.assign(Root, {
  Root,
  Header,
  Content,
});
