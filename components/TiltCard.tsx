"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const quickGlowX = useRef<gsap.QuickToFunc | null>(null);
  const quickGlowY = useRef<gsap.QuickToFunc | null>(null);

  const ensureQuickSetters = () => {
    if (!ref.current) return;
    if (!quickX.current) {
      quickX.current = gsap.quickTo(ref.current, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });
      quickY.current = gsap.quickTo(ref.current, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });
      quickGlowX.current = gsap.quickTo(ref.current, "--glow-x", {
        duration: 0.4,
        ease: "power3.out",
      });
      quickGlowY.current = gsap.quickTo(ref.current, "--glow-y", {
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    ensureQuickSetters();
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * intensity * 2;
    const rotX = (0.5 - py) * intensity * 2;
    quickX.current?.(rotY);
    quickY.current?.(rotX);
    quickGlowX.current?.(px * 100);
    quickGlowY.current?.(py * 100);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
        // @ts-expect-error custom property for glow tracking
        "--glow-x": "50%",
        "--glow-y": "50%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
