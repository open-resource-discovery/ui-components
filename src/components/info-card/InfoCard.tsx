import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
export type InfoCardRootProps = ComponentPropsWithoutRef<"div">;

const InfoCardRoot = forwardRef<HTMLDivElement, InfoCardRootProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-card text-card-foreground border border-border rounded-[var(--ord-radius)] shadow-sm", className)}
    {...props}
  />
));
InfoCardRoot.displayName = "InfoCard";

/* ----- Header ----- */
export type InfoCardHeaderProps = ComponentPropsWithoutRef<"div">;

const InfoCardHeader = forwardRef<HTMLDivElement, InfoCardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-3 p-4 pb-0", className)} {...props} />
));
InfoCardHeader.displayName = "InfoCard.Header";

/* ----- Icon ----- */
export interface InfoCardIconProps {
  children?: ReactNode;
  className?: string;
}

function InfoCardIcon({ children, className }: InfoCardIconProps): React.JSX.Element {
  return (
    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted", className)}>
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
          className="text-muted-foreground">
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
  <h2 ref={ref} className={cn("text-base font-semibold leading-tight", className)} {...props} />
));
InfoCardTitle.displayName = "InfoCard.Title";

/* ----- Subtitle ----- */
export type InfoCardSubtitleProps = ComponentPropsWithoutRef<"p">;

const InfoCardSubtitle = forwardRef<HTMLParagraphElement, InfoCardSubtitleProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
));
InfoCardSubtitle.displayName = "InfoCard.Subtitle";

/* ----- Content ----- */
export type InfoCardContentProps = ComponentPropsWithoutRef<"div">;

const InfoCardContent = forwardRef<HTMLDivElement, InfoCardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-3 p-4", className)} {...props} />
));
InfoCardContent.displayName = "InfoCard.Content";

/* ----- Section ----- */
export type InfoCardSectionProps = ComponentPropsWithoutRef<"div">;

const InfoCardSection = forwardRef<HTMLDivElement, InfoCardSectionProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
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
