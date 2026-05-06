import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="min-h-[100svh] w-full flex flex-col justify-center items-center relative overflow-hidden px-5 pt-24 pb-20 sm:px-6 md:px-4 md:pt-0 md:pb-0">
      <div className="z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cosmic-500 font-orbitron tracking-widest text-xs sm:text-sm md:text-base mb-4 block">
            BIENVENUE DANS MON ESPACE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-5 md:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Tom Moreau
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 font-light">
            Développeur & Passionné d'Infrastructure
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
            Je conçois des architectures résilientes et des applications performantes. 
            Prêt à explorer les confins du code et du système.
          </p>
          
          <motion.a
            href="#about"
            className="inline-block px-6 py-3 sm:px-8 rounded-full bg-cosmic-500 text-white font-medium text-base md:text-lg hover:bg-cosmic-700 transition-colors duration-300 shadow-[0_0_15px_rgba(127,90,240,0.5)] hover:shadow-[0_0_25px_rgba(127,90,240,0.8)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorer mon univers
          </motion.a>
        </motion.div>
      </div>



      {/* Indicateur scroll */}
      <motion.div 
        className="absolute bottom-5 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs md:text-sm text-gray-500 font-orbitron">SCROLL</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-cosmic-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
