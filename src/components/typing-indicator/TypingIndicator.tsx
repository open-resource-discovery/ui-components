import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export type TypingIndicatorProps = ComponentPropsWithoutRef<"div">;

export const TypingIndicator = forwardRef<HTMLDivElement, TypingIndicatorProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ordu:flex ordu:items-center ordu:gap-1 ordu:px-4 ordu:py-2", className)} {...props}>
    <span className="ordu:w-2 ordu:h-2 ordu:rounded-full ordu:bg-muted-foreground ordu:animate-ord-bounce ordu:[animation-delay:0s]" />
    <span className="ordu:w-2 ordu:h-2 ordu:rounded-full ordu:bg-muted-foreground ordu:animate-ord-bounce ordu:[animation-delay:0.15s]" />
    <span className="ordu:w-2 ordu:h-2 ordu:rounded-full ordu:bg-muted-foreground ordu:animate-ord-bounce ordu:[animation-delay:0.3s]" />
  </div>
));
TypingIndicator.displayName = "TypingIndicator";
