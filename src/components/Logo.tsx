export const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="210" height="64" viewBox="0 0 210 64" aria-label="O'240">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB347"/>
        <stop offset="100%" stopColor="#F07C00"/>
      </linearGradient>
      <filter id="logoGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="1.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <circle cx="28" cy="34" r="24" fill="none" stroke="#FFFFFF" strokeWidth="8"/>
    <circle cx="43" cy="17" r="13" fill="currentColor" className="fill-[#141414]"/>
    <circle cx="50" cy="8"  r="3"   fill="url(#logoGrad)" filter="url(#logoGlow)"/>
    <circle cx="55" cy="15" r="1.8" fill="#FFB347"/>
    <circle cx="48" cy="4"  r="2"   fill="url(#logoGrad)" filter="url(#logoGlow)"/>
    <path d="M 54 20 C 53 15 59 14 58 19 C 58 22 55 24 54 20 Z" fill="url(#logoGrad)"/>
    <text x="62" y="55" fontFamily="Oswald, Impact, sans-serif" fontWeight="700" fontSize="50" fill="#FFFFFF" letterSpacing="-2">240</text>
    <path d="M 61 59 Q 130 70 202 55" stroke="url(#logoGrad)" strokeWidth="2.2" fill="none" strokeLinecap="round" filter="url(#logoGlow)"/>
    <path d="M 195 52 L 204 56 L 194 60 Z" fill="#F07C00"/>
  </svg>
);
