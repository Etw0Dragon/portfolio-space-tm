import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative localized glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cosmic-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center z-10 max-w-2xl mx-auto"
      >
        <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-4">05. TRANSMISSION</span>
        <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">
          Entrer en <br />
          <span className="bg-gradient-to-r from-cosmic-500 to-blue-500 bg-clip-text text-transparent">Communication</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Prêt à explorer de nouveaux systèmes ensemble ? <br/>
          Mon canal est ouvert pour toute proposition de mission ou d'alternance.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <motion.a
            href="https://github.com/Etw0Dragon"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, boxShadow: "0 10px 20px -10px rgba(127, 90, 240, 0.5)" }}
            className="flex items-center gap-3 px-8 py-4 bg-cosmic-800 border border-cosmic-700 rounded-full text-white hover:border-cosmic-500 hover:bg-cosmic-700 transition-all group"
          >
            <Github className="w-5 h-5 group-hover:text-cosmic-500 transition-colors" />
            <span>GitHub</span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/tom-moreau-392690332"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, boxShadow: "0 10px 20px -10px rgba(127, 90, 240, 0.5)" }}
            className="flex items-center gap-3 px-8 py-4 bg-cosmic-800 border border-cosmic-700 rounded-full text-white hover:border-cosmic-500 hover:bg-cosmic-700 transition-all group"
          >
            <Linkedin className="w-5 h-5 group-hover:text-cosmic-500 transition-colors" />
            <span>LinkedIn</span>
          </motion.a>

          <motion.a
            href="mailto:tom.alcyone@tmfolio.site"
            whileHover={{ y: -5, boxShadow: "0 10px 20px -10px rgba(127, 90, 240, 0.5)" }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cosmic-500 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-cosmic-500/20 group"
          >
            <Mail className="w-5 h-5" />
            <span>Me Contacter</span>
            <Send className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <footer className="text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Tom Moreau. Conçu dans le cosmos et la passion.</p>
        </footer>
      </motion.div>
    </section>
  );
};

export default Contact;
