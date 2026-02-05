export const BLACKHOLE_ANIMATION = (() => {
  const frames: string[][] = [];
  const numFrames = 60; // 100 trop lourd en weight, 60 c'est le bon spot pour la fluidité
  
  // Rampe de densité style "points"
  const density = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];
  const getChar = (val: number) => {
    const idx = Math.floor(val * (density.length - 1));
    return density[Math.min(idx, density.length - 1)];
  };

  // Phase 1 : Rotation & Growth (0-40)
  for (let i = 0; i < 40; i++) {
    const coreSize = 4 + (i / 8);
    const ringSize = coreSize + 5;
    const angle = (i * Math.PI) / 10;
    const frame: string[] = [];
    
    for (let y = -15; y <= 15; y++) {
      let line = "";
      for (let x = -40; x <= 40; x++) {
        // Ratio ajusté pour circularité terminal (x plus large que y)
        const dx = x * 0.5;
        const dy = y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < coreSize) {
          // Centre sombre (Trou noir)
          line += " "; 
        } else if (dist < coreSize + 0.8) {
          // Horizon des évènements (Bord brillant)
          line += "@";
        } else {
          // Disque d'accrétion / Anneaux
          const angleToPoint = Math.atan2(dy, dx);
          // Création de 2-3 anneaux distincts
          const ringPattern = Math.sin(dist - coreSize - angle * 2) * 0.5 + 0.5;
          const spiralPattern = Math.sin(angleToPoint * 2 + dist * 0.5 - angle * 3) * 0.5 + 0.5;
          
          if (dist < ringSize + 10) {
            const val = (ringPattern * spiralPattern) / (dist * 0.1);
            if (val > 0.4) line += getChar(val);
            else if (val > 0.1) line += ".";
            else line += " ";
          } else {
            line += " ";
          }
        }
      }
      frame.push(line);
    }
    frames.push(frame);
  }

  // Phase 2 : Implosion (40-45)
  for (let i = 0; i < 5; i++) {
    const frame: string[] = [];
    const size = 5 - i;
    for (let y = -15; y <= 15; y++) {
      let line = "";
      for (let x = -40; x <= 40; x++) {
        const dx = x * 0.5;
        const dy = y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < size) line += "@";
        else line += " ";
      }
      frame.push(line);
    }
    frames.push(frame);
  }

  // Phase 3 : Explosion (45-65)
  for (let i = 0; i < 20; i++) {
    const frame: string[] = [];
    const expansion = i * 4;
    for (let y = -15; y <= 15; y++) {
      let line = "";
      for (let x = -40; x <= 40; x++) {
        const dx = x * 0.5;
        const dy = y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const diff = Math.abs(dist - expansion);
        if (diff < 2) {
            line += density[Math.floor(Math.random() * density.length)];
        } else if (dist < expansion && Math.random() > 0.85) {
            line += ".";
        } else {
            line += " ";
        }
      }
      frame.push(line);
    }
    frames.push(frame);
  }

  // Phase 4 : Scattering des étoiles & Expansion (65-100)
  for (let i = 0; i < 35; i++) {
    const frame: string[] = [];
    const expansion = 15 + i * 2;
    for (let y = -15; y <= 15; y++) {
      let line = "";
      for (let x = -40; x <= 40; x++) {
        const dx = x * 0.5;
        const dy = y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Étoiles qui partent du centre
        const isStar = Math.random() > 0.97;
        const inExpansionZone = dist < expansion && dist > expansion - 10;
        
        if (inExpansionZone && isStar) {
           line += Math.random() > 0.5 ? "*" : ".";
        } else if (dist < expansion - 10 && Math.random() > 0.99) {
           // Poussière résiduelle
           line += ".";
        } else {
           line += " ";
        }
      }
      frame.push(line);
    }
    frames.push(frame);
  }

  return frames;
})();
