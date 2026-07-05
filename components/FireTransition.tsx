"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

export type FireMode = "toDark" | "toLight";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const PALETTES: Record<
  FireMode,
  {
    curtainColor: string;
    core: string;
    mid: string;
    outer: string;
    glowSoft: string;
    direction: "ltr" | "rtl";
  }
> = {
  toDark: {
    curtainColor: "#FFFFFF",
    core: "#F0FBFF",
    mid: "#7DD3FC",
    outer: "#0EA5E9",
    glowSoft: "#38BDF8",
    direction: "rtl",
  },
  toLight: {
    curtainColor: "#09090B",
    core: "#FFF3D6",
    mid: "#FFA500",
    outer: "#FF4500",
    glowSoft: "#FF8C00",
    direction: "ltr",
  },
};

let filterIdCounter = 0;

export default function FireTransition({
  active,
  mode,
  onMidpoint,
  onComplete,
}: {
  active: boolean;
  mode: FireMode;
  onMidpoint: () => void;
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);
  const [filterId] = useState(() => `fireNoise-${++filterIdCounter}`);
  const [maskId] = useState(() => `fireMask-${filterIdCounter}`);
  const palette = PALETTES[mode];

  useEffect(() => {
    if (!active) return;

    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }

    if (reduced) {
      onMidpoint();
      const t = setTimeout(onComplete, 100);
      return () => clearTimeout(t);
    }

    const duration = 1.35;
    const embers: Ember[] = [];
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    let raf: number;
    let running = true;
    let midpointFired = false;

    function coverageOf(v: number) {
      return v <= 0.5 ? v * 2 : (1 - v) * 2;
    }

    function spawn(edgeX: number, h: number, count: number) {
      for (let i = 0; i < count; i++) {
        embers.push({
          x: edgeX + (Math.random() - 0.5) * 70,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1,
          vy: -Math.random() * 2.4 - 0.5,
          life: 0,
          maxLife: 45 + Math.random() * 60,
          size: 1.2 + Math.random() * 3,
          color: Math.random() > 0.5 ? palette.mid : palette.core,
        });
      }
    }

    function draw() {
      try {
        if (!ctx || !canvas || !running) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const v = progress.get();
        const coverage = coverageOf(v);
        const edgeX =
          palette.direction === "ltr"
            ? coverage * canvas.width
            : canvas.width - coverage * canvas.width;

        if (coverage > 0.02) spawn(edgeX, canvas.height, 3);

        for (let i = embers.length - 1; i >= 0; i--) {
          const e = embers[i];
          e.life++;
          e.x += e.vx;
          e.y += e.vy;
          e.vy -= 0.004;
          const lr = e.life / e.maxLife;
          if (lr >= 1) {
            embers.splice(i, 1);
            continue;
          }
          const alpha = 1 - lr;
          ctx.beginPath();
          ctx.arc(e.x, e.y, Math.max(e.size * (1 - lr * 0.5), 0.4), 0, Math.PI * 2);
          ctx.fillStyle = e.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = 12;
          ctx.shadowColor = e.color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      } catch (err) {
        console.error("FireTransition canvas error:", err);
      }
      if (running) raf = requestAnimationFrame(draw);
    }

    progress.set(0);
    raf = requestAnimationFrame(draw);

    const controls = animate(progress, 1, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => {
        if (!midpointFired && v >= 0.5) {
          midpointFired = true;
          onMidpoint();
        }
      },
      onComplete: () => {
        setTimeout(() => {
          running = false;
          cancelAnimationFrame(raf);
          onComplete();
        }, 300);
      },
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mode]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
          style={{ backdropFilter: "blur(0px)" }}
        >
          {/* SVG turbulence filter + mask defining the organic flame edge */}
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
            <defs>
              <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.035"
                  numOctaves="3"
                  seed="7"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="2.5s"
                    values="0.012 0.035;0.017 0.045;0.012 0.035"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="70"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <mask id={maskId} maskUnits="objectBoundingBox">
                <MaskRect
                  progress={progress}
                  direction={palette.direction}
                  filterId={filterId}
                  rectRef={maskRectRef}
                />
              </mask>
            </defs>
          </svg>

          {/* curtain of the old theme, revealed via the turbulent SVG mask */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: palette.curtainColor,
              WebkitMaskImage: `url(#${maskId})`,
              maskImage: `url(#${maskId})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          {/* glow following the flame edge */}
          <GlowEdge progress={progress} direction={palette.direction} palette={palette} />

          {/* heat-shimmer blur band */}
          <HeatBand progress={progress} direction={palette.direction} />

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MaskRect({
  progress,
  direction,
  filterId,
  rectRef,
}: {
  progress: ReturnType<typeof useMotionValue<number>>;
  direction: "ltr" | "rtl";
  filterId: string;
  rectRef: React.RefObject<SVGRectElement | null>;
}) {
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const rect = rectRef.current;
      if (!rect) return;
      const coverage = v <= 0.5 ? v * 2 : (1 - v) * 2;
      const widthPct = coverage * 130 - 15;
      if (direction === "ltr") {
        rect.setAttribute("x", "-15%");
        rect.setAttribute("width", `${Math.max(widthPct, 0)}%`);
      } else {
        rect.setAttribute("x", `${100 - Math.max(widthPct, 0) + 15}%`);
        rect.setAttribute("width", `${Math.max(widthPct, 0)}%`);
      }
    });
    return unsub;
  }, [progress, direction, rectRef]);

  return (
    <rect
      ref={rectRef}
      x={direction === "ltr" ? "-15%" : "115%"}
      y="-15%"
      width="0%"
      height="130%"
      fill="white"
      filter={`url(#${filterId})`}
    />
  );
}

function GlowEdge({
  progress,
  direction,
  palette,
}: {
  progress: ReturnType<typeof useMotionValue<number>>;
  direction: "ltr" | "rtl";
  palette: (typeof PALETTES)[FireMode];
}) {
  const left = useMotionValue("0%");

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const coverage = v <= 0.5 ? v * 2 : (1 - v) * 2;
      const pct = direction === "ltr" ? coverage * 100 : 100 - coverage * 100;
      left.set(`calc(${pct}% - 110px)`);
    });
    return unsub;
  }, [progress, direction, left]);

  return (
    <motion.div
      className="absolute top-0 bottom-0 w-56 blur-3xl"
      style={{
        left,
        backgroundImage: `linear-gradient(90deg, transparent, ${palette.core} 25%, ${palette.mid} 50%, ${palette.outer} 75%, transparent)`,
        opacity: 0.55,
        mixBlendMode: "screen",
      }}
    />
  );
}

function HeatBand({
  progress,
  direction,
}: {
  progress: ReturnType<typeof useMotionValue<number>>;
  direction: "ltr" | "rtl";
}) {
  const left = useMotionValue("0%");

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const coverage = v <= 0.5 ? v * 2 : (1 - v) * 2;
      const pct = direction === "ltr" ? coverage * 100 : 100 - coverage * 100;
      left.set(`calc(${pct}% - 40px)`);
    });
    return unsub;
  }, [progress, direction, left]);

  return (
    <motion.div
      className="absolute top-0 bottom-0 w-20"
      style={{
        left,
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        opacity: 0.6,
      }}
    />
  );
}
