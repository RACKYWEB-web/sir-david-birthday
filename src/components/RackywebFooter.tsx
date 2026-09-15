import { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Globe, Phone, ExternalLink, Code2, PartyPopper, Check, Heart, Rocket } from 'lucide-react';

export default function RackywebFooter() {
  const [copied, setCopied] = useState(false);
  const [funCount, setFunCount] = useState(0);

  const websiteUrl = 'https://rackyweb-web.github.io/Rackyweb-Technologies/';
  const phoneNumber = '+2347087806251';

  const triggerFunBlast = () => {
    setFunCount((prev) => prev + 1);

    // Audio chime effect using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 major arpeggio
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
        });
      }
    } catch {
      // Audio context might be restricted before interaction
    }

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#38bdf8', '#818cf8', '#f59e0b', '#ec4899', '#10b981'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 75,
        origin: { x: 0.15, y: 0.82 },
        colors: ['#ffd700', '#ff007f', '#00e5ff', '#76ff03'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 75,
        origin: { x: 0.85, y: 0.82 },
        colors: ['#ffd700', '#ff007f', '#00e5ff', '#76ff03'],
      });
    }, 180);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-xl mx-auto mt-2 sm:mt-2.5 pt-1.5 border-t border-amber-500/20 text-center relative z-20 px-1"
    >
      {/* Sleek Compact Rackyweb Container */}
      <div className="p-2 sm:p-2.5 rounded-xl glass-gold-panel border border-amber-500/30 shadow-lg relative overflow-hidden text-center group hover:border-amber-400/50 transition-all duration-300">
        {/* Company Header & Motto in One Tight Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2.5 text-left">
            {/* Bespoke Handcrafted Monogram Crest (No generic code icon) */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/25 via-amber-700/20 to-slate-950 border border-amber-400/40 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.25)] shrink-0 relative group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-base font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 leading-none">
                R
              </span>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 border border-amber-300/60" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-200/90 flex items-center gap-1 leading-tight font-medium">
                <span>Built with love</span>
                <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400 animate-pulse inline" />
                <span>by</span>
              </span>
              <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400">
                  Rackyweb Technologies
                </span>
              </h4>
            </div>
          </div>

          {/* Motto Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-amber-400/30 text-[10px] font-mono tracking-wider text-amber-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">code • build • deploy</span>
          </div>
        </div>

        {/* Contact Links & Lots of Fun Actions in Single Clean Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {/* Official Website */}
          <a
            id="rackyweb-website-link"
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel border border-cyan-500/30 text-[11px] font-medium text-cyan-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer shadow-sm group/link"
          >
            <Globe className="w-3 h-3 text-cyan-400 group-hover/link:animate-spin" style={{ animationDuration: '8s' }} />
            <span>Website</span>
            <ExternalLink className="w-2.5 h-2.5 text-cyan-400/70" />
          </a>

          {/* Call Link */}
          <a
            id="rackyweb-phone-link"
            href={`tel:${phoneNumber}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel border border-emerald-500/30 text-[11px] font-medium text-emerald-200 hover:text-white hover:border-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer shadow-sm"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>{phoneNumber}</span>
          </a>

          {/* Copy Phone */}
          <button
            onClick={copyPhone}
            className="px-2 py-1.5 rounded-lg glass-panel border border-white/10 text-[10px] font-mono text-slate-300 hover:text-white hover:border-amber-400/40 transition-all cursor-pointer flex items-center gap-1"
            title="Copy phone number"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <span>Copy</span>
            )}
          </button>

          {/* Lots of Fun Celebration Button */}
          <button
            id="rackyweb-fun-cannon-btn"
            onClick={triggerFunBlast}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 text-white text-[11px] font-bold font-cinzel tracking-wider hover:opacity-95 transition-all shadow-md shadow-purple-500/20 hover:scale-105 active:scale-95 cursor-pointer"
            title="Fire joyful celebration fireworks!"
          >
            <PartyPopper className="w-3 h-3 text-yellow-200" />
            <span>Fun Boom! 🎉</span>
            {funCount > 0 && (
              <span className="px-1 rounded-full bg-white/30 text-[9px] font-sans">
                {funCount}
              </span>
            )}
          </button>
        </div>

        {/* Easter Egg Note if fun cannon tapped */}
        {funCount >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 p-1.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-[10px] text-amber-200 flex items-center justify-center gap-1"
          >
            <Rocket className="w-3 h-3 text-amber-400" />
            <span>Rackyweb salutes Sir David! ₦500k+ digital craft.</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
