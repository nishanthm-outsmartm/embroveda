
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Lock, ArrowLeft, Plus } from 'lucide-react';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';

interface AshramProps {
  purchaseCount: number;
  onBack: () => void;
  onSimulatePurchase: () => void; // Dev helper to level up
}

export const Ashram: React.FC<AshramProps> = ({ purchaseCount, onBack, onSimulatePurchase }) => {
  const { playSound } = useSound();

  // Level Logic
  const hasDiya = purchaseCount >= 1;
  const hasTrishul = purchaseCount >= 3;
  const isCosmic = purchaseCount >= 5;

  const getLevelName = () => {
    if (isCosmic) return "The Ascended";
    if (hasTrishul) return "The Devotee";
    if (hasDiya) return "The Seeker";
    return "The Initiate";
  };

  const nextUnlock = () => {
    if (isCosmic) return "Max Enlightenment Reached";
    if (hasTrishul) return `${5 - purchaseCount} orders to Cosmic Realm`;
    if (hasDiya) return `${3 - purchaseCount} orders to Unseal the Weapon`;
    return "1 order to Light the Path";
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${isCosmic ? 'bg-black text-white' : 'bg-stone-900 text-stone-200'}`}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {isCosmic ? (
          <div 
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80 animate-pulse-fast"
            style={{ animationDuration: '10s' }}
          />
        ) : (
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 grayscale" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 flex flex-col h-full min-h-screen">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-neon-gold transition-colors"
          >
            <ArrowLeft size={18} /> Back to Reality
          </button>
          
          <div className="text-right">
            <h1 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tighter mb-1">
              {getLevelName()}
            </h1>
            <p className="text-neon-gold text-xs font-bold uppercase tracking-widest">{nextUnlock()}</p>
          </div>
        </div>

        {/* The Shrine Display */}
        <div className="flex-1 flex flex-col items-center justify-center relative my-8">
          
          {/* Altar Base */}
          <div className="w-full max-w-2xl aspect-video relative flex items-end justify-center perspective-[1000px]">
             
             {/* The Trishul (Level 2) */}
             <motion.div 
               initial={{ opacity: 0, y: -50 }}
               animate={{ opacity: hasTrishul ? 1 : 0.1, y: hasTrishul ? 0 : -20, scale: hasTrishul ? 1 : 0.8 }}
               className="absolute bottom-20 z-20 text-[10rem] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] origin-bottom transition-all duration-1000"
             >
               <span className={hasTrishul ? 'filter drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]' : 'grayscale brightness-50 blur-sm'}>
                 🔱
               </span>
               {!hasTrishul && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm bg-black/80 px-3 py-1 rounded text-gray-500 font-mono whitespace-nowrap border border-gray-700">
                   <Lock size={12} className="inline mr-1" /> Locked
                 </div>
               )}
             </motion.div>

             {/* The Diya/Lamp (Level 1) */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: hasDiya ? 1 : 0 }}
               className="absolute bottom-10 z-30"
             >
               <div className="text-6xl filter drop-shadow-[0_0_50px_rgba(250,204,21,1)] animate-float">
                 🪔
               </div>
               {/* Ambient Light Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]" />
             </motion.div>

             {/* Stone Platform */}
             <div className="w-full h-12 bg-stone-800 rounded-[50%] blur-sm absolute bottom-0 shadow-[0_-20px_60px_rgba(0,0,0,1)] z-10" />
          </div>

        </div>

        {/* Controls / Stats */}
        <div className="mt-auto max-w-2xl mx-auto w-full">
           <div className="bg-black/40 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
             
             <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Current Offerings</h3>
               <div className="text-3xl font-black text-white">{purchaseCount} <span className="text-base font-normal text-gray-500">Orders</span></div>
             </div>

             {/* Dev Tool to Simulate Progress */}
             <button 
               onClick={() => { playSound('success'); onSimulatePurchase(); }}
               className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono text-gray-500 hover:text-white transition-colors flex items-center gap-2 border border-transparent hover:border-white/20"
             >
               <Plus size={14} /> [DEV] Meditate (Simulate Order)
             </button>

             <Button variant="secondary" onClick={() => { playSound('click'); alert("Shrine shared to Instagram Story!"); }}>
               <Share2 size={18} className="mr-2" /> Share Shrine
             </Button>
           </div>
        </div>

      </div>
    </div>
  );
};
