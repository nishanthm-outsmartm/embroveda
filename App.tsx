
import React from 'react';
import { ComingSoon } from './components/ComingSoon';
import { SoundProvider } from './contexts/SoundContext';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <SoundProvider>
      <div className="font-sans text-anthracite min-h-screen bg-anthracite selection:bg-neon-purple selection:text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ComingSoon />
        </motion.div>
      </div>
    </SoundProvider>
  );
}

export default App;
