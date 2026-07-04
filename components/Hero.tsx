"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";
import { Download, ArrowRight, Mail, Phone, Atom, Zap } from "lucide-react";

function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const techBadges = [
  { label: "Laravel", color: "#FF2D20", position: "top-0 left-2 sm:left-8", delay: 0 },
  { label: "Next.js", color: "#FFFFFF", position: "top-6 right-0 sm:right-4", delay: 0.5 },
  { label: "React", color: "#61DAFB", position: "bottom-24 left-0", icon: Atom, delay: 1 },
  { label: "TypeScript", color: "#3178C6", position: "bottom-8 right-0 sm:right-2", delay: 1.5 },
  { label: "Supabase", color: "#3ECF8E", position: "-bottom-2 left-1/3", icon: Zap, delay: 2 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* dotted grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(var(--border-dim) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* left: text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#34D399]/40 bg-[#34D399]/10 text-[#34D399] text-xs sm:text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
              Full Stack Developer
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Hi, I&apos;m
              <br />
              David{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, var(--hero-blue), var(--hero-purple))",
                }}
              >
                Efhan
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted max-w-md">
              I build modern, scalable, and user-friendly web and mobile
              applications that solve real-world problems.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:brightness-110 transition"
                style={{ backgroundImage: "linear-gradient(90deg, var(--hero-blue), var(--hero-purple))" }}
              >
                View My Work <ArrowRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border-dim text-foreground font-semibold text-sm hover:border-accent-cyan hover:text-accent-cyan transition"
              >
                Download CV <Download size={16} />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center text-muted hover:text-accent-cyan hover:border-accent-cyan transition"
              >
                <GithubIcon size={17} />
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                aria-label="Phone"
                className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center text-muted hover:text-accent-cyan hover:border-accent-cyan transition"
              >
                <Phone size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center text-muted hover:text-accent-cyan hover:border-accent-cyan transition"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* right: floating photo with orbit + tech badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[420px] aspect-square"
          >
            {/* gradient blob */}
            <div
              className="absolute inset-[8%] rounded-full blur-2xl opacity-70"
              style={{ backgroundImage: "linear-gradient(135deg, var(--hero-blue), var(--hero-purple))" }}
              aria-hidden
            />
            <div
              className="absolute inset-[8%] rounded-full opacity-90"
              style={{ backgroundImage: "linear-gradient(135deg, var(--hero-blue), var(--hero-purple))" }}
              aria-hidden
            />

            {/* orbit rings */}
            <div className="absolute inset-[-6%] rounded-full border border-border-dim/70 spin-slow" aria-hidden>
              <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent-cyan" />
            </div>
            <div className="absolute inset-[4%] rounded-full border border-border-dim/50" aria-hidden>
              <span className="absolute top-1/4 -right-1 w-1.5 h-1.5 rounded-full bg-hero-purple" />
            </div>

            {/* photo */}
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="relative w-[85%] aspect-[5/6]">
                <Image
                  src="/profile-float.png"
                  alt={profile.name}
                  fill
                  sizes="360px"
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* floating tech badges */}
            {techBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`absolute ${badge.position} float-badge`}
                  style={{ animationDelay: `${badge.delay}s` }}
                >
                  <div className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border-dim bg-surface/90 backdrop-blur-sm shadow-lg">
                    {Icon ? (
                      <Icon size={20} style={{ color: badge.color }} />
                    ) : badge.label === "Next.js" ? (
                      <span className="w-5 h-5 rounded-full border border-foreground flex items-center justify-center text-[10px] font-bold">
                        N
                      </span>
                    ) : badge.label === "TypeScript" ? (
                      <span
                        className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ backgroundColor: badge.color }}
                      >
                        TS
                      </span>
                    ) : (
                      <span
                        className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ backgroundColor: badge.color }}
                      >
                        La
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-muted whitespace-nowrap">
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
