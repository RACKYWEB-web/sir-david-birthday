import { motion } from 'motion/react';
import { Flame, ShieldCheck, Users, ChevronRight, Crown } from 'lucide-react';
import { CELEBRANT_INFO } from '../data/experienceData';

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
        className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Crown Crest - Compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mb-2 sm:mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-b from-amber-400/20 via-orange-500/10 to-transparent border border-amber-400/40 shadow-lg relative"
        >
          <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
          <div className="absolute inset-0 rounded-full animate-ping bg-amber-400/10 pointer-events-none" />
        </motion.div>

        {/* 1. Name Reveal */}
        <div className="space-y-1 mb-2 sm:mb-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-amber-400/80"
          >
            IN HONOR OF
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wide gold-glow leading-tight"
          >
            {CELEBRANT_INFO.name.toUpperCase()}
          </motion.h1>
        </div>

        {/* 2. Identity Triplets */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-2 sm:my-3"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 px-4 sm:px-6 py-2 rounded-xl glass-gold-panel border border-amber-500/30 text-xs sm:text-base font-cinzel text-amber-200 font-semibold tracking-wider">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              Pastor
            </span>
            <span className="text-amber-500">•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              Mentor
            </span>
            <span className="text-amber-500">•</span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              Youth Convener
            </span>
          </div>
        </motion.div>

        {/* 3. Organization Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="my-2 sm:my-3 flex flex-col items-center gap-1"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-400">
            MINISTRY & COMMUNION
          </p>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-orange-500/30 text-amber-300/90 font-cinzel tracking-widest text-xs sm:text-sm font-bold">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>{CELEBRANT_INFO.organization}</span>
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Progression trigger */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="pt-2 sm:pt-3"
        >
          <button
            id="continue-to-hero-btn"
            onClick={onContinue}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-bold text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>REVEAL THE HERO'S HEART</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
