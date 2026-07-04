import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border-dim py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js.</p>
        <p className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(94,234,212,0.9)]" />
          system online
        </p>
      </div>
    </footer>
  );
}
