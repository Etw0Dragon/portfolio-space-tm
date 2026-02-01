import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: "C", icon: "/img/c.png", color: "#a8b9cc" },
  { name: "Go", icon: "/img/go.png", color: "#00add8" },
  { name: "K3S", icon: "/img/K3S.png", color: "#326ce5" },
  { name: "Docker", icon: "/img/docker.png", color: "#2496ed" },
  { name: "Linux", icon: "/img/linux.png", color: "#fcc624" },
  { name: "Git", icon: "/img/git.png", color: "#f05032" },
  { name: "Astro", icon: "/img/astro.png", color: "#ff5d01" },
  { name: "TypeScript", icon: "/img/typescript.png", color: "#3178c6" },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-cosmic-900/50 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
          >
            <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">04. COMPÉTENCES</span>
            <h2 className="text-4xl font-display font-bold text-white mb-4">Stack Technique</h2>
            <div className="w-20 h-1 bg-cosmic-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, borderColor: skill.color }}
              className="bg-cosmic-800/30 backdrop-blur-sm border border-cosmic-700/50 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group transition-all duration-300"
            >
              <div 
                className="w-16 h-16 rounded-xl bg-cosmic-900/50 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: `0 0 20px ${skill.color}15` }}
              >
                <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-sm font-orbitron text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
