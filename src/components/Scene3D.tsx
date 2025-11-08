"use client";

import { OrbitControls, Float, Text, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { RoboticArmAnimated, DronePiece, ConveyorPiece, GearPiece, EnergyPiece } from "./SceneParts";
import { useAIEnvironment } from "../context/AIEnvironmentContext";

interface Scene3DProps {
  isLoading: boolean;
  machineType?: "robot" | "drone" | null;
  modelUrl?: string | null;
  promptTheme?: string | null;
}

export function Scene3D({ isLoading, machineType, modelUrl, promptTheme }: Scene3DProps) {
  const { mode, intensity } = useAIEnvironment();
  const { scene } = useThree();
  const ambient = useRef<THREE.AmbientLight>(null);
  const mainLight = useRef<THREE.DirectionalLight>(null);

  /* 🌈 Themed Environment Colors */
  const env = useMemo(() => {
    const themes = {
      default: { fog: "#0f172a", bg: "#0f172a", light: "#ffffff", emissive: "#06b6d4", intensity: 1 },
      night: { fog: "#020617", bg: "#020617", light: "#60a5fa", emissive: "#3b82f6", intensity: 0.6 },
      solar: { fog: "#fde68a", bg: "#facc15", light: "#fde047", emissive: "#f59e0b", intensity: 2 },
      underwater: { fog: "#0c4a6e", bg: "#0369a1", light: "#38bdf8", emissive: "#06b6d4", intensity: 1.5 },
      industrial: { fog: "#1e293b", bg: "#111827", light: "#f8fafc", emissive: "#f59e0b", intensity: 1.8 },
      lava: { fog: "#450a0a", bg: "#7f1d1d", light: "#f87171", emissive: "#dc2626", intensity: 2.2 },
      arctic: { fog: "#e0f2fe", bg: "#bae6fd", light: "#f0f9ff", emissive: "#93c5fd", intensity: 1.8 },
      cyberpunk: { fog: "#2e1065", bg: "#3b0764", light: "#f0abfc", emissive: "#a855f7", intensity: 2.5 },
    };
    return themes[promptTheme as keyof typeof themes] || themes.default;
  }, [promptTheme]);

  /* 🌫️ Apply Environment & Fog */
  useEffect(() => {
    scene.background = new THREE.Color(env.bg);
    scene.fog = new THREE.Fog(env.fog, 15, 40);
  }, [env, scene]);

  /* 💡 Dynamic Lighting Based on AI Mode */
  useFrame(({ clock }) => {
    if (ambient.current && mode === "critical") {
      const flash = Math.sin(clock.elapsedTime * 10) > 0 ? 1 : 0.2;
      ambient.current.color = new THREE.Color(`rgb(${255 * flash}, 50, 50)`);
    }
  });

  /* ⚙️ Scene Content */
  const SceneContent = useMemo(() => {
    if (isLoading) {
      return (
        <Float speed={4} rotationIntensity={2}>
          <mesh>
            <torusGeometry args={[2, 0.3, 16, 100]} />
            <meshStandardMaterial
              color={env.emissive}
              emissive={env.emissive}
              emissiveIntensity={1.2}
            />
          </mesh>
        </Float>
      );
    }

    return (
      <>
        {machineType === "robot" && <RoboticArmAnimated active />}
        {machineType === "drone" && <DronePiece />}
        {!machineType && (
          <>
            <RoboticArmAnimated active />
            <DronePiece />
          </>
        )}
        <ConveyorPiece />
        <GearPiece />
        <EnergyPiece />

        <Text position={[0, 6, 0]} fontSize={0.6} color={env.light}>
          Virtual Factory AI
        </Text>
      </>
    );
  }, [isLoading, machineType, env]);

  /* 🌍 Final Scene Return */
  return (
    <>
      <OrbitControls enablePan={false} minDistance={5} maxDistance={20} maxPolarAngle={Math.PI / 2} />
      <ambientLight ref={ambient} intensity={0.4 * env.intensity * intensity} />
      <directionalLight
        ref={mainLight}
        position={[10, 10, 5]}
        intensity={env.intensity * intensity}
        color={mode === "critical" ? "#ef4444" : mode === "low" ? "#60a5fa" : env.light}
      />
      <pointLight position={[-10, -10, -5]} color={env.emissive} intensity={env.intensity / 2} />
      <hemisphereLight args={[env.light, env.fog, 0.5]} />
      {SceneContent}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={env.bg} metalness={0.8} roughness={0.3} />
      </mesh>
    </>
  );
}
