import { skills } from "@/lib/data";

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-border-dim">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">
            // stack
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-2">
              system_status
            </h2>
            <p className="text-muted mb-6 sm:mb-8">
              Loaded modules and active tools.
            </p>

            <div className="space-y-8">
              {groups.map(([group, items]) => (
                <div key={group}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(94,234,212,0.8)]" />
                    <h3 className="font-mono text-sm uppercase tracking-wider text-foreground">
                      {group}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-md border border-border-dim bg-surface font-mono text-xs sm:text-sm text-muted hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
