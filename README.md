# Deep Focus ⏱️

A distraction-free, fullscreen **flip-clock countdown timer** for deep work. Pick 1 h, 2 h, 5 h (or any custom length), hit start, and watch the digits drop like a desk calendar.

**Live demo:** _add your Vercel URL here_

## Features
- Huge minutes : seconds display, each digit in its own flip card (only the digits that change animate)
- 1 / 2 / 5 hour presets + custom minutes (up to 999)
- Live current time and date in the bottom-right corner
- Focus mode: controls and cursor fade out after 4 s of inactivity while running
- Light / dark theme (follows system, remembers your choice)
- Accurate in background tabs (timestamp-based, not tick-counting), live tab-title countdown, beep on completion
- Keyboard-first: `Space` start/pause · `R` reset · `F` fullscreen · `D` theme

## Tech
React 18 · TypeScript (strict) · Vite · Vitest · GitHub Actions CI

## Getting started
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests
npm run build      # typecheck + production build to dist/
```

## Structure
```
src/
  components/   FlipDigit, TimerDisplay, Controls, Header
  hooks/        useTimer (countdown state machine), useUi (clock, theme, idle, fullscreen)
  lib/          time (formatting, presets, tests), beep
```

## Deploy
Import the repo on [Vercel](https://vercel.com/new). The Vite preset is auto-detected (build `npm run build`, output `dist`).

## License
MIT
