
import React, { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from 'framer-motion';

interface MantraLineProps {
  text: string;
  baseVelocity: number;
  direction: 1 | -1;
}

const MantraLine: React.FC<MantraLineProps> = ({ text, baseVelocity, direction }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Chaos Effects based on velocity
  const skew = useTransform(smoothVelocity, [-1000, 0, 1000], [-30, 0, 30]);
  const blur = useTransform(smoothVelocity, [-1000, 0, 1000], [8, 0, 8]);
  const opacity = useTransform(smoothVelocity, [-1000, 0, 1000], [0.2, 0.1, 0.2]);
  
  // Order Effect (Glow) when velocity is near 0
  const glow = useTransform(smoothVelocity, (v) => {
    const absV = Math.abs(v);
    if (absV < 50) return '0 0 10px rgba(250, 204, 21, 0.3)'; // Gold glow
    return 'none';
  });

  const color = useTransform(smoothVelocity, (v) => {
      const absV = Math.abs(v);
      if (absV > 500) return '#A855F7'; // Neon Purple in chaos
      return 'rgba(0,0,0,0.05)'; // Subtle dark in order
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  useAnimationFrame((t, delta) => {
    let moveBy = direction * baseVelocity * (delta / 1000);

    // Speed up based on scroll
    if (velocityFactor.get() < 0) {
      direction === 1 ? (moveBy += velocityFactor.get()) : (moveBy -= velocityFactor.get());
    } else {
      direction === 1 ? (moveBy += velocityFactor.get()) : (moveBy -= velocityFactor.get());
    }

    moveBy += direction * moveBy;

    baseX.set(baseX.get() + moveBy);
    
    // Loop
    if (baseX.get() <= -100) {
        baseX.set(0);
    } else if (baseX.get() >= 0) {
        baseX.set(-100);
    }
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap mb-8 pointer-events-none select-none">
      <motion.div 
        className="flex gap-8 text-[8rem] md:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter"
        style={{ 
            x, 
            skewX: skew, 
            filter: useTransform(blur, (v) => `blur(${v}px)`),
            textShadow: glow,
            color: color,
            opacity: 1
        }}
      >
        <span className="block mr-12">{text}</span>
        <span className="block mr-12">{text}</span>
        <span className="block mr-12">{text}</span>
        <span className="block mr-12">{text}</span>
      </motion.div>
    </div>
  );
};

export const MantraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 flex flex-col justify-center pointer-events-none opacity-50 mix-blend-multiply overflow-hidden">
      <MantraLine text="AHAM BRAHMASMI" baseVelocity={-2} direction={1} />
      <MantraLine text="SAT CHIT ANANDA" baseVelocity={2} direction={-1} />
      <MantraLine text="TAT TVAM ASI" baseVelocity={-2} direction={1} />
      <MantraLine text="OM NAMAH SHIVAYA" baseVelocity={2} direction={-1} />
    </div>
  );
};
