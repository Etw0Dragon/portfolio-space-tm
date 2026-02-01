import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Langages & Frameworks",
    items: ["HTML/CSS", "TypeScript", "Golang", "Astro, Meteor.js", "Next.js", "C"]
  },
  {
    category: "Systèmes & Infra",
    items: ["Linux (Debian/Arch)", "Docker, Podman", "Proxmox", "Bash Scripting", "Qemu/KVM, Vmware, VirtualBox"]
  },
  {
    category: "Outils & DevOps",
    items: ["Git", "GitHub Actions", "Traefik", "Nginx", "VS Code", "Portainer"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-4 z-10">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">02. COMPÉTENCES</span>
          <h2 className="text-4xl font-display font-bold text-white">Technolologies Maîtrisées</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700/30 p-6 rounded-2xl hover:border-cosmic-500/50 transition-colors duration-300"
            >
              <h3 className="text-xl font-orbitron text-cosmic-100 mb-6 border-b border-cosmic-700 pb-2">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1, textShadow: "0 0 8px rgb(127,90,240)" }}
                    className="px-4 py-2 bg-cosmic-900/80 rounded-full text-sm font-medium text-cosmic-100 border border-cosmic-700 hover:border-cosmic-500 transition-all cursor-default shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(127,90,240,0.3)]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
       
      {/* Decorative Orbit Lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border border-cosmic-700/10 rounded-full -z-10 pointer-events-none animate-spin-slow duration-[100s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-cosmic-700/10 rounded-full -z-10 pointer-events-none"></div>
    </section>
  );
};

export default Skills;
