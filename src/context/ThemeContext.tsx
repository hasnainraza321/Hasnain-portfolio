"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

export interface ThemeContextValue {
  readonly theme: Theme;
  readonly isDark: boolean;
  readonly isLight: boolean;
  readonly toggleTheme: () => void;
  readonly setTheme: (nextTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const THEME_STORAGE_KEY = "portfolio-theme";

function subscribeToTheme(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    if (document.documentElement.classList.contains("light")) {
      return "light";
    }
  } catch {
    return "dark";
  }
  return "dark";
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const applyThemeToDOM = useCallback((newTheme: Theme) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (newTheme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage restrictions
    }

    // Notify listeners & canvases
    window.dispatchEvent(
      new CustomEvent("portfolio-theme-change", {
        detail: { theme: newTheme },
      })
    );
  }, []);

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      applyThemeToDOM(nextTheme);
    },
    [applyThemeToDOM]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const value: ThemeContextValue = {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return context;
}
