"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";
import {
  MapPin,
  Mail,
  Download,
  Eye,
  Atom,
  Zap,
  Quote,
  GraduationCap,
  Code2,
  Server,
  Crown,
} from "lucide-react";
import ResumeViewerModal from "@/components/ResumeViewerModal";

function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const techBadges = [
  { label: "Laravel", color: "#FF2D20", position: "top-0 left-0 sm:left-4", delay: 0 },
  { label: "Next.js", color: "#FFFFFF", position: "top-4 right-0 sm:right-1", delay: 0.5 },
  { label: "React", color: "#61DAFB", position: "bottom-16 -left-2 sm:left-0", icon: Atom, delay: 1 },
  { label: "TypeScript", color: "#3178C6", position: "bottom-6 right-0 sm:-right-1", delay: 1.5 },
  { label: "Supabase", color: "#3ECF8E", position: "-bottom-3 left-1/3", icon: Zap, delay: 2 },
];

const statusRows = [
  { label: "Status", value: "Available", dot: "#22C55E" },
  { label: "Experience", value: "Full Stack Development", dot: "#3B82F6" },
  { label: "Interest", value: "Backend Engineering", dot: "#A855F7" },
  { label: "Availability", value: "Open for Internship & Junior Roles", dot: "#F59E0B" },
];

const expertise = ["Laravel", "Next.js", "Java", "Android", "SQL", "REST API"];

const timeline = [
  { label: "Graduate", icon: GraduationCap, active: true },
  { label: "Junior Developer", icon: Code2, active: false },
  { label: "Software Engineer", icon: Server, active: false },
  { label: "Senior Full Stack Developer", icon: Crown, active: false },
];

const stats = [
  { value: 3, suffix: "+", label: "Production Systems" },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Passion for Learning" },
  { value: 0, suffix: "", label: "Always Building Projects", display: "Always" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <section
      id="about"
      className="relative py-16 sm:py-28 border-t border-foreground/[0.08] overflow-hidden"
      style={{ backgroundColor: "var(--page-bg)" }}
    >
      {/* ambient glow */}
      <div
        className="absolute top-10 right-0 w-[380px] h-[380px] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{ background: "#3B82F6" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 -left-32 w-[320px] h-[320px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "#7C3AED" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--fg-rgb),0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--fg-rgb),0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-20"
        >          <h2 className="relative inline-block text-3xl sm:text-5xl font-bold font-mono tracking-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #A855F7)" }}
            >
              developer_profile()
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute left-0 -bottom-2 h-[3px] w-full origin-left rounded-full"
              style={{ backgroundImage: "linear-gradient(90deg, #7C3AED, #3B82F6)" }}
            />
          </h2>
          <p className="text-muted mt-5 max-w-lg text-sm sm:text-base">
            The story behind the developer and the mindset used to build
            reliable software.
          </p>
        </motion.div>

        {/* two column layout */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-start">
          {/* LEFT: photo + availability */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] mx-auto lg:mx-0">
              {/* gradient blob (matches Hero) */}
              <div
                className="absolute inset-[8%] rounded-full blur-2xl opacity-70"
                style={{ backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                aria-hidden
              />
              <div
                className="absolute inset-[8%] rounded-full opacity-90"
                style={{ backgroundImage: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }}
                aria-hidden
              />

              {/* orbit rings (matches Hero) */}
              <div className="absolute inset-[-6%] rounded-full border border-foreground/10 spin-slow" aria-hidden>
                <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-[#5EEAD4]" />
              </div>
              <div className="absolute inset-[4%] rounded-full border border-foreground/[0.08]" aria-hidden>
                <span className="absolute top-1/4 -right-1 w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
              </div>

              <div className="relative w-full h-full rounded-full p-1" style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #3B82F6)" }}>
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[#101827]">
                  <Image
                    src="/profile-circle.png"
                    alt={profile.name}
                    fill
                    sizes="260px"
                    className="object-cover"
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
                    <div className="flex flex-col items-center gap-1.5 px-2.5 py-2 rounded-xl border border-border-dim bg-surface/90 backdrop-blur-sm shadow-lg">
                      {Icon ? (
                        <Icon size={18} style={{ color: badge.color }} />
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
                      <span className="text-[9px] font-mono text-muted whitespace-nowrap">
                        {badge.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* availability card */}
            <div
              className="mt-12 sm:mt-10 w-full max-w-xs rounded-2xl p-[1px]"
              style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}
            >
              <div
                className="rounded-[15px] p-5 backdrop-blur-xl"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Open to Work
                </span>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2.5 text-foreground/70">
                    <MapPin size={14} className="text-[#3B82F6] shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 text-foreground/70 hover:text-foreground transition-colors">
                    <Mail size={14} className="text-[#3B82F6] shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-foreground/70 hover:text-foreground transition-colors">
                    <GithubIcon size={14} className="text-[#3B82F6] shrink-0" />
                    <span className="truncate">{profile.github}</span>
                  </a>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-semibold text-[13px] text-foreground/85 border border-foreground/15 transition-all hover:border-foreground/30 hover:bg-foreground/[0.04]"
                  >
                    View <Eye size={13} />
                  </button>
                  <a
                    href="/resume.pdf"
                    download
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-semibold text-[13px] text-white transition-transform active:scale-[0.98] hover:brightness-110"
                    style={{ backgroundImage: "linear-gradient(90deg, #7C3AED, #3B82F6)" }}
                  >
                    Download <Download size={13} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: stacked cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Card 1: summary.txt */}
            <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
              <div className="rounded-[15px] overflow-hidden backdrop-blur-xl" style={{ backgroundColor: "var(--card-bg)" }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/[0.08]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70" />
                  <span className="ml-2 text-xs font-mono text-foreground/40">summary.txt</span>
                </div>
                <p className="px-5 py-5 text-[13.5px] leading-relaxed text-foreground/70 font-mono">
                  {profile.summary}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Card 2: Developer Status */}
              <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
                <div className="rounded-[15px] p-5 h-full backdrop-blur-xl" style={{ backgroundColor: "var(--card-bg)" }}>
                  <h3 className="text-sm font-bold text-foreground mb-4">Developer Status</h3>
                  <div className="space-y-3">
                    {statusRows.map((r) => (
                      <div key={r.label} className="flex items-start justify-between gap-3 text-[12.5px]">
                        <span className="flex items-center gap-2 text-foreground/45 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.dot }} />
                          {r.label}
                        </span>
                        <span className="text-foreground/80 text-right">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Core Expertise */}
              <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
                <div className="rounded-[15px] p-5 h-full backdrop-blur-xl" style={{ backgroundColor: "var(--card-bg)" }}>
                  <h3 className="text-sm font-bold text-foreground mb-4">Core Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((e) => (
                      <span
                        key={e}
                        className="px-3 py-1.5 rounded-full text-[11.5px] font-medium text-foreground/85 border border-foreground/10 transition-all hover:scale-105 hover:border-foreground/25"
                        style={{ backgroundImage: "linear-gradient(120deg, rgba(124,58,237,0.15), rgba(59,130,246,0.15))" }}
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Development Philosophy */}
            <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
              <div className="relative rounded-[15px] p-6 backdrop-blur-xl overflow-hidden" style={{ backgroundColor: "var(--card-bg)" }}>
                <Quote size={38} className="text-[#A855F7]/20 absolute top-4 left-4" />
                <p className="relative text-foreground/80 italic text-[14px] sm:text-[15px] leading-relaxed pl-8">
                  &ldquo;I believe software should be clean, scalable,
                  maintainable, and built to solve real business
                  problems&mdash;not just look good.&rdquo;
                </p>
              </div>
            </div>

            {/* Card 5: Career Objective timeline */}
            <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
              <div className="rounded-[15px] p-6 backdrop-blur-xl" style={{ backgroundColor: "var(--card-bg)" }}>
                <h3 className="text-sm font-bold text-foreground mb-6">Career Objective</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2">
                  {timeline.map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <div key={t.label} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1">
                        <div className="flex sm:flex-col items-center gap-3 sm:gap-2 w-full">
                          <div
                            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border"
                            style={{
                              backgroundColor: t.active ? "rgba(124,58,237,0.15)" : "rgba(var(--fg-rgb),0.03)",
                              borderColor: t.active ? "#7C3AED" : "rgba(var(--fg-rgb),0.1)",
                            }}
                          >
                            <Icon size={16} style={{ color: t.active ? "#A855F7" : "rgba(var(--fg-rgb),0.4)" }} />
                          </div>
                          <span className={`text-[11.5px] font-medium text-center sm:text-center ${t.active ? "text-foreground" : "text-foreground/40"}`}>
                            {t.label}
                          </span>
                        </div>
                        {i < timeline.length - 1 && (
                          <div className="hidden sm:block flex-1 h-px bg-foreground/10 mt-[-24px]" aria-hidden />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-14 sm:mt-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
              <div className="rounded-[15px] p-5 sm:p-6 text-center backdrop-blur-xl" style={{ backgroundColor: "var(--card-bg)" }}>
                <p
                  className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent mb-1"
                  style={{ backgroundImage: "linear-gradient(90deg, #A855F7, #3B82F6)" }}
                >
                  {s.display ?? <Counter value={s.value} suffix={s.suffix} />}
                </p>
                <p className="text-foreground/45 text-[11px] sm:text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <ResumeViewerModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
