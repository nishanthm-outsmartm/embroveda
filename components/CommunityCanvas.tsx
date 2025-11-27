
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eraser, Download, Check, Users, Palette } from 'lucide-react';
import { Button } from './Button';
import { useSound } from '../contexts/SoundContext';

interface CommunityCanvasProps {
  onBack: () => void;
}

const GRID_SIZE = 20;
const COLORS = [
  '#FACC15', // Neon Gold
  '#A855F7', // Neon Purple
  '#2DD4BF', // Neon Teal
  '#EF4444', // Red
  '#FFFFFF', // White
  '#1A1A1A', // Anthracite
];

export const CommunityCanvas: React.FC<CommunityCanvasProps> = ({ onBack }) => {
  const { playSound } = useSound();
  const [grid, setGrid] = useState<string[]>(Array(GRID_SIZE * GRID_SIZE).fill('transparent'));
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [inkSupply, setInkSupply] = useState(5);
  const [totalContributors, setTotalContributors] = useState(1240);

  // Initialize with some random "community" art
  useEffect(() => {
    const newGrid = [...grid];
    // Create a glitchy pattern
    for (let i = 0; i < 50; i++) {
      const idx = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
      newGrid[idx] = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    setGrid(newGrid);
  }, []);

  const handlePixelClick = (index: number) => {
    if (inkSupply <= 0) {
      playSound('click'); // Or an error sound ideally
      return;
    }
    
    const newGrid = [...grid];
    if (newGrid[index] !== selectedColor) {
      newGrid[index] = selectedColor;
      setGrid(newGrid);
      setInkSupply(prev => prev - 1);
      playSound('click');
    }
  };

  const downloadCanvas = () => {
    playSound('success');
    alert("Canvas snapshot saved! You are now part of the history.");
  };

  return (
    <div className="min-h-screen bg-anthracite text-white pt-24 pb-12 px-4 md:px-6 relative overflow-hidden">
      
      {/* Background Grid Texture */}
      <div className="absolute inset-0 z-0 opacity-20" 
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button 
            onClick={() => { playSound('click'); onBack(); }}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-neon-gold transition-colors"
          >
            <ArrowLeft size={18} /> Back to Shop
          </button>
          
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Users size={16} className="text-neon-teal" />
            <span className="text-xs font-bold uppercase tracking-wider">{totalContributors} Artists Contributing</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Controls Side */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-8">
            <div>
              <h1 className="text-4xl font-black font-sans uppercase italic leading-none mb-2">
                Collective <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-teal">Tapestry</span>
              </h1>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                We are designing the next drop together. Every verified buyer gets 5 Ink Drops to leave their mark.
                Once the canvas is full, we print it.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                   <Palette size={14} /> Ink Supply
                </span>
                <span className="text-neon-gold font-black text-xl">{inkSupply}</span>
              </div>
              <div className="flex gap-1 h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`flex-1 transition-colors ${i < inkSupply ? 'bg-neon-gold' : 'bg-transparent'}`} />
                ))}
              </div>
              <p className="text-[10px] text-gray-500 uppercase">Refills with every purchase</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Select Pigment</h3>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => { playSound('click'); setSelectedColor(color); }}
                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-lg ${selectedColor === color ? 'border-white scale-110 ring-2 ring-white/50' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <button
                  onClick={() => { playSound('click'); setSelectedColor('transparent'); }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center bg-gray-800 transition-transform hover:scale-110 ${selectedColor === 'transparent' ? 'border-white ring-2 ring-white/50' : 'border-gray-600'}`}
                  title="Eraser"
                >
                  <Eraser size={16} />
                </button>
              </div>
            </div>

            <Button fullWidth onClick={downloadCanvas} disabled={inkSupply > 0} variant={inkSupply === 0 ? 'primary' : 'outline'}>
              {inkSupply > 0 ? 'Use All Ink to Save' : 'Download Snapshot'} <Download size={18} className="ml-2" />
            </Button>
          </div>

          {/* Canvas Side */}
          <div className="lg:col-span-8 order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Frame */}
              <div className="absolute -inset-4 border-2 border-dashed border-white/20 rounded-xl pointer-events-none"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-neon-purple to-neon-teal opacity-20 blur-xl rounded-xl"></div>
              
              <div 
                className="bg-gray-900 border border-gray-800 shadow-2xl relative z-10"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                  width: 'min(100%, 500px)',
                  aspectRatio: '1/1',
                }}
              >
                {grid.map((color, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 0.9, borderRadius: '4px' }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handlePixelClick(idx)}
                    className="cursor-pointer border-[0.5px] border-white/5 transition-colors duration-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              {/* Coordinates Decor */}
              <div className="absolute -bottom-8 left-0 text-[10px] font-mono text-gray-500">X: 00 - {GRID_SIZE}</div>
              <div className="absolute -right-8 bottom-0 text-[10px] font-mono text-gray-500 rotate-90 origin-bottom-left">Y: 00 - {GRID_SIZE}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
