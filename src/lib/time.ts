export interface Preset {
  label: string;
  minutes: number;
}

export const PRESETS: Preset[] = [
  { label: "1 hr", minutes: 60 },
  { label: "2 hr", minutes: 120 },
  { label: "5 hr", minutes: 300 },
];

export const MAX_MINUTES = 999;

export const clampMinutes = (m: number): number =>
  Number.isFinite(m) ? Math.min(MAX_MINUTES, Math.max(1, Math.floor(m))) : 1;

export function formatTime(totalSeconds: number): { minutes: string; seconds: string } {
  const s = Math.max(0, Math.floor(totalSeconds));
  return {
    minutes: String(Math.floor(s / 60)).padStart(2, "0"),
    seconds: String(s % 60).padStart(2, "0"),
  };
}
