import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export type ChatMessageProps = ComponentPropsWithoutRef<"div"> & {
  role: "user" | "agent";
  timestamp?: Date | string;
  icon?: ReactNode;
  onCopy?: () => void;
  onRetry?: () => void;
  status?: ReactNode;
};

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ role, timestamp, icon, onCopy, onRetry, status, className, children, ...props }, ref) => {
    const formattedTime =
      timestamp !== null && timestamp !== undefined
        ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : undefined;

    const isUser = role === "user";
    const hasActions = (onCopy !== null && onCopy !== undefined) || (onRetry !== null && onRetry !== undefined);

    return (
      <div
        ref={ref}
        className={cn("ordu:group ordu:flex", isUser ? "ordu:justify-end" : "ordu:justify-start", className)}
        {...props}>
        <div className={cn("ordu:flex ordu:items-end ordu:gap-2", isUser && "ordu:flex-row-reverse")}>
          {icon && <div className="ordu:shrink-0 ordu:w-6 ordu:h-6">{icon}</div>}
          <div className="ordu:flex ordu:flex-col">
            <div className={cn("ordu:flex ordu:items-end ordu:gap-1", isUser && "ordu:flex-row-reverse")}>
              <div
                className={cn(
                  "ordu:max-w-[85%] ordu:rounded-2xl ordu:px-4 ordu:py-2 ordu:text-sm",
                  isUser
                    ? "ordu:rounded-br-sm ordu:bg-primary ordu:text-primary-foreground"
                    : "ordu:rounded-bl-sm ordu:bg-muted ordu:text-foreground",
                )}>
                {status && <div className="ordu:flex ordu:items-center ordu:gap-1.5 ordu:mb-2">{status}</div>}
                {children}
              </div>
              {hasActions && (
                <div className="ordu:flex ordu:flex-col ordu:gap-0.5 ordu:opacity-0 ordu:group-hover:opacity-100 ordu:transition-opacity">
                  {onCopy && (
                    <button
                      type="button"
                      onClick={onCopy}
                      className="ordu:h-6 ordu:w-6 ordu:inline-flex ordu:items-center ordu:justify-center ordu:rounded-md ordu:text-muted-foreground ordu:hover:text-foreground ordu:hover:bg-accent ordu:transition-colors"
                      aria-label="Copy">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </button>
                  )}
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="ordu:h-6 ordu:w-6 ordu:inline-flex ordu:items-center ordu:justify-center ordu:rounded-md ordu:text-muted-foreground ordu:hover:text-foreground ordu:hover:bg-accent ordu:transition-colors"
                      aria-label="Retry">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M3 21v-5h5" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
            {formattedTime && (
              <span
                className={cn(
                  "ordu:text-[10px] ordu:text-muted-foreground ordu:mt-1",
                  isUser ? "ordu:text-right" : "ordu:text-left",
                )}>
                {formattedTime}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);
ChatMessage.displayName = "ChatMessage";
