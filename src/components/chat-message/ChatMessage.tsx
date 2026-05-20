import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type ChatMessageProps = ComponentPropsWithoutRef<'div'> & {
  role: 'user' | 'agent';
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
        ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : undefined;

    const isUser = role === 'user';
    const hasActions =
      (onCopy !== null && onCopy !== undefined) || (onRetry !== null && onRetry !== undefined);

    return (
      <div
        ref={ref}
        className={cn('group flex', isUser ? 'justify-end' : 'justify-start', className)}
        {...props}
      >
        <div className={cn('flex items-end gap-2', isUser && 'flex-row-reverse')}>
          {icon && <div className="shrink-0 w-6 h-6">{icon}</div>}
          <div className="flex flex-col">
            <div className={cn('flex items-end gap-1', isUser && 'flex-row-reverse')}>
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-2 text-sm',
                  isUser
                    ? 'rounded-br-sm bg-primary text-primary-foreground'
                    : 'rounded-bl-sm bg-muted text-foreground',
                )}
              >
                {status && <div className="flex items-center gap-1.5 mb-2">{status}</div>}
                {children}
              </div>
              {hasActions && (
                <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onCopy && (
                    <button
                      type="button"
                      onClick={onCopy}
                      className="h-6 w-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      aria-label="Copy"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </button>
                  )}
                  {onRetry && (
                    <button
                      type="button"
                      onClick={onRetry}
                      className="h-6 w-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      aria-label="Retry"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
                  'text-[10px] text-muted-foreground mt-1',
                  isUser ? 'text-right' : 'text-left',
                )}
              >
                {formattedTime}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);
ChatMessage.displayName = 'ChatMessage';
