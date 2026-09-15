import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, Star, Flame, ChevronRight } from 'lucide-react';
import { EMOTIONAL_STATEMENTS } from '../data/experienceData';

interface GiftBoxSectionProps {
  onCompleteEmotionalReveal: () => void;
}

export default function GiftBoxSection({ onCompleteEmotionalReveal }: GiftBoxSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [statementIndex, setStatementIndex] = useState(0);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);

  const handleOpenGift = () => {
    if (isOpen || isOpeningAnimation) return;
    setIsOpeningAnimation(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpeningAnimation(false);
    }, 1000);
  };

  // Progression of emotional lines once box is open
  useEffect(() => {
    if (!isOpen) return;

    if (statementIndex < EMOTIONAL_STATEMENTS.length) {
      const timer = setTimeout(() => {
        if (statementIndex + 1 < EMOTIONAL_STATEMENTS.length) {
          setStatementIndex((prev) => prev + 1);
        } else {
          // Finished all 5 emotional statements, wait a moment and trigger the big boom celebration!
          setTimeout(() => {
            onCompleteEmotionalReveal();
          }, 2400);
        }
      }, 3800);

      return () => clearTimeout(timer);
    }
  }, [isOpen, statementIndex, onCompleteEmotionalReveal]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      {!isOpen ? (
        /* The Mysterious Gift Box - Compact */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mx-auto flex flex-col items-center justify-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-amber-500/30 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>THE MYSTERY THRESHOLD</span>
          </div>

          <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-wide gold-glow leading-tight">
            SOMETHING KEPT SACRED
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mb-3 font-light px-2">
            A token prepared from the deepest reverence of Campus Fire Fellowship.
          </p>

          {/* Sculpted Gift Box Container */}
          <div className="relative my-2 sm:my-3 flex items-center justify-center">
            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-amber-400/20 animate-ping opacity-25 pointer-events-none" />
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-amber-500/30 animate-pulse pointer-events-none" />

            <motion.button
              id="unhide-gift-box-btn"
              onClick={handleOpenGift}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer focus:outline-none flex flex-col items-center"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-amber-500/30 via-slate-900 to-black p-1 border-2 border-amber-400/60 shadow-[0_0_35px_rgba(245,158,11,0.35)] flex items-center justify-center transition-all duration-300 group-hover:border-amber-300 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]">
                <div className="absolute inset-x-0 h-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-sm opacity-90" />
                <div className="absolute inset-y-0 w-6 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 shadow-sm opacity-90" />

                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center shadow-xl border border-white/40">
                  <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 animate-bounce" />
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-black tracking-wider text-xs shadow-lg shadow-amber-500/25">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>TAP TO UNHIDE SOMETHING</span>
                <Sparkles className="w-3.5 h-3.5 text-black" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* Section 8: Emotional Reveal - Screen Fitted */
        <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-6 h-6 rounded-full border border-amber-400/30 flex items-center justify-center animate-pulse">
              <Heart className="w-3.5 h-3.5 text-amber-400/60 stroke-[1.5]" />
            </div>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <div className="w-7 h-7 rounded-full border border-amber-300/40 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            <div className="w-6 h-6 rounded-full border border-amber-400/30 flex items-center justify-center animate-pulse">
              <Star className="w-3.5 h-3.5 text-amber-400/60 stroke-[1.5]" />
            </div>
          </div>

          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-2 font-semibold">
            THE UNSEEN IMPACT • STATEMENT {statementIndex + 1} OF {EMOTIONAL_STATEMENTS.length}
          </p>

          <div className="relative h-28 sm:h-36 flex items-center justify-center my-2 overflow-hidden px-2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={statementIndex}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.96,
                  filter: 'blur(6px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 1.04,
                  filter: 'blur(6px)',
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-xl mx-auto"
              >
                <h3 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide leading-snug gold-glow break-words">
                  {EMOTIONAL_STATEMENTS[statementIndex]}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 my-2">
            {EMOTIONAL_STATEMENTS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === statementIndex
                    ? 'w-6 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    : i < statementIndex
                    ? 'w-2 bg-amber-500/40'
                    : 'w-2 bg-slate-700/40'
                }`}
              />
            ))}
          </div>

          {/* Skip / Next */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (statementIndex < EMOTIONAL_STATEMENTS.length - 1) {
                  setStatementIndex((prev) => prev + 1);
                } else {
                  onCompleteEmotionalReveal();
                }
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full glass-panel border border-amber-500/25 text-[11px] sm:text-xs uppercase tracking-wider text-amber-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
            >
              <span>{statementIndex === EMOTIONAL_STATEMENTS.length - 1 ? 'TRIGGER CELEBRATION' : 'NEXT STATEMENT'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
