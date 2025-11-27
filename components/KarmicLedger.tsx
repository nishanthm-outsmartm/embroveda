
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Flower, Wind, Lock, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';

interface KarmicLedgerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
}

export const KarmicLedger: React.FC<KarmicLedgerProps> = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const { playSound } = useSound();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Karma Levels
  // Level 1: $0 - $49 (Initiate)
  // Level 2: $50 - $99 (Sticker Pack)
  // Level 3: $100+ (Free Express Shipping)
  
  const progress = Math.min((total / 100) * 100, 100);
  
  const getKarmaStatus = () => {
    if (cart.length === 0) return { label: "Empty Karma", color: "text-gray-400", next: "Add items to initiate" };
    if (total < 50) return { label: "Initiate", color: "text-blue-500", next: `$${50 - total} to unlock Sticker Pack` };
    if (total < 100) return { label: "Ascending", color: "text-neon-purple", next: `$${100 - total} to unlock Express Shipping` };
    return { label: "Nirvana Reached", color: "text-neon-gold", next: "Maximum Rewards Unlocked" };
  };

  const status = getKarmaStatus();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-anthracite/60 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="font-black text-xl uppercase tracking-tighter text-anthracite flex items-center gap-2">
                  Karmic Ledger
                  {total >= 100 && <span className="text-neon-gold animate-pulse">✨</span>}
                </h2>
                <p className={`text-xs font-bold uppercase ${status.color}`}>{status.label}</p>
              </div>
              <button 
                onClick={() => { playSound('click'); onClose(); }}
                className="hover:text-neon-purple transition-colors bg-white p-2 rounded-full shadow-sm text-anthracite"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar (The Path to Nirvana) */}
            {cart.length > 0 && (
              <div className="px-6 py-4 bg-anthracite text-white relative overflow-hidden">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2 z-10 relative">
                  <span>Start</span>
                  <span className={total >= 50 ? 'text-neon-gold' : 'text-gray-500'}>Sticker Pack</span>
                  <span className={total >= 100 ? 'text-neon-teal' : 'text-gray-500'}>Free Shipping</span>
                </div>
                
                {/* Track */}
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-neon-purple to-neon-gold relative"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[marquee_1s_linear_infinite]" />
                  </motion.div>
                </div>

                {/* Milestone Icons */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 px-6 pointer-events-none flex justify-between">
                   <div /> {/* Spacer */}
                   {/* $50 Milestone - Lotus */}
                   <div className="relative -ml-4">
                     <div className={`transition-all duration-500 ${total >= 50 ? 'scale-110 opacity-100' : 'scale-75 opacity-20 grayscale'}`}>
                       <Flower size={24} className={total >= 50 ? 'text-neon-gold animate-spin-slow' : 'text-white'} />
                       {total >= 50 && total < 100 && (
                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-anthracite" />
                       )}
                     </div>
                   </div>
                   
                   {/* $100 Milestone - Hanuman/Wind */}
                   <div className="relative">
                      <div className={`transition-all duration-500 ${total >= 100 ? 'scale-125 opacity-100' : 'scale-75 opacity-20 grayscale'}`}>
                        {total >= 100 ? (
                           <motion.div 
                             animate={{ x: [-5, 5, -5] }} 
                             transition={{ repeat: Infinity, duration: 2 }}
                           >
                             <Wind size={24} className="text-neon-teal" />
                           </motion.div>
                        ) : (
                           <Lock size={20} className="text-white" />
                        )}
                      </div>
                   </div>
                </div>

                <p className="text-[10px] text-center mt-3 text-gray-400 uppercase tracking-widest">{status.next}</p>
              </div>
            )}
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl animate-pulse">
                    🧘
                  </div>
                  <h3 className="font-black text-anthracite text-lg mb-2">Karma is Empty</h3>
                  <p className="font-medium text-gray-400 text-sm max-w-[200px]">
                    Add items to the ledger to unlock spiritual (and physical) rewards.
                  </p>
                  <button 
                    onClick={() => { playSound('click'); onClose(); }}
                    className="mt-6 text-neon-purple font-bold underline decoration-2 underline-offset-4 hover:text-anthracite transition-colors"
                  >
                    Start Accumulating
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${item.id}-${idx}`}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-anthracite leading-tight">{item.name}</h4>
                          <span className="font-bold text-sm text-anthracite">${item.price * item.quantity}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-500 font-bold uppercase">
                          Qty: {item.quantity}
                        </div>
                        <button 
                          onClick={() => { playSound('click'); onRemove(idx); }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
              {/* Active Rewards Display */}
              <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                {total >= 50 && (
                   <div className="flex items-center gap-2 px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 rounded-lg text-[10px] font-bold text-neon-purple whitespace-nowrap">
                     <Flower size={12} /> Sticker Pack Applied
                   </div>
                )}
                {total >= 100 && (
                   <div className="flex items-center gap-2 px-3 py-1 bg-neon-teal/10 border border-neon-teal/20 rounded-lg text-[10px] font-bold text-neon-teal whitespace-nowrap">
                     <Wind size={12} /> Express Shipping
                   </div>
                )}
              </div>

              <div className="flex justify-between mb-4 font-black text-2xl text-anthracite items-end">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">Total Karma</span>
                <span>${total}</span>
              </div>
              <Button 
                fullWidth 
                onClick={onCheckout} 
                className="shadow-none py-4 text-base"
                disabled={cart.length === 0}
              >
                {cart.length === 0 ? 'Ledger Empty' : 'Proceed to Moksha'} <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
