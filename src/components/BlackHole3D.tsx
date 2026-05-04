import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  // This renders a full-screen quad when used with a plane geometry spanning -1 to 1
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPos;
uniform vec3 uCameraTarget;
uniform float uZoom;

// Parameters tuned for performance and beauty
const float MASS = 0.3;
const float RS = MASS * 2.0;

const float DISK_INNER = 1.8;
const float DISK_OUTER = 14.0;
const float STEP_SIZE = 0.25;
const int MAX_STEPS = 50;

varying vec2 vUv;

// 3D value noise from iq
float hash(vec3 p) {
    p = fract(p * vec3(127.1, 311.7, 74.7));
    p *= 43758.5453123;
    return fract(p.x * p.y * p.z);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), u.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), u.x), u.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), u.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), u.x), u.y), u.z);
}

float fbm(vec3 x) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    for (int i = 0; i < 3; ++i) { 
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

vec3 getBlackbody(float temp) {
    float t = clamp(temp, 1000.0, 40000.0);
    if (t < 4000.0) {
        return vec3(1.0, t/4000.0 * 0.6, 0.0); 
    } else if (t < 7000.0) {
        return vec3(1.0, 0.6 + (t-4000.)/3000.*0.4, (t-4000.)/3000.);
    } else {
        return vec3(1.0 - (t-7000.)/33000.*0.6, 1.0 - (t-7000.)/33000.*0.2, 1.0);
    }
}

vec4 diskColor(float r, float angle, float time, vec3 rayDir) {
    float normR = clamp((r - DISK_INNER) / (DISK_OUTER - DISK_INNER), 0.0, 1.0);
    
    // Scale temp specifically to recreate the bluish-white disk in webgpu example
    float temp = 24000.0 * pow(DISK_INNER / r, 0.25);
    vec3 col = getBlackbody(temp) * 1.8;
    
    vec3 velDir = vec3(-sin(angle), 0.0, cos(angle));
    float velMag = 1.0 / sqrt(r/DISK_INNER);
    float beta = velMag * 0.35;
    float cosTheta = dot(velDir, rayDir);
    float doppler = 1.0 / (1.0 - beta * cosTheta);
    col *= clamp(pow(doppler, 1.0), 0.1, 5.0); 
    
    // Smooth edges so it fades nicely
    float edge = smoothstep(0.0, 0.1, normR) * smoothstep(1.0, 0.4, normR);
    
    float speed = -1.3;
    float cycle = mod(time * speed, 100.0);
    float kepler1 = cycle / pow(r, 1.5);
    float a1 = angle + kepler1;
    
    vec3 nCoord = vec3(r * 0.31, cos(a1)*7.4, sin(a1)*7.4);
    float turb = fbm(nCoord);
    float opacity = pow(clamp(turb, 0.0, 1.0), 2.0) * edge;
    
    return vec4(col, opacity);
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    
    uv /= uZoom;
    
    vec3 camPos = uCameraPos;
    vec3 camTarget = uCameraTarget;
    vec3 camForward = normalize(camTarget - camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camForward));
    vec3 camUp = cross(camForward, camRight);
    
    float fovFactor = 1.5; 
    vec3 rayDir = normalize(camForward * fovFactor + camRight * uv.x + camUp * uv.y);
    
    vec3 rayPos = camPos;
    vec3 prevPos = rayPos;
    
    vec3 finalColor = vec3(0.0);
    float alpha = 0.0;
    bool captured = false;
    
    for (int i = 0; i < MAX_STEPS; i++) {
        float r = length(rayPos);
        
        if (r < RS * 1.01) { captured = true; break; }
        if (r > 20.0 || alpha > 0.99) break;

        vec3 toCenter = -rayPos / r;
        float bend = (RS / (r * r)) * STEP_SIZE * 2.4; 
        rayDir = normalize(rayDir + toCenter * bend);
        
        prevPos = rayPos;
        rayPos += rayDir * STEP_SIZE;
        
        if (prevPos.y * rayPos.y < 0.0 && alpha < 0.99) {
            float t = -prevPos.y / (rayPos.y - prevPos.y);
            vec3 hitPos = mix(prevPos, rayPos, t);
            float hitR = length(hitPos.xz);
            
            if (hitR > DISK_INNER && hitR < DISK_OUTER) {
                float hitAngle = atan(hitPos.z, hitPos.x);
                vec4 disk = diskColor(hitR, hitAngle, uTime, rayDir);
                
                float remainingAlpha = 1.0 - alpha;
                finalColor += disk.rgb * disk.a * remainingAlpha;
                alpha += remainingAlpha * disk.a;
            }
        }
    }
    
    if (captured) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(finalColor, alpha);
    }
}
`;

const BlackHole3D: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { size } = useThree();
    
    const zoomRef = useRef(1.0);
    const targetZoomRef = useRef(1.0);
    
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uCameraPos: { value: new THREE.Vector3(0, 2, 10) },
        uCameraTarget: { value: new THREE.Vector3(0, 0, 0) },
        uZoom: { value: 1.0 }
    }), []);
    
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    }, [size]);

    useEffect(() => {
        const handleStart = () => {
            targetZoomRef.current = 2.0; 
        };
        const handleExplode = () => {
            targetZoomRef.current = 5.0; 
        };
        const handleReset = () => {
            targetZoomRef.current = 1.0; 
        };
        
        window.addEventListener('blackhole-start', handleStart);
        window.addEventListener('blackhole-explode', handleExplode);
        window.addEventListener('blackhole-reset', handleReset);
        
        return () => {
            window.removeEventListener('blackhole-start', handleStart);
            window.removeEventListener('blackhole-explode', handleExplode);
            window.removeEventListener('blackhole-reset', handleReset);
        };
    }, []);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            
            zoomRef.current = THREE.MathUtils.lerp(zoomRef.current, targetZoomRef.current, delta * 2.0);
            materialRef.current.uniforms.uZoom.value = zoomRef.current;

            const t = state.clock.elapsedTime * 0.2;
            materialRef.current.uniforms.uCameraPos.value.set(
                Math.sin(t) * 2.0,
                2.0 + Math.sin(t * 1.5) * 0.5,
                10.0 + Math.cos(t * 0.8) * 1.0
            );
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                depthTest={false}
                blending={THREE.NormalBlending}
            />
        </mesh>
    );
};

export default BlackHole3D;