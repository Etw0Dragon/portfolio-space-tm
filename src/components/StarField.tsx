import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as PointsType } from "three";

const StarBackground: React.FC = (props: any) => {
  const ref = useRef<PointsType | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isGravitating, setIsGravitating] = useState(false);

  const [stars] = useState(() => {
    // Check si mobile pour down le compte
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 3000 : 8000; 
    const points = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Distribution random en sphère large
        const r = 2 + Math.random() * 8;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
        originals[i * 3] = x;
        originals[i * 3 + 1] = y;
        originals[i * 3 + 2] = z;
    }
    return { points, originals, count };
  });

  useEffect(() => {
    const startHover = () => setIsHovering(true);
    const endHover = () => setIsHovering(false);
    const startGravitation = () => setIsGravitating(true);

    window.addEventListener('blackhole-hover-start', startHover);
    window.addEventListener('blackhole-hover-end', endHover);
    window.addEventListener('blackhole-start', startGravitation);

    return () => {
      window.removeEventListener('blackhole-hover-start', startHover);
      window.removeEventListener('blackhole-hover-end', endHover);
      window.removeEventListener('blackhole-start', startGravitation);
    };
  }, []);

  useFrame((_state, delta) => {
    if (!ref.current) return;

    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    // Rotation globale slow
    ref.current.rotation.x -= delta / 30; // Un peu plus slow pour le feel
    ref.current.rotation.y -= delta / 35;

    let needsForceUpdate = false;

    if (isGravitating || isHovering) {
        needsForceUpdate = true;
        for (let i = 0; i < stars.count; i++) {
            const idx = i * 3;
            const x = positions[idx];
            const y = positions[idx + 1];
            const z = positions[idx + 2];

            const distance = Math.sqrt(x*x + y*y + z*z) || 1e-6;

            if (isGravitating) {
                const pull = 3.0 * delta;
                positions[idx] -= (x / distance) * pull;
                positions[idx + 1] -= (y / distance) * pull;
                positions[idx + 2] -= (z / distance) * pull;
            } else {
                const pullStrength = 0.5 * delta;
                const spiralStrength = 0.3 * delta;

                positions[idx] -= (x / distance) * pullStrength;
                positions[idx + 1] -= (y / distance) * pullStrength;
                positions[idx + 2] -= (z / distance) * pullStrength;

                const angle = spiralStrength;
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const nx = x * cosA - y * sinA;
                const ny = x * sinA + y * cosA;
                
                positions[idx] = nx;
                positions[idx + 1] = ny;
            }
        }
    } else {
        // Opti : check si les étoiles sont loin du point d'origine
        // Seul le return si besoin (quelques étoiles)
        const checkCount = 50; 
        let isReturning = false;
        for (let i = 0; i < checkCount; i++) {
            const idx = i * 3;
            if (Math.abs(positions[idx] - stars.originals[idx]) > 0.01) {
                isReturning = true;
                break;
            }
        }

        if (isReturning) {
            needsForceUpdate = true;
            for (let i = 0; i < stars.count; i++) {
                const idx = i * 3;
                positions[idx] += (stars.originals[idx] - positions[idx]) * 0.05;
                positions[idx + 1] += (stars.originals[idx + 1] - positions[idx + 1]) * 0.05;
                positions[idx + 2] += (stars.originals[idx + 2] - positions[idx + 2]) * 0.05;
            }
        }
    }
    
    if (needsForceUpdate) {
        ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={stars.points}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={1} // Blending additif pour les glows
        />
      </Points>
    </group>
  );
};

const StarField: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full fixed inset-0 -z-20 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost. Attempting to recover...');
          }, false);
        }}
      >
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarField;
