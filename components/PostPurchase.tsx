
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CartItem } from '../types';
import { Button } from './Button';
import { Download, Smartphone, Check, ArrowRight, Share2 } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';
import { useSound } from '../contexts/SoundContext';

interface PostPurchaseProps {
  items: CartItem[];
  onBackHome: () => void;
}

export const PostPurchase: React.FC<PostPurchaseProps> = ({ items, onBackHome }) => {
  const { playSound } = useSound();

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      canvasConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#A855F7', '#FACC15']
      });
      canvasConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2DD4BF', '#FDFBF7']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    playSound('success');
  }, [playSound]);

  const handleDownload = (itemName: string) => {
    playSound('click');
    alert(`Downloading 4K Wallpaper for ${itemName}...`);
  };

  return (
    <div className="min-h-screen bg-anthracite text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header Status */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >
            <Check size={48} className="text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black font-sans mb-4 tracking-tighter">ORDER <span className="text-neon-gold">CONFIRMED</span></h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto font-medium">
            Your physical drip is being woven. <br />
            Your digital soul is ready now.
          </p>
        </div>

        {/* Digital Twin Section */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 mb-12 relative overflow-hidden backdrop-blur-sm">
          {/* Bg decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
             <div>
               <h2 className="text-2xl md:text-3xl font-black italic uppercase flex items-center gap-3">
                 <Smartphone className="text-neon-purple" /> 
                 Digital Twin Unlocked
               </h2>
               <p className="text-gray-400 mt-2 font-medium">Your shirt is shipping. Your screen is ready.</p>
             </div>
             <div className="mt-4 md:mt-0 px-4 py-2 bg-neon-gold/10 border border-neon-gold/30 rounded text-neon-gold text-xs font-bold uppercase tracking-widest animate-pulse">
               Exclusive Access
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <motion.div 
                key={`${item.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* Wallpaper Mockup Card */}
                <div className="aspect-[9/16] rounded-2xl overflow-hidden relative shadow-2xl border-4 border-anthracite group-hover:border-neon-purple transition-colors duration-300">
                  <img 
                    src={item.image} 
                    alt="Wallpaper Preview" 
                    className="w-full h-full object-cover filter brightness-50 group-hover:brightness-100 transition-all duration-500 scale-110 group-hover:scale-100" 
                  />
                  
                  {/* Overlay UI */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-transparent via-transparent to-black/90">
                    <div className="text-center mt-8">
                      <span className="text-6xl font-black text-white/10 select-none">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.name}</h3>
                      <p className="text-neon-gold text-xs font-bold uppercase tracking-wider mb-4">4K Mobile Edition</p>
                      <button 
                        onClick={() => handleDownload(item.name)}
                        className="w-full bg-white text-anthracite font-black py-3 rounded-xl hover:bg-neon-purple hover:text-white transition-colors flex items-center justify-center gap-2 text-sm uppercase"
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button onClick={onBackHome} size="lg" className="min-w-[200px]">
            Return to Shop <ArrowRight size={20} className="ml-2" />
          </Button>
          <button className="px-8 py-4 rounded-xl border-2 border-white/20 hover:bg-white hover:text-anthracite transition-all font-bold flex items-center gap-2">
            <Share2 size={20} /> Share the Flex
          </button>
        </div>

      </div>
    </div>
  );
};
