import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "ord-ui-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme(defaultTheme: Theme = "system"): {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (newTheme: Theme) => void;
} {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(STORAGE_KEY) as Theme) || defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(theme === "system" ? getSystemTheme() : theme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      setResolvedTheme(getSystemTheme());
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent): void => setResolvedTheme(e.matches ? "dark" : "light");
      mq.addEventListener("change", handler);
      return (): void => {
        mq.removeEventListener("change", handler);
      };
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  return { theme, resolvedTheme, setTheme };
}
