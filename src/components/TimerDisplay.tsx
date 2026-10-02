import { formatTime } from "../lib/time";
import { FlipDigit } from "./FlipDigit";

const Group = ({ value, label }: { value: string; label: string }) => (
  <div className="col">
    <div className="digits">{[...value].map((d, i) => <FlipDigit key={i} value={d} />)}</div>
    <small>{label}</small>
  </div>
);

export function TimerDisplay({ seconds }: { seconds: number }) {
  const { minutes, seconds: secs } = formatTime(seconds);
  const em = (minutes.length + 2) * 0.99 + 0.7;
  return (
    <div className="time" role="timer" aria-label={`${minutes} minutes ${secs} seconds remaining`}
      style={{ fontSize: `min(${90 / em}vw, 34vh)` }}>
      <Group value={minutes} label="Minutes" />
      <div className="sep">:</div>
      <Group value={secs} label="Seconds" />
    </div>
  );
}
