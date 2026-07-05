"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Rocket,
  Code2,
  Smartphone,
  Handshake,
} from "lucide-react";

function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const endpoints = [
  { key: "email", label: "Email", value: profile.email, icon: Mail, href: `mailto:${profile.email}`, color: "#3B82F6" },
  { key: "github", label: "GitHub", value: profile.github, icon: GithubIcon, href: profile.githubUrl, color: "#A855F7" },
  { key: "phone", label: "Phone", value: profile.phone, icon: Phone, href: `tel:${profile.phone.replace(/\s+/g, "")}`, color: "#22C55E" },
  { key: "location", label: "Location", value: profile.location, icon: MapPin, href: null, color: "#F59E0B" },
];

const availability = [
  { icon: Rocket, title: "Open to Work", desc: "Actively seeking full-time roles", color: "#22C55E" },
  { icon: Code2, title: "Full Stack Development", desc: "Web apps end to end", color: "#3B82F6" },
  { icon: Smartphone, title: "Android Development", desc: "Native mobile apps", color: "#A855F7" },
  { icon: Handshake, title: "Freelance & Collaboration", desc: "Open to short-term projects", color: "#F59E0B" },
];

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[24px] p-[1px] ${className}`}
      style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}
    >
      <div className="rounded-[23px] h-full backdrop-blur-xl" style={{ backgroundColor: "var(--card-bg)" }}>
        {children}
      </div>
    </div>
  );
}

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // clipboard unavailable, ignore silently
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-28 border-t border-foreground/[0.08] overflow-hidden"
      style={{ backgroundColor: "var(--page-bg)" }}
    >
      {/* ambient glow */}
      <div className="absolute top-0 left-1/4 w-[380px] h-[380px] rounded-full blur-[130px] opacity-20 pointer-events-none" style={{ background: "#7C3AED" }} aria-hidden />
      <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full blur-[130px] opacity-20 pointer-events-none" style={{ background: "#3B82F6" }} aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(var(--fg-rgb),0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--fg-rgb),0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      {/* floating code symbols */}
      {["</>", "{ }", "=>", "#"].map((sym, i) => (
        <span
          key={sym}
          className="absolute font-mono text-foreground/[0.05] text-4xl sm:text-5xl font-bold pointer-events-none float-badge select-none"
          style={{
            top: `${15 + i * 20}%`,
            left: i % 2 === 0 ? "4%" : "auto",
            right: i % 2 !== 0 ? "5%" : "auto",
            animationDelay: `${i * 0.7}s`,
          }}
          aria-hidden
        >
          {sym}
        </span>
      ))}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 sm:mb-20">          <h2 className="relative inline-block text-3xl sm:text-5xl font-bold font-mono tracking-tight">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #ffffff, #A855F7)" }}>
              connect()
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
            Open to Full Stack Web and Android development opportunities.
            Let&apos;s build something amazing together.
          </p>
        </motion.div>

        {/* developer endpoint card */}
        <div className="mb-10 sm:mb-14 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <CardShell>
              <div className="p-6 sm:p-8">
                <h3 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                  Developer Endpoint
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {endpoints.map((ep) => {
                    const Icon = ep.icon;
                    const isCopied = copiedKey === ep.key;
                    return (
                      <div
                        key={ep.key}
                        className="group relative flex items-center gap-3 rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] px-4 py-3 transition-all hover:border-foreground/20"
                      >
                        <span
                          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
                          style={{ backgroundColor: `${ep.color}1A` }}
                        >
                          <Icon size={17} style={{ color: ep.color }} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] uppercase tracking-widest text-foreground/35 font-mono">{ep.label}</p>
                          {ep.href ? (
                            <a href={ep.href} target={ep.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[13px] text-foreground/85 hover:text-foreground transition-colors truncate block">
                              {ep.value}
                            </a>
                          ) : (
                            <p className="text-[13px] text-foreground/85 truncate">{ep.value}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(ep.key, ep.value)}
                          aria-label={`Copy ${ep.label}`}
                          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
                        >
                          {isCopied ? <Check size={14} className="text-[#22C55E]" /> : <Copy size={14} />}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* status card */}
                <div className="mt-5 rounded-xl border border-[#22C55E]/25 bg-[#22C55E]/[0.06] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#22C55E]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
                      </span>
                      AVAILABLE
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-1.5 text-[12px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-foreground/45">Response Time</span>
                      <span className="text-foreground/80">Within 24 Hours</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-foreground/45">Preferred Role</span>
                      <span className="text-foreground/80">Full Stack Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardShell>
          </motion.div>
        </div>

        {/* bottom availability panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {availability.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className="group rounded-2xl p-[1px] transition-all" style={{ backgroundImage: "linear-gradient(160deg, rgba(var(--fg-rgb),0.14), rgba(var(--fg-rgb),0.02))" }}>
                <div className="relative rounded-[15px] p-5 h-full backdrop-blur-xl overflow-hidden" style={{ backgroundColor: "var(--card-bg)" }}>
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ background: a.color }} aria-hidden />
                  <span className="relative inline-flex w-10 h-10 rounded-xl items-center justify-center mb-3" style={{ backgroundColor: `${a.color}1A` }}>
                    <Icon size={18} style={{ color: a.color }} />
                  </span>
                  <h4 className="relative text-[13px] font-bold text-foreground mb-1">{a.title}</h4>
                  <p className="relative text-[11.5px] text-foreground/45 leading-snug">{a.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
