import { motion } from 'motion/react';
import { Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { CELEBRANT_INFO } from '../data/experienceData';

interface CongratulationsSectionProps {
  onContinue: () => void;
}

export default function CongratulationsSection({ onContinue }: CongratulationsSectionProps) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-widest uppercase mb-2 sm:mb-3"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{CELEBRANT_INFO.dateFormatted}</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </motion.div>

        {/* Big Date Display Card - Sleek & Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative my-1 sm:my-2 px-6 py-2.5 sm:py-3.5 rounded-2xl glass-panel border border-amber-500/20 shadow-xl"
        >
          <div className="text-5xl sm:text-6xl md:text-7xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 tracking-tight gold-glow leading-none">
            27
          </div>
          <div className="text-xs sm:text-sm font-cinzel tracking-[0.3em] uppercase text-amber-200/90 font-semibold mt-1">
            SEPTEMBER
          </div>
        </motion.div>

        {/* Title Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-0.5 sm:space-y-1 my-2 sm:my-3"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">
            AN APPOINTED SEASON OF HONOR
          </p>
          <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider">
            CONGRATULATIONS
          </h1>
          <h2 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold text-amber-400 gold-glow tracking-widest">
            DAVID.
          </h2>
        </motion.div>

        {/* Emotional Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="max-w-lg mx-auto my-2 sm:my-3 px-3"
        >
          <p className="font-playfair text-sm sm:text-lg md:text-xl text-slate-200/95 italic leading-relaxed font-light">
            “Today, we celebrate more than a birthday. We celebrate a life that continues to make a difference.”
          </p>
        </motion.div>

        {/* Action button to proceed */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="pt-2 sm:pt-3"
        >
          <button
            id="continue-to-identity-btn"
            onClick={onContinue}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/50 text-amber-200 font-cinzel text-xs sm:text-sm tracking-wider hover:bg-amber-400/30 hover:border-amber-400 hover:text-white transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>DISCOVER THE CELEBRANT</span>
            <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
