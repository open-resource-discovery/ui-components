import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "ordu:flex ordu:h-10 ordu:w-full ordu:rounded-[var(--ord-radius)] ordu:border ordu:border-input-border ordu:bg-input-bg ordu:px-3 ordu:py-2 ordu:text-sm ordu:text-input-fg ordu:ring-offset-background ordu:file:border-0 ordu:file:bg-transparent ordu:file:text-sm ordu:file:font-medium ordu:placeholder:text-input-placeholder ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
