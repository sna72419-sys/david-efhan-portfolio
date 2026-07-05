"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import FireTransition, { FireMode } from "@/components/FireTransition";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}>({
  theme: "dark",
  toggleTheme: () => {},
  isTransitioning: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [fireActive, setFireActive] = useState(false);
  const [fireMode, setFireMode] = useState<FireMode>("toDark");
  const pendingTheme = useRef<Theme | null>(null);

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
    if (fireActive) return; // prevent multiple clicks / overlapping transitions
    const to: Theme = theme === "dark" ? "light" : "dark";
    pendingTheme.current = to;
    setFireMode(to === "dark" ? "toDark" : "toLight");
    setFireActive(true);
  };

  // Apply the actual theme change only once the flames fully cover the screen.
  const handleMidpoint = () => {
    if (pendingTheme.current) {
      setTheme(pendingTheme.current);
      pendingTheme.current = null;
    }
  };

  const handleComplete = () => {
    setFireActive(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning: fireActive }}>
      {children}
      <FireTransition
        active={fireActive}
        mode={fireMode}
        onMidpoint={handleMidpoint}
        onComplete={handleComplete}
      />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
