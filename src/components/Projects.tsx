import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Server, Database, Shield, Terminal } from 'lucide-react';

const projects = [
  {
    title: "Homelab ",
    description: "Agencement de 3 serveurs en réseau pour héberger divers services et applications.",
    tags: ["Docker", "Linux", "Hardware", "ZFS"],
    icon: <Database className="w-8 h-8 text-cosmic-500" />,
    link: "#",
    github: "#"
  },
  {
    title: "Cluster K3S",
    description: "Déploiement d'un cluster Kubernetes léger pour expérimenter la gestion de conteneurs à l'échelle.",
    tags: ["K3S", "Raspberry Pi", "Traefik"],
    icon: <Shield className="w-8 h-8 text-cosmic-500" />,
    link: "#",
    github: "#"
  },
  {
    title: "Portfolio CLI Style",
    description: "Une version alternative de portfolio accessible entièrement en ligne de commande pour les puristes du terminal.",
    tags: ["TypeScript", "Node.js", "CLI", "Ink"],
    icon: <Terminal className="w-8 h-8 text-cosmic-500" />,
    link: "#",
    github: "#"
  },
  {
    title: "Lab Proxmox Cluster",
    description: "Infrastructure de virtualisation haute disponibilité pour tester des déploiements Kubernetes et services micro-services.",
    tags: ["Proxmox", "LXC", "K8s", "Ansible"],
    icon: <Server className="w-8 h-8 text-cosmic-500" />,
    link: "#",
    github: "#"
  }
];

const Projects: React.FC = () => {
  const handleProtectedLink = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("closed source for now please wait for public release");
  };

  return (
    <section id="projects" className="py-24 pb-32 relative px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">02. PROJETS</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Missions Accomplies</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              className="group relative bg-cosmic-800/40 backdrop-blur-md border border-cosmic-700/50 rounded-xl overflow-hidden hover:border-cosmic-500 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cosmic-900/50 rounded-lg border border-cosmic-700 group-hover:border-cosmic-500 transition-colors">
                    {project.icon}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href="https://github.com/Etw0Dragon/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="#" 
                      onClick={handleProtectedLink}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cosmic-500 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-cosmic-500 bg-cosmic-900/50 px-3 py-1 rounded-full border border-cosmic-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
