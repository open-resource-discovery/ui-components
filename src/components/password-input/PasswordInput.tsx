import React, { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const EyeIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="ordu:relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "ordu:flex ordu:h-10 ordu:w-full ordu:rounded-[var(--ord-radius)] ordu:border ordu:border-input ordu:bg-background ordu:px-3 ordu:py-2 ordu:pr-10 ordu:text-sm ordu:text-foreground ordu:ring-offset-background ordu:placeholder:text-muted-foreground ordu:focus-visible:outline-none ordu:focus-visible:ring-2 ordu:focus-visible:ring-ring ordu:focus-visible:ring-offset-2 ordu:disabled:cursor-not-allowed ordu:disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        className="ordu:absolute ordu:right-3 ordu:top-1/2 ordu:-translate-y-1/2 ordu:text-muted-foreground ordu:hover:text-foreground ordu:focus-visible:outline-none"
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}>
        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
