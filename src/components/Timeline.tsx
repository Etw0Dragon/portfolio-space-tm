import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NativeBlackHoleLoader from './NativeBlackHoleLoader';
import RenderResolutionPrompt from './RenderResolutionPrompt';

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

const blackHoleScenePosition = {
  left: '50%',
  top: '54%',
  transform: 'translate(-50%, -50%)',
};

interface TimelineItemProps {
  item: typeof timelineData[0];
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.35 }}
      className={`flex flex-row md:flex-row gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 hidden md:block"></div>
      
      <div className="relative flex items-center justify-center w-8 h-8 shrink-0 md:-ml-4">
        <div className="w-4 h-4 rounded-full bg-cosmic-500 shadow-[0_0_10px_#7f5af0] z-10"></div>
        <div className="absolute w-8 h-8 rounded-full border border-cosmic-500 opacity-50"></div>
      </div>

      <div className="flex-1 min-w-0 pb-4 md:pb-0">
        <div className={`bg-cosmic-800/40 p-3 sm:p-4 md:p-6 rounded-xl border border-cosmic-700/50 backdrop-blur-sm hover:border-cosmic-500 transition-colors duration-300 ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
          <span className="font-orbitron text-cosmic-500 text-xs sm:text-sm font-bold">{item.year}</span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1 md:mb-2">{item.title}</h3>
          <h4 className="text-gray-400 text-xs sm:text-sm mb-2 md:mb-4 italic">{item.location}</h4>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const BlackHoleExperience: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isSucking, setIsSucking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [renderScale, setRenderScale] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hasRenderScale = renderScale !== null;

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
    <section id="blackhole" className="relative min-h-[100svh] overflow-hidden px-5 py-20 sm:px-6 md:px-4 md:py-24">
      <div className="mx-auto flex min-h-[calc(100svh-10rem)] w-full max-w-7xl items-center justify-center">
        {!hasRenderScale ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="w-full max-w-xl"
          >
            <div className="mb-6 text-center">
              <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">04. SINGULARITÉ</span>
            </div>
            <RenderResolutionPrompt placement="inline" onSelect={setRenderScale} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[calc(100svh-10rem)] min-h-[560px] w-full overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 text-center">
              <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">04. SINGULARITÉ</span>
            </div>

            <div className="pointer-events-none absolute inset-0 z-[100] flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full overflow-hidden">
                {/* Trou noir mid (phase planètes) */}
              <div
                className="absolute z-0 h-0 w-0"
                style={blackHoleScenePosition}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    onClick={hasRenderScale ? handleBlackHoleClick : undefined}
                    onMouseEnter={() => hasRenderScale && toggleHover(true)}
                    onMouseLeave={() => hasRenderScale && toggleHover(false)}
                    role={hasRenderScale ? 'button' : undefined}
                    tabIndex={hasRenderScale ? 0 : undefined}
                    onKeyDown={(event) => {
                      if (!hasRenderScale) return;
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleBlackHoleClick();
                      }
                    }}
                    animate={{ 
                      scale: hasRenderScale && isHovering ? 1.08 : 1,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 25,
                      opacity: { duration: 0.2 }
                    }}
                    className={`relative z-0 flex items-center justify-center group ${hasRenderScale ? 'h-32 w-32 cursor-pointer pointer-events-auto sm:h-40 sm:w-40 md:h-64 md:w-64' : 'min-h-[360px] w-[min(92vw,620px)] cursor-default md:min-h-[440px]'}`}
                  >
                    {/* Asset vidéo trou noir */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="pointer-events-none scale-[1.02] sm:scale-[1.04] md:scale-[1.06]">
                        <NativeBlackHoleLoader 
                          renderScale={renderScale}
                          className="w-[560px] h-[560px] sm:w-[760px] sm:h-[760px] md:w-[1280px] md:h-[1280px] max-w-none object-contain pointer-events-none"
                        />
                      </div>
                    </div>

                      {/* Glow d'intégration up */}
                    <motion.div
                      className="absolute inset-[-65%] rounded-full pointer-events-none z-[-1]"
                      style={{ 
                        background: 'radial-gradient(circle, rgba(127, 90, 240, 0.28) 0%, rgba(49, 120, 198, 0.10) 36%, transparent 74%)',
                        filter: 'blur(46px)'
                      }}
                      animate={{ 
                        scale: isHovering ? 1.18 : 1,
                        opacity: isHovering ? 0.7 : 0.36,
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
                  </motion.div>
                </div>

                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[160px] w-[280px] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-full border border-cosmic-500/20 shadow-[0_0_24px_rgba(127,90,240,0.18)] sm:h-[190px] sm:w-[350px] md:h-[330px] md:w-[620px]"
                  animate={{
                    opacity: isSucking ? 0 : isHovering ? 0.16 : 0.36,
                    scale: isHovering ? 0.72 : 1,
                  }}
                  transition={{ duration: isHovering ? 1.2 : 0.8, ease: "easeOut" }}
                />
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[98px] w-[210px] -translate-x-1/2 -translate-y-1/2 rotate-[9deg] rounded-full border border-blue-300/10 sm:h-[120px] sm:w-[260px] md:h-[220px] md:w-[460px]"
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
                         baseRadiusX={128}
                         baseRadiusY={92}
                         mdRadiusX={312}
                         mdRadiusY={196}
                         isHovering={isHovering}
                         isSucking={isSucking}
                         isMobile={isMobile}
                      />
                  );
                })}
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const Timeline: React.FC = () => {
  return (
    <>
      <section id="timeline" className="relative min-h-[100svh] bg-transparent px-5 py-20 sm:px-6 md:px-4 md:py-24 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-center mb-8 md:mb-14"
          >
            <span className="text-cosmic-500 font-orbitron tracking-widest text-sm block mb-2">03. PARCOURS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Trajectoire Spatiale</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cosmic-500 via-cosmic-900 to-transparent md:-translate-x-1/2" />
            
            <div className="space-y-4 md:space-y-8">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  item={item} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <BlackHoleExperience />
    </>
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
