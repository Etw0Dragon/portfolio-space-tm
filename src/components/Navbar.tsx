import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-cosmic-900/80 backdrop-blur-md border-b border-cosmic-700/50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-orbitron font-bold text-white tracking-tighter">
          PORT<span className="text-cosmic-500">FOLIO</span>
        </a>

        <div className="flex gap-8 items-center">
          <a href="/" className="text-sm font-medium text-gray-300 hover:text-cosmic-500 transition-colors uppercase tracking-widest font-orbitron">
            Accueil
          </a>
          <a href="/terminal" className="text-sm font-medium text-gray-300 hover:text-cosmic-500 transition-colors uppercase tracking-widest font-orbitron px-4 py-2 border border-cosmic-500/30 rounded-lg bg-cosmic-500/10">
            Terminal CLI
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
