import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Terminal, Cpu, Info, X, ShieldCheck, HardDrive } from 'lucide-react';

const projects = [
  {
    id: "alcyone",
    title: "AlcyoneOS",
    description: "Système d'exploitation basé sur Linux personnalisé, optimisé pour la performance et la sécurité des infrastructures.",
    tags: ["Linux", "Kernel", "Security", "Bash"],
    icon: <Cpu className="w-8 h-8 text-cosmic-500" />
  },
  {
    id: "homelab",
    title: "Infrastructure HomeLab",
    description: "Environnement de virtualisation haute disponibilité sous Proxmox. Segmentation réseau et isolation des services.",
    tags: ["Proxmox", "VLAN", "Docker", "ZFS"],
    icon: <Server className="w-8 h-8 text-cosmic-500" />,
    hasDetail: true
  },
  {
    id: "portfolio-cli",
    title: "Portfolio CLI Style",
    description: "Interface en ligne de commande interactive pour explorer mon parcours de manière originale.",
    tags: ["TypeScript", "Node.js", "CLI", "Ink"],
    icon: <Terminal className="w-8 h-8 text-cosmic-500" />
  }
];

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedId);

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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Projets Actifs</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              onClick={() => project.hasDetail && setSelectedId(project.id)}
              className={`group relative bg-cosmic-800/40 backdrop-blur-sm border border-cosmic-700/50 rounded-xl overflow-hidden hover:border-cosmic-500 transition-colors duration-300 ${project.hasDetail ? 'cursor-pointer' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-cosmic-900/50 rounded-lg border border-cosmic-700 group-hover:border-cosmic-500 transition-colors">
                    {project.icon}
                  </div>
                  {project.hasDetail && (
                    <div className="text-cosmic-500 flex items-center gap-1 text-xs font-orbitron opacity-0 group-hover:opacity-100 transition-opacity">
                      <Info size={14} /> DÉTAILS
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cosmic-500 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
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

      {/* Modal for Homelab Detail */}
      <AnimatePresence>
        {selectedId === 'homelab' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-cosmic-900/90 backdrop-blur-xl"
            />
            
            <motion.div
              layoutId="homelab"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-cosmic-800 border border-cosmic-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 md:p-10">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-cosmic-500/20 rounded-xl border border-cosmic-500/50">
                    <Server className="w-8 h-8 text-cosmic-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white font-display">Architecture HomeLab</h2>
                    <p className="text-cosmic-500 font-orbitron text-sm">PLAN RÉSEAU & INFRASTRUCTURE</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                        <Cpu size={18} className="text-cosmic-500" /> Compute (Proxmox CLuster)
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Architecture basée sur 3 nodes physiques. Gestion de la haute disponibilité (HA) pour les services critiques. VMs Linux et LXC optimisés.
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                        <Database size={18} className="text-cosmic-500" /> Stockage & Données
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Pools ZFS avec réplication. Les bases de données sont isolées sur des instances dédiées, séparées des serveurs d'applications (Network segmentation).
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 text-white font-bold mb-3">
                        <ShieldCheck size={18} className="text-cosmic-500" /> Sécurité & Backups
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Backups automatisés (3-2-1 rule). Exportation hebdomadaire chiffrée vers un stockage hors-site. Pare-feu strict inter-VLAN.
                      </p>
                    </div>
                  </div>

                  <div className="bg-cosmic-900/50 rounded-xl p-6 border border-cosmic-700/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <HardDrive size={120} />
                    </div>
                    <h4 className="text-white font-bold mb-4 font-orbitron text-sm underline decoration-cosmic-500 underline-offset-4">SERVICES DÉPLOYÉS</h4>
                    <ul className="space-y-3">
                      {[
                        "Docker Swarm / Stack Compose",
                        "Reverse Proxy (Traefik/Nginx)",
                        "Monitoring (Prometheus/Grafana)",
                        "Vaultwarden (Gestionnaire de mots de passe)",
                        "Nextcloud (Cloud Personnel)",
                        "Solution de Backup (Proxmox Backup Server)"
                      ].map(service => (
                        <li key={service} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cosmic-500" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-cosmic-700 flex justify-end">
                  <button 
                    onClick={() => setSelectedId(null)}
                    className="px-6 py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Fermer le plan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
