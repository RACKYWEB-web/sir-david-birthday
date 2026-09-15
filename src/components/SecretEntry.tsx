import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Sparkles, KeyRound, Flame, ArrowRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CELEBRANT_INFO } from '../data/experienceData';

interface SecretEntryProps {
  onUnlock: () => void;
}

// Spiritual scriptures that float in rotation
const SPIRITUAL_WHISPERS = [
  '“The fire shall ever be burning upon the altar; it shall never go out.” — Lev 6:13',
  '“The Lord is my shepherd; I shall not want.” — Psalm 23',
  '“Arise, shine; for thy light is come!” — Isaiah 60:1',
  '“A leader who breathes life into the next generation.”',
];

export default function SecretEntry({ onUnlock }: SecretEntryProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [whisperIndex, setWhisperIndex] = useState(0);

  // Cycle holy whispers
  useEffect(() => {
    const interval = setInterval(() => {
      setWhisperIndex((prev) => (prev + 1) % SPIRITUAL_WHISPERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Determine dynamic border and shadow styling based on letter count
  const letterCount = passcode.trim().length;
  const isMatch = passcode.trim().toLowerCase() === CELEBRANT_INFO.passcode.toLowerCase();

  const getBorderEffect = () => {
    if (error) {
      return {
        border: 'border-rose-500',
        ring: 'ring-2 ring-rose-500/50',
        shadow: 'shadow-[0_0_25px_rgba(244,63,94,0.7)]',
        colorName: 'Restriction Active',
        accentBg: 'from-rose-500/20 to-red-600/30',
        textColor: 'text-rose-400',
      };
    }

    if (isMatch || letterCount >= 5) {
      return {
        border: 'border-amber-300 animate-pulse',
        ring: 'ring-4 ring-amber-400/60',
        shadow: 'shadow-[0_0_35px_rgba(251,191,36,0.9),0_0_60px_rgba(245,158,11,0.5)]',
        colorName: 'Celestial Gold • Key Matched',
        accentBg: 'from-amber-400/30 via-yellow-400/40 to-orange-500/30',
        textColor: 'text-amber-300',
      };
    }

    switch (letterCount) {
      case 1:
        return {
          border: 'border-cyan-400',
          ring: 'ring-2 ring-cyan-400/50',
          shadow: 'shadow-[0_0_25px_rgba(6,182,212,0.8)]',
          colorName: 'Sapphire Arc (Letter 1)',
          accentBg: 'from-cyan-500/20 to-blue-600/20',
          textColor: 'text-cyan-300',
        };
      case 2:
        return {
          border: 'border-purple-400',
          ring: 'ring-2 ring-purple-400/50',
          shadow: 'shadow-[0_0_25px_rgba(192,132,252,0.8)]',
          colorName: 'Amethyst Fire (Letter 2)',
          accentBg: 'from-purple-500/20 to-pink-600/20',
          textColor: 'text-purple-300',
        };
      case 3:
        return {
          border: 'border-emerald-400',
          ring: 'ring-2 ring-emerald-400/50',
          shadow: 'shadow-[0_0_25px_rgba(52,211,153,0.8)]',
          colorName: 'Emerald Pulse (Letter 3)',
          accentBg: 'from-emerald-500/20 to-teal-600/20',
          textColor: 'text-emerald-300',
        };
      case 4:
        return {
          border: 'border-orange-500',
          ring: 'ring-2 ring-orange-500/50',
          shadow: 'shadow-[0_0_25px_rgba(249,115,22,0.8)]',
          colorName: 'Ruby Flame (Letter 4)',
          accentBg: 'from-orange-500/25 to-amber-600/25',
          textColor: 'text-orange-300',
        };
      default:
        return {
          border: 'border-amber-500/40',
          ring: 'ring-1 ring-amber-400/30',
          shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
          colorName: 'Awaiting Key',
          accentBg: 'from-amber-500/10 to-transparent',
          textColor: 'text-amber-400',
        };
    }
  };

  const styleInfo = getBorderEffect();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPasscode(val);
    if (error) setError(false);

    // Minor celebratory starburst when matching exactly
    if (val.trim().toLowerCase() === CELEBRANT_INFO.passcode.toLowerCase()) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#ffd700', '#fbbf24', '#ffffff'],
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanInput = passcode.trim().toLowerCase();

    if (cleanInput === CELEBRANT_INFO.passcode.toLowerCase()) {
      setError(false);
      setIsUnlocking(true);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#f59e0b', '#ec4899', '#38bdf8'],
      });
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2600);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-3 sm:p-4 my-auto">
      {/* Background ambient radial aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(180,83,9,0.18),transparent_70%)] pointer-events-none" />

      {/* Main Secret Portal Card - Compact & Screen-Fitted */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isUnlocking ? 1.04 : 1,
          filter: isUnlocking ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <div className="glass-gold-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-center shadow-2xl relative overflow-hidden border border-amber-500/30">
          
          {/* Animated Spiritual Artifact: Holy Bible with Moving Light & Shepherd Body Motif */}
          <div className="relative mx-auto w-24 h-20 sm:w-28 sm:h-24 mb-3 flex items-center justify-center">
            {/* Ambient Divine Radiance */}
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
            
            {/* Floating Celestial Holy Bible SVG & Animation */}
            <motion.div
              animate={{
                y: [-3, 3, -3],
                rotateZ: [-1.5, 1.5, -1.5],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="relative w-16 h-14 sm:w-20 sm:h-16 flex items-center justify-center">
                {/* 3D Glowing Holy Bible Graphic */}
                <svg
                  viewBox="0 0 100 80"
                  className="w-full h-full drop-shadow-[0_0_15px_rgba(245,158,11,0.7)]"
                >
                  <defs>
                    <linearGradient id="bibleCover" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#78350f" />
                      <stop offset="50%" stopColor="#451a03" />
                      <stop offset="100%" stopColor="#291204" />
                    </linearGradient>
                    <linearGradient id="goldPage" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="50%" stopColor="#fde68a" />
                      <stop offset="100%" stopColor="#fef3c7" />
                    </linearGradient>
                    <linearGradient id="crossGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Open Bible Left & Right Pages */}
                  <path
                    d="M 10 20 Q 50 12 50 25 L 50 65 Q 50 52 10 60 Z"
                    fill="url(#goldPage)"
                    stroke="#d97706"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 90 20 Q 50 12 50 25 L 50 65 Q 50 52 90 60 Z"
                    fill="url(#goldPage)"
                    stroke="#d97706"
                    strokeWidth="1.2"
                  />

                  {/* Spine & Pages Layering */}
                  <path
                    d="M 50 25 L 50 65"
                    stroke="#b45309"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Left Page Scripture Lines */}
                  <line x1="18" y1="28" x2="42" y2="28" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />
                  <line x1="18" y1="34" x2="40" y2="34" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />
                  <line x1="18" y1="40" x2="44" y2="40" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />
                  <line x1="18" y1="46" x2="38" y2="46" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />

                  {/* Right Page Scripture Lines */}
                  <line x1="58" y1="28" x2="82" y2="28" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />
                  <line x1="60" y1="34" x2="82" y2="34" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />
                  <line x1="56" y1="40" x2="80" y2="40" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />
                  <line x1="58" y1="46" x2="78" y2="46" stroke="#92400e" strokeWidth="1" strokeOpacity="0.6" />

                  {/* Holy Cross Rising from Center */}
                  <g>
                    <line x1="50" y1="14" x2="50" y2="36" stroke="url(#crossGlow)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="43" y1="20" x2="57" y2="20" stroke="url(#crossGlow)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="50" cy="20" r="1.5" fill="#ffffff" />
                  </g>
                </svg>

                {/* Animated Moving Flame/Soul Torch */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="absolute -top-3 text-amber-300 pointer-events-none"
                >
                  <Flame className="w-5 h-5 fill-amber-400/40 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,1)]" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Mysterious Header */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] sm:text-xs font-semibold uppercase text-amber-300/80 mb-1 tracking-[0.25em]"
          >
            CONFIDENTIAL ARCHIVE • CAMPUS FIRE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-1 leading-tight"
          >
            THIS WAS MADE FOR ONE PERSON.
          </motion.h1>

          {/* Rotating Spiritual Scripture Whispers */}
          <div className="h-9 flex items-center justify-center my-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={whisperIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="text-[11px] sm:text-xs text-amber-200/90 font-playfair italic px-2 max-w-sm line-clamp-2"
              >
                {SPIRITUAL_WHISPERS[whisperIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Form input with Glowing Interactive Box & Reactive Border Colors */}
          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <div className="relative max-w-xs sm:max-w-sm mx-auto">
              
              {/* Outer Glow Halo Layer */}
              <div
                className={`absolute -inset-1 rounded-2xl transition-all duration-300 pointer-events-none ${styleInfo.shadow} opacity-90`}
              />

              {/* Glowing Input Box */}
              <div
                className={`relative rounded-xl bg-black/80 transition-all duration-300 border-2 ${styleInfo.border} ${styleInfo.ring}`}
              >
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <KeyRound className={`w-4 h-4 transition-colors duration-300 ${styleInfo.textColor}`} />
                </div>

                <input
                  id="secret-key-input"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Passcode (e.g. David)"
                  value={passcode}
                  onChange={handleInputChange}
                  disabled={isUnlocking}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-transparent text-white placeholder-slate-500 focus:outline-none text-center text-sm sm:text-base tracking-widest font-cinzel font-bold transition-all"
                />
              </div>

              {/* 5-Letter Password Progression Indicators (D-A-V-I-D) */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {['D', 'A', 'V', 'I', 'D'].map((char, idx) => {
                  const isEntered = passcode.length > idx;
                  const isCurrent = passcode.length === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center border transition-all duration-300 ${
                        isEntered
                          ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] scale-105'
                          : isCurrent
                          ? 'bg-white/10 text-amber-300 border-amber-400/60 animate-pulse'
                          : 'bg-black/40 text-slate-600 border-white/10'
                      }`}
                    >
                      {isEntered ? char : '•'}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Aura Status Label */}
              <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-mono tracking-wider">
                <span className={`w-1.5 h-1.5 rounded-full ${isMatch ? 'bg-amber-400 animate-ping' : 'bg-slate-500'}`} />
                <span className={`${styleInfo.textColor} transition-colors duration-300`}>
                  {styleInfo.colorName}
                </span>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-rose-400 font-medium"
              >
                Access restricted. Only the celebrant holds the key. Hint: “David”
              </motion.p>
            )}

            <div className="pt-1">
              <button
                id="unlock-experience-btn"
                type="submit"
                disabled={isUnlocking}
                className="relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {isUnlocking ? (
                  <>
                    <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full mr-1.5" />
                    <span>UNLOCKING ARCHIVE...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-black" />
                    <span className="font-cinzel font-bold">UNLOCK EXPERIENCE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black ml-0.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
