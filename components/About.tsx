import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-border-dim">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">
            // about
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-6">
              summary.txt
            </h2>
            <p className="text-muted leading-relaxed text-base sm:text-lg max-w-2xl">
              {profile.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
