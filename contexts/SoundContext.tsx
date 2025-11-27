import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export type SoundType = 'hover' | 'click' | 'success' | 'drum' | 'wind' | 'electric';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  // Cache audio objects
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    hover: null,
    click: null,
    success: null,
    drum: null,
    wind: null,
    electric: null
  });

  useEffect(() => {
    // Preload sounds using reliable short SFX URLs
    const sounds: Record<SoundType, string> = {
        hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft tick
        click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Click
        success: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // Coin/Success
        drum: 'https://assets.mixkit.co/active_storage/sfx/1066/1066-preview.mp3', // Deep Tribal Drum
        wind: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', // Fast Whoosh
        electric: 'https://assets.mixkit.co/active_storage/sfx/258/258-preview.mp3' // Zap
    };

    Object.entries(sounds).forEach(([key, src]) => {
        const audio = new Audio(src);
        audio.volume = key === 'hover' ? 0.2 : 0.5; // Lower volume for UI ticks
        audioRefs.current[key as SoundType] = audio;
    });
  }, []);

  const toggleMute = () => setIsMuted(prev => !prev);

  const playSound = (type: SoundType) => {
    if (isMuted) return;
    const audio = audioRefs.current[type];
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => {
            // Browsers might block autoplay if no interaction yet
            // This catches the promise rejection safely
        });
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within SoundProvider');
  return context;
};