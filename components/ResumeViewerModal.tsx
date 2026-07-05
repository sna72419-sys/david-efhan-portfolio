"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2 } from "lucide-react";

export default function ResumeViewerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || renderedRef.current) return;
    renderedRef.current = true;
    setLoading(true);
    setError(false);

    let cancelled = false;

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

        const loadingTask = pdfjsLib.getDocument({ url: "/resume.pdf" });
        const pdf = await loadingTask.promise;
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const containerWidth = containerRef.current.clientWidth || 700;
          const baseViewport = page.getViewport({ scale: 1 });
          const pixelRatio = window.devicePixelRatio || 1;
          const scale = (containerWidth / baseViewport.width) * pixelRatio * 2.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.marginBottom = "12px";
          canvas.style.borderRadius = "8px";
          canvas.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";

          const context = canvas.getContext("2d");
          if (!context) continue;
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";

          if (cancelled || !containerRef.current) return;
          containerRef.current.appendChild(canvas);

          await page.render({ canvasContext: context, viewport, canvas }).promise;
        }

        if (!cancelled) setLoading(false);
      } catch (err) {
        console.error("Failed to render resume PDF:", err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // allow re-render if modal is closed and reopened after an error
  useEffect(() => {
    if (!isOpen) renderedRef.current = false;
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          style={{ backgroundColor: "rgba(3,5,10,0.85)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl h-[88vh] rounded-2xl overflow-hidden border border-foreground/10 flex flex-col"
            style={{ backgroundColor: "var(--page-bg)" }}
          >
            {/* top bar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-foreground/10 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]/70 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]/70 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70 shrink-0" />
                <span className="ml-2 text-xs font-mono text-foreground/40 truncate">resume.pdf</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-foreground/80 border border-foreground/10 hover:border-foreground/25 hover:text-foreground transition-colors"
                >
                  <Download size={13} /> Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* pdf viewer */}
            <div className="relative flex-1 overflow-y-auto p-3 sm:p-5" style={{ backgroundColor: "var(--surface-2)" }}>
              {loading && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/40">
                  <Loader2 size={24} className="animate-spin" />
                  <span className="text-xs font-mono">Loading resume...</span>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/50 px-6 text-center">
                  <span className="text-sm">Couldn&apos;t load the preview.</span>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium text-foreground border border-foreground/15 hover:border-foreground/30 transition-colors"
                  >
                    <Download size={13} /> Download instead
                  </a>
                </div>
              )}
              <div ref={containerRef} className="max-w-2xl mx-auto" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
