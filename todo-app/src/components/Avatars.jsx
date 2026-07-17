export function GirlAvatar({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Body */}
      <path d="M30 74 Q50 66 70 74 L72 100 L28 100Z" fill="#FF6EC7" />
      {/* Hair back */}
      <ellipse cx="50" cy="40" rx="34" ry="34" fill="#5C3317" />
      <ellipse cx="26" cy="52" rx="10" ry="18" fill="#5C3317" />
      <ellipse cx="74" cy="52" rx="10" ry="18" fill="#5C3317" />
      {/* Face */}
      <circle cx="50" cy="48" r="25" fill="#FDDCB5" />
      {/* Eyes */}
      <ellipse cx="40" cy="46" rx="3" ry="3.5" fill="#3a3a3a" />
      <ellipse cx="60" cy="46" rx="3" ry="3.5" fill="#3a3a3a" />
      <circle cx="41.2" cy="44.8" r="1" fill="#fff" />
      <circle cx="61.2" cy="44.8" r="1" fill="#fff" />
      {/* Blush */}
      <ellipse cx="34" cy="53" rx="4.5" ry="2.5" fill="#FFB6C1" opacity="0.6" />
      <ellipse cx="66" cy="53" rx="4.5" ry="2.5" fill="#FFB6C1" opacity="0.6" />
      {/* Mouth */}
      <path d="M45 57 Q50 62 55 57" stroke="#E8776A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Bangs (on top of face) */}
      <path d="M28 38 Q35 22 50 30 Q42 24 30 36Z" fill="#5C3317" />
      <path d="M50 30 Q58 20 72 38 Q64 24 50 30Z" fill="#5C3317" />
      {/* Hair top */}
      <ellipse cx="50" cy="28" rx="22" ry="12" fill="#5C3317" />
    </svg>
  );
}

export function BoyAvatar({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Body */}
      <path d="M30 74 Q50 66 70 74 L72 100 L28 100Z" fill="#00AADD" />
      {/* Hair back */}
      <rect x="24" y="14" width="52" height="30" rx="10" fill="#2C2C2C" />
      {/* Face */}
      <circle cx="50" cy="48" r="25" fill="#E8C39E" />
      {/* Eyes */}
      <ellipse cx="40" cy="46" rx="3" ry="3.5" fill="#3a3a3a" />
      <ellipse cx="60" cy="46" rx="3" ry="3.5" fill="#3a3a3a" />
      <circle cx="41.2" cy="44.8" r="1" fill="#fff" />
      <circle cx="61.2" cy="44.8" r="1" fill="#fff" />
      {/* Eyebrows */}
      <path d="M35 39 Q40 36 45 39" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M55 39 Q60 36 65 39" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Mouth */}
      <path d="M45 57 Q50 61 55 57" stroke="#D4836B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Spiky hair (on top of face) */}
      <path d="M34 24 L38 8 L44 22" fill="#2C2C2C" />
      <path d="M46 20 L50 4 L56 20" fill="#2C2C2C" />
      <path d="M58 22 L64 10 L68 26" fill="#2C2C2C" />
      {/* Hair front fringe */}
      <path d="M26 36 Q30 24 50 28 Q70 24 74 36 Q68 28 50 30 Q32 28 26 36Z" fill="#2C2C2C" />
    </svg>
  );
}
