import { useId } from "react";

/**
 * Built-in placeholder vehicle artwork so the site never shows broken images.
 * Real photos take over automatically once `images` is filled in src/data/vehicles.js.
 */
const TONES = {
  Black: "#1c1e22", White: "#d8d8d3", Silver: "#9ea3a9", Grey: "#4b5058", Gray: "#4b5058",
  Blue: "#22406a", Red: "#7f2229", Green: "#26392f", Brown: "#4b3828",
};

const SHAPES = {
  suv: {
    body: "M62 262 L62 226 C62 208 76 198 98 194 L170 184 L212 128 C222 116 238 110 258 110 L522 110 C552 110 572 122 590 142 L640 188 L708 198 C730 202 740 216 740 238 L740 262 Z",
    glass: "M236 132 L268 126 L392 126 L392 184 L204 184 Z M410 126 L520 126 C538 128 550 136 562 150 L588 184 L410 184 Z",
    wheels: [190, 612],
  },
  sedan: {
    body: "M60 262 L60 232 C60 216 74 208 96 204 L190 190 C232 160 274 142 330 138 L470 138 C528 140 566 160 610 190 L700 204 C728 208 742 220 742 240 L742 262 Z",
    glass: "M262 160 L318 148 L392 148 L392 188 L228 188 Z M410 148 L470 148 C506 152 530 168 552 188 L410 188 Z",
    wheels: [190, 612],
  },
  coupe: {
    body: "M58 262 L58 238 C58 222 74 214 100 210 L200 198 C250 158 300 140 360 138 L450 138 C520 140 570 168 612 200 L706 212 C732 216 744 226 744 244 L744 262 Z",
    glass: "M290 160 L350 150 L420 150 L420 196 L246 196 Z M438 150 L458 150 C494 154 524 172 548 196 L438 196 Z",
    wheels: [190, 612],
  },
  pickup: {
    body: "M60 262 L60 208 C60 200 68 194 80 194 L318 194 L318 148 C318 130 330 120 350 118 L470 118 C500 118 522 128 540 148 L580 194 L720 200 C736 202 742 212 742 228 L742 262 Z",
    glass: "M340 140 L470 140 C488 140 502 148 514 162 L540 192 L340 192 Z",
    wheels: [176, 612],
  },
};
const TYPE_TO_SHAPE = { SUV: "suv", Sedan: "sedan", Coupe: "coupe", Pickup: "pickup", Hatchback: "sedan" };
// Crops of the same artwork give the gallery a few different "angles".
const VIEWS = ["0 0 800 360", "400 70 400 230", "100 190 240 150", "0 70 400 230"];

function Wheel({ cx, clip }) {
  return (
    <g>
      <circle cx={cx} cy="262" r="58" fill="#08090a" clipPath={`url(#${clip})`} />
      <circle cx={cx} cy="262" r="47" fill="#0e0e10" stroke="#26282c" strokeWidth="3" />
      <circle cx={cx} cy="262" r="31" fill="url(#rim)" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <rect key={angle} x={cx - 3} y="234" width="6" height="24" fill="#3a3e44" transform={`rotate(${angle} ${cx} 262)`} />
      ))}
      <circle cx={cx} cy="262" r="6" fill="#15161a" />
    </g>
  );
}

export default function PlaceholderArt({ vehicle, view = 0, label, bare = false, className = "" }) {
  const uid = useId().replace(/:/g, "");
  const shape = SHAPES[TYPE_TO_SHAPE[vehicle?.type] || "sedan"];
  const tone = TONES[vehicle?.exteriorColor] || TONES.Grey;
  const clip = `clip${uid}`;

  return (
    <svg
      viewBox={VIEWS[view % VIEWS.length]}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label={label || "Placeholder vehicle image"}
    >
      <defs>
        <radialGradient id={`bg${uid}`} cx="50%" cy="38%" r="75%">
          <stop offset="0" stopColor="#2b2f36" />
          <stop offset="1" stopColor="#0c0d0f" />
        </radialGradient>
        <linearGradient id={`hl${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".26" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".4" />
        </linearGradient>
        <linearGradient id={`gl${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d7783" stopOpacity=".55" />
          <stop offset="1" stopColor="#0d1116" stopOpacity=".95" />
        </linearGradient>
        <radialGradient id="rim" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#d9dde2" />
          <stop offset="1" stopColor="#5b6068" />
        </radialGradient>
        <radialGradient id={`sh${uid}`}>
          <stop offset="0" stopColor="#000" stopOpacity=".7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <rect x="0" y="0" width="800" height="262" />
        </clipPath>
      </defs>
      {!bare && <rect x="-200" y="-100" width="1200" height="600" fill={`url(#bg${uid})`} />}
      {!bare && <rect x="-200" y="310" width="1200" height="200" fill="#08090a" opacity=".55" />}
      <ellipse cx="400" cy="310" rx="360" ry="16" fill={`url(#sh${uid})`} />
      <path d={shape.body} fill={tone} />
      <path d={shape.body} fill={`url(#hl${uid})`} />
      <path d={shape.glass} fill={`url(#gl${uid})`} />
      <line x1="80" y1="192" x2="730" y2="192" stroke="#fff" strokeOpacity=".1" strokeWidth="2" />
      <rect x="714" y="206" width="26" height="8" rx="3" fill="#f3e6c4" opacity=".9" />
      <rect x="60" y="208" width="14" height="10" rx="2" fill="#a12a2a" />
      {shape.wheels.map((cx) => (
        <Wheel key={cx} cx={cx} clip={clip} />
      ))}
    </svg>
  );
}
