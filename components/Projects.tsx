"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import TiltCard from "@/components/TiltCard";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingCart,
  ScanLine,
  Package,
  FileText,
  Cloud,
  Smartphone,
  Server,
  Globe,
  Check,
  Code2,
} from "lucide-react";

function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const featureIcons = [ShoppingCart, ScanLine, Package, FileText, Cloud];

const projectMeta: Record<string, { icon: typeof Smartphone; color: string; glow: string }> = {
  "pos-management": { icon: Smartphone, color: "#22C55E", glow: "rgba(34,197,94,0.35)" },
  "easy-inventory-manager": { icon: Server, color: "#A855F7", glow: "rgba(168,85,247,0.35)" },
  "missioncare-hub": { icon: Globe, color: "#3B82F6", glow: "rgba(59,130,246,0.35)" },
};

const infoBadges = [
  "Real-world Solutions",
  "Performance Focused",
  "Clean Code",
  "User-first Approach",
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-16 sm:py-28 border-t border-white/[0.08] overflow-hidden"
      style={{ backgroundColor: "#080B14" }}
    >
      {/* ambient glow decorations */}
      <div
        className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ background: "#7C3AED" }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 -right-40 w-[380px] h-[380px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: "#3B82F6" }}
        aria-hidden
      />
      {/* grid pattern */}
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >            <h2 className="relative inline-block text-3xl sm:text-5xl font-bold tracking-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #A855F7)" }}
              >
                printed_receipts
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
            <p className="text-muted mt-5 max-w-md text-sm sm:text-base">
              Selected work — printed like the systems they run.
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            href="https://github.com/sna72419-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-sm font-medium text-white/90 hover:border-[#A855F7]/50 hover:bg-white/[0.06] transition-all"
          >
            View All Projects
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((p, idx) => {
            const meta = projectMeta[p.id] ?? { icon: Code2, color: "#3B82F6", glow: "rgba(59,130,246,0.35)" };
            const Icon = meta.icon;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <TiltCard
                  intensity={5}
                  className="group relative rounded-[24px] p-[1px] transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 40%, ${meta.glow} 120%)`,
                  }}
                >
                <div
                  className="relative h-full rounded-[23px] p-6 flex flex-col overflow-hidden backdrop-blur-xl transition-shadow duration-300 group-hover:shadow-2xl"
                  style={{
                    backgroundColor: "#101827",
                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                  }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ background: meta.color }}
                    aria-hidden
                  />

                  {/* top row */}
                  <div className="relative flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-white"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: `0 0 20px ${meta.glow}`,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-12"
                      style={{ backgroundColor: `${meta.color}1A` }}
                    >
                      <Icon size={19} style={{ color: meta.color }} />
                    </div>
                  </div>

                  {/* title block */}
                  <div className="relative text-center pb-4 mb-4 border-b border-white/[0.08]">
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/35 mb-1.5">
                      Dev Receipt
                    </p>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <p className="text-[11.5px] text-white/45 mt-1">{p.type}</p>
                  </div>

                  {/* meta row */}
                  <div className="relative flex justify-between text-[11px] font-mono text-white/40 mb-4">
                    <span>No.{p.receiptNo}</span>
                    <span>{p.year}</span>
                  </div>

                  {/* features */}
                  <ul className="relative space-y-2 mb-5">
                    {p.lineItems.slice(0, 5).map((item, i) => {
                      const FIcon = featureIcons[i % featureIcons.length];
                      return (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 -mx-2 transition-colors duration-200 hover:bg-white/[0.04]"
                        >
                          <span
                            className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
                            style={{ backgroundColor: `${meta.color}1A` }}
                          >
                            <FIcon size={12} style={{ color: meta.color }} />
                          </span>
                          <span className="font-mono text-[10px] text-white/30 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[12.5px] text-white/75 leading-snug">{item}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* tech stack pills */}
                  <div className="relative mb-6">
                    <p className="text-[10px] uppercase tracking-widest text-white/35 mb-2 font-mono">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-full text-[10.5px] font-medium text-white/70 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* bottom action */}
                  <div className="relative mt-auto">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white overflow-hidden transition-transform active:scale-[0.98]"
                        style={{ backgroundImage: "linear-gradient(90deg, #7C3AED, #3B82F6)" }}
                      >
                        <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-white/10" />
                        <span className="relative">Visit Live Site</span>
                        <ArrowUpRight size={15} className="relative transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    ) : (
                      <a
                        href="https://github.com/sna72419-sys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white/85 border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06]"
                      >
                        <GithubIcon size={15} />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
                </TiltCard>
              </motion.article>
            );
          })}
        </div>

        {/* bottom info panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-14 sm:mt-16 rounded-[24px] p-[1px]"
          style={{
            backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))",
          }}
        >
          <div
            className="rounded-[23px] p-7 sm:p-10 backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center gap-8"
            style={{ backgroundColor: "#101827" }}
          >
            <div className="flex items-start gap-4 flex-1">
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundImage: "linear-gradient(135deg, #7C3AED, #3B82F6)" }}
              >
                <Code2 size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                  Built to solve real operational problems
                </h3>
                <p className="text-white/50 text-sm max-w-md">
                  Every project here runs (or ran) in a real environment —
                  cashiers, inventory staff, and outreach volunteers, not just
                  demo data.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full lg:w-auto shrink-0">
              {infoBadges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11.5px] sm:text-xs font-medium text-white/75 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all hover:border-[#22C55E]/40 hover:text-white"
                >
                  <Check size={12} className="text-[#22C55E] shrink-0" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
