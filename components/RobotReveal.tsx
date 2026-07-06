"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface RobotRevealProps {
  normalImage: string;
  robotImage: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}

const SPOTLIGHT_RADIUS = 150;
const FEATHER_PX = 48;

const INNER_PCT = (
  ((Math.max(0, SPOTLIGHT_RADIUS - FEATHER_PX) / SPOTLIGHT_RADIUS) * 100)
).toFixed(1);

const SPOTLIGHT_MASK = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at var(--spot-x, 50%) var(--spot-y, 50%), #000 0%, #000 ${INNER_PCT}%, transparent 100%)`;
const HIDDEN_MASK =
  "radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 100%)";

export default function RobotReveal({
  normalImage,
  robotImage,
  width,
  height,
  alt = "Portrait",
  className = "",
}: RobotRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const robotMaskRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);
  const scanOverlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const sizeRef = useRef({ width, height });
  const posRef = useRef({ x: width / 2, y: height / 2 });
  const activeRef = useRef(false);

  const applySpotlight = useCallback((x: number, y: number, visible: boolean) => {
    const robotEl = robotMaskRef.current;
    if (robotEl) {
      if (visible) {
        robotEl.style.maskImage = SPOTLIGHT_MASK;
        robotEl.style.webkitMaskImage = SPOTLIGHT_MASK;
        robotEl.style.setProperty("--spot-x", `${x}px`);
        robotEl.style.setProperty("--spot-y", `${y}px`);
      } else {
        robotEl.style.maskImage = HIDDEN_MASK;
        robotEl.style.webkitMaskImage = HIDDEN_MASK;
      }
    }

    const opacity = visible ? "1" : "0";
    const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

    for (const el of [glowRingRef.current, scanOverlayRef.current, particlesRef.current]) {
      if (!el) continue;
      el.style.transform = transform;
      el.style.opacity = opacity;
    }
  }, []);

  const hideSpotlight = useCallback(() => {
    activeRef.current = false;
    applySpotlight(posRef.current.x, posRef.current.y, false);
  }, [applySpotlight]);

  useEffect(() => {
    const robotEl = robotMaskRef.current;
    if (robotEl) {
      robotEl.style.maskImage = SPOTLIGHT_MASK;
      robotEl.style.webkitMaskImage = SPOTLIGHT_MASK;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      posRef.current = { x, y };
      activeRef.current = true;
      applySpotlight(x, y, true);
    };

    const observer = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      sizeRef.current = { width: w, height: h };
      if (!activeRef.current) {
        posRef.current = { x: w / 2, y: h / 2 };
      }
    });
    observer.observe(container);

    const onPointerMove = (event: PointerEvent) => {
      // Touch/pen: pointermove only fires while finger/stylus is down.
      // Mouse: fires on hover without needing a click.
      if (event.pointerType !== "mouse" && event.buttons === 0) return;
      updateFromClient(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      hideSpotlight();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      hideSpotlight();
    };

    const onPointerCancel = () => {
      hideSpotlight();
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerCancel);

    return () => {
      observer.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
    };
  }, [applySpotlight, hideSpotlight]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-[24px] shadow-[0_24px_64px_-12px_rgba(59,130,246,0.35)] ring-1 ring-white/10 ${className}`}
      style={{ willChange: "transform", touchAction: "none" }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label={alt}
    >
      {/* Base portrait */}
      <Image
        src={normalImage}
        alt={alt}
        fill
        sizes={`${width}px`}
        className="object-contain object-bottom select-none pointer-events-none"
        priority
        draggable={false}
      />

      {/* Robot reveal — masked spotlight, slightly brighter */}
      <div
        ref={robotMaskRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          willChange: "transform",
          contain: "layout style paint",
          ["--spot-x" as string]: "50%",
          ["--spot-y" as string]: "50%",
          maskImage: HIDDEN_MASK,
          WebkitMaskImage: HIDDEN_MASK,
        }}
      >
        <Image
          src={robotImage}
          alt=""
          fill
          sizes={`${width}px`}
          className="object-contain object-bottom brightness-[1.12] contrast-[1.06] saturate-[1.08] select-none"
          aria-hidden
          draggable={false}
        />

        {/* Scan lines inside reveal */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.18) 2px, rgba(59,130,246,0.18) 3px)",
          }}
          aria-hidden
        />

        {/* Blue light reflections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 30% 35%, rgba(96,165,250,0.22), transparent 60%), radial-gradient(ellipse 25% 20% at 70% 60%, rgba(59,130,246,0.18), transparent 55%)",
          }}
          aria-hidden
        />
      </div>

      {/* Blue glow ring */}
      <div
        ref={glowRingRef}
        className="absolute top-0 left-0 pointer-events-none opacity-0"
        style={{ willChange: "transform, opacity" }}
        aria-hidden
      >
        <div
          className="rounded-full"
          style={{
            width: SPOTLIGHT_RADIUS * 2,
            height: SPOTLIGHT_RADIUS * 2,
            boxShadow:
              "0 0 24px 4px rgba(59,130,246,0.55), 0 0 48px 8px rgba(96,165,250,0.35), inset 0 0 20px rgba(147,197,253,0.25)",
            border: "1.5px solid rgba(96,165,250,0.75)",
          }}
        />
      </div>

      {/* Cursor particle glow */}
      <div
        ref={particlesRef}
        className="absolute top-0 left-0 pointer-events-none opacity-0"
        style={{ willChange: "transform, opacity" }}
        aria-hidden
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <span
            key={angle}
            className="absolute rounded-full bg-blue-400/70 blur-[2px]"
            style={{
              width: 4,
              height: 4,
              transform: `rotate(${angle}deg) translateX(${SPOTLIGHT_RADIUS * 0.55}px)`,
              boxShadow: "0 0 6px 2px rgba(59,130,246,0.6)",
            }}
          />
        ))}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/40 blur-md"
          style={{ width: 28, height: 28 }}
        />
      </div>

      {/* Animated scan sweep clipped to spotlight */}
      <div
        ref={scanOverlayRef}
        className="absolute top-0 left-0 pointer-events-none opacity-0 overflow-hidden"
        style={{
          width: SPOTLIGHT_RADIUS * 2,
          height: SPOTLIGHT_RADIUS * 2,
          borderRadius: "50%",
          willChange: "transform, opacity",
        }}
        aria-hidden
      >
        <div
          className="absolute inset-x-0 h-1/3 animate-[scanline_2.8s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(96,165,250,0.45), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}
