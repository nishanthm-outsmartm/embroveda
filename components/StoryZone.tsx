import React from 'react';
import { motion } from 'framer-motion';

export const StoryZone: React.FC = () => {
  return (
    <section className="py-24 bg-anthracite text-white relative overflow-hidden">
      {/* Background Glyphs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="text-[20rem] font-serif absolute top-0 right-0 leading-none">🕉️</div>
        <div className="text-[15rem] font-serif absolute bottom-0 left-0 leading-none rotate-180">🔱</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-gold font-bold tracking-[0.2em] text-sm uppercase mb-2 block">The Legend</span>
          <h2 className="text-4xl md:text-6xl font-black font-sans mb-6">WEAR THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-teal">STORY</span></h2>
          <p className="max-w-xl mx-auto text-gray-400">Every thread carries a verse. Every print tells a myth. Don't just wear it, represent it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "The Vanara", 
              desc: "Born of the wind. A symbol of strength, devotion, and absolute will.",
              icon: "🛡️",
              color: "border-neon-gold shadow-neon-gold/50"
            },
            { 
              title: "The Destroyer", 
              desc: "Dance of destruction. To create the new, the old must burn.",
              icon: "🔥",
              color: "border-neon-purple shadow-neon-purple/50"
            },
            { 
              title: "The Chakra", 
              desc: "Time is cyclical. Karma returns. The wheel never stops turning.",
              icon: "🌀",
              color: "border-neon-teal shadow-neon-teal/50"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-anthracite border-2 ${item.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};