
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User, Eye, EyeOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';
import { useSound } from '../contexts/SoundContext';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (view: ViewState) => void;
  isGodMode?: boolean;
  toggleGodMode?: () => void;
  onOpenOracle?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate, isGodMode, toggleGodMode, onOpenOracle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute, playSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (action: () => void) => {
    playSound('click');
    action();
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-anthracite hover:text-neon-purple transition-colors" 
            onClick={() => handleNavClick(() => setIsMobileMenuOpen(!isMobileMenuOpen))}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <div 
            className="text-2xl md:text-3xl font-black font-sans text-anthracite cursor-pointer tracking-tighter flex items-center gap-1 group"
            onClick={() => handleNavClick(() => onNavigate(ViewState.HOME))}
          >
            <span>EMBRO</span>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${isGodMode ? 'from-white to-neon-gold' : 'from-tawny to-neon-purple group-hover:from-neon-purple group-hover:to-tawny'}`}>VEDA</span>
          </div>

          {/* Desktop Links - Pill Style */}
          <div className={`hidden md:flex items-center backdrop-blur-md rounded-full px-6 py-2 border shadow-sm transition-colors ${isGodMode ? 'bg-black/50 border-white/40' : 'bg-white/50 border-white/40'}`}>
            <button 
              onMouseEnter={() => playSound('hover')}
              onClick={() => handleNavClick(() => onNavigate(ViewState.COMING_SOON))}
              className={`px-4 py-1 text-sm font-bold uppercase tracking-wide transition-colors relative group ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`}
            >
              Drops
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${isGodMode ? 'bg-neon-gold' : 'bg-neon-purple'}`}></span>
            </button>
            <button 
              onMouseEnter={() => playSound('hover')}
              onClick={() => handleNavClick(() => onNavigate(ViewState.HOME))}
              className={`px-4 py-1 text-sm font-bold uppercase tracking-wide transition-colors relative group ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`}
            >
              Mythology
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${isGodMode ? 'bg-neon-gold' : 'bg-neon-purple'}`}></span>
            </button>
            <button 
              onMouseEnter={() => playSound('hover')}
              onClick={() => handleNavClick(() => onNavigate(ViewState.HOME))}
              className={`px-4 py-1 text-sm font-bold uppercase tracking-wide transition-colors relative group ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`}
            >
              Best Sellers
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${isGodMode ? 'bg-neon-gold' : 'bg-neon-purple'}`}></span>
            </button>
            <button 
              onMouseEnter={() => playSound('hover')}
              onClick={() => handleNavClick(() => onNavigate(ViewState.COMMUNITY))}
              className={`px-4 py-1 text-sm font-bold uppercase tracking-wide transition-colors relative group ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`}
            >
              Community
              <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${isGodMode ? 'bg-neon-gold' : 'bg-neon-purple'}`}></span>
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* ORACLE BUTTON */}
            {onOpenOracle && (
              <button
                onClick={() => handleNavClick(onOpenOracle)}
                className={`transition-all duration-300 hover:scale-110 flex items-center gap-2 px-2 py-1 rounded-full animate-pulse-fast ${isGodMode ? 'text-neon-gold hover:text-white' : 'text-neon-purple hover:text-anthracite'}`}
                title="Ask The Oracle"
              >
                <Sparkles size={22} fill="currentColor" className="opacity-80" />
                <span className="hidden lg:inline text-xs font-black uppercase tracking-widest">Oracle</span>
              </button>
            )}

            {/* SOUND TOGGLE */}
            <button
               onClick={() => handleNavClick(toggleMute)}
               className={`transition-all duration-300 hover:scale-110 flex items-center gap-2 px-2 py-1 rounded-full ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`}
               title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>

            {/* GOD MODE TOGGLE */}
            {toggleGodMode && (
              <button 
                onClick={() => handleNavClick(toggleGodMode)}
                className={`transition-all duration-300 hover:scale-110 flex items-center gap-2 px-3 py-1 rounded-full ${isGodMode ? 'bg-neon-gold/20 text-neon-gold shadow-neon' : 'hover:bg-gray-100 text-anthracite'}`}
                title="Toggle God Mode"
              >
                {isGodMode ? <Eye size={22} /> : <EyeOff size={22} />}
                <span className="hidden lg:inline text-xs font-black uppercase">{isGodMode ? 'GOD MODE' : ''}</span>
              </button>
            )}

            <button 
              onMouseEnter={() => playSound('hover')}
              onClick={() => handleNavClick(() => onNavigate(ViewState.ASHRAM))}
              className={`hidden md:block transition-colors hover:scale-110 duration-200 ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`}
              title="Your Ashram (Profile)"
            >
              <User size={22} />
            </button>
            <button 
              onMouseEnter={() => playSound('hover')}
              className={`relative transition-colors hover:scale-110 duration-200 ${isGodMode ? 'text-white hover:text-neon-gold' : 'text-anthracite hover:text-neon-purple'}`} 
              onClick={() => handleNavClick(onCartClick)}
            >
              <ShoppingBag size={22} />
              <AnimateBadge count={cartCount} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`fixed top-[70px] left-0 w-full z-40 border-b shadow-xl overflow-hidden ${isGodMode ? 'bg-black text-white border-gray-800' : 'bg-white text-anthracite'}`}
        >
          <div className="p-6 flex flex-col space-y-4">
            <button onClick={() => { handleNavClick(() => onNavigate(ViewState.ASHRAM)); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans hover:text-neon-purple transition-colors flex items-center gap-2">
               YOUR ASHRAM <User size={24} />
            </button>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <button onClick={() => { handleNavClick(() => onNavigate(ViewState.COMING_SOON)); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans hover:text-neon-purple transition-colors">
              Drops
            </button>
            <button onClick={() => { handleNavClick(() => onNavigate(ViewState.HOME)); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans hover:text-neon-purple transition-colors">
              Mythology
            </button>
            <button onClick={() => { handleNavClick(() => onNavigate(ViewState.HOME)); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans hover:text-neon-purple transition-colors">
              Best Sellers
            </button>
            <button onClick={() => { handleNavClick(() => onNavigate(ViewState.COMMUNITY)); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans hover:text-neon-purple transition-colors">
              Community
            </button>
            
            {onOpenOracle && (
              <button onClick={() => { handleNavClick(onOpenOracle); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans text-neon-purple flex items-center gap-2">
                ASK THE ORACLE <Sparkles />
              </button>
            )}
            {toggleGodMode && (
              <button onClick={() => { handleNavClick(toggleGodMode!); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black font-sans text-neon-gold flex items-center gap-2">
                {isGodMode ? 'DEACTIVATE GOD MODE' : 'ACTIVATE GOD MODE'} {isGodMode ? <Eye /> : <EyeOff />}
              </button>
            )}
            <div className="pt-4 border-t flex space-x-4">
               <button className="flex-1 py-3 bg-anthracite text-white font-bold rounded-lg">Login</button>
               <button className="flex-1 py-3 border border-anthracite font-bold rounded-lg">Search</button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

const AnimateBadge = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      key={count}
      className="absolute -top-1 -right-1 bg-neon-purple text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-neon"
    >
      {count}
    </motion.span>
  );
}
