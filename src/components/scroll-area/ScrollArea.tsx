import { forwardRef, useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

export type ScrollAreaProps = ComponentPropsWithoutRef<"div"> & {
  autoScroll?: boolean;
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ autoScroll = true, className, children, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);

    const scrollRef = (ref as React.RefObject<HTMLDivElement>) ?? internalRef;

    useEffect(() => {
      if (!autoScroll) return;
      const el = scrollRef.current;
      if (!el) return;

      const observer = new MutationObserver(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });

      observer.observe(el, { childList: true, subtree: true });
      return (): void => {
        observer.disconnect();
      };
    }, [autoScroll, scrollRef]);

    return (
      <div ref={scrollRef} className={cn("flex-1 overflow-y-auto", className)} {...props}>
        {children}
      </div>
    );
  },
);
ScrollArea.displayName = "ScrollArea";
