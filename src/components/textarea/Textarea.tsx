import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "ordu:flex ordu:min-h-[80px] ordu:w-full ordu:rounded-[var(--ord-radius)] ordu:border ordu:border-input ordu:bg-background ordu:px-3 ordu:py-2 ordu:text-sm ordu:text-foreground ordu:ring-offset-background ordu:placeholder:text-muted-foreground ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
