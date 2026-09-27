import { motion } from 'motion/react';
import { Flame, ChevronRight, Crown } from 'lucide-react';
import { CELEBRANT_INFO } from '../data/experienceData';
import CelebrantHeroCard from './CelebrantHeroCard';

interface IdentityRevealProps {
  onContinue: () => void;
}

export default function IdentityReveal({ onContinue }: IdentityRevealProps) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-amber-400/80"
        >
          IN HONOR OF OUR BELOVED PASTOR
        </motion.p>

        {/* Celebrant Hero Portrait Card - Bold, Large & Unmistakable */}
        <CelebrantHeroCard />

        {/* Roles Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-1.5 sm:my-2 flex flex-col items-center gap-1.5 w-full max-w-xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
            {/* Ministry 1: Quiver Nation */}
            <div className="w-full sm:w-auto flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-gold-panel border border-amber-400/40 shadow-sm text-left">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
                <Crown className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-amber-400/90 font-semibold leading-none mb-0.5">
                  FOUNDER
                </div>
                <div className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider leading-tight">
                  QUIVER NATION
                </div>
              </div>
            </div>

            {/* Ministry 2: Campus Fire Fellowship */}
            <div className="w-full sm:w-auto flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-panel border border-orange-500/30 shadow-sm text-left">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400 shrink-0">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest text-orange-300/90 font-semibold leading-none mb-0.5">
                  YOUTH CONVENER & PASTOR
                </div>
                <div className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider leading-tight">
                  CAMPUS FIRE FELLOWSHIP
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic text-center">
            Celebrated with deep devotion by the members and youths of Campus Fire Fellowship.
          </p>
        </motion.div>

        {/* Progression trigger */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="pt-1.5 sm:pt-2"
        >
          <button
            id="continue-to-hero-btn"
            onClick={onContinue}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-bold text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>REVEAL THE HERO'S HEART</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
