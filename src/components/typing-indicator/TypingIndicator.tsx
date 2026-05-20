import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export type TypingIndicatorProps = ComponentPropsWithoutRef<"div">;

export const TypingIndicator = forwardRef<HTMLDivElement, TypingIndicatorProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-1 px-4 py-2", className)} {...props}>
    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0s]" />
    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]" />
    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
  </div>
));
TypingIndicator.displayName = "TypingIndicator";
