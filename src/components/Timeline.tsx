import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';

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
  { name: "Docker", logo: "/img/docker.png", color: "#2496ed" },
  { name: "Linux", logo: "/img/linux.png", color: "#fcc624" },
  { name: "Git", logo: "/img/git.png", color: "#f05032" },
  { name: "Astro", logo: "/img/astro.png", color: "#ff5d01" },
  { name: "TypeScript", logo: "/img/typescript.png", color: "#3178c6" },
  { name: "Go", logo: "/img/go.png", color: "#00add8" },
  { name: "C", logo: "/img/c.png", color: "#a8b9cc" },
  { name: "K3s", logo: "/img/K3S.png", color: "#326ce5" },
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
  const [isHovering, setIsHovering] = useState(false);
  const [isSucking, setIsSucking] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end end"]
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const planetsOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const planetsScale = useTransform(scrollYProgress, [0.45, 0.75], [0.8, 1]);
  
  // Use state for pointer events to ensure reliability
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTimelineActive, setIsTimelineActive] = useState(true);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setIsInteractive(v > 0.4);
      setIsTimelineActive(v < 0.55);
    });
  }, [scrollYProgress]);

  const handleBlackHoleClick = async () => {
    if (isSucking) return;
    setIsSucking(true);
    window.dispatchEvent(new Event('blackhole-start'));
    await new Promise(resolve => setTimeout(resolve, 1500));
    window.dispatchEvent(new Event('blackhole-explode'));
    await new Promise(resolve => setTimeout(resolve, 2000));
    window.location.href = '/easter-egg';
  };

  const toggleHover = (state: boolean) => {
    if (isSucking) return;
    setIsHovering(state);
    window.dispatchEvent(new Event(state ? 'blackhole-hover-start' : 'blackhole-hover-end'));
  };

  return (
    <section ref={containerRef} id="timeline" className="h-[280vh] relative bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className={`max-w-4xl w-full px-4 relative z-20 pt-32 md:pt-40 ${isTimelineActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div className="text-center mb-12 md:mb-16">
             <motion.div style={{ opacity: titleOpacity }}>
               <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">03. PARCOURS</span>
               <h2 className="text-4xl font-display font-bold text-white">Trajectoire Spatiale</h2>
             </motion.div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
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
        </motion.div>

        {/* Planets reveal */}
        <motion.div 
          style={{ 
              opacity: planetsOpacity,
              scale: planetsScale,
          }}
          className={`absolute inset-0 flex items-center justify-center z-[100] ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
              {/* Central Black Hole (visible during planet phase) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                <motion.button
                  onClick={handleBlackHoleClick}
                  onMouseEnter={() => toggleHover(true)}
                  onMouseLeave={() => toggleHover(false)}
                  animate={{ 
                    scale: isHovering ? 2.5 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="relative w-12 h-12 md:w-24 md:h-24 rounded-full cursor-pointer flex items-center justify-center group"
                >
                  {/* --- GRAVITATIONAL LENSING EFFECTS (Gargantua Style) --- */}
                  
                  {/* Main Accretion Disk - The horizontal part passing in front */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[25%] w-[450%] z-20 rounded-[100%] pointer-events-none"
                    style={{ 
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%)',
                      boxShadow: '0 0 30px #fff, 0 0 60px #f97316, 0 0 100px #f97316',
                      filter: 'blur(2px)',
                    }}
                  />
                  {/* Secondary Disk for bloom */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[40%] w-[500%] z-10 rounded-[100%] pointer-events-none opacity-40"
                    style={{ 
                      background: 'linear-gradient(90deg, transparent 0%, #f97316 50%, transparent 100%)',
                      filter: 'blur(15px)',
                    }}
                  />

                  {/* Ambient Gravitational Glow - Replaces the rigid halos */}
                  <motion.div
                    className="absolute inset-[-150%] rounded-full pointer-events-none z-0"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
                      filter: 'blur(50px)'
                    }}
                    animate={{ 
                      scale: isHovering ? 0.5 : 1.2,
                      opacity: isHovering ? 1 : 0.4,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-[-100%] rounded-full pointer-events-none z-0"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 60%)',
                      filter: 'blur(70px)'
                    }}
                    animate={{ 
                      scale: isHovering ? 0.4 : 1.4,
                      opacity: isHovering ? 1 : 0.3,
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 25, delay: 0.1 }}
                  />

                  {/* Photon Ring */}
                  <div 
                    className="absolute inset-0 rounded-full border-[1.5px] border-white/95 z-10 pointer-events-none"
                    style={{ boxShadow: '0 0 10px #fff, 0 0 20px #f97316' }}
                  ></div>

                  {/* Event Horizon (The Black Void) */}
                  <div className="absolute inset-0 bg-black rounded-full z-15 shadow-[0_0_50px_rgba(0,0,0,1)]"></div>
                  
                  {/* Corona / Bloom around the horizon */}
                  <div 
                    className="absolute inset-[-10%] rounded-full bg-orange-500/20 blur-[20px] z-5 pointer-events-none"
                  ></div>

                  {/* Core Internal Glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-orange-600/40 blur-[20px] z-0 pointer-events-none"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <AnimatePresence>
                    {isSucking && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 40, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeIn" }}
                        className="absolute inset-0 bg-black rounded-full z-50 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {planets.map((planet, i) => {
                  const angle = (i / planets.length) * Math.PI * 2;
                  const radius = 250;
                  const mdRadius = 400;
                  
                  return (
                      <PlanetComponent 
                         key={planet.name}
                         planet={planet}
                         angle={angle}
                         baseRadius={radius}
                         mdRadius={mdRadius}
                         isHovering={isHovering}
                         isSucking={isSucking}
                      />
                  );
              })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PlanetComponent: React.FC<{ planet: any, angle: number, baseRadius: number, mdRadius: number, isHovering: boolean, isSucking: boolean }> = ({ planet, angle, baseRadius, mdRadius, isHovering, isSucking }) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const radius = isMobile ? baseRadius : mdRadius;
    const targetX = Math.cos(angle) * (isHovering ? 0 : radius);
    const targetY = Math.sin(angle) * (isHovering ? 0 : radius);

    return (
        <motion.div
            animate={isSucking ? {
                x: 0,
                y: 0,
                scale: 0,
                rotate: 720,
            } : {
                x: targetX,
                y: targetY,
                scale: isHovering ? 0 : 1,
                opacity: isHovering ? 0 : 1
            }}
            transition={isSucking ? { duration: 1.5, ease: "circIn" } : { 
                duration: isHovering ? 0.8 : 1.2, 
                ease: isHovering ? "anticipate" : "easeOut" 
            }}
            className="absolute flex flex-col items-center group pointer-events-none"
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
                className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-cosmic-800/90 border border-cosmic-500/50 backdrop-blur-md flex items-center justify-center p-3 md:p-4 shadow-[0_0_20px_rgba(127,90,240,0.3)] group-hover:shadow-[0_0_30px_rgba(127,90,240,0.6)] group-hover:border-cosmic-500 transition-all duration-300 z-10 pointer-events-auto"
            >
                <img src={planet.logo} alt={planet.name} className="w-full h-full object-contain" />
            </motion.div>
            <span className="mt-2 text-[10px] md:text-xs font-orbitron text-cosmic-100 opacity-0 group-hover:opacity-100 transition-opacity bg-cosmic-900/90 px-2 py-1 rounded border border-cosmic-700 whitespace-nowrap">
                {planet.name}
            </span>
        </motion.div>
    );
};

export default Timeline;
