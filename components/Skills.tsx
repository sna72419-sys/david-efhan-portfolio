"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Coffee,
  FileCode2,
  Braces,
  FileJson2,
  Database,
  FileType2,
  Palette,
  Server,
  Globe,
  Atom,
  Smartphone,
  Zap,
  HardDrive,
  Wind,
  GitBranch,
  Network,
  CheckSquare,
  FlaskConical,
  Monitor,
  Lock,
  ShieldCheck,
  FileSpreadsheet,
  Lightbulb,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  Wrench,
  Check,
} from "lucide-react";

function GithubIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const statusItems = [
  { label: "System Status", value: "ONLINE", dot: "#22C55E", pulse: true },
  { label: "Developer Mode", value: "ACTIVE", dot: "#3B82F6", pulse: false },
  { label: "Full Stack Environment", value: "READY", dot: "#A855F7", pulse: false },
  { label: "Projects Built", value: "Production Ready", dot: "#F59E0B", pulse: false },
];

const languages = [
  { name: "PHP", icon: Braces, level: 90, color: "#8993BE" },
  { name: "Java", icon: Coffee, level: 85, color: "#F58219" },
  { name: "JavaScript", icon: FileJson2, level: 85, color: "#F7DF1E" },
  { name: "TypeScript", icon: FileType2, level: 78, color: "#3B82F6" },
  { name: "SQL", icon: Database, level: 82, color: "#22C55E" },
  { name: "HTML", icon: FileCode2, level: 92, color: "#E34F26" },
  { name: "CSS", icon: Palette, level: 88, color: "#3B82F6" },
];

const frameworks = [
  { name: "Laravel", desc: "PHP framework for web apps", version: "v12", icon: Server, color: "#FF2D20" },
  { name: "Next.js", desc: "React framework for production", version: "v15", icon: Globe, color: "#FFFFFF" },
  { name: "React", desc: "UI component library", version: "v18", icon: Atom, color: "#61DAFB" },
  { name: "Android SDK", desc: "Native Android development", version: "API 34", icon: Smartphone, color: "#3DDC84" },
  { name: "Supabase", desc: "Backend-as-a-Service", version: "v2", icon: Zap, color: "#3ECF8E" },
  { name: "SQLite", desc: "Embedded database engine", version: "v3", icon: HardDrive, color: "#A855F7" },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework", version: "v4", icon: Wind, color: "#38BDF8" },
];

const toolkit = [
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GithubIcon },
  { name: "REST API", icon: Network },
  { name: "Vite", icon: Zap },
  { name: "PHPUnit", icon: CheckSquare },
  { name: "Vitest", icon: FlaskConical },
  { name: "Responsive Design", icon: Monitor },
  { name: "Authentication", icon: Lock },
  { name: "Data Validation", icon: ShieldCheck },
  { name: "Microsoft Office", icon: FileSpreadsheet },
];

const workflow = [
  { label: "Idea", icon: Lightbulb },
  { label: "Design", icon: PenTool },
  { label: "Development", icon: Code2 },
  { label: "Testing", icon: TestTube2 },
  { label: "Deployment", icon: Rocket },
  { label: "Maintenance", icon: Wrench },
];

const radarNodes = [
  "Backend",
  "Frontend",
  "Database",
  "Mobile",
  "Testing",
  "Deployment",
  "API",
];

const bottomStats = [
  { value: 7, suffix: "", label: "Languages" },
  { value: 7, suffix: "", label: "Frameworks" },
  { value: 10, suffix: "+", label: "Developer Tools" },
  { value: 5, suffix: "+", label: "Production Projects" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
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

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-16 sm:py-28 border-t border-white/[0.08] overflow-hidden"
      style={{ backgroundColor: "#080B14" }}
    >
      {/* ambient glow */}
      <div className="absolute top-1/4 -left-32 w-[380px] h-[380px] rounded-full blur-[130px] opacity-20 pointer-events-none" style={{ background: "#7C3AED" }} aria-hidden />
      <div className="absolute bottom-0 -right-32 w-[380px] h-[380px] rounded-full blur-[130px] opacity-20 pointer-events-none" style={{ background: "#3B82F6" }} aria-hidden />
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
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#A855F7] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            // stack
          </span>
          <h2 className="relative inline-block text-3xl sm:text-5xl font-bold font-mono tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #A855F7)" }}>
              system_status
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
            Loaded modules and active tools currently used for building scalable software.
          </p>
        </motion.div>

        {/* top status bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10 sm:mb-14">
          <CardShell>
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/[0.08]">
              {statusItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5 px-5 py-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/35 font-mono">{item.label}</span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="relative flex h-2 w-2">
                      {item.pulse && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: item.dot }} />
                      )}
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: item.dot }} />
                    </span>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardShell>
        </motion.div>

        {/* main layout: 3 cards + radar */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-6">
            {/* Card 1: Languages */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <CardShell className="h-full">
                <div className="p-5 sm:p-6 h-full flex flex-col">
                  <h3 className="text-sm font-bold text-white mb-5">Languages</h3>
                  <div className="space-y-4 flex-1">
                    {languages.map((lang, i) => {
                      const Icon = lang.icon;
                      return (
                        <div key={lang.name} className="group">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Icon size={13} style={{ color: lang.color }} className="shrink-0" />
                            <span className="text-[12.5px] text-white/80 font-medium flex-1">{lang.name}</span>
                            <span className="text-[10.5px] font-mono text-white/40">{lang.level}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundImage: `linear-gradient(90deg, ${lang.color}, #A855F7)` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardShell>
            </motion.div>

            {/* Card 2: Frameworks & Platforms */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <CardShell className="h-full">
                <div className="p-5 sm:p-6 h-full flex flex-col">
                  <h3 className="text-sm font-bold text-white mb-5">Frameworks &amp; Platforms</h3>
                  <div className="space-y-2.5 flex-1">
                    {frameworks.map((fw) => {
                      const Icon = fw.icon;
                      return (
                        <div
                          key={fw.name}
                          className="group flex items-center gap-3 rounded-xl px-2.5 py-2 -mx-2.5 border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all"
                        >
                          <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${fw.color}1A` }}>
                            <Icon size={15} style={{ color: fw.color }} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-medium text-white/85 truncate">{fw.name}</span>
                              <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-mono text-white/40 border border-white/10">{fw.version}</span>
                            </div>
                            <p className="text-[10.5px] text-white/40 truncate">{fw.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardShell>
            </motion.div>

            {/* Card 3: Developer Toolkit */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <CardShell className="h-full">
                <div className="p-5 sm:p-6 h-full flex flex-col">
                  <h3 className="text-sm font-bold text-white mb-5">Developer Toolkit</h3>
                  <div className="flex flex-wrap gap-2 content-start flex-1">
                    {toolkit.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <span
                          key={tool.name}
                          className="group inline-flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-[11px] font-medium text-white/75 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all hover:border-[#22C55E]/40 hover:text-white"
                        >
                          <Icon size={12} className="text-[#3B82F6] shrink-0 group-hover:hidden" />
                          <Check size={12} className="text-[#22C55E] shrink-0 hidden group-hover:block" />
                          {tool.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </CardShell>
            </motion.div>
          </div>

          {/* right: developer radar */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <CardShell className="h-full">
              <div className="p-5 sm:p-6 h-full flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold text-white mb-4 self-start">Developer Radar</h3>
                <div className="relative w-[230px] h-[230px]">
                  {/* rotating outer rings */}
                  <div className="absolute inset-0 rounded-full border border-white/[0.08]" aria-hidden />
                  <div className="absolute inset-[14%] rounded-full border border-white/[0.06] spin-slow" aria-hidden />
                  <div className="absolute inset-[28%] rounded-full blur-xl opacity-40" style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #3B82F6)" }} aria-hidden />

                  {/* connector lines */}
                  <svg viewBox="0 0 230 230" className="absolute inset-0 w-full h-full overflow-visible">
                    {radarNodes.map((_, i) => {
                      const angle = (i / radarNodes.length) * 2 * Math.PI - Math.PI / 2;
                      const cx = 115 + 100 * Math.cos(angle);
                      const cy = 115 + 100 * Math.sin(angle);
                      return (
                        <motion.line
                          key={i}
                          x1="115"
                          y1="115"
                          x2={cx}
                          y2={cy}
                          stroke="url(#radarGradient)"
                          strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.5 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                        />
                      );
                    })}
                    <defs>
                      <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* center label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-center text-[9px] font-bold font-mono text-white border border-white/20 backdrop-blur-md shadow-lg"
                      style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #3B82F6)" }}
                    >
                      FULL
                      <br />
                      STACK
                    </div>
                  </div>

                  {/* nodes */}
                  {radarNodes.map((node, i) => {
                    const angle = (i / radarNodes.length) * 2 * Math.PI - Math.PI / 2;
                    const left = 50 + 43.5 * Math.cos(angle);
                    const top = 50 + 43.5 * Math.sin(angle);
                    return (
                      <motion.div
                        key={node}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 float-badge"
                        style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${i * 0.3}s` }}
                      >
                        <div className="px-2 py-1 rounded-full text-[9px] font-mono font-medium text-white/85 border border-white/15 whitespace-nowrap backdrop-blur-md shadow" style={{ backgroundColor: "rgba(16,24,39,0.9)" }}>
                          {node}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardShell>
          </motion.div>
        </div>

        {/* development workflow timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 sm:mb-14">
          <CardShell>
            <div className="p-6 sm:p-8">
              <h3 className="text-sm font-bold text-white mb-7">Development Workflow</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 sm:gap-2">
                {workflow.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="flex sm:flex-col items-center gap-4 sm:gap-3 flex-1 relative">
                      <div className="flex sm:flex-col items-center gap-4 sm:gap-3 w-full">
                        <div
                          className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border relative"
                          style={{ backgroundColor: "rgba(124,58,237,0.12)", borderColor: "rgba(168,85,247,0.35)" }}
                        >
                          <div className="absolute inset-0 rounded-2xl blur-md opacity-40" style={{ backgroundColor: "#7C3AED" }} aria-hidden />
                          <Icon size={18} className="relative text-[#A855F7]" />
                        </div>
                        <span className="text-[12px] font-medium text-white/80 text-center sm:text-center whitespace-nowrap">
                          {step.label}
                        </span>
                      </div>
                      {i < workflow.length - 1 && (
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

        {/* bottom statistics */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {bottomStats.map((s) => (
            <CardShell key={s.label}>
              <div className="p-5 sm:p-6 text-center">
                <p className="text-2xl sm:text-3xl font-bold font-mono bg-clip-text text-transparent mb-1" style={{ backgroundImage: "linear-gradient(90deg, #A855F7, #3B82F6)" }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-white/45 text-[11px] sm:text-xs">{s.label}</p>
              </div>
            </CardShell>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
