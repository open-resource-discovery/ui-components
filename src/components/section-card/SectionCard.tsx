import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export type SectionCardRootProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const Root = forwardRef<HTMLDivElement, SectionCardRootProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ordu:rounded-lg ordu:border ordu:border-card-border ordu:bg-card-bg ordu:overflow-hidden",
      className,
    )}
    {...props}>
    {children}
  </div>
));
Root.displayName = "SectionCard.Root";

export type SectionCardHeaderProps = ComponentPropsWithoutRef<"div"> & {
  icon?: ReactNode;
  title: string;
  badges?: ReactNode;
};

const Header = forwardRef<HTMLDivElement, SectionCardHeaderProps>(
  ({ icon, title, badges, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("ordu:flex ordu:flex-wrap ordu:items-center ordu:gap-2 ordu:px-4 ordu:py-3", className)}
      {...props}>
      {icon && <span className="ordu:shrink-0 ordu:h-4 ordu:w-4 ordu:[&>svg]:h-full ordu:[&>svg]:w-full">{icon}</span>}
      <span className="ordu:text-sm ordu:font-medium ordu:flex-1 ordu:truncate">{title}</span>
      {badges && <div className="ordu:flex ordu:items-center ordu:gap-1.5">{badges}</div>}
    </div>
  ),
);
Header.displayName = "SectionCard.Header";

export type SectionCardContentProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const Content = forwardRef<HTMLDivElement, SectionCardContentProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:px-4 ordu:pb-4 ordu:pt-0", className)} {...props}>
    {children}
  </div>
));
Content.displayName = "SectionCard.Content";

export const SectionCard = Object.assign(Root, {
  Root,
  Header,
  Content,
});
