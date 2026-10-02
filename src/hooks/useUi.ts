import { useCallback, useEffect, useState } from "react";

export function useClock(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

type Theme = "light" | "dark";
const systemTheme = (): Theme => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage unavailable */
    }
    return systemTheme();
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
    }
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return { theme, toggle };
}

export function useIdle(active: boolean, ms = 4000): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (!active) return setIdle(false);
    let t: number;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), ms);
    };
    wake();
    const events = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((e) => addEventListener(e, wake));
    return () => {
      clearTimeout(t);
      events.forEach((e) => removeEventListener(e, wake));
    };
  }, [active, ms]);
  return idle;
}

export function useFullscreen() {
  const toggle = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }, []);
  return toggle;
}
