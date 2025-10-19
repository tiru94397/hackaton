import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";
import { Canvas } from "@react-three/fiber";
import { Scene3D } from "./Scene3D";
import { Suspense } from "react";

interface MachineViewer3DProps {
  machineType: "robot" | "drone";
  isGenerating: boolean;
}

export function MachineViewer3D({ machineType, isGenerating }: MachineViewer3DProps) {
  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`, {
      description: "Your 3D model will be downloaded shortly",
    });
  };

  return (
    <div className="relative w-full h-full bg-black/20 rounded-xl md:rounded-2xl overflow-hidden border border-cyan-500/20">
      {/* 3D Canvas */}
      <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
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
            <Scene3D isLoading={isGenerating} machineType={machineType} />
          </Suspense>
        </Canvas>
      </div>

      {/* Export Options */}
      <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => handleExport("stl")}
          className="bg-black/60 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500/20 text-xs md:text-sm"
          disabled={isGenerating}
        >
          <Download className="w-3 h-3 mr-1 md:mr-2" />
          STL
        </Button>
        <Button
          size="sm"
          onClick={() => handleExport("obj")}
          className="bg-black/60 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500/20 text-xs md:text-sm"
          disabled={isGenerating}
        >
          <Download className="w-3 h-3 mr-1 md:mr-2" />
          OBJ
        </Button>
        <Button
          size="sm"
          onClick={() => handleExport("gltf")}
          className="bg-black/60 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-500/20 text-xs md:text-sm"
          disabled={isGenerating}
        >
          <Download className="w-3 h-3 mr-1 md:mr-2" />
          GLTF
        </Button>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full circuit-pattern opacity-20" />
      </div>
    </div>
  );
}
