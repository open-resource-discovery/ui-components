import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/utils/cn";
import { Button } from "@/components/button";

export interface MarkdownTextProps {
  text: string;
  clampLines?: number;
  className?: string;
}

export function MarkdownText({ text, clampLines, className }: MarkdownTextProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (!clampLines) return;
    const el = ref.current;
    if (!el) return;

    const check = (): void => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
      const maxHeight = lineHeight * clampLines;
      setIsClamped(el.scrollHeight > maxHeight + 1);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return (): void => {
      observer.disconnect();
    };
  }, [text, clampLines]);

  const maxHeightStyle =
    !expanded && clampLines ? { maxHeight: `${clampLines * 1.625}em`, overflow: "hidden" as const } : undefined;

  return (
    <div className={className}>
      <div
        ref={ref}
        className={cn(
          "ordu:text-sm ordu:leading-relaxed ordu:[&_p]:my-1 ordu:[&_h1]:text-base ordu:[&_h1]:font-semibold ordu:[&_h1]:my-2 ordu:[&_h2]:text-sm ordu:[&_h2]:font-semibold ordu:[&_h2]:my-2 ordu:[&_h3]:text-sm ordu:[&_h3]:font-medium ordu:[&_h3]:my-1.5 ordu:[&_ul]:my-1 ordu:[&_ol]:my-1 ordu:[&_li]:my-0 ordu:[&_a]:text-primary ordu:[&_a]:underline ordu:[&_code]:bg-muted ordu:[&_code]:px-1 ordu:[&_code]:py-0.5 ordu:[&_code]:rounded-sm ordu:[&_code]:text-xs ordu:[&_pre]:bg-muted ordu:[&_pre]:p-3 ordu:[&_pre]:rounded-md ordu:[&_pre]:overflow-x-auto ordu:[&_pre_code]:bg-transparent ordu:[&_pre_code]:p-0 ordu:[&_strong]:font-semibold",
        )}
        style={maxHeightStyle}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      {isClamped && (
        <Button
          variant="ghost"
          size="sm"
          className="ordu:h-6 ordu:px-2 ordu:text-xs ordu:mt-1"
          onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <>
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
                className="ordu:mr-1">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Show less
            </>
          ) : (
            <>
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
                className="ordu:mr-1">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              Show more
            </>
          )}
        </Button>
      )}
    </div>
  );
}
