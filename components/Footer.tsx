import React from 'react';
import { Instagram, Twitter, Youtube, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-anthracite text-white pt-20 pb-10 border-t-8 border-neon-gold">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black font-sans mb-6 tracking-tighter">EMBRO<span className="text-neon-purple">VEDA</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              Reimagining Indian mythology through the lens of modern streetwear. 
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-purple hover:text-white transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-neon-gold">Collections</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">New Drops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Myth Pop</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Essentials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-neon-gold">Support</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 text-neon-gold">The Inner Circle</h4>
            <p className="text-gray-400 text-sm mb-4">Join for early access to drops.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm w-full focus:outline-none focus:border-neon-purple rounded-l-lg"
              />
              <button className="bg-neon-purple px-4 rounded-r-lg hover:bg-neon-purple/80 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-medium uppercase tracking-wide">
          <p>&copy; 2024 EmbroVeda. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};