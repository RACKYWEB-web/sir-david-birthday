import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Heart, Send, MessageSquareHeart, Plus, Check, Play, Pause } from 'lucide-react';
import { TRIBUTES as initialTributes } from '../data/experienceData';
import { Tribute } from '../types';

interface TributesSectionProps {
  onContinueToCollective: () => void;
}

const AUTO_SLIDE_DURATION = 7500; // 7.5 seconds per tribute for thorough reading

export default function TributesSection({ onContinueToCollective }: TributesSectionProps) {
  const [tributesList, setTributesList] = useState<Tribute[]>(initialTributes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const timerRef = useRef<number | null>(null);

  const currentTribute = tributesList[currentIndex] || tributesList[0];

  // Auto-slide effect with fade in and fade out
  useEffect(() => {
    if (!isAutoPlaying || isHovered || showAddModal) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tributesList.length);
    }, AUTO_SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, isHovered, showAddModal, tributesList.length, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tributesList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : tributesList.length - 1));
  };

  const handleAddTribute = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMessage.trim()) return;

    const newEntry: Tribute = {
      id: `custom-${Date.now()}`,
      name: newAuthor.trim(),
      role: newRole.trim() || 'Campus Fire Member',
      message: newMessage.trim(),
      highlight: 'From a grateful heart',
    };

    const updatedList = [...tributesList, newEntry];
    setTributesList(updatedList);
    setCurrentIndex(updatedList.length - 1);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
      setNewAuthor('');
      setNewRole('');
      setNewMessage('');
    }, 1200);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center my-auto">
      <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-1 sm:mb-2"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-panel border border-amber-500/20 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-300 font-semibold mb-1">
            <MessageSquareHeart className="w-3 h-3 text-amber-400" />
            <span>TRIBUTE {currentIndex + 1} OF {tributesList.length}</span>
            <span className="hidden xs:inline">• AUTO CYCLE</span>
          </div>
          <h2 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-black text-white tracking-wide gold-glow leading-tight">
            VOICES OF GRATITUDE
          </h2>
        </motion.div>

        {/* Tribute Card Container with Fade In / Fade Out */}
        <div
          className="relative my-1 sm:my-1.5 min-h-[170px] sm:min-h-[180px] max-h-[220px] flex items-center justify-center w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTribute.id}
              initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, scale: 0.98, filter: 'blur(6px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-left p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl glass-gold-panel border border-amber-500/30 shadow-2xl relative overflow-hidden"
            >
              {/* Giant quote background watermark */}
              <Quote className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-20 sm:w-28 h-20 sm:h-28 text-amber-500/5 rotate-180 pointer-events-none" />

              {/* Author Info Header */}
              <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-500/30 to-orange-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-cinzel font-bold text-base sm:text-lg shadow-inner shrink-0">
                    {currentTribute.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-cinzel font-bold text-base sm:text-xl text-white tracking-wide leading-tight">
                      {currentTribute.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-amber-400/90 font-medium">
                      {currentTribute.role || 'Campus Fire Fellowship'}
                    </p>
                  </div>
                </div>

                {currentTribute.highlight && (
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs">
                    <Heart className="w-3 h-3 text-amber-400 fill-amber-400/30" />
                    <span>{currentTribute.highlight}</span>
                  </div>
                )}
              </div>

              {/* Tribute Message Body - Responsive text scaling */}
              <div className="relative z-10 max-h-[300px] overflow-y-auto pr-1">
                <blockquote className="font-playfair text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-normal whitespace-pre-line">
                  “{currentTribute.message}”
                </blockquote>
              </div>

              {/* Mobile Highlight Badge if present */}
              {currentTribute.highlight && (
                <div className="sm:hidden mt-4 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-[10px]">
                  <Heart className="w-2.5 h-2.5 text-amber-400 fill-amber-400/30" />
                  <span>{currentTribute.highlight}</span>
                </div>
              )}

              {/* Animated bottom progress bar for auto-change */}
              {isAutoPlaying && !isHovered && !showAddModal && (
                <motion.div
                  key={`progress-${currentIndex}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTO_SLIDE_DURATION / 1000, ease: 'linear' }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Controls with Play / Pause */}
        <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-4 mt-4">
          <button
            id="prev-tribute-btn"
            onClick={handlePrev}
            className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full glass-panel border border-white/15 text-xs sm:text-sm font-cinzel text-slate-200 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
            title="Previous tribute"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden xs:inline">Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {tributesList.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? 'w-6 sm:w-7 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Go to tribute ${i + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause Auto-slide */}
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="p-2 rounded-full glass-panel border border-amber-500/20 text-amber-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
            title={isAutoPlaying ? 'Pause automatic fade' : 'Resume automatic fade'}
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          <button
            id="next-tribute-btn"
            onClick={handleNext}
            className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full glass-panel border border-white/15 text-xs sm:text-sm font-cinzel text-slate-200 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
            title="Next tribute"
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Action Row: Add tribute + Proceed to Collective Message */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full glass-panel border border-amber-500/30 text-xs font-cinzel text-amber-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Personal Wish</span>
          </button>

          <button
            id="continue-to-collective-btn"
            onClick={onContinueToCollective}
            className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-cinzel font-black text-xs sm:text-sm tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer text-center"
          >
            <span>COLLECTIVE FELLOWSHIP DECLARATION</span>
            <ChevronRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>

      {/* Add Tribute Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl glass-gold-panel p-5 sm:p-8 border border-amber-500/40 shadow-2xl relative"
          >
            <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-white mb-1.5">
              Write a Birthday Tribute for Sir David
            </h3>
            <p className="text-xs text-slate-300 mb-5">
              Add your prayer, memory, or celebration wish to the fellowship tribute book.
            </p>

            <form onSubmit={handleAddTribute} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-amber-300 tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Okonkwo"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-amber-300 tracking-wider mb-1">
                  Your Role / Relationship
                </label>
                <input
                  type="text"
                  placeholder="e.g. Campus Fire Fellowship Member / Mentee"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-amber-300 tracking-wider mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share how Sir David has inspired or impacted your journey..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittedSuccess}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-cinzel font-bold tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {submittedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>Post Tribute</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
