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

interface Blob {
  yRatio: number;
  seed: number;
  speed1: number;
  speed2: number;
  baseRadius: number;
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

    let prefersReducedMotion = false;
    try {
      prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // ignore
    }
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
    const ctx = canvas ? canvas.getContext("2d") : null;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const height = canvas ? canvas.height : 800;
    const BLOB_COUNT = 22;
    const blobs: Blob[] = Array.from({ length: BLOB_COUNT }, (_, i) => ({
      yRatio: i / (BLOB_COUNT - 1),
      seed: Math.random() * 1000,
      speed1: 0.0035 + Math.random() * 0.003,
      speed2: 0.007 + Math.random() * 0.004,
      baseRadius: 45 + Math.random() * 45,
    }));

    function spawnEmbers(edgeX: number, h: number, count: number) {
      for (let i = 0; i < count; i++) {
        embers.push({
          x: edgeX + (Math.random() - 0.5) * 60,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 2.2 - 0.6,
          life: 0,
          maxLife: 40 + Math.random() * 55,
          size: 1.2 + Math.random() * 3,
          hue: 15 + Math.random() * 35,
        });
      }
    }

    function drawFlames(edgeX: number, h: number, elapsed: number, intensity: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const y = b.yRatio * h;
        const wobble =
          Math.sin(elapsed * b.speed1 + b.seed) * 0.5 +
          Math.sin(elapsed * b.speed2 + b.seed * 1.7) * 0.5;
        const radius = Math.max(8, b.baseRadius * intensity * (0.7 + wobble * 0.4));
        const x = edgeX + wobble * 22;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, "rgba(255, 247, 214, 0.95)");
        grad.addColorStop(0.28, "rgba(253, 224, 71, 0.85)");
        grad.addColorStop(0.55, "rgba(251, 146, 60, 0.7)");
        grad.addColorStop(0.8, "rgba(239, 68, 68, 0.45)");
        grad.addColorStop(1, "rgba(239, 68, 68, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function tick(now: number) {
      try {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 2.4);
        setProgress(eased);

        const fadeIn = Math.min(t / 0.08, 1);
        const fadeOut = t > 0.75 ? Math.max(1 - (t - 0.75) / 0.25, 0) : 1;
        const intensity = Math.max(fadeIn * fadeOut, 0.12);

        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const edgeX = eased * (canvas.width + 260) - 130;

          if (t < 0.97) {
            drawFlames(edgeX, canvas.height, elapsed, intensity);
            spawnEmbers(edgeX, canvas.height, Math.round(5 * intensity) + 1);
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
            ctx.shadowBlur = 10;
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
      } catch (err) {
        // Never let a drawing error silently kill the transition —
        // fail safe by finishing immediately.
        console.error("FireTransition render error:", err);
        setActive(false);
        onDone();
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

      <div
        className="absolute top-0 bottom-0 w-64 blur-3xl"
        style={{
          left: `calc(${edgePercent}% - 128px)`,
          backgroundImage:
            "linear-gradient(90deg, transparent, #FDE047 30%, #FB923C 55%, #EF4444 80%, transparent)",
          opacity: 0.45,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
