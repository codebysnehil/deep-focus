const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);

interface Props { onTheme: () => void; onFullscreen: () => void }

export function Header({ onTheme, onFullscreen }: Props) {
  return (
    <header>
      <div className="brand"><span className="dot" />Deep Focus</div>
      <div className="tools">
        <button className="icon" onClick={onTheme} title="Light / dark (D)" aria-label="Toggle theme">
          <Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </button>
        <button className="icon" onClick={onFullscreen} title="Fullscreen (F)" aria-label="Toggle fullscreen">
          <Icon d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </button>
      </div>
    </header>
  );
}
