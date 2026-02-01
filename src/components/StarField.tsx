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
    window.addEventListener('blackhole-explode', triggerExplosion);
    resize();

    const stars: { 
        x: number; 
        y: number; 
        size: number; 
        speed: number; 
        opacity: number;
        angle?: number;
        radius?: number;
        orbitalSpeed?: number;
    }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random()
      });
    }

    const animate = () => {
      if (isFadingOut) {
          globalOpacity = Math.max(0, globalOpacity - 0.015);
      }
      
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = globalOpacity;
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Background stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (isGravitating) {
            // Initialize orbital params if not set
            if (star.angle === undefined) {
                star.angle = Math.atan2(star.y - centerY, star.x - centerX);
                star.radius = Math.sqrt((star.x - centerX)**2 + (star.y - centerY)**2);
                star.orbitalSpeed = (0.02 + Math.random() * 0.03) * (150 / (star.radius + 50)); 
            }

            // Update orbit
            star.angle += (star.orbitalSpeed || 0.01) * 1.5;
            // Slowly pull stars closer to the terminal but keep them in orbit
            const minRadius = 350;
            if (star.radius && star.radius > minRadius) {
                star.radius -= 1.2;
            } else if (star.radius) {
                star.radius += 0.2; // Push back slightly if too close
            }

            star.x = centerX + Math.cos(star.angle) * (star.radius || 0);
            star.y = centerY + Math.sin(star.angle) * (star.radius || 0);
            
            // Pulsing opacity for background stars during gravitation
            star.opacity = 0.4 + Math.sin(Date.now() * 0.005 + (star.radius || 0)) * 0.3;
        } else {
            star.y += star.speed;
            if (star.y > height) star.y = 0;
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
