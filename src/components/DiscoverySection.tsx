import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Eye, Shield, HeartHandshake, Sparkles, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { DISCOVERY_CARDS } from '../data/experienceData';

interface DiscoverySectionProps {
  onContinue: () => void;
}

export default function DiscoverySection({ onContinue }: DiscoverySectionProps) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([DISCOVERY_CARDS[0].id]);
  const [activeCardId, setActiveCardId] = useState<string>(DISCOVERY_CARDS[0].id);

  const toggleUnlock = (id: string) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds((prev) => [...prev, id]);
    }
    setActiveCardId(id);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Eye':
        return <Eye className="w-4 h-4 text-amber-300" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-amber-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  const allUnlocked = unlockedIds.length === DISCOVERY_CARDS.length;
  const activeCard = DISCOVERY_CARDS.find((c) => c.id === activeCardId) || DISCOVERY_CARDS[0];

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
        {/* Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-1.5 sm:mb-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-amber-500/20 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold mb-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>FOUNDATIONAL PILLARS • {unlockedIds.length} OF 4 REVEALED</span>
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide gold-glow leading-tight">
            THE PILLARS OF SIBIGAM DAVID
          </h2>
        </motion.div>

        {/* 4 Interactive Seal Buttons */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 my-1.5 sm:my-2 w-full">
          {DISCOVERY_CARDS.map((card) => {
            const isUnlocked = unlockedIds.includes(card.id);
            const isSelected = activeCardId === card.id;

            return (
              <button
                key={card.id}
                id={`discovery-pill-${card.id}`}
                onClick={() => toggleUnlock(card.id)}
                className={`relative p-2 sm:p-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isSelected
                    ? 'glass-gold-panel border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
                    : isUnlocked
                    ? 'glass-panel border-amber-500/40 opacity-90 hover:opacity-100 hover:border-amber-400/70'
                    : 'glass-panel border-white/10 opacity-70 hover:opacity-90 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-cinzel text-[10px] sm:text-xs font-bold text-amber-400 tracking-wider">
                    {card.number}
                  </span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-amber-400/40 flex items-center justify-center">
                      <Lock className="w-2 h-2 text-amber-400/60" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {getIcon(card.iconName)}
                  <h4 className="font-cinzel font-bold text-[11px] sm:text-xs text-white tracking-wide truncate">
                    {card.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Revelation Box for Active Pillar - Streamlined */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full text-left my-1.5 sm:my-2 p-3.5 sm:p-4 rounded-2xl glass-gold-panel border border-amber-500/30 relative overflow-hidden shadow-xl"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 shadow-inner">
                {getIcon(activeCard.iconName)}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold font-cinzel text-amber-400 uppercase tracking-wider">
                    PILLAR {activeCard.number} • {activeCard.title}
                  </span>
                </div>

                <blockquote className="font-playfair text-xs sm:text-sm text-amber-200/95 italic border-l-2 border-amber-400/70 pl-2.5 py-0.5">
                  “{activeCard.quote}”
                </blockquote>

                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pt-0.5">
                  {activeCard.reflection}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Button Once All Unlocked */}
        <div className="mt-2 sm:mt-3">
          {allUnlocked ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                id="unlock-mystery-gift-btn"
                onClick={onContinue}
                className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-black text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>ALL PILLARS UNLOCKED • PROCEED TO GIFT</span>
                <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-[11px] sm:text-xs text-slate-400">
                Tap all 4 pillars to unseal ({unlockedIds.length}/4)
              </span>
              <button
                onClick={() => {
                  setUnlockedIds(DISCOVERY_CARDS.map((c) => c.id));
                }}
                className="text-[11px] sm:text-xs text-amber-400/90 hover:text-amber-300 underline cursor-pointer"
              >
                Unseal all at once
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
