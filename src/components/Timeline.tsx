import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import NativeBlackHoleLoader from './NativeBlackHoleLoader';

const timelineData = [
  {
    year: "2022 - 2023",
    title: "2nd pro CIEL",
    location: "Saint aubin la salle",
    description: "Découvertes des bases de la programmation et de l'informatique en général."
  },
  {
    year: "2023 - 2024",
    title: "Première STI2D",
    location: "Saint aubin la salle",
    description: "Réalisation de projets techniques et découverte de l'informatique industrielle."
  },
  {
    year: "2024 - 2025",
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
  { name: "C", logo: "/img/c.png", color: "#a8b9cc", depth: 1.05 },
  { name: "K3s", logo: "/img/K3S.png", color: "#326ce5", depth: 0.96 },
  { name: "Docker", logo: "/img/docker.png", color: "#2496ed", depth: 0.98 },
  { name: "Linux", logo: "/img/linux.png", color: "#fcc624", depth: 1.04 },
  { name: "Git", logo: "/img/git.png", color: "#f05032", depth: 1.08 },
  { name: "Astro", logo: "/img/astro.png", color: "#ff5d01", depth: 1.02 },
  { name: "TypeScript", logo: "/img/typescript.png", color: "#3178c6", depth: 0.98 },
  { name: "Go", logo: "/img/go.png", color: "#00add8", depth: 1.0 },
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
    [0, index % 2 === 0 ? 300 : -300] // Down de 1200 pour opti perf & feel
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
        <div className="w-4 h-4 rounded-full bg-cosmic-500 shadow-[0_0_10px_#7f5af0] z-10"></div>
        <div className="absolute w-8 h-8 rounded-full border border-cosmic-500 opacity-50"></div>
      </div>

      <div className="flex-1 pb-8 md:pb-0">
        <div className={`bg-cosmic-800/40 p-6 rounded-xl border border-cosmic-700/50 backdrop-blur-sm hover:border-cosmic-500 transition-colors duration-300 ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
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
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end end"]
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const planetsOpacity = useTransform(scrollYProgress, [0.45, 0.65, 0.9, 1], [0, 1, 1, 0]);
  const planetsScale = useTransform(scrollYProgress, [0.45, 0.75], [0.8, 1]);
  
  // State pointer events pour la fiabilité
  const [isInteractive, setIsInteractive] = useState(false);
  const [isTimelineActive, setIsTimelineActive] = useState(true);

  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => {
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
    <section ref={containerRef} id="timeline" className="h-[300vh] relative bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
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
            {/* Ligne mid */}
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

        {/* Reveal plantete */}
        <motion.div 
          style={{ 
              opacity: planetsOpacity,
              scale: planetsScale,
          }}
          className={`absolute inset-0 flex items-center justify-center z-[100] ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
              {/* Trou noir mid (phase planètes) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                <motion.button
                  onClick={handleBlackHoleClick}
                  onMouseEnter={() => toggleHover(true)}
                  onMouseLeave={() => toggleHover(false)}
                  animate={{ 
                    scale: isHovering ? 1.1 : 1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 25,
                    opacity: { duration: 0.2 }
                  }}
                  className="relative w-40 h-40 md:w-64 md:h-64 cursor-pointer flex items-center justify-center group z-0"
                >
                  {/* Asset vidéo trou noir */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-none scale-[1.18] md:scale-[1.22]">
                      <NativeBlackHoleLoader 
                        className="w-[1120px] h-[1120px] md:w-[1560px] md:h-[1560px] max-w-none object-contain pointer-events-none"
                      />
                    </div>
                    </div>

                    {/* Glow d'intégration up */}
                    <motion.div
                    className="absolute inset-[-65%] rounded-full pointer-events-none z-[-1]"
                    style={{ 
                      background: 'radial-gradient(circle, rgba(127, 90, 240, 0.34) 0%, rgba(49, 120, 198, 0.12) 36%, transparent 72%)',
                      filter: 'blur(46px)'
                    }}
                    animate={{ 
                      scale: isHovering ? 1.2 : 1,
                      opacity: isHovering ? 0.8 : 0.4,
                    }}
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

              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[190px] w-[350px] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-full border border-cosmic-500/20 shadow-[0_0_24px_rgba(127,90,240,0.18)] md:h-[330px] md:w-[620px]"
                animate={{
                  opacity: isSucking ? 0 : isHovering ? 0.16 : 0.36,
                  scale: isHovering ? 0.72 : 1,
                }}
                transition={{ duration: isHovering ? 1.2 : 0.8, ease: "easeOut" }}
              />
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[120px] w-[260px] -translate-x-1/2 -translate-y-1/2 rotate-[9deg] rounded-full border border-blue-300/10 md:h-[220px] md:w-[460px]"
                animate={{
                  opacity: isSucking ? 0 : isHovering ? 0.1 : 0.28,
                  scale: isHovering ? 0.58 : 1,
                }}
                transition={{ duration: isHovering ? 1.2 : 0.8, ease: "easeOut" }}
              />

              {planets.map((planet, i) => {
                  const angle = (i / planets.length) * Math.PI * 2 - Math.PI / 2;
                  
                  return (
                      <PlanetComponent 
                         key={planet.name}
                         planet={planet}
                         angle={angle}
                         baseRadiusX={176}
                         baseRadiusY={122}
                         mdRadiusX={312}
                         mdRadiusY={196}
                         isHovering={isHovering}
                         isSucking={isSucking}
                         isMobile={isMobile}
                      />
                  );
              })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PlanetComponent: React.FC<{ planet: any, angle: number, baseRadiusX: number, baseRadiusY: number, mdRadiusX: number, mdRadiusY: number, isHovering: boolean, isSucking: boolean, isMobile: boolean }> = ({ planet, angle, baseRadiusX, baseRadiusY, mdRadiusX, mdRadiusY, isHovering, isSucking, isMobile }) => {
    const radiusX = isMobile ? baseRadiusX : mdRadiusX;
    const radiusY = isMobile ? baseRadiusY : mdRadiusY;
    const targetX = Math.cos(angle) * (isHovering ? 0 : radiusX);
    const targetY = Math.sin(angle) * (isHovering ? 0 : radiusY);
    const depthScale = planet.depth ?? 1;

    return (
        <motion.div
            animate={isSucking ? {
                x: 0,
                y: 0,
                scale: 0,
                rotate: 720,
                opacity: 0,
            } : {
                x: targetX,
                y: targetY,
                scale: isHovering ? 0 : depthScale,
                opacity: isHovering ? 0 : 1
            }}
            transition={isSucking ? { duration: 1.5, ease: "circIn" } : { 
                duration: isHovering ? 1.5 : 1.2, 
                ease: isHovering ? "anticipate" : "easeOut" 
            }}
            className="absolute flex flex-col items-center group pointer-events-none z-10"
        >
            {/* Anneaux planétaires - complexité down */}
            <div className="absolute w-20 h-20 md:w-32 md:h-32 pointer-events-none">
                <div 
                    className="absolute inset-0 rounded-full border border-cosmic-500/20 shadow-[0_0_10px_rgba(127,90,240,0.1)]"
                    style={{ transform: `rotateX(75deg) rotateY(10deg) rotateZ(${angle}rad)` }}
                />
            </div>

            <motion.div 
                className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-cosmic-800/90 border backdrop-blur-md flex items-center justify-center p-3 md:p-4 shadow-[0_0_20px_rgba(127,90,240,0.3)] group-hover:shadow-[0_0_30px_rgba(127,90,240,0.6)] transition-all duration-300 z-10 pointer-events-auto"
                style={{ borderColor: `${planet.color}99`, boxShadow: `0 0 22px ${planet.color}40` }}
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
