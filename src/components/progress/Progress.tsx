import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "@/utils/cn";

/* ----- Root ----- */
export type ProgressRootProps = ComponentPropsWithoutRef<typeof BaseProgress.Root>;

const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(({ className, ...props }, ref) => (
  <BaseProgress.Root ref={ref} className={cn("ordu:flex ordu:w-full ordu:flex-col ordu:gap-1", className)} {...props} />
));
ProgressRoot.displayName = "Progress.Root";

/* ----- Track ----- */
export type ProgressTrackProps = ComponentPropsWithoutRef<typeof BaseProgress.Track>;

const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(({ className, ...props }, ref) => (
  <BaseProgress.Track
    ref={ref}
    className={cn(
      "ordu:relative ordu:h-2 ordu:w-full ordu:overflow-hidden ordu:rounded-full ordu:bg-progress-track",
      className,
    )}
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
      "ordu:h-full ordu:rounded-full ordu:bg-progress-indicator ordu:transition-[width] ordu:data-[state=indeterminate]:animate-progress-indeterminate",
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
