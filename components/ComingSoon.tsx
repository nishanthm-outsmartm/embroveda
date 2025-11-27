
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Send, Sparkles, Instagram, Facebook, Youtube } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

export const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const { playSound } = useSound();

  // Simulate Karma Loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + Math.floor(Math.random() * 5);
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSound('success');
    setIsJoined(true);
  };

  return (
    <div className="min-h-screen bg-anthracite relative overflow-hidden flex flex-col items-center justify-between p-6 select-none cursor-none">
      
      {/* 1. VEDIC MATRIX BACKGROUND */}
      <MatrixRain />
      
      {/* 2. GOD'S TOUCH CURSOR */}
      <CursorTrail />

      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-fast"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-neon-gold/10 rounded-full blur-[120px] animate-pulse-fast" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header Logo */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 pt-8"
      >
        <div className="text-3xl md:text-4xl font-black font-sans text-white tracking-tighter flex items-center gap-1">
            <span>EMBRO</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-purple">VEDA</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full text-center flex-1 flex flex-col justify-center">
        
        {/* Animated Central Artifact */}
        <div className="relative h-32 mb-12 flex justify-center items-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute"
          >
             <div className="w-[300px] h-[300px] border border-white/5 rounded-full border-dashed"></div>
          </motion.div>
          
          <div className="relative z-10 bg-black/50 backdrop-blur-md p-6 rounded-full border border-neon-gold/50 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
            <Sparkles size={48} className="text-white animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1 bg-neon-purple/20 border border-neon-purple/50 rounded-full mb-6 backdrop-blur-md">
             <span className="text-neon-purple text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
               <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
               Myth Drop Incoming
             </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black font-sans text-white mb-6 tracking-tighter leading-none drop-shadow-2xl">
            LEGENDS <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold via-white to-neon-teal">LOADING...</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-xl mx-auto mb-12 leading-relaxed">
            The Gods are cooking something wild. <br/>
            Vedic streetwear like never before. 
          </p>

          {/* Karma Loader */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              <span>Karma Loading...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-purple via-neon-gold to-neon-teal"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute top-0 right-0 h-full w-2 bg-white/50 blur-[2px] animate-pulse"></div>
            </div>
          </div>

          {/* Waitlist Input */}
          {!isJoined ? (
            <form onSubmit={handleJoin} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-30">
              <input 
                type="email" 
                placeholder="Enter email for early access" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-gold transition-colors font-sans text-center sm:text-left"
                required
              />
              <button 
                type="submit" 
                className="inline-flex items-center justify-center rounded-xl font-sans transition-all duration-200 active:scale-95 uppercase tracking-wide px-6 py-3 text-sm bg-neon-gold text-black hover:bg-white border-none shrink-0 shadow-[0_0_20px_rgba(250,204,21,0.3)] w-full sm:w-auto font-black"
              >
                NOTIFY ME <Send size={18} className="ml-2" />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 max-w-md mx-auto flex items-center justify-center gap-3 text-green-400 font-bold backdrop-blur-md"
            >
              <Sparkles size={20} fill="currentColor" /> YOU'RE ON THE LIST. PREPARE FOR ASCENSION.
            </motion.div>
          )}

        </motion.div>
      </div>

      {/* Social Footer */}
      <div className="relative z-20 pb-4">
         <div className="flex gap-6 justify-center text-gray-500 mb-4">
            <a href="#" className="hover:text-neon-purple hover:scale-110 transition-all"><Instagram size={20} /></a>
            <a href="#" className="hover:text-neon-purple hover:scale-110 transition-all"><Facebook size={20} /></a>
            <a href="#" className="hover:text-neon-purple hover:scale-110 transition-all"><Youtube size={20} /></a>
         </div>
      </div>

    </div>
  );
};

// --- SUB COMPONENTS ---

// 1. Matrix Rain Effect
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sanskrit = "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह";
    const binary = "10";
    const chars = (sanskrit + binary).split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"; // Fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#A855F7"; // Neon Purple text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        // Randomly color some drops Gold
        if (Math.random() > 0.95) {
            ctx.fillStyle = "#FACC15"; 
        } else {
            ctx.fillStyle = "#A855F7";
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />;
};

// 2. Cursor Trail Effect
const CursorTrail: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth spring physics for the cursor follower
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
  
    useEffect(() => {
      const moveCursor = (e: MouseEvent) => {
        mouseX.set(e.clientX - 16);
        mouseY.set(e.clientY - 16);
      };
      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }, [mouseX, mouseY]);
  
    return (
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <div className="w-full h-full rounded-full bg-neon-gold blur-md opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 w-full h-full rounded-full border border-white opacity-80"></div>
      </motion.div>
    );
  };
