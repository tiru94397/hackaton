"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { Scene3D } from "./Scene3D";
import { memo, Suspense, useMemo } from "react";

interface MachineCanvasProps {
  isLoading: boolean;
  machineType?: "robot" | "drone" | null;
  modelUrl?: string | null; // support generated models
  promptColor?: string | null; // e.g., 'red', 'blue', 'gold'
}

function MachineCanvasComponent({
  isLoading,
  machineType,
  modelUrl,
  promptColor,
}: MachineCanvasProps) {
  // compute background glow color based on prompt
  const glowColor = useMemo(() => {
    if (!promptColor) return "rgba(6,182,212,0.15)";
    const colorMap: Record<string, string> = {
      red: "rgba(239,68,68,0.2)",
      blue: "rgba(59,130,246,0.2)",
      green: "rgba(16,185,129,0.2)",
      yellow: "rgba(234,179,8,0.2)",
      purple: "rgba(147,51,234,0.2)",
      orange: "rgba(249,115,22,0.2)",
      cyan: "rgba(6,182,212,0.15)",
    };
    return colorMap[promptColor.toLowerCase()] || "rgba(6,182,212,0.15)";
  }, [promptColor]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] bg-gradient-to-b from-background to-cyan-950/10 dark:to-cyan-950/20 rounded-2xl md:rounded-3xl overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
    >
      {/* Animated radial background glow */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene3D
            isLoading={isLoading}
            machineType={machineType}
            modelUrl={modelUrl}
          />
        </Suspense>
      </Canvas>

      {/* Futuristic corner decorations */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-cyan-400/30" />
      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-cyan-400/30" />
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-cyan-400/30" />
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-cyan-400/30" />
    </motion.div>
  );
}

export const MachineCanvas = memo(MachineCanvasComponent);
