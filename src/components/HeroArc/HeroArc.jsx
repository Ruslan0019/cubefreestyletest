// components/HeroArc/HeroArcBg.jsx
export default function HeroArcBg() {
  return (
    <div
      className={[
        "absolute w-full overflow-hidden bg-[#0E65E5]",
        "h-[428px] xl:h-[540px]",
        // вырезаем дугу снизу (маска)
        "[mask-image:radial-gradient(120%_80%_at_50%_110%,transparent_60%,black_61%)]",
        "[-webkit-mask-image:radial-gradient(120%_80%_at_50%_110%,transparent_60%,black_61%)]",
      ].join(" ")}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        viewBox="0 0 1440 440"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="b1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2C7AEE" />
            <stop offset="1" stopColor="#0E65E5" />
          </linearGradient>
          <g id="tri">
            <polygon points="0,0 80,0 0,80" fill="url(#b1)" opacity=".55" />
            <polygon points="0,0 120,0 0,120" fill="#155FD9" opacity=".35" />
            <polygon points="0,60 60,120 0,120" fill="#2C7AEE" opacity=".55" />
          </g>
        </defs>

        <use href="#tri" x="0" y="0" />
        <use href="#tri" x="46" y="140" />
        <use href="#tri" x="92" y="260" />
        <use href="#tri" x="138" y="20" />
        <use href="#tri" x="184" y="200" />
        <use href="#tri" x="230" y="90" />

        <g transform="translate(1440,0) scale(-1,1)">
          <use href="#tri" x="0" y="0" />
          <use href="#tri" x="46" y="140" />
          <use href="#tri" x="92" y="260" />
          <use href="#tri" x="138" y="20" />
          <use href="#tri" x="184" y="200" />
          <use href="#tri" x="230" y="90" />
        </g>
      </svg>
    </div>
  );
}
