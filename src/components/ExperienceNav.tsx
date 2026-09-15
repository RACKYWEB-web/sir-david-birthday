import { StageId } from '../types';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExperienceNavProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  unlockedStages: StageId[];
}

const STAGES: { id: StageId; label: string }[] = [
  { id: 'entry', label: 'Key' },
  { id: 'congratulations', label: '27 Sept' },
  { id: 'identity', label: 'Identity' },
  { id: 'hero', label: 'Hero' },
  { id: 'impact_words', label: 'Impact' },
  { id: 'discovery', label: 'Pillars' },
  { id: 'gift_box', label: 'Gift' },
  { id: 'celebration_boom', label: 'Boom' },
  { id: 'tributes', label: 'Tributes' },
  { id: 'collective_message', label: 'Fellowship' },
  { id: 'final_message', label: 'Blessing' },
];

export default function ExperienceNav({
  currentStage,
  onSelectStage,
  unlockedStages,
}: ExperienceNavProps) {
  if (currentStage === 'entry') return null;

  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);

  const handlePrev = () => {
    if (currentIndex > 1) {
      onSelectStage(STAGES[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1].id;
      if (unlockedStages.includes(nextStage)) {
        onSelectStage(nextStage);
      }
    }
  };

  return (
    <div className="fixed bottom-2 sm:bottom-3 inset-x-0 z-40 flex items-center justify-center px-2 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full glass-panel border border-amber-500/20 shadow-2xl backdrop-blur-lg">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 1}
          className="p-1 rounded-full text-slate-400 hover:text-amber-300 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          title="Previous chapter"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[240px] sm:max-w-md px-1 no-scrollbar">
          {STAGES.slice(1).map((stage) => {
            const isUnlocked = unlockedStages.includes(stage.id);
            const isCurrent = currentStage === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => isUnlocked && onSelectStage(stage.id)}
                disabled={!isUnlocked}
                className={`group relative flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-medium whitespace-nowrap transition-all duration-300 ${
                  isCurrent
                    ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/30'
                    : isUnlocked
                    ? 'text-slate-300 hover:text-amber-300 hover:bg-white/5 cursor-pointer'
                    : 'text-slate-600 opacity-40 cursor-not-allowed'
                }`}
                title={stage.label}
              >
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={
            currentIndex >= STAGES.length - 1 ||
            !unlockedStages.includes(STAGES[currentIndex + 1]?.id)
          }
          className="p-1 rounded-full text-slate-400 hover:text-amber-300 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
          title="Next chapter"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
