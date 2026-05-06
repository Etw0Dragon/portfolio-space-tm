import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three/webgpu';
import { BlackHoleSimulation } from '../utils/webgpu-black-hole/blackhole.js';

const getRenderPixelRatio = (renderScale: number) => {
  const basePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  return Math.max(0.35, basePixelRatio * renderScale);
};

const NativeBlackHoleLoader: React.FC<{
    width?: number | string;
    height?: number | string;
    className?: string;
    renderScale: number;
}> = ({ width = '100%', height = '100%', className = "", renderScale }) => {
  const cameraHome = useRef(new THREE.Vector3(0, -5, 20));
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Base black hole configuration from /webgpu-black-hole/main.js.
    const config = {
      "blackHoleMass": 0.4,
      "diskInnerRadius": 4.1,
      "diskOuterRadius": 14.5,
      "diskTemperature": 49.78,
      "temperatureFalloff": 5.22,
      "diskBrightness": 5,
      "diskRotationSpeed": -8.7,
      "turbulenceScale": 1.81,
      "turbulenceStretch": 0.75,
      "turbulenceSharpness": 7.4,
      "turbulenceCycleTime": 5,
      "turbulenceLacunarity": 3,
      "turbulencePersistence": 0.8,
      "diskEdgeSoftnessInner": 0.18,
      "diskEdgeSoftnessOuter": 0.5,
      "gravitationalLensing": 2.4,
      "dopplerStrength": 1.0,
      "stepSize": 1,
      "starsEnabled": false, 
      "nebulaEnabled": false, 
    };

    const container = containerRef.current;
    setIsLoading(true);
    setHasLoadError(false);
    
    // Initial size
    let currentWidth = Math.max(1, container.clientWidth || window.innerWidth);
    let currentHeight = Math.max(1, container.clientHeight || window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, currentWidth / currentHeight, 0.1, 1000);
    camera.position.copy(cameraHome.current);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
    // Make background transparent so StarField shows through
    renderer.setClearColor(0x000000, 0); 
    renderer.setPixelRatio(getRenderPixelRatio(renderScale));
    renderer.setSize(currentWidth, currentHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // Add canvas toDOM
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '50%';
    renderer.domElement.style.left = '50%';
    renderer.domElement.style.transform = 'translate(-50%, -50%)';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '-15';
    // Mettre un masque radial pour adoucir les bords COMME LA VIDEO
    renderer.domElement.style.maskImage = 'radial-gradient(circle, black 38%, rgba(0,0,0,0.75) 54%, transparent 72%)';
    renderer.domElement.style.WebkitMaskImage = 'radial-gradient(circle, black 38%, rgba(0,0,0,0.75) 54%, transparent 72%)';

    container.appendChild(renderer.domElement);

    const simulation = new BlackHoleSimulation(scene, config);
    simulation.createBlackHole();
    simulation.onResize(currentWidth, currentHeight);
    simulation.updateCamera(camera);

    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isZumping = false;
    let isExploding = false;

    const onStart = () => { isZumping = true; };
    const onExplode = () => { isExploding = true; };
    const onReset = () => {
      isZumping = false;
      isExploding = false;
      camera.position.copy(cameraHome.current);
      camera.lookAt(0, 0, 0);
      simulation.updateCamera(camera);
    };

    window.addEventListener('blackhole-start', onStart);
    window.addEventListener('blackhole-explode', onExplode);
    window.addEventListener('blackhole-reset', onReset);

    const isRunningRef = { current: true };

    function animate() {
      if (!isRunningRef.current) return;
      
      const delta = clock.getDelta();

      // Terminal logic zoom:
      if (isZumping && !isExploding) {
        if (camera.position.z > 12.0) {
          camera.position.z -= delta * 4.0;
        }
      } else if (isExploding) {
          if (camera.position.z > 0.05) {
            camera.position.z -= delta * 30.0;
          }
      }
      camera.lookAt(0, 0, 0);
      simulation.update(delta, camera);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(1, container.clientWidth || window.innerWidth);
      const h = Math.max(1, container.clientHeight || window.innerHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(getRenderPixelRatio(renderScale));
      renderer.setSize(w, h);
      simulation.onResize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const initializeRenderer = async () => {
      try {
        await renderer.init();
        if (!isRunningRef.current) return;

        handleResize();
        setIsLoading(false);
        animate();
      } catch (error) {
        console.error('Failed to initialize WebGPU black hole renderer:', error);
        setHasLoadError(true);
        setIsLoading(false);
      }
    };

    initializeRenderer();

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blackhole-start', onStart);
      window.removeEventListener('blackhole-explode', onExplode);
      window.removeEventListener('blackhole-reset', onReset);
      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [renderScale]);

  return (
    <div 
        ref={containerRef} 
        className={className} 
        style={{ width, height, position: 'relative' }} 
    >
      {(isLoading || hasLoadError) && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="rounded-lg border border-cosmic-500/40 bg-cosmic-900/85 px-4 py-3 text-center shadow-[0_0_32px_rgba(127,90,240,0.35)] backdrop-blur-md">
            {isLoading ? (
              <>
                <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-cosmic-500 border-t-transparent" />
                <p className="text-[10px] font-orbitron uppercase tracking-[0.24em] text-cosmic-100">
                  Chargement shader
                </p>
              </>
            ) : (
              <p className="max-w-[220px] text-xs leading-relaxed text-gray-300">
                WebGPU n'a pas pu initialiser le rendu du trou noir.
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default NativeBlackHoleLoader;
