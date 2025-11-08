"use client";

import { Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import { useAIEnvironment } from "../context/AIEnvironmentContext";

/* 🦾 Animated Robotic Arm */
export function RoboticArmAnimated({ active = false }: { active?: boolean }) {
  const { intensity } = useAIEnvironment();
  const lowerArm = useRef<THREE.Mesh>(null);
  const upperArm = useRef<THREE.Mesh>(null);
  const gripper = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * intensity;
    if (lowerArm.current) lowerArm.current.rotation.z = Math.sin(t * 0.8) * 0.3;
    if (upperArm.current) upperArm.current.rotation.z = Math.cos(t * 1.2) * 0.4;
    if (gripper.current) gripper.current.rotation.z = Math.sin(t * 2) * 0.2;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.5, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lower Arm */}
      <mesh ref={lowerArm} position={[0, 1.5, 0]}>
        <boxGeometry args={[0.4, 2.5, 0.4]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Joint 1 */}
      <mesh position={[0.9, 2.6, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3 * intensity}
        />
      </mesh>

      {/* Upper Arm */}
      <mesh ref={upperArm} position={[1.8, 3.5, 0]}>
        <boxGeometry args={[0.35, 2, 0.35]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Joint 2 */}
      <mesh position={[1.6, 4.5, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3 * intensity}
        />
      </mesh>

      {/* Gripper */}
      <mesh ref={gripper} position={[1.6, 5.2, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {active && (
        <>
          <pointLight position={[0.9, 2.6, 0]} color="#3b82f6" intensity={2 * intensity} />
          <pointLight position={[1.6, 4.5, 0]} color="#10b981" intensity={2 * intensity} />
        </>
      )}
    </group>
  );
}

/* 🚁 Drone with Propeller Animation */
export function DronePiece() {
  const { intensity } = useAIEnvironment();
  const propellers = Array(4)
    .fill(null)
    .map(() => useRef<THREE.Mesh>(null));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 20 * intensity;
    propellers.forEach((ref) => {
      if (ref.current) ref.current.rotation.y = t;
    });
  });

  return (
    <Float speed={2 * intensity} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={[0, 4, 3]}>
        <mesh>
          <boxGeometry args={[1.5, 0.4, 1.5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
        {[0, 1, 2, 3].map((_, i) => (
          <group key={i} position={[i < 2 ? 1 : -1, 0.2, i % 2 === 0 ? 1 : -1]}>
            <mesh ref={propellers[i]}>
              <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
              <meshStandardMaterial color="#06b6d4" />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

/* ⚙️ Rotating Conveyor Belt */
export function ConveyorPiece() {
  const { intensity } = useAIEnvironment();
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (cubeRef.current)
      cubeRef.current.position.x = Math.sin(clock.getElapsedTime() * 1.2 * intensity) * 2;
  });

  return (
    <group position={[0, 0.25, -3]}>
      <mesh>
        <boxGeometry args={[6, 0.3, 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      <Float speed={2}>
        <mesh ref={cubeRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" />
        </mesh>
      </Float>
    </group>
  );
}

/* ⚙️ Gear Rotation */
export function GearPiece() {
  const { intensity } = useAIEnvironment();
  const gearRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (gearRef.current) gearRef.current.rotation.z += 0.04 * intensity;
  });

  return (
    <group position={[-4, 0, 0]}>
      <mesh ref={gearRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.2, 16, 50]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    </group>
  );
}

/* 🔋 Energy Core (Pulsing & Floating) */
export function EnergyPiece() {
  const { intensity } = useAIEnvironment();
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current)
      coreRef.current.scale.setScalar(1 + Math.sin(t * 2 * intensity) * 0.05);
  });

  return (
    <Float speed={1 * intensity} rotationIntensity={1.2} floatIntensity={1}>
      <mesh ref={coreRef} position={[0, 2, -6]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#3b82f6"
          emissiveIntensity={1.5 * intensity}
          metalness={1}
        />
      </mesh>
      <Sparkles count={60} scale={[3, 3, 3]} color="#3b82f6" />
    </Float>
  );
}
