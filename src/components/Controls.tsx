import { useState } from "react";
import type { TimerStatus } from "../hooks/useTimer";
import { PRESETS } from "../lib/time";

interface Props {
  status: TimerStatus;
  minutes: number;
  onToggle: () => void;
  onReset: () => void;
  onPreset: (minutes: number) => void;
}

const LABEL: Record<TimerStatus, string> = { idle: "Start", running: "Pause", paused: "Resume", done: "Restart" };

export function Controls({ status, minutes, onToggle, onReset, onPreset }: Props) {
  const [custom, setCustom] = useState("");
  return (
    <div className="controls">
      <div className="seg">
        {PRESETS.map((p) => (
          <button key={p.minutes} className={minutes === p.minutes ? "on" : ""} onClick={() => onPreset(p.minutes)}>
            {p.label}
          </button>
        ))}
        <input type="number" min={1} max={999} placeholder="custom min" aria-label="Custom minutes"
          value={custom} onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && Number(custom) > 0) { onPreset(Number(custom)); setCustom(""); e.currentTarget.blur(); }
          }} />
      </div>
      <div className="act">
        <button className="btn" onClick={onToggle}>{LABEL[status]}</button>
        <button className="btn ghost" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
