const nodes = [
  { className: "is-one", x: 184, y: 688 },
  { className: "is-two", x: 405, y: 792 },
  { className: "is-three", x: 694, y: 702 },
  { className: "is-four", x: 978, y: 566 },
  { className: "is-five", x: 1242, y: 326 },
  { className: "is-six", x: 1118, y: 174 },
];

export function HeroAtmosphere() {
  return (
    <div className="v2-hero-atmosphere" aria-hidden="true">
      <div className="v2-hero-bloom" />
      <svg viewBox="0 0 1440 930" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="v2-hero-trace" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#2f6fff" stopOpacity="0" />
            <stop offset=".48" stopColor="#4d82ff" stopOpacity=".22" />
            <stop offset="1" stopColor="#b9d2ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="v2-hero-node">
            <stop offset="0" stopColor="#dbe8ff" />
            <stop offset=".35" stopColor="#6795ff" stopOpacity=".85" />
            <stop offset="1" stopColor="#397bff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="v2-hero-traces">
          <path d="M-90 895C285 732 520 764 795 653s508-242 802-515" />
          <path d="M-70 812C292 676 492 662 762 577s535-195 744-416" />
          <path d="M-120 958C322 803 572 844 893 724s472-245 652-420" />
          <path d="M96 929C418 813 625 825 942 716s446-199 610-317" />
          <path className="is-distant" d="M156 232C470 63 832 68 1267 181c143 37 244 35 330 1" />
        </g>

        <g className="v2-hero-nodes">
          {nodes.map(node => (
            <circle key={node.className} className={node.className} cx={node.x} cy={node.y} r="5" fill="url(#v2-hero-node)" />
          ))}
        </g>
      </svg>
      <div className="v2-hero-grain" />
    </div>
  );
}
