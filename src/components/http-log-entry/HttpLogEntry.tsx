import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { CodeBlock } from "@/components/code-block";
import { Spinner } from "@/components/spinner";

export type HttpLogEntryProps = ComponentPropsWithoutRef<"div"> & {
  method: string;
  url: string;
  statusCode?: number;
  duration?: number;
  timestamp?: Date | string;
  requestBody?: string;
  requestHeaders?: Record<string, string>;
  responseBody?: string;
  responseStatus?: string;
  error?: string;
  highlighted?: boolean;
  defaultOpen?: boolean;
  highlighter?: Parameters<typeof CodeBlock>[0]["highlighter"];
  onResend?: () => void;
  onCopy?: () => void;
};

function formatJson(str: string | undefined): string {
  if (!str) return "";
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}

export const HttpLogEntry = forwardRef<HTMLDivElement, HttpLogEntryProps>(
  (
    {
      method,
      url,
      statusCode,
      duration,
      timestamp,
      requestBody,
      requestHeaders,
      responseBody,
      responseStatus,
      error,
      highlighted,
      defaultOpen = false,
      highlighter,
      onResend,
      onCopy,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(defaultOpen);

    const isPending = (statusCode === null || statusCode === undefined) && !error;
    const isError =
      (error !== null && error !== undefined) || (statusCode !== null && statusCode !== undefined && statusCode >= 400);
    const isSuccess = statusCode !== null && statusCode !== undefined && statusCode < 400;

    const formattedTime =
      timestamp !== null && timestamp !== undefined
        ? new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--ord-radius)] border bg-card-bg overflow-hidden",
          highlighted && "ring-2 ring-primary",
          className,
        )}
        {...props}>
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-accent/50 transition-colors cursor-pointer">
            {/* Status icon */}
            {isPending && <Spinner size="sm" className="h-3.5 w-3.5" />}
            {isSuccess && (
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
                className="shrink-0 text-success">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
            {isError && !isPending && (
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
                className="shrink-0 text-destructive">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}

            {/* Method badge */}
            <Badge variant="outline" size="sm" className="font-mono shrink-0">
              {method}
            </Badge>

            {/* Status code badge */}
            {statusCode !== null && statusCode !== undefined && (
              <Badge variant={statusCode < 400 ? "success" : "destructive"} size="sm" className="shrink-0">
                {statusCode}
              </Badge>
            )}

            {/* URL */}
            <span className="text-xs text-muted-foreground truncate flex-1 min-w-0">{url}</span>

            {/* Duration + Timestamp stacked */}
            {((duration !== null && duration !== undefined) || formattedTime) && (
              <div className="flex flex-col items-end shrink-0">
                {duration !== null && duration !== undefined && (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {duration}ms
                  </span>
                )}
                {formattedTime && <span className="text-[10px] text-muted-foreground">{formattedTime}</span>}
              </div>
            )}

            {/* Chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("shrink-0 transition-transform", open && "rotate-180")}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Collapsible.Trigger>

          <Collapsible.Panel className="border-t">
            <div className="p-3 space-y-4">
              {/* Action buttons */}
              {(onResend || onCopy) && (
                <div className="flex items-center gap-2">
                  {onResend && (
                    <Button variant="ghost" size="sm" onClick={onResend}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Resend
                    </Button>
                  )}
                  {onCopy && (
                    <Button variant="ghost" size="sm" onClick={onCopy}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      Copy as cURL
                    </Button>
                  )}
                </div>
              )}

              {/* Request section */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Request</h4>
                <div className="font-mono text-[11px] bg-muted p-2 rounded">POST {url}</div>

                {/* Headers */}
                {requestHeaders && Object.keys(requestHeaders).length > 0 && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Headers ({Object.keys(requestHeaders).length})
                    </summary>
                    <CodeBlock
                      code={JSON.stringify(requestHeaders, null, 2)}
                      language="json"
                      highlighter={highlighter}
                      className="mt-1 text-[11px]"
                    />
                  </details>
                )}

                {/* Body */}
                {requestBody && (
                  <details open className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Body</summary>
                    <CodeBlock
                      code={formatJson(requestBody)}
                      language="json"
                      highlighter={highlighter}
                      className="mt-1 text-[11px]"
                    />
                  </details>
                )}
              </div>

              {/* Response section */}
              {responseBody && (
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Response</h4>
                  {statusCode !== null && statusCode !== undefined && (
                    <div
                      className={cn(
                        "font-mono text-[11px] p-2 rounded",
                        statusCode < 400 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                      )}>
                      HTTP {statusCode} {responseStatus}
                    </div>
                  )}
                  <details open className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Body</summary>
                    <CodeBlock
                      code={formatJson(responseBody)}
                      language="json"
                      highlighter={highlighter}
                      className="mt-1 text-[11px]"
                    />
                  </details>
                </div>
              )}

              {/* Error block */}
              {error && <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">{error}</div>}
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>
    );
  },
);
HttpLogEntry.displayName = "HttpLogEntry";
