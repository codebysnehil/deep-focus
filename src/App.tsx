import { useEffect } from "react";
import { Controls } from "./components/Controls";
import { Header } from "./components/Header";
import { TimerDisplay } from "./components/TimerDisplay";
import { useTimer, type TimerStatus } from "./hooks/useTimer";
import { useClock, useFullscreen, useIdle, useTheme } from "./hooks/useUi";
import { beep } from "./lib/beep";
import { formatTime } from "./lib/time";

const STATUS: Record<TimerStatus, string> = {
  idle: "Ready", running: "Focusing", paused: "Paused", done: "Session complete",
};

export default function App() {
  const timer = useTimer(beep);
  const now = useClock();
  const { toggle: toggleTheme } = useTheme();
  const toggleFullscreen = useFullscreen();
  const idle = useIdle(timer.status === "running");
  const { toggle, reset, setMinutes } = timer;

  useEffect(() => {
    const { minutes, seconds } = formatTime(timer.left);
    document.title = `${timer.status === "running" ? "▶ " : ""}${minutes}:${seconds} · Deep Focus`;
  }, [timer.left, timer.status]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.code === "Space") { e.preventDefault(); toggle(); }
      else if (e.key.toLowerCase() === "r") reset();
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key.toLowerCase() === "d") toggleTheme();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [toggle, reset, toggleFullscreen, toggleTheme]);

  return (
    <div className={`app${idle ? " idle" : ""}${timer.status === "done" ? " done" : ""}`}>
      <div className="prog" style={{ width: `${((timer.total - timer.left) / timer.total) * 100}%` }} />
      <Header onTheme={toggleTheme} onFullscreen={toggleFullscreen} />
      <main>
        <input className="task" placeholder="What are you working on?" maxLength={60} aria-label="Task" />
        <TimerDisplay seconds={timer.left} />
        <div className="status">{STATUS[timer.status]}</div>
        <Controls status={timer.status} minutes={timer.total / 60} onToggle={toggle} onReset={reset} onPreset={setMinutes} />
      </main>
      <footer>
        <div className="hint"><kbd>Space</kbd> start/pause <kbd>R</kbd> reset <kbd>F</kbd> fullscreen <kbd>D</kbd> theme</div>
        <div>
          <div className="clock">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
          <div className="date">{now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" })}</div>
        </div>
      </footer>
    </div>
  );
}
