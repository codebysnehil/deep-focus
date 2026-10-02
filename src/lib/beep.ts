/** Three short beeps via WebAudio. Fails silently where audio is unavailable. */
export function beep(): void {
  try {
    const ctx = new AudioContext();
    [0, 0.4, 0.8].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.connect(gain).connect(ctx.destination);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.3);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.3);
    });
  } catch {
  }
}
