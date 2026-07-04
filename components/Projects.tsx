import { projects } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-border-dim">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">
            // projects
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-2">
              printed_receipts
            </h2>
            <p className="text-muted mb-6 sm:mb-10">
              Selected work — printed like the systems they run.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((p) => (
                <article
                  key={p.id}
                  className="bg-[#F4F1E8] text-[#1a1a1a] rounded-sm shadow-lg shadow-black/30 flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform"
                >
                  {/* torn top edge */}
                  <div className="h-2 bg-[#F4F1E8] receipt-edge" aria-hidden />

                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2 font-mono flex-1 flex flex-col">
                    <div className="text-center border-b border-dashed border-[#1a1a1a]/30 pb-3 mb-3">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]/60">
                        Dev Receipt
                      </p>
                      <h3 className="text-base sm:text-lg font-bold mt-1">{p.title}</h3>
                      <p className="text-[11px] text-[#1a1a1a]/60 mt-0.5">
                        {p.type}
                      </p>
                    </div>

                    <div className="flex justify-between text-[11px] text-[#1a1a1a]/60 mb-3">
                      <span>No. {p.receiptNo}</span>
                      <span>{p.year}</span>
                    </div>

                    <ul className="text-[12.5px] sm:text-[13px] space-y-1.5 mb-4 flex-1">
                      {p.lineItems.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#1a1a1a]/50 shrink-0">{`0${i + 1}`}</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-dashed border-[#1a1a1a]/30 pt-3">
                      <p className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 mb-1.5">
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
                        {p.stack.map((s) => (
                          <span key={s}>#{s.replace(/\s+/g, "")}</span>
                        ))}
                      </div>
                    </div>

                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider bg-[#1a1a1a] text-[#F4F1E8] py-2 rounded-sm hover:bg-[#1a1a1a]/85 transition"
                      >
                        Visit live site <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  {/* torn bottom edge */}
                  <div className="h-2 bg-[#F4F1E8] receipt-edge" aria-hidden />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
