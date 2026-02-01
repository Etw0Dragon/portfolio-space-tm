import React from 'react';
import { motion } from 'framer-motion';
import { Server, Terminal, Code2 } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4 flex items-center justify-center relative bg-cosmic-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-cosmic-800/80 p-8 rounded-2xl border border-cosmic-700 backdrop-blur-md shadow-2xl relative group"
          >
             <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
             <div className="relative z-10">
                <h2 className="text-3xl font-display font-bold mb-6 text-white flex items-center gap-3">
                  <span className="text-cosmic-500">01.</span> Qui suis-je ?
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Salut ! Je suis Tom, j'ai 17 ans et je suis passionné par ce qui se passe derrière la machine. 
                  Mon terrain de jeu se situe entre le développement d'applications modernes et 
                  l'administration système. J'aime construire des outils robustes, optimisés et 
                  sécurisés.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Server className="w-5 h-5 text-cosmic-500" />
                    <span>Fan de <strong className="text-white">Self-hosting</strong> & HomeLab</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Terminal className="w-5 h-5 text-cosmic-500" />
                    <span>Amoureux du terminal <strong className="text-white">Linux</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Code2 className="w-5 h-5 text-cosmic-500" />
                    <span>Créateur de <strong className="text-white">projets personnels</strong></span>
                  </div>
                </div>
             </div>
          </motion.div>

          {/* Context/Visual */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
             <h3 className="text-2xl font-orbitron mb-4 text-cosmic-100">Objectif </h3>
             <p className="text-gray-400 hover:text-gray-200 transition-colors duration-300 text-lg">
               Je suis actuellement à la recherche d'une <span className="text-cosmic-500 font-bold">alternance</span> pour mettre mes compétences en orbite dans un environnement professionnel stimulant. J'ai l'envie d'apprendre au près de professionnels expérimentés et de contribuer activement à des projets innovants.
             </p>
             
             <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="p-4 bg-cosmic-800 rounded-lg border border-cosmic-700/50">
                 <div className="text-3xl font-bold text-white mb-1">0</div>
                 <div className="text-sm text-gray-400">Années d'exp. personnelle</div>
               </div>
               <div className="p-4 bg-cosmic-800 rounded-lg border border-cosmic-700/50">
                 <div className="text-3xl font-bold text-white mb-1">+∞</div>
                 <div className="text-sm text-gray-400">Motivation</div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
