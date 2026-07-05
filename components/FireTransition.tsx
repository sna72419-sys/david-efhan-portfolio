"use client";

import { useEffect, useRef, useState } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface Tongue {
  seed: number;
  speed1: number;
  speed2: number;
  freq1: number;
  freq2: number;
  ampBase: number;
}

export default function FireTransition({
  trigger,
  curtainColor,
  onDone,
}: {
  trigger: number;
  curtainColor: string;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      onDone();
      return;
    }

    setActive(true);
    setProgress(0);

    const duration = 1750;
    const start = performance.now();
    let raf: number;
    const embers: Ember[] = [];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const SEGMENTS = 36;
    const segHeight = canvas ? canvas.height / SEGMENTS + 2 : 20;
    const tongues: Tongue[] = Array.from({ length: SEGMENTS }, () => ({
      seed: Math.random() * 1000,
      speed1: 0.006 + Math.random() * 0.004,
      speed2: 0.014 + Math.random() * 0.006,
      freq1: 0.5 + Math.random() * 0.5,
      freq2: 1.2 + Math.random() * 0.8,
      ampBase: 60 + Math.random() * 70,
    }));

    function spawnEmbers(edgeX: number, h: number, count: number) {
      for (let i = 0; i < count; i++) {
        embers.push({
          x: edgeX + (Math.random() - 0.5) * 60,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 2.4 - 0.6,
          life: 0,
          maxLife: 40 + Math.random() * 55,
          size: 1.2 + Math.random() * 3,
          hue: 15 + Math.random() * 35,
        });
      }
    }

    function drawFlameWall(edgeX: number, h: number, elapsed: number, fadeOut: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < SEGMENTS; i++) {
        const tongue = tongues[i];
        const y = i * segHeight;
        const flicker =
          Math.sin(elapsed * tongue.speed1 + tongue.seed + i * tongue.freq1) * 0.5 +
          Math.sin(elapsed * tongue.speed2 + tongue.seed * 1.3 + i * tongue.freq2) * 0.5;
        const tongueHeight = Math.max(
          20,
          (tongue.ampBase + flicker * tongue.ampBase * 0.6) * fadeOut
        );
        const xJitter = Math.sin(elapsed * 0.01 + i * 0.7 + tongue.seed) * 14;
        const baseX = edgeX + xJitter;

        // each tongue: a soft vertical teardrop, wide at bottom (base), tapering upward-ish sideways
        const grad = ctx.createLinearGradient(baseX - tongueHeight, y, baseX + 6, y);
        grad.addColorStop(0, "rgba(255, 241, 176, 0)");
        grad.addColorStop(0.35, "rgba(253, 186, 116, 0.55)");
        grad.addColorStop(0.65, "rgba(251, 146, 60, 0.85)");
        grad.addColorStop(0.88, "rgba(239, 68, 68, 0.9)");
        grad.addColorStop(1, "rgba(127, 29, 29, 0.6)");

        ctx.beginPath();
        ctx.moveTo(baseX + 8, y);
        ctx.quadraticCurveTo(
          baseX - tongueHeight * 0.55,
          y + segHeight * 0.3,
          baseX - tongueHeight,
          y + segHeight * 0.5
        );
        ctx.quadraticCurveTo(
          baseX - tongueHeight * 0.55,
          y + segHeight * 0.7,
          baseX + 8,
          y + segHeight
        );
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }
      ctx.restore();
    }

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(eased);

      // fade the flame intensity in over the first 10% and out over the last 25%
      const fadeIn = Math.min(t / 0.08, 1);
      const fadeOut = t > 0.75 ? Math.max(1 - (t - 0.75) / 0.25, 0) : 1;
      const intensity = fadeIn * fadeOut;

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const edgeX = eased * (canvas.width + 260) - 130;

        if (t < 0.97) {
          drawFlameWall(edgeX, canvas.height, elapsed, Math.max(intensity, 0.15));
          spawnEmbers(edgeX, canvas.height, Math.round(6 * intensity + 1));
        }

        for (let i = embers.length - 1; i >= 0; i--) {
          const p = embers[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.005;
          const lifeRatio = p.life / p.maxLife;
          if (lifeRatio >= 1) {
            embers.splice(i, 1);
            continue;
          }
          const alpha = 1 - lifeRatio;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(p.size * (1 - lifeRatio * 0.6), 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, ${55 + lifeRatio * 25}%, ${alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setActive(false);
          onDone();
        }, 300);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  if (!active) return null;

  const edgePercent = progress * 100;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* curtain of the old theme, wiped away to reveal the new one underneath */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: curtainColor,
          clipPath: `polygon(${edgePercent}% 0%, 100% 0%, 100% 100%, ${Math.max(
            edgePercent - 8,
            0
          )}% 100%)`,
        }}
      />

      {/* ambient heat glow bleeding ahead of the flame wall */}
      <div
        className="absolute top-0 bottom-0 w-64 blur-3xl"
        style={{
          left: `calc(${edgePercent}% - 128px)`,
          backgroundImage:
            "linear-gradient(90deg, transparent, #FDE047 30%, #FB923C 55%, #EF4444 80%, transparent)",
          opacity: 0.5,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
