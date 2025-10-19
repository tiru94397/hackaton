import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { Scene3D } from "./Scene3D";
import { memo, Suspense } from "react";

interface MachineCanvasProps {
  isLoading: boolean;
  machineType?: "robot" | "drone" | null;
}

function MachineCanvasComponent({ isLoading, machineType }: MachineCanvasProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] bg-gradient-to-b from-background to-cyan-950/10 dark:to-cyan-950/20 rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-2xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
      
      <Canvas 
        shadows 
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <Scene3D isLoading={isLoading} machineType={machineType} />
        </Suspense>
      </Canvas>

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-cyan-400/30" />
      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-cyan-400/30" />
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-cyan-400/30" />
      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-cyan-400/30" />
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export const MachineCanvas = memo(MachineCanvasComponent);
