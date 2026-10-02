import { useCallback, useEffect, useRef, useState } from "react";
import { clampMinutes } from "../lib/time";

export type TimerStatus = "idle" | "running" | "paused" | "done";

export function useTimer(onComplete?: () => void) {
  const [total, setTotal] = useState(3600);
  const [left, setLeft] = useState(3600);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const endAt = useRef(0);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.round((endAt.current - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) {
        setStatus("done");
        completeRef.current?.();
      }
    }, 250);
    return () => clearInterval(id);
  }, [status]);

  const start = useCallback(() => {
    const from = left <= 0 ? total : left;
    endAt.current = Date.now() + from * 1000;
    setLeft(from);
    setStatus("running");
  }, [left, total]);

  const pause = useCallback(() => setStatus("paused"), []);
  const toggle = useCallback(() => (status === "running" ? pause() : start()), [status, start, pause]);

  const reset = useCallback(() => {
    setLeft(total);
    setStatus("idle");
  }, [total]);

  const setMinutes = useCallback((m: number) => {
    const seconds = clampMinutes(m) * 60;
    setTotal(seconds);
    setLeft(seconds);
    setStatus("idle");
  }, []);

  return { total, left, status, toggle, reset, setMinutes };
}
