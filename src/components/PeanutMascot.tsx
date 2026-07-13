/**
 * A cute animated peanut character used in empty states.
 * Breathes, blinks occasionally, and holds a small basket.
 */
export function PeanutMascot({ className = "w-40 h-48" }: { className?: string }) {
  return (
    <div className={`peanut-mascot ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 240" className="w-full h-full">
        <defs>
          <linearGradient id="pm-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4b872" />
            <stop offset="60%" stopColor="#d98a3b" />
            <stop offset="100%" stopColor="#a55a1b" />
          </linearGradient>
          <radialGradient id="pm-shine" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="#fff3dc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff3dc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Peanut body */}
        <g className="pm-breathe">
          <path
            fill="url(#pm-body)"
            d="M100 20
               C 60 20, 40 55, 55 95
               C 62 115, 55 130, 55 150
               C 55 195, 145 195, 145 150
               C 145 130, 138 115, 145 95
               C 160 55, 140 20, 100 20 Z"
          />
          {/* Peanut texture lines */}
          <path
            d="M60 100 Q100 118 140 100"
            stroke="#7a3f10"
            strokeWidth="2"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M70 60 Q100 72 130 60 M65 80 Q100 92 135 80"
            stroke="#7a3f10"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          {/* Shine */}
          <ellipse cx="80" cy="65" rx="24" ry="30" fill="url(#pm-shine)" />

          {/* Eyes */}
          <g className="pm-blink">
            <ellipse cx="82" cy="130" rx="5" ry="6" fill="#2a1810" />
            <ellipse cx="118" cy="130" rx="5" ry="6" fill="#2a1810" />
            <circle cx="83.5" cy="128.5" r="1.5" fill="#fff" />
            <circle cx="119.5" cy="128.5" r="1.5" fill="#fff" />
          </g>
          {/* Smile */}
          <path
            d="M88 148 Q100 158 112 148"
            stroke="#2a1810"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cheeks */}
          <circle cx="72" cy="145" r="4" fill="#f3820a" opacity="0.4" />
          <circle cx="128" cy="145" r="4" fill="#f3820a" opacity="0.4" />
        </g>

        {/* Basket */}
        <g transform="translate(100 200)">
          <path
            d="M-32 -8 L 32 -8 L 26 20 L -26 20 Z"
            fill="#f3820a"
          />
          <path
            d="M-32 -8 L 32 -8 L 30 -4 L -30 -4 Z"
            fill="#c2410c"
          />
          <path
            d="M-22 -8 Q0 -30 22 -8"
            stroke="#c2410c"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
