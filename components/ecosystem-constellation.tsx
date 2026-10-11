"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Body = {
  id: string;
  name: string;
  logo: string;
  url: string;
  // Transparent logos get a solid disc and some padding so they read as a planet.
  inset?: string;
  bg?: string;
};
type L1 = Body & { size: string };
type App = Body & { chains: string[] };

const DASHBOARD: Body = {
  id: "whaleboard",
  name: "whaleboard",
  url: "https://app.whaling.xyz",
  logo: "/logos/whaling_logo.png",
};

// L1s sit on a ring around the dashboard. Ethereum is the core chain, so it is
// drawn larger than the others.
const L1S: L1[] = [
  { id: "ethereum", name: "Ethereum", url: "https://ethereum.org", logo: "/ecosystem/ethereum.svg", inset: "inset-[16%]", bg: "bg-white", size: "size-[max(2.75rem,9.5cqmin)]" },
  { id: "cosmoshub", name: "Cosmos Hub", url: "https://cosmos.network", logo: "/chains/atom.svg", size: "size-[max(2rem,6.5cqmin)]" },
  { id: "cronos", name: "Cronos", url: "https://cronos.org", logo: "/ecosystem/cronos.svg", inset: "inset-[18%]", bg: "bg-white", size: "size-[max(2rem,6.5cqmin)]" },
  { id: "solana", name: "Solana", url: "https://solana.com", logo: "/ecosystem/solana.svg", inset: "inset-[24%]", bg: "bg-black", size: "size-[max(2rem,6.5cqmin)]" },
  { id: "arc", name: "Arc", url: "https://arc.network", logo: "/ecosystem/arc.webp", size: "size-[max(2rem,6.5cqmin)]" },
  { id: "bnb", name: "BNB Chain", url: "https://www.bnbchain.org", logo: "/ecosystem/bnb.svg", size: "size-[max(2rem,6.5cqmin)]" },
];

// Ethereum L2s, spread evenly on their own ring and tied back to Ethereum.
const L2S: Body[] = [
  { id: "arbitrum", name: "Arbitrum", url: "https://arbitrum.io", logo: "/ecosystem/arbitrum.webp" },
  { id: "base", name: "Base", url: "https://base.org", logo: "/ecosystem/base.webp" },
  { id: "unichain", name: "Unichain", url: "https://www.unichain.org", logo: "/ecosystem/unichain.webp" },
  { id: "polygon", name: "Polygon", url: "https://polygon.technology", logo: "/ecosystem/polygon.webp" },
  { id: "robinhood", name: "Robinhood Chain", url: "https://robinhood.com/us/en/chain/", logo: "/ecosystem/robinhood.webp" },
];

// Apps are spread evenly on the outer ring and linked to every chain they are
// deployed on.
const APPS: App[] = [
  { id: "lido", name: "Lido", url: "https://lido.fi", logo: "/ecosystem/lido.svg", chains: ["ethereum"] },
  { id: "hydro", name: "Hydro", url: "https://hydro.markets", logo: "/ecosystem/hydro.webp", chains: ["cosmoshub"] },
  { id: "morpho", name: "Morpho", url: "https://morpho.org", logo: "/ecosystem/morpho.webp", chains: ["ethereum", "base", "arbitrum", "polygon", "unichain"] },
  { id: "jupiter", name: "Jupiter", url: "https://jup.ag", logo: "/ecosystem/jupiter.webp", chains: ["solana"] },
  { id: "compound", name: "Compound", url: "https://compound.finance", logo: "/ecosystem/compound.webp", chains: ["ethereum", "arbitrum", "base", "polygon"] },
  { id: "jito", name: "Jito", url: "https://www.jito.network", logo: "/ecosystem/jito.webp", chains: ["solana"] },
  { id: "pendle", name: "Pendle", url: "https://www.pendle.finance", logo: "/ecosystem/pendle.webp", chains: ["ethereum", "arbitrum", "base", "bnb"] },
  { id: "pancakeswap", name: "PancakeSwap", url: "https://pancakeswap.finance", logo: "/ecosystem/pancakeswap.webp", chains: ["bnb", "ethereum", "arbitrum", "base"] },
  { id: "aave", name: "Aave", url: "https://aave.com", logo: "/ecosystem/aave.webp", chains: ["ethereum", "arbitrum", "base", "polygon", "bnb"] },
];

// The canvas is 1000 units tall and as wide as the screen allows. Radii are in
// those units and are spaced so the rings never collide while turning.
const HEIGHT = 1000;
const L1_RADIUS = 195;
const L2_RADIUS = 310;
const APP_RADIUS = 420;
// How far the rings may stretch sideways into ovals on wide screens.
const MAX_STRETCH = 1.9;

// The rings only turn while the page scrolls: one step per this many pixels.
const SCROLL_PER_STEP = 40;
// Degrees turned per step; the L2 ring turns the other way.
const L1_SPEED = 1.5;
const L2_SPEED = -2;
const APP_SPEED = 1;

type EdgeKind = "spoke" | "mesh" | "tie" | "lattice" | "app";
type Edge = { a: string; b: string; kind: EdgeKind };

const EDGES: Edge[] = [
  // The dashboard reads every L1.
  ...L1S.map((l1) => ({ a: DASHBOARD.id, b: l1.id, kind: "spoke" as const })),
  // Every L1 is connected to every other L1.
  ...L1S.flatMap((l1, i) =>
    L1S.slice(i + 1).map((other) => ({ a: l1.id, b: other.id, kind: "mesh" as const })),
  ),
  // L2s are tied to Ethereum and woven together.
  ...L2S.map((l2) => ({ a: "ethereum", b: l2.id, kind: "tie" as const })),
  ...L2S.map((l2, i) => ({ a: l2.id, b: L2S[(i + 1) % L2S.length].id, kind: "lattice" as const })),
  ...APPS.flatMap((app) =>
    app.chains.map((chain) => ({ a: app.id, b: chain, kind: "app" as const })),
  ),
];

const EDGE_STYLE: Record<EdgeKind, { stroke: string; width: number; opacity: number; dash?: string }> = {
  spoke: { stroke: "#ffffff", width: 1, opacity: 0.2, dash: "3 9" },
  mesh: { stroke: "#c4b5fd", width: 1, opacity: 0.18 },
  tie: { stroke: "#c4b5fd", width: 1.5, opacity: 0.45 },
  lattice: { stroke: "#c4b5fd", width: 1, opacity: 0.18 },
  app: { stroke: "#a78bfa", width: 1, opacity: 0.25 },
};

// Deterministic pseudo-random values so server and client render the same stars.
const random = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const STARS = Array.from({ length: 80 }, (_, i) => ({
  left: (random(i + 1) * 100).toFixed(2),
  top: (random(i + 101) * 100).toFixed(2),
  size: random(i + 201) > 0.85 ? 2 : 1,
  delay: (random(i + 301) * 4).toFixed(2),
}));

// Rounded because the server and browser can disagree on the last digits of
// Math.sin/cos, which would cause a hydration mismatch.
const round = (value: number) => Math.round(value * 100) / 100;

type Point = { x: number; y: number };

function layout(t: number, width: number) {
  const center = { x: width / 2, y: HEIGHT / 2 };
  const ratio = width / HEIGHT;
  // Landscape: stretch the rings sideways to use the width. Portrait: shrink
  // them to fit the width and stretch them a little vertically instead.
  const scaleX = ratio >= 1 ? Math.min(ratio, MAX_STRETCH) : ratio;
  const scaleY = ratio >= 1 ? 1 : Math.min(1, ratio * 1.5);

  const orbit = (angleDeg: number, radius: number): Point => {
    const angle = (angleDeg * Math.PI) / 180;
    return {
      x: round(center.x + radius * scaleX * Math.sin(angle)),
      y: round(center.y - radius * scaleY * Math.cos(angle)),
    };
  };

  const positions: Record<string, Point> = { [DASHBOARD.id]: center };
  const rings: [Body[], number, number, number][] = [
    [L1S, L1_RADIUS, L1_SPEED, 0],
    // Starting angles chosen so no two rings line up in the resting layout.
    [L2S, L2_RADIUS, L2_SPEED, 54],
    [APPS, APP_RADIUS, APP_SPEED, 0],
  ];

  for (const [bodies, radius, speed, offset] of rings) {
    bodies.forEach((body, i) => {
      const angle = offset + (i * 360) / bodies.length + t * speed;
      const wobble = 8 * Math.sin(t * 0.6 + i * 1.7 + offset);
      positions[body.id] = orbit(angle, radius + wobble);
    });
  }

  return positions;
}

function neighboursOf(id: string | null) {
  const neighbours = new Set<string>();
  if (!id) return neighbours;
  for (const edge of EDGES) {
    if (edge.a === id) neighbours.add(edge.b);
    if (edge.b === id) neighbours.add(edge.a);
  }
  return neighbours;
}

export function EcosystemConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [width, setWidth] = useState(1600);
  const [hovered, setHovered] = useState<string | null>(null);

  // Match the canvas to the container's shape so circles become ovals on wide screens.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      if (h > 0) setWidth(Math.round((w / h) * HEIGHT));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Turn the rings with the scroll position. At the bottom of the page t is 0,
  // so the constellation comes to rest in its evenly spaced layout.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setT((window.scrollY - maxScroll) / SCROLL_PER_STEP);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const positions = layout(t, width);
  const neighbours = neighboursOf(hovered);
  const isLit = (id: string) =>
    !hovered || hovered === id || neighbours.has(id);

  const nodeProps = (body: Body) => ({
    body,
    position: positions[body.id],
    canvasWidth: width,
    lit: isLit(body.id),
    focused: hovered === body.id,
    onEnter: () => setHovered(body.id),
    onLeave: () => setHovered(null),
  });

  return (
    <section className="relative overflow-hidden bg-canvas bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.14)_0%,transparent_60%)] min-h-svh flex flex-col justify-center py-10 px-4">
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-[twinkle_4s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {/* Fade the stars and glow in from the plain section above. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-4 md:mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-ink mb-2">
          {"Supported Chains & "}
          <span className="text-brand-gradient">{"Apps"}</span>
        </h2>
        <p className="text-base md:text-lg text-ink-muted max-w-xl mx-auto text-balance">
          {
            "One constellation for your liquidity. Hover or tap a chain to see the apps living on it."
          }
        </p>
      </div>

      <div
        ref={containerRef}
        className="[container-type:size] relative z-10 mx-auto w-full"
        // Fit the whole constellation on one screen: the full page width and
        // the height left under the heading. Logos size against the smaller side.
        style={{ maxWidth: 1400, height: "max(20rem, calc(100svh - 15rem))" }}
      >
        {/* preserveAspectRatio="none" stretches the drawing to exactly fill the
            same box the logos are positioned in, so lines always meet their logos
            even if the measured width is briefly out of date. non-scaling-stroke
            keeps line thickness constant despite that stretch. */}
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible [&_line]:[vector-effect:non-scaling-stroke]"
          aria-hidden="true"
        >
          {EDGES.map((edge) => {
            const from = positions[edge.a];
            const to = positions[edge.b];
            const style = EDGE_STYLE[edge.kind];
            const active = hovered !== null && (hovered === edge.a || hovered === edge.b);
            const opacity = active ? 0.9 : hovered ? 0.04 : style.opacity;
            return (
              <g
                key={`${edge.a}-${edge.b}`}
                className="transition-opacity duration-300"
                opacity={opacity}
              >
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={style.stroke}
                  strokeWidth={active ? style.width + 1 : style.width}
                  strokeDasharray={style.dash}
                />
                {edge.kind === "app" && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#ffffff"
                    strokeWidth={active ? 3 : 2}
                    strokeLinecap="round"
                    strokeDasharray="1 23"
                    className="animate-[constellation-flow_1.6s_linear_infinite] motion-reduce:animate-none"
                  />
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[26cqmin] rounded-full bg-brand/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[max(3rem,11cqmin)] rounded-full border border-brand/40 animate-ping [animation-duration:3s] motion-reduce:animate-none pointer-events-none" />

        <Node
          {...nodeProps(DASHBOARD)}
          className="size-[max(3rem,11cqmin)] drop-shadow-[0_0_16px_rgba(167,139,250,0.6)]"
          disc={false}
          labelClassName="text-white font-bold"
        />

        {L1S.map((l1) => (
          <Node
            key={l1.id}
            {...nodeProps(l1)}
            className={`${l1.size} ring-2 ring-white/25 shadow-[0_0_32px_rgba(167,139,250,0.4)]`}
            labelClassName="text-white font-semibold"
          />
        ))}

        {L2S.map((l2) => (
          <Node
            key={l2.id}
            {...nodeProps(l2)}
            className="size-[max(1.5rem,4.8cqmin)] ring-2 ring-white/20 shadow-[0_0_20px_rgba(167,139,250,0.35)]"
            labelClassName="text-white font-semibold"
          />
        ))}

        {APPS.map((app) => (
          <Node
            key={app.id}
            {...nodeProps(app)}
            className="size-[max(1.5rem,4.8cqmin)] ring-1 ring-brand-soft/30 shadow-[0_0_16px_rgba(196,181,253,0.25)]"
            labelClassName="text-ink-muted"
          />
        ))}
      </div>

      {/* The year comes from the visitor's clock, so it can differ from the
          server's around New Year; suppressHydrationWarning covers that. */}
      <p
        className="absolute bottom-3 inset-x-0 z-10 text-center text-xs text-ink-muted/70"
        suppressHydrationWarning
      >
        © {new Date().getFullYear()} whalingdotxyz
      </p>
    </section>
  );
}

type NodeProps = {
  body: Body;
  position: Point;
  canvasWidth: number;
  lit: boolean;
  focused: boolean;
  onEnter: () => void;
  onLeave: () => void;
  className: string;
  labelClassName: string;
  // The dashboard logo is drawn as-is instead of being clipped into a disc.
  disc?: boolean;
};

function Node({
  body,
  position,
  canvasWidth,
  lit,
  focused,
  onEnter,
  onLeave,
  className,
  labelClassName,
  disc = true,
}: NodeProps) {
  // On touch screens there is no hover, so the first tap highlights the
  // logo's connections and a second tap opens its website.
  const tapToReveal = useRef(false);

  return (
    <a
      href={body.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={(e) => {
        tapToReveal.current = e.pointerType === "touch" && !focused;
      }}
      onClick={(e) => {
        if (tapToReveal.current) e.preventDefault();
      }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 outline-none cursor-pointer transition-opacity duration-300 ${
        lit ? "opacity-100" : "opacity-25"
      }`}
      style={{ left: `${(position.x / canvasWidth) * 100}%`, top: `${(position.y / HEIGHT) * 100}%` }}
      aria-label={body.name}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <div
        className={`relative rounded-full transition-transform duration-300 ${
          disc ? `overflow-hidden ${body.bg ?? "bg-surface"}` : ""
        } ${focused ? "scale-110" : ""} ${className}`}
      >
        <div className={`absolute ${body.inset ?? "inset-0"}`}>
          <Image
            src={body.logo}
            alt={body.name}
            fill
            sizes="96px"
            className={body.inset || !disc ? "object-contain" : "object-cover"}
          />
        </div>
      </div>
      <span
        className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
          focused ? "block" : "hidden sm:block"
        } ${labelClassName}`}
      >
        {body.name}
      </span>
    </a>
  );
}
