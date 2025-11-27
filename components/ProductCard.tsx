import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound, SoundType } from '../contexts/SoundContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onQuickAdd }) => {
  const { playSound } = useSound();

  const handleMouseEnter = () => {
    // Play specific sound based on product profile, or fallback to hover
    if (product.soundProfile) {
      playSound(product.soundProfile as SoundType);
    } else {
      playSound('hover');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer relative"
      onClick={() => onClick(product)}
      onMouseEnter={handleMouseEnter}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4 border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-neon-purple/20">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <img 
          src={product.hoverImage} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tags.map((tag, i) => (
             <span key={i} className={`px-3 py-1 text-[10px] font-black uppercase tracking-wide rounded-md border border-anthracite shadow-hard ${i === 0 ? 'bg-neon-gold text-anthracite' : 'bg-white text-anthracite'}`}>
               {tag}
             </span>
          ))}
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onQuickAdd(product); }}
          className="absolute bottom-4 right-4 bg-white text-anthracite p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-anthracite hover:text-white border-2 border-transparent hover:border-white"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>

      {/* Info */}
      <div className="flex justify-between items-start px-2">
        <div>
          <h3 className="font-sans font-bold text-lg text-anthracite leading-tight mb-1 group-hover:text-neon-purple transition-colors">{product.name}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{product.category}</p>
        </div>
        <div className="flex flex-col items-end">
           <span className="font-black text-lg text-anthracite">${product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};