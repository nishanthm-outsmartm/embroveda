
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, RefreshCcw } from 'lucide-react';
import { ORACLE_QUESTIONS, PRODUCTS } from '../constants';
import { Product } from '../types';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';

interface OracleProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProduct: (product: Product) => void;
}

export const Oracle: React.FC<OracleProps> = ({ isOpen, onClose, onViewProduct }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [match, setMatch] = useState<Product | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { playSound } = useSound();

  const handleOptionSelect = (trait: string) => {
    playSound('click');
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);

    if (step < ORACLE_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      analyzeFate(newAnswers);
    }
  };

  const analyzeFate = (finalAnswers: string[]) => {
    setIsAnalyzing(true);
    // Simulate AI thinking
    setTimeout(() => {
      // Simple matching algorithm: Find product with most overlapping traits
      let bestMatch = PRODUCTS[0];
      let maxScore = -1;

      PRODUCTS.forEach(product => {
        if (!product.oracleTraits) return;
        let score = 0;
        finalAnswers.forEach(ans => {
          if (product.oracleTraits?.includes(ans)) score++;
        });
        
        // Add some randomness if score is tie
        if (score > maxScore) {
          maxScore = score;
          bestMatch = product;
        }
      });

      setMatch(bestMatch);
      setIsAnalyzing(false);
      playSound('success');
    }, 2000);
  };

  const resetOracle = () => {
    setStep(0);
    setAnswers([]);
    setMatch(null);
    setIsAnalyzing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 font-sans"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <div className="max-w-xl w-full text-center relative">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

          {!match && !isAnalyzing && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                <Sparkles className="text-neon-gold animate-spin-slow" size={32} />
              </div>
              
              <h2 className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em] mb-4">The Oracle Asks</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-12 leading-tight">
                {ORACLE_QUESTIONS[step].question}
              </h3>

              <div className="grid gap-4">
                {ORACLE_QUESTIONS[step].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleOptionSelect(opt.trait)}
                    className="p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-neon-purple/20 hover:border-neon-purple hover:scale-105 transition-all text-left group"
                  >
                    <span className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors">{opt.label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {ORACLE_QUESTIONS.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-neon-gold' : 'bg-gray-700'}`} />
                ))}
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mb-8"></div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-teal animate-pulse">
                READING YOUR AURA...
              </h3>
            </motion.div>
          )}

          {match && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-anthracite border border-neon-gold/30 p-8 rounded-[40px] shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-purple via-neon-gold to-neon-teal"></div>
              
              <div className="text-neon-gold font-serif italic text-xl mb-4">"The stars have aligned..."</div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                <div className="w-full md:w-1/2 aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => { onClose(); onViewProduct(match); }}>
                   <img src={match.image} alt={match.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <div className="text-xs font-black bg-white/10 text-white px-2 py-1 rounded inline-block mb-4 uppercase tracking-wider">
                    Your Archetype
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4 leading-none uppercase">{match.name}</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Your energy is chaotic yet powerful. You do not seek to fit in, but to transcend. This artifact was forged for your spirit.
                  </p>
                  <Button fullWidth onClick={() => { onClose(); onViewProduct(match); }} className="bg-neon-gold text-anthracite hover:bg-white border-none mb-3">
                    Claim Your Destiny <ArrowRight size={18} className="ml-2" />
                  </Button>
                  <button onClick={resetOracle} className="flex items-center justify-center w-full text-gray-500 hover:text-white text-sm gap-2 mt-4 transition-colors">
                    <RefreshCcw size={14} /> Consult the Oracle Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
