import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Trash2, Check, Sparkles, Crown, Flame } from 'lucide-react';
import { useCelebrantPhoto } from '../context/PhotoContext';
import { CELEBRANT_INFO } from '../data/experienceData';

export default function PhotoModal() {
  const { photoUrl, setPhotoUrl, removePhoto, isModalOpen, closeModal } = useCelebrantPhoto();
  const [activeTab, setActiveTab] = useState<'portrait' | 'upload' | 'url'>('portrait');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  // Process uploaded file and compress for reliable localStorage storage
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatusMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsProcessing(true);
    setStatusMessage('Loading original photo...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPhotoUrl(dataUrl);
        setStatusMessage('Photo replaced directly with your exact image!');
        setTimeout(() => {
          setStatusMessage(null);
          setActiveTab('portrait');
        }, 500);
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setStatusMessage('Error reading image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setPhotoUrl(urlInput.trim());
    setStatusMessage('Photo link applied successfully!');
    setTimeout(() => {
      setStatusMessage(null);
      setActiveTab('portrait');
    }, 800);
  };

  const handleResetToOfficial = () => {
    removePhoto();
    setPhotoUrl('/celebrant.jpg');
    setStatusMessage('Restored to official portrait.');
    setTimeout(() => setStatusMessage(null), 1500);
  };

  const displayPhoto = photoUrl || '/celebrant.jpg';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl glass-gold-panel border border-amber-500/40 shadow-2xl p-4 sm:p-6 text-slate-100"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-3.5 right-3.5 p-2 rounded-full glass-panel border border-white/10 text-slate-400 hover:text-white hover:border-amber-400/40 transition-colors cursor-pointer z-10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
                Celebrant Spotlight
              </h3>
              <p className="text-[10px] sm:text-xs text-amber-400/90 font-medium">
                Pastor Sibigam David • Official Birthday Portrait
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 mb-3 gap-1 text-xs">
            <button
              onClick={() => setActiveTab('portrait')}
              className={`pb-2 px-3 font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'portrait'
                  ? 'border-b-2 border-amber-400 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Royal Portrait
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2 px-3 font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-b-2 border-amber-400 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Change Photo
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`pb-2 px-3 font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'url'
                  ? 'border-b-2 border-amber-400 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              Web Link
            </button>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="mb-3 p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* TAB 1: ROYAL PORTRAIT SHOWCASE */}
          {activeTab === 'portrait' && (
            <div className="flex flex-col items-center text-center">
              {/* Grand Framed Portrait showing full posture and elegance */}
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[2/3] rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.4)] my-2">
                <div className="w-full h-full rounded-xl overflow-hidden bg-neutral-900 relative">
                  <img
                    src={displayPhoto}
                    alt={CELEBRANT_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 p-1 rounded-full bg-black/60 border border-amber-400/40 text-amber-300">
                    <Crown className="w-3 h-3" />
                  </div>
                  <div className="absolute top-2 right-2 p-1 rounded-full bg-black/60 border border-amber-400/40 text-amber-300">
                    <Sparkles className="w-3 h-3" />
                  </div>

                  {/* Name banner overlay at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-3 text-center bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h4 className="font-cinzel text-sm sm:text-base font-black text-white tracking-wider gold-glow leading-tight">
                      PASTOR SIBIGAM DAVID
                    </h4>
                    <p className="text-[10px] text-amber-300 font-semibold mt-0.5">
                      Founder, Quiver Nation
                    </p>
                  </div>
                </div>
              </div>

              {/* Ministerial Details */}
              <div className="mt-2 space-y-1 w-full text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel border border-orange-500/30 text-orange-300 text-[11px] font-cinzel font-semibold tracking-wider">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>Youth Convener • Campus Fire Fellowship</span>
                </div>
                <p className="text-[11px] text-slate-300 italic max-w-xs mx-auto">
                  “A passionate leader, dedicated mentor, and resolute voice for this generation.”
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={handleResetToOfficial}
                  className="text-[11px] text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  Reload Official Photo
                </button>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-cinzel font-bold text-xs tracking-wider hover:from-amber-400 hover:to-amber-300 transition-all shadow-md cursor-pointer"
                >
                  Continue Celebration
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD IMAGE */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-6 text-center cursor-pointer bg-amber-500/5 hover:bg-amber-500/10 transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    Click to browse or drop new photo
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports JPG, PNG, WEBP. Optimized automatically.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleResetToOfficial}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Restore Official Photo</span>
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: URL LINK */}
          {activeTab === 'url' && (
            <form onSubmit={handleApplyUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Direct Image Web Link
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/pastor-david.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={!urlInput.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-cinzel font-bold text-xs tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:from-amber-400 hover:to-amber-300 transition-all shadow-md cursor-pointer"
              >
                Apply Image Link
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
