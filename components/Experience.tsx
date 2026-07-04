"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitCommit,
  Briefcase,
  GraduationCap,
  School,
  CheckCircle2,
  MapPin,
  BookOpen,
  Code2,
  Server,
  Layers,
} from "lucide-react";
import { experience, education } from "@/lib/data";

const commits = [
  {
    hash: "a4f3c91",
    date: "January 2026 — March 2026",
    type: "Internship",
    typeIcon: Briefcase,
    typeColor: "#3B82F6",
    title: experience[0]?.title ?? "Information Technology Intern",
    org: experience[0]?.org ?? "CMO-IBA (Integrated Barangay Affairs)",
    status: "Completed",
    statusColor: "#22C55E",
    tasks: experience[0]?.points ?? [],
  },
  {
    hash: "d82b0ef",
    date: education.period,
    type: "Education",
    typeIcon: GraduationCap,
    typeColor: "#A855F7",
    title: education.degree,
    org: education.school,
    status: "Graduated",
    statusColor: "#F59E0B",
    location: education.location,
    focus: ["Software Engineering", "Database Systems", "Web Development", "Mobile Development"],
  },
];

const statsPanel = [
  { label: "Experience", value: "Internship" },
  { label: "Education", value: "Graduate" },
  { label: "Projects", value: 5, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Production Systems", value: 3, suffix: "+" },
];

const journey = [
  { label: "Student", icon: BookOpen },
  { label: "Learning", icon: GraduationCap },
  { label: "Internship", icon: Briefcase },
  { label: "Full Stack Developer", icon: Code2 },
  { label: "Software Engineer", icon: Server },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
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

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[24px] p-[1px] ${className}`}
      style={{ backgroundImage: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))" }}
    >
      <div className="rounded-[23px] h-full backdrop-blur-xl" style={{ backgroundColor: "#101827" }}>
        {children}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-16 sm:py-28 border-t border-white/[0.08] overflow-hidden"
      style={{ backgroundColor: "#080B14" }}
    >
      {/* ambient glow */}
      <div className="absolute top-0 right-1/4 w-[360px] h-[360px] rounded-full blur-[130px] opacity-20 pointer-events-none" style={{ background: "#7C3AED" }} aria-hidden />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: "#3B82F6" }} aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#A855F7] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            // history
          </span>
          <h2 className="relative inline-block text-3xl sm:text-5xl font-bold font-mono tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #A855F7)" }}>
              commit_log()
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
            A timeline of my academic journey, internship experience, and software development milestones.
          </p>
        </motion.div>

        {/* timeline + stats */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 lg:gap-8 items-start mb-14 sm:mb-20">
          {/* left: git commit timeline */}
          <div className="relative pl-10 sm:pl-12">
            {/* glowing vertical line */}
            <div
              className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px"
              style={{ backgroundImage: "linear-gradient(180deg, #7C3AED, #3B82F6, transparent)" }}
              aria-hidden
            />

            <div className="space-y-10">
              {commits.map((c, idx) => {
                const TypeIcon = c.typeIcon;
                return (
                  <motion.div
                    key={c.hash}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.15 }}
                    className="relative"
                  >
                    {/* commit node */}
                    <div
                      className="absolute -left-10 sm:-left-12 top-1 w-8 h-8 rounded-full flex items-center justify-center border-2"
                      style={{ backgroundColor: "#101827", borderColor: c.typeColor, boxShadow: `0 0 16px ${c.typeColor}66` }}
                    >
                      <GitCommit size={14} style={{ color: c.typeColor }} />
                    </div>

                    <div className="rounded-2xl p-[1px]" style={{ backgroundImage: `linear-gradient(160deg, ${c.typeColor}55, rgba(255,255,255,0.03))` }}>
                      <div className="rounded-[15px] p-5 sm:p-6 backdrop-blur-xl hover:translate-y-[-2px] transition-transform duration-300" style={{ backgroundColor: "#101827" }}>
                        {/* meta row */}
                        <div className="flex flex-wrap items-center gap-2.5 mb-3 text-[11px] font-mono">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white/70 border border-white/10 bg-white/[0.03]">
                            <GitCommit size={11} />
                            {c.hash}
                          </span>
                          <span className="text-white/35">{c.date}</span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ backgroundColor: `${c.typeColor}1A`, color: c.typeColor }}>
                            <TypeIcon size={11} />
                            {c.type}
                          </span>
                          <span
                            className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
                            style={{ backgroundColor: `${c.statusColor}1A`, color: c.statusColor, border: `1px solid ${c.statusColor}40` }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.statusColor }} />
                            {c.status}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white mb-1">{c.title}</h3>
                        <p className="text-[13px] text-white/50 mb-4 flex items-center gap-1.5">
                          {c.type === "Education" ? <School size={13} /> : null}
                          {c.org}
                          {c.location && (
                            <span className="inline-flex items-center gap-1 text-white/35">
                              <MapPin size={11} /> {c.location}
                            </span>
                          )}
                        </p>

                        {/* description card for internship */}
                        {c.tasks && c.tasks.length > 0 && (
                          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-2.5">
                            {c.tasks.map((task, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-white/70">
                                <CheckCircle2 size={14} className="text-[#22C55E] shrink-0 mt-0.5" />
                                <span>{task}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* focus card for education */}
                        {c.focus && (
                          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                            <p className="text-[10px] uppercase tracking-widest text-white/35 font-mono mb-2.5">
                              Relevant Focus
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {c.focus.map((f) => (
                                <span key={f} className="flex items-center gap-2 text-[12px] text-white/70">
                                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: c.typeColor }} />
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* right: stats panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="lg:sticky lg:top-24">
            <CardShell>
              <div className="p-5 sm:p-6">
                <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                  <Layers size={15} className="text-[#A855F7]" />
                  Overview
                </h3>
                <div className="space-y-4">
                  {statsPanel.map((s) => (
                    <div key={s.label} className="flex items-center justify-between pb-4 border-b border-white/[0.06] last:border-0 last:pb-0">
                      <span className="text-[12.5px] text-white/45">{s.label}</span>
                      <span className="text-sm font-bold font-mono text-white">
                        {typeof s.value === "number" ? <Counter value={s.value} suffix={s.suffix ?? ""} /> : s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardShell>
          </motion.div>
        </div>

        {/* developer journey roadmap */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <CardShell>
            <div className="p-6 sm:p-8">
              <h3 className="text-sm font-bold text-white mb-7">Developer Journey</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-2">
                {journey.map((step, i) => {
                  const Icon = step.icon;
                  const isCurrent = i === journey.length - 3; // Internship = current milestone
                  return (
                    <div key={step.label} className="flex sm:flex-col items-center gap-4 sm:gap-3 flex-1 relative">
                      <div className="flex sm:flex-col items-center gap-4 sm:gap-3 w-full">
                        <div
                          className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border relative"
                          style={{
                            backgroundColor: isCurrent ? "rgba(124,58,237,0.18)" : "rgba(255,255,255,0.03)",
                            borderColor: isCurrent ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)",
                          }}
                        >
                          {isCurrent && (
                            <div className="absolute inset-0 rounded-2xl blur-md opacity-50" style={{ backgroundColor: "#7C3AED" }} aria-hidden />
                          )}
                          <Icon size={18} className="relative" style={{ color: isCurrent ? "#A855F7" : "rgba(255,255,255,0.4)" }} />
                        </div>
                        <span className={`text-[12px] font-medium text-center whitespace-nowrap ${isCurrent ? "text-white" : "text-white/40"}`}>
                          {step.label}
                        </span>
                      </div>
                      {i < journey.length - 1 && (
                        <div
                          className="hidden sm:block absolute top-[22px] left-[calc(50%+28px)] right-[calc(-50%+28px)] h-px"
                          style={{ backgroundImage: "linear-gradient(90deg, rgba(168,85,247,0.4), rgba(59,130,246,0.4))" }}
                          aria-hidden
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardShell>
        </motion.div>
      </div>
    </section>
  );
}
