import { createContext, useCallback, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useTheme } from "./useTheme";

const PortalContainerContext = createContext<HTMLElement | null>(null);
export const usePortalContainer = (): HTMLElement | null =>
  useContext(PortalContainerContext) ??
  (typeof document !== "undefined" ? document.querySelector<HTMLElement>(".ord-ui") : null);

interface ThemeRootProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  className?: string;
  style?: CSSProperties;
}

export function ThemeRoot({ children, defaultTheme = "system", className, style }: ThemeRootProps): ReactNode {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const rootRef = useCallback((node: HTMLDivElement | null) => {
    setRootElement(node);
  }, []);
  const { resolvedTheme, setTheme } = useTheme(defaultTheme);

  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme, setTheme]);

  return (
    <div
      ref={rootRef}
      style={style}
      className={`ord-ui text-foreground${resolvedTheme === "dark" ? " dark" : ""}${className ? ` ${className}` : ""}`}>
      <PortalContainerContext.Provider value={rootElement}>{children}</PortalContainerContext.Provider>
    </div>
  );
}
