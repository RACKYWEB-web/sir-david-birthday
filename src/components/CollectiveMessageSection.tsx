import { motion } from 'motion/react';
import { Flame, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { COLLECTIVE_MESSAGE } from '../data/experienceData';

interface CollectiveMessageSectionProps {
  onContinueToFinal: () => void;
}

export default function CollectiveMessageSection({ onContinueToFinal }: CollectiveMessageSectionProps) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      {/* Spiritual fire aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.12),transparent_65%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center justify-center"
      >
        {/* Flame symbol */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-2 sm:mb-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-t from-orange-600/30 to-amber-400/20 border border-amber-400/40 flex items-center justify-center shadow-md shadow-orange-500/20"
        >
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
        </motion.div>

        {/* 1. First Dramatic Header */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-cinzel text-[11px] sm:text-xs md:text-sm font-bold text-amber-300 tracking-[0.25em] uppercase mb-1"
        >
          {COLLECTIVE_MESSAGE.header1}
        </motion.p>

        {/* 2. Second Emotional Climax Header */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-cinzel text-xl sm:text-3xl md:text-4xl font-black text-white tracking-wide gold-glow mb-3 sm:mb-4 leading-tight"
        >
          {COLLECTIVE_MESSAGE.header2}
        </motion.h1>

        {/* Collective Statement Letter Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl glass-gold-panel border border-amber-500/30 shadow-2xl relative overflow-hidden text-left sm:text-center"
        >
          <div className="space-y-2 font-playfair text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed font-light">
            {COLLECTIVE_MESSAGE.lines.map((line, index) => {
              const isHighlight =
                line.includes('Happy Birthday') ||
                line.includes('May your fire never go out') ||
                line.includes('Thank you for being you');

              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className={`${
                    isHighlight
                      ? 'font-cinzel font-bold text-amber-300 gold-glow pt-1 text-sm sm:text-lg'
                      : 'text-slate-200/95'
                  }`}
                >
                  {line}
                </motion.p>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-300/80 font-cinzel">
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
            <span>UNITED IN FAITH & GRATITUDE</span>
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
          </div>
        </motion.div>

        {/* Progression to Finale */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="mt-4 sm:mt-5"
        >
          <button
            id="proceed-to-final-message-btn"
            onClick={onContinueToFinal}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-black text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer text-center"
          >
            <Sparkles className="w-4 h-4 text-black shrink-0" />
            <span>THE SACRED BLESSING</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
