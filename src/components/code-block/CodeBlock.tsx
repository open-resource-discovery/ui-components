import { forwardRef, useCallback, useMemo, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/button";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import markdown from "highlight.js/lib/languages/markdown";
import sql from "highlight.js/lib/languages/sql";
import python from "highlight.js/lib/languages/python";
import { HighlightOptions } from "highlight.js";

type HighlighterLike = {
  codeToHtml: (code: string, options: Record<string, unknown>) => string;
};

hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);

const defaultHighlighter: HighlighterLike = {
  codeToHtml: (code: string, options: Record<string, unknown>) => {
    if (!code) return code;
    try {
      const hljsOptions: HighlightOptions = { language: typeof options.lang === "string" ? options.lang : "json" };

      return `<pre><code>${hljs.highlight(code, hljsOptions).value}</code></pre>`;
    } catch {
      return code;
    }
  },
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
      highlighter = defaultHighlighter,
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
          "ordu:h-7 ordu:w-7 ordu:shrink-0",
          !filename &&
            "ordu:absolute ordu:top-2 ordu:right-2 ordu:opacity-0 ordu:group-hover:opacity-100 ordu:transition-opacity",
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
        className={cn(
          "ord-code-block ordu:group ordu:rounded-[var(--ord-radius)] ordu:border ordu:bg-code ordu:overflow-hidden",
          className,
        )}
        {...props}>
        {filename && (
          <div className="ordu:flex ordu:items-center ordu:gap-2 ordu:px-3 ordu:py-2 ordu:border-b ordu:text-xs ordu:text-code-foreground">
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
              className="ordu:shrink-0">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            <span className="ordu:flex-1 ordu:truncate">{filename}</span>
            {copyButton}
          </div>
        )}

        <div className="ordu:relative" style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}>
          {!filename && copyButton}

          {highlightedHtml ? (
            <div
              className={cn(
                "ordu:p-4 ordu:overflow-x-auto ordu:font-mono ordu:text-sm ordu:[&_pre]:!bg-transparent ordu:[&_code]:!bg-transparent",
                showLineNumbers && "ord-code-block-lines",
              )}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          ) : (
            <pre className="ordu:p-4 ordu:overflow-x-auto ordu:font-mono ordu:text-sm ordu:whitespace-pre ordu:text-code-foreground ordu:bg-code">
              <code>
                {showLineNumbers
                  ? lines.map((line, i) => (
                      <span key={i} className="ordu:block">
                        <span className="ordu:inline-block ordu:w-8 ordu:mr-4 ordu:text-right ordu:text-muted-foreground ordu:select-none">
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
