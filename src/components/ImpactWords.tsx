import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Pause, Play, Sparkles } from 'lucide-react';
import { IMPACT_STATEMENTS } from '../data/experienceData';

interface ImpactWordsProps {
  onContinue: () => void;
}

export default function ImpactWords({ onContinue }: ImpactWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      if (currentIndex < IMPACT_STATEMENTS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setHasCompletedCycle(true);
      }
    }, 4200);

    return () => clearTimeout(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    if (currentIndex < IMPACT_STATEMENTS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setHasCompletedCycle(true);
      onContinue();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentStatement = IMPACT_STATEMENTS[currentIndex];

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        {/* Subtle Section Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-amber-500/20 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold mb-2 sm:mb-3"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>DECLARATION OF IMPACT • {currentIndex + 1} OF {IMPACT_STATEMENTS.length}</span>
        </motion.div>

        {/* 3D Folding Stage - Sized for Screen */}
        <div className="relative h-36 sm:h-44 flex items-center justify-center perspective-[1200px] overflow-hidden my-2 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                rotateX: -60,
                y: 25,
                filter: 'blur(6px)',
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                rotateX: 0,
                y: 0,
                filter: 'blur(0px)',
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotateX: 60,
                y: -25,
                filter: 'blur(6px)',
                scale: 0.94,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full px-2"
            >
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wider gold-glow leading-snug break-words">
                {currentStatement}
              </h2>
              <p className="font-playfair text-xs sm:text-sm md:text-base text-amber-200/90 italic mt-1.5 sm:mt-2 font-light max-w-lg mx-auto">
                A vessel of honor, igniting passion and divine purpose in the next generation.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicator pips */}
        <div className="flex items-center justify-center gap-1.5 my-2">
          {IMPACT_STATEMENTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 bg-amber-400 shadow-md shadow-amber-400/50'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to statement ${idx + 1}`}
            />
          ))}
        </div>

        {/* Carousel controls bar */}
        <div className="flex items-center justify-center gap-3 my-2 text-slate-400">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-full glass-panel border border-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            title="Previous impact statement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title={isAutoPlaying ? 'Pause rotation' : 'Resume auto-play'}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span>Auto-Playing</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-amber-400" />
                <span>Paused</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-full glass-panel border border-white/10 hover:text-white cursor-pointer transition-colors"
            title="Next impact statement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Final proceed trigger */}
        <div className="pt-2 sm:pt-3">
          <button
            id="continue-to-discovery-btn"
            onClick={onContinue}
            className={`group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-cinzel font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-lg cursor-pointer ${
              hasCompletedCycle || currentIndex === IMPACT_STATEMENTS.length - 1
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black shadow-amber-500/30 hover:from-amber-400 hover:to-amber-300 hover:scale-105'
                : 'glass-panel border border-amber-400/40 text-amber-200 hover:bg-amber-400/20 hover:text-white'
            }`}
          >
            <span>DISCOVER THE 4 FOUNDATIONAL PILLARS</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
