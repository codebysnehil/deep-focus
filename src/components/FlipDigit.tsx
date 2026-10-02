import { useLayoutEffect, useRef, useState } from "react";

const FLIP_MS = 520;

export function FlipDigit({ value }: { value: string }) {
  const prev = useRef(value);
  const [from, setFrom] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (prev.current === value) return;
    setFrom(prev.current);
    prev.current = value;
    const id = setTimeout(() => setFrom(null), FLIP_MS);
    return () => clearTimeout(id);
  }, [value]);

  const flipping = from !== null;
  return (
    <div className="box">
      <span className="sz">{value}</span>
      <div className="half t"><span>{value}</span></div>
      <div className="half b"><span>{flipping ? from : value}</span></div>
      {flipping && (
        <>
          <div key={`f${from}${value}`} className="half t flap ff"><span>{from}</span></div>
          <div key={`b${from}${value}`} className="half b flap fb"><span>{value}</span></div>
        </>
      )}
    </div>
  );
}
