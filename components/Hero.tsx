import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC<{ onShopNow: () => void; isGodMode?: boolean }> = ({ onShopNow, isGodMode }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 15]);

  return (
    <section className="relative min-h-[90vh] w-full bg-background overflow-hidden flex items-center justify-center pt-20 transition-colors duration-500">
      
      {/* Decorative Blur Blobs - Changed for God Mode */}
      <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-500 ${isGodMode ? 'bg-neon-gold/20' : 'bg-neon-purple/10'}`} />
      <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none transition-colors duration-500 ${isGodMode ? 'bg-red-600/20' : 'bg-neon-gold/10'}`} />

      {/* GOD MODE EASTER EGG */}
      {isGodMode && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/4 left-10 md:left-1/4 z-50 cursor-pointer group"
        >
          <div className="relative">
            <div className="text-6xl animate-spin-slow opacity-80">☸️</div>
            <div className="absolute inset-0 flex items-center justify-center font-black text-neon-gold text-xs bg-black/80 rounded-full w-full h-full opacity-0 group-hover:opacity-100 transition-opacity p-2 text-center">
              CODE: SHIVA20
            </div>
          </div>
          <p className="text-neon-gold text-xs font-mono mt-2 animate-pulse text-center">SECRET FOUND</p>
        </motion.div>
      )}

      {/* Floating Myth Stickers */}
      <FloatingSticker 
        emoji={isGodMode ? "👁️" : "🔱"} 
        text={isGodMode ? "THIRD EYE OPEN" : "Trishul Power"} 
        className={`top-[20%] left-[10%] ${isGodMode ? 'bg-black border-neon-gold text-neon-gold' : ''}`}
        delay={0.2} 
      />
      <FloatingSticker 
        emoji={isGodMode ? "👹" : "🔥"} 
        text={isGodMode ? "ASURA MODE" : "Agni Drop Live"} 
        className={`bottom-[30%] right-[10%] ${isGodMode ? 'bg-black border-red-500 text-red-500' : ''}`} 
        delay={0.5} 
      />
      <FloatingSticker 
        emoji="🕉️" 
        text="Vedic Vibes" 
        className={`top-[15%] right-[20%] ${isGodMode ? 'bg-black border-white text-white' : ''}`}
        delay={0.8} 
      />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-block px-4 py-1 border rounded-full mb-6 shadow-hard rotate-[-2deg] ${isGodMode ? 'bg-black border-neon-gold' : 'bg-white border-anthracite'}`}>
              <span className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isGodMode ? 'text-neon-gold' : 'text-anthracite'}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${isGodMode ? 'bg-neon-gold' : 'bg-red-500'}`}></span>
                {isGodMode ? 'REALITY DISTORTION ACTIVE' : 'New Collection Live'}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-anthracite leading-[0.9] mb-6 tracking-tighter">
              {isGodMode ? (
                <span className="glitch-text text-white" data-text="MOKSHA AWAITS">MOKSHA <br /> AWAITS.</span>
              ) : (
                <>
                WEAR YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-tawny to-neon-gold">LEGENDS.</span>
                </>
              )}
            </h1>
            
            <p className={`text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 font-medium ${isGodMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isGodMode ? "You have entered the hidden realm. Prices are an illusion. Style is eternal." : (
                <>
                Ancient mythology meets future streetwear. 
                <span className="bg-neon-gold/30 px-1 mx-1 rounded italic">Oversized fits</span>, 
                <span className="bg-neon-purple/20 px-1 mx-1 rounded italic">puff prints</span>, and stories worth wearing.
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={onShopNow} size="lg" className="shadow-neon">
                {isGodMode ? 'OFFERING' : 'Shop The Drop'} <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button variant="outline" size="lg" className={`hover:bg-soft-pink ${isGodMode ? 'border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-black' : ''}`}>
                {isGodMode ? 'SEE THE TRUTH' : 'Watch The Film'}
              </Button>
            </div>
          </motion.div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Sparkles size={14} className="text-neon-gold"/> 100% Cotton</span>
            <span className="flex items-center gap-2"><Sparkles size={14} className="text-neon-purple"/> Puff Print</span>
          </div>
        </div>

        {/* Hero Visual / 3D Layering */}
        <motion.div 
          className="lg:col-span-5 order-1 lg:order-2 relative"
          style={{ y: y2, rotate: rotate }}
        >
          {/* Main Card */}
          <div className={`relative z-20 p-3 rounded-[40px] shadow-2xl rotate-3 border-4 transition-colors duration-500 ${isGodMode ? 'bg-black border-neon-gold shadow-god' : 'bg-white border-white'}`}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-[32px] overflow-hidden aspect-[3/4] relative"
            >
              <img 
                src={isGodMode ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" : "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80"}
                alt="Hero Model"
                className={`w-full h-full object-cover transition-all duration-700 ${isGodMode ? 'invert brightness-90 contrast-125' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-black font-sans">{isGodMode ? 'THE DESTROYER' : 'THE GARUDA'}</h3>
                  <p className="text-neon-gold font-bold">Limited Edition</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Background Elements */}
          <div className={`absolute top-10 -right-10 w-full h-full border-4 rounded-[40px] z-10 rotate-12 transition-colors duration-500 ${isGodMode ? 'bg-gray-900 border-neon-gold' : 'bg-neon-purple border-anthracite'}`}></div>
          <motion.div 
             style={{ y: y1 }}
             className={`absolute -bottom-10 -left-10 p-4 rounded-2xl shadow-hard z-30 flex items-center gap-3 border transition-colors duration-500 ${isGodMode ? 'bg-black border-neon-gold text-white' : 'bg-white border-anthracite'}`}
          >
             <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-xl">
                {isGodMode ? '👁️' : '🔱'}
             </div>
             <div>
               <p className="font-bold text-sm">{isGodMode ? 'Karma Watching' : 'Selling Fast'}</p>
               <p className="text-xs text-gray-500">24 people viewing</p>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FloatingSticker = ({ emoji, text, className, delay }: { emoji: string, text: string, className: string, delay: number }) => (
  <motion.div
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 10 }}
    transition={{ 
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: delay
    }}
    className={`absolute hidden lg:flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-anthracite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 ${className}`}
  >
    <span className="text-xl">{emoji}</span>
    <span className="font-bold text-sm">{text}</span>
  </motion.div>
);