import { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Camera, Sparkles, Upload, Eye } from 'lucide-react';
import { useCelebrantPhoto } from '../context/PhotoContext';
import { CELEBRANT_INFO } from '../data/experienceData';

interface CelebrantPortraitProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showEditPrompt?: boolean;
  className?: string;
}

export default function CelebrantPortrait({
  size = 'lg',
  showEditPrompt = true,
  className = '',
}: CelebrantPortraitProps) {
  const { photoUrl, openModal } = useCelebrantPhoto();
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Dimension classes
  const sizeMap = {
    sm: {
      wrapper: 'w-12 h-12 sm:w-14 sm:h-14',
      crestIcon: 'w-5 h-5',
      crownIcon: 'w-2.5 h-2.5',
      monogram: 'text-xs',
    },
    md: {
      wrapper: 'w-16 h-16 sm:w-20 sm:h-20',
      crestIcon: 'w-8 h-8',
      crownIcon: 'w-3.5 h-3.5',
      monogram: 'text-sm sm:text-base',
    },
    lg: {
      wrapper: 'w-22 h-22 sm:w-28 sm:h-28',
      crestIcon: 'w-10 h-10',
      crownIcon: 'w-4 h-4',
      monogram: 'text-lg sm:text-xl',
    },
    xl: {
      wrapper: 'w-28 h-28 sm:w-36 sm:h-36',
      crestIcon: 'w-14 h-14',
      crownIcon: 'w-6 h-6',
      monogram: 'text-2xl',
    },
  };

  const currentSize = sizeMap[size];
  const hasPhoto = Boolean(photoUrl && !imgError);

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Halo Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-500/20 to-amber-300/30 blur-xl scale-125 pointer-events-none animate-pulse" />

      {/* Main Portrait Container */}
      <div
        onClick={openModal}
        title={hasPhoto ? 'Click to change photo' : 'Click to add / upload photo'}
        className={`relative ${currentSize.wrapper} rounded-full p-1.5 cursor-pointer group transition-all duration-300 hover:scale-105 select-none`}
      >
        {/* Layered Gold Borders */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-300 via-amber-600 to-amber-400 p-[2px] shadow-[0_0_25px_rgba(245,158,11,0.35)]">
          <div className="w-full h-full rounded-full bg-[#07090e]" />
        </div>

        {/* Inner Content: Photo OR Regal Monogram Crest */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-amber-400/40 bg-gradient-to-b from-[#131722] via-[#090b10] to-[#040507] flex items-center justify-center shadow-inner">
          {hasPhoto ? (
            <img
              src={photoUrl!}
              alt={CELEBRANT_INFO.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-[center_12%]"
            />
          ) : (
            // Awaiting Image Placeholder: Majestic Royal Crest
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.18),transparent_70%)]" />
              
              <Crown className={`${currentSize.crestIcon} text-amber-300/80 mb-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse`} />
              
              <span className={`font-cinzel font-black text-amber-200 tracking-wider gold-glow ${currentSize.monogram}`}>
                SD
              </span>
              
              <span className="text-[9px] uppercase tracking-widest text-amber-400/70 font-semibold mt-0.5">
                PORTRAIT
              </span>
            </div>
          )}

          {/* Hover overlay with View / Upload indicator */}
          <div className={`absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {hasPhoto ? (
              <>
                <Eye className="w-5 h-5 text-amber-300 mb-0.5" />
                <span className="text-[9px] sm:text-[10px] font-cinzel font-bold text-white tracking-wider">
                  View Portrait
                </span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 text-amber-300 mb-0.5" />
                <span className="text-[9px] sm:text-[10px] font-cinzel font-bold text-white tracking-wider">
                  Add Photo
                </span>
              </>
            )}
          </div>
        </div>

        {/* Crown Jewel Accent at Top */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 border border-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/40 z-10">
          <Crown className="w-3.5 h-3.5 text-black drop-shadow" />
        </div>

        {/* Sparkle icon at corner */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/80 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow z-10">
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      {/* Discreet helper button below portrait */}
      {showEditPrompt && (
        <button
          onClick={openModal}
          className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 transition-all cursor-pointer shadow-sm group"
        >
          {hasPhoto ? (
            <>
              <Eye className="w-2.5 h-2.5 text-amber-400" />
              <span>View Full Portrait</span>
            </>
          ) : (
            <>
              <Upload className="w-2.5 h-2.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
              <span>Add / Upload Photo</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
