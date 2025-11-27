import React from 'react';
import { CATEGORIES } from '../constants';
import { motion } from 'framer-motion';

interface CategoryNavProps {
  selected: string;
  onSelect: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ selected, onSelect }) => {
  return (
    <div className="sticky top-[80px] z-40 py-4 bg-background/95 backdrop-blur border-b border-gray-100 overflow-x-auto scrollbar-hide">
      <div className="container mx-auto px-6">
        <div className="flex space-x-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all border-2 ${
                selected === cat.id
                  ? 'bg-anthracite text-white border-anthracite shadow-[4px_4px_0px_0px_rgba(168,85,247,1)]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-anthracite hover:text-anthracite'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};