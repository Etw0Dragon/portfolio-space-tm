import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, X } from 'lucide-react';

const MobileNotice: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      const dismissed = sessionStorage.getItem('mobile-notice-dismissed');
      
      if (isMobile && !dismissed) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('mobile-notice-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 z-[200] md:hidden"
        >
          <div className="bg-[#0b0d17]/95 border border-cosmic-500/50 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_40px_rgba(127,90,240,0.4)] relative overflow-hidden">
            {/* Background glow decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cosmic-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-cosmic-500/20 p-3 rounded-xl shrink-0">
                <Monitor className="text-cosmic-500 w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-white font-orbitron text-xs font-bold tracking-widest uppercase">
                    Signal reçu
                  </h3>
                  <button 
                    onClick={dismiss}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed font-sans">
                  Ce voyage spatial est optimisé pour les <span className="text-cosmic-500 font-bold">grands écrans</span>. 
                  Pour profiter pleinement des animations et du terminal, je te recommande une visite sur PC.
                </p>
              </div>
            </div>
            
            <button
               onClick={dismiss}
               className="w-full py-2.5 bg-cosmic-500/20 hover:bg-cosmic-500/30 border border-cosmic-500/40 text-cosmic-100 text-[10px] font-orbitron uppercase tracking-[0.2em] rounded-lg transition-all active:scale-95"
            >
              Continuer l'exploration
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNotice;
