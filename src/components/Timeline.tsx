import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from 'framer-motion';

const timelineData = [
  {
    year: "2023",
    title: "2nd pro CIEL",
    location: "Saint aubin la salle",
    description: "Découvertes des bases de la programmation et de l'informatique en général."
  },
  {
    year: "2024",
    title: "Première STI2D",
    location: "Saint aubin la salle",
    description: "Réalisation de projets techniques et découverte de l'informatique industrielle."
  },
  {
    year: "2025",
    title: "Terminale STI2D",
    location: "Saint aubin la salle",
    description: "Approfondissement de mes notions en éléctronique et des systèmes d'informations numériques."
  },
  {
    year: "Futur",
    title: "Objectif : DevOps / Cloud Engineer",
    location: "BUT en alternance dans votre Entreprise ?",
    description: "Prêt à déployer mes compétences sur des projets d'envergure. À la recherche d'une alternance stimulante."
  }
];

const planets = [
  { name: "Docker", logo: "/img/docker.png" },
  { name: "Linux", logo: "/img/linux.png" },
  { name: "Git", logo: "/img/git.png" },
  { name: "Astro", logo: "/img/astro.png" },
  { name: "TypeScript", logo: "/img/typescript.png" },
  { name: "Go", logo: "/img/go.png" },
  { name: "C", logo: "/img/c.png" },
  { name: "K3s", logo: "/img/K3S.png" },
];

interface TimelineItemProps {
  item: typeof timelineData[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, scrollYProgress }) => {
  const x = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [0, index % 2 === 0 ? 1200 : -1200]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.5, 0.6],
    [1, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ x, opacity }}
      className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 hidden md:block"></div>
      
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0 md:-ml-4">
        <div className="w-4 h-4 rounded-full bg-cosmic-500 shadow-[0_0_10px_#7f5af0] z-10 animate-pulse"></div>
        <div className="absolute w-8 h-8 rounded-full border border-cosmic-500 opacity-50 animate-ping"></div>
      </div>

      <div className="flex-1 pb-8 md:pb-0">
        <div className={`bg-cosmic-800/50 p-6 rounded-xl border border-cosmic-700/50 backdrop-blur-sm hover:border-cosmic-500 transition-colors duration-300 ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
          <span className="font-orbitron text-cosmic-500 text-sm font-bold">{item.year}</span>
          <h3 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h3>
          <h4 className="text-gray-400 text-sm mb-4 italic">{item.location}</h4>
          <p className="text-gray-300 leading-relaxed text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const planetsOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const planetsScale = useTransform(scrollYProgress, [0.45, 0.75], [0.8, 1]);
  const pointerEvents = useTransform(planetsOpacity, (v) => v > 0.5 ? "auto" as const : "none" as const);
  
  return (
    <section ref={containerRef} id="timeline" className="h-[280vh] relative bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="max-w-4xl w-full px-4 relative z-20 pt-32 md:pt-40">
          <div className="text-center mb-12 md:mb-16">
             <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">04. PARCOURS</span>
             <h2 className="text-4xl font-display font-bold text-white">Trajectoire Spatiale</h2>
          </div>

          <div className="relative">
            {/* Vertical Line ...existing code... */}
            <motion.div 
              style={{ opacity: lineOpacity }}
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cosmic-500 via-cosmic-900 to-transparent md:-translate-x-1/2"
            ></motion.div>
            
            <div className="space-y-6 md:space-y-8">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  item={item} 
                  index={index} 
                  scrollYProgress={scrollYProgress} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Planets reveal */}
        <motion.div 
          style={{ 
              opacity: planetsOpacity,
              scale: planetsScale,
              pointerEvents: pointerEvents
          }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center">
              {planets.map((planet, i) => {
                  const angle = (i / planets.length) * Math.PI * 2;
                  const radius = 250;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                      <motion.div
                          key={planet.name}
                          style={{ x, y }}
                          className="absolute flex flex-col items-center group"
                      >
                          {/* Planetary Rings */}
                          <div className="absolute w-20 h-20 md:w-32 md:h-32 pointer-events-none">
                              <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 rounded-full border border-cosmic-500/20 shadow-[0_0_15px_rgba(127,90,240,0.1)]"
                                  style={{ rotateX: "75deg", rotateY: "10deg" }}
                              />
                              <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 rounded-full border border-cosmic-400/10"
                                  style={{ rotateX: "80deg", rotateY: "-15deg", scale: 1.2 }}
                              />
                          </div>

                          <motion.div 
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-cosmic-800/90 border border-cosmic-500/50 backdrop-blur-md flex items-center justify-center p-3 md:p-4 shadow-[0_0_20px_rgba(127,90,240,0.3)] group-hover:shadow-[0_0_30px_rgba(127,90,240,0.6)] group-hover:border-cosmic-500 transition-all duration-300 z-10"
                          >
                              <img src={planet.logo} alt={planet.name} className="w-full h-full object-contain" />
                          </motion.div>
                          <span className="mt-2 text-[10px] md:text-xs font-orbitron text-cosmic-100 opacity-0 group-hover:opacity-100 transition-opacity bg-cosmic-900/90 px-2 py-1 rounded border border-cosmic-700 whitespace-nowrap">
                              {planet.name}
                          </span>
                      </motion.div>
                  );
              })}
              
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-cosmic-500/20 to-purple-600/20 blur-3xl animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
