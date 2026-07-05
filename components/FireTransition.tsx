"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
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

    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const particles: Particle[] = [];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function spawnParticles(edgeX: number, h: number) {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: edgeX + (Math.random() - 0.5) * 30,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -Math.random() * 1.8 - 0.4,
          life: 0,
          maxLife: 35 + Math.random() * 45,
          size: 1.5 + Math.random() * 3,
          hue: 18 + Math.random() * 35,
        });
      }
    }

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const edgeX = eased * (canvas.width + 240) - 120;
        if (t < 0.96) spawnParticles(edgeX, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.004;
          const lifeRatio = p.life / p.maxLife;
          if (lifeRatio >= 1) {
            particles.splice(i, 1);
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
            edgePercent - 6,
            0
          )}% 100%)`,
        }}
      />

      {/* wide soft fire glow at the wipe edge */}
      <div
        className="absolute top-0 bottom-0 w-40 blur-3xl"
        style={{
          left: `calc(${edgePercent}% - 80px)`,
          backgroundImage:
            "linear-gradient(90deg, transparent, #FDE047 25%, #FB923C 50%, #EF4444 75%, transparent)",
          opacity: 0.85,
        }}
      />
      {/* tighter core glow */}
      <div
        className="absolute top-0 bottom-0 w-14 blur-xl"
        style={{
          left: `calc(${edgePercent}% - 28px)`,
          backgroundImage:
            "linear-gradient(90deg, transparent, #FFF7ED 40%, #FDBA74 60%, transparent)",
          opacity: 0.9,
        }}
      />
      {/* bright hairline flare */}
      <div
        className="absolute top-0 bottom-0 w-2"
        style={{
          left: `calc(${edgePercent}% - 4px)`,
          background: "#FFFBEB",
          opacity: 0.8,
          filter: "blur(1px)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
