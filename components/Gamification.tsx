import React, { useState } from 'react';
import { Button } from './Button';
import { QUIZ_DATA } from '../constants';
import { Trophy, Star, Gift } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

export const Gamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'spin'>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === QUIZ_DATA[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      if (score + (optionIndex === QUIZ_DATA[currentQuestion].correct ? 1 : 0) === QUIZ_DATA.length) {
        fireConfetti();
      }
    }
  };

  const fireConfetti = () => {
    canvasConfetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#FACC15', '#2DD4BF']
    });
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      const rewards = ['15% OFF', 'Free Shipping', 'Mystery Sticker', 'No Luck'];
      const result = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(result);
      if (result !== 'No Luck') fireConfetti();
    }, 2000);
  };

  return (
    <section className="py-24 bg-soft-pink/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 rotate-12">🎮</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 -rotate-12">🎲</div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-neon-purple/10 rounded-full mb-4">
            <span className="text-neon-purple text-xs font-black tracking-widest uppercase">Gen Z Zone</span>
          </div>
          <h2 className="text-4xl font-black font-sans text-anthracite mb-4">PLAY TO WIN</h2>
          <p className="text-gray-500">Unlock exclusive discounts and badges.</p>
          
          <div className="flex justify-center gap-2 mt-8 bg-white p-2 rounded-2xl w-fit mx-auto shadow-sm">
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'quiz' ? 'bg-anthracite text-white' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              Myth Quiz
            </button>
            <button 
              onClick={() => setActiveTab('spin')}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'spin' ? 'bg-anthracite text-white' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              Daily Spin
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-[32px] border-4 border-anthracite shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative overflow-hidden">
          {activeTab === 'quiz' ? (
            <div className="transition-all duration-500">
              {!quizComplete ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500 uppercase">Q: {currentQuestion + 1}/{QUIZ_DATA.length}</span>
                    <span className="flex items-center text-neon-gold font-bold"><Trophy size={18} className="mr-1" /> XP: {score * 100}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-8 text-center leading-tight">{QUIZ_DATA[currentQuestion].question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUIZ_DATA[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="p-4 border-2 border-gray-100 rounded-xl hover:border-neon-purple hover:bg-neon-purple/5 transition-all text-left font-bold"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-neon-gold rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-neon">
                     🏆
                  </div>
                  <h3 className="text-3xl font-black mb-2">Quiz Complete!</h3>
                  <p className="text-gray-600 mb-8 font-medium">You scored {score} out of {QUIZ_DATA.length}</p>
                  {score === QUIZ_DATA.length && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-xl border-2 border-green-200 mb-6 font-mono text-sm">
                      CODE: <span className="font-bold">MYTHMASTER20</span>
                    </div>
                  )}
                  <Button fullWidth onClick={() => { setQuizComplete(false); setCurrentQuestion(0); setScore(0); }}>Play Again</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
               <div className="relative w-48 h-48 mx-auto mb-8">
                 <div className={`w-full h-full rounded-full border-[6px] border-anthracite border-dashed flex items-center justify-center bg-yellow-50 ${isSpinning ? 'animate-spin' : ''}`}>
                    <Star size={48} className="text-neon-gold drop-shadow-md" fill="currentColor" />
                 </div>
               </div>
               
               {spinResult ? (
                 <div className="mb-8 animate-bounce">
                   <h4 className="text-2xl font-black text-neon-purple">You won: {spinResult}!</h4>
                 </div>
               ) : (
                 <p className="mb-8 text-gray-500 font-medium">Spin the Chakra wheel for exclusive discounts.</p>
               )}
               
               <Button onClick={handleSpin} disabled={isSpinning} variant="secondary" fullWidth className="text-lg">
                 {isSpinning ? 'Spinning...' : 'SPIN NOW'}
               </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};