import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden px-4">
      <div className="z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cosmic-500 font-orbitron tracking-widest text-sm md:text-base mb-4 block">
            BIENVENUE DANS MON ESPACE
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Tom Moreau
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            Développeur & Passionné d'Infrastructure
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Je conçois des architectures résilientes et des applications performantes. 
            Prêt à explorer les confins du code et du système.
          </p>
          
          <motion.a
            href="#about"
            className="inline-block px-8 py-3 rounded-full bg-cosmic-500 text-white font-medium text-lg hover:bg-cosmic-700 transition-colors duration-300 shadow-[0_0_15px_rgba(127,90,240,0.5)] hover:shadow-[0_0_25px_rgba(127,90,240,0.8)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorer mon univers
          </motion.a>
        </motion.div>
      </div>

      {/* Planète déco - version clean */}
      <motion.div
        className="absolute -right-20 md:right-20 top-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #7f5af0, transparent 70%)',
          boxShadow: '0 0 80px rgba(127, 90, 240, 0.2)'
        }}
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Indicateur scroll */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm text-gray-500 font-orbitron">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cosmic-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
