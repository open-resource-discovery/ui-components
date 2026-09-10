import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { CodeBlock } from "@/components/code-block";
import { CodeEditor } from "@/components/code-editor";
import { Spinner } from "@/components/spinner";

export type HttpLogEntryEditPayload = {
  headers: Record<string, string>;
  body: string;
};

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
  extraBadges?: ReactNode;
  responseBodyContent?: ReactNode;
  onResend?: () => void;
  onCopy?: () => void;
  onEdit?: (payload: HttpLogEntryEditPayload) => void;
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
      extraBadges,
      responseBodyContent,
      onResend,
      onCopy,
      onEdit,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const [editOpen, setEditOpen] = useState(false);
    const [editHeaders, setEditHeaders] = useState("");
    const [editBody, setEditBody] = useState("");
    const [copied, setCopied] = useState(false);

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
          "ordu:rounded-[var(--ord-radius)] ordu:border ordu:bg-card-bg ordu:overflow-hidden",
          highlighted && "ordu:ring-2 ordu:ring-primary",
          className,
        )}
        {...props}>
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger className="ordu:flex ordu:items-center ordu:gap-2 ordu:w-full ordu:px-3 ordu:py-2 ordu:text-left ordu:hover:bg-accent/50 ordu:transition-colors ordu:cursor-pointer">
            {/* Status icon */}
            {isPending && <Spinner size="sm" className="ordu:h-3.5 ordu:w-3.5" />}
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
                className="ordu:shrink-0 ordu:text-success">
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
                className="ordu:shrink-0 ordu:text-destructive">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}

            {/* Method badge */}
            <Badge variant="outline" size="sm" className="ordu:font-mono ordu:shrink-0">
              {method}
            </Badge>

            {/* Extra badges (e.g. SSE, WS) */}
            {extraBadges}

            {/* Status code badge */}
            {statusCode !== null && statusCode !== undefined && (
              <Badge variant={statusCode < 400 ? "success" : "destructive"} size="sm" className="ordu:shrink-0">
                {statusCode}
              </Badge>
            )}

            {/* URL */}
            <span className="ordu:text-xs ordu:text-muted-foreground ordu:truncate ordu:flex-1 ordu:min-w-0">
              {url}
            </span>

            {/* Duration + Timestamp stacked */}
            {((duration !== null && duration !== undefined) || formattedTime) && (
              <div className="ordu:flex ordu:flex-col ordu:items-end ordu:shrink-0">
                {duration !== null && duration !== undefined && (
                  <span className="ordu:text-[10px] ordu:text-muted-foreground ordu:flex ordu:items-center ordu:gap-0.5">
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
                {formattedTime && <span className="ordu:text-[10px] ordu:text-muted-foreground">{formattedTime}</span>}
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
              className={cn("ordu:shrink-0 ordu:transition-transform", open && "ordu:rotate-180")}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Collapsible.Trigger>

          <Collapsible.Panel className="ordu:border-t">
            <div className="ordu:p-3 ordu:space-y-4">
              {/* Action buttons */}
              {(onResend || onCopy || onEdit) && (
                <div className="ordu:flex ordu:items-center ordu:gap-2">
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onCopy();
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}>
                      {copied ? (
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
                          className="ordu:text-success">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
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
                      )}
                      {copied ? "Copied" : "Copy as cURL"}
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (!editOpen) {
                          setEditHeaders(requestHeaders ? JSON.stringify(requestHeaders, null, 2) : "{}");
                          setEditBody(formatJson(requestBody) || "");
                        }
                        setEditOpen((v) => !v);
                      }}>
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
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </Button>
                  )}
                </div>
              )}

              {/* Edit panel */}
              {editOpen && onEdit && (
                <div className="ordu:space-y-3 ordu:border ordu:rounded-[var(--ord-radius)] ordu:p-3 ordu:bg-muted/20">
                  <div className="ordu:space-y-1.5">
                    <h4 className="ordu:text-xs ordu:font-medium ordu:text-muted-foreground">Headers</h4>
                    <CodeEditor
                      value={editHeaders}
                      onChange={setEditHeaders}
                      language="json"
                      height="120px"
                      minHeight="120px"
                      showToolbar={false}
                      className="ordu:text-xs"
                    />
                  </div>
                  <div className="ordu:space-y-1.5">
                    <h4 className="ordu:text-xs ordu:font-medium ordu:text-muted-foreground">Body</h4>
                    <CodeEditor
                      value={editBody}
                      onChange={setEditBody}
                      language="json"
                      height="200px"
                      minHeight="200px"
                      showToolbar={false}
                      className="ordu:text-xs"
                    />
                  </div>
                  <div className="ordu:flex ordu:items-center ordu:gap-2 ordu:justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        let headers: Record<string, string> = {};
                        try {
                          headers = JSON.parse(editHeaders);
                        } catch {
                          // keep empty if invalid
                        }
                        onEdit({ headers, body: editBody });
                        setEditOpen(false);
                      }}>
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
                      Send
                    </Button>
                  </div>
                </div>
              )}

              {/* Request section */}
              <div className="ordu:space-y-2">
                <h4 className="ordu:text-xs ordu:font-medium ordu:text-muted-foreground">Request</h4>
                <div className="ordu:font-mono ordu:text-[11px] ordu:bg-muted ordu:p-2 ordu:rounded">POST {url}</div>

                {/* Headers */}
                {requestHeaders && Object.keys(requestHeaders).length > 0 && (
                  <details className="ordu:text-xs">
                    <summary className="ordu:cursor-pointer ordu:text-muted-foreground ordu:hover:text-foreground">
                      Headers ({Object.keys(requestHeaders).length})
                    </summary>
                    <CodeBlock
                      code={JSON.stringify(requestHeaders, null, 2)}
                      language="json"
                      highlighter={highlighter}
                      className="ordu:mt-1 ordu:text-[11px]"
                    />
                  </details>
                )}

                {/* Body */}
                {requestBody && (
                  <details open className="ordu:text-xs">
                    <summary className="ordu:cursor-pointer ordu:text-muted-foreground ordu:hover:text-foreground">
                      Body
                    </summary>
                    <CodeBlock
                      code={formatJson(requestBody)}
                      language="json"
                      highlighter={highlighter}
                      className="ordu:mt-1 ordu:text-[11px]"
                    />
                  </details>
                )}
              </div>

              {/* Response section */}
              {(responseBody ?? responseBodyContent ?? error) && (
                <div className="ordu:space-y-2">
                  <h4 className="ordu:text-xs ordu:font-medium ordu:text-muted-foreground">Response</h4>
                  {statusCode !== null && statusCode !== undefined && (
                    <div
                      className={cn(
                        "ordu:font-mono ordu:text-[11px] ordu:p-2 ordu:rounded",
                        statusCode < 400
                          ? "ordu:bg-success/10 ordu:text-success"
                          : "ordu:bg-destructive/10 ordu:text-destructive",
                      )}>
                      HTTP {statusCode} {responseStatus}
                    </div>
                  )}
                  {responseBodyContent ??
                    (responseBody && (
                      <details open className="ordu:text-xs">
                        <summary className="ordu:cursor-pointer ordu:text-muted-foreground ordu:hover:text-foreground">
                          Body
                        </summary>
                        <CodeBlock
                          code={formatJson(responseBody)}
                          language="json"
                          highlighter={highlighter}
                          className="ordu:mt-1 ordu:text-[11px]"
                        />
                      </details>
                    ))}
                </div>
              )}

              {/* Error block */}
              {error && (
                <div className="ordu:text-xs ordu:text-destructive ordu:bg-destructive/10 ordu:p-2 ordu:rounded">
                  {error}
                </div>
              )}
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>
    );
  },
);
HttpLogEntry.displayName = "HttpLogEntry";
