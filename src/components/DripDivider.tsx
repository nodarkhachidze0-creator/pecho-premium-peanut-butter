export function DripDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`drip-divider ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 44" preserveAspectRatio="none">
        <path d="M0 0H1440V14C1340 8 1270 20 1170 14S980 8 870 16s-210-5-320 1S360 7 250 14 90 9 0 18V0Z" />
        <path className="drip-divider__drop" d="M386 10c0 18 5 28 12 28s12-10 12-28Z" />
        <path className="drip-divider__drop drip-divider__drop--late" d="M1042 10c0 13 4 22 10 22s10-9 10-22Z" />
      </svg>
    </div>
  );
}