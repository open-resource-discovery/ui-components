import { forwardRef, useCallback, useMemo, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/button";

type HighlighterLike = {
  codeToHtml: (code: string, options: Record<string, unknown>) => string;
};

export type CodeBlockProps = ComponentPropsWithoutRef<"div"> & {
  code: string;
  language?: string;
  filename?: string;
  highlighter?: HighlighterLike;
  lightTheme?: string;
  darkTheme?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  onCopy?: (code: string) => void;
  maxHeight?: string;
};

export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language,
      filename,
      highlighter,
      lightTheme = "github-light",
      darkTheme = "github-dark",
      showLineNumbers = false,
      showCopyButton = true,
      onCopy,
      maxHeight,
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.(code);
      setTimeout(() => setCopied(false), 2000);
    }, [code, onCopy]);

    const highlightedHtml = useMemo(() => {
      if (!highlighter || !language) return null;
      try {
        return highlighter.codeToHtml(code, {
          lang: language,
          themes: { light: lightTheme, dark: darkTheme },
        });
      } catch {
        return null;
      }
    }, [highlighter, code, language, lightTheme, darkTheme]);

    const lines = code.split("\n");

    const copyButton = showCopyButton && (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className={cn(
          "h-7 w-7 shrink-0",
          !filename && "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
        )}
        aria-label={copied ? "Copied" : "Copy code"}>
        {copied ? (
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
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
        )}
      </Button>
    );

    return (
      <div
        ref={ref}
        className={cn("ord-code-block group rounded-[var(--ord-radius)] border bg-muted overflow-hidden", className)}
        {...props}>
        {filename && (
          <div className="flex items-center gap-2 px-3 py-2 border-b text-xs text-muted-foreground">
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
              className="shrink-0">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            <span className="flex-1 truncate">{filename}</span>
            {copyButton}
          </div>
        )}

        <div className="relative" style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}>
          {!filename && copyButton}

          {highlightedHtml ? (
            <div
              className={cn(
                "p-4 overflow-x-auto font-mono text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent",
                showLineNumbers && "ord-code-block-lines",
              )}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <pre className="p-4 overflow-x-auto font-mono text-sm whitespace-pre text-foreground">
              <code>
                {showLineNumbers
                  ? lines.map((line, i) => (
                      <span key={i} className="block">
                        <span className="inline-block w-8 mr-4 text-right text-muted-foreground select-none">
                          {i + 1}
                        </span>
                        {line}
                      </span>
                    ))
                  : code}
              </code>
            </pre>
          )}
        </div>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
