import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioControllerProps {
  autoStartTrigger?: boolean;
}

export default function AudioController({ autoStartTrigger = false }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startCinematicSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      setIsPlaying(true);

      // Chords: Cmaj9, Gsus2, Am9, Fmaj7
      const chordNotes = [
        [130.81, 164.81, 196.0, 246.94, 293.66], // C, E, G, B, D
        [98.0, 146.83, 196.0, 293.66, 392.0],    // G, D, G, D, G
        [110.0, 164.81, 220.0, 261.63, 329.63],  // A, E, A, C, E
        [87.31, 130.81, 174.61, 220.0, 261.63],  // F, C, F, A, C
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentChord = chordNotes[chordIndex];
        chordIndex = (chordIndex + 1) % chordNotes.length;

        // Master gain for ambient warmth
        const chordGain = ctx.createGain();
        chordGain.gain.setValueAtTime(0.001, ctx.currentTime);
        chordGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 2.5);
        chordGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 7.5);
        chordGain.connect(ctx.destination);

        // Warm low pass filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(480, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(800, ctx.currentTime + 3);
        filter.connect(chordGain);

        currentChord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(filter);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + 7.8);
        });

        // Add a gentle celestial bell chime
        const chimeFreq = currentChord[Math.floor(Math.random() * currentChord.length)] * 4;
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(chimeFreq, ctx.currentTime + 1.2);
        chimeGain.gain.setValueAtTime(0.0001, ctx.currentTime + 1.2);
        chimeGain.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 1.3);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chimeOsc.start(ctx.currentTime + 1.2);
        chimeOsc.stop(ctx.currentTime + 4.6);
      };

      playChord();
      intervalRef.current = window.setInterval(playChord, 7200);
    } catch (e) {
      console.warn('AudioContext error:', e);
    }
  };

  const stopCinematicSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopCinematicSynth();
    } else {
      startCinematicSynth();
    }
  };

  useEffect(() => {
    if (autoStartTrigger && !isPlaying) {
      startCinematicSynth();
    }
  }, [autoStartTrigger]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        id="audio-toggle-btn"
        onClick={toggleSound}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel border border-amber-500/20 text-xs font-medium text-amber-200/90 hover:text-amber-100 hover:border-amber-500/40 transition-all duration-300 shadow-lg shadow-black/40 hover:scale-105 active:scale-95"
        title={isPlaying ? 'Mute atmosphere audio' : 'Play cinematic ambient audio'}
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-amber-400' : 'bg-slate-500'}`} />
        </span>
        
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wider uppercase text-[10px] hidden sm:inline font-cinzel">Ambient Audio</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300" />
            <span className="tracking-wider uppercase text-[10px] hidden sm:inline text-slate-300">Play Audio</span>
          </>
        )}
      </button>
    </div>
  );
}
