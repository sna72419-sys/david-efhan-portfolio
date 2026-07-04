import { profile } from "@/lib/data";
import { Mail, Phone, MapPin } from "lucide-react";

function GithubIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.19 1.78 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-border-dim">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3 sm:gap-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber">
            // contact
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-3">
              connect()
            </h2>
            <p className="text-muted mb-6 sm:mb-10 max-w-lg">
              Open to full-stack web and Android development opportunities.
              Send a message and I&apos;ll get back to you.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-border-dim bg-surface hover:border-accent-cyan/50 transition-colors group"
              >
                <Mail
                  size={18}
                  className="text-accent-cyan shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted font-mono">email</p>
                  <p className="text-sm font-mono truncate group-hover:text-accent-cyan transition-colors">
                    {profile.email}
                  </p>
                </div>
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border-dim bg-surface hover:border-accent-cyan/50 transition-colors group"
              >
                <GithubIcon size={18} className="text-accent-cyan shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted font-mono">github</p>
                  <p className="text-sm font-mono truncate group-hover:text-accent-cyan transition-colors">
                    {profile.github}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 p-4 rounded-lg border border-border-dim bg-surface hover:border-accent-cyan/50 transition-colors group"
              >
                <Phone size={18} className="text-accent-cyan shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted font-mono">phone</p>
                  <p className="text-sm font-mono truncate group-hover:text-accent-cyan transition-colors">
                    {profile.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-lg border border-border-dim bg-surface">
                <MapPin size={18} className="text-accent-cyan shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted font-mono">location</p>
                  <p className="text-sm font-mono truncate">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
