import { Activity, Dices, Trophy, Wallet, type LucideIcon } from "lucide-react";
import { LAND, WATER, type Ring } from "@/components/heroGlobeLand";

/**
 * Hero illustration: a dotted globe carrying a live network of iGaming hubs.
 *
 * The worldwide idea is the subject, so the globe is not a backdrop. Land is
 * a halftone of dots sampled evenly over the sphere; coloured arcs lift off
 * the surface between hubs with a pulse of light travelling each one; four
 * module cards (casino, sportsbook, payments, monitoring) are pinned to hubs.
 *
 * Pure SVG, no dependencies, no map file. Everything is computed once at
 * module load: land sampling, an orthographic projection viewed from 20°N
 * 10°E (Europe and Africa face the viewer), and great-circle arcs in 3D.
 *
 * Colours are the site's own: --primary red leads, the land deepens toward
 * --foreground charcoal at the far edge, and arcs alternate red and charcoal.
 * No extra accent hues. All are set via `style`, because var() is unreliable
 * in SVG presentation attributes.
 */

const W = 640;
const H = 600;
const CX = 320;
const CY = 300;
const R = 205;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const fmt = (n: number) => n.toFixed(1);
const c = (token: string, alpha = 1) => `hsl(var(--${token}) / ${alpha})`;

const SIN_V = Math.sin(toRad(20));
const COS_V = Math.cos(toRad(20));

type Vec = { x: number; y: number; z: number };

/** A lat/lon as a unit vector in view space: x right, y up, z toward the viewer. */
const toView = (lat: number, lon: number): Vec => {
  const phi = toRad(lat);
  const dLon = toRad(lon - 10);
  return {
    x: Math.cos(phi) * Math.sin(dLon),
    y: COS_V * Math.sin(phi) - SIN_V * Math.cos(phi) * Math.cos(dLon),
    z: SIN_V * Math.sin(phi) + COS_V * Math.cos(phi) * Math.cos(dLon),
  };
};

const screenX = (v: Vec) => CX + R * v.x;
const screenY = (v: Vec) => CY - R * v.y;

/* ---- Land ------------------------------------------------------------- */

type Boxed = { ring: Ring; minX: number; maxX: number; minY: number; maxY: number };

const box = (ring: Ring): Boxed => {
  const xs = ring.map(([x]) => x);
  const ys = ring.map(([, y]) => y);
  return { ring, minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
};

const LAND_BOXES = LAND.map(box);
const WATER_BOXES = WATER.map(box);

/** Even-odd ray cast, with a bounding-box reject first so sampling stays cheap. */
const inside = ({ ring, minX, maxX, minY, maxY }: Boxed, lon: number, lat: number) => {
  if (lon < minX || lon > maxX || lat < minY || lat > maxY) return false;
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
};

const isLand = (lon: number, lat: number) =>
  LAND_BOXES.some((b) => inside(b, lon, lat)) && !WATER_BOXES.some((b) => inside(b, lon, lat));

/**
 * Dots sit on latitude rows 2.4° apart, each row's count scaled by cos(lat)
 * so spacing stays even over the sphere instead of bunching at the poles.
 * Three depth bands let the far side of the visible face fade and shrink,
 * which is most of what makes the globe read as round. Antarctica is left
 * out: from this viewpoint it would only be a noisy sliver on the bottom limb.
 */
const DOT_STEP = 2.4;
const LAND_DOTS = (() => {
  const bands = { far: "", mid: "", near: "" };
  const rows = Math.round((82 + 56) / DOT_STEP);
  for (let row = 0; row <= rows; row++) {
    const lat = -56 + row * DOT_STEP;
    const count = Math.max(1, Math.round((360 * Math.cos(toRad(lat))) / DOT_STEP));
    for (let k = 0; k < count; k++) {
      const lon = -180 + ((k + 0.5) * 360) / count;
      if (!isLand(lon, lat)) continue;
      const v = toView(lat, lon);
      if (v.z < 0.03) continue;
      const r = 2.1 * (0.45 + 0.55 * v.z);
      const d = `M${fmt(screenX(v) - r)} ${fmt(screenY(v))}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0`;
      if (v.z < 0.35) bands.far += d;
      else if (v.z < 0.7) bands.mid += d;
      else bands.near += d;
    }
  }
  return bands;
})();

/* ---- Hubs and arcs ------------------------------------------------------ */

const HUBS = {
  london: { lat: 51.5, lon: -0.1, tone: "primary" },
  malta: { lat: 35.9, lon: 14.5, tone: "primary" },
  lagos: { lat: 6.5, lon: 3.4, tone: "foreground" },
  saoPaulo: { lat: -23.5, lon: -46.6, tone: "primary" },
  mumbai: { lat: 19.1, lon: 72.9, tone: "primary" },
  toronto: { lat: 43.7, lon: -79.4, tone: "primary" },
  johannesburg: { lat: -26.2, lon: 28.0, tone: "foreground" },
};

type Hub = keyof typeof HUBS;

const HUB_POINTS = (Object.keys(HUBS) as Hub[]).map((name) => {
  const v = toView(HUBS[name].lat, HUBS[name].lon);
  return { name, v, x: screenX(v), y: screenY(v), tone: HUBS[name].tone };
});

const hub = (name: Hub) => HUB_POINTS.find((h) => h.name === name)!;

const ROUTES: [Hub, Hub, string][] = [
  ["toronto", "london", "primary"],
  ["london", "malta", "foreground"],
  ["malta", "mumbai", "primary"],
  ["malta", "lagos", "foreground"],
  ["lagos", "saoPaulo", "primary"],
  ["london", "saoPaulo", "foreground"],
  ["lagos", "johannesburg", "primary"],
  ["johannesburg", "mumbai", "foreground"],
];

/**
 * A great-circle arc lifted off the surface (higher for longer routes).
 * A point is hidden only when it is both behind the globe's centre plane and
 * inside the disc; a lifted point behind the plane but outside the disc is
 * still in view, which is what lets long arcs curve over the limb.
 */
const arcPath = (a: Vec, b: Vec) => {
  const omega = Math.acos(Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z)));
  const lift = 0.08 + 0.32 * (omega / Math.PI);
  const steps = 48;
  let d = "";
  let penDown = false;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const wa = Math.sin((1 - t) * omega) / Math.sin(omega);
    const wb = Math.sin(t * omega) / Math.sin(omega);
    const h = 1 + lift * Math.sin(Math.PI * t);
    const p = { x: (wa * a.x + wb * b.x) * h, y: (wa * a.y + wb * b.y) * h, z: (wa * a.z + wb * b.z) * h };
    if (p.z < 0 && p.x * p.x + p.y * p.y < 1) {
      penDown = false;
      continue;
    }
    d += `${penDown ? "L" : "M"}${fmt(screenX(p))} ${fmt(screenY(p))}`;
    penDown = true;
  }
  return d;
};

const ARCS = ROUTES.map(([from, to, tone]) => ({ d: arcPath(hub(from).v, hub(to).v), tone }));

/* ---- Module cards ------------------------------------------------------- */

type Card = { hub: Hub; x: number; y: number; icon: LucideIcon; title: string; note: string; tone: string };

const CARD_W = 160;
const CARD_H = 50;

const CARDS: Card[] = [
  { hub: "toronto", x: 8, y: 60, icon: Trophy, title: "Sportsbook", note: "Live betting", tone: "primary" },
  { hub: "malta", x: 452, y: 70, icon: Dices, title: "Casino", note: "Live tables", tone: "primary" },
  { hub: "mumbai", x: 476, y: 330, icon: Activity, title: "Monitoring", note: "Around the clock", tone: "primary" },
  { hub: "saoPaulo", x: 8, y: 470, icon: Wallet, title: "Payments", note: "Instant payouts", tone: "primary" },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ---- Orbit: split so its far half passes behind the opaque globe body ---- */

const ORBIT = { rx: 268, ry: 62, tilt: -14 };
const ORBIT_BACK = `M${CX - ORBIT.rx} ${CY} A${ORBIT.rx} ${ORBIT.ry} 0 0 1 ${CX + ORBIT.rx} ${CY}`;
const ORBIT_FRONT = `M${CX + ORBIT.rx} ${CY} A${ORBIT.rx} ${ORBIT.ry} 0 0 1 ${CX - ORBIT.rx} ${CY}`;

export const HeroGlobe = () => (
  <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
    <defs>
      <filter id="globe-shadow" x="-30%" y="-40%" width="160%" height="200%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" style={{ floodColor: c("foreground", 0.13) }} />
      </filter>
      <radialGradient id="globe-atmosphere">
        <stop offset="74%" style={{ stopColor: c("primary", 0.24) }} />
        <stop offset="87%" style={{ stopColor: c("primary", 0.08) }} />
        <stop offset="100%" style={{ stopColor: c("primary", 0) }} />
      </radialGradient>
      <radialGradient id="globe-shade" cx="38%" cy="32%" r="72%">
        <stop offset="0%" style={{ stopColor: c("primary", 0) }} />
        <stop offset="100%" style={{ stopColor: c("primary", 0.1) }} />
      </radialGradient>
      <linearGradient id="globe-land" gradientUnits="userSpaceOnUse" x1={CX - R} y1={CY + R} x2={CX + R} y2={CY - R}>
        <stop offset="0%" style={{ stopColor: c("primary") }} />
        <stop offset="55%" style={{ stopColor: c("primary") }} />
        <stop offset="100%" style={{ stopColor: c("foreground") }} />
      </linearGradient>
    </defs>

    <circle cx={CX} cy={CY} r={R * 1.32} fill="url(#globe-atmosphere)" />

    <g transform={`rotate(${ORBIT.tilt} ${CX} ${CY})`}>
      <path d={ORBIT_BACK} fill="none" strokeWidth="1.25" className="globe-orbit" style={{ stroke: c("primary", 0.3) }} />
    </g>

    <circle cx={CX} cy={CY} r={R} style={{ fill: c("card") }} />
    <circle cx={CX} cy={CY} r={R} fill="url(#globe-shade)" />

    <path d={LAND_DOTS.far} fill="url(#globe-land)" fillOpacity={0.3} />
    <path d={LAND_DOTS.mid} fill="url(#globe-land)" fillOpacity={0.6} />
    <path d={LAND_DOTS.near} fill="url(#globe-land)" fillOpacity={0.9} />

    <circle cx={CX} cy={CY} r={R} fill="none" strokeWidth="1.25" style={{ stroke: c("primary", 0.28) }} />

    <g transform={`rotate(${ORBIT.tilt} ${CX} ${CY})`}>
      <path d={ORBIT_FRONT} fill="none" strokeWidth="1.5" className="globe-orbit" style={{ stroke: c("primary", 0.45) }} />
    </g>

    {/* Network arcs: soft glow, the line, and a pulse of light travelling it */}
    <g fill="none" strokeLinecap="round">
      {ARCS.map(({ d, tone }, i) => (
        <g key={i}>
          <path d={d} strokeWidth="5" style={{ stroke: c(tone, 0.12) }} />
          <path d={d} strokeWidth="1.4" style={{ stroke: c(tone, 0.55) }} />
          <path
            d={d}
            pathLength={100}
            strokeWidth="3"
            className="globe-flow"
            style={{ stroke: c(tone), animationDelay: `${i * 0.45}s` }}
          />
        </g>
      ))}
    </g>

    {CARDS.map((card) => {
      const h = hub(card.hub);
      return (
        <line
          key={card.title}
          x1={h.x}
          y1={h.y}
          x2={clamp(h.x, card.x, card.x + CARD_W)}
          y2={clamp(h.y, card.y, card.y + CARD_H)}
          strokeWidth="1"
          strokeDasharray="2 3"
          style={{ stroke: c(card.tone, 0.55) }}
        />
      );
    })}

    {HUB_POINTS.map((h, i) => (
      <g key={h.name}>
        <circle cx={h.x} cy={h.y} r={4} className="globe-pulse" style={{ fill: c(h.tone, 0.4), animationDelay: `${i * 0.4}s` }} />
        <circle cx={h.x} cy={h.y} r={4} strokeWidth="1.5" style={{ fill: c(h.tone), stroke: c("card") }} />
      </g>
    ))}

    {CARDS.map(({ title, note, tone, x, y, icon: Icon }) => (
      <g key={title}>
        <rect
          x={x}
          y={y}
          width={CARD_W}
          height={CARD_H}
          rx={14}
          strokeWidth="1"
          filter="url(#globe-shadow)"
          style={{ fill: c("card"), stroke: c("border") }}
        />
        <circle cx={x + 26} cy={y + 25} r={15} style={{ fill: c(tone, 0.12) }} />
        <Icon x={x + 18} y={y + 17} size={16} strokeWidth={2.25} style={{ color: c(tone) }} />
        <text x={x + 50} y={y + 22} fontSize={12.5} fontWeight={700} style={{ fill: c("foreground") }}>
          {title}
        </text>
        <text x={x + 50} y={y + 37} fontSize={10} fontWeight={500} style={{ fill: c("muted-foreground") }}>
          {note}
        </text>
      </g>
    ))}
  </svg>
);
