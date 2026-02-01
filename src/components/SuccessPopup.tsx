import React from 'react';
import { motion } from 'framer-motion';

const SuccessPopup: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="bg-cosmic-800/40 backdrop-blur-3xl border border-cosmic-500/30 p-10 md:p-16 rounded-[2rem] shadow-[0_0_100px_rgba(127,90,240,0.15)] max-w-3xl mx-auto relative overflow-hidden"
    >
      {/* Decorative glow inside */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-cosmic-500/20 rounded-full blur-3xl"></div>
      
      <h1 className="text-4xl md:text-6xl font-display font-black mb-8 text-white tracking-tight">
          VOUS AVEZ SURVÉCU À LA <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-500 to-blue-400">SINGULARITÉ</span>
      </h1>
      
      <p className="text-xl text-cosmic-100 font-orbitron mb-8 opacity-80 text-center">
          Félicitations pour cet Easter Egg.
      </p>
      
      <p className="text-gray-400 leading-relaxed mb-12 text-lg max-w-xl mx-auto text-center">
          Votre curiosité vous a mené au-delà de l'horizon des événements. 
          Dans le développement comme dans l'espace, ce sont ceux qui explorent 
          les recoins les plus sombres qui découvrent les plus belles mécaniques.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a href="/terminal" className="px-10 py-4 bg-cosmic-500 text-white rounded-xl font-bold hover:bg-cosmic-700 transition-all shadow-[0_0_20px_rgba(127,90,240,0.4)] text-center text-sm md:text-base">
              Réintégrer le Terminal
          </a>
          <a href="/" className="px-10 py-4 border border-cosmic-700 text-cosmic-100 rounded-xl font-bold hover:bg-cosmic-700/50 transition-all backdrop-blur-sm text-center text-sm md:text-base">
              Retour à l'Accueil
          </a>
      </div>
      
      <div className="mt-12 pt-8 border-t border-cosmic-700/50 text-center">
          <code className="text-cosmic-500 font-mono text-xs md:text-sm uppercase tracking-widest bg-cosmic-900/50 px-4 py-2 rounded-lg">
              STATUS: VOID_SURVIVOR_2026
          </code>
      </div>
    </motion.div>
  );
};

export default SuccessPopup;
