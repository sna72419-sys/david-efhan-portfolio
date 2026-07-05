"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";
import {
  MapPin,
  Mail,
  Download,
  GitBranch,
  Smartphone,
  Quote,
  GraduationCap,
  Code2,
  Server,
  Crown,
} from "lucide-react";

function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const floatingIcons = [
  { label: "PHP", pos: "top-0 -left-4 sm:-left-8", color: "#8993BE", delay: 0 },
  { label: "La", pos: "top-6 -right-2 sm:-right-6", color: "#FF2D20", delay: 0.4 },
  { label: "N", pos: "bottom-20 -left-6 sm:-left-10", color: "#FFFFFF", delay: 0.8 },
  { label: "Java", pos: "bottom-24 -right-4 sm:-right-8", color: "#F58219", delay: 1.2 },
  { icon: Smartphone, pos: "-bottom-3 left-6", color: "#3DDC84", delay: 1.6 },
  { icon: GitBranch, pos: "-bottom-3 right-8", color: "#F05032", delay: 2 },
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
  return (
    <section
      id="about"
      className="relative py-16 sm:py-28 border-t border-white/[0.08] overflow-hidden"
      style={{ backgroundColor: "#080B14" }}
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
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
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
              {/* animated gradient blob */}
              <div
                className="absolute inset-[-14%] rounded-full blur-2xl opacity-60 spin-slow"
                style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #3B82F6)" }}
                aria-hidden
              />
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

              {/* floating tech icons */}
              {floatingIcons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`absolute ${item.pos} float-badge`}
                    style={{ animationDelay: `${item.delay}s` }}
                  >
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md shadow-lg"
                      style={{ backgroundColor: "rgba(16,24,39,0.9)" }}
                    >
                      {Icon ? (
                        <Icon size={16} style={{ color: item.color }} />
                      ) : (
                        <span
                          className="text-[10px] font-bold font-mono"
                          style={{ color: item.color }}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* availability card */}
            <div
              className="mt-12 sm:mt-10 w-full max-w-xs rounded-2xl p-[1px]"
              style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}
            >
              <div
                className="rounded-[15px] p-5 backdrop-blur-xl"
                style={{ backgroundColor: "#101827" }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium mb-4"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  Open to Work
                </span>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2.5 text-white/70">
                    <MapPin size={14} className="text-[#3B82F6] shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                    <Mail size={14} className="text-[#3B82F6] shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/70 hover:text-white transition-colors">
                    <GithubIcon size={14} className="text-[#3B82F6] shrink-0" />
                    <span className="truncate">{profile.github}</span>
                  </a>
                </div>

                <a
                  href="/resume.pdf"
                  download
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-transform active:scale-[0.98] hover:brightness-110"
                  style={{ backgroundImage: "linear-gradient(90deg, #7C3AED, #3B82F6)" }}
                >
                  Download Resume <Download size={14} />
                </a>
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
            <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}>
              <div className="rounded-[15px] overflow-hidden backdrop-blur-xl" style={{ backgroundColor: "#101827" }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.08]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70" />
                  <span className="ml-2 text-xs font-mono text-white/40">summary.txt</span>
                </div>
                <p className="px-5 py-5 text-[13.5px] leading-relaxed text-white/70 font-mono">
                  {profile.summary}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Card 2: Developer Status */}
              <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}>
                <div className="rounded-[15px] p-5 h-full backdrop-blur-xl" style={{ backgroundColor: "#101827" }}>
                  <h3 className="text-sm font-bold text-white mb-4">Developer Status</h3>
                  <div className="space-y-3">
                    {statusRows.map((r) => (
                      <div key={r.label} className="flex items-start justify-between gap-3 text-[12.5px]">
                        <span className="flex items-center gap-2 text-white/45 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.dot }} />
                          {r.label}
                        </span>
                        <span className="text-white/80 text-right">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Core Expertise */}
              <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}>
                <div className="rounded-[15px] p-5 h-full backdrop-blur-xl" style={{ backgroundColor: "#101827" }}>
                  <h3 className="text-sm font-bold text-white mb-4">Core Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((e) => (
                      <span
                        key={e}
                        className="px-3 py-1.5 rounded-full text-[11.5px] font-medium text-white/85 border border-white/10 transition-all hover:scale-105 hover:border-white/25"
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
            <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}>
              <div className="relative rounded-[15px] p-6 backdrop-blur-xl overflow-hidden" style={{ backgroundColor: "#101827" }}>
                <Quote size={38} className="text-[#A855F7]/20 absolute top-4 left-4" />
                <p className="relative text-white/80 italic text-[14px] sm:text-[15px] leading-relaxed pl-8">
                  &ldquo;I believe software should be clean, scalable,
                  maintainable, and built to solve real business
                  problems&mdash;not just look good.&rdquo;
                </p>
              </div>
            </div>

            {/* Card 5: Career Objective timeline */}
            <div className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}>
              <div className="rounded-[15px] p-6 backdrop-blur-xl" style={{ backgroundColor: "#101827" }}>
                <h3 className="text-sm font-bold text-white mb-6">Career Objective</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2">
                  {timeline.map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <div key={t.label} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1">
                        <div className="flex sm:flex-col items-center gap-3 sm:gap-2 w-full">
                          <div
                            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border"
                            style={{
                              backgroundColor: t.active ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                              borderColor: t.active ? "#7C3AED" : "rgba(255,255,255,0.1)",
                            }}
                          >
                            <Icon size={16} style={{ color: t.active ? "#A855F7" : "rgba(255,255,255,0.4)" }} />
                          </div>
                          <span className={`text-[11.5px] font-medium text-center sm:text-center ${t.active ? "text-white" : "text-white/40"}`}>
                            {t.label}
                          </span>
                        </div>
                        {i < timeline.length - 1 && (
                          <div className="hidden sm:block flex-1 h-px bg-white/10 mt-[-24px]" aria-hidden />
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
            <div key={s.label} className="rounded-2xl p-[1px]" style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}>
              <div className="rounded-[15px] p-5 sm:p-6 text-center backdrop-blur-xl" style={{ backgroundColor: "#101827" }}>
                <p
                  className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent mb-1"
                  style={{ backgroundImage: "linear-gradient(90deg, #A855F7, #3B82F6)" }}
                >
                  {s.display ?? <Counter value={s.value} suffix={s.suffix} />}
                </p>
                <p className="text-white/45 text-[11px] sm:text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
