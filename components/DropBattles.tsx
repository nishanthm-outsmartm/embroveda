import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BATTLE_CONTENDERS } from '../constants';
import { Zap, Flame, Check, Lock } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

export const DropBattles: React.FC = () => {
  const [hasVoted, setHasVoted] = useState<string | null>(null);
  const [votes, setVotes] = useState({
    indra: BATTLE_CONTENDERS[0].votes,
    agni: BATTLE_CONTENDERS[1].votes
  });

  const totalVotes = votes.indra + votes.agni;

  const handleVote = (id: string) => {
    if (hasVoted) return;
    
    setHasVoted(id);
    setVotes(prev => ({
      ...prev,
      [id]: prev[id as keyof typeof prev] + 1
    }));

    // Street fighter hit effect
    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: id === 'indra' ? ['#60A5FA', '#FFFFFF'] : ['#EF4444', '#FBBF24']
    });
  };

  return (
    <section className="py-24 bg-anthracite relative overflow-hidden text-white border-y-8 border-neon-gold">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-red-600 rounded-sm skew-x-[-12deg] mb-4 shadow-neon">
            <span className="text-white text-xs font-black tracking-widest uppercase skew-x-[12deg] block">The Colosseum</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black font-sans uppercase tracking-tighter italic">
            DROP <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">BATTLES</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto font-medium">
            You decide what we make next. Vote to manufacture your favorite design and unlock exclusive early access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          
          {/* VS Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-24 h-24 bg-neon-gold rounded-full border-8 border-anthracite shadow-[0_0_30px_rgba(250,204,21,0.5)]">
            <span className="text-4xl font-black text-anthracite italic pr-1">VS</span>
          </div>

          {BATTLE_CONTENDERS.map((contender) => {
            const isWinner = hasVoted === contender.id;
            const percent = Math.round((votes[contender.id as keyof typeof votes] / (totalVotes + (hasVoted ? 1 : 0))) * 100);
            
            return (
              <motion.div 
                key={contender.id}
                className={`relative rounded-3xl overflow-hidden border-4 transition-all duration-500 group cursor-pointer ${
                  hasVoted && !isWinner ? 'opacity-50 grayscale scale-95 border-gray-700' : 
                  contender.theme === 'blue' ? 'border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                }`}
                onClick={() => handleVote(contender.id)}
                whileHover={!hasVoted ? { scale: 1.02 } : {}}
              >
                {/* Image */}
                <div className="aspect-[3/4] relative">
                  <div className={`absolute inset-0 bg-gradient-to-t ${contender.theme === 'blue' ? 'from-blue-900/80' : 'from-red-900/80'} to-transparent z-10`}></div>
                  <img src={contender.image} alt={contender.name} className="w-full h-full object-cover" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <div className="flex items-center gap-2 mb-2">
                       {contender.theme === 'blue' ? <Zap className="text-blue-400 fill-current" /> : <Flame className="text-red-400 fill-current" />}
                       <span className={`text-xs font-black uppercase tracking-widest ${contender.theme === 'blue' ? 'text-blue-400' : 'text-red-400'}`}>Prototype</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase italic leading-none mb-2">{contender.name}</h3>
                    <p className="text-sm text-gray-300 font-medium mb-6 line-clamp-2">{contender.description}</p>
                    
                    {!hasVoted ? (
                      <button className={`w-full py-4 font-black uppercase tracking-widest transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                        contender.theme === 'blue' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-600 hover:bg-red-500'
                      }`}>
                        Vote to Cop
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-bold uppercase">
                          <span>Votes</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="h-4 bg-black/50 rounded-full overflow-hidden border border-white/10">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${contender.theme === 'blue' ? 'bg-blue-500' : 'bg-red-500'}`}
                          />
                        </div>
                        {isWinner && (
                           <motion.div 
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-400 text-sm font-bold flex items-center justify-center gap-2"
                           >
                             <Check size={16} /> VOTE RECORDED
                           </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reward Section - Unlocks after voting */}
        {hasVoted && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="max-w-md mx-auto mt-12 text-center bg-white/10 backdrop-blur rounded-2xl p-6 border border-neon-gold/50"
          >
            <div className="w-12 h-12 bg-neon-gold rounded-full flex items-center justify-center mx-auto mb-4 text-anthracite">
              <Lock size={20} />
            </div>
            <h4 className="text-xl font-black text-neon-gold mb-2">ACCESS GRANTED</h4>
            <p className="text-sm text-gray-300 mb-4">You've secured priority access for the winning drop.</p>
            <div className="bg-black py-3 px-6 rounded font-mono text-lg tracking-widest border border-white/20 select-all cursor-pointer hover:border-neon-gold transition-colors">
              FUTURE-VIP-25
            </div>
            <p className="text-[10px] text-gray-500 mt-2 uppercase">Copy code for 10% off your next order</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};