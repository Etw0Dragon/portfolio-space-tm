import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { BlackHoleSimulation } from '../utils/webgpu-black-hole/blackhole.js';
import { useInView } from 'framer-motion';

const NativeBlackHoleLoader: React.FC<{
    width?: number | string;
    height?: number | string;
    className?: string;
}> = ({ width = '100%', height = '100%', className = "" }) => {
  const cameraHome = useRef(new THREE.Vector3(0, -5, 20));
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  
  const isInViewRef = useRef(isInView);
  
  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

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
      "bloomStrength": 0.68,
      "bloomRadius": 0.2,
      "bloomThreshold": 0.40,
    };

    const container = containerRef.current;
    
    // Initial size
    let currentWidth = container.clientWidth || window.innerWidth;
    let currentHeight = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, currentWidth / currentHeight, 0.1, 1000);
    camera.position.copy(cameraHome.current);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
    // Make background transparent so StarField shows through
    renderer.setClearColor(0x000000, 0); 
    renderer.setSize(currentWidth, currentHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    renderer.domElement.style.maskImage = 'radial-gradient(circle, black 36%, transparent 72%)';
    renderer.domElement.style.WebkitMaskImage = 'radial-gradient(circle, black 36%, transparent 72%)';

    container.appendChild(renderer.domElement);

    const simulation = new BlackHoleSimulation(scene, config);
    simulation.createBlackHole();
    simulation.onResize(currentWidth, currentHeight);
    simulation.updateCamera(camera);

    const scenePass = pass(scene, camera);
    const bloomPass = bloom(scenePass, config.bloomStrength, config.bloomRadius, config.bloomThreshold);
    try {
        // Fallback or explicit resolution
        renderer.resolvePostProcessing(scenePass, bloomPass);
    } catch(e){
        console.warn("Post processing not resolving correctly:", e);
    }

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

    async function animate() {
      if (!isRunningRef.current) return;
      
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

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

      if (isInViewRef.current) {
          await renderer.renderAsync(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      simulation.onResize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blackhole-start', onStart);
      window.removeEventListener('blackhole-explode', onExplode);
      window.removeEventListener('blackhole-reset', onReset);
      if (container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
        ref={containerRef} 
        className={className} 
        style={{ width, height, position: 'relative' }} 
    />
  );
};

export default NativeBlackHoleLoader;
