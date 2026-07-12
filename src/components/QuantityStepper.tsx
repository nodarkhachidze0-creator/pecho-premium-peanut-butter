import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
}) {
  return (
    <div className="inline-flex items-center gap-1 border border-brand-roast/15 rounded-full">
      <button
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="size-10 flex items-center justify-center rounded-full hover:bg-brand-paper transition-colors"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums">{value}</span>
      <button
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="size-10 flex items-center justify-center rounded-full hover:bg-brand-paper transition-colors"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
