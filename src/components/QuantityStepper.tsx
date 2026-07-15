import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = (raw: string) => {
    const n = parseInt(raw.replace(/[^0-9]/g, ""), 10);
    if (!Number.isFinite(n)) {
      onChange(min);
      setDraft(String(min));
      return;
    }
    const clamped = Math.min(max, Math.max(min, n));
    onChange(clamped);
    setDraft(String(clamped));
  };

  return (
    <div className="inline-flex items-center gap-1 border border-brand-roast/15 rounded-full">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="size-10 flex items-center justify-center rounded-full hover:bg-brand-paper transition-colors"
      >
        <Minus className="size-3.5" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Quantity"
        value={draft}
        onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ""))}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLInputElement).blur();
          }
        }}
        className="w-12 text-center text-sm font-medium tabular-nums bg-transparent focus:outline-none"
      />
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="size-10 flex items-center justify-center rounded-full hover:bg-brand-paper transition-colors"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
