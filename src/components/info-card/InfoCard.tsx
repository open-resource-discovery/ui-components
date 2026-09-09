import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
export type InfoCardRootProps = ComponentPropsWithoutRef<"div">;

const InfoCardRoot = forwardRef<HTMLDivElement, InfoCardRootProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ordu:bg-card-bg ordu:text-card-fg ordu:border ordu:border-card-border ordu:rounded-[var(--ord-radius)] ordu:shadow-sm",
      className,
    )}
    {...props}
  />
));
InfoCardRoot.displayName = "InfoCard";

/* ----- Header ----- */
export type InfoCardHeaderProps = ComponentPropsWithoutRef<"div">;

const InfoCardHeader = forwardRef<HTMLDivElement, InfoCardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:flex ordu:items-center ordu:gap-3 ordu:p-4", className)} {...props} />
));
InfoCardHeader.displayName = "InfoCard.Header";

/* ----- Icon ----- */
export interface InfoCardIconProps {
  children?: ReactNode;
  className?: string;
}

function InfoCardIcon({ children, className }: InfoCardIconProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "ordu:flex ordu:h-10 ordu:w-10 ordu:shrink-0 ordu:items-center ordu:justify-center ordu:rounded-lg ordu:border ordu:bg-muted",
        className,
      )}>
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ordu:text-muted-foreground">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      )}
    </div>
  );
}
InfoCardIcon.displayName = "InfoCard.Icon";

/* ----- Title ----- */
export type InfoCardTitleProps = ComponentPropsWithoutRef<"h2">;

const InfoCardTitle = forwardRef<HTMLHeadingElement, InfoCardTitleProps>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("ordu:text-base ordu:font-semibold ordu:leading-tight ordu:m-0", className)} {...props} />
));
InfoCardTitle.displayName = "InfoCard.Title";

/* ----- Subtitle ----- */
export type InfoCardSubtitleProps = ComponentPropsWithoutRef<"p">;

const InfoCardSubtitle = forwardRef<HTMLParagraphElement, InfoCardSubtitleProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("ordu:text-xs ordu:text-muted-foreground ordu:m-0", className)} {...props} />
));
InfoCardSubtitle.displayName = "InfoCard.Subtitle";

/* ----- Content ----- */
export type InfoCardContentProps = ComponentPropsWithoutRef<"div">;

const InfoCardContent = forwardRef<HTMLDivElement, InfoCardContentProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ordu:flex ordu:flex-col ordu:gap-3 ordu:px-4 ordu:pb-4 ordu:pt-0", className)}
    {...props}
  />
));
InfoCardContent.displayName = "InfoCard.Content";

/* ----- Section ----- */
export type InfoCardSectionProps = ComponentPropsWithoutRef<"div">;

const InfoCardSection = forwardRef<HTMLDivElement, InfoCardSectionProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:flex ordu:flex-col ordu:gap-1", className)} {...props} />
));
InfoCardSection.displayName = "InfoCard.Section";

/* ----- Namespace Export ----- */
export const InfoCard = Object.assign(InfoCardRoot, {
  Header: InfoCardHeader,
  Icon: InfoCardIcon,
  Title: InfoCardTitle,
  Subtitle: InfoCardSubtitle,
  Content: InfoCardContent,
  Section: InfoCardSection,
});
