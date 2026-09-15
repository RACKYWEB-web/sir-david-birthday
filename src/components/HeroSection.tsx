import { motion } from 'motion/react';
import { Sparkles, ChevronRight, Compass, Heart, Mic, Users, Target } from 'lucide-react';

interface HeroSectionProps {
  onContinue: () => void;
}

export default function HeroSection({ onContinue }: HeroSectionProps) {
  const heroTraits = [
    { icon: Target, label: 'Passionate Leader', desc: 'Guiding youths with clarity, conviction, and fearless courage.' },
    { icon: Users, label: 'Dedicated Mentor', desc: 'Investing in raw potential and molding it into divine destiny.' },
    { icon: Mic, label: 'Resolute Voice', desc: 'Speaking truth that shatters apathy and awakens purpose.' },
    { icon: Compass, label: 'Youth Convener', desc: 'Mobilizing an army of purposeful young minds for kingdom impact.' },
    { icon: Sparkles, label: 'Man of Purpose', desc: 'Refusing trivial distractions to pursue eternal significance.' },
    { icon: Heart, label: 'Heart for Souls', desc: 'Bearing the prayers, dreams, and futures of countless youths.' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Intro words */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] sm:text-xs font-semibold uppercase text-amber-400 mb-1 tracking-[0.35em]"
        >
          AND TODAY...
        </motion.p>

        {/* Dramatic Reveal Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wider mb-1 sm:mb-2 gold-glow leading-tight"
        >
          A HERO IS BORN.
        </motion.h1>

        {/* Inspirational Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed mb-3 sm:mb-4 px-2"
        >
          True heroes are not recognized by capes, but by the lives they illuminate. Today we salute an unrelenting beacon of hope.
        </motion.p>

        {/* Dynamic Trait Grid / Showcase - Compact Sizing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 w-full mb-3 sm:mb-4 text-left"
        >
          {heroTraits.map((trait, index) => {
            const Icon = trait.icon;
            return (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.08 }}
                className="p-2 sm:p-3 rounded-xl glass-panel border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 shadow-md group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-cinzel text-[11px] sm:text-xs font-bold text-white tracking-wide truncate">
                    {trait.label}
                  </h3>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 leading-tight line-clamp-2">
                  {trait.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="pt-1"
        >
          <button
            id="continue-to-impact-btn"
            onClick={onContinue}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-bold text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>HEAR WORDS OF IMPACT</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
