import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
export type ProgressRootProps = ComponentPropsWithoutRef<typeof BaseProgress.Root>;

const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(({ className, ...props }, ref) => (
  <BaseProgress.Root ref={ref} className={cn("flex w-full flex-col gap-1", className)} {...props} />
));
ProgressRoot.displayName = "Progress.Root";

/* ----- Track ----- */
export type ProgressTrackProps = ComponentPropsWithoutRef<typeof BaseProgress.Track>;

const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(({ className, ...props }, ref) => (
  <BaseProgress.Track
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-progress-track", className)}
    {...props}
  />
));
ProgressTrack.displayName = "Progress.Track";

/* ----- Indicator ----- */
export type ProgressIndicatorProps = ComponentPropsWithoutRef<typeof BaseProgress.Indicator>;

const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(({ className, ...props }, ref) => (
  <BaseProgress.Indicator
    ref={ref}
    className={cn(
      "h-full rounded-full bg-progress-indicator transition-[width] data-[state=indeterminate]:animate-progress-indeterminate",
      className,
    )}
    {...props}
  />
));
ProgressIndicator.displayName = "Progress.Indicator";

/* ----- Namespace Export ----- */
export const Progress = Object.assign(
  {},
  {
    Root: ProgressRoot,
    Track: ProgressTrack,
    Indicator: ProgressIndicator,
  },
);
