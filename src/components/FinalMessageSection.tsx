import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, HelpCircle, ArrowRight, RotateCcw, X } from 'lucide-react';
import { FINAL_MESSAGE_TEXT, SECRET_SURPRISE_DATA } from '../data/experienceData';
import RackywebFooter from './RackywebFooter';

interface FinalMessageSectionProps {
  onRestart: () => void;
}

export default function FinalMessageSection({ onRestart }: FinalMessageSectionProps) {
  const [showSecretModal, setShowSecretModal] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      {/* Subtle background sacred glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.16),transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl mx-auto relative z-10 px-1 sm:px-2 flex flex-col items-center justify-center flex-1 my-auto"
      >
        {/* Sacred Flame Icon - Compact & Centered */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-1 sm:mb-1.5 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent border border-amber-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.25)] relative"
        >
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          <div className="absolute inset-0 rounded-full animate-ping bg-amber-400/15 pointer-events-none" />
        </motion.div>

        {/* 1. Main Birthday Climax - Screen-fitted typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-cinzel text-lg xs:text-xl sm:text-3xl md:text-4xl font-black text-white tracking-wider mb-0.5 sm:mb-1 gold-glow leading-tight break-words"
        >
          {FINAL_MESSAGE_TEXT.main}
        </motion.h1>

        {/* 2. Eternal Benediction */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-cinzel text-xs xs:text-sm sm:text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 tracking-wide sm:tracking-widest my-0.5 sm:my-1 leading-tight break-words"
        >
          {FINAL_MESSAGE_TEXT.sub}
        </motion.h2>

        {/* Priestly blessing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="my-1 sm:my-1.5 max-w-lg mx-auto px-2"
        >
          <p className="font-playfair text-[11px] sm:text-xs md:text-sm text-slate-300 italic leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
            “{FINAL_MESSAGE_TEXT.blessing}”
          </p>
        </motion.div>

        {/* Secret Surprise Teaser & Action Buttons - Compact & In View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="pt-1 flex flex-wrap items-center justify-center gap-2 w-full"
        >
          <button
            id="open-secret-surprise-btn"
            onClick={() => setShowSecretModal(true)}
            className="group relative inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/35 to-amber-500/25 border border-amber-400/60 text-amber-200 font-cinzel font-bold text-xs tracking-wider hover:bg-amber-400/35 hover:border-amber-300 hover:text-white transition-all duration-300 shadow-md shadow-amber-500/15 hover:scale-105 active:scale-95 cursor-pointer text-center"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin shrink-0" style={{ animationDuration: '6s' }} />
            <span>LAST SECRET SURPRISE</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          <button
            id="replay-experience-btn"
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full glass-panel border border-white/10 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 hover:border-white/25 transition-all cursor-pointer"
            title="Replay this celebration experience"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Replay</span>
          </button>
        </motion.div>

        {/* Special Rackyweb Technologies Signature & Fun Section */}
        <RackywebFooter />
      </motion.div>

      {/* Section 13: Secret Final Surprise Modal */}
      <AnimatePresence>
        {showSecretModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl glass-gold-panel p-5 sm:p-7 md:p-8 border border-amber-400/50 shadow-2xl relative text-left"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setShowSecretModal(false)}
                className="absolute top-3.5 right-3.5 p-2 rounded-full glass-panel border border-white/10 text-slate-400 hover:text-white hover:border-amber-400/40 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-400 font-bold mb-1.5 pr-8">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{SECRET_SURPRISE_DATA.teaser1} {SECRET_SURPRISE_DATA.teaser2}</span>
              </div>

              <h3 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide gold-glow mb-2.5 leading-tight">
                {SECRET_SURPRISE_DATA.title}
              </h3>

              <div className="my-3 space-y-2.5 font-playfair text-slate-100 text-xs sm:text-base leading-relaxed font-light whitespace-pre-line border-l-2 border-amber-400/50 pl-3">
                {SECRET_SURPRISE_DATA.message}
              </div>

              <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  {SECRET_SURPRISE_DATA.signature}
                </p>

                <button
                  onClick={() => setShowSecretModal(false)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-cinzel font-bold tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer shadow-lg shadow-amber-500/20 text-center"
                >
                  Close & Seal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
