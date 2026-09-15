import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ChevronRight, Cake, PartyPopper, Flame } from 'lucide-react';

interface CelebrationBoomProps {
  onContinueToTributes: () => void;
}

export default function CelebrationBoom({ onContinueToTributes }: CelebrationBoomProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [boomCount, setBoomCount] = useState(1);

  // Emojis requested specifically in prompt
  const emojis = [
    '💗', '💖', '💜', '💙', '💛', '💚', '🩷', '💕', '💞', '✨',
    '🌸', '🎀', '🦋', '⭐', '💫', '🌟', '❤️', '💝', '🥳', '🎉',
    '🎊', '💐', '🌷', '🫶', '💎'
  ];

  const triggerFunBoom = () => {
    setBoomCount((prev) => prev + 1);

    // Multi-angle confetti cannon bursts
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#ffd700', '#ff69b4', '#00ffff', '#ff4500', '#a855f7'],
    });

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { x: 0.8, y: 0.6 },
      colors: ['#ffd700', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'],
    });

    confetti({
      particleCount: 120,
      spread: 120,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#ffffff', '#ffd700', '#f43f5e', '#6366f1'],
    });
  };

  useEffect(() => {
    // 1. Trigger initial high-energy confetti blasts
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Central starburst at 0.8 second
    const timeoutId = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ff69b4', '#ff4500', '#00ffff', '#ffffff'],
      });
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto"
    >
      {/* Floating emoji celebration layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {emojis.map((emoji, index) => {
          const randomDuration = 7 + (index % 5) * 2;
          const randomDelay = (index % 8) * 0.8;
          const leftPercent = 3 + (index * 4) % 94;

          return (
            <motion.div
              key={index}
              initial={{ y: '105vh', opacity: 0, scale: 0.7 }}
              animate={{
                y: '-15vh',
                opacity: [0, 0.9, 0.9, 0],
                scale: [0.7, 1.1, 1, 0.8],
                x: [0, (index % 2 === 0 ? 30 : -30), 0],
              }}
              transition={{
                duration: randomDuration,
                delay: randomDelay,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ left: `${leftPercent}%` }}
              className="absolute text-xl sm:text-2xl select-none"
            >
              {emoji}
            </motion.div>
          );
        })}
      </div>

      {/* Main Payoff Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center"
      >
        {/* Celebration Badges */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-gold-panel border border-amber-400/50 text-amber-300 font-cinzel text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 shadow-md"
        >
          <PartyPopper className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>SEPTEMBER 27 • THE CELEBRATION IS UNLEASHED</span>
          <Cake className="w-3.5 h-3.5 text-amber-400" />
        </motion.div>

        {/* Dramatic Birthday Typography */}
        <div className="space-y-0.5 sm:space-y-1 mb-1 sm:mb-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-cinzel text-lg sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 tracking-wider gold-glow"
          >
            HAPPY BIRTHDAY
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_6px_20px_rgba(245,158,11,0.4)]"
          >
            SIBIGAM DAVID
          </motion.h1>
        </div>

        {/* From Organization */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="my-1 sm:my-2"
        >
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-300/80 font-bold mb-0.5">
            HONORED WITH ALL OUR HEARTS
          </p>
          <div className="inline-block text-xs sm:text-base font-cinzel font-bold text-slate-100 tracking-widest border-b border-amber-400/30 pb-0.5">
            FROM CAMPUS FIRE FELLOWSHIP
          </div>
        </motion.div>

        {/* Final Congratulations Roar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="my-1 sm:my-2"
        >
          <h3 className="font-cinzel text-base sm:text-xl font-extrabold text-amber-400 gold-glow tracking-widest">
            CONGRATULATIONS
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-300 max-w-md mx-auto mt-0.5 font-light leading-relaxed px-2">
            Grace upon grace, strength upon strength. May your path illuminate brighter and brighter unto the perfect day.
          </p>
        </motion.div>

        {/* Action Buttons Row: Fun Boom Blast + Tributes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          <button
            id="more-fun-boom-btn"
            onClick={triggerFunBoom}
            className="group relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-cinzel font-black text-xs sm:text-sm tracking-wider hover:brightness-110 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PartyPopper className="w-3.5 h-3.5 text-yellow-200 animate-bounce" />
            <span>MORE FUN BOOM! ({boomCount})</span>
            <Flame className="w-3.5 h-3.5 text-yellow-200" />
          </button>

          <button
            id="proceed-to-tributes-btn"
            onClick={onContinueToTributes}
            className="group relative inline-flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-black text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>READ CAMPUS FIRE TRIBUTES</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
