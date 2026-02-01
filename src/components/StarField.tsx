import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isGravitating = false;
    let isHovering = false;
    let hoverStrength = 0; // New variable to track hover intensity
    let isFadingOut = false;
    let globalOpacity = 1;
    let explosionParticles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number }[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const startGravitation = () => {
        isGravitating = true;
        isHovering = false;
    };

    const startHover = () => {
        isHovering = true;
    };

    const endHover = () => {
        isHovering = false;
    };

    const triggerExplosion = () => {
        const centerX = width / 2;
        const centerY = height / 2;
        for (let i = 0; i < 400; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 25;
            explosionParticles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: Math.random() * 4 + 1,
                opacity: 1,
                life: 1.0
            });
        }
        
        // Start fading the background slightly after explosion
        setTimeout(() => {
            isFadingOut = true;
        }, 800);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('blackhole-start', startGravitation);
    window.addEventListener('blackhole-hover-start', startHover);
    window.addEventListener('blackhole-hover-end', endHover);
    window.addEventListener('blackhole-explode', triggerExplosion);
    resize();

    const stars: { 
        x: number; 
        y: number; 
        originX: number; // Store original position
        originY: number;
        size: number; 
        speed: number; 
        opacity: number;
        angle?: number;
        radius?: number;
        orbitalSpeed?: number;
    }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      stars.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        size: Math.random() * 2,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random()
      });
    }

    const animate = () => {
      if (isFadingOut) {
          globalOpacity = Math.max(0, globalOpacity - 0.015);
      }

      if (isHovering && !isGravitating) {
          hoverStrength = Math.min(1, hoverStrength + 0.02);
      } else if (!isGravitating) {
          hoverStrength = Math.max(0, hoverStrength - 0.01);
      } else {
          hoverStrength = 1;
      }
      
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = globalOpacity;
      
      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach((star, i) => {
        // Continuous background movement for origin
        star.originY += star.speed;
        if (star.originY > height) {
            star.originY = 0;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (isGravitating || hoverStrength > 0) {
            if (star.angle === undefined) {
                star.angle = Math.atan2(star.y - centerY, star.x - centerX);
                star.radius = Math.sqrt((star.x - centerX)**2 + (star.y - centerY)**2);
                star.orbitalSpeed = (0.01 + Math.random() * 0.02) * (150 / (star.radius + 50)); 
            }

            const speedMultiplier = isGravitating ? 4 : (1 + hoverStrength * 0.5);
            star.angle += (star.orbitalSpeed || 0.01) * speedMultiplier;
            
            if (isGravitating) {
                star.radius = Math.max(0, (star.radius || 0) - 4);
                star.opacity = Math.max(0, (star.opacity || 1) - 0.005);
                star.x = centerX + Math.cos(star.angle) * (star.radius || 0);
                star.y = centerY + Math.sin(star.angle) * (star.radius || 0);
            } else {
                const targetRadius = (star.radius || 500) * 0.7;
                const currentRadius = (star.radius || 0) * (1 - 0.02) + (targetRadius * 0.02);
                star.radius = currentRadius;

                const swirlX = centerX + Math.cos(star.angle) * currentRadius;
                const swirlY = centerY + Math.sin(star.angle) * currentRadius;
                
                star.x = star.originX * (1 - hoverStrength) + swirlX * hoverStrength;
                star.y = star.originY * (1 - hoverStrength) + swirlY * hoverStrength;
            }
        } else {
            star.angle = undefined;
            star.radius = undefined;
            star.x = star.originX;
            star.y = star.originY;
        }

        if (!isGravitating) {
            star.opacity = 0.3 + Math.sin(Date.now() * 0.002 + i) * 0.4;
        }
      });

      // Explosion particles
      for (let i = explosionParticles.length - 1; i >= 0; i--) {
        const p = explosionParticles[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        const flicker = Math.random() > 0.9 ? 1.5 : 1;
        ctx.arc(p.x, p.y, p.size * flicker, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.008;
        p.life -= 0.008;

        if (p.life <= 0) {
            explosionParticles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('blackhole-start', startGravitation);
      window.removeEventListener('blackhole-hover-start', startHover);
      window.removeEventListener('blackhole-hover-end', endHover);
      window.removeEventListener('blackhole-explode', triggerExplosion);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #0b0d17, #15192b)' }}
    />
  );
};

export default StarField;
