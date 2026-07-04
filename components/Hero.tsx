"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

const bootLines = [
  "$ whoami",
  `> ${profile.name}`,
  "$ status --check",
  "> full-stack web & android developer",
  "> location: " + profile.location,
  "$ ready_to_deploy --confirm",
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 380);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowFinal(true), 300);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <section className="relative min-h-screen sm:min-h-[92vh] flex items-center scan-glow overflow-hidden">
      {/* subtle grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          {/* terminal window */}
          <div className="rounded-lg border border-border-dim bg-surface/80 backdrop-blur-sm shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-border-dim">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F87171]/70" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FBBF24]/70" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#34D399]/70" />
              <span className="ml-2 sm:ml-3 text-[11px] sm:text-xs text-muted font-mono truncate">
                david@portfolio:~
              </span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-[13px] sm:text-base leading-relaxed space-y-1 sm:space-y-1.5 min-h-[180px] sm:min-h-[220px] break-words">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith(">") ? "text-accent-cyan" : "text-muted"
                  }
                >
                  {line}
                </div>
              ))}
              {visibleLines < bootLines.length && (
                <span className="inline-block w-2 h-3.5 sm:h-4 bg-accent-cyan cursor-blink" />
              )}
            </div>
          </div>

          {showFinal && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 sm:mt-8"
            >
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-amber mb-2 sm:mb-3">
                {profile.role}
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight leading-[1.1] sm:leading-[1.05] break-words">
                {profile.name}
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted max-w-lg">
                {profile.subtitle} — building offline-capable POS systems,
                inventory platforms, and outreach applications that ship to
                production.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="#projects"
                  className="text-center px-5 py-3 rounded-md bg-accent-cyan text-[#0B0E14] font-mono text-sm font-semibold hover:brightness-110 transition"
                >
                  view_projects()
                </a>
                <a
                  href="#contact"
                  className="text-center px-5 py-3 rounded-md border border-border-dim text-foreground font-mono text-sm font-semibold hover:border-accent-cyan hover:text-accent-cyan transition"
                >
                  get_in_touch()
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
