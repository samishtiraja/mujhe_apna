/**
 * PenNib Component
 * Compact, elegant luxury calligraphy fountain pen / qalam.
 * Naturally tilted at +40° (right-handed writer), sized in perfect proportion
 * to the lyric font so it never collides with adjacent lines.
 */
export default function PenNib({ penState, inkColor = '#7d1e1d' }) {
  if (!penState) return null

  const { penX, yOffset, angle, isTouching } = penState

  return (
    <div
      className="pen-nib-container"
      style={{
        position: 'absolute',
        left: `${penX}%`,
        top: `calc(46% + ${yOffset}px)`,
        width: 'clamp(24px, 2.4vw, 36px)',
        height: 'clamp(64px, 6.4vw, 96px)',
        transform: `translate(-50%, -96.25%) rotate(${angle}deg)`,
        transformOrigin: '50% 96.25%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Tiny organic wet ink contact point */}
      {isTouching && (
        <div
          className="pen-ink-contact-point"
          style={{
            position: 'absolute',
            left: '50%',
            top: '96.25%',
            width: '3.5px',
            height: '3.5px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            backgroundColor: inkColor,
            boxShadow: `0 0 3px 1px ${inkColor}`,
            opacity: 0.95,
          }}
        />
      )}

      {/* Compact Slender Luxury Fountain Pen SVG */}
      <svg
        viewBox="0 0 60 160"
        width="100%"
        height="100%"
        style={{
          overflow: 'visible',
          filter: 'drop-shadow(-3px 6px 5px rgba(25, 14, 6, 0.32))',
        }}
      >
        <defs>
          {/* Polished Piano-Black / Dark Mahogany Barrel */}
          <linearGradient id="penBodyGradCompact" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#120a05" />
            <stop offset="30%" stopColor="#2e1a0e" />
            <stop offset="50%" stopColor="#4a2e1c" />
            <stop offset="70%" stopColor="#2a170c" />
            <stop offset="100%" stopColor="#0d0703" />
          </linearGradient>

          {/* 18K Gold Trim and Nib Gradient */}
          <linearGradient id="penGoldGradCompact" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a5518" />
            <stop offset="15%" stopColor="#d4af37" />
            <stop offset="45%" stopColor="#fff8d1" />
            <stop offset="68%" stopColor="#d4af37" />
            <stop offset="88%" stopColor="#9e701e" />
            <stop offset="100%" stopColor="#573c0a" />
          </linearGradient>

          {/* Rhodium Center Plate Inlay */}
          <linearGradient id="penRhodiumGradCompact" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#999" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#888" />
          </linearGradient>

          {/* Curvature 3D Shading */}
          <linearGradient id="penShadeGradCompact" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Slender Pen Barrel (Upper Shaft) */}
        <path d="M 23 0 L 37 0 L 36 50 L 24 50 Z" fill="url(#penBodyGradCompact)" />

        {/* Gold Trim Ring Band */}
        <rect x="22" y="50" width="16" height="3" fill="url(#penGoldGradCompact)" rx="0.5" />
        <rect x="23" y="53" width="14" height="1.5" fill="#150d06" />
        <rect x="22" y="54.5" width="16" height="3.5" fill="url(#penGoldGradCompact)" rx="0.5" />

        {/* Ergonomic Grip Section */}
        <path
          d="M 24 58
             C 25 72, 23 84, 22 92
             L 38 92
             C 37 84, 35 72, 36 58
             Z"
          fill="url(#penBodyGradCompact)"
        />

        {/* Grip Collar Ring (Gold) */}
        <rect x="21" y="92" width="18" height="3" fill="url(#penGoldGradCompact)" rx="0.5" />

        {/* Calligraphy Nib Contour (Shoulders curve down to sharp tip at 30, 154) */}
        <path
          d="M 22 95
             C 19 105, 16 112, 16 120
             C 16 130, 24 142, 30 154
             C 36 142, 44 130, 44 120
             C 44 112, 41 105, 38 95
             Z"
          fill="url(#penGoldGradCompact)"
          stroke="#4d350d"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Rhodium Center Plate Inlay */}
        <path
          d="M 26 95
             L 25 120
             C 25 128, 28 138, 30 151
             C 32 138, 35 128, 35 120
             L 34 95
             Z"
          fill="url(#penRhodiumGradCompact)"
          opacity="0.75"
        />

        {/* Nib 3D Curvature Depth Shading */}
        <path
          d="M 22 95
             C 19 105, 16 112, 16 120
             C 16 130, 24 142, 30 154
             C 36 142, 44 130, 44 120
             C 44 112, 41 105, 38 95
             Z"
          fill="url(#penShadeGradCompact)"
        />

        {/* Classical Guilloché Filigree Curves */}
        <path
          d="M 19 117 C 23 122, 27 126, 28 128"
          fill="none"
          stroke="#6e4b10"
          strokeWidth="0.6"
          opacity="0.8"
        />
        <path
          d="M 41 117 C 37 122, 33 126, 32 128"
          fill="none"
          stroke="#6e4b10"
          strokeWidth="0.6"
          opacity="0.8"
        />

        {/* Keyhole Breather Hole */}
        <circle cx="30" cy="122" r="2.2" fill="#180e05" stroke="#fceab1" strokeWidth="0.5" />
        <rect x="29" y="123" width="2" height="2.5" fill="#180e05" />

        {/* Center Slit Line down to the Tip */}
        <line
          x1="30"
          y1="125"
          x2="30"
          y2="154"
          stroke="#120902"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Wet Ink Pool on the Tines */}
        <path
          d="M 28 147 Q 30 154 32 147 Q 30 149 28 147 Z"
          fill={inkColor}
        />

        {/* Micro Specular Highlight on Ink Tip */}
        <ellipse cx="30" cy="154" rx="1.5" ry="1.0" fill={inkColor} />
        <circle cx="29.5" cy="153.5" r="0.5" fill="#ffffff" opacity="0.9" />
      </svg>
    </div>
  )
}
