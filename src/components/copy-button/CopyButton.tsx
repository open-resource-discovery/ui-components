import { forwardRef, useCallback, useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buttonVariants, type ButtonProps } from "@/components/button";

export type CopyState = "idle" | "copied" | "error";

const CopyIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CopiedIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ErrorIcon = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export interface CopyButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "children" | "onCopy">,
    Pick<ButtonProps, "variant" | "size"> {
  /** Text written to the clipboard. */
  value: string;
  /** Milliseconds before the button returns to its idle state. Default 2000. */
  timeout?: number;
  /** Idle content (icon and/or label). Defaults to a copy icon. */
  children?: ReactNode;
  /** Content shown in the `copied` state. Defaults to a check icon. */
  copiedContent?: ReactNode;
  /** Content shown in the `error` state. Defaults to a cross icon. */
  errorContent?: ReactNode;
  /** Accessible name for the button (no default text; icon-only otherwise). */
  label?: string;
  /** Announced via `aria-live` on a successful copy. */
  copiedAnnouncement?: string;
  /** Announced via `aria-live` when the copy fails. */
  errorAnnouncement?: string;
  /** Called after each attempt with whether it succeeded. */
  onCopy?: (ok: boolean) => void;
}

/**
 * A clipboard-copy button with transient success/error feedback and an `aria-live`
 * status region. Requires `navigator.clipboard`; when it is unavailable or denied,
 * the button enters the `error` state.
 */
const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      timeout = 2000,
      children,
      copiedContent,
      errorContent,
      label,
      copiedAnnouncement,
      errorAnnouncement,
      onCopy,
      variant = "ghost",
      size = "icon",
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = useState<CopyState>("idle");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = useCallback(() => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }, []);

    useEffect(() => clearTimer, [clearTimer]);

    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      async (event) => {
        onClick?.(event);
        let ok = false;
        try {
          if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
          await navigator.clipboard.writeText(value);
          ok = true;
        } catch {
          // Clipboard unavailable or denied — fall through to the error state.
        }
        setState(ok ? "copied" : "error");
        onCopy?.(ok);
        clearTimer();
        timer.current = setTimeout(() => setState("idle"), timeout);
      },
      [value, timeout, onClick, onCopy, clearTimer],
    );

    const content =
      state === "copied"
        ? (copiedContent ?? CopiedIcon)
        : state === "error"
          ? (errorContent ?? ErrorIcon)
          : (children ?? CopyIcon);

    const announcement = state === "copied" ? copiedAnnouncement : state === "error" ? errorAnnouncement : undefined;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}>
        {content}
        <span role="status" aria-live="polite" className="ordu:sr-only">
          {announcement}
        </span>
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
