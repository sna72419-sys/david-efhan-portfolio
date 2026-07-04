import { experience, education } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-border-dim">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">
            // history
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-6 sm:mb-8">
              commit_log
            </h2>

            <div className="space-y-6 mb-10 sm:mb-14">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-6 border-l border-border-dim"
                >
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-cyan" />
                  <p className="font-mono text-xs text-muted mb-1">
                    {exp.period}
                  </p>
                  <h3 className="text-lg font-bold font-mono">{exp.title}</h3>
                  <p className="text-accent-amber text-sm mb-3 font-mono">
                    {exp.org}
                  </p>
                  <ul className="space-y-1.5 text-muted text-sm">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-accent-cyan shrink-0">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-border-dim">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber mb-4">
                education
              </h3>
              <div className="rounded-lg border border-border-dim bg-surface p-6">
                <p className="font-bold font-mono">{education.degree}</p>
                <p className="text-muted text-sm mt-1">{education.school}</p>
                <p className="text-muted text-sm">{education.location}</p>
                <p className="font-mono text-xs text-accent-cyan mt-2">
                  {education.period}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
