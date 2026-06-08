"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";

const nodes = [
  { position: [-4.2, 1.2, 0.2], radius: 0.2, accent: true },
  { position: [-3.3, -1.6, -0.6], radius: 0.16 },
  { position: [-2.4, 2.8, -1.2], radius: 0.12 },
  { position: [-1.7, 0.1, 0.8], radius: 0.24, accent: true },
  { position: [-0.8, -2.5, 0.4], radius: 0.13 },
  { position: [-0.2, 2.1, 1.1], radius: 0.17 },
  { position: [0.6, -0.5, -0.9], radius: 0.2, accent: true },
  { position: [1.2, 2.9, -0.5], radius: 0.14 },
  { position: [1.8, 0.8, 0.9], radius: 0.15 },
  { position: [2.3, -2.1, -0.3], radius: 0.18 },
  { position: [3.1, 1.8, 0.4], radius: 0.22, accent: true },
  { position: [3.7, -0.8, 1.1], radius: 0.13 },
  { position: [4.4, 0.2, -0.7], radius: 0.16 },
];

const connections = [
  [0, 2],
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 5],
  [3, 6],
  [4, 6],
  [5, 7],
  [5, 8],
  [6, 8],
  [6, 9],
  [7, 10],
  [8, 10],
  [9, 11],
  [10, 12],
  [11, 12],
];

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 13], fov: 42, near: 0.1, far: 40 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} />
          <pointLight position={[2, 4, 6]} intensity={18} color="#f7d46a" />
          <pointLight position={[-5, -3, 4]} intensity={7} color="#7dd3fc" />
          <ConstellationGarden />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ConstellationGarden() {
  const groupRef = useRef();
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y =
      Math.sin(elapsed * 0.18) * 0.12 + pointer.x * 0.18;
    groupRef.current.rotation.x =
      Math.cos(elapsed * 0.16) * 0.07 - pointer.y * 0.1;
    groupRef.current.position.y = Math.sin(elapsed * 0.42) * 0.1;
  });

  return (
    <group ref={groupRef} rotation={[0.08, -0.18, -0.05]}>
      <Sparkles
        count={42}
        scale={[9, 6, 3]}
        size={1.8}
        speed={0.18}
        opacity={0.28}
        color="#fde68a"
      />
      <ConnectionLines />
      {nodes.map((node, index) => (
        <GardenNode key={index} {...node} delay={index * 0.17} />
      ))}
    </group>
  );
}

function ConnectionLines() {
  const curves = useMemo(
    () =>
      connections.map(([startIndex, endIndex]) => {
        const start = new THREE.Vector3(...nodes[startIndex].position);
        const end = new THREE.Vector3(...nodes[endIndex].position);
        const midpoint = start.clone().lerp(end, 0.5);
        midpoint.z += 0.35;
        midpoint.y += Math.sin(startIndex + endIndex) * 0.24;

        return new THREE.QuadraticBezierCurve3(start, midpoint, end).getPoints(
          24,
        );
      }),
    [],
  );

  return curves.map((points, index) => (
    <Line
      key={index}
      points={points}
      color="#facc15"
      lineWidth={0.7}
      transparent
      opacity={0.25}
    />
  ));
}

function GardenNode({ position, radius, accent = false, delay }) {
  const nodeRef = useRef();
  const glowColor = accent ? "#facc15" : "#a7f3d0";
  const coreColor = accent ? "#fde68a" : "#d9f99d";

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;

    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.2 + delay) * 0.08;
    nodeRef.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.45}>
      <group ref={nodeRef} position={position}>
        <mesh>
          <sphereGeometry args={[radius * 2.6, 32, 32]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={accent ? 0.16 : 0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={coreColor}
            emissive={glowColor}
            emissiveIntensity={accent ? 1.5 : 0.75}
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>
      </group>
    </Float>
  );
}
