"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

export default function ResumeViewerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
            className="relative w-full max-w-3xl h-[88vh] rounded-2xl overflow-hidden border border-white/10 flex flex-col"
            style={{ backgroundColor: "#0B0E14" }}
          >
            {/* top bar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F87171]/70 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]/70 shrink-0" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]/70 shrink-0" />
                <span className="ml-2 text-xs font-mono text-white/40 truncate">resume.pdf</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white/80 border border-white/10 hover:border-white/25 hover:text-white transition-colors"
                >
                  <Download size={13} /> Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* pdf viewer */}
            <div className="flex-1 bg-[#1a1d24]">
              <iframe
                src="/resume.pdf#toolbar=0"
                title="David N. Efhan — Resume"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
