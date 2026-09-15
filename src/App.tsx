import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StageId } from './types';
import BackgroundAura from './components/BackgroundAura';
import AudioController from './components/AudioController';
import SecretEntry from './components/SecretEntry';
import CongratulationsSection from './components/CongratulationsSection';
import IdentityReveal from './components/IdentityReveal';
import HeroSection from './components/HeroSection';
import ImpactWords from './components/ImpactWords';
import DiscoverySection from './components/DiscoverySection';
import GiftBoxSection from './components/GiftBoxSection';
import CelebrationBoom from './components/CelebrationBoom';
import TributesSection from './components/TributesSection';
import CollectiveMessageSection from './components/CollectiveMessageSection';
import FinalMessageSection from './components/FinalMessageSection';
import ExperienceNav from './components/ExperienceNav';

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>('entry');
  const [unlockedStages, setUnlockedStages] = useState<StageId[]>(['entry']);
  const [audioTrigger, setAudioTrigger] = useState(false);

  const transitionToStage = (nextStage: StageId) => {
    if (!unlockedStages.includes(nextStage)) {
      setUnlockedStages((prev) => [...prev, nextStage]);
    }
    setCurrentStage(nextStage);
  };

  const handleSecretUnlocked = () => {
    setAudioTrigger(true); // User interaction triggers audio
    transitionToStage('congratulations');
  };

  const handleRestart = () => {
    setCurrentStage('congratulations');
  };

  // Determine aura intensity based on stage
  const getAuraIntensity = () => {
    if (currentStage === 'celebration_boom') return 'celebration';
    if (currentStage === 'collective_message' || currentStage === 'final_message') return 'fire';
    return 'golden';
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050608] text-slate-100 flex flex-col justify-start overflow-x-hidden overflow-y-auto selection:bg-amber-500/30 selection:text-amber-200">
      {/* Dynamic atmospheric canvas background */}
      <BackgroundAura intensity={getAuraIntensity()} />

      {/* Floating Audio Soundtrack Controller */}
      <AudioController autoStartTrigger={audioTrigger} />

      {/* Main Experience Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start w-full min-h-full px-2 sm:px-4 py-4 sm:py-6 pb-24 sm:pb-28">
        <AnimatePresence mode="wait">
          {currentStage === 'entry' && (
            <motion.div
              key="entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <SecretEntry onUnlock={handleSecretUnlocked} />
            </motion.div>
          )}

          {currentStage === 'congratulations' && (
            <motion.div
              key="congratulations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <CongratulationsSection onContinue={() => transitionToStage('identity')} />
            </motion.div>
          )}

          {currentStage === 'identity' && (
            <motion.div
              key="identity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <IdentityReveal onContinue={() => transitionToStage('hero')} />
            </motion.div>
          )}

          {currentStage === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <HeroSection onContinue={() => transitionToStage('impact_words')} />
            </motion.div>
          )}

          {currentStage === 'impact_words' && (
            <motion.div
              key="impact_words"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <ImpactWords onContinue={() => transitionToStage('discovery')} />
            </motion.div>
          )}

          {currentStage === 'discovery' && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <DiscoverySection onContinue={() => transitionToStage('gift_box')} />
            </motion.div>
          )}

          {currentStage === 'gift_box' && (
            <motion.div
              key="gift_box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <GiftBoxSection
                onCompleteEmotionalReveal={() => transitionToStage('celebration_boom')}
              />
            </motion.div>
          )}

          {currentStage === 'celebration_boom' && (
            <motion.div
              key="celebration_boom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <CelebrationBoom
                onContinueToTributes={() => transitionToStage('tributes')}
              />
            </motion.div>
          )}

          {currentStage === 'tributes' && (
            <motion.div
              key="tributes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <TributesSection
                onContinueToCollective={() => transitionToStage('collective_message')}
              />
            </motion.div>
          )}

          {currentStage === 'collective_message' && (
            <motion.div
              key="collective_message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <CollectiveMessageSection
                onContinueToFinal={() => transitionToStage('final_message')}
              />
            </motion.div>
          )}

          {currentStage === 'final_message' && (
            <motion.div
              key="final_message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="w-full my-auto flex flex-col items-center justify-center"
            >
              <FinalMessageSection onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom discreet Chapter Timeline Navigation */}
      <ExperienceNav
        currentStage={currentStage}
        onSelectStage={(s) => setCurrentStage(s)}
        unlockedStages={unlockedStages}
      />
    </div>
  );
}
