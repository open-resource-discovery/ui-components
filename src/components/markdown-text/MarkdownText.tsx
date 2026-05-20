import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/utils/cn';
import { Button } from '@/components/button';

export interface MarkdownTextProps {
  text: string;
  clampLines?: number;
  className?: string;
}

export function MarkdownText({
  text,
  clampLines,
  className,
}: MarkdownTextProps): React.JSX.Element {
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
    !expanded && clampLines
      ? { maxHeight: `${clampLines * 1.625}em`, overflow: 'hidden' as const }
      : undefined;

  return (
    <div className={className}>
      <div
        ref={ref}
        className={cn(
          'text-sm leading-relaxed [&_p]:my-1 [&_h1]:text-base [&_h1]:font-semibold [&_h1]:my-2 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:my-2 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:my-1.5 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 [&_a]:text-primary [&_a]:underline [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-xs [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold',
        )}
        style={maxHeightStyle}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      {isClamped && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs mt-1"
          onClick={() => setExpanded(!expanded)}
        >
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
                className="mr-1"
              >
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
                className="mr-1"
              >
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
