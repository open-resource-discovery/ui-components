import { forwardRef, useState, useEffect, useRef, useCallback, type ComponentPropsWithoutRef } from "react";
import Editor, { useMonaco, type OnMount } from "@monaco-editor/react";
import { Button } from "@/components/button";
import { cn } from "@/utils/cn";

export interface CodeEditorProps extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
  value: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  language?: string;
  readOnly?: boolean;
  lineNumbers?: "on" | "off";
  minHeight?: string;
  showToolbar?: boolean;
}

function getCssColor(root: Element, varName: string, fallback: string): string {
  const raw = getComputedStyle(root).getPropertyValue(varName).trim();
  if (!raw) return fallback;
  if (raw.startsWith("#")) return raw;

  const probe = document.createElement("div");
  probe.style.display = "none";
  probe.style.color = `var(${varName})`;
  root.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  root.removeChild(probe);

  const rgbMatch = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const hex = (n: string): string => parseInt(n).toString(16).padStart(2, "0");
    return `#${hex(rgbMatch[1])}${hex(rgbMatch[2])}${hex(rgbMatch[3])}`;
  }

  const srgbMatch = computed.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (srgbMatch) {
    const hex = (n: string): string =>
      Math.round(parseFloat(n) * 255)
        .toString(16)
        .padStart(2, "0");
    return `#${hex(srgbMatch[1])}${hex(srgbMatch[2])}${hex(srgbMatch[3])}`;
  }

  return fallback;
}

export const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      value,
      onChange,
      defaultValue,
      language = "json",
      readOnly = false,
      lineNumbers = "on",
      minHeight = "300px",
      showToolbar = true,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
    const monaco = useMonaco();
    const [copied, setCopied] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Detect dark mode from .ord-ui ancestor
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const ordRoot = el.closest(".ord-ui");
      if (!ordRoot) return;

      const check = (): void => setIsDark(ordRoot.classList.contains("dark"));
      check();

      const observer = new MutationObserver(check);
      observer.observe(ordRoot, { attributes: true, attributeFilter: ["class"] });
      return (): void => {
        observer.disconnect();
      };
    }, []);

    const defineThemes = useCallback(() => {
      if (!monaco) return;
      const el = containerRef.current;
      const ordRoot = el?.closest(".ord-ui");
      if (!ordRoot) return;

      const bg = getCssColor(ordRoot, "--background", isDark ? "#1e1e1e" : "#ffffff");
      const fg = getCssColor(ordRoot, "--foreground", isDark ? "#d4d4d4" : "#1e1e1e");
      const muted = getCssColor(ordRoot, "--muted", isDark ? "#2d2d30" : "#f5f5f5");
      const mutedFg = getCssColor(ordRoot, "--muted-foreground", isDark ? "#858585" : "#237893");
      const primary = getCssColor(ordRoot, "--primary", isDark ? "#0098ff" : "#005fb8");
      const border = getCssColor(ordRoot, "--border", isDark ? "#3e3e42" : "#e0e0e0");

      monaco.editor.defineTheme("ord-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": bg,
          "editor.foreground": fg,
          "editorLineNumber.foreground": mutedFg,
          "editorLineNumber.activeForeground": fg,
          "editor.selectionBackground": primary + "44",
          "editor.lineHighlightBackground": muted,
          "editorWidget.background": bg,
          "editorWidget.border": border,
        },
      });

      monaco.editor.defineTheme("ord-light", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": bg,
          "editor.foreground": fg,
          "editorLineNumber.foreground": mutedFg,
          "editorLineNumber.activeForeground": fg,
          "editor.selectionBackground": primary + "33",
          "editor.lineHighlightBackground": muted,
          "editorWidget.background": bg,
          "editorWidget.border": border,
        },
      });

      monaco.editor.setTheme(isDark ? "ord-dark" : "ord-light");
    }, [monaco, isDark]);

    useEffect(() => {
      if (monaco) defineThemes();
    }, [monaco, defineThemes]);

    const handleMount: OnMount = (editor) => {
      editorRef.current = editor;
      defineThemes();
    };

    const handleFormat = (): void => {
      try {
        const formatted = JSON.stringify(JSON.parse(value), null, 2);
        onChange?.(formatted);
      } catch {
        // invalid JSON, ignore
      }
    };

    const handleCopy = async (): Promise<void> => {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = (): void => {
      onChange?.(defaultValue ?? "");
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("h-full rounded-lg border overflow-hidden flex flex-col", className)}
        {...props}>
        {showToolbar && (
          <div className="flex h-10 items-center gap-1 border-b bg-muted/30 px-2">
            <Button variant="ghost" size="sm" onClick={handleFormat} disabled={!value.trim()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4">
                <path d="M15 4V2" />
                <path d="M15 16v-2" />
                <path d="M8 9h2" />
                <path d="M20 9h2" />
                <path d="M17.8 11.8 20 14" />
                <path d="M15 9h.01" />
                <path d="M17.8 6.2 20 4" />
                <path d="m3 21 9-9" />
                <path d="M12.2 6.2 10 4" />
              </svg>
              <span className="hidden sm:inline">Format</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!value.trim()}>
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-success">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              )}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" onClick={handleReset} disabled={!value.trim()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        )}
        <div className="flex-1 overflow-hidden min-h-0" style={{ minHeight }}>
          <Editor
            height="100%"
            value={value}
            onChange={(v) => onChange?.(v || "")}
            language={language}
            theme={isDark ? "ord-dark" : "ord-light"}
            options={{
              readOnly,
              minimap: { enabled: false },
              automaticLayout: true,
              fontSize: 13,
              lineNumbers,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 2,
              renderLineHighlight: "line",
              padding: { top: 8, bottom: 8 },
            }}
            onMount={handleMount}
          />
        </div>
      </div>
    );
  },
);
CodeEditor.displayName = "CodeEditor";
