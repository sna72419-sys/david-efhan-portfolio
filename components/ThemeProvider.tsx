"use client";

import { createContext, useContext, useEffect, useState } from "react";
import FireTransition from "@/components/FireTransition";

type Theme = "dark" | "light";

const THEME_BG: Record<Theme, string> = {
  dark: "#080B14",
  light: "#F7F8FA",
};

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [fireTrigger, setFireTrigger] = useState(0);
  const [curtainColor, setCurtainColor] = useState(THEME_BG.dark);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      setTheme(prefersLight ? "light" : "dark");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    const from = theme;
    const to: Theme = from === "dark" ? "light" : "dark";
    setCurtainColor(THEME_BG[from]);
    setTheme(to);
    setFireTrigger((n) => n + 1);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <FireTransition trigger={fireTrigger} curtainColor={curtainColor} onDone={() => {}} />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
