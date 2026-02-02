import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BLACKHOLE_ANIMATION } from '../utils/blackholeFrames';

interface CommandOutput {
  command: string;
  output: string | string[];
}

const TerminalDisplay: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: '', output: 'Bienvenue sur le terminal de Tom Moreau. Tapez "help" pour voir les commandes disponibles.' }
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runBlackholeAnimation = async () => {
    setIsAnimating(true);
    window.dispatchEvent(new Event('blackhole-start'));
    
    // Add an initial entry for the animation
    setHistory(prev => [...prev, { command: './blackhole', output: BLACKHOLE_ANIMATION[0] }]);

    for (let frameIndex = 1; frameIndex < BLACKHOLE_ANIMATION.length; frameIndex++) {
      // Trigger global background explosion at the right moment (Phase 3 start ~ frame 45)
      if (frameIndex === 45) {
          window.dispatchEvent(new Event('blackhole-explode'));
      }

      await new Promise(resolve => setTimeout(resolve, 40));
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { 
          command: './blackhole', 
          output: BLACKHOLE_ANIMATION[frameIndex] 
        };
        return newHistory;
      });
    }

    // After animation, show a transition message to avoid "freeze" feel
    setHistory(prev => [...prev, { 
      command: '', 
      output: [
        'COLLAPSE SUCCESSFUL',
        '',
        '[ OK ] Quantum State Stabilized',
        '[ OK ] Reality Anchor Released',
        '[ INFO ] Redirecting to Secret Sector...'
      ] 
    }]);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Initiate fade out before redirect
    setIsRedirecting(true);
    
    // Tiny delay to let the fade start
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Final Redirect
    window.location.href = '/easter-egg';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isAnimating) {
        e.preventDefault();
        return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'ls', 'whoami', 'clear', 'cat', './blackhole'];
      const files = ['about.txt', 'parcours.txt', 'projets.txt', 'contact.txt', 'blackhole'];
      
      const currentInput = input.trim().toLowerCase();
      let matches: string[] = [];
      let prefix = '';

      if (currentInput.startsWith('./')) {
        const partial = currentInput.slice(2);
        matches = ['./blackhole'].filter(f => f.startsWith(`./${partial}`));
        prefix = './';
      } else if (currentInput.startsWith('cat ')) {
        const partialFile = currentInput.slice(4);
        matches = files.filter(f => f.startsWith(partialFile)).map(f => `cat ${f}`);
        prefix = 'cat ';
      } else {
        matches = commands.filter(c => c.startsWith(currentInput));
      }

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Find common prefix
        let common = matches[0];
        for (let i = 1; i < matches.length; i++) {
          let j = 0;
          while (j < common.length && j < matches[i].length && common[j] === matches[i][j]) {
            j++;
          }
          common = common.slice(0, j);
        }
        
        if (common.length > currentInput.length) {
          setInput(common);
        } else {
          // List matches in history like a real shell
          const suggestionLine = matches.map(m => {
              if (m.startsWith('cat ')) return m.slice(4);
              if (m.startsWith('./')) return m.slice(2);
              return m;
          }).join('    ');
          setHistory(prev => [...prev, { command: input, output: suggestionLine }]);
        }
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response: string | string[] = '';

    if (cmd === 'help') {
      response = [
        '',
        '--- COMMANDES DISPONIBLES ---',
        '',
        '  ls              Lister les fichiers du répertoire',
        '  cat [fichier]   Afficher le contenu d\'un fichier',
        '  whoami          Afficher les informations du profil',
        '  clear           Nettoyer l\'écran du terminal',
        '  help            Afficher ce menu d\'assistance',
        '',
        '  ./blackhole     [DANGER] Lancer le programme expérimental',
        '',
        '----------------------------',
        ''
      ];
    } else if (cmd === 'ls') {
      response = ['about.txt', 'parcours.txt', 'projets.txt', 'contact.txt', 'blackhole*'];
    } else if (cmd === './blackhole') {
      runBlackholeAnimation();
      setInput('');
      return;
    } else if (cmd === 'whoami') {
      response = 'Tom Moreau - Apprenti Ingénieur DevOps & Administrateur Systèmes.';
    } else if (cmd === 'cat about.txt') {
      response = 'Je suis Tom, 17 ans, passionné par ce qui se passe derrière la machine. Mon expertise se situe au croisement du développement et de l\'infrastructure.';
    } else if (cmd === 'cat parcours.txt') {
      response = [
        '2022 - 2023: 2nd pro CIEL - Découverte des bases de l\'informatique.',
        '2023 - 2024: Première STI2D - Projets techniques et informatique industrielle.',
        '2024 - 2025: Terminale STI2D - Électronique et systèmes d\'informations numériques.',
        '',
        'Prochaine étape: BUT en alternance - Objectif DevOps / Cloud Engineer.'
      ];
    } else if (cmd === 'cat projets.txt') {
      response = [
        '- AlcyoneOS: OS basé sur Linux optimisé pour la performance et la sécurité des infrastructures.',
        '- Infrastructure HomeLab: Cluster Proxmox haute disponibilité.',
        '  * Stockage: ZFS avec configuration RAID pour la résilience.',
        '  * Réseau: Segmentation via VLANs pour une isolation stricte.',
        '  * Sécurité: Monitoring et sauvegardes automatisées.',
        '- Portfolio CLI Style: Interface interactive Node.js pour explorer mon parcours.'
      ];
    } else if (cmd === 'cat contact.txt') {
      response = 'Email: tom.alcyone@tmfolio.site | GitHub: github.com/Etw0Dragon | LinkedIn: linkedin.com/in/tom-moreau-392690332';
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === '') {
      response = '';
    } else {
      response = `Command not found: ${cmd}. Tapez "help" pour l'aide.`;
    }

    setHistory([...history, { command: input, output: response }]);
    setInput('');
  };

  return (
    <div 
      className={`w-full max-w-5xl mx-auto h-[750px] bg-transparent border border-cosmic-700/50 rounded-lg p-4 font-mono text-green-400 shadow-2xl flex flex-col overflow-hidden relative transition-opacity duration-500 ${isRedirecting ? 'opacity-0' : 'opacity-100'}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Background for Terminal when not animating */}
      <div className={`absolute inset-0 bg-black/90 -z-10 transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}></div>

      {/* Fixed Overlay for Blackhole Animation - Covers entire screen */}
      {isAnimating && (
        <div className={`fixed inset-0 z-[100] bg-transparent flex flex-col items-center justify-center p-0 transition-opacity duration-700 ${isRedirecting ? 'opacity-0' : 'opacity-100'}`}>
             {/* Dark backdrop blur to see StarField behind stars */}
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
             
             <div className={`text-gray-200 font-mono whitespace-pre text-center w-full h-full flex flex-col justify-center overflow-hidden ${
                Array.isArray(history[history.length - 1].output) && (history[history.length - 1].output as string[]).length < 10
                  ? 'text-base sm:text-xl md:text-2xl leading-relaxed'
                  : 'leading-none text-[7px] sm:text-[9px] md:text-[13px] lg:text-[15px] xl:text-[18px]'
             }`}>
                {Array.isArray(history[history.length - 1].output) ? (
                    (history[history.length - 1].output as string[]).map((line, j) => <div key={j} className="w-full">{line}</div>)
                ) : null}
             </div>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto mb-4 space-y-2 scrollbar-thin scrollbar-thumb-cosmic-700 ${isAnimating ? 'opacity-0' : ''}`} ref={scrollRef}>
        {history.map((item, i) => (
          <div key={i} className="animate-in fade-in duration-300">
            {item.command && (
              <div className="flex gap-2">
                <span className="text-cosmic-500 font-bold">tom@space:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className={`text-gray-300 ml-4 font-mono whitespace-pre-wrap ${item.command === './blackhole' ? 'text-center' : ''}`}>
              {Array.isArray(item.output) ? (
                item.output.map((line, j) => <div key={j} className={line === '' ? 'h-2' : ''}>{line}</div>)
              ) : (
                <div>{item.output}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} className="flex gap-2 items-center">
        <span className="text-cosmic-500 font-bold shrink-0">tom@space:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          disabled={isAnimating}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`bg-transparent border-none outline-none flex-1 text-white caret-cosmic-500 w-full ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalDisplay;
