"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "stack" },
  { href: "#experience", label: "log" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-dim bg-background/80 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono font-bold text-sm shrink-0"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent-cyan">&gt;</span>{" "}
          {profile.name.split(" ")[0]}
          <span className="cursor-blink text-accent-cyan">_</span>
        </a>

        {/* desktop links */}
        <ul className="hidden sm:flex items-center gap-6 font-mono text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-accent-cyan transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle />

          {/* mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="sm:hidden p-2 -mr-2 text-muted hover:text-accent-cyan transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <ul className="sm:hidden border-t border-border-dim bg-background font-mono text-sm">
          {links.map((l) => (
            <li key={l.href} className="border-b border-border-dim last:border-b-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-3.5 text-muted hover:text-accent-cyan hover:bg-surface transition-colors"
              >
                <span className="text-accent-cyan">$</span> {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
