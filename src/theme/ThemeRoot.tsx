import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useTheme } from "./useTheme";

const PortalContainerContext = createContext<HTMLElement | null>(null);
export const usePortalContainer = (): HTMLElement | null => useContext(PortalContainerContext);

interface ThemeRootProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  className?: string;
}

export function ThemeRoot({ children, defaultTheme = "system", className }: ThemeRootProps): ReactNode {
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
      className={`ord-ui text-foreground${resolvedTheme === "dark" ? " dark" : ""}${className ? ` ${className}` : ""}`}>
      <PortalContainerContext.Provider value={rootElement}>{children}</PortalContainerContext.Provider>
    </div>
  );
}
