"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

export interface NeuralCoreSceneProps {
  readonly isVisible: boolean;
}

interface SynapticNodeSpec {
  readonly id: string;
  readonly position: readonly [number, number, number];
  readonly radius: number;
  readonly color: "#38BDF8" | "#7DD3FC" | "#F1F5F9";
}

/**
 * Deterministic 3D autonomous agent node coordinates orbiting the Electric-Blue Neural Core.
 */
const SYNAPTIC_NODES: readonly SynapticNodeSpec[] = [
  { id: "n1", position: [1.52, 0.65, 0.42], radius: 0.07, color: "#38BDF8" },
  { id: "n2", position: [-1.45, 0.78, -0.35], radius: 0.06, color: "#F1F5F9" },
  { id: "n3", position: [0.48, 1.55, -0.48], radius: 0.064, color: "#7DD3FC" },
  { id: "n4", position: [-0.58, -1.52, 0.44], radius: 0.07, color: "#38BDF8" },
  { id: "n5", position: [1.36, -0.86, -0.52], radius: 0.058, color: "#7DD3FC" },
  { id: "n6", position: [-1.4, -0.72, 0.58], radius: 0.064, color: "#38BDF8" },
  { id: "n7", position: [0.0, 1.16, 1.25], radius: 0.055, color: "#F1F5F9" },
  { id: "n8", position: [0.0, -1.2, -1.22], radius: 0.055, color: "#38BDF8" },
];

const PARTICLE_COUNT = 80;
const PARTICLE_POSITIONS: Float32Array = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = (i * 2.3999632) % (Math.PI * 2);
    const u = ((i * 73) % 100) / 50 - 1;
    const phi = Math.acos(Math.max(-1, Math.min(1, u)));
    const r = 1.7 + ((i * 31) % 100) / 130;

    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
})();

const SYNAPTIC_LINE_POSITIONS: Float32Array = (() => {
  const arr = new Float32Array(SYNAPTIC_NODES.length * 6);
  SYNAPTIC_NODES.forEach((node, idx) => {
    const base = idx * 6;
    arr[base] = 0;
    arr[base + 1] = 0;
    arr[base + 2] = 0;
    arr[base + 3] = node.position[0];
    arr[base + 4] = node.position[1];
    arr[base + 5] = node.position[2];
  });
  return arr;
})();

interface ElectricNeuralAssemblyProps {
  readonly isVisible: boolean;
}

/**
 * High-Tech 3D Electric Cyan-Blue Agentic AI Neural Core Assembly.
 */
function ElectricNeuralAssembly({ isVisible }: ElectricNeuralAssemblyProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);
  const innerLatticeRef = useRef<THREE.Mesh>(null);
  const nucleusMeshRef = useRef<THREE.Mesh>(null);
  const nucleusHaloRef = useRef<THREE.Mesh>(null);
  const gyroRingARef = useRef<THREE.Mesh>(null);
  const gyroRingBRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(SYNAPTIC_LINE_POSITIONS, 3)
    );
    return geom;
  }, []);

  const particleGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(PARTICLE_POSITIONS, 3)
    );
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (!isVisible) {
      return;
    }

    const clampedDelta = Math.min(delta, 0.05);
    const elapsed = state.clock.getElapsedTime();

    if (rootGroupRef.current) {
      const targetRotationX = state.pointer.y * 0.35;
      const targetRotationY = state.pointer.x * 0.45;

      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotationX,
        clampedDelta * 4.0
      );
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotationY,
        clampedDelta * 4.0
      );
    }

    if (outerCageRef.current) {
      outerCageRef.current.rotation.y += clampedDelta * 0.26;
      outerCageRef.current.rotation.x += clampedDelta * 0.12;
    }

    if (innerLatticeRef.current) {
      innerLatticeRef.current.rotation.y -= clampedDelta * 0.38;
      innerLatticeRef.current.rotation.z += clampedDelta * 0.18;
    }

    const pulseScale = 1 + Math.sin(elapsed * 2.6) * 0.075;
    if (nucleusMeshRef.current) {
      nucleusMeshRef.current.scale.setScalar(pulseScale);
      nucleusMeshRef.current.rotation.y -= clampedDelta * 0.48;
    }
    if (nucleusHaloRef.current) {
      const haloScale = 1.25 + Math.sin(elapsed * 2.6 - 0.5) * 0.1;
      nucleusHaloRef.current.scale.setScalar(haloScale);
    }

    if (gyroRingARef.current) {
      gyroRingARef.current.rotation.z += clampedDelta * 0.34;
      gyroRingARef.current.rotation.x =
        Math.PI / 2.5 + Math.sin(elapsed * 0.85) * 0.15;
    }
    if (gyroRingBRef.current) {
      gyroRingBRef.current.rotation.x -= clampedDelta * 0.25;
      gyroRingBRef.current.rotation.y += clampedDelta * 0.2;
    }

    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += clampedDelta * 0.18;
      nodesGroupRef.current.rotation.z = Math.sin(elapsed * 0.7) * 0.08;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= clampedDelta * 0.08;
      particlesRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.1;
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* Central Glowing Electric-Blue (#38BDF8) AI Reasoning Nucleus */}
      <mesh ref={nucleusMeshRef}>
        <icosahedronGeometry args={[0.48, 2]} />
        <meshStandardMaterial
          color="#7DD3FC"
          emissive="#0284C7"
          emissiveIntensity={1.4}
          roughness={0.18}
          metalness={0.35}
        />
      </mesh>

      {/* Translucent Inner Cyan Aura */}
      <mesh ref={nucleusHaloRef}>
        <sphereGeometry args={[0.62, 24, 24]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Counter-Rotating Ice-Blue Wireframe Octahedron */}
      <mesh ref={innerLatticeRef}>
        <octahedronGeometry args={[0.92, 1]} />
        <meshStandardMaterial
          color="#BAE6FD"
          emissive="#38BDF8"
          emissiveIntensity={0.65}
          wireframe
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>

      {/* Primary Geodesic Icosahedron Neural Cage (#38BDF8) */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[1.36, 1]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.6}
          wireframe
          roughness={0.28}
          metalness={0.5}
        />
      </mesh>

      {/* Gyroscopic Orbital Ring A */}
      <mesh ref={gyroRingARef} rotation={[Math.PI / 2.5, 0.28, 0]}>
        <torusGeometry args={[1.64, 0.016, 16, 96]} />
        <meshStandardMaterial
          color="#E0F2FE"
          emissive="#38BDF8"
          emissiveIntensity={0.55}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Gyroscopic Orbital Ring B */}
      <mesh ref={gyroRingBRef} rotation={[-Math.PI / 3.1, -0.42, 0.2]}>
        <torusGeometry args={[1.82, 0.018, 16, 96]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.95}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>

      {/* Orbiting Autonomous Agent Nodes & Neural Filaments */}
      <group ref={nodesGroupRef}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.38}
          />
        </lineSegments>

        {SYNAPTIC_NODES.map((node) => (
          <mesh key={node.id} position={node.position}>
            <sphereGeometry args={[node.radius, 14, 14]} />
            <meshStandardMaterial
              color={node.color}
              emissive="#38BDF8"
              emissiveIntensity={0.85}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* 3D Floating Cyan Telemetry Particle Field */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color="#7DD3FC"
          size={0.036}
          transparent
          opacity={0.72}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * React Three Fiber Canvas scene for the Interactive 3D Electric-Blue AI Neural Core.
 */
export default function NeuralCoreScene({ isVisible }: NeuralCoreSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={isVisible ? "always" : "never"}
      camera={{ position: [0, 0, 4.7], fov: 44, near: 0.1, far: 25 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      aria-hidden="true"
      className="h-full w-full touch-pan-y"
    >
      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.85} />
      <pointLight position={[0, 0, 2.5]} intensity={2.5} color="#38BDF8" />
      <directionalLight position={[4, 5, 4]} intensity={1.5} color="#E0F2FE" />
      <directionalLight
        position={[-4, -3, -2]}
        intensity={1.2}
        color="#0284C7"
      />

      <ElectricNeuralAssembly isVisible={isVisible} />
    </Canvas>
  );
}
